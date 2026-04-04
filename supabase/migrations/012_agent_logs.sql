-- Log esecuzioni agenti AI
CREATE TABLE agent_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  agente VARCHAR(30) NOT NULL,  -- scraper, writer, social, outreach, monitor
  stato VARCHAR(10) NOT NULL,   -- ok, errore, parziale

  -- Cosa ha fatto
  citta VARCHAR(100),           -- per scraper
  risultati_trovati INTEGER DEFAULT 0,
  risultati_salvati INTEGER DEFAULT 0,
  errori INTEGER DEFAULT 0,

  -- Dettagli
  dettagli JSONB DEFAULT '{}',  -- dati specifici per agente
  errore_messaggio TEXT,

  durata_ms INTEGER,
  costo_stimato DECIMAL(6,4),   -- costo Claude Haiku stimato

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_agent_logs_agente ON agent_logs(agente);
CREATE INDEX idx_agent_logs_stato ON agent_logs(stato);
CREATE INDEX idx_agent_logs_data ON agent_logs(created_at DESC);
