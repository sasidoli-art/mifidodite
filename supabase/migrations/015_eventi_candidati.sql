-- Staging table per eventi scraped da fonti RSS/HTML esterne.
-- Il cron scan-eventi-pet inserisce qui, l'admin approva/rifiuta,
-- alla conferma la riga viene promossa in `eventi`.

CREATE TABLE IF NOT EXISTS eventi_candidati (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Dati grezzi dalla fonte
  fonte_url VARCHAR(500) NOT NULL,
  fonte_nome VARCHAR(100) NOT NULL, -- es. "MonzaToday", "ANFI", "FIAF"
  titolo_raw VARCHAR(500) NOT NULL,
  descrizione_raw TEXT,
  data_pubblicazione DATE,

  -- Classificazione AI
  is_pet BOOLEAN NOT NULL DEFAULT FALSE, -- true se Claude dice "evento pet"
  categoria VARCHAR(30), -- cani, gatti, entrambi, altri
  citta VARCHAR(100),
  provincia VARCHAR(10),
  regione VARCHAR(50),
  data_evento DATE,
  data_evento_fine DATE,
  ai_score INTEGER, -- 0-100 confidence
  ai_reason TEXT, -- perche AI ritiene rilevante

  -- Stato workflow
  stato VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending | approved | rejected | published
  note_admin TEXT,
  promosso_evento_id UUID REFERENCES eventi(id) ON DELETE SET NULL,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Un URL fonte viene ingerito una sola volta
CREATE UNIQUE INDEX IF NOT EXISTS idx_eventi_candidati_fonte_url ON eventi_candidati(fonte_url);
CREATE INDEX IF NOT EXISTS idx_eventi_candidati_stato ON eventi_candidati(stato);
CREATE INDEX IF NOT EXISTS idx_eventi_candidati_is_pet ON eventi_candidati(is_pet) WHERE is_pet = TRUE;
CREATE INDEX IF NOT EXISTS idx_eventi_candidati_data_evento ON eventi_candidati(data_evento);
