import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Utensils, Palmtree } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Liguria 2026 — Hotel e B&B Pet-Friendly al Mare | MifidoDiTe.eu",
  description: "Guida completa alle vacanze con il cane in Liguria. Scopri hotel, B&B e case vacanza pet-friendly sulla costa ligure, spiagge dog-friendly e ristoranti che accolgono cani.",
  keywords: ["vacanze cani liguria", "hotel pet friendly liguria", "spiagge cani liguria", "genova cani", "cinque terre cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/liguria/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Liguria 2026",
    description: "Porta il tuo cane al mare in Liguria. Scopri spiagge dog-friendly, hotel pet-friendly e ristoranti accoglienti.",
    url: "https://www.mifidodite.eu/vacanze/liguria/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function LiguriaGuida() {
  const liguriaStructures = VACANZE_SEED.filter(s => s.regione === "Liguria").slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
              alt="Liguria costa"
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
                    { name: "Liguria", url: "/vacanze/liguria" },
                    { name: "Guida", url: "/vacanze/liguria/guida" },
                  ]}
                />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">
                Vacanze con il Cane in Liguria
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                La Liguria è ideale per chi vuole portare il cane al mare. Scopri spiagge dog-friendly, hotel pet-friendly sulla costa e la bellezza della Riviera con il tuo amico a 4 zampe.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Intro */}
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">La Liguria: mare, cibo e cani felici</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>
                La Liguria non è solo una delle coste più belle d'Italia, è anche una delle più cane-friendly. Dalla Riviera di Ponente alla Riviera di Levante, dalle Cinque Terre a Portofino, la Liguria offre spiagge dove il tuo cane può correre, tuffarsi e giocare in libertà.
              </p>
              <p>
                I liguri amano gli animali, e lo vedrai subito: hotel che accolgono cani con entusiasmo, ristoranti con tavoli all'aperto dove il tuo amico è benvenuto, e soprattutto spiagge dedicate dove il tuo cane può divertirsi senza restrizioni. Aggiungi la cucina locale straordinaria e le escursioni lungo il mare, e avrai la vacanza perfetta.
              </p>
            </div>
          </section>

          {/* Highlights */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Waves size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Spiagge dog-friendly</h3>
              <p className="text-sm text-muted-foreground">Spiagge dove il tuo cane può nuotare, giocare e divertirsi. Dalla Versilia alle Cinque Terre.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Utensils size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Gastronomia</h3>
              <p className="text-sm text-muted-foreground">Pesto, pesce fresco e vini DOC. Ristoranti con tavoli all'aperto dove il tuo cane è il benvenuto.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Palmtree size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Relax sulla costa</h3>
              <p className="text-sm text-muted-foreground">Spiagge tranquille, borghi affascinanti e tramonti indimenticabili. Tutto con il tuo cane.</p>
            </div>
          </div>

          {/* Consigli specifici per la Liguria */}
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli specifici per vacanze con cane in Liguria</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Spiagge dedicate ai cani</p>
                  <p className="text-sm text-muted-foreground">Molte spiagge liguri hanno zone dedicate ai cani in estate. Controlla se la tua zona preferita ha una spiaggia dog-friendly.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Attenzione al sale marino</p>
                  <p className="text-sm text-muted-foreground">Dopo una giornata al mare, risciacqua bene il tuo cane. L'acqua salata può irritare la pelle e le orecchie.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Sentieri costieri dog-friendly</p>
                  <p className="text-sm text-muted-foreground">La Liguria offre bellissimi sentieri lungo la costa. Molti sono aperti ai cani, purché al guinzaglio.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Protezione dal sole</p>
                  <p className="text-sm text-muted-foreground">I giorni soleggiati in Liguria possono essere intensi. Porta ombrellone, acqua fresca e cibo in abbondanza per il tuo cane.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Top Strutture */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Liguria</h2>
            <div className="space-y-6">
              {liguriaStructures.length > 0 ? (
                liguriaStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/liguria/${s.slug}`}>
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
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Liguria. Torna presto per gli aggiornamenti!</p>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Liguria</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Visualizza tutte le strutture pet-friendly verificate sulla costa ligure. Hotel, B&B, agriturismi e case vacanza che accolgono il tuo cane.
            </p>
            <Link href="/vacanze/liguria" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">
              Vedi tutte le strutture in Liguria →
            </Link>
          </section>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Vacanze", url: "/vacanze" },
            { name: "Liguria", url: "/vacanze/liguria" },
            { name: "Guida", url: "/vacanze/liguria/guida" },
          ]))}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({
            titolo: "Vacanze con il Cane in Liguria 2026",
            descrizione: "Guida completa alle vacanze con il cane in Liguria. Scopri hotel, B&B e case vacanza pet-friendly sulla costa ligure, spiagge dog-friendly e ristoranti che accolgono cani.",
            slug: "liguria-guida",
            regione: "Liguria",
            img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=1200&q=80",
            datePublished: new Date().toISOString().split("T")[0],
            autoreName: "MifidoDiTe Team",
          }))}
        />
      </main>
      <Footer />
    </>
  );
}
