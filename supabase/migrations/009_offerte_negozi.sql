-- Offerte e volantini negozi pet

CREATE TABLE offerte (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Negozio (puo essere collegato a strutture o standalone)
  struttura_id UUID REFERENCES strutture(id) ON DELETE SET NULL,
  nome_negozio VARCHAR(200) NOT NULL,
  comune VARCHAR(100) NOT NULL,
  provincia VARCHAR(2),

  -- Offerta
  titolo VARCHAR(200) NOT NULL,
  slug VARCHAR(250) UNIQUE NOT NULL,
  descrizione TEXT,
  prezzo_originale VARCHAR(20),    -- "29.90€"
  prezzo_scontato VARCHAR(20),     -- "19.90€"
  sconto_percentuale INTEGER,      -- 33

  categoria_prodotto VARCHAR(50),   -- cibo_cane, cibo_gatto, accessori, igiene, giochi, salute
  marca VARCHAR(100),

  -- Media
  img VARCHAR(500),
  volantino_url VARCHAR(500),       -- PDF del volantino completo

  -- Validita
  valido_dal DATE,
  valido_al DATE,

  attivo BOOLEAN DEFAULT TRUE,
  visualizzazioni INTEGER DEFAULT 0,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_offerte_provincia ON offerte(provincia);
CREATE INDEX idx_offerte_comune ON offerte(comune);
CREATE INDEX idx_offerte_categoria ON offerte(categoria_prodotto);
CREATE INDEX idx_offerte_attivo ON offerte(attivo) WHERE attivo = TRUE;
CREATE INDEX idx_offerte_valido ON offerte(valido_al);
