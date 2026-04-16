import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { SENTIERI_SEED, slugifyRegioneS } from "@/lib/sentieri-seed";
import { SentieriClient, type SentieroUI } from "./SentieriClient";

export const metadata = {
  title: "Sentieri ed escursioni dog-friendly in Italia 2026 — MifidoDiTe.eu",
  description: "26 sentieri ed escursioni dove il tuo cane e il benvenuto: Dolomiti, Cinque Terre, Costiera Amalfitana, Sardegna e altro. Mappa, filtri, difficolta e info pratiche.",
  keywords: ["sentieri cani", "escursioni con il cane", "trekking dog friendly", "passeggiate cani", "sentieri pet friendly"],
  alternates: { canonical: "https://www.mifidodite.eu/sentieri" },
  openGraph: {
    type: "website",
    title: "Sentieri dog-friendly in Italia 2026",
    description: "26 escursioni dove il cane e benvenuto: Dolomiti, Cinque Terre, Sardegna...",
    url: "https://www.mifidodite.eu/sentieri",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function SentieriPage() {
  const sentieri: SentieroUI[] = SENTIERI_SEED.map((s) => ({
    slug: s.slug, nome: s.nome, comune: s.comune, provincia: s.provincia, regione: s.regione,
    regioneSlug: slugifyRegioneS(s.regione), tipo: s.tipo, difficolta: s.difficolta,
    lunghezzaKm: s.lunghezzaKm, dislivelloM: s.dislivelloM, durataOre: s.durataOre,
    adattoACuccioli: s.adattoACuccioli, descrizione: s.descrizione, img: s.img, lat: s.lat, lng: s.lng,
  }));

  const regioni = Array.from(new Set(sentieri.map((s) => s.regione))).sort();

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Sentieri ed escursioni <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">dog-friendly</span>
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              {sentieri.length} sentieri in {regioni.length} regioni dove il tuo cane e il benvenuto. Dalle Dolomiti alla Sardegna.
            </p>
          </div>
        </section>

        <SentieriClient sentieri={sentieri} />

        <section className="py-8 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Porta sempre acqua, sacchetti e guinzaglio. Rispetta la fauna selvatica e gli altri escursionisti. Verifica le regole specifiche dei parchi nazionali prima di andare.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
