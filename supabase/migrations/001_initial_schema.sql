-- ============================================
-- MifidoDiTe.it - Schema Database Completo
-- ============================================

-- Estensioni necessarie
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";  -- per ricerca geo per CAP/raggio

-- ============================================
-- ENUM TYPES
-- ============================================

CREATE TYPE categoria_tipo AS ENUM (
  'pensione',
  'hotel_pet_friendly',
  'spiaggia_dog_friendly',
  'toelettatura',
  'dog_sitter',
  'cat_sitter',
  'educatore_cinofilo',
  'veterinario',
  'fotografo_pet',
  'groomer',
  'dog_walking',
  'pet_taxi',
  'altro'
);

CREATE TYPE tipo_animale AS ENUM (
  'cane',
  'gatto',
  'entrambi'
);

CREATE TYPE piano_tipo AS ENUM (
  'free',
  'premium',
  'premium_plus'
);

CREATE TYPE lead_stato AS ENUM (
  'nuovo',
  'inviato',
  'visualizzato',
  'risposto',
  'convertito',
  'scaduto'
);

CREATE TYPE affiliazione_stato AS ENUM (
  'non_invitato',
  'invitato',
  'registrato',
  'attivo',
  'sospeso'
);

CREATE TYPE fonte_dati AS ENUM (
  'scraping_facebook',
  'scraping_google',
  'scraping_sito',
  'inserimento_manuale',
  'registrazione_diretta'
);

-- ============================================
-- TABELLA: strutture (pensioni, spiagge, professionisti)
-- ============================================

