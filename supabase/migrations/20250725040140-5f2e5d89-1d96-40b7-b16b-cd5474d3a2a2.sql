-- Fix remaining security issues

-- 1. Fix function search path issues for existing functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_telefone text;
  v_username text; 
  v_senha text;
  v_nome_completo text;
BEGIN
  -- Log do início da função
  RAISE LOG 'handle_new_user: Iniciando para usuário %', new.id;
  
  v_telefone := new.raw_user_meta_data ->> 'telefone_whatsapp';
  v_username := new.raw_user_meta_data ->> 'username';
  v_senha := new.raw_user_meta_data ->> 'senha';
  v_nome_completo := new.raw_user_meta_data ->> 'nome_completo';

  -- Log dos dados recebidos
  RAISE LOG 'handle_new_user: Dados - telefone: %, nome: %, username: %', v_telefone, v_nome_completo, v_username;

  -- Verificar se o usuário já existe na tabela public.users
  IF EXISTS (SELECT 1 FROM public.users WHERE id = new.id) THEN
    RAISE LOG 'handle_new_user: Usuário % já existe na tabela public.users, atualizando...', new.id;
    
    UPDATE public.users 
    SET 
      email = new.email,
      telefone_whatsapp = v_telefone,
      username = v_username,
      senha = v_senha,
      nome = v_nome_completo,
      created_at = now()
    WHERE id = new.id;
  ELSE
    RAISE LOG 'handle_new_user: Inserindo novo usuário % na tabela public.users', new.id;
    
    INSERT INTO public.users (id, email, telefone_whatsapp, username, senha, nome)
    VALUES (new.id, new.email, v_telefone, v_username, v_senha, v_nome_completo);
    
    -- Add default user role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'user'::public.app_role);
  END IF;

  RAISE LOG 'handle_new_user: Concluído com sucesso para usuário %', new.id;
  RETURN new;

EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'handle_new_user: Erro para usuário %: % - %', new.id, SQLSTATE, SQLERRM;
    RAISE;
END;
$$;

-- 2. Create trigger for handle_new_user if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Add policies for any remaining tables without them
CREATE POLICY "Users can manage their own data" ON public.user_roles 
FOR INSERT WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- 4. Add initial admin user (replace with actual admin email when needed)
-- This will need to be updated with the actual admin email
-- Example: INSERT INTO public.user_roles (user_id, role) 
-- SELECT id, 'admin'::public.app_role FROM public.users WHERE email = 'admin@example.com';