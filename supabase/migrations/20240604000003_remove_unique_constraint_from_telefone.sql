-- Remove a restrição de unicidade da coluna telefone_whatsapp
-- para permitir que múltiplos usuários possam ter o mesmo número de telefone.
ALTER TABLE public.users
DROP CONSTRAINT IF EXISTS users_telefone_whatsapp_key;