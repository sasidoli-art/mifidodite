import { getDB } from "@/lib/db";
import { ExternalLink, Calendar, MapPin, Sparkles } from "lucide-react";
import { ReviewActions } from "./ReviewActions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Eventi candidati — Admin MifidoDiTe" };

interface Candidato {
  id: string;
  fonte_url: string;
  fonte_nome: string;
  titolo_raw: string;
  descrizione_raw: string | null;
  data_pubblicazione: string | null;
  categoria: string | null;
  citta: string | null;
  provincia: string | null;
  regione: string | null;
  data_evento: string | null;
  data_evento_fine: string | null;
  ai_score: number | null;
  ai_reason: string | null;
  stato: string;
  created_at: string;
}

async function getCandidati() {
  const sql = getDB();
  try {
    const pending = await sql`
      SELECT * FROM eventi_candidati
      WHERE stato = 'pending' AND is_pet = TRUE
      ORDER BY ai_score DESC NULLS LAST, created_at DESC
      LIMIT 100
    `;
    const recenti = await sql`
      SELECT * FROM eventi_candidati
      WHERE stato IN ('approved','rejected','published')
      ORDER BY reviewed_at DESC NULLS LAST
      LIMIT 20
    `;
    return { pending: pending as unknown as Candidato[], recenti: recenti as unknown as Candidato[] };
  } catch {
    return { pending: [], recenti: [], errore: "Tabella eventi_candidati non ancora creata. Applica la migration 015_eventi_candidati.sql." };
  }
}

function StatoBadge({ stato }: { stato: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    approved: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
    published: "bg-blue-50 text-blue-700",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[stato] || "bg-muted"}`}>
      {stato}
    </span>
  );
}

function Card({ c, showActions }: { c: Candidato; showActions: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-border p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {c.fonte_nome}
            </span>
            {c.categoria && (
              <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">
                {c.categoria}
              </span>
            )}
            {typeof c.ai_score === "number" && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                <Sparkles size={11} /> {c.ai_score}
              </span>
            )}
            {!showActions && <StatoBadge stato={c.stato} />}
          </div>
          <h3 className="font-bold text-foreground leading-snug">{c.titolo_raw}</h3>
        </div>
        <a
          href={c.fonte_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
          title="Apri fonte"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      {c.descrizione_raw && (
        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">{c.descrizione_raw}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        {c.data_evento && (
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {c.data_evento}
            {c.data_evento_fine && c.data_evento_fine !== c.data_evento && ` → ${c.data_evento_fine}`}
          </span>
        )}
        {(c.citta || c.regione) && (
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {[c.citta, c.provincia, c.regione].filter(Boolean).join(", ")}
          </span>
        )}
      </div>

      {c.ai_reason && (
        <div className="text-xs text-foreground/60 italic border-l-2 border-accent pl-2">
          AI: {c.ai_reason}
        </div>
      )}

      {showActions && <ReviewActions id={c.id} />}
    </div>
  );
}

export default async function EventiCandidatiPage() {
  const { pending, recenti, errore } = await getCandidati();

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Eventi candidati</h1>
        <p className="text-muted-foreground mt-1">
          Eventi pet rilevati dal cron scan-eventi-pet sulle testate Today network. Approva per promuovere in <code>/eventi</code>.
        </p>
      </div>

      {errore && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
          {errore}
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Da revisionare <span className="text-muted-foreground font-normal">({pending.length})</span>
        </h2>
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground bg-muted/50 rounded-xl p-6 text-center">
            Nessun candidato in attesa. Il cron settimanale li popolera automaticamente.
          </p>
        ) : (
          <div className="grid gap-3">
            {pending.map((c) => <Card key={c.id} c={c} showActions />)}
          </div>
        )}
      </section>

      {recenti.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Attivita recente</h2>
          <div className="grid gap-3">
            {recenti.map((c) => <Card key={c.id} c={c} showActions={false} />)}
          </div>
        </section>
      )}
    </div>
  );
}
