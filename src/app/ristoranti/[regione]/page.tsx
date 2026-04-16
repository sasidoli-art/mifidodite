import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import {
  unslugifyRegioneRistoranti,
  getRistorantiByRegione,
  getAllRegioniRistoranti,
  PREZZO_LABEL_RIST,
} from "@/lib/ristoranti-seed";
import { collectionJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/json-ld";
import { MapRistoranti } from "../MapRistoranti";

export function generateStaticParams() {
  return getAllRegioniRistoranti().map((regione) => ({ regione }));
}

export async function generateMetadata({ params }: { params: Promise<{ regione: string }> }) {
  const { regione: regioneSlug } = await params;
  const regione = unslugifyRegioneRistoranti(regioneSlug);
  if (!regione) return { title: "Regione non trovata" };
  const count = getRistorantiByRegione(regioneSlug).length;
  const title = `Ristoranti pet-friendly in ${regione} 2026 — Dove mangiare con il cane | MifidoDiTe.eu`;
  const description = `${count} ristoranti, osterie e pizzerie che accolgono i cani in ${regione}. Mappa, dehors e giardini.`;
  return {
    title,
    description,
    alternates: { canonical: `https://www.mifidodite.eu/ristoranti/${regioneSlug}` },
    openGraph: { type: "website", title, description, url: `https://www.mifidodite.eu/ristoranti/${regioneSlug}`, siteName: "MifidoDiTe.eu", locale: "it_IT" },
  };
}

const TIPO_BADGE: Record<string, { bg: string; label: string }> = {
  ristorante: { bg: "bg-primary", label: "Ristorante" },
  agriturismo: { bg: "bg-secondary", label: "Agriturismo" },
  dog_cafe: { bg: "bg-accent", label: "Dog cafe" },
  cat_cafe: { bg: "bg-accent", label: "Cat cafe" },
  pizzeria: { bg: "bg-orange-500", label: "Pizzeria" },
  osteria: { bg: "bg-amber-800", label: "Osteria" },
  brewery: { bg: "bg-yellow-700", label: "Brewery" },
  bistrot: { bg: "bg-sky-600", label: "Bistrot" },
};

export default async function RistorantiRegionePage({ params }: { params: Promise<{ regione: string }> }) {
  const { regione: regioneSlug } = await params;
  const regione = unslugifyRegioneRistoranti(regioneSlug);
  if (!regione) notFound();

  const ristoranti = getRistorantiByRegione(regioneSlug);
  if (ristoranti.length === 0) notFound();

  const pins = ristoranti.map((r) => ({
    slug: r.slug, nome: r.nome, comune: r.comune, regione: r.regione, tipo: r.tipo, lat: r.lat, lng: r.lng,
  }));

  const jsonLdData = [
    collectionJsonLd(`Ristoranti pet-friendly in ${regione}`, `/ristoranti/${regioneSlug}`, ristoranti.length),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Ristoranti", url: "/ristoranti" },
      { name: regione, url: `/ristoranti/${regioneSlug}` },
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
              <Breadcrumbs dark items={[
                { name: "Ristoranti", url: "/ristoranti" },
                { name: regione, url: `/ristoranti/${regioneSlug}` },
              ]} />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Dove mangiare con il cane in <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">{regione}</span>
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              {ristoranti.length} ristoranti pet-friendly verificati.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <MapRistoranti ristoranti={pins} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ristoranti.map((r) => (
              <Link
                key={r.slug}
                href={`/ristoranti/${regioneSlug}/${r.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={r.img} alt={r.nome} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${TIPO_BADGE[r.tipo]?.bg || "bg-primary"}`}>
                    {TIPO_BADGE[r.tipo]?.label || r.tipo}
                  </span>
                  <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/95 text-foreground">
                    {PREZZO_LABEL_RIST[r.fascia]}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{r.nome}</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <MapPin size={14} /> {r.comune}
                  </div>
                  <p className="text-xs text-muted-foreground italic mt-1">{r.cucina}</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.descrizione}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
