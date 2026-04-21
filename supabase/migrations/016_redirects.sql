-- 016_redirects.sql
-- Colonne per gestione redirect + delete 410 degli articoli magazine.
-- Usate da src/proxy.ts per intercettare richieste a /magazine/[slug]:
--   - redirect_to_slug NOT NULL → HTTP 301 verso il nuovo slug
--   - redirect_reason = 'deleted_410' → HTTP 410 Gone (mai più)

ALTER TABLE articoli
  ADD COLUMN IF NOT EXISTS redirect_to_slug VARCHAR(300),
  ADD COLUMN IF NOT EXISTS redirect_created_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS redirect_reason TEXT;

CREATE INDEX IF NOT EXISTS idx_articoli_redirect_to ON articoli(redirect_to_slug) WHERE redirect_to_slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_articoli_redirect_reason ON articoli(redirect_reason) WHERE redirect_reason IS NOT NULL;
