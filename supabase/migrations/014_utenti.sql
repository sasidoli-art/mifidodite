-- ============================================
-- 014: Tabella utenti (auth propria, no Supabase Auth)
-- Admin + Professionisti, password bcrypt, reset token
-- ============================================

CREATE TABLE IF NOT EXISTS utenti (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nome          VARCHAR(200) NOT NULL DEFAULT '',
  ruolo         VARCHAR(30) NOT NULL DEFAULT 'professionista'
                CHECK (ruolo IN ('admin', 'professionista')),

  -- Reset password
  reset_token       VARCHAR(255),
  reset_token_scade TIMESTAMPTZ,

  -- Stato account
  attivo        BOOLEAN NOT NULL DEFAULT true,
  verificato    BOOLEAN NOT NULL DEFAULT false,

  -- Profilo professionista (opzionale)
  telefono      VARCHAR(30),
  struttura_id  INTEGER REFERENCES strutture(id) ON DELETE SET NULL,

  -- Timestamp
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ultimo_login  TIMESTAMPTZ
);

CREATE INDEX idx_utenti_email ON utenti(email);
CREATE INDEX idx_utenti_ruolo ON utenti(ruolo);
CREATE INDEX idx_utenti_reset_token ON utenti(reset_token) WHERE reset_token IS NOT NULL;

-- Admin iniziale (password: $$$Cecilia$$$!)
INSERT INTO utenti (email, password_hash, nome, ruolo, verificato, attivo)
VALUES (
  'info@mifidodite.eu',
  '$2b$12$FxrSxEWwdZDSLppdCJtkzuZI0CWdyL3GJkkA/BgLuI8dsN1IHqTku',
  'Admin',
  'admin',
  true,
  true
) ON CONFLICT (email) DO NOTHING;
