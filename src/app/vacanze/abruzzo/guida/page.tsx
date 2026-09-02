import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Waves, Utensils } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Abruzzo 2026 — Hotel Pet-Friendly L'Aquila, Teramo | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Abruzzo. Hotel pet-friendly a L'Aquila, Teramo, Chieti. Montagne Appenniniche e mare Adriatico con il tuo cane.",
  keywords: ["vacanze cani abruzzo", "hotel pet friendly l'aquila", "montagne cani appennino"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/abruzzo/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Abruzzo 2026",
    url: "https://www.mifidodite.eu/vacanze/abruzzo/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function AbruzzoGuida() {
  const abruzzoStructures = VACANZE_SEED.filter(s => s.regione === "Abruzzo").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Abruzzo" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Abruzzo", url: "/vacanze/abruzzo" }, { name: "Guida", url: "/vacanze/abruzzo/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Abruzzo</h1>
              <p className="text-lg text-white/80 max-w-2xl">L'Aquila, Teramo, Chieti. Montagne selvagge Appenniniche, mare Adriatico intatto, nature selvaggia. L'Abruzzo è la risposta per cani e proprietari che amano l'avventura.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Abruzzo: montagne selvagge e mare incontaminato con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>L'Abruzzo non è una meta turistica mainstream. È il segreto. Montagne Appenniniche con orsi e lupi (rari, non pericolosi). Parco Nazionale del Gran Sasso: sentieri incredibili. Mare Adriatico pulito e meno affollato. Città medievali come Teramo. Cani sono benvenuti ovunque. Agriturismo sono la norma. La cucina è di montagna: arrosticini (spiedini di agnello), formaggi, vini rossi.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Mountain size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Gran Sasso</h3>
              <p className="text-sm text-muted-foreground">Parco nazionale, sentieri alpini, paesaggi selvaggi. Cani benvenuti.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Waves size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Mare intatto</h3>
              <p className="text-sm text-muted-foreground">Costa Adriatica meno conosciuta. Spiagge cane-friendly.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Utensils size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Cucina montana</h3>
              <p className="text-sm text-muted-foreground">Arrosticini, formaggi, prodotti locali genuini.</p>
            </div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per l'Abruzzo</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Montagne</p><p className="text-sm text-muted-foreground">Escursionismo: primavera/estate. Attrezzatura montagna necessaria.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Auto</p><p className="text-sm text-muted-foreground">Essenziale. Strade montane. Non buche, ma curve.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Natura</p><p className="text-sm text-muted-foreground">Orsi e lupi non sono pericolosi. Mantieni distanza, cane al guinzaglio.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">L'Aquila e Teramo hanno servizi. Montagna remota: portare kit pronto soccorso.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Sentieri</p><p className="text-sm text-muted-foreground">Cani al guinzaglio in aree protette. Libertà in sentieri aperti.</p></div>
              </li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Abruzzo</h2>
            <div className="space-y-6">
              {abruzzoStructures.length > 0 ? (
                abruzzoStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/abruzzo/${s.slug}`}>
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
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Abruzzo. Torna presto!</p>
              )}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Abruzzo</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Strutture pet-friendly verificate. Hotel, agriturismi e case vacanza in Abruzzo.</p>
            <Link href="/vacanze/abruzzo" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Abruzzo →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Vacanze", url: "/vacanze" }, { name: "Abruzzo", url: "/vacanze/abruzzo" }, { name: "Guida", url: "/vacanze/abruzzo/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Vacanze con il Cane in Abruzzo 2026", descrizione: "Scopri le migliori vacanze con il cane in Abruzzo. Hotel pet-friendly a L'Aquila, Teramo, Chieti. Montagne Appenniniche e mare Adriatico con il tuo cane.", slug: "abruzzo-guida", regione: "Abruzzo", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
