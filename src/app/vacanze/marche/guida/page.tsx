import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Building2, Mountain } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane nelle Marche 2026 — Hotel Pet-Friendly Ancona, Pesaro | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane nelle Marche. Hotel pet-friendly a Ancona, Pesaro, Urbino. Mare Adriatico e montagne con il tuo cane.",
  keywords: ["vacanze cani marche", "hotel pet friendly ancona", "spiagge cani adriatico"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/marche/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane nelle Marche 2026",
    url: "https://www.mifidodite.eu/vacanze/marche/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function MarcheGuida() {
  const marcheStructures = VACANZE_SEED.filter(s => s.regione === "Marche").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Marche" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Marche", url: "/vacanze/marche" }, { name: "Guida", url: "/vacanze/marche/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane nelle Marche</h1>
              <p className="text-lg text-white/80 max-w-2xl">Ancona, Pesaro, Urbino. Mare Adriatico tranquillo, montagnes verdi, città d'arte. Le Marche offrono il meglio di entrambi i mondi con il cane.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Marche: mare e montagne con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Le Marche sono spesso trascurate dai turisti. Errore. Hai mare Adriatico calmo (non affollato come Liguria), montagne verdi (Monti Sibillini), città d'arte (Urbino UNESCO). Pesaro accoglie cani nei parchi, sul lungomare. Ancona ha una storia antica. I ristoranti sono eccellenti e generosi con cani nei dehors. L'atmosfera è quella di un'Italia che respira e non urla.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Waves size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Mare tranquillo</h3>
              <p className="text-sm text-muted-foreground">Spiagge Adriatiche meno affollate. Pesaro e Rimini pet-friendly.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Building2 size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Città d'arte</h3>
              <p className="text-sm text-muted-foreground">Urbino, Pesaro. Cani al guinzaglio nelle piazze storiche.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Mountain size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Monti Sibillini</h3>
              <p className="text-sm text-muted-foreground">Sentieri montani. Altitudine, freschezza, tranquillità.</p>
            </div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le Marche</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Clima</p><p className="text-sm text-muted-foreground">Primavera/autunno ideali. Estate calda ma meno opprimente del Sud.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Trasporti</p><p className="text-sm text-muted-foreground">Auto consigliata. Aeroporto Ancona per voli nazionali.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Sentieri</p><p className="text-sm text-muted-foreground">Monti Sibillini: trekking cane-friendly.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Cibo</p><p className="text-sm text-muted-foreground">Brodetto (zuppa di pesce), salumi, vini Verdicchio.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Ancona e Pesaro hanno ospedali veterinari 24h.</p></div>
              </li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly nelle Marche</h2>
            <div className="space-y-6">
              {marcheStructures.length > 0 ? (
                marcheStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/marche/${s.slug}`}>
                    <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
                      <div className="grid sm:grid-cols-3 gap-0">
                        <div className="h-48 sm:h-auto overflow-hidden">
                          <img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="col-span-2 p-6 flex flex-col justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p>
                            <p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p>
                          </div>
                          <div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento nelle Marche. Torna presto!</p>
              )}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni nelle Marche</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Strutture pet-friendly verificate. Hotel e agriturismi nelle Marche.</p>
            <Link href="/vacanze/marche" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture nelle Marche →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Vacanze", url: "/vacanze" }, { name: "Marche", url: "/vacanze/marche" }, { name: "Guida", url: "/vacanze/marche/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Vacanze con il Cane nelle Marche 2026", descrizione: "Scopri le migliori vacanze con il cane nelle Marche. Hotel pet-friendly a Ancona, Pesaro, Urbino. Mare Adriatico e montagne con il tuo cane.", slug: "marche-guida", regione: "Marche", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
