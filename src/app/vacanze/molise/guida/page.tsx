import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Waves, Utensils } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Molise 2026 — Hotel Pet-Friendly Campobasso, Isernia | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Molise. Hotel e agriturismi pet-friendly a Campobasso, Isernia. Mare Adriatico e montagne tranquille con il tuo cane.",
  keywords: ["vacanze cani molise", "hotel pet friendly campobasso", "spiagge cani adriatico molise"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/molise/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Molise 2026",
    url: "https://www.mifidodite.eu/vacanze/molise/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function MoliseGuida() {
  const moliseStructures = VACANZE_SEED.filter(s => s.regione === "Molise").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Molise" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Molise", url: "/vacanze/molise" }, { name: "Guida", url: "/vacanze/molise/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Molise</h1>
              <p className="text-lg text-white/80 max-w-2xl">Campobasso, Isernia, costa Adriatica. Il Molise è il segreto meglio custodito d'Italia: tranquillità, natura selvaggia, mare intatto e cani benvenuti ovunque.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Molise: tranquillità, montagne e mare con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Il Molise non è sulla cartina turistica. È una regione dove il tempo si muove lentamente. Campobasso domina le colline; Isernia offre storia e silenzio. Montagni Appenniniche tranquille, sentieri poco frequentati, cani sempre benvenuti. Costa Adriatica ancora selvaggia: Termoli è il porto principale, con spiagge nascoste e poco affollate. Agriturismo sono la norma, cucina semplice e genuina: caciocavallo, peperoni cruschi, vini locali.</p>
              <p>Il Molise attrae proprietari di cani che cercano spazi senza turismo di massa. Non troverai resort internazionali, ma troverai autenticità. Veterinari presenti a Campobasso e Isernia. Sentieri montani perfetti per cani robusti. Mare pulito e tranquillo per cani che amano l'acqua.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Mountain size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Montagni selvagge</h3>
              <p className="text-sm text-muted-foreground">Appennini tranquilli, pochi turisti. Sentieri per cani di ogni taglia.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Waves size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Mare intatto</h3>
              <p className="text-sm text-muted-foreground">Termoli e costa Adriatica poco conosciuta. Spiagge cane-friendly.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Utensils size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Cucina autentica</h3>
              <p className="text-sm text-muted-foreground">Caciocavallo, peperoni cruschi, prodotti locali genuini.</p>
            </div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per il Molise</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Quando</p><p className="text-sm text-muted-foreground">Aprile-maggio e settembre-ottobre. Estate tranquilla, inverno mite.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Come arrivare</p><p className="text-sm text-muted-foreground">Auto essenziale. Napoli (2h), Pescara (1h), Ancona (2h30m) gli aeroporti più vicini.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Sentieri</p><p className="text-sm text-muted-foreground">Montagne accessibili per cani. Meno frequentate di altre regioni.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Campobasso e Isernia hanno cliniche. Termoli ha servizi costieri.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Spiagge</p><p className="text-sm text-muted-foreground">Termoli main beach, ma scopri calette nascoste lungo la costa.</p></div>
              </li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Molise</h2>
            <div className="space-y-6">
              {moliseStructures.length > 0 ? (
                moliseStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/molise/${s.slug}`}>
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
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Molise. Torna presto!</p>
              )}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Molise</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Strutture pet-friendly verificate. Hotel, agriturismi e case vacanza in Molise.</p>
            <Link href="/vacanze/molise" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Molise →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Vacanze", url: "/vacanze" }, { name: "Molise", url: "/vacanze/molise" }, { name: "Guida", url: "/vacanze/molise/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Vacanze con il Cane in Molise 2026", descrizione: "Scopri le migliori vacanze con il cane in Molise. Hotel e agriturismi pet-friendly a Campobasso, Isernia. Mare Adriatico e montagne tranquille con il tuo cane.", slug: "molise-guida", regione: "Molise", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
