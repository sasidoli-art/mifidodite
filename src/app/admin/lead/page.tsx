import { getDB } from "@/lib/db";
import { MessageSquare, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Lead — Admin MifidoDiTe" };

interface LeadRow { id: number; struttura_id: string | null; nome: string; email: string; telefono: string | null; tipo_animale: string; numero_animali: number; note: string | null; stato: string; created_at: string; }

export default async function AdminLeadPage() {
  const sql = getDB();
  const leads = (await sql`SELECT id, struttura_id, nome, email, telefono, tipo_animale, numero_animali, note, stato, created_at FROM lead ORDER BY created_at DESC LIMIT 100`) as unknown as LeadRow[];
  const totale = await sql`SELECT count(*)::int as n FROM lead`;
  const oggi = await sql`SELECT count(*)::int as n FROM lead WHERE created_at >= CURRENT_DATE`;

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Lead</h1>
        <p className="text-muted-foreground mt-2">Richieste di contatto ricevute — dati reali dal database</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
          <p className="text-3xl font-bold text-purple-700">{totale[0].n}</p>
          <p className="text-xs text-purple-700 mt-1">Lead totali</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <p className="text-3xl font-bold text-foreground">{oggi[0].n}</p>
          <p className="text-xs text-muted-foreground mt-1">Oggi</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <p className="text-3xl font-bold text-foreground">{leads.filter((l) => l.stato === "nuovo").length}</p>
          <p className="text-xs text-muted-foreground mt-1">Da gestire</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare size={48} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">Nessun lead ricevuto ancora.</p>
            <p className="text-xs text-muted-foreground mt-1">I lead arriveranno quando gli utenti invieranno richieste ai professionisti.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {leads.map((l) => (
              <div key={l.id} className="p-4 hover:bg-muted/20">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="font-semibold text-foreground">{l.nome}</span>
                    <span className="text-muted-foreground text-sm ml-2">{l.email}</span>
                    {l.telefono && <span className="text-muted-foreground text-sm ml-2">{l.telefono}</span>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${l.stato === "nuovo" ? "bg-amber-50 text-amber-700" : l.stato === "inviato" ? "bg-blue-50 text-blue-700" : l.stato === "risposto" ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"}`}>{l.stato}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={10} />{new Date(l.created_at).toLocaleDateString("it-IT")}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{l.numero_animali}x {l.tipo_animale} {l.note ? `— ${l.note}` : ""}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
