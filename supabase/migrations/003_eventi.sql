-- Tabella eventi e cliniche
CREATE TABLE eventi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  titolo VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,
  tipo VARCHAR(30) NOT NULL, -- evento, fiera, raduno, clinica_h24, pronto_soccorso

  data_inizio DATE,
  data_fine DATE,

  citta VARCHAR(100),
  regione VARCHAR(50),
  indirizzo VARCHAR(500),
  latitudine DOUBLE PRECISION,
  longitudine DOUBLE PRECISION,

  sommario TEXT,
  descrizione TEXT, -- versione lunga storytelling

  organizzatore VARCHAR(200),
  prezzo VARCHAR(50),
  telefono VARCHAR(30),
  fonte_url VARCHAR(500),

  img VARCHAR(500),
  attivo BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_eventi_tipo ON eventi(tipo);
CREATE INDEX idx_eventi_citta ON eventi(citta);
CREATE INDEX idx_eventi_data ON eventi(data_inizio);
CREATE INDEX idx_eventi_attivo ON eventi(attivo) WHERE attivo = TRUE;
