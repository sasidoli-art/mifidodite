-- 019_articoli_source.sql
-- Tracking provenienza articoli: seed | ai | manual
-- Backfill onesto: articoli pre-TASK 1 (logging) non hanno provenienza certa
-- al modello specifico → ai_model = 'unknown-legacy' con flag nota editoriale.

ALTER TABLE articoli
  ADD COLUMN IF NOT EXISTS source   VARCHAR(20),
  ADD COLUMN IF NOT EXISTS ai_model VARCHAR(100);

CREATE INDEX IF NOT EXISTS idx_articoli_source   ON articoli(source);
CREATE INDEX IF NOT EXISTS idx_articoli_ai_model ON articoli(ai_model) WHERE ai_model IS NOT NULL;

COMMENT ON COLUMN articoli.source   IS 'seed | ai | manual. seed=ARTICOLI_SEED iniziali (59), ai=generato con LLM, manual=scritto a mano senza AI.';
COMMENT ON COLUMN articoli.ai_model IS 'Model id se source=ai. Es: deepseek-chat, claude-haiku-4-5-20251001, qwen/qwen-2.5-72b-instruct. unknown-legacy per articoli pre-tracking (TASK 1 logging).';

-- Vista analytics
CREATE OR REPLACE VIEW v_articoli_stats AS
SELECT
  source,
  ai_model,
  COUNT(*) AS totale,
  COUNT(*) FILTER (WHERE pubblicato = true) AS pubblicati,
  COUNT(*) FILTER (WHERE redirect_to_slug IS NOT NULL) AS redirectati,
  MIN(created_at) AS primo_articolo,
  MAX(created_at) AS ultimo_articolo
FROM articoli
GROUP BY source, ai_model
ORDER BY totale DESC;
