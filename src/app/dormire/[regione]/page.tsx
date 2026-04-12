import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowLeft, Star, ExternalLink } from "lucide-react";
import {
  unslugifyRegioneDormire,
  getDormireByRegione,
  getAllRegioniDormire,
  buildBookingUrl,
  PREZZO_LABEL,
} from "@/lib/dormire-seed";
import { MapDormire } from "../MapDormire";

export function generateStaticParams() {
  return getAllRegioniDormire().map((regione) => ({ regione }));
}

export async function generateMetadata({ params }: { params: Promise<{ regione: string }> }) {
  const { regione: regioneSlug } = await params;
  const regione = unslugifyRegioneDormire(regioneSlug);
  if (!regione) return { title: "Regione non trovata" };
  const count = getDormireByRegione(regioneSlug).length;
  return {
    title: `Hotel e strutture pet-friendly in ${regione} 2026 — Dormire con il cane | MifidoDiTe.eu`,
    description: `${count} strutture ricettive pet-friendly in ${regione}: hotel, agriturismi, B&B, camping. Mappa, filtri e prenotazioni su Booking.`,
    keywords: [`hotel pet friendly ${regione}`, `dormire con cane ${regione}`, `agriturismi cani ${regione}`],
  };
}

const TIPO_BADGE: Record<string, { bg: string; label: string }> = {
  hotel: { bg: "bg-primary", label: "Hotel" },
  agriturismo: { bg: "bg-secondary", label: "Agriturismo" },
  bnb: { bg: "bg-accent", label: "B&B" },
  camping: { bg: "bg-sky-600", label: "Camping" },
  casa_vacanza: { bg: "bg-purple-600", label: "Casa vacanza" },
};

export default async function DormireRegionePage({ params }: { params: Promise<{ regione: string }> }) {
  const { regione: regioneSlug } = await params;
  const regione = unslugifyRegioneDormire(regioneSlug);
  if (!regione) notFound();

  const strutture = getDormireByRegione(regioneSlug);
  if (strutture.length === 0) notFound();

  const pins = strutture.map((s) => ({
    slug: s.slug,
    nome: s.nome,
    comune: s.comune,
    regione: s.regione,
    tipo: s.tipo,
    lat: s.lat,
    lng: s.lng,
  }));

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <Link href="/dormire" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium mb-4">
              <ArrowLeft size={14} /> Tutte le regioni
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Dormire con il cane in <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">{regione}</span>
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              {strutture.length} strutture ricettive pet-friendly: hotel, agriturismi, B&amp;B, camping e case vacanza verificate.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <MapDormire strutture={pins} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Tutte le strutture</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {strutture.map((s) => (
              <div
                key={s.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50 flex flex-col"
              >
                <Link href={`/dormire/${regioneSlug}/${s.slug}`} className="group block">
                  <div className="h-48 overflow-hidden relative">
                    <img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${TIPO_BADGE[s.tipo].bg}`}>
                      {TIPO_BADGE[s.tipo].label}
                    </span>
                    <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/95 text-foreground">
                      {PREZZO_LABEL[s.fascia]}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-1">
                      {s.stelle && Array.from({ length: s.stelle }).map((_, i) => (
                        <Star key={i} size={12} fill="#D4A94C" stroke="#D4A94C" />
                      ))}
                    </div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">{s.nome}</h3>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin size={14} /> {s.comune} ({s.provincia})
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{s.descrizione}</p>
                  </div>
                </Link>
                <div className="px-4 pb-4 mt-auto">
                  <a
                    href={buildBookingUrl(s.bookingQuery)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#003580] hover:bg-[#002659] text-white text-sm font-semibold rounded-full px-4 py-2.5 transition-colors"
                  >
                    Prenota su Booking <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="py-12 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Vacanza in {regione} con il tuo cane?</h2>
            <p className="text-muted-foreground mb-6">Guarda anche le spiagge pet-friendly, i veterinari e i servizi della regione.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={`/spiagge/${regioneSlug}`} className="bg-primary text-white font-semibold rounded-full px-5 py-3 hover:bg-primary-dark transition-colors">
                Spiagge in {regione}
              </Link>
              <Link href="/professionisti?cat=veterinario" className="bg-white border-2 border-border text-foreground font-semibold rounded-full px-5 py-3 hover:border-primary hover:text-primary transition-colors">
                Veterinari
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
