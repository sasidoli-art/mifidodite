import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Mountain, Clock, ArrowUpRight, Check, X, Droplets, Trees, Dog, Navigation, Baby } from "lucide-react";
import { SENTIERI_SEED, slugifyRegioneS, getSentieroBySlug, getSentieriByRegione, SENTIERO_TIPO_LABEL, DIFFICOLTA_LABEL, DIFFICOLTA_COLOR } from "@/lib/sentieri-seed";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/json-ld";
import { MeteoWidget } from "@/app/spiagge/[regione]/[slug]/MeteoWidget";
import { NewsletterInline } from "@/components/shared/NewsletterInline";

export function generateStaticParams() {
  return SENTIERI_SEED.map((s) => ({ regione: slugifyRegioneS(s.regione), slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ regione: string; slug: string }> }) {
  const { regione, slug } = await params;
  const s = getSentieroBySlug(slug);
  if (!s) return { title: "Sentiero non trovato" };
  const title = `${s.nome} — ${DIFFICOLTA_LABEL[s.difficolta]}, ${s.lunghezzaKm}km | MifidoDiTe.eu`;
  const description = `${s.nome} a ${s.comune}: ${s.descrizione.slice(0, 140)}`;
  return {
    title, description,
    alternates: { canonical: `https://www.mifidodite.eu/sentieri/${regione}/${slug}` },
    openGraph: { type: "article", title, description, url: `https://www.mifidodite.eu/sentieri/${regione}/${slug}`, siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: s.img, width: 800, height: 600, alt: s.nome }] },
  };
}

export default async function SentieroDettaglioPage({ params }: { params: Promise<{ regione: string; slug: string }> }) {
  const { regione: regioneSlug, slug } = await params;
  const s = getSentieroBySlug(slug);
  if (!s || slugifyRegioneS(s.regione) !== regioneSlug) notFound();

  const altri = getSentieriByRegione(regioneSlug).filter((x) => x.slug !== slug).slice(0, 3);
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}&travelmode=driving`;

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: s.nome,
      description: s.descrizione,
      image: s.img,
      url: `https://www.mifidodite.eu/sentieri/${regioneSlug}/${slug}`,
      address: { "@type": "PostalAddress", addressLocality: s.comune, addressRegion: s.regione, addressCountry: "IT" },
      geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng },
      touristType: ["Dog owners", "Hikers"],
    },
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Sentieri", url: "/sentieri" },
      { name: s.regione, url: `/sentieri/${regioneSlug}` },
      { name: s.nome, url: `/sentieri/${regioneSlug}/${slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdData)} />
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-72 sm:h-96 overflow-hidden relative">
            <img src={s.img} alt={s.nome} fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[
                  { name: "Sentieri", url: "/sentieri" },
                  { name: s.regione, url: `/sentieri/${regioneSlug}` },
                  { name: s.nome, url: `/sentieri/${regioneSlug}/${slug}` },
                ]} />
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${DIFFICOLTA_COLOR[s.difficolta]}`}>
                  {DIFFICOLTA_LABEL[s.difficolta]}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-foreground">
                  {SENTIERO_TIPO_LABEL[s.tipo]}
                </span>
                {s.adattoACuccioli && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">Adatto a cuccioli</span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">{s.nome}</h1>
              <div className="flex items-center gap-3 mt-3 text-white/80 text-sm flex-wrap">
                <span className="flex items-center gap-1"><MapPin size={14} /> {s.comune} — {s.regione}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <p className="text-lg text-foreground leading-relaxed">{s.descrizione}</p>
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-5">Dati tecnici</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-muted rounded-xl p-4">
                    <Mountain className="mx-auto text-primary mb-1" size={22} />
                    <div className="text-2xl font-extrabold text-foreground">{s.lunghezzaKm}</div>
                    <div className="text-xs text-muted-foreground">km</div>
                  </div>
                  <div className="bg-muted rounded-xl p-4">
                    <ArrowUpRight className="mx-auto text-primary mb-1" size={22} />
                    <div className="text-2xl font-extrabold text-foreground">{s.dislivelloM}</div>
                    <div className="text-xs text-muted-foreground">m dislivello</div>
                  </div>
                  <div className="bg-muted rounded-xl p-4">
                    <Clock className="mx-auto text-primary mb-1" size={22} />
                    <div className="text-2xl font-extrabold text-foreground">{s.durataOre}</div>
                    <div className="text-xs text-muted-foreground">ore</div>
                  </div>
                  <div className={`rounded-xl p-4 text-white ${DIFFICOLTA_COLOR[s.difficolta]}`}>
                    <div className="text-2xl font-extrabold">{DIFFICOLTA_LABEL[s.difficolta]}</div>
                    <div className="text-xs text-white/80">difficolta</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <Dog size={20} className="text-primary" /> Info per il tuo cane
                </h2>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <Feature ok={true} label={s.guinzaglioObbligatorio ? "Guinzaglio obbligatorio" : "Guinzaglio non richiesto"} />
                  <Feature ok={s.acquaDisponibile} label="Acqua disponibile sul percorso" />
                  <Feature ok={s.ombraPresente} label="Ombra presente" />
                  <Feature ok={s.adattoACuccioli} label="Adatto a cuccioli e cani anziani" />
                </div>
              </div>

              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold rounded-full px-6 py-3 hover:bg-primary-dark transition-colors">
                <Navigation size={16} /> Indicazioni per il punto di partenza
              </a>
            </div>

            <div className="space-y-6">
              <MeteoWidget lat={s.lat} lng={s.lng} />

              <NewsletterInline
                title="Nuovi sentieri ogni mese"
                description="Ricevi via email i nuovi sentieri dog-friendly e le guide outdoor aggiornate."
                source="sentieri-dettaglio"
                compact
              />

              {altri.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-5">
                  <h3 className="font-bold text-foreground mb-4">Altri sentieri in {s.regione}</h3>
                  <div className="space-y-3">
                    {altri.map((a) => (
                      <Link key={a.slug} href={`/sentieri/${regioneSlug}/${a.slug}`} className="flex gap-3 items-center group">
                        <img src={a.img} alt={a.nome} loading="lazy" decoding="async" className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{a.nome}</div>
                          <div className="text-xs text-muted-foreground">{a.lunghezzaKm}km &middot; {DIFFICOLTA_LABEL[a.difficolta]}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
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
