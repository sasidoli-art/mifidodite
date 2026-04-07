import { getDB } from "@/lib/db";
import { ShoppingBag, MousePointerClick, TrendingUp, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Offerte — Admin MifidoDiTe" };

interface OffertaRow {
  id: string;
  titolo: string;
  marca: string | null;
  prezzo_scontato: string;
  sconto_percentuale: number;
  click_count: number;
  affiliate_source: string | null;
  asin: string | null;
  link_acquisto: string | null;
  img: string;
  attivo: boolean;
}

async function getOfferte() {
  const sql = getDB();
  const rows = await sql`
    SELECT id, titolo, marca, prezzo_scontato, sconto_percentuale, click_count, affiliate_source, asin, link_acquisto, img, attivo
    FROM offerte
    ORDER BY click_count DESC NULLS LAST, created_at DESC
  `;
  return rows as unknown as OffertaRow[];
}

async function getStats() {
  const sql = getDB();
  const totale = await sql`SELECT count(*)::int as n FROM offerte WHERE attivo = true`;
  const click = await sql`SELECT count(*)::int as n FROM offerte_click`;
  const click7g = await sql`SELECT count(*)::int as n FROM offerte_click WHERE created_at >= NOW() - INTERVAL '7 days'`;
  return {
    totale: totale[0].n,
    click_totali: click[0].n,
    click_7giorni: click7g[0].n,
  };
}

export default async function AdminOffertePage() {
  const [offerte, stats] = await Promise.all([getOfferte(), getStats()]);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Offerte Affiliate</h1>
        <p className="text-muted-foreground mt-2">
          Gestisci le offerte Amazon e altri programmi affiliate. Traccia i click e le conversioni.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShoppingBag size={22} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totale}</p>
              <p className="text-xs text-muted-foreground">Offerte attive</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center">
              <MousePointerClick size={22} className="text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.click_totali}</p>
              <p className="text-xs text-muted-foreground">Click totali</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
              <TrendingUp size={22} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.click_7giorni}</p>
              <p className="text-xs text-muted-foreground">Click ultimi 7 giorni</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabella offerte */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Prodotto</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Marca</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Prezzo</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Sconto</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Source</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">Click</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {offerte.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={o.img} alt={o.titolo} className="w-12 h-12 rounded-lg object-cover bg-muted" />
                      <div className="max-w-xs">
                        <p className="font-medium text-foreground line-clamp-1">{o.titolo}</p>
                        {o.asin && <p className="text-xs text-muted-foreground">ASIN: {o.asin}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground">{o.marca || "—"}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{o.prezzo_scontato}</td>
                  <td className="px-4 py-3">
                    {o.sconto_percentuale ? (
                      <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                        -{o.sconto_percentuale}%
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {o.affiliate_source ? (
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full capitalize">
                        {o.affiliate_source}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-foreground">{o.click_count || 0}</td>
                  <td className="px-4 py-3 text-right">
                    {o.link_acquisto && (
                      <a href={o.link_acquisto} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark inline-flex items-center gap-1">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <p className="font-semibold text-amber-900 text-sm">Per aggiungere offerte:</p>
        <p className="text-amber-800 text-sm mt-1">
          Quando avrai le credenziali Amazon PA-API, attiveremo l&apos;agente automatico che ogni settimana
          aggiorna prezzi e prodotti. Per ora le offerte vanno aggiunte manualmente nel DB.
        </p>
      </div>
    </div>
  );
}
