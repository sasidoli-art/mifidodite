import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Utensils, Volcano } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";

export const metadata = {
  title: "Vacanze con il Cane in Campania 2026 — Hotel Pet-Friendly Napoli, Sorrento, Costiera | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Campania. Hotel e B&B pet-friendly a Napoli, Sorrento, Costiera Amalfitana. Spiagge, storia e bellezza con il tuo cane.",
  keywords: ["vacanze cani campania", "hotel pet friendly sorrento", "vacanze cani napoli", "costiera amalfitana cani", "capri cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/campania/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Campania 2026",
    description: "Napoli, Sorrento, Costiera Amalfitana e Capri. Scopri dove portare il tuo cane in Campania.",
    url: "https://www.mifidodite.eu/vacanze/campania/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1525174262454-b46e1a505f87?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function CampaniaGuida() {
  const campaniaStructures = VACANZE_SEED.filter(s => s.regione === "Campania").slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1525174262454-b46e1a505f87?w=1200&q=80"
              alt="Campania costiera"
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs
                  dark
                  items={[
                    { name: "Vacanze", url: "/vacanze" },
                    { name: "Campania", url: "/vacanze/campania" },
                    { name: "Guida", url: "/vacanze/campania/guida" },
                  ]}
                />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">
                Vacanze con il Cane in Campania
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                Costiera Amalfitana, Sorrento, Napoli e le isole. La Campania offre bellezze naturali, storia e cultura, perfette per vacanze indimenticabili con il tuo amico a 4 zampe.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Intro */}
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Campania: spiagge, storia e dolce vita con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>
                La Campania è una delle regioni più belle d'Italia. La Costiera Amalfitana, le spiagge di Sorrento, la vivacità di Napoli, i vulcani e le isole: è un'offerta straordinaria di bellezze naturali e culturali. E sì, puoi portare il tuo cane ovunque.
              </p>
              <p>
                I campani amano gli animali domestici. Vedrai cani ovunque: nelle piazze di Napoli, sulle spiagge, nei ristoranti con vista sul mare. Gli hotel sono abituati a ospitare cani, e la gastronomia locale (pizza, sfogliatelle, pesce fresco) rende ogni vacanza speciale. Aggiungi spiagge cane-friendly, sentieri costieri e l'atmosfera mediterranea, e avrai una vacanza indimenticabile.
              </p>
            </div>
          </section>

          {/* Highlights */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Waves size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Costiera Amalfitana</h3>
              <p className="text-sm text-muted-foreground">Una delle coste più belle del mondo. Spiagge e sentieri dove il tuo cane godrà della natura.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Utensils size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Cucina straordinaria</h3>
              <p className="text-sm text-muted-foreground">Pizza, pesce fresco, sfogliatelle. Ristoranti con tavoli all'aperto dove il cane è il benvenuto.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Volcano size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Storia e cultura</h3>
              <p className="text-sm text-muted-foreground">Napoli, Pompei, Ercolano. Città ricche di storia dove passeggiare con il tuo cane.</p>
            </div>
          </div>

          {/* Consigli */}
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli per vacanze in Campania con il tuo cane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Spiagge cane-friendly sulla Costiera</p>
                  <p className="text-sm text-muted-foreground">Sorrento e la Costiera hanno spiagge dedicate ai cani. Verifica gli orari e le regole prima di visitare.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Napoli è più cane-friendly di quanto pensi</p>
                  <p className="text-sm text-muted-foreground">Piazza Plebiscito, lungomare, ristoranti con dehors: i napoletani adorano i cani. Portalo al guinzaglio nei centri storici.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Calore estivo: protezione dal sole</p>
                  <p className="text-sm text-muted-foreground">L'estate in Campania è calda. Porta sempre acqua fresca, ombrellone e mantieni il cane all'ombra durante le ore più calde.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Le isole (Capri, Ischia, Procida)</p>
                  <p className="text-sm text-muted-foreground">I traghetti ammettono cani. Verifica le regole delle singole isole, ma generalmente sono pet-friendly.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Strutture */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Campania</h2>
            <div className="space-y-6">
              {campaniaStructures.length > 0 ? (
                campaniaStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/campania/${s.slug}`}>
                    <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
                      <div className="grid sm:grid-cols-3 gap-0">
                        <div className="h-48 sm:h-auto overflow-hidden">
                          <img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="col-span-2 p-6 flex flex-col justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3">
                              <MapPin size={14} /> {s.comune} ({s.provincia})
                            </p>
                            <p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p>
                          </div>
                          <div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Campania. Torna presto!</p>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Campania</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Visualizza tutte le strutture pet-friendly verificate a mano. Hotel sulla Costiera, B&B a Napoli, case vacanza alle isole.
            </p>
            <Link href="/vacanze/campania" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">
              Vedi tutte le strutture in Campania →
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
