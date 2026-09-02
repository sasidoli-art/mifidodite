import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Coffee, Building } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Lombardia 2026 — Hotel Pet-Friendly Milano, Bergamo, Como | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Lombardia. Hotel e B&B pet-friendly a Milano, Como, Bergamo. Laghi, montagne e città con il tuo amico a 4 zampe.",
  keywords: ["vacanze cani lombardia", "hotel pet friendly milano", "vacanze cani como", "vacanze cani bergamo", "laghi cani lombardia"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/lombardia/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Lombardia 2026",
    description: "Milano, Como, Bergamo e i laghi lombardi. Scopri dove portare il tuo cane in Lombardia.",
    url: "https://www.mifidodite.eu/vacanze/lombardia/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1499738595046-fb881502a235?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function LombardiaGuida() {
  const lombardiaStructures = VACANZE_SEED.filter(s => s.regione === "Lombardia").slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1499738595046-fb881502a235?w=1200&q=80"
              alt="Lombardia laghi"
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
                    { name: "Lombardia", url: "/vacanze/lombardia" },
                    { name: "Guida", url: "/vacanze/lombardia/guida" },
                  ]}
                />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">
                Vacanze con il Cane in Lombardia
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                Dalle sponde del Lago di Como ai Navigli di Milano, dalla montagna ai laghi: la Lombardia offre infinite possibilità per vacanze indimenticabili con il tuo cane.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Intro */}
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Lombardia: regione dei contrasti, perfetta per chi ama i cani</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>
                La Lombardia è una regione dalle mille facce: dalla metropoli di Milano agli affascinanti laghi prealpini, dalla montagna alle colline del Franciacorta. E è straordinariamente pet-friendly in tutte le sue forme.
              </p>
              <p>
                Gli hotel e gli agriturismi lombardi accolgono i cani con naturalezza. I ristoranti milanesi hanno dehors dove il tuo cane è il benvenuto, i laghi di Como e Garda offrono sentieri escursionistici cane-friendly, e le montagne forniscono infinite opportunità per passeggiate. Aggiungi la cucina locale e gli spazi verdi urbani, e avrai una vacanza perfetta sia che tu voglia città o natura.
              </p>
            </div>
          </section>

          {/* Highlights */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Coffee size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Milano e città</h3>
              <p className="text-sm text-muted-foreground">Capitale della moda e del design. Hotel affascinanti, parchi urbani e Navigli dove passeggiare con il tuo cane.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Mountain size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Laghi e montagna</h3>
              <p className="text-sm text-muted-foreground">Como, Garda, Iseo. Sentieri, spiagge lacustri e viste spettacolari con il tuo cane al guinzaglio.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Building size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Agriturismi</h3>
              <p className="text-sm text-muted-foreground">Cascine storiche nel Franciacorta e in Brianza. Relax, vino e spazi all'aperto per il tuo amico.</p>
            </div>
          </div>

          {/* Consigli */}
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli per vacanze in Lombardia con il tuo cane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Milano è pet-friendly più di quanto pensi</p>
                  <p className="text-sm text-muted-foreground">Parco Sempione, Navigli, centro città: molti ristoranti hanno dehors dove il cane è benvenuto. I negozi ammettono cani al guinzaglio.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Laghi: sentieri e spiagge cane-friendly</p>
                  <p className="text-sm text-muted-foreground">Como, Garda e gli altri laghi hanno zone dedicate ai cani. Verifica le ordinanze locali prima di visitare.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Franciacorta per gli appassionati di vino</p>
                  <p className="text-sm text-muted-foreground">Gli agriturismi della Franciacorta accolgono cani. Passeggia tra i vigneti mentre degusta i vini locali.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Trasporti pubblici Milano</p>
                  <p className="text-sm text-muted-foreground">Cani al guinzaglio sono ammessi sui Navigli, tram e metrò di Milano. Controllare le regole attuali prima di partire.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Strutture */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Lombardia</h2>
            <div className="space-y-6">
              {lombardiaStructures.length > 0 ? (
                lombardiaStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/lombardia/${s.slug}`}>
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
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Lombardia. Torna presto!</p>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Lombardia</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Visualizza tutte le strutture pet-friendly verificate a mano. Hotel a Milano, agriturismi in Franciacorta, case vacanza ai laghi.
            </p>
            <Link href="/vacanze/lombardia" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">
              Vedi tutte le strutture in Lombardia →
            </Link>
          </section>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Vacanze", url: "/vacanze" },
            { name: "Lombardia", url: "/vacanze/lombardia" },
            { name: "Guida", url: "/vacanze/lombardia/guida" },
          ]))}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({
            titolo: "Vacanze con il Cane in Lombardia 2026",
            descrizione: "Scopri le migliori vacanze con il cane in Lombardia. Hotel e B&B pet-friendly a Milano, Como, Bergamo. Laghi, montagne e città con il tuo amico a 4 zampe.",
            slug: "lombardia-guida",
            regione: "Lombardia",
            img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
            datePublished: new Date().toISOString().split("T")[0],
            autoreName: "MifidoDiTe Team",
          }))}
        />
      </main>
      <Footer />
    </>
  );
}
