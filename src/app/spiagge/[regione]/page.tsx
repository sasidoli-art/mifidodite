import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Waves } from "lucide-react";
import {
  unslugifyRegione,
  getSpiaggeByRegione,
  getAllRegioniSlug,
} from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, collectionJsonLd, jsonLdScript } from "@/lib/json-ld";
import { MapSpiagge } from "../MapSpiagge";

export function generateStaticParams() {
  return getAllRegioniSlug().map((regione) => ({ regione }));
}

export async function generateMetadata({ params }: { params: Promise<{ regione: string }> }) {
  const { regione: regioneSlug } = await params;
  const regione = unslugifyRegione(regioneSlug);
  if (!regione) {
    return { title: "Regione non trovata" };
  }
  const count = getSpiaggeByRegione(regioneSlug).length;
  const title = `Spiagge per cani in ${regione} 2026 — Dog beach e spiagge libere | MifidoDiTe.eu`;
  const description = `Tutte le ${count} spiagge dog-friendly in ${regione}: stabilimenti, dog beach e spiagge libere dove il tuo cane e il benvenuto. Mappa interattiva e info pratiche.`;
  const url = `https://www.mifidodite.eu/spiagge/${regioneSlug}`;
  const ogImg = `https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=1200&q=80`;
  return {
    title,
    description,
    keywords: [`spiagge cani ${regione}`, `dog beach ${regione}`, `spiagge dog friendly ${regione}`, `spiagge libere cani ${regione}`],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "MifidoDiTe.eu",
      locale: "it_IT",
      images: [{ url: ogImg, width: 1200, height: 630, alt: `Spiagge dog-friendly in ${regione}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImg] },
  };
}

export default async function SpiaggeRegionePage({ params }: { params: Promise<{ regione: string }> }) {
  const { regione: regioneSlug } = await params;
  const regione = unslugifyRegione(regioneSlug);
  if (!regione) notFound();

  const spiagge = getSpiaggeByRegione(regioneSlug);
  if (spiagge.length === 0) notFound();

  const stabilimenti = spiagge.filter((s) => s.tipo === "Stabilimento");
  const libere = spiagge.filter((s) => s.tipo === "Spiaggia libera");

  const pins = spiagge.map((s) => ({
    slug: s.slug,
    nome: s.nome,
    comune: s.comune,
    regione: s.regione,
    tipo: s.tipo,
    lat: s.lat,
    lng: s.lng,
  }));

  const jsonLdData = [
    collectionJsonLd(`Spiagge dog-friendly in ${regione}`, `/spiagge/${regioneSlug}`, spiagge.length),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Spiagge", url: "/spiagge" },
      { name: regione, url: `/spiagge/${regioneSlug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdData)} />
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <div className="mb-5 flex justify-center">
              <Breadcrumbs
                dark
                items={[
                  { name: "Spiagge", url: "/spiagge" },
                  { name: regione, url: `/spiagge/${regioneSlug}` },
                ]}
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Spiagge per cani in <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">{regione}</span>
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              {spiagge.length} {spiagge.length === 1 ? "spiaggia" : "spiagge"} dog-friendly verificate: {stabilimenti.length} stabilimenti, {libere.length} spiagge libere.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <MapSpiagge spiagge={pins} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Waves className="text-accent" size={24} /> Tutte le spiagge
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spiagge.map((s) => (
              <Link
                key={s.slug}
                href={`/spiagge/${regioneSlug}/${s.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50 block"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={s.img} alt={s.nome} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${s.tipo === "Stabilimento" ? "bg-sky-600" : "bg-emerald-600"}`}>
                    {s.tipo}
                  </span>
                  {s.prezzoTipo === "gratuito" && (
                    <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500 text-white">Gratis</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{s.nome}</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <MapPin size={14} /> {s.comune} ({s.provincia})
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{s.descrizione}</p>
                  {s.servizi && s.servizi.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {s.servizi.slice(0, 3).map((sv) => (
                        <span key={sv} className="text-xs bg-blue-50 text-accent px-2 py-0.5 rounded-full">{sv}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <section className="py-12 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">In viaggio in {regione} con il tuo cane?</h2>
            <p className="text-muted-foreground mb-6">Trova tutto quello che ti serve: veterinari, pensioni, dog sitter nella tua zona.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/professionisti?cat=veterinario" className="bg-primary text-white font-semibold rounded-full px-5 py-3 hover:bg-primary-dark transition-colors">
                Veterinari in {regione}
              </Link>
              <Link href="/professionisti?cat=pensione" className="bg-white border-2 border-border text-foreground font-semibold rounded-full px-5 py-3 hover:border-primary hover:text-primary transition-colors">
                Pensioni
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
