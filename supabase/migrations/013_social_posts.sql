-- Post social generati dall'agente Social
CREATE TABLE social_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  articolo_titolo VARCHAR(300),
  piattaforma VARCHAR(20) NOT NULL,  -- facebook, instagram, tiktok

  contenuto TEXT NOT NULL,            -- il testo del post
  hashtags TEXT[] DEFAULT '{}',       -- per Instagram

  pubblicato BOOLEAN DEFAULT FALSE,
  pubblicato_il TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_social_posts_piattaforma ON social_posts(piattaforma);
CREATE INDEX idx_social_posts_pubblicato ON social_posts(pubblicato);
