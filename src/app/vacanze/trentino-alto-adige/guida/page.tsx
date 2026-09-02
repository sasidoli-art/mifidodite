import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Snowflake, Utensils } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Trentino-Alto Adige 2026 — Hotel Pet-Friendly Dolomiti, Trento | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Trentino-Alto Adige. Hotel pet-friendly tra Dolomiti, Trento, Bolzano. Sentieri alpini, lago di Garda Trentino, malghe con il tuo cane.",
  keywords: ["vacanze cani trentino alto adige", "hotel pet friendly dolomiti", "sentieri trentino cani", "lago garda trentino cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/trentino-alto-adige/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Trentino-Alto Adige 2026",
    url: "https://www.mifidodite.eu/vacanze/trentino-alto-adige/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function TrentinoAltoAdigeGuida() {
  const trentinoStructures = VACANZE_SEED.filter(s => s.regione === "Trentino-Alto Adige").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Trentino-Alto Adige" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Trentino-Alto Adige", url: "/vacanze/trentino-alto-adige" }, { name: "Guida", url: "/vacanze/trentino-alto-adige/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Trentino-Alto Adige</h1>
              <p className="text-lg text-white/80 max-w-2xl">Dolomiti, Trento, Bolzano, lago di Garda Trentino. La regione alpina più organizzata d'Italia: sentieri segnati, malghe accoglienti, hotel di alto livello con servizi cane.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trentino-Alto Adige: Dolomiti UNESCO e standard mitteleuropei</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Il Trentino-Alto Adige è la regione italiana con la cultura turistica più organizzata. Hotel di alta gamma con menu cane, ciotole nelle camere, mappe sentieri segnati. Le Dolomiti (patrimonio UNESCO) offrono escursionismo per ogni livello: dal sentiero panoramico in funivia al rifugio a 2.500m. Cani al guinzaglio sempre, libertà nelle aree non protette. Il lago di Garda Trentino (Riva, Torbole) ha spiagge cane-friendly anche d'inverno, con clima mite e attività outdoor tutto l'anno. Trento e Bolzano sono città a misura d'uomo dove i cani sono ovunque: tram, piazze, caffè con dehors.</p>
              <p>La cucina è una fusione italo-austriaca: speck, canederli, formaggi di malga, vini bianchi pregiati. Le malghe in quota servono pranzi semplici e accettano cani sui prati. Costi medi più alti del resto d'Italia, ma servizi corrispondenti. Veterinari di qualità ovunque, parlano italiano e tedesco.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Mountain size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Dolomiti UNESCO</h3>
              <p className="text-sm text-muted-foreground">Sentieri segnati, rifugi accoglienti, funivie con cani ammessi (museruola).</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Snowflake size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Inverno con il cane</h3>
              <p className="text-sm text-muted-foreground">Ciaspolate, slittate, passeggiate nella neve. Hotel attrezzati per cani.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Utensils size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Cucina di malga</h3>
              <p className="text-sm text-muted-foreground">Speck, canederli, formaggi alpini, strudel. Servita nei rifugi tutto l'anno.</p>
            </div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per il Trentino-Alto Adige</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Funivie</p><p className="text-sm text-muted-foreground">Cani ammessi con museruola e biglietto ridotto. Verifica per ogni impianto specifico.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Sentieri</p><p className="text-sm text-muted-foreground">Cani al guinzaglio in aree protette (Parco Stelvio, Dolomiti). Liberi in zone non protette se sotto controllo.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Mucche al pascolo</p><p className="text-sm text-muted-foreground">Mai attraversare un pascolo con il cane libero. Le mucche con vitelli attaccano per difenderli.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Altitudine</p><p className="text-sm text-muted-foreground">Sopra i 2.000m proteggi il cane: ciotola acqua sempre, evita zampe ferite sulle rocce, occhio al mal d'altitudine.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Bolzano, Trento, Bressanone hanno cliniche h24. Standard altissimi anche nei piccoli centri.</p></div>
              </li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Trentino-Alto Adige</h2>
            <div className="space-y-6">
              {trentinoStructures.length > 0 ? (
                trentinoStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/trentino-alto-adige/${s.slug}`}>
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
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Trentino-Alto Adige. Torna presto!</p>
              )}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Trentino-Alto Adige</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Strutture pet-friendly verificate. Hotel, chalet e rifugi in Trentino-Alto Adige.</p>
            <Link href="/vacanze/trentino-alto-adige" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Trentino-Alto Adige →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Vacanze", url: "/vacanze" }, { name: "Trentino-Alto Adige", url: "/vacanze/trentino-alto-adige" }, { name: "Guida", url: "/vacanze/trentino-alto-adige/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Vacanze con il Cane in Trentino-Alto Adige 2026", descrizione: "Scopri le migliori vacanze con il cane in Trentino-Alto Adige. Hotel pet-friendly tra Dolomiti, Trento, Bolzano. Sentieri alpini, lago di Garda Trentino, malghe con il tuo cane.", slug: "trentino-alto-adige-guida", regione: "Trentino-Alto Adige", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
