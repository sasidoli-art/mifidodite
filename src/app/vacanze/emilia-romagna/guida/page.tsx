import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Utensils, Building2 } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Emilia-Romagna 2026 — Hotel Pet-Friendly Bologna, Rimini | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Emilia-Romagna. Hotel e B&B pet-friendly a Bologna, Rimini, Parma, Modena. Mare Adriatico, città d'arte e Appennino con il tuo cane.",
  keywords: ["vacanze cani emilia romagna", "hotel pet friendly bologna", "spiagge rimini cani", "appennino emiliano cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/emilia-romagna/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Emilia-Romagna 2026",
    url: "https://www.mifidodite.eu/vacanze/emilia-romagna/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function EmiliaRomagnaGuida() {
  const emiliaStructures = VACANZE_SEED.filter(s => s.regione === "Emilia-Romagna").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80" alt="Emilia-Romagna" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Emilia-Romagna", url: "/vacanze/emilia-romagna" }, { name: "Guida", url: "/vacanze/emilia-romagna/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Emilia-Romagna</h1>
              <p className="text-lg text-white/80 max-w-2xl">Bologna, Rimini, Parma, Modena. Riviera Adriatica con le spiagge Bau Beach più organizzate d'Italia, città d'arte e Appennino. La regione più dog-friendly del paese.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Emilia-Romagna: la regione più cane-friendly d'Italia</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Riviera Romagnola da decenni accoglie cani come pochi altri posti in Italia. Da Cattolica a Comacchio la maggior parte delle spiagge libere ammette cani in ogni stagione, e gli stabilimenti "Bau Beach" certificati con ombrelloni, ciotole e docce per il bagnetto sono ovunque. A Cervia e a Bellaria ci sono spiagge attrezzate dedicate ai cani fin dagli anni 2000. Bologna è una città a misura di cane: portici lunghi che proteggono dal sole, parchi storici (Giardini Margherita), trattorie con dehors. Parma e Modena offrono cultura del cibo, gli agriturismo nell'Appennino sono numerosi e accolgono cani senza supplementi.</p>
              <p>Il vantaggio dell'Emilia-Romagna è la varietà concentrata: in 2 ore di auto passi dalle spiagge alla città d'arte ai sentieri di montagna. I servizi veterinari sono capillari ovunque, anche nei centri minori. La cucina è tra le più ricche d'Italia e i ristoratori sono abituati ad accogliere cani ai tavoli esterni.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Waves size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Riviera Bau Beach</h3>
              <p className="text-sm text-muted-foreground">Cervia, Bellaria, Rimini, Cattolica: stabilimenti dedicati con servizi premium per cani.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Building2 size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Città d'arte</h3>
              <p className="text-sm text-muted-foreground">Bologna, Parma, Modena, Ferrara: portici, piazze, parchi storici dog-friendly.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Utensils size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Capitale del gusto</h3>
              <p className="text-sm text-muted-foreground">Tortellini, prosciutto, parmigiano, lambrusco. Ristoranti con dehors aperti ai cani.</p>
            </div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per l'Emilia-Romagna</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Bau Beach</p><p className="text-sm text-muted-foreground">Prenota ombrellone: alta stagione si riempiono. Cervia "No Problem Beach" è la più nota.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Bologna a piedi</p><p className="text-sm text-muted-foreground">Portici 40 km: ombra garantita. Cane al guinzaglio nelle piazze storiche.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Come arrivare</p><p className="text-sm text-muted-foreground">Bologna è snodo ferroviario nazionale. Aeroporti Bologna, Rimini, Parma.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Cliniche h24 a Bologna, Modena, Rimini, Parma. Servizi buoni anche nei piccoli centri.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Appennino</p><p className="text-sm text-muted-foreground">Sentieri Parco Frignano e Corno alle Scale: fresco anche d'estate, cani liberi in aree non protette.</p></div>
              </li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Emilia-Romagna</h2>
            <div className="space-y-6">
              {emiliaStructures.length > 0 ? (
                emiliaStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/emilia-romagna/${s.slug}`}>
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
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Emilia-Romagna. Torna presto!</p>
              )}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Emilia-Romagna</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Strutture pet-friendly verificate. Hotel, B&B e agriturismi in Emilia-Romagna.</p>
            <Link href="/vacanze/emilia-romagna" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Emilia-Romagna →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Vacanze", url: "/vacanze" }, { name: "Emilia-Romagna", url: "/vacanze/emilia-romagna" }, { name: "Guida", url: "/vacanze/emilia-romagna/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Vacanze con il Cane in Emilia-Romagna 2026", descrizione: "Scopri le migliori vacanze con il cane in Emilia-Romagna. Hotel e B&B pet-friendly a Bologna, Rimini, Parma, Modena. Mare Adriatico, città d'arte e Appennino con il tuo cane.", slug: "emilia-romagna-guida", regione: "Emilia-Romagna", img: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
