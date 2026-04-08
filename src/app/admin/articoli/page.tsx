import { getDB } from "@/lib/db";
import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import { ArticleActions } from "./ArticleActions";
import { BulkActions } from "./BulkActions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Articoli — Admin MifidoDiTe" };

interface ArticoloRow {
  id: number;
  titolo: string;
  slug: string;
  estratto: string;
  categoria: string;
  img: string;
  tempo_lettura: string;
  pubblicato: boolean;
  created_at: string;
}

async function getArticoli() {
  const sql = getDB();
  const bozze = await sql`
    SELECT id, titolo, slug, estratto, categoria, img, tempo_lettura, pubblicato, created_at
    FROM articoli
    WHERE pubblicato = false
    ORDER BY created_at DESC
  `;
  const pubblicati = await sql`
    SELECT id, titolo, slug, estratto, categoria, img, tempo_lettura, pubblicato, created_at
    FROM articoli
    WHERE pubblicato = true
    ORDER BY created_at DESC
    LIMIT 50
  `;
  return {
    bozze: bozze as unknown as ArticoloRow[],
    pubblicati: pubblicati as unknown as ArticoloRow[],
  };
}

async function getStats() {
  const sql = getDB();
  const totale = await sql`SELECT count(*)::int as n FROM articoli`;
  const bozze = await sql`SELECT count(*)::int as n FROM articoli WHERE pubblicato = false`;
  const pubblicati = await sql`SELECT count(*)::int as n FROM articoli WHERE pubblicato = true`;
  return {
    totale: totale[0].n,
    bozze: bozze[0].n,
    pubblicati: pubblicati[0].n,
  };
}

export default async function AdminArticoliPage() {
  const [{ bozze, pubblicati }, stats] = await Promise.all([getArticoli(), getStats()]);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Gestione Articoli</h1>
        <p className="text-muted-foreground mt-2">
          Gli articoli scritti dall&apos;AI vanno prima in <strong>bozza</strong>. Approvali per pubblicarli sul magazine.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-3xl font-bold text-amber-700">{stats.bozze}</p>
          <p className="text-xs text-amber-700 mt-1">In attesa di approvazione</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <p className="text-3xl font-bold text-green-700">{stats.pubblicati}</p>
          <p className="text-xs text-green-700 mt-1">Pubblicati sul magazine</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <p className="text-3xl font-bold text-foreground">{stats.totale}</p>
          <p className="text-xs text-muted-foreground mt-1">Totale articoli</p>
        </div>
      </div>

      {/* BOZZE in attesa */}
      {bozze.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Bozze in attesa ({bozze.length})
            </h2>
            <BulkActions count={bozze.length} />
          </div>
          <div className="space-y-3">
            {bozze.map((a) => (
              <div key={a.id} className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden">
                <div className="flex items-start gap-4 p-5">
                  <img src={a.img} alt="" className="w-24 h-24 rounded-xl object-cover shrink-0 hidden sm:block" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">BOZZA</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">{a.categoria}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={10} /> {a.tempo_lettura}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground leading-snug mb-1">{a.titolo}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{a.estratto}</p>
                  </div>
                </div>
                <div className="border-t border-amber-200 p-3 bg-amber-50/50 flex items-center justify-between gap-2">
                  <Link
                    href={`/magazine/${a.slug}?preview=1`}
                    target="_blank"
                    className="text-xs text-foreground hover:text-primary font-semibold flex items-center gap-1"
                  >
                    <Eye size={14} /> Anteprima
                  </Link>
                  <ArticleActions articleId={a.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PUBBLICATI */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Pubblicati ({stats.pubblicati})</h2>
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Articolo</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Categoria</th>
                <th className="text-left p-4 font-semibold hidden lg:table-cell">Data</th>
                <th className="text-right p-4 font-semibold">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pubblicati.map((a) => (
                <tr key={a.id} className="hover:bg-muted/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={a.img} alt="" className="w-12 h-12 rounded-lg object-cover hidden sm:block" />
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground line-clamp-1">{a.titolo}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{a.estratto}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">{a.categoria}</span>
                  </td>
                  <td className="p-4 text-muted-foreground text-xs hidden lg:table-cell">
                    {new Date(a.created_at).toLocaleDateString("it-IT")}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/magazine/${a.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-primary hover:text-primary-dark text-xs font-semibold"
                    >
                      <Eye size={14} /> Apri
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
