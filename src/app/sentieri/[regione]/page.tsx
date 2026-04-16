import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Mountain, Clock, ArrowUpRight } from "lucide-react";
import { unslugifyRegioneSentieri, getSentieriByRegione, getAllRegioniSentieri, DIFFICOLTA_LABEL } from "@/lib/sentieri-seed";
import { collectionJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/json-ld";
import { MapSentieri } from "../MapSentieri";

export function generateStaticParams() {
  return getAllRegioniSentieri().map((regione) => ({ regione }));
}

export async function generateMetadata({ params }: { params: Promise<{ regione: string }> }) {
  const { regione: regioneSlug } = await params;
  const regione = unslugifyRegioneSentieri(regioneSlug);
  if (!regione) return { title: "Regione non trovata" };
  const count = getSentieriByRegione(regioneSlug).length;
  return {
    title: `Sentieri dog-friendly in ${regione} 2026 — Escursioni con il cane | MifidoDiTe.eu`,
    description: `${count} sentieri ed escursioni dove il cane e il benvenuto in ${regione}.`,
    alternates: { canonical: `https://www.mifidodite.eu/sentieri/${regioneSlug}` },
  };
}

const DIFF_BADGE: Record<string, { bg: string }> = {
  facile: { bg: "bg-emerald-500" },
  media: { bg: "bg-amber-500" },
  difficile: { bg: "bg-red-500" },
};

export default async function SentieriRegionePage({ params }: { params: Promise<{ regione: string }> }) {
  const { regione: regioneSlug } = await params;
  const regione = unslugifyRegioneSentieri(regioneSlug);
  if (!regione) notFound();

  const sentieri = getSentieriByRegione(regioneSlug);
  if (sentieri.length === 0) notFound();

  const pins = sentieri.map((s) => ({
    slug: s.slug, nome: s.nome, comune: s.comune, regione: s.regione, difficolta: s.difficolta, lat: s.lat, lng: s.lng,
  }));

  const jsonLdData = [
    collectionJsonLd(`Sentieri dog-friendly in ${regione}`, `/sentieri/${regioneSlug}`, sentieri.length),
    breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Sentieri", url: "/sentieri" }, { name: regione, url: `/sentieri/${regioneSlug}` }]),
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
              <Breadcrumbs dark items={[{ name: "Sentieri", url: "/sentieri" }, { name: regione, url: `/sentieri/${regioneSlug}` }]} />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Sentieri con il cane in <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">{regione}</span>
            </h1>
            <p className="mt-4 text-lg text-white/60">{sentieri.length} escursioni dog-friendly.</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <MapSentieri sentieri={pins} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sentieri.map((s) => (
              <Link key={s.slug} href={`/sentieri/${regioneSlug}/${s.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50">
                <div className="h-48 overflow-hidden relative">
                  <img src={s.img} alt={s.nome} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${DIFF_BADGE[s.difficolta]?.bg}`}>
                    {DIFFICOLTA_LABEL[s.difficolta]}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{s.nome}</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground"><MapPin size={14} /> {s.comune}</div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Mountain size={12} /> {s.lunghezzaKm} km</span>
                    <span className="flex items-center gap-1"><ArrowUpRight size={12} /> {s.dislivelloM}m</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {s.durataOre}h</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{s.descrizione}</p>
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
