import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Landmark, Wine, Utensils } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane nel Lazio 2026 — Hotel Pet-Friendly Roma, Castelli | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane nel Lazio. Hotel e B&B pet-friendly a Roma, Castelli Romani, mare Lido. Spiagge, storia e cultura con il tuo cane.",
  keywords: ["vacanze cani lazio", "hotel pet friendly roma", "vacanze cani castelli romani", "spiagge lido cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/lazio/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane nel Lazio 2026",
    description: "Roma, Castelli Romani, mare Lido. Scopri dove portare il tuo cane nel Lazio.",
    url: "https://www.mifidodite.eu/vacanze/lazio/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function LazioGuida() {
  const lazioStructures = VACANZE_SEED.filter(s => s.regione === "Lazio").slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80"
              alt="Lazio Roma e Castelli"
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
                    { name: "Lazio", url: "/vacanze/lazio" },
                    { name: "Guida", url: "/vacanze/lazio/guida" },
                  ]}
                />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">
                Vacanze con il Cane nel Lazio
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                Roma, Castelli Romani, spiagge di Lido e Sabaudia. Il Lazio offre storia millenaria, paesaggi montani e mare, perfetti per vacanze con il tuo amico a 4 zampe.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Intro */}
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Lazio: storia, montagna e mare con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>
                Il Lazio è la provincia di Roma. La capitale italiana è cane-friendly per un'antica ragione: i romani amavano gli animali. Oggi, Roma accoglie il tuo cane nei parchi, nelle piazze storiche (al guinzaglio), nei ristoranti con dehors. Oltre Roma: i Castelli Romani offrono aria fresca e sentieri; il mare di Lido, Sabaudia e Sperlonga è tranquillo e meno affollato della Campania.
              </p>
              <p>
                Nel Lazio troverai hotel di lusso che accolgono cani, agriturismo nei Castelli, case vacanza fronte mare. La gastronomia locale è romana: cacio e pepe, carciofi, maritozzo (umano!). La regione è piena di siti archeologici, musei (vietati ai cani, ma lascialo in hotel fresco), e natura rigogliosa d'estate e d'autunno.
              </p>
            </div>
          </section>

          {/* Highlights */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Landmark size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Roma Eterna</h3>
              <p className="text-sm text-muted-foreground">Passeggia con il cane al guinzaglio tra i monumenti. Colosseo, Foro Romano, Pantheon, Fontana di Trevi: città perfetta per cani urbani.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Wine size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Castelli Romani</h3>
              <p className="text-sm text-muted-foreground">Colline, villaggi medievali, sentieri. Frascati, Marino, Velletri: aria fresca e agriturismo con cani benvenuti.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <MapPin size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Mare tranquillo</h3>
              <p className="text-sm text-muted-foreground">Lido, Sabaudia, Sperlonga: spiagge meno affollate, cane-friendly. Sabaudia ha dune intatte e cani liberi al tramonto.</p>
            </div>
          </div>

          {/* Quando visitare */}
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Quando visitare il Lazio con il cane</h2>
            <div className="space-y-4 text-foreground/80">
              <p><strong>Aprile-maggio e settembre-ottobre:</strong> Temperature piacevoli (18-25°C), Roma meno affollata di giugno-agosto. Estate calda: i musei sono vietati al cane, e il sole su Roma è brutale. Inverno fresco (dicembre-febbraio), ideale per passeggiate.</p>
            </div>
          </section>

          {/* Come arrivare */}
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Come arrivare e muoversi con il cane</h2>
            <div className="space-y-4 text-foreground/80">
              <p><strong>Aeroporto:</strong> Roma Fiumicino (30 km). Trenitalia ammette cani gratis al guinzaglio. Metro Roma accetta cani nelle ore non di punta.</p>
              <p><strong>Auto:</strong> Utile per Castelli e mare. Parcheggi limitati a Roma; usa le aree periferiche. Non lasciare il cane in auto al sole.</p>
              <p><strong>Dentro Roma:</strong> Cane al guinzaglio obbligatorio. Parchi: Villa Borghese, Villa Doria Pamphili accettano cani.</p>
            </div>
          </section>

          {/* Strutture */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly nel Lazio</h2>
            <div className="space-y-6">
              {lazioStructures.length > 0 ? (
                lazioStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/lazio/${s.slug}`}>
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
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento nel Lazio. Torna presto!</p>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni nel Lazio</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Visualizza tutte le strutture pet-friendly verificate a mano. Hotel a Roma, agriturismi nei Castelli, case vacanza al mare.
            </p>
            <Link href="/vacanze/lazio" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">
              Vedi tutte le strutture nel Lazio →
            </Link>
          </section>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Vacanze", url: "/vacanze" },
            { name: "Lazio", url: "/vacanze/lazio" },
            { name: "Guida", url: "/vacanze/lazio/guida" },
          ]))}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({
            titolo: "Vacanze con il Cane nel Lazio 2026",
            descrizione: "Scopri le migliori vacanze con il cane nel Lazio. Hotel e B&B pet-friendly a Roma, Castelli Romani, mare Lido. Spiagge, storia e cultura con il tuo cane.",
            slug: "lazio-guida",
            regione: "Lazio",
            img: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80",
            datePublished: new Date().toISOString().split("T")[0],
            autoreName: "MifidoDiTe Team",
          }))}
        />
      </main>
      <Footer />
    </>
  );
}
