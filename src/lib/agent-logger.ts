// ============================================
// Agent Logger — traccia ogni esecuzione
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

export async function logAgent(entry: AgentLogEntry) {
  // Salva su DB se configurato
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      await supabase.from("agent_logs").insert({
        agente: entry.agente,
        stato: entry.stato,
        citta: entry.citta || null,
        risultati_trovati: entry.risultati_trovati || 0,
        risultati_salvati: entry.risultati_salvati || 0,
        errori: entry.errori || 0,
        dettagli: entry.dettagli || {},
        errore_messaggio: entry.errore_messaggio || null,
        durata_ms: entry.durata_ms || null,
        costo_stimato: entry.costo_stimato || null,
      });
    } catch {
      // Se il DB non funziona, log in console
      console.error("[AgentLogger] DB error, fallback to console:", entry);
    }
  }

  // Sempre log in console per debug
  const emoji = entry.stato === "ok" ? "✅" : entry.stato === "parziale" ? "⚠️" : "❌";
  console.log(
    `[Agent:${entry.agente}] ${emoji} ${entry.stato} | trovati:${entry.risultati_trovati || 0} salvati:${entry.risultati_salvati || 0} errori:${entry.errori || 0}${entry.citta ? ` | ${entry.citta}` : ""}${entry.errore_messaggio ? ` | ${entry.errore_messaggio}` : ""}`
  );
}

// Timer helper
export function startTimer() {
  const start = Date.now();
  return () => Date.now() - start;
}

// Stima costo Claude Haiku per numero di token
// Haiku: $0.25/1M input, $1.25/1M output (circa)
export function stimaCosto(inputChars: number, outputChars: number): number {
  const inputTokens = inputChars / 4; // stima grezza
  const outputTokens = outputChars / 4;
  return (inputTokens * 0.25 + outputTokens * 1.25) / 1_000_000;
}
