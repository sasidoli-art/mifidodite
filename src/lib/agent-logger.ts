// ============================================
// Agent Logger — traccia ogni esecuzione su Neon
// Schema: migration 018_agent_logs_v2.sql
// ============================================

import { neon } from "@neondatabase/serverless";

export type AgentStatus = "started" | "success" | "error" | "timeout" | "skipped";

export interface TokenUsage {
  input: number;
  output: number;
}

// ---- Pricing (USD/1M tokens) + conversione EUR ----
// fixed conversion rate, update quarterly if needed
const USD_EUR = 0.92;
const PRICING_USD_PER_MTOK: Record<string, { in: number; out: number }> = {
  "claude-haiku-4-5-20251001": { in: 1.0, out: 5.0 },
  "deepseek-chat":              { in: 0.14, out: 0.28 },
  "qwen/qwen-2.5-72b-instruct": { in: 0.40, out: 0.40 },
};

export function calculateCost(model: string, inputTokens: number, outputTokens: number): number {
  const p = PRICING_USD_PER_MTOK[model];
  if (!p) return 0;
  const usd = (inputTokens / 1_000_000) * p.in + (outputTokens / 1_000_000) * p.out;
  return Number((usd * USD_EUR).toFixed(6));
}

// ---- DB helper: safe no-throw ----
function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

async function safeExec(fn: () => Promise<unknown>, label: string): Promise<void> {
  try {
    await fn();
  } catch (err) {
    console.error(`[agent-logger] ${label} fallito (non bloccante):`, (err as Error).message);
  }
}

// ---- Start: ritorna run_id per follow-up ----
export async function logAgentStart(
  agente: string,
  modelUsed: string | null,
  fullInput?: string,
  metadata?: Record<string, unknown>
): Promise<string | null> {
  const sql = getSql();
  if (!sql) return null;

  const runId = crypto.randomUUID();
  await safeExec(async () => {
    await sql`
      INSERT INTO agent_logs (agente, run_id, status, model_used, full_input, metadata)
      VALUES (${agente}, ${runId}, 'started', ${modelUsed}, ${fullInput ?? null}, ${metadata ? JSON.stringify(metadata) : null}::jsonb)
    `;
  }, `start ${agente}`);
  return runId;
}

// ---- Success ----
export async function logAgentSuccess(
  runId: string | null,
  opts: {
    inputTokens?: number;
    outputTokens?: number;
    fullOutput?: string;
    costEur?: number;
    articlesGeneratedIds?: number[];
    metadataExtra?: Record<string, unknown>;
  } = {}
): Promise<void> {
  if (!runId) return;
  const sql = getSql();
  if (!sql) return;

  const {
    inputTokens = null,
    outputTokens = null,
    fullOutput = null,
    costEur = null,
    articlesGeneratedIds = null,
    metadataExtra = null,
  } = opts;

  await safeExec(async () => {
    await sql`
      UPDATE agent_logs
      SET status = 'success',
          timestamp_end = NOW(),
          duration_ms = (EXTRACT(EPOCH FROM (NOW() - timestamp_start)) * 1000)::int,
          input_tokens = ${inputTokens},
          output_tokens = ${outputTokens},
          cost_eur = ${costEur},
          full_output = ${fullOutput},
          articles_generated_ids = ${articlesGeneratedIds},
          metadata = COALESCE(metadata, '{}'::jsonb) || ${metadataExtra ? JSON.stringify(metadataExtra) : "{}"}::jsonb
      WHERE run_id = ${runId}
    `;
  }, `success ${runId}`);
}

// ---- Error ----
export async function logAgentError(
  runId: string | null,
  errorMessage: string,
  metadataExtra?: Record<string, unknown>
): Promise<void> {
  if (!runId) return;
  const sql = getSql();
  if (!sql) return;

  await safeExec(async () => {
    await sql`
      UPDATE agent_logs
      SET status = 'error',
          timestamp_end = NOW(),
          duration_ms = (EXTRACT(EPOCH FROM (NOW() - timestamp_start)) * 1000)::int,
          error_message = ${errorMessage.slice(0, 5000)},
          metadata = COALESCE(metadata, '{}'::jsonb) || ${metadataExtra ? JSON.stringify(metadataExtra) : "{}"}::jsonb
      WHERE run_id = ${runId}
    `;
  }, `error ${runId}`);
}

