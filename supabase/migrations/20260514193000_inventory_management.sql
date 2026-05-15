-- Clean up duplicates before applying unique constraints
DELETE FROM public.spins
WHERE id IN (
    SELECT id
    FROM (
        SELECT id,
               ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at ASC) as email_rank,
               ROW_NUMBER() OVER (PARTITION BY tel ORDER BY created_at ASC) as tel_rank
        FROM public.spins
    ) t
    WHERE email_rank > 1 OR tel_rank > 1
);

-- Add unique constraints (drop first if exists to avoid errors on re-run)
ALTER TABLE public.spins DROP CONSTRAINT IF EXISTS unique_email;
ALTER TABLE public.spins DROP CONSTRAINT IF EXISTS unique_tel;
ALTER TABLE public.spins ADD CONSTRAINT unique_email UNIQUE (email);
ALTER TABLE public.spins ADD CONSTRAINT unique_tel UNIQUE (tel);

-- Drop existing versions of the function to avoid signature conflicts
DROP FUNCTION IF EXISTS handle_spin(text, text, text, text, text);
DROP FUNCTION IF EXISTS handle_spin(text, text, text, text, text, double precision);
DROP FUNCTION IF EXISTS handle_spin(text, text, text, text, double precision);
DROP FUNCTION IF EXISTS handle_spin(text, text, text, text);

-- RPC to handle spin logic
CREATE OR REPLACE FUNCTION handle_spin(
  p_prenom TEXT,
  p_nom TEXT,
  p_email TEXT,
  p_tel TEXT
) RETURNS JSONB AS $$
DECLARE
  v_total_spins INTEGER;
  v_block_id INTEGER;
  v_block_start INTEGER;
  v_block_size INTEGER;
  v_slot_in_block INTEGER;
  v_wins_in_block INTEGER;
  v_already_played BOOLEAN;
  v_is_winner BOOLEAN := false;
  v_prize TEXT;
  v_boutique TEXT;
  v_partners TEXT[] := ARRAY['Peryssac', 'Kiabi', 'Gémo', 'KIKO', 'Le West'];
  v_clean_email TEXT := LOWER(TRIM(p_email));
  v_clean_tel TEXT := TRIM(p_tel);
  v_win_probability FLOAT;
BEGIN
  -- 1. Check if user already played
  SELECT EXISTS (
    SELECT 1 FROM spins 
    WHERE LOWER(TRIM(email)) = v_clean_email 
       OR TRIM(tel) = v_clean_tel
  ) INTO v_already_played;

  IF v_already_played THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Vous avez déjà participé avec cet email ou ce numéro.');
  END IF;

  -- 2. Calculate current position and dynamic block size
  SELECT COUNT(*) INTO v_total_spins FROM spins;
  
  IF v_total_spins < 20 THEN
    -- First block of 20
    v_block_id := 0;
    v_block_start := 0;
    v_block_size := 20;
    v_slot_in_block := v_total_spins + 1;
  ELSE
    -- Subsequent blocks of 53 (480 / 9 = ~53.3)
    v_block_id := ((v_total_spins - 20) / 53) + 1;
    v_block_start := 20 + ((v_block_id - 1) * 53);
    v_block_size := 53;
    v_slot_in_block := ((v_total_spins - 20) % 53) + 1;
  END IF;

  -- 3. Check if someone already won in THIS dynamic block
  SELECT COUNT(*) INTO v_wins_in_block 
  FROM (
    SELECT win FROM spins ORDER BY created_at ASC OFFSET v_block_start
  ) t 
  WHERE win = true AND (SELECT count(*) FROM (SELECT win FROM spins ORDER BY created_at ASC OFFSET v_block_start LIMIT v_block_size) t2 WHERE win = true) > 0;
  -- Simplified check: has anyone won since v_block_start?
  SELECT COUNT(*) INTO v_wins_in_block FROM spins WHERE created_at >= (SELECT created_at FROM spins ORDER BY created_at ASC OFFSET v_block_start LIMIT 1) AND win = true;
  -- If table is empty or block hasn't started, v_wins_in_block is 0
  IF v_total_spins <= v_block_start THEN
    v_wins_in_block := 0;
  END IF;

  -- 4. Find if any boutique still has stock
  SELECT boutique INTO v_boutique
  FROM (
    SELECT unnest(v_partners) as boutique
  ) p
  WHERE (SELECT count(*) FROM spins WHERE spins.boutique = p.boutique AND win = true) < 2
  ORDER BY random()
  LIMIT 1;

  -- 5. Determine if winner based on dynamic cadence
  IF v_boutique IS NOT NULL AND v_wins_in_block = 0 THEN
    v_win_probability := 1.0 / (v_block_size + 1 - v_slot_in_block);
    v_is_winner := (random() < v_win_probability);
  ELSE
    v_is_winner := false;
  END IF;

  -- 6. Set prize and final boutique assignment
  IF v_is_winner THEN
    v_prize := 'Bon d''achat + 2 places ciné';
  ELSE
    v_boutique := '-'; -- No boutique for losers
    v_prize := (ARRAY['Dommage', 'Rejouez', 'Perdu', 'Dommage'])[floor(random() * 4 + 1)];
  END IF;

  -- 7. Record the spin
  INSERT INTO spins (prenom, nom, email, tel, boutique, prize, win)
  VALUES (TRIM(p_prenom), TRIM(p_nom), v_clean_email, v_clean_tel, v_boutique, v_prize, v_is_winner);

  RETURN jsonb_build_object(
    'ok', true,
    'win', v_is_winner,
    'prize', v_prize,
    'boutique', v_boutique
  );
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'handle_spin error: %', SQLERRM;
  RETURN jsonb_build_object('ok', false, 'error', 'Une erreur interne est survenue. Veuillez réessayer.');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
