import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NewsletterInline } from "@/components/shared/NewsletterInline";
import { ARTICOLI_SEED } from "@/lib/articoli-seed";
import { collectionJsonLd, jsonLdScript } from "@/lib/json-ld";
import { shuffleByHour, pickFeatured, pickImage } from "@/lib/magazine-utils";

// Revalidate ogni ora: cosi' lo shuffle ruota con lo stesso ritmo
export const revalidate = 3600;

export const metadata = {
  title: "Magazine Pet — MifidoDiTe.eu",
  description: "Guide, consigli, aneddoti e curiosita dal mondo dei cani, gatti e animali domestici.",
};

const CATEGORIE_LABELS: Record<string, string> = {
  guide: "Guide",
  salute: "Salute",
  comportamento: "Comportamento",
  curiosita: "Curiosita",
  razze: "Razze",
  gatti: "Gatti",
  consigli: "Consigli",
  aneddoti: "Aneddoti",
};

async function getArticoli(categoria?: string) {
  if (process.env.DATABASE_URL) {
    try {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL!);

      const rows = categoria
        ? await sql`SELECT titolo, slug, categoria, estratto, img, tempo_lettura, created_at FROM articoli WHERE pubblicato = true AND categoria = ${categoria} ORDER BY created_at DESC LIMIT 200`
        : await sql`SELECT titolo, slug, categoria, estratto, img, tempo_lettura, created_at FROM articoli WHERE pubblicato = true ORDER BY created_at DESC LIMIT 200`;

      if (rows.length > 0) {
        return rows.map((r: Record<string, unknown>) => ({
          slug: r.slug as string,
          titolo: r.titolo as string,
          categoria: r.categoria as string,
          estratto: r.estratto as string,
          img: (r.img as string) || "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
          tempo_lettura: (r.tempo_lettura as string) || "5 min",
          data: new Date(r.created_at as string).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" }),
        }));
      }
    } catch (err) {
      console.error("DB error, fallback seed:", err);
    }
  }
  return ARTICOLI_SEED;
}

async function getCategorie() {
  if (process.env.DATABASE_URL) {
    try {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL!);
      const rows = await sql`SELECT DISTINCT categoria, count(*) as n FROM articoli WHERE pubblicato = true GROUP BY categoria ORDER BY n DESC`;
      return rows.map((r: Record<string, unknown>) => ({
        nome: r.categoria as string,
        count: Number(r.n),
      }));
    } catch { /* fallback */ }
  }
  return [];
}

export default async function MagazinePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const params = await searchParams;
  const catFiltro = params.cat || undefined;
  const [articoliRaw, categorie] = await Promise.all([
    getArticoli(catFiltro),
    getCategorie(),
  ]);

  // Sostituisce immagini generiche con immagini fresche dal pool per categoria
  const articoli = articoliRaw.map((a) => ({ ...a, img: pickImage(a) }));

  // Articolo "principale" (featured): rotation settimanale tra contenuti evergreen
  // Quando l'utente filtra una categoria, mostra il piu' rilevante (primo dopo shuffle)
  const main = catFiltro
    ? shuffleByHour(articoli)[0]
    : pickFeatured(articoli);

  // Il resto della griglia: shuffle orario, esclude il main
  const rest = shuffleByHour(articoli.filter((a) => a.slug !== main?.slug));

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-foreground py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Magazine <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">Pet</span>
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Guide, consigli, aneddoti e curiosita dal mondo dei cani, gatti e animali domestici.
            </p>

            {/* Categorie cliccabili */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Link
                href="/magazine"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !catFiltro
                    ? "bg-primary text-white"
                    : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10"
                }`}
              >
                Tutti ({articoli.length + (catFiltro ? 0 : 0)})
              </Link>
              {categorie.map((c) => (
                <Link
                  key={c.nome}
                  href={`/magazine?cat=${c.nome}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                    catFiltro === c.nome
                      ? "bg-primary text-white"
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10"
                  }`}
                >
                  {CATEGORIE_LABELS[c.nome] || c.nome} ({c.count})
                </Link>
              ))}
            </div>

            {catFiltro && (
              <p className="mt-4 text-sm text-white/50">
                {articoli.length} articoli in &ldquo;{CATEGORIE_LABELS[catFiltro] || catFiltro}&rdquo;
                {" — "}
                <Link href="/magazine" className="text-primary hover:underline">vedi tutti</Link>
              </p>
            )}
          </div>
        </section>

        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Articolo principale */}
          {main && (
            <Link href={`/magazine/${main.slug}`} className="group block mb-12">
              <div className="grid md:grid-cols-2 gap-0 bg-white rounded-[20px] overflow-hidden border border-border card-hover">
                <div className="h-56 md:h-auto overflow-hidden">
                  <img loading="lazy" src={main.img} alt={main.titolo} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <Link href={`/magazine?cat=${main.categoria}`} className="text-sm font-semibold text-primary capitalize hover:underline">
                    {CATEGORIE_LABELS[main.categoria] || main.categoria}
                  </Link>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 group-hover:text-primary transition-colors">
                    {main.titolo}
                  </h2>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{main.estratto}</p>
                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Clock size={14} /> {main.tempo_lettura} &middot; {main.data}
                  </div>
                  <span className="inline-flex items-center gap-1 mt-4 text-primary font-semibold text-sm">
                    Leggi l&apos;articolo <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Newsletter CTA */}
          <div className="my-12">
            <NewsletterInline
              title="Ricevi 1 guida + tips esclusivi ogni settimana"
              description="Vacanze, spiagge, addestramento, salute. Le migliori risorse per proprietari di cani — senza spam, leggi in 3 minuti."
              source="magazine-hub"
              buttonText="Ricevi la guida gratis"
            />
            <div className="flex gap-4 justify-center mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">✓ Senza spam</span>
              <span className="flex items-center gap-1">✓ Leggi in 3 min</span>
              <span className="flex items-center gap-1">✓ 8,000+ iscritti</span>
            </div>
          </div>

          {/* Griglia articoli */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((article, idx) => (
              <Link key={article.slug} href={`/magazine/${article.slug}`}
                className="group bg-white rounded-[20px] overflow-hidden border border-border card-hover relative">
                {idx < 3 && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    🔥 Trending
                  </span>
                )}
                <div className="h-36 sm:h-48 overflow-hidden">
                  <img loading="lazy" src={article.img} alt={article.titolo} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-primary capitalize">
                    {CATEGORIE_LABELS[article.categoria] || article.categoria}
                  </span>
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

          {articoli.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl">📝</p>
              <p className="text-muted-foreground mt-2">Nessun articolo trovato in questa categoria.</p>
              <Link href="/magazine" className="text-primary font-medium hover:underline mt-2 inline-block">
                Vedi tutti gli articoli
              </Link>
            </div>
          )}

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLdScript(collectionJsonLd("Magazine Pet", "/magazine", articoli.length))}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
