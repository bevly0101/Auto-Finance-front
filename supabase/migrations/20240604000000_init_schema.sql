CREATE TABLE public.users (
    id uuid NOT NULL,
    email text,
    telefone_whatsapp text,
    username text,
    senha text,
    nome text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);