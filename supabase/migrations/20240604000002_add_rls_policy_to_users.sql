-- Habilita RLS na tabela de usuários, se ainda não estiver habilitado
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Remove a política antiga, se existir, para evitar conflitos
DROP POLICY IF EXISTS "Allow individual user access" ON public.users;

-- Cria uma nova política que permite a um usuário autenticado
-- acessar apenas seus próprios dados na tabela public.users.
CREATE POLICY "Allow individual user access"
ON public.users
FOR SELECT
USING (auth.uid() = id);