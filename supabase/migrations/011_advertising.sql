-- ============================================
-- INFRASTRUTTURA PUBBLICITARIA
-- ============================================

-- Profilo animale dell'utente (il dato che vale oro)
CREATE TABLE profili_animale (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Chi e il proprietario
  email VARCHAR(255) NOT NULL,
  newsletter_id UUID REFERENCES newsletter_iscritti(id),

  -- L'animale
  nome_animale VARCHAR(100),
  specie VARCHAR(20) NOT NULL DEFAULT 'cane',
  razza VARCHAR(100),
  eta_anni INTEGER,
  taglia VARCHAR(20),
  sesso VARCHAR(20),

  -- Dati preziosi per gli inserzionisti
  marca_cibo_attuale VARCHAR(100),       -- "Royal Canin", "Monge", "Acana"
  budget_mensile VARCHAR(20),            -- "sotto 30€", "30-60€", "sopra 60€"
  interessi TEXT[] DEFAULT '{}',         -- "toelettatura", "viaggi", "agility", "salute"

  -- Localizzazione (gia nel newsletter_iscritti, duplicato per query veloci)
  cap VARCHAR(5),
  comune VARCHAR(100),
  provincia VARCHAR(2),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_profili_email ON profili_animale(email);
CREATE INDEX idx_profili_specie ON profili_animale(specie);
CREATE INDEX idx_profili_razza ON profili_animale(razza);
CREATE INDEX idx_profili_taglia ON profili_animale(taglia);
CREATE INDEX idx_profili_provincia ON profili_animale(provincia);
CREATE INDEX idx_profili_marca ON profili_animale(marca_cibo_attuale);

-- ============================================
-- SPAZI PUBBLICITARI (Banner e posizioni)
-- ============================================

CREATE TABLE spazi_pubblicitari (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Posizione
  posizione VARCHAR(50) NOT NULL UNIQUE,   -- 'header_banner', 'sidebar_professionisti', 'tra_articoli', 'newsletter_top', 'newsletter_bottom', 'homepage_hero'
  nome VARCHAR(100) NOT NULL,              -- "Banner Homepage", "Sidebar Ricerca"
  descrizione TEXT,
  dimensioni VARCHAR(50),                   -- "728x90", "300x250", "full-width"

  -- Prezzo
  prezzo_mensile DECIMAL(10,2),
  prezzo_cpm DECIMAL(10,2),                 -- costo per mille impressioni (alternativo)

  attivo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posizioni pre-definite
INSERT INTO spazi_pubblicitari (posizione, nome, descrizione, dimensioni, prezzo_mensile) VALUES
  ('homepage_hero', 'Banner Homepage Hero', 'Sotto la barra di ricerca, visibile a TUTTI i visitatori', 'full-width', 500),
  ('homepage_categorie', 'Tra le Categorie', 'Tra la sezione categorie e i professionisti in evidenza', 'full-width', 300),
  ('sidebar_professionisti', 'Sidebar Ricerca Professionisti', 'Accanto ai risultati di ricerca — alta conversione', '300x250', 400),
  ('tra_articoli', 'Tra gli Articoli Magazine', 'Tra un articolo e l''altro — contesto editoriale', 'full-width', 250),
  ('articolo_footer', 'Fine Articolo', 'Dopo ogni articolo del magazine — lettore gia engaggiato', 'full-width', 200),
  ('newsletter_top', 'Top Newsletter', 'In cima alla newsletter settimanale — massima visibilita', 'full-width', 350),
  ('newsletter_bottom', 'Bottom Newsletter', 'In fondo alla newsletter — costo minore', 'full-width', 150),
  ('sos_sidebar', 'Sidebar SOS Smarriti', 'Accanto alle segnalazioni — utente emotivamente coinvolto', '300x250', 200);

-- ============================================
-- CAMPAGNE PUBBLICITARIE
-- ============================================

CREATE TABLE campagne (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Inserzionista
  azienda VARCHAR(200) NOT NULL,
  referente VARCHAR(100),
  email_referente VARCHAR(255),
  telefono_referente VARCHAR(30),

  -- Campagna
  nome_campagna VARCHAR(200) NOT NULL,
  tipo VARCHAR(30) NOT NULL,              -- 'banner', 'sponsored_article', 'newsletter', 'partnership'

  -- Contenuto
  img_banner VARCHAR(500),
  link_destinazione VARCHAR(500),
  testo_ad TEXT,
  articolo_sponsorizzato_id UUID,         -- se tipo = sponsored_article

  -- Targeting
  target_specie TEXT[] DEFAULT '{}',      -- ['cane'], ['gatto'], ['cane','gatto']
  target_taglia TEXT[] DEFAULT '{}',      -- ['piccola','media']
  target_province TEXT[] DEFAULT '{}',    -- ['MI','RM','TO'] — vuoto = tutta Italia
  target_razze TEXT[] DEFAULT '{}',       -- targeting per razza specifica

  -- Posizionamento
  spazio_id UUID REFERENCES spazi_pubblicitari(id),

  -- Budget e date
  budget_totale DECIMAL(10,2),
  prezzo_concordato DECIMAL(10,2),
  data_inizio DATE NOT NULL,
  data_fine DATE NOT NULL,

  -- Metriche
  impressioni INTEGER DEFAULT 0,
  click INTEGER DEFAULT 0,
  ctr DECIMAL(5,2) DEFAULT 0,             -- click-through rate

  -- Stato
  attiva BOOLEAN DEFAULT FALSE,
  approvata BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_campagne_azienda ON campagne(azienda);
CREATE INDEX idx_campagne_attiva ON campagne(attiva) WHERE attiva = TRUE;
CREATE INDEX idx_campagne_date ON campagne(data_inizio, data_fine);
CREATE INDEX idx_campagne_tipo ON campagne(tipo);

-- ============================================
-- LOG IMPRESSIONI E CLICK (per reportistica)
-- ============================================

CREATE TABLE ad_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campagna_id UUID NOT NULL REFERENCES campagne(id),
  tipo VARCHAR(10) NOT NULL,              -- 'impression', 'click'
  pagina VARCHAR(200),                     -- su quale pagina e stato visto/cliccato
  user_agent TEXT,
  ip_hash VARCHAR(64),                     -- hash dell'IP, non l'IP grezzo (GDPR)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ad_events_campagna ON ad_events(campagna_id);
CREATE INDEX idx_ad_events_tipo ON ad_events(tipo);
CREATE INDEX idx_ad_events_data ON ad_events(created_at);

-- Funzione per aggiornare metriche campagna
CREATE OR REPLACE FUNCTION update_campagna_metriche()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tipo = 'impression' THEN
    UPDATE campagne SET impressioni = impressioni + 1 WHERE id = NEW.campagna_id;
  ELSIF NEW.tipo = 'click' THEN
    UPDATE campagne SET
      click = click + 1,
      ctr = CASE WHEN impressioni > 0 THEN (click + 1)::decimal / impressioni * 100 ELSE 0 END
    WHERE id = NEW.campagna_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_ad_events
  AFTER INSERT ON ad_events
  FOR EACH ROW EXECUTE FUNCTION update_campagna_metriche();
