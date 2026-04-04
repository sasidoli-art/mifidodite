-- ============================================
-- Sistema Codici Sconto e Referral
-- ============================================

CREATE TYPE codice_tipo AS ENUM (
  'sconto',           -- sconto percentuale o mesi gratis
  'vip',              -- bypass totale pagamento (i tuoi cavalli di troia)
  'referral',         -- generato automaticamente per ogni professionista
  'lancio'            -- promozioni temporanee
);

CREATE TABLE codici_sconto (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  codice VARCHAR(50) UNIQUE NOT NULL,       -- es. BENVENUTO, SARA-BG, VIP-MARCO
  tipo codice_tipo NOT NULL,

  -- Cosa offre
  mesi_gratis INTEGER DEFAULT 0,            -- es. 1 = primo mese gratis
  sconto_percentuale INTEGER DEFAULT 0,     -- es. 50 = 50% di sconto
  piano_forzato VARCHAR(20),                -- se VIP: "top" = accesso Top gratis
  bypass_pagamento BOOLEAN DEFAULT FALSE,   -- TRUE = non paga MAI (i tuoi cavalli di troia)

  -- Chi l'ha creato
  creato_da UUID,                           -- NULL = admin, altrimenti ID professionista
  nome_referente VARCHAR(100),              -- "Sara Colombo" o "Marco Influencer"

  -- Limiti
  max_utilizzi INTEGER,                     -- NULL = illimitato
  utilizzi_attuali INTEGER DEFAULT 0,
  valido_dal TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valido_al TIMESTAMP WITH TIME ZONE,       -- NULL = per sempre

  -- Ricompensa per chi ha il codice referral
  mesi_gratis_referente INTEGER DEFAULT 1,  -- chi porta un amico ottiene 1 mese gratis

  attivo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_codici_codice ON codici_sconto(codice);
CREATE INDEX idx_codici_tipo ON codici_sconto(tipo);
CREATE INDEX idx_codici_attivo ON codici_sconto(attivo) WHERE attivo = TRUE;

-- Log utilizzi codici
CREATE TABLE utilizzi_codice (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codice_id UUID NOT NULL REFERENCES codici_sconto(id),
  user_id UUID,                             -- chi ha usato il codice
  struttura_id UUID REFERENCES strutture(id),
  email VARCHAR(255),
  piano_attivato VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_utilizzi_codice ON utilizzi_codice(codice_id);

-- Trigger per incrementare utilizzi
CREATE OR REPLACE FUNCTION increment_utilizzi_codice()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE codici_sconto
  SET utilizzi_attuali = utilizzi_attuali + 1
  WHERE id = NEW.codice_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_utilizzi_codice
  AFTER INSERT ON utilizzi_codice
  FOR EACH ROW EXECUTE FUNCTION increment_utilizzi_codice();

-- ============================================
-- Codici pre-inseriti
-- ============================================

-- Codici lancio
INSERT INTO codici_sconto (codice, tipo, mesi_gratis, sconto_percentuale, nome_referente, max_utilizzi, valido_al) VALUES
  ('BENVENUTO', 'lancio', 1, 0, 'Sistema', NULL, '2027-12-31'),
  ('LANCIO', 'lancio', 0, 50, 'Sistema', 500, '2026-12-31'),
  ('FIERA2026', 'lancio', 1, 0, 'Sistema', 200, '2026-12-31');

-- Codici VIP (bypass totale — i tuoi cavalli di troia)
-- Li aggiungi tu dall'admin quando servono
INSERT INTO codici_sconto (codice, tipo, bypass_pagamento, piano_forzato, nome_referente, max_utilizzi) VALUES
  ('VIP-ADMIN', 'vip', TRUE, 'top', 'Admin', 1),
  ('VIP-TESTER', 'vip', TRUE, 'top', 'Tester', 5);
