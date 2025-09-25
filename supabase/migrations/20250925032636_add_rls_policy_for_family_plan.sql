-- Cria uma nova política que permite a um administrador de plano familiar
-- acessar os dados dos membros do seu plano.
CREATE POLICY "Allow family plan admin access"
ON public.users
FOR SELECT
USING (
  id IN (
    SELECT membro_id
    FROM membros_plano_familiar
    WHERE plano_familiar_id = (
      SELECT id
      FROM planos_familiares
      WHERE admin_id = auth.uid()
    )
  )
);