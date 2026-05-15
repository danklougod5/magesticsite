CREATE TABLE public.spins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  tel TEXT NOT NULL,
  boutique TEXT NOT NULL,
  prize TEXT NOT NULL,
  win BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.spins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert spins"
  ON public.spins FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
