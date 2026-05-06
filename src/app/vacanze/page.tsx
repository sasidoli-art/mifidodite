import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { VACANZE_SEED, slugifyRegioneV, buildBookingUrl } from "@/lib/vacanze-seed";
import { VacanzeClient, type VacanzeUI } from "./VacanzeClient";

export const metadata = {
  title: "Hotel Pet-Friendly Italia | Vacanze con il Cane 2026 | MifidoDiTe.eu",
  description: "La mappa delle strutture ricettive pet-friendly in Italia per le tue vacanze col cane: hotel, agriturismi, B&B, camping e case vacanza verificate. Filtri per regione, tipo, prezzo, taglia cane.",
  keywords: ["hotel pet friendly", "agriturismo cani", "vacanze con il cane", "dormire con il cane", "camping cani", "b&b pet friendly italia"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze" },
  openGraph: {
    type: "website",
    title: "Vacanze con il cane in Italia 2026 — Strutture pet-friendly",
    description: "Hotel, agriturismi, masserie, camping e B&B verificati. Mappa, filtri e prenotazione su Booking.",
    url: "https://www.mifidodite.eu/vacanze",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vacanze con il cane in Italia 2026",
    description: "Strutture pet-friendly in tutte le regioni italiane.",
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"],
  },
};

export default function VacanzePage() {
  const strutture: VacanzeUI[] = VACANZE_SEED.map((s) => ({
    slug: s.slug,
    nome: s.nome,
    comune: s.comune,
    provincia: s.provincia,
    regione: s.regione,
    regioneSlug: slugifyRegioneV(s.regione),
    tipo: s.tipo,
    descrizione: s.descrizione,
    fascia: s.fascia,
    stelle: s.stelle,
    tagliaMax: s.tagliaMax,
    amenities: s.amenities,
    img: s.img,
    lat: s.lat,
    lng: s.lng,
    bookingUrl: buildBookingUrl(s.bookingQuery),
  }));

  const regioni = Array.from(new Set(strutture.map((s) => s.regione))).sort();

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Finalmente una vacanza senza
              <br />
              <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">sensi di colpa</span> per il tuo cane
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              {strutture.length} strutture ricettive <strong className="text-white">verificate a mano</strong> in {regioni.length} regioni: hotel, agriturismi, B&amp;B, camping e case vacanza.
            </p>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-10 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border-y border-border">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{strutture.length}+</div>
                <div className="text-sm text-muted-foreground mt-1">Strutture verificate</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border" />
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground">8,000+</div>
                <div className="text-sm text-muted-foreground mt-1">Newsletter iscritti</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border" />
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground">✓</div>
                <div className="text-sm text-muted-foreground mt-1">Verificate a mano</div>
              </div>
            </div>
          </div>
        </section>

        <VacanzeClient strutture={strutture} />

        <section className="py-8 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Le politiche pet-friendly possono cambiare. Verifica sempre con la struttura o tramite Booking prima di prenotare.
              I link &quot;Prenota su Booking&quot; sono affiliate e possono generare una piccola commissione a supporto del progetto.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
