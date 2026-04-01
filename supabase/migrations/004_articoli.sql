-- Tabella articoli magazine
CREATE TABLE articoli (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  titolo VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,

  categoria VARCHAR(50) NOT NULL, -- guide, salute, comportamento, curiosita, razze, gatti, consigli, aneddoti

  estratto TEXT NOT NULL, -- 2-3 righe per la card
  contenuto TEXT NOT NULL, -- articolo completo in HTML

  img VARCHAR(500),
  img_alt VARCHAR(200),

  tempo_lettura VARCHAR(10), -- "5 min"

  tags TEXT[] DEFAULT '{}',

  fonte_url VARCHAR(500), -- fonte originale da cui è stato ispirato
  fonte_nome VARCHAR(200),

  pubblicato BOOLEAN DEFAULT TRUE,
  in_evidenza BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_articoli_categoria ON articoli(categoria);
CREATE INDEX idx_articoli_slug ON articoli(slug);
CREATE INDEX idx_articoli_pubblicato ON articoli(pubblicato) WHERE pubblicato = TRUE;
CREATE INDEX idx_articoli_created ON articoli(created_at DESC);
