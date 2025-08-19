-- Criar tabela de notificações para o sistema
CREATE TABLE public.notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  message text,
  type text DEFAULT 'info', -- info, warning, success, error
  created_by uuid, -- admin que criou a notificação
  created_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone, -- notificação expira em
  is_global boolean DEFAULT true, -- se true, todos veem; se false, apenas usuários específicos
  target_users uuid[], -- se is_global = false, lista de usuários específicos
  is_active boolean DEFAULT true
);

-- Tabela para controlar quais usuários já viram cada notificação
CREATE TABLE public.notification_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  notification_id uuid REFERENCES public.notifications(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  viewed_at timestamp with time zone DEFAULT now(),
  UNIQUE(notification_id, user_id)
);

-- Habilitar RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_views ENABLE ROW LEVEL SECURITY;

-- Políticas para notifications
CREATE POLICY "Todos podem ver notificações ativas"
ON public.notifications
FOR SELECT
USING (
  is_active = true 
  AND (expires_at IS NULL OR expires_at > now())
  AND (is_global = true OR auth.uid() = ANY(target_users))
);

CREATE POLICY "Apenas admins podem criar notificações"
ON public.notifications
FOR ALL
USING (auth.uid()::text IN (
  SELECT email FROM public.users WHERE email = 'hills@gmail.com'
))
WITH CHECK (auth.uid()::text IN (
  SELECT email FROM public.users WHERE email = 'hills@gmail.com'
));

-- Políticas para notification_views
CREATE POLICY "Usuários podem ver suas próprias visualizações"
ON public.notification_views
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem marcar notificações como vistas"
ON public.notification_views
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas visualizações"
ON public.notification_views
FOR UPDATE
USING (auth.uid() = user_id);

-- Função para obter notificações não lidas de um usuário
CREATE OR REPLACE FUNCTION get_unread_notifications_count(user_uuid uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
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