import { getDB } from "@/lib/db";
import { Bot, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agenti AI — Admin MifidoDiTe" };

interface LogRow { id: number; agente: string; stato: string; citta: string | null; risultati_trovati: number; risultati_salvati: number; errori: number; errore_messaggio: string | null; durata_ms: number | null; costo_stimato: number | null; created_at: string; }

export default async function AdminAgentiPage() {
  const sql = getDB();
  const logs = (await sql`SELECT * FROM agent_logs ORDER BY created_at DESC LIMIT 50`) as unknown as LogRow[];
  const stats = await sql`SELECT agente, count(*)::int as runs, count(*) FILTER (WHERE stato = 'ok')::int as ok, count(*) FILTER (WHERE stato = 'errore')::int as errori, MAX(created_at) as ultimo FROM agent_logs GROUP BY agente ORDER BY ultimo DESC`;

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Agenti AI</h1>
        <p className="text-muted-foreground mt-2">Log delle esecuzioni automatiche — dati reali dal database</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {(stats as Array<Record<string, unknown>>).map((s) => (
          <div key={s.agente as string} className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <Bot size={20} className="text-primary" />
              <h3 className="font-bold text-foreground capitalize">{s.agente as string}</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div><p className="font-bold text-foreground">{s.runs as number}</p><p className="text-xs text-muted-foreground">Totali</p></div>
              <div><p className="font-bold text-green-600">{s.ok as number}</p><p className="text-xs text-muted-foreground">OK</p></div>
              <div><p className="font-bold text-red-500">{s.errori as number}</p><p className="text-xs text-muted-foreground">Errori</p></div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Ultimo: {new Date(s.ultimo as string).toLocaleString("it-IT", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</p>
          </div>
        ))}
      </div>

      {stats.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-border">
          <Bot size={48} className="mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground">Nessun log. Il cron master gira ogni giorno alle 7:00.</p>
        </div>
      )}

      {logs.length > 0 && (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            <h2 className="font-bold text-foreground">Ultimi 50 log</h2>
          </div>
          <div className="divide-y divide-border">
            {logs.map((l) => (
              <div key={l.id} className="p-4 hover:bg-muted/20 flex items-start gap-3">
                {l.stato === "ok" ? <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" /> : l.stato === "errore" ? <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" /> : <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground capitalize text-sm">{l.agente}</span>
                    {l.citta && <span className="text-xs text-muted-foreground">{l.citta}</span>}
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={10} />{l.durata_ms ? `${(l.durata_ms / 1000).toFixed(1)}s` : "?"}</span>
                    <span className="text-xs text-muted-foreground">{new Date(l.created_at).toLocaleString("it-IT", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  {l.risultati_trovati > 0 && <p className="text-xs text-muted-foreground mt-1">Trovati: {l.risultati_trovati} / Salvati: {l.risultati_salvati}</p>}
                  {l.errore_messaggio && <p className="text-xs text-red-500 mt-1 line-clamp-2">{l.errore_messaggio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
