import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ARTICOLI_SEED } from "@/lib/articoli-seed";
import { articleJsonLd, jsonLdScript } from "@/lib/json-ld";

async function getArticolo(slug: string, preview: boolean = false) {
  if (process.env.DATABASE_URL) {
    try {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL!);
      const rows = preview
        ? await sql`SELECT * FROM articoli WHERE slug = ${slug} LIMIT 1`
        : await sql`SELECT * FROM articoli WHERE slug = ${slug} AND pubblicato = true LIMIT 1`;
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
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL!);
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
  const title = articolo ? `${articolo.titolo} — MifidoDiTe.eu` : "Articolo — MifidoDiTe.eu";
  const description = articolo?.estratto || "Magazine pet d'Italia — guide, consigli e curiosita per cani e gatti.";
  const image = articolo?.img || "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80";

  return {
    title,
    description,
    alternates: { canonical: `https://www.mifidodite.eu/magazine/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "it_IT",
      siteName: "MiFidoDiTe.eu",
      url: `https://www.mifidodite.eu/magazine/${slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: articolo?.titolo || "MiFidoDiTe.eu" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticoloPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const preview = sp.preview === "1";
  const articolo = await getArticolo(slug, preview);

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

  // JSON-LD Article schema
  const articleLd = articleJsonLd({
    titolo: articolo.titolo,
    descrizione: articolo.estratto,
    slug,
    categoria: articolo.categoria,
    img: articolo.img,
    datePublished: articolo.data ? new Date(articolo.data).toISOString() : new Date().toISOString(),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleLd)} />
      <Header />
      <main className="flex-1 pt-16">
        <div className="relative h-56 sm:h-80 lg:h-96">
          <img loading="lazy" src={articolo.img} alt={articolo.titolo} className="w-full h-full object-cover" />
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
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/magazine" className="hover:text-primary transition-colors">Magazine</Link>
            <span>/</span>
            <Link href={`/magazine?cat=${articolo.categoria}`} className="hover:text-primary transition-colors capitalize">{articolo.categoria}</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{articolo.titolo}</span>
          </nav>

          {/* Schema.org BreadcrumbList */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.mifidodite.eu" },
                  { "@type": "ListItem", "position": 2, "name": "Magazine", "item": "https://www.mifidodite.eu/magazine" },
                  { "@type": "ListItem", "position": 3, "name": articolo.categoria, "item": `https://www.mifidodite.eu/magazine?cat=${articolo.categoria}` },
                  { "@type": "ListItem", "position": 4, "name": articolo.titolo },
                ],
              }),
            }}
          />

          {/* Disclosure AI Act */}
          <div className="flex items-center gap-2 bg-muted rounded-xl p-3 mb-6 text-xs text-muted-foreground">
            <span>🤖</span>
            <span>Questo articolo e stato scritto con l&apos;assistenza dell&apos;intelligenza artificiale e revisionato dalla redazione di MifidoDiTe.eu.</span>
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

          <div className="mt-10 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-[20px] p-6 sm:p-8 border border-border">
            <h3 className="text-xl font-bold text-foreground text-center mb-2">Pianifica la vacanza col tuo cane</h3>
            <p className="text-muted-foreground text-center mb-6 text-sm">Tutto il necessario in un click.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/spiagge" className="bg-white hover:bg-emerald-50 border border-border hover:border-emerald-200 rounded-xl p-4 text-center transition-all hover:-translate-y-0.5 group">
                <div className="text-2xl mb-1">🏖️</div>
                <div className="font-bold text-sm text-foreground group-hover:text-emerald-700">Spiagge</div>
                <div className="text-[10px] text-muted-foreground">dog-friendly</div>
              </Link>
              <Link href="/vacanze" className="bg-white hover:bg-primary/5 border border-border hover:border-primary/30 rounded-xl p-4 text-center transition-all hover:-translate-y-0.5 group">
                <div className="text-2xl mb-1">🏨</div>
                <div className="font-bold text-sm text-foreground group-hover:text-primary">Vacanze</div>
                <div className="text-[10px] text-muted-foreground">hotel &amp; agriturismi</div>
              </Link>
              <Link href="/ristoranti" className="bg-white hover:bg-accent/10 border border-border hover:border-accent/40 rounded-xl p-4 text-center transition-all hover:-translate-y-0.5 group">
                <div className="text-2xl mb-1">🍽️</div>
                <div className="font-bold text-sm text-foreground group-hover:text-accent">Ristoranti</div>
                <div className="text-[10px] text-muted-foreground">pet-friendly</div>
              </Link>
              <Link href="/sentieri" className="bg-white hover:bg-amber-50 border border-border hover:border-amber-200 rounded-xl p-4 text-center transition-all hover:-translate-y-0.5 group">
                <div className="text-2xl mb-1">🥾</div>
                <div className="font-bold text-sm text-foreground group-hover:text-amber-700">Sentieri</div>
                <div className="text-[10px] text-muted-foreground">escursioni</div>
              </Link>
            </div>
            <div className="mt-5 text-center">
              <Link href="/professionisti" className="inline-block text-sm text-muted-foreground hover:text-primary transition-colors">
                Cerchi un professionista? &rarr;
              </Link>
            </div>
          </div>

          {correlati.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-foreground mb-6">Potrebbe interessarti</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {correlati.map((a) => (
                  <Link key={a.slug} href={`/magazine/${a.slug}`} className="group">
                    <div className="h-32 rounded-[16px] overflow-hidden mb-2">
                      <img loading="lazy" src={a.img} alt={a.titolo} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500" />
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
