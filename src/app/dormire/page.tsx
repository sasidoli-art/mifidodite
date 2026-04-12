import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { DORMIRE_SEED, slugifyRegioneD, buildBookingUrl } from "@/lib/dormire-seed";
import { DormireClient, type DormireUI } from "./DormireClient";

export const metadata = {
  title: "Dormire con il cane in Italia 2026 — Hotel, agriturismi e camping pet-friendly | MifidoDiTe.eu",
  description: "La mappa delle strutture ricettive pet-friendly in Italia: hotel, agriturismi, B&B, camping e case vacanza verificate. Filtri per regione, tipo, prezzo, taglia cane.",
  keywords: ["hotel pet friendly", "agriturismo cani", "dormire con il cane", "camping cani", "b&b pet friendly italia"],
};

export default function DormirePage() {
  const strutture: DormireUI[] = DORMIRE_SEED.map((s) => ({
    slug: s.slug,
    nome: s.nome,
    comune: s.comune,
    provincia: s.provincia,
    regione: s.regione,
    regioneSlug: slugifyRegioneD(s.regione),
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
              Dormire con il <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">tuo animale</span> in Italia
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              {strutture.length} strutture ricettive pet-friendly in {regioni.length} regioni: hotel, agriturismi, B&amp;B, camping e case vacanza. Mappa interattiva con filtri.
            </p>
          </div>
        </section>

        <DormireClient strutture={strutture} />

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
