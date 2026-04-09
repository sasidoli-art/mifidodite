import { getDB } from "@/lib/db";
import { Building2 } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Strutture — Admin MifidoDiTe" };

interface StrutturaRow { id: string; nome: string; categoria: string; comune: string; provincia: string; email: string | null; telefono: string | null; attivo: boolean; affiliazione: string; created_at: string; }

export default async function AdminStrutturePage() {
  const sql = getDB();
  const strutture = (await sql`SELECT id, nome, categoria, comune, provincia, email, telefono, attivo, affiliazione, created_at FROM strutture ORDER BY created_at DESC LIMIT 100`) as unknown as StrutturaRow[];
  const totale = await sql`SELECT count(*)::int as n FROM strutture`;
  const attive = await sql`SELECT count(*)::int as n FROM strutture WHERE attivo = true`;

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Strutture</h1>
        <p className="text-muted-foreground mt-2">Professionisti registrati — dati reali dal database</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-border rounded-2xl p-5">
          <p className="text-3xl font-bold text-foreground">{totale[0].n}</p>
          <p className="text-xs text-muted-foreground mt-1">Totale strutture</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <p className="text-3xl font-bold text-green-700">{attive[0].n}</p>
          <p className="text-xs text-green-700 mt-1">Attive</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {strutture.length === 0 ? (
          <div className="p-12 text-center">
            <Building2 size={48} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">Nessuna struttura registrata.</p>
            <p className="text-xs text-muted-foreground mt-1">I professionisti si registreranno con il codice invito (BENVENUTO, LANCIO, FIERA2026).</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Nome</th>
                <th className="text-left p-4 font-semibold hidden sm:table-cell">Categoria</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Citta</th>
                <th className="text-left p-4 font-semibold hidden lg:table-cell">Contatti</th>
                <th className="text-left p-4 font-semibold">Stato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {strutture.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30">
                  <td className="p-4 font-medium text-foreground">{s.nome}</td>
                  <td className="p-4 hidden sm:table-cell"><span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">{s.categoria.replace(/_/g, " ")}</span></td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{s.comune} ({s.provincia})</td>
                  <td className="p-4 text-xs text-muted-foreground hidden lg:table-cell">{s.email || "—"} {s.telefono ? `/ ${s.telefono}` : ""}</td>
                  <td className="p-4">{s.attivo ? <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">Attiva</span> : <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-semibold">Inattiva</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