CREATE TABLE strutture (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Dati base
  nome VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  descrizione TEXT,
  descrizione_storytelling TEXT,  -- generata da AI

  -- Categorizzazione
  categoria categoria_tipo NOT NULL,
  sotto_categorie TEXT[] DEFAULT '{}',
  tipo_animale tipo_animale DEFAULT 'entrambi',

  -- Localizzazione
  indirizzo VARCHAR(500),
  cap VARCHAR(5),
  comune VARCHAR(100) NOT NULL,
  provincia VARCHAR(2),
  regione VARCHAR(50),
  latitudine DOUBLE PRECISION,
  longitudine DOUBLE PRECISION,
  location GEOGRAPHY(POINT, 4326),  -- PostGIS per ricerca per raggio

  -- Contatti
  telefono VARCHAR(20),
  email VARCHAR(255),
  sito_web VARCHAR(500),
  facebook_url VARCHAR(500),
  instagram_url VARCHAR(500),
  google_maps_url VARCHAR(500),

  -- Media
  foto_copertina VARCHAR(500),
  galleria TEXT[] DEFAULT '{}',

  -- Dettagli servizio
  servizi TEXT[] DEFAULT '{}',
  prezzi_indicativi JSONB DEFAULT '{}',
  orari_apertura JSONB DEFAULT '{}',
  taglie_accettate TEXT[] DEFAULT '{}'::TEXT[],  -- piccola, media, grande

  -- Affiliazione e piano
  affiliazione affiliazione_stato DEFAULT 'non_invitato',
  piano piano_tipo DEFAULT 'free',
  piano_scadenza TIMESTAMP WITH TIME ZONE,

  -- Metriche
  rating_medio DECIMAL(2,1) DEFAULT 0,
  numero_recensioni INTEGER DEFAULT 0,
  numero_lead_ricevuti INTEGER DEFAULT 0,

  -- Scraping
  fonte fonte_dati DEFAULT 'scraping_facebook',
  fonte_url VARCHAR(500),
  ultimo_scraping TIMESTAMP WITH TIME ZONE,
  dati_grezzi_scraping JSONB,
  verificato BOOLEAN DEFAULT FALSE,

  -- Metadata
  attivo BOOLEAN DEFAULT TRUE,
  in_evidenza BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indice geografico per ricerca per raggio
CREATE INDEX idx_strutture_location ON strutture USING GIST(location);
CREATE INDEX idx_strutture_categoria ON strutture(categoria);
CREATE INDEX idx_strutture_comune ON strutture(comune);
CREATE INDEX idx_strutture_cap ON strutture(cap);
CREATE INDEX idx_strutture_provincia ON strutture(provincia);
CREATE INDEX idx_strutture_attivo ON strutture(attivo) WHERE attivo = TRUE;
CREATE INDEX idx_strutture_piano ON strutture(piano);
CREATE INDEX idx_strutture_slug ON strutture(slug);

-- Trigger per aggiornare location da lat/lng
CREATE OR REPLACE FUNCTION update_location()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.latitudine IS NOT NULL AND NEW.longitudine IS NOT NULL THEN
    NEW.location = ST_SetSRID(ST_MakePoint(NEW.longitudine, NEW.latitudine), 4326)::geography;
  END IF;
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_strutture_location
  BEFORE INSERT OR UPDATE ON strutture
  FOR EACH ROW EXECUTE FUNCTION update_location();

-- ============================================
-- TABELLA: recensioni
-- ============================================

CREATE TABLE recensioni (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  struttura_id UUID NOT NULL REFERENCES strutture(id) ON DELETE CASCADE,

  autore_nome VARCHAR(100) NOT NULL,
  autore_email VARCHAR(255),

  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  titolo VARCHAR(200),
  testo TEXT,

  tipo_animale tipo_animale,
  nome_animale VARCHAR(50),

  verificata BOOLEAN DEFAULT FALSE,
  approvata BOOLEAN DEFAULT FALSE,

  fonte fonte_dati DEFAULT 'inserimento_manuale',
  fonte_url VARCHAR(500),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_recensioni_struttura ON recensioni(struttura_id);

-- Trigger per aggiornare rating medio della struttura
CREATE OR REPLACE FUNCTION update_rating_struttura()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE strutture SET
    rating_medio = (
      SELECT COALESCE(AVG(rating), 0)
      FROM recensioni
      WHERE struttura_id = COALESCE(NEW.struttura_id, OLD.struttura_id) AND approvata = TRUE
    ),
    numero_recensioni = (
      SELECT COUNT(*)
      FROM recensioni
      WHERE struttura_id = COALESCE(NEW.struttura_id, OLD.struttura_id) AND approvata = TRUE
    )
  WHERE id = COALESCE(NEW.struttura_id, OLD.struttura_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_recensioni_rating
  AFTER INSERT OR UPDATE OR DELETE ON recensioni
  FOR EACH ROW EXECUTE FUNCTION update_rating_struttura();

-- ============================================
-- TABELLA: lead (richieste disponibilità)
-- ============================================

CREATE TABLE lead (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  struttura_id UUID NOT NULL REFERENCES strutture(id) ON DELETE CASCADE,

  -- Dati richiedente
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),

  -- Dettagli richiesta
  data_inizio DATE,
  data_fine DATE,
  numero_animali INTEGER DEFAULT 1,
  tipo_animale tipo_animale DEFAULT 'cane',
  taglia VARCHAR(20),
  note TEXT,

  -- Stato
  stato lead_stato DEFAULT 'nuovo',

  -- Invito affiliazione (se struttura non affiliata)
  invito_affiliazione_inviato BOOLEAN DEFAULT FALSE,
  invito_affiliazione_data TIMESTAMP WITH TIME ZONE,

  -- Tracking
  ip_address VARCHAR(45),
  user_agent TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_lead_struttura ON lead(struttura_id);
CREATE INDEX idx_lead_stato ON lead(stato);
CREATE INDEX idx_lead_email ON lead(email);

-- ============================================
-- TABELLA: inviti_affiliazione
-- ============================================

CREATE TABLE inviti_affiliazione (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  struttura_id UUID NOT NULL REFERENCES strutture(id) ON DELETE CASCADE,

  email_destinatario VARCHAR(255),
  telefono_destinatario VARCHAR(20),

  token VARCHAR(100) UNIQUE NOT NULL,

  numero_lead_pendenti INTEGER DEFAULT 0,
  messaggio_personalizzato TEXT,

  inviato_il TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  aperto_il TIMESTAMP WITH TIME ZONE,
  registrato_il TIMESTAMP WITH TIME ZONE,

  tentativi_invio INTEGER DEFAULT 1,
  ultimo_invio TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_inviti_struttura ON inviti_affiliazione(struttura_id);
CREATE INDEX idx_inviti_token ON inviti_affiliazione(token);

-- ============================================
-- TABELLA: newsletter_iscritti
-- ============================================

CREATE TABLE newsletter_iscritti (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  email VARCHAR(255) UNIQUE NOT NULL,
  nome VARCHAR(100),

  cap VARCHAR(5),
  comune VARCHAR(100),
  provincia VARCHAR(2),
  latitudine DOUBLE PRECISION,
  longitudine DOUBLE PRECISION,

  tipo_animale tipo_animale DEFAULT 'cane',

  categorie_interesse categoria_tipo[] DEFAULT '{}',

  attivo BOOLEAN DEFAULT TRUE,
  brevo_contact_id VARCHAR(100),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_newsletter_email ON newsletter_iscritti(email);
CREATE INDEX idx_newsletter_cap ON newsletter_iscritti(cap);

-- ============================================
-- TABELLA: scraping_log
-- ============================================

CREATE TABLE scraping_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  fonte fonte_dati NOT NULL,
  query_usata TEXT,
  url_sorgente VARCHAR(500),

  strutture_trovate INTEGER DEFAULT 0,
  strutture_nuove INTEGER DEFAULT 0,
  strutture_aggiornate INTEGER DEFAULT 0,
  errori INTEGER DEFAULT 0,

  dettagli JSONB DEFAULT '{}',

  iniziato_il TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completato_il TIMESTAMP WITH TIME ZONE,
  durata_secondi INTEGER
);

-- ============================================
-- TABELLA: utenti_struttura (gestori affiliati)
-- ============================================

CREATE TABLE utenti_struttura (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,  -- Supabase Auth user id
  struttura_id UUID NOT NULL REFERENCES strutture(id) ON DELETE CASCADE,

  ruolo VARCHAR(20) DEFAULT 'owner',

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, struttura_id)
);

CREATE INDEX idx_utenti_struttura_user ON utenti_struttura(user_id);

-- ============================================
-- RLS (Row Level Security)
-- ============================================

ALTER TABLE strutture ENABLE ROW LEVEL SECURITY;
ALTER TABLE recensioni ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_iscritti ENABLE ROW LEVEL SECURITY;

-- Strutture: leggibili da tutti, modificabili solo dai gestori
CREATE POLICY "strutture_select_public" ON strutture
  FOR SELECT USING (attivo = TRUE);

CREATE POLICY "strutture_update_owner" ON strutture
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM utenti_struttura
      WHERE utenti_struttura.struttura_id = strutture.id
        AND utenti_struttura.user_id = auth.uid()
    )
  );

-- Recensioni: leggibili da tutti se approvate, inseribili da chiunque
CREATE POLICY "recensioni_select_public" ON recensioni
  FOR SELECT USING (approvata = TRUE);

CREATE POLICY "recensioni_insert_public" ON recensioni
  FOR INSERT WITH CHECK (TRUE);

-- Lead: visibili solo al gestore della struttura
CREATE POLICY "lead_select_owner" ON lead
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM utenti_struttura
      WHERE utenti_struttura.struttura_id = lead.struttura_id
        AND utenti_struttura.user_id = auth.uid()
    )
  );

