import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Building2, Wine } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Puglia 2026 — Hotel Pet-Friendly Bari, Lecce | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Puglia. Hotel e B&B pet-friendly a Bari, Lecce, Salento. Mare Adriatico e Ionio, città d'arte con il tuo cane.",
  keywords: ["vacanze cani puglia", "hotel pet friendly lecce", "spiagge salento cani", "bari cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/puglia/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Puglia 2026",
    url: "https://www.mifidodite.eu/vacanze/puglia/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function PugliaGuida() {
  const pugliaStructures = VACANZE_SEED.filter(s => s.regione === "Puglia").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80" alt="Puglia" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Puglia", url: "/vacanze/puglia" }, { name: "Guida", url: "/vacanze/puglia/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Puglia</h1>
              <p className="text-lg text-white/80 max-w-2xl">Bari, Lecce, Salento. La Puglia è il tacco dello stivale: mare cristallino, città d'arte barocca e cani benvenuti in ogni piazza.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Puglia: mare, arte barocca e cani felici</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Puglia è terra di contrasti. Bari è porto storico, città viva e cosmopolita. Lecce è la perla barocca: piazze affrescate, chiese dorate, cani al guinzaglio navigano bellezza. Salento è penisola selvaggia: spiagge doppie (Adriatico e Ionio), mare cristallino, cani trovano spazio ovunque. Masserie antiche trasformate in agriturismi. Cucina pugliese: orecchiette con le cime di rapa, burrata, panzerotti, vini rossi Primitivo.</p>
              <p>La Puglia attrae proprietari che cercano equilibrio: cultura e natura, città e mare, autenticità senza turismo di massa. Cani sono amati. Veterinari presenti in città e centri costieri. Spiagge pubbliche accettano cani. Ambiente caldo-accogliente caratterizza l'intera regione.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Building2 size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Barocco leccese</h3>
              <p className="text-sm text-muted-foreground">Lecce, città d'arte. Cani al guinzaglio in piazze affrescate.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Waves size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Mare doppio</h3>
              <p className="text-sm text-muted-foreground">Adriatico e Ionio: spiagge selvagge, cane-friendly.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Wine size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Vini e cucina</h3>
              <p className="text-sm text-muted-foreground">Primitivo, burrata, orecchiette, autenticità meridionale.</p>
            </div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per la Puglia</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Lecce a piedi</p><p className="text-sm text-muted-foreground">Cane al guinzaglio. Città barocca compatta, piazze affrescate.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Come arrivare</p><p className="text-sm text-muted-foreground">Bari (1h), Brindisi (1h30m). Auto essenziale per Salento.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Spiagge</p><p className="text-sm text-muted-foreground">Tutte pubbliche accettano cani. Scopri calette del Salento.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Bari, Lecce, Brindisi hanno cliniche. Servizi nei centri costieri.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Clima</p><p className="text-sm text-muted-foreground">Aprile-maggio e settembre-ottobre ideali. Estate calda.</p></div>
              </li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Puglia</h2>
            <div className="space-y-6">
              {pugliaStructures.length > 0 ? (
                pugliaStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/puglia/${s.slug}`}>
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
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Puglia. Torna presto!</p>
              )}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Puglia</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Strutture pet-friendly verificate. Hotel, B&B e agriturismi in Puglia.</p>
            <Link href="/vacanze/puglia" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Puglia →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Vacanze", url: "/vacanze" }, { name: "Puglia", url: "/vacanze/puglia" }, { name: "Guida", url: "/vacanze/puglia/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Vacanze con il Cane in Puglia 2026", descrizione: "Scopri le migliori vacanze con il cane in Puglia. Hotel e B&B pet-friendly a Bari, Lecce, Salento. Mare Adriatico e Ionio, città d'arte con il tuo cane.", slug: "puglia-guida", regione: "Puglia", img: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
