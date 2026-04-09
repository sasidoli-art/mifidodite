import { getDB } from "@/lib/db";
import { Mail, Users, Trash } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Newsletter — Admin MifidoDiTe" };

interface IscrittoRow { id: number; email: string; nome: string | null; cap: string | null; tipo_animale: string | null; attivo: boolean; created_at: string; }

export default async function AdminNewsletterPage() {
  const sql = getDB();
  const iscritti = (await sql`SELECT id, email, nome, cap, tipo_animale, attivo, created_at FROM newsletter_iscritti ORDER BY created_at DESC`) as unknown as IscrittoRow[];
  const attivi = iscritti.filter((i) => i.attivo);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Newsletter</h1>
        <p className="text-muted-foreground mt-2">Iscritti alla newsletter settimanale — dati reali dal database</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <Users size={22} className="text-blue-700 mb-2" />
          <p className="text-3xl font-bold text-blue-700">{attivi.length}</p>
          <p className="text-xs text-blue-700 mt-1">Iscritti attivi</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <p className="text-3xl font-bold text-foreground">{iscritti.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Totali (inclusi disiscritti)</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <p className="text-3xl font-bold text-foreground">{iscritti.filter((i) => i.tipo_animale === "cane").length} / {iscritti.filter((i) => i.tipo_animale === "gatto").length}</p>
          <p className="text-xs text-muted-foreground mt-1">Cane / Gatto</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <h2 className="font-bold text-foreground">Tutti gli iscritti ({iscritti.length})</h2>
        </div>
        {iscritti.length === 0 ? (
          <div className="p-12 text-center">
            <Mail size={48} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">Nessun iscritto alla newsletter.</p>
            <p className="text-xs text-muted-foreground mt-1">I primi iscritti appariranno qui quando si iscriveranno dal popup del sito o dal chatbot Zampa.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Email</th>
                <th className="text-left p-4 font-semibold hidden sm:table-cell">Nome</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">CAP</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Animale</th>
                <th className="text-left p-4 font-semibold">Stato</th>
                <th className="text-left p-4 font-semibold hidden lg:table-cell">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {iscritti.map((i) => (
                <tr key={i.id} className="hover:bg-muted/30">
                  <td className="p-4 font-medium text-foreground">{i.email}</td>
                  <td className="p-4 text-muted-foreground hidden sm:table-cell">{i.nome || "—"}</td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{i.cap || "—"}</td>
                  <td className="p-4 hidden md:table-cell">
                    {i.tipo_animale === "cane" ? "🐕" : i.tipo_animale === "gatto" ? "🐈" : "—"}
                  </td>
                  <td className="p-4">
                    {i.attivo ? <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">Attivo</span> : <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-semibold">Disiscritto</span>}
                  </td>
                  <td className="p-4 text-muted-foreground text-xs hidden lg:table-cell">{new Date(i.created_at).toLocaleDateString("it-IT")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
