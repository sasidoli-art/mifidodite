import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { MapPin, Star, Sun, Waves, Dog, ShowerHead } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Spiagge Dog-Friendly in Italia — MifidoDiTe.it",
  description: "La guida completa alle spiagge italiane che accettano cani. Cerca per regione e trova la spiaggia perfetta per te e il tuo amico.",
};

// Mock data
const SPIAGGE = [
  {
    id: "s1", slug: "bau-beach-rimini", nome: "Bau Beach Rimini", comune: "Rimini", provincia: "RN", regione: "Emilia-Romagna",
    descrizione: "La spiaggia dog-friendly piu famosa della Riviera. Ingresso libero, area gioco, docce per cani.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    servizi: ["Ingresso libero", "Docce", "Area gioco", "Ciotole acqua"],
    rating: 4.6, recensioni: 203, tipo: "Spiaggia libera",
  },
  {
    id: "s2", slug: "dog-beach-san-vincenzo", nome: "Dog Beach San Vincenzo", comune: "San Vincenzo", provincia: "LI", regione: "Toscana",
    descrizione: "Ampia spiaggia attrezzata per cani di tutte le taglie con ombrelloni e lettini.",
    img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&q=80",
    servizi: ["Ombrelloni", "Lettini", "Bar", "Docce"],
    rating: 4.4, recensioni: 156, tipo: "Stabilimento",
  },
  {
    id: "s3", slug: "baubeach-maccarese", nome: "BauBeach Maccarese", comune: "Fiumicino", provincia: "RM", regione: "Lazio",
    descrizione: "Oasi naturale per cani liberi. Filosofia no-guinzaglio in area recintata sulla spiaggia.",
    img: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=400&q=80",
    servizi: ["No guinzaglio", "Area recintata", "Educatori", "Ristorante"],
    rating: 4.8, recensioni: 312, tipo: "Spiaggia libera",
  },
  {
    id: "s4", slug: "spiaggia-cani-alassio", nome: "Spiaggia Cani Alassio", comune: "Alassio", provincia: "SV", regione: "Liguria",
    descrizione: "Tratto di spiaggia dedicato ai cani nel cuore della Riviera Ligure.",
    img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&q=80",
    servizi: ["Ingresso libero", "Fontanella", "Cestini"],
    rating: 4.2, recensioni: 87, tipo: "Spiaggia libera",
  },
  {
    id: "s5", slug: "lido-zampa-jesolo", nome: "Lido Zampa Jesolo", comune: "Jesolo", provincia: "VE", regione: "Veneto",
    descrizione: "Stabilimento balneare interamente dedicato ai cani con servizi premium.",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
    servizi: ["Ombrelloni", "Agility", "Dog shower", "Pet shop"],
    rating: 4.5, recensioni: 198, tipo: "Stabilimento",
  },
  {
    id: "s6", slug: "bau-bau-village-cagliari", nome: "Bau Bau Village", comune: "Quartu Sant'Elena", provincia: "CA", regione: "Sardegna",
    descrizione: "Villaggio balneare pet-friendly con piscina per cani e area relax.",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    servizi: ["Piscina cani", "Area relax", "Bar", "Animazione"],
    rating: 4.7, recensioni: 145, tipo: "Stabilimento",
  },
];

const REGIONI = [...new Set(SPIAGGE.map((s) => s.regione))];

export default function SpiaggePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="text-5xl mb-4">🏖️</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
              Spiagge <span className="text-accent">Dog-Friendly</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              La guida completa alle spiagge italiane dove il tuo cane e il benvenuto.
              Cerca per regione e parti per il mare insieme.
            </p>

            {/* Filtro regioni */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer">
                Tutte
              </span>
              {REGIONI.map((r) => (
                <span
                  key={r}
                  className="bg-white text-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-colors cursor-pointer shadow-sm"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Lista spiagge */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPIAGGE.map((spiaggia) => (
              <Link
                key={spiaggia.id}
                href={`/struttura/${spiaggia.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={spiaggia.img}
                    alt={spiaggia.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Waves size={12} /> {spiaggia.tipo}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 text-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                    {spiaggia.regione}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                    {spiaggia.nome}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    {spiaggia.comune} ({spiaggia.provincia})
                  </div>

                  <div className="flex items-center gap-1.5 mt-2">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold">{spiaggia.rating}</span>
                    <span className="text-xs text-muted-foreground">({spiaggia.recensioni} recensioni)</span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {spiaggia.descrizione}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {spiaggia.servizi.map((s) => (
                      <span key={s} className="text-xs bg-blue-50 text-accent px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
