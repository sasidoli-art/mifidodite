import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ARTICOLI_SEED } from "@/lib/articoli-seed";

export const metadata = {
  title: "Magazine Pet — MifidoDiTe.eu",
  description: "Guide, consigli, aneddoti e curiosita dal mondo dei cani, gatti e animali domestici.",
};

async function getArticoli() {
  if (process.env.DATABASE_URL) {
    try {
      const { getDB } = await import("@/lib/db");
      const sql = getDB();
      const rows = await sql`SELECT titolo, slug, categoria, estratto, img, tempo_lettura, created_at FROM articoli WHERE pubblicato = true ORDER BY created_at DESC LIMIT 20`;
      if (rows.length > 0) {
        return rows.map((r: Record<string, unknown>) => ({
          slug: r.slug as string,
          titolo: r.titolo as string,
          categoria: r.categoria as string,
          estratto: r.estratto as string,
          img: (r.img as string) || "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
          tempo_lettura: (r.tempo_lettura as string) || "5 min",
          data: new Date(r.created_at as string).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" }),
          tags: [],
          contenuto: "",
        }));
      }
    } catch (err) {
      console.error("DB error, fallback seed:", err);
    }
  }
  return ARTICOLI_SEED;
}

export default async function MagazinePage() {
  const articoli = await getArticoli();
  const main = articoli[0];
  const rest = articoli.slice(1);
  const categorie = [...new Set(articoli.map((a) => a.categoria))];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
              Magazine <span className="text-primary">Pet</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Guide, consigli, aneddoti e curiosita dal mondo dei cani, gatti e animali domestici.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categorie.map((c) => (
                <span key={c} className="bg-white text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-sm capitalize">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {main && (
            <Link href={`/magazine/${main.slug}`} className="group block mb-12">
              <div className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <div className="h-64 md:h-auto overflow-hidden">
                  <img src={main.img} alt={main.titolo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <span className="text-sm font-semibold text-primary capitalize">{main.categoria}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 group-hover:text-primary transition-colors">
                    {main.titolo}
                  </h2>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{main.estratto}</p>
                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Clock size={14} /> {main.tempo_lettura} &middot; {main.data}
                  </div>
                </div>
              </div>
            </Link>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article) => (
              <Link key={article.slug} href={`/magazine/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="h-36 sm:h-48 overflow-hidden">
                  <img src={article.img} alt={article.titolo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-primary capitalize">{article.categoria}</span>
                  <h3 className="font-bold text-foreground mt-1 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {article.titolo}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{article.estratto}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                    <Clock size={12} /> {article.tempo_lettura} &middot; {article.data}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
