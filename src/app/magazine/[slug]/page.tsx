import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ARTICOLI_SEED } from "@/lib/articoli-seed";

async function getArticolo(slug: string) {
  if (process.env.DATABASE_URL) {
    try {
      const { getDB } = await import("@/lib/db");
      const sql = getDB();
      const rows = await sql`SELECT * FROM articoli WHERE slug = ${slug} AND pubblicato = true LIMIT 1`;
      if (rows.length > 0) {
        const r = rows[0] as Record<string, unknown>;
        return {
          slug: r.slug as string,
          titolo: r.titolo as string,
          categoria: r.categoria as string,
          estratto: r.estratto as string,
          contenuto: r.contenuto as string,
          img: (r.img as string) || "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
          tempo_lettura: (r.tempo_lettura as string) || "5 min",
          data: new Date(r.created_at as string).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" }),
          tags: (r.tags as string[]) || [],
        };
      }
    } catch { /* fallback seed */ }
  }
  return ARTICOLI_SEED.find((a) => a.slug === slug) || null;
}

async function getCorrelati(categoria: string, excludeSlug: string) {
  if (process.env.DATABASE_URL) {
    try {
      const { getDB } = await import("@/lib/db");
      const sql = getDB();
      const rows = await sql`SELECT titolo, slug, img FROM articoli WHERE categoria = ${categoria} AND slug != ${excludeSlug} AND pubblicato = true ORDER BY created_at DESC LIMIT 3`;
      return rows.map((r: Record<string, unknown>) => ({
        slug: r.slug as string,
        titolo: r.titolo as string,
        img: (r.img as string) || "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
      }));
    } catch { /* fallback */ }
  }
  return ARTICOLI_SEED.filter((a) => a.categoria === categoria && a.slug !== excludeSlug).slice(0, 3);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articolo = await getArticolo(slug);
  return {
    title: articolo ? `${articolo.titolo} — MifidoDiTe.eu` : "Articolo — MifidoDiTe.eu",
    description: articolo?.estratto || "",
  };
}

export default async function ArticoloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articolo = await getArticolo(slug);

  if (!articolo) {
    return (
      <>
        <Header />
        <main className="flex-1 py-20 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="text-2xl font-bold">Articolo non trovato</h1>
          <Link href="/magazine" className="text-primary mt-4 inline-block hover:underline">Torna al Magazine</Link>
        </main>
        <Footer />
      </>
    );
  }

  const correlati = await getCorrelati(articolo.categoria, slug);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="relative h-64 sm:h-96">
          <img src={articolo.img} alt={articolo.titolo} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-4xl mx-auto">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full capitalize">{articolo.categoria}</span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 leading-tight">{articolo.titolo}</h1>
            <div className="flex items-center gap-4 mt-3 text-white/70 text-sm">
              <span className="flex items-center gap-1"><Clock size={14} /> {articolo.tempo_lettura}</span>
              <span>{articolo.data}</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <Link href="/magazine" className="flex items-center gap-1 text-muted-foreground hover:text-primary text-sm">
              <ArrowLeft size={16} /> Torna al Magazine
            </Link>
          </div>

          <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: articolo.contenuto }} />

          {articolo.tags && articolo.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
              {articolo.tags.map((tag) => (
                <span key={tag} className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full">#{tag}</span>
              ))}
            </div>
          )}

          <div className="mt-10 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-foreground">Cerchi un professionista pet vicino a te?</h3>
            <p className="text-muted-foreground mt-2">Pensioni, dog sitter, toelettatori e molto altro nella tua zona.</p>
            <Link href="/professionisti" className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Cerca su MifidoDiTe
            </Link>
          </div>

          {correlati.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-foreground mb-6">Potrebbe interessarti</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {correlati.map((a) => (
                  <Link key={a.slug} href={`/magazine/${a.slug}`} className="group">
                    <div className="h-32 rounded-xl overflow-hidden mb-2">
                      <img src={a.img} alt={a.titolo} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">{a.titolo}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
