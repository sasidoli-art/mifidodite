-- ============================================
-- ADOZIONI — Adotta, Offro, Cerco
-- ============================================

CREATE TYPE annuncio_tipo AS ENUM (
  'adotta',    -- Animale disponibile per adozione (da rifugio/associazione)
  'offro',     -- Privato che cerca nuova famiglia per il proprio animale
  'cerco'      -- Persona che cerca un animale da adottare
);

CREATE TYPE annuncio_stato AS ENUM (
  'attivo',
  'in_trattativa',
  'concluso',
  'scaduto',
  'rimosso'
);

CREATE TYPE sesso_animale AS ENUM (
  'maschio',
  'femmina',
  'non_specificato'
);

CREATE TYPE taglia_animale AS ENUM (
  'piccola',     -- 0-10 kg
  'media',       -- 10-25 kg
  'grande',      -- 25-45 kg
  'gigante'      -- 45+ kg
);

CREATE TABLE annunci_adozioni (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Tipo annuncio
  tipo annuncio_tipo NOT NULL,
  stato annuncio_stato DEFAULT 'attivo',

  -- Dati animale
  nome_animale VARCHAR(100),
  specie VARCHAR(20) NOT NULL DEFAULT 'cane',  -- cane, gatto, coniglio, ecc.
  razza VARCHAR(100),
  sesso sesso_animale DEFAULT 'non_specificato',
  eta_mesi INTEGER,                            -- eta in mesi (es: 24 = 2 anni)
  taglia taglia_animale,
  colore VARCHAR(100),
  peso_kg DECIMAL(4,1),

  -- Descrizione
  titolo VARCHAR(200) NOT NULL,
  slug VARCHAR(250) UNIQUE NOT NULL,
  descrizione TEXT NOT NULL,
  carattere TEXT,                               -- "Socievole, giocherellone, ama i bambini"

  -- Salute e documenti
  vaccinato BOOLEAN DEFAULT FALSE,
  sterilizzato BOOLEAN DEFAULT FALSE,
  microchip BOOLEAN DEFAULT FALSE,
  numero_microchip VARCHAR(20),
  compatibile_bambini BOOLEAN,
  compatibile_cani BOOLEAN,
  compatibile_gatti BOOLEAN,
  note_salute TEXT,                             -- "Allergia al pollo, prende farmaco X"

  -- Media
  foto_principale VARCHAR(500),
  galleria TEXT[] DEFAULT '{}',
  video_url VARCHAR(500),

  -- Localizzazione
  comune VARCHAR(100) NOT NULL,
  provincia VARCHAR(2),
  regione VARCHAR(50),

  -- Contatto
  nome_contatto VARCHAR(100) NOT NULL,
  email_contatto VARCHAR(255) NOT NULL,
  telefono_contatto VARCHAR(30),
  tipo_contatto VARCHAR(30) DEFAULT 'privato',  -- privato, rifugio, associazione, canile
  nome_organizzazione VARCHAR(200),             -- se rifugio/associazione

  -- Policy
  richiesta_preaffido BOOLEAN DEFAULT FALSE,    -- richiede visita pre-affido?
  costo_adozione VARCHAR(100),                  -- "Gratuito", "Rimborso spese 150€"

  -- Moderazione
  approvato BOOLEAN DEFAULT FALSE,
  segnalazioni INTEGER DEFAULT 0,

  -- Metadata
  visualizzazioni INTEGER DEFAULT 0,
  contatti_ricevuti INTEGER DEFAULT 0,
  scade_il TIMESTAMP WITH TIME ZONE,            -- scadenza automatica (es. 60 giorni)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indici
CREATE INDEX idx_adozioni_tipo ON annunci_adozioni(tipo);
CREATE INDEX idx_adozioni_stato ON annunci_adozioni(stato) WHERE stato = 'attivo';
CREATE INDEX idx_adozioni_specie ON annunci_adozioni(specie);
CREATE INDEX idx_adozioni_comune ON annunci_adozioni(comune);
CREATE INDEX idx_adozioni_provincia ON annunci_adozioni(provincia);
CREATE INDEX idx_adozioni_regione ON annunci_adozioni(regione);
CREATE INDEX idx_adozioni_taglia ON annunci_adozioni(taglia);
CREATE INDEX idx_adozioni_slug ON annunci_adozioni(slug);
CREATE INDEX idx_adozioni_created ON annunci_adozioni(created_at DESC);
CREATE INDEX idx_adozioni_approvato ON annunci_adozioni(approvato) WHERE approvato = TRUE;

-- RLS
ALTER TABLE annunci_adozioni ENABLE ROW LEVEL SECURITY;

-- Annunci approvati visibili a tutti
CREATE POLICY "adozioni_select_public" ON annunci_adozioni
  FOR SELECT USING (approvato = TRUE AND stato = 'attivo');

-- Chiunque puo inserire (poi va approvato)
CREATE POLICY "adozioni_insert_public" ON annunci_adozioni
  FOR INSERT WITH CHECK (TRUE);

-- ============================================
-- TABELLA: contatti_adozione (richieste info)
-- ============================================

CREATE TABLE contatti_adozione (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  annuncio_id UUID NOT NULL REFERENCES annunci_adozioni(id) ON DELETE CASCADE,

  nome VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(30),
  messaggio TEXT NOT NULL,

  -- Informazioni adottante
  ha_giardino BOOLEAN,
  ha_altri_animali BOOLEAN,
  ha_bambini BOOLEAN,
  esperienza_precedente TEXT,

  letto BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contatti_adozione_annuncio ON contatti_adozione(annuncio_id);

-- Trigger per incrementare contatti ricevuti
CREATE OR REPLACE FUNCTION increment_contatti_adozione()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE annunci_adozioni
  SET contatti_ricevuti = contatti_ricevuti + 1
  WHERE id = NEW.annuncio_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_contatti_adozione
  AFTER INSERT ON contatti_adozione
  FOR EACH ROW EXECUTE FUNCTION increment_contatti_adozione();