CREATE POLICY "lead_insert_public" ON lead
  FOR INSERT WITH CHECK (TRUE);

-- Newsletter: solo admin
CREATE POLICY "newsletter_admin" ON newsletter_iscritti
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- FUNZIONE: ricerca per raggio (km)
-- ============================================

CREATE OR REPLACE FUNCTION cerca_strutture_vicine(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  raggio_km INTEGER DEFAULT 30,
  cat categoria_tipo DEFAULT NULL,
  lim INTEGER DEFAULT 20,
  off_set INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  nome VARCHAR,
  slug VARCHAR,
  descrizione TEXT,
  descrizione_storytelling TEXT,
  categoria categoria_tipo,
  comune VARCHAR,
  provincia VARCHAR,
  foto_copertina VARCHAR,
  rating_medio DECIMAL,
  numero_recensioni INTEGER,
  piano piano_tipo,
  in_evidenza BOOLEAN,
  distanza_km DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id, s.nome, s.slug, s.descrizione, s.descrizione_storytelling,
    s.categoria, s.comune, s.provincia, s.foto_copertina,
    s.rating_medio, s.numero_recensioni, s.piano, s.in_evidenza,
    ROUND((ST_Distance(
      s.location,
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
    ) / 1000)::numeric, 1)::double precision AS distanza_km
  FROM strutture s
  WHERE s.attivo = TRUE
    AND (cat IS NULL OR s.categoria = cat)
    AND ST_DWithin(
      s.location,
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
      raggio_km * 1000
    )
  ORDER BY
    s.in_evidenza DESC,
    s.piano DESC,
    distanza_km ASC
  LIMIT lim
  OFFSET off_set;
END;
$$ LANGUAGE plpgsql STABLE;
