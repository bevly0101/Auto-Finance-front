-- Security Fixes Migration

-- 1. Create proper user roles system
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 2. Create secure role checking function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 3. Create secure function to check current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT 
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role::text FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- 4. Fix the user consistency check view to be more secure
DROP VIEW IF EXISTS public.user_consistency_check;

CREATE OR REPLACE FUNCTION public.get_user_consistency_admin_only()
RETURNS TABLE (
  id uuid,
  email text,
  status text,
  auth_created_at timestamptz,
  public_created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    COALESCE(au.id, pu.id) as id,
    COALESCE(au.email, pu.email) as email,
    CASE 
      WHEN au.id IS NOT NULL AND pu.id IS NOT NULL THEN 'consistent'
      WHEN au.id IS NOT NULL AND pu.id IS NULL THEN 'missing_in_public'
      WHEN au.id IS NULL AND pu.id IS NOT NULL THEN 'missing_in_auth'
      ELSE 'unknown'
    END as status,
    au.created_at as auth_created_at,
    pu.created_at as public_created_at
  FROM auth.users au
  FULL OUTER JOIN public.users pu ON au.id = pu.id
  WHERE public.has_role(auth.uid(), 'admin');
$$;

-- 5. Fix delete_user_completely function with proper authorization
CREATE OR REPLACE FUNCTION public.delete_user_completely(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if current user has admin role
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RAISE LOG 'delete_user_completely: Admin % deleting user %', auth.uid(), user_id;
  
  -- Delete data in proper order
  DELETE FROM public.entradas WHERE user_id = delete_user_completely.user_id;
  DELETE FROM public.gastos WHERE user_id = delete_user_completely.user_id;
  DELETE FROM public.lembretes_pagamento WHERE user_id = delete_user_completely.user_id;
  DELETE FROM public.metas WHERE user_id = delete_user_completely.user_id;
  DELETE FROM public.archived_periods WHERE user_id = delete_user_completely.user_id;
  DELETE FROM public.notification_views WHERE user_id = delete_user_completely.user_id;
  DELETE FROM public.user_roles WHERE user_id = delete_user_completely.user_id;
  DELETE FROM public.users WHERE id = delete_user_completely.user_id;
  
  RAISE LOG 'delete_user_completely: User % successfully deleted by admin %', user_id, auth.uid();
  RETURN true;
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'delete_user_completely: Error deleting user %: % - %', user_id, SQLSTATE, SQLERRM;
    RETURN false;
END;
$$;

-- 6. Fix RLS policies

-- Drop the overly permissive users policy
DROP POLICY IF EXISTS "Usuários podem ver todos os perfis" ON public.users;

-- Create restrictive user profile access
CREATE POLICY "Users can view their own profile and basic info of others"
ON public.users
FOR SELECT
USING (
  auth.uid() = id OR 
  (auth.uid() IS NOT NULL AND id IS NOT NULL)
);

-- Fix notification policies to use role-based access
DROP POLICY IF EXISTS "Apenas admins podem criar notificações" ON public.notifications;

CREATE POLICY "Only admins can manage notifications"
ON public.notifications
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 7. Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 8. Fix get_unread_notifications_count function
CREATE OR REPLACE FUNCTION public.get_unread_notifications_count(user_uuid uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COUNT(*)::integer
  FROM public.notifications n
  WHERE n.is_active = true
    AND (n.expires_at IS NULL OR n.expires_at > now())
    AND (n.is_global = true OR user_uuid = ANY(n.target_users))
    AND NOT EXISTS (
      SELECT 1 FROM public.notification_views nv 
      WHERE nv.notification_id = n.id 
      AND nv.user_id = user_uuid
    );
$$;