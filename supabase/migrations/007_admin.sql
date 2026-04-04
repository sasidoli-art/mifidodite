-- Ruolo admin
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE,  -- Supabase Auth user id
  ruolo VARCHAR(20) DEFAULT 'admin',  -- admin, superadmin, moderatore
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_admin_users_uid ON admin_users(user_id);

-- Funzione per verificare se un utente e admin
CREATE OR REPLACE FUNCTION is_admin(uid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM admin_users WHERE user_id = uid);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Log attivita admin
CREATE TABLE admin_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID REFERENCES admin_users(id),
  azione VARCHAR(50) NOT NULL,  -- approva_annuncio, rimuovi_struttura, ecc.
  entita VARCHAR(50),           -- annunci_adozioni, strutture, ecc.
  entita_id UUID,
  dettagli JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
