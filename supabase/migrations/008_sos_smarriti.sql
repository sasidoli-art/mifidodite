-- SOS Smarriti — Ho perso / Ho trovato

CREATE TYPE sos_tipo AS ENUM ('perso', 'trovato');
CREATE TYPE sos_stato AS ENUM ('attivo', 'risolto', 'scaduto');

CREATE TABLE sos_smarriti (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  tipo sos_tipo NOT NULL,
  stato sos_stato DEFAULT 'attivo',

  -- Animale
  nome_animale VARCHAR(100),
  specie VARCHAR(20) NOT NULL DEFAULT 'cane',
  razza VARCHAR(100),
  colore VARCHAR(100),
  taglia VARCHAR(20),
  sesso VARCHAR(20),
  microchip VARCHAR(20),
  segni_particolari TEXT,

  descrizione TEXT NOT NULL,

  -- Dove e quando
  data_evento DATE NOT NULL,
  ora_evento VARCHAR(10),
  indirizzo_evento VARCHAR(300),
  comune VARCHAR(100) NOT NULL,
  provincia VARCHAR(2),
  latitudine DOUBLE PRECISION,
  longitudine DOUBLE PRECISION,

  -- Foto
  foto_principale VARCHAR(500),
  galleria TEXT[] DEFAULT '{}',

  -- Contatto
  nome_contatto VARCHAR(100) NOT NULL,
  telefono_contatto VARCHAR(30) NOT NULL,
  email_contatto VARCHAR(255),

  -- Ricompensa
  ricompensa VARCHAR(100),

  visualizzazioni INTEGER DEFAULT 0,
  condivisioni INTEGER DEFAULT 0,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  risolto_il TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_sos_tipo ON sos_smarriti(tipo);
CREATE INDEX idx_sos_stato ON sos_smarriti(stato) WHERE stato = 'attivo';
CREATE INDEX idx_sos_comune ON sos_smarriti(comune);
CREATE INDEX idx_sos_provincia ON sos_smarriti(provincia);
CREATE INDEX idx_sos_data ON sos_smarriti(data_evento DESC);
