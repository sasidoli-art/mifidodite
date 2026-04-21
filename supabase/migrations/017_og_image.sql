-- 017_og_image.sql
-- Colonna Open Graph image dedicata (ibrido opzione C).
-- Se NULL, la logica Next fallback su `img` per og:image meta tag.
-- Popolata separatamente quando generiamo crop 1200x630.

ALTER TABLE articoli
  ADD COLUMN IF NOT EXISTS og_image VARCHAR(500) DEFAULT NULL;

COMMENT ON COLUMN articoli.og_image IS 'Open Graph image 1200x630. Se NULL, la logica Next fa fallback su img per og:image meta tag.';

-- img_legacy: preserva il vecchio hero Unsplash prima di sovrascriverlo,
-- così un rollback è possibile copiando img_legacy -> img.
ALTER TABLE articoli
  ADD COLUMN IF NOT EXISTS img_legacy VARCHAR(500) DEFAULT NULL;

COMMENT ON COLUMN articoli.img_legacy IS 'Backup del precedente valore di img prima della migrazione al catalogo stock. Usato per rollback.';
