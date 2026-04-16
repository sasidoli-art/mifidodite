import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Check, X, Globe, Phone, Utensils, Navigation, ExternalLink,
} from "lucide-react";
import {
  RISTORANTI_SEED,
  slugifyRegioneR,
  getRistoranteBySlug,
  getRistorantiByRegione,
  RISTORANTE_TIPO_LABEL_SINGULAR,
  PREZZO_LABEL_RIST,
} from "@/lib/ristoranti-seed";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/json-ld";
import { NewsletterInline } from "@/components/shared/NewsletterInline";

export function generateStaticParams() {
  return RISTORANTI_SEED.map((r) => ({
    regione: slugifyRegioneR(r.regione),
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ regione: string; slug: string }> }) {
  const { regione, slug } = await params;
  const r = getRistoranteBySlug(slug);
  if (!r) return { title: "Ristorante non trovato" };
  const title = `${r.nome} — ${RISTORANTE_TIPO_LABEL_SINGULAR[r.tipo]} pet-friendly a ${r.comune} | MifidoDiTe.eu`;
  const description = `${r.nome} a ${r.comune}: ${r.descrizione.slice(0, 140)}`;
  return {
    title,
    description,
    alternates: { canonical: `https://www.mifidodite.eu/ristoranti/${regione}/${slug}` },
    openGraph: {
      type: "article", title, description,
      url: `https://www.mifidodite.eu/ristoranti/${regione}/${slug}`,
      siteName: "MifidoDiTe.eu", locale: "it_IT",
      images: [{ url: r.img, width: 800, height: 600, alt: r.nome }],
    },
  };
}

export default async function RistoranteDettaglioPage({ params }: { params: Promise<{ regione: string; slug: string }> }) {
  const { regione: regioneSlug, slug } = await params;
  const r = getRistoranteBySlug(slug);

  if (!r || slugifyRegioneR(r.regione) !== regioneSlug) notFound();

  const altri = getRistorantiByRegione(regioneSlug).filter((x) => x.slug !== slug).slice(0, 3);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${r.nome} ${r.comune}`)}`;

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: r.nome,
      description: r.descrizione,
      image: r.img,
      url: `https://www.mifidodite.eu/ristoranti/${regioneSlug}/${slug}`,
      servesCuisine: r.cucina,
      priceRange: PREZZO_LABEL_RIST[r.fascia],
      address: {
        "@type": "PostalAddress",
        addressLocality: r.comune,
        addressRegion: r.regione,
        addressCountry: "IT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: r.lat,
        longitude: r.lng,
      },
    },
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Ristoranti", url: "/ristoranti" },
      { name: r.regione, url: `/ristoranti/${regioneSlug}` },
      { name: r.nome, url: `/ristoranti/${regioneSlug}/${slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdData)} />
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-72 sm:h-96 overflow-hidden relative">
            <img src={r.img} alt={r.nome} fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[
                  { name: "Ristoranti", url: "/ristoranti" },
                  { name: r.regione, url: `/ristoranti/${regioneSlug}` },
                  { name: r.nome, url: `/ristoranti/${regioneSlug}/${slug}` },
                ]} />
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-semibold px-3 py-1 rounded-full text-white bg-primary/90">
                  {RISTORANTE_TIPO_LABEL_SINGULAR[r.tipo]}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-foreground">
                  {PREZZO_LABEL_RIST[r.fascia]}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">{r.nome}</h1>
              <div className="flex items-center gap-2 mt-3 text-white/80 text-sm flex-wrap">
                <span className="flex items-center gap-1"><MapPin size={14} /> {r.comune} ({r.provincia}) — {r.regione}</span>
                <span>&middot;</span>
                <span className="italic">{r.cucina}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Utensils size={20} className="text-primary" /> Il locale
                </h2>
                <p className="text-foreground leading-relaxed">{r.descrizione}</p>
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-5">Pet-friendly: cosa trovi</h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Feature ok={r.conDehors} label="Dehors / tavoli all'aperto" />
                  <Feature ok={r.conGiardino} label="Giardino" />
                  <Feature ok={r.ciotoleAcqua} label="Ciotole d'acqua" />
                  <Feature ok={r.menuCane} label="Menu dedicato per cani" />
                  <Feature ok={r.areaRecintata} label="Area recintata" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white font-semibold rounded-full px-5 py-3 hover:bg-primary-dark transition-colors"
                >
                  <Navigation size={16} /> Indicazioni Google Maps
                </a>
                {r.sito && (
                  <a
                    href={r.sito}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white border-2 border-border text-foreground font-semibold rounded-full px-5 py-3 hover:border-primary hover:text-primary transition-colors"
                  >
                    <Globe size={16} /> Sito web
                  </a>
                )}
                {r.telefono && (
                  <a
                    href={`tel:${r.telefono}`}
                    className="inline-flex items-center gap-2 bg-white border-2 border-border text-foreground font-semibold rounded-full px-5 py-3 hover:border-primary hover:text-primary transition-colors"
                  >
                    <Phone size={16} /> {r.telefono}
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <NewsletterInline
                title="Nuovi ristoranti ogni mese"
                description="Ricevi via email i nuovi ristoranti pet-friendly e le guide aggiornate."
                source="ristoranti-dettaglio"
                compact
              />

              {altri.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-5">
                  <h3 className="font-bold text-foreground mb-4">Altri locali in {r.regione}</h3>
                  <div className="space-y-3">
                    {altri.map((a) => (
                      <Link key={a.slug} href={`/ristoranti/${regioneSlug}/${a.slug}`} className="flex gap-3 items-center group">
                        <img src={a.img} alt={a.nome} loading="lazy" decoding="async" className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{a.nome}</div>
                          <div className="text-xs text-muted-foreground">{a.comune} &middot; {PREZZO_LABEL_RIST[a.fascia]}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href={`/ristoranti/${regioneSlug}`} className="mt-4 block text-sm font-semibold text-primary text-center">
                    Tutti i ristoranti in {r.regione} →
                  </Link>
                </div>
              )}

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">In viaggio con il cane?</h3>
                <p className="text-sm text-muted-foreground mb-3">Guarda anche le spiagge e le strutture dove dormire in zona.</p>
                <div className="flex flex-col gap-2">
                  <Link href={`/spiagge/${regioneSlug}`} className="text-sm font-semibold text-primary">Spiagge pet-friendly in {r.regione} →</Link>
                  <Link href={`/vacanze/${regioneSlug}`} className="text-sm font-semibold text-primary">Dove dormire in {r.regione} →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Feature({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {ok ? <Check size={16} className="text-emerald-600" /> : <X size={16} className="text-muted-foreground/40" />}
      <span className={ok ? "text-foreground font-medium" : "text-muted-foreground/50"}>{label}</span>
    </div>
  );
}
