import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Waves, Building2 } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Basilicata 2026 — Hotel Pet-Friendly Matera, Potenza | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Basilicata. Hotel e B&B pet-friendly a Matera, Potenza. Sassi UNESCO, mare Ionio e montagne con il tuo cane.",
  keywords: ["vacanze cani basilicata", "hotel pet friendly matera", "sassi matera cani", "mare ionio cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/basilicata/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Basilicata 2026",
    url: "https://www.mifidodite.eu/vacanze/basilicata/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function BasilicataGuida() {
  const basilicataStructures = VACANZE_SEED.filter(s => s.regione === "Basilicata").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80" alt="Basilicata" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Basilicata", url: "/vacanze/basilicata" }, { name: "Guida", url: "/vacanze/basilicata/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Basilicata</h1>
              <p className="text-lg text-white/80 max-w-2xl">Matera, Potenza, costa Ionica. Sassi UNESCO, montagne selvagge e mare vergine. La Basilicata offre avventure autentiche con il tuo cane.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Basilicata: Sassi, mare e montagne con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Matera è un capolavoro. Città scavata nella roccia: Sassi, Piazza San Pietro, conventi rupestri. Cani al guinzaglio navigano le piazzette affascinanti. Potenza è capoluogo di provincia tranquillo. La costa Ionica offre spiagge selvagge, Maratea è il gioiello costiero. Montagne dell'Appennino Lucano: sentieri per cani robusti, panorami spettacolari. Cucina genuina: pane, formaggi di montagna, salumi locali.</p>
              <p>La Basilicata attrae chi cerca autenticità senza compromessi. Agriturismo abbondanti, ospitalità calorosa. Cani trovano spazi ovunque. Servizi veterinari a Matera e Potenza. Il mare è pulito e meno affollato di altre regioni meridionali.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Building2 size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Sassi di Matera</h3>
              <p className="text-sm text-muted-foreground">Patrimonio UNESCO. Cani al guinzaglio in città rupestre affascinante.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Waves size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Costa Ionica</h3>
              <p className="text-sm text-muted-foreground">Maratea e spiagge selvagge. Mare pulito, poco affollato.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Mountain size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Appennino Lucano</h3>
              <p className="text-sm text-muted-foreground">Montagne tranquille, sentieri montani per cani.</p>
            </div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per la Basilicata</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Matera</p><p className="text-sm text-muted-foreground">Cani al guinzaglio obbligatorio. Visite guidate in Sassi disponibili.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Come arrivare</p><p className="text-sm text-muted-foreground">Bari (1h30m), Napoli (3h). Auto consigliata per montagne e spiagge.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Montagne</p><p className="text-sm text-muted-foreground">Appennino Lucano: escursionismo primavera-autunno.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Matera e Potenza hanno cliniche. Maratea ha servizi costieri.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Stagione</p><p className="text-sm text-muted-foreground">Aprile-maggio, settembre-ottobre ideali. Estate molto calda.</p></div>
              </li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Basilicata</h2>
            <div className="space-y-6">
              {basilicataStructures.length > 0 ? (
                basilicataStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/basilicata/${s.slug}`}>
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
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Basilicata. Torna presto!</p>
              )}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Basilicata</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Strutture pet-friendly verificate. Hotel, B&B e agriturismi in Basilicata.</p>
            <Link href="/vacanze/basilicata" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Basilicata →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Vacanze", url: "/vacanze" }, { name: "Basilicata", url: "/vacanze/basilicata" }, { name: "Guida", url: "/vacanze/basilicata/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Vacanze con il Cane in Basilicata 2026", descrizione: "Scopri le migliori vacanze con il cane in Basilicata. Hotel e B&B pet-friendly a Matera, Potenza. Sassi UNESCO, mare Ionio e montagne con il tuo cane.", slug: "basilicata-guida", regione: "Basilicata", img: "https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
