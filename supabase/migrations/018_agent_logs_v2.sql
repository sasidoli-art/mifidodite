-- 018_agent_logs_v2.sql
-- Refactor agent_logs: schema vecchio (italian, 012) era rotto in runtime
-- (logger cercava NEXT_PUBLIC_SUPABASE_URL ma il progetto usa Neon → 0 righe
-- scritte dalla creazione). Rimpiazziamo lo schema con quello target.
--
-- BACKWARD COMPAT: tabella vecchia aveva 0 righe, nessun dato da preservare.
-- DROP + CREATE è pragmatico vs 11 rename + 7 ADD.

DROP TABLE IF EXISTS agent_logs CASCADE;

CREATE TABLE IF NOT EXISTS agent_logs (
  id                     BIGSERIAL PRIMARY KEY,
  agente                 VARCHAR(50) NOT NULL,
  run_id                 UUID NOT NULL DEFAULT gen_random_uuid(),
  timestamp_start        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  timestamp_end          TIMESTAMPTZ,
  status                 VARCHAR(20) NOT NULL,
  model_used             VARCHAR(100),
  input_tokens           INTEGER,
  output_tokens          INTEGER,
  cost_eur               NUMERIC(10, 6),
  duration_ms            INTEGER,
  error_message          TEXT,
  full_input             TEXT,
  full_output            TEXT,
  articles_generated_ids INTEGER[],
  metadata               JSONB,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agent_logs_agente     ON agent_logs(agente);
CREATE INDEX IF NOT EXISTS idx_agent_logs_status     ON agent_logs(status);
CREATE INDEX IF NOT EXISTS idx_agent_logs_timestamp  ON agent_logs(timestamp_start DESC);
CREATE INDEX IF NOT EXISTS idx_agent_logs_run_id     ON agent_logs(run_id);

COMMENT ON TABLE agent_logs IS 'Log esecuzioni agent AI — writer, scraper, monitor, chatbot, ecc. Scritto da src/lib/agent-logger.ts (Neon-backed).';
COMMENT ON COLUMN agent_logs.run_id IS 'Link start → end della stessa esecuzione. Default = auto, passabile esplicitamente per trace multi-step.';
COMMENT ON COLUMN agent_logs.cost_eur IS 'Costo stimato in EUR, 6 decimali per sub-cent DeepSeek. Conversione USD→EUR hardcoded 0.92.';
