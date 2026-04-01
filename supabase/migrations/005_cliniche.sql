-- Tabella cliniche, ambulatori, rifugi animali
CREATE TABLE cliniche (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  nome VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,

  tipo VARCHAR(30) NOT NULL, -- clinica, ambulatorio, pronto_soccorso, rifugio, canile, gattile

  -- Localizzazione
  indirizzo VARCHAR(500),
  cap VARCHAR(5),
  comune VARCHAR(100) NOT NULL,
  provincia VARCHAR(2),
  regione VARCHAR(50) NOT NULL,
  latitudine DOUBLE PRECISION,
  longitudine DOUBLE PRECISION,

  telefono VARCHAR(30),
  email VARCHAR(255),
  sito_web VARCHAR(500),
  google_maps_url VARCHAR(500),

  orari TEXT, -- "Lun-Ven 9-19, Sab 9-13" o "H24"
  h24 BOOLEAN DEFAULT FALSE,
  emergenza BOOLEAN DEFAULT FALSE, -- pronto soccorso / reperibilita

  servizi TEXT[] DEFAULT '{}', -- chirurgia, radiologia, ecografia, ecc.
  descrizione TEXT,

  fonte VARCHAR(50) DEFAULT 'google', -- google, manuale, scraping
  verificato BOOLEAN DEFAULT FALSE,
  attivo BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_cliniche_tipo ON cliniche(tipo);
CREATE INDEX idx_cliniche_comune ON cliniche(comune);
CREATE INDEX idx_cliniche_provincia ON cliniche(provincia);
CREATE INDEX idx_cliniche_regione ON cliniche(regione);
CREATE INDEX idx_cliniche_h24 ON cliniche(h24) WHERE h24 = TRUE;
CREATE INDEX idx_cliniche_attivo ON cliniche(attivo) WHERE attivo = TRUE;