// ---- Skipped ----
export async function logAgentSkipped(
  runId: string | null,
  reason: string
): Promise<void> {
  if (!runId) return;
  const sql = getSql();
  if (!sql) return;

  await safeExec(async () => {
    await sql`
      UPDATE agent_logs
      SET status = 'skipped',
          timestamp_end = NOW(),
          duration_ms = (EXTRACT(EPOCH FROM (NOW() - timestamp_start)) * 1000)::int,
          error_message = ${reason}
      WHERE run_id = ${runId}
    `;
  }, `skipped ${runId}`);
}

// ============================================
// Legacy API — backward compat per agent vecchi
// master/scraper/writer/monitor/social esistenti chiamano logAgent()
// con signature vecchia (agente/stato/dettagli). Li lascio funzionare
// proxando a INSERT 1-shot.
// ============================================
export interface AgentLogEntry {
  agente: string;
  stato: "ok" | "errore" | "parziale";
  citta?: string;
  risultati_trovati?: number;
  risultati_salvati?: number;
  errori?: number;
  dettagli?: Record<string, unknown>;
  errore_messaggio?: string;
  durata_ms?: number;
  costo_stimato?: number;
}

export async function logAgent(entry: AgentLogEntry): Promise<void> {
  const sql = getSql();
  if (!sql) {
    console.log(`[Agent:${entry.agente}] ${entry.stato} (logger no-op: DATABASE_URL mancante)`);
    return;
  }

  const status: AgentStatus =
    entry.stato === "ok" ? "success" :
    entry.stato === "errore" ? "error" : "success";

  const metadata = {
    citta: entry.citta,
    risultati_trovati: entry.risultati_trovati,
    risultati_salvati: entry.risultati_salvati,
    errori: entry.errori,
    ...(entry.dettagli ?? {}),
  };

  await safeExec(async () => {
    await sql`
      INSERT INTO agent_logs
        (agente, status, duration_ms, cost_eur, error_message, metadata, timestamp_end)
      VALUES
        (${entry.agente}, ${status}, ${entry.durata_ms ?? null}, ${entry.costo_stimato ?? null},
         ${entry.errore_messaggio ?? null},
         ${JSON.stringify(metadata)}::jsonb,
         NOW())
    `;
  }, `legacy ${entry.agente}`);

  const emoji = entry.stato === "ok" ? "✅" : entry.stato === "parziale" ? "⚠️" : "❌";
  console.log(
    `[Agent:${entry.agente}] ${emoji} ${entry.stato} | trovati:${entry.risultati_trovati || 0} salvati:${entry.risultati_salvati || 0} errori:${entry.errori || 0}${entry.errore_messaggio ? ` | ${entry.errore_messaggio}` : ""}`
  );

  // Notifica email su errore (invariato rispetto alla v1)
  if (entry.stato === "errore" && process.env.SMTP_PASS) {
    try {
      const { sendEmail } = await import("@/lib/email");
      await sendEmail({
        to: "info@mifidodite.eu",
        subject: `Agente ${entry.agente} in ERRORE`,
        html: `
          <h2>Agente ${entry.agente} ha fallito</h2>
          <p><strong>Errore:</strong> ${entry.errore_messaggio || "Sconosciuto"}</p>
          <p><strong>Citta:</strong> ${entry.citta || "N/A"}</p>
          <p><strong>Durata:</strong> ${entry.durata_ms ? `${(entry.durata_ms / 1000).toFixed(1)}s` : "N/A"}</p>
          <p><strong>Data:</strong> ${new Date().toISOString()}</p>
        `,
      });
    } catch {
      console.error("[AgentLogger] email errore non inviata");
    }
  }
}

export function startTimer(): () => number {
  const t0 = Date.now();
  return () => Date.now() - t0;
}

// Legacy: stima costo basata su char (usata dagli agent vecchi prima del refactor).
// Ora ridirige a calculateCost con conversione grezza char→token (÷4).
export function stimaCosto(inputChars: number, outputChars: number): number {
  const inputTokens = Math.ceil(inputChars / 4);
  const outputTokens = Math.ceil(outputChars / 4);
  return calculateCost("claude-haiku-4-5-20251001", inputTokens, outputTokens);
}
