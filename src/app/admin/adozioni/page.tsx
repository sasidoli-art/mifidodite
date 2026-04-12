import { getDB } from "@/lib/db";
import { Heart, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Adozioni & SOS — Admin MifidoDiTe" };

interface AdozioneRow { id: string; tipo: string; stato: string; nome_animale: string | null; specie: string; titolo: string; comune: string; provincia: string; approvato: boolean; created_at: string; }
interface SOSRow { id: string; nome_animale: string; specie: string; comune: string; provincia: string; stato: string; created_at: string; }

export default async function AdminAdozioniPage() {
  const sql = getDB();

  let adozioniRows: AdozioneRow[] = [];
  let sosRows: SOSRow[] = [];
  let sA = { totali: 0, da_approvare: 0, attivi: 0 };
  let sS = { totali: 0, attivi: 0, ritrovati: 0 };

  try {
    const [adozioni, sos, statsAdozioni, statsSOS] = await Promise.all([
      sql`SELECT id, tipo, stato, nome_animale, specie, titolo, comune, provincia, approvato, created_at FROM annunci_adozioni ORDER BY created_at DESC LIMIT 50`,
      sql`SELECT id, nome_animale, specie, comune, provincia, stato, created_at FROM sos_smarriti ORDER BY created_at DESC LIMIT 50`,
      sql`SELECT count(*)::int as totali, count(*) FILTER (WHERE approvato IS NOT TRUE)::int as da_approvare, count(*) FILTER (WHERE approvato = true AND stato = 'attivo')::int as attivi FROM annunci_adozioni`,
      sql`SELECT count(*)::int as totali, count(*) FILTER (WHERE stato = 'attivo')::int as attivi, count(*) FILTER (WHERE stato = 'ritrovato')::int as ritrovati FROM sos_smarriti`,
    ]);
    adozioniRows = adozioni as unknown as AdozioneRow[];
    sosRows = sos as unknown as SOSRow[];
    sA = statsAdozioni[0] as Record<string, number> as typeof sA;
    sS = statsSOS[0] as Record<string, number> as typeof sS;
  } catch (err) {
    console.error("[Admin Adozioni] DB error:", err);
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Adozioni &amp; SOS Smarriti</h1>
        <p className="text-muted-foreground mt-2">Gestione annunci adozione e segnalazioni smarrimento — dati reali dal database</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <Heart size={20} className="text-red-600 mb-2" />
          <p className="text-3xl font-bold text-red-700">{sA.totali}</p>
          <p className="text-xs text-red-700 mt-1">Adozioni totali</p>
        </div>
        <div className={`rounded-2xl p-5 ${sA.da_approvare > 0 ? "bg-amber-50 border border-amber-200" : "bg-white border border-border"}`}>
          <p className="text-3xl font-bold text-foreground">{sA.da_approvare}</p>
          <p className="text-xs text-muted-foreground mt-1">Da approvare</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
          <AlertTriangle size={20} className="text-orange-600 mb-2" />
          <p className="text-3xl font-bold text-orange-700">{sS.attivi}</p>
          <p className="text-xs text-orange-700 mt-1">SOS attivi</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <p className="text-3xl font-bold text-green-700">{sS.ritrovati}</p>
          <p className="text-xs text-green-700 mt-1">SOS ritrovati</p>
        </div>
      </div>

      {/* Adozioni da approvare */}
      {adozioniRows.some((a) => !a.approvato) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Adozioni da approvare ({adozioniRows.filter((a) => !a.approvato).length})
          </h2>
          <div className="space-y-3">
            {adozioniRows.filter((a) => !a.approvato).map((a) => (
              <div key={a.id} className="bg-white border-2 border-amber-200 rounded-2xl p-5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full mr-2">BOZZA</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize mr-2">{a.tipo}</span>
                  <span className="font-bold text-foreground">{a.nome_animale || a.titolo}</span>
                  <p className="text-sm text-muted-foreground mt-1">{a.specie} — {a.comune} ({a.provincia})</p>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString("it-IT")}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Adozioni attive */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-foreground mb-4">Adozioni ({adozioniRows.filter((a) => a.approvato).length})</h2>
        {adozioniRows.filter((a) => a.approvato).length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-12 text-center">
            <Heart size={48} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">Nessun annuncio di adozione interno.</p>
            <p className="text-xs text-muted-foreground mt-1">Gli annunci arrivano da Subito.it (sezione pubblica) o dal form di pubblicazione.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {adozioniRows.filter((a) => a.approvato).map((a) => (
              <div key={a.id} className="p-4 hover:bg-muted/20 flex items-center justify-between">
                <div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize mr-2">{a.tipo}</span>
                  <span className="font-semibold text-foreground">{a.nome_animale || a.titolo}</span>
                  <span className="text-sm text-muted-foreground ml-2">{a.comune} ({a.provincia})</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${a.stato === "attivo" ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"}`}>{a.stato}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SOS Smarriti */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">SOS Smarriti ({sosRows.length})</h2>
        {sosRows.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-12 text-center">
            <AlertTriangle size={48} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">Nessuna segnalazione SOS.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {sosRows.map((s) => (
              <div key={s.id} className="p-4 hover:bg-muted/20 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground">{s.nome_animale}</span>
                  <span className="text-sm text-muted-foreground ml-2">{s.specie} — {s.comune} ({s.provincia})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.stato === "attivo" ? "bg-red-50 text-red-600" : s.stato === "ritrovato" ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"}`}>{s.stato}</span>
                  <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString("it-IT")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
