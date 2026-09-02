import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Snowflake, AlertTriangle } from "lucide-react";
import { SENTIERI_SEED, slugifyRegioneS } from "@/lib/sentieri-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Sentieri per Cani in Trentino-Alto Adige 2026 — Dolomiti Pet-Friendly | MifidoDiTe.eu",
  description: "I migliori sentieri dog-friendly in Trentino-Alto Adige. Dolomiti, Brenta, Stelvio. Rifugi accoglienti, sentieri segnati CAI, escursioni per ogni livello con il cane.",
  keywords: ["sentieri cani trentino", "dolomiti cani", "escursioni cane alto adige", "rifugi cane"],
  alternates: { canonical: "https://www.mifidodite.eu/sentieri/trentino-alto-adige/guida" },
  openGraph: { type: "article", title: "Sentieri per Cani in Trentino-Alto Adige 2026", url: "https://www.mifidodite.eu/sentieri/trentino-alto-adige/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function TrentinoSentieriGuida() {
  const sentieri = SENTIERI_SEED.filter(s => s.regione === "Trentino-Alto Adige").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Sentieri Trentino-Alto Adige" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Sentieri", url: "/sentieri" }, { name: "Trentino-Alto Adige", url: "/sentieri/trentino-alto-adige" }, { name: "Guida", url: "/sentieri/trentino-alto-adige/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Sentieri per Cani in Trentino-Alto Adige</h1><p className="text-lg text-white/80 max-w-2xl">Dolomiti UNESCO, Gruppo del Brenta, Stelvio. La regione con la rete sentieristica piu organizzata d'Italia: segnaletica CAI capillare, rifugi accoglienti, mappe digitali.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trentino-Alto Adige: la rete sentieristica modello d'Italia</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Il Trentino-Alto Adige ha la rete sentieristica piu' sviluppata d'Italia: oltre 12.000 km segnati CAI, ogni segnale verniciato di fresco ogni anno, mappe online aggiornate. Le <strong>Dolomiti UNESCO</strong> offrono escursioni mozzafiato a tutti i livelli, dal sentiero panoramico in funivia (cane ammesso con museruola) al trekking di piu' giorni con notti in rifugio. <strong>Brenta</strong> e <strong>Stelvio</strong> offrono ambienti alpini meno affollati. Cani al guinzaglio in tutte le aree protette, museruola da portare con se'. I rifugi sono in genere accoglienti con i cani in zona pranzo all'aperto.</p>
              <p>Sentieri dog-friendly accertati: <strong>Alpe di Siusi</strong> (sentieri pianeggianti perfetti per famiglie), <strong>Lago di Braies</strong> (giro del lago facile), <strong>Sentiero del Ponale</strong> (Lago di Garda Trentino), <strong>Catinaccio Rosengarten</strong> (sentieri medi), <strong>Tre Cime di Lavaredo</strong> (giro classico). Per altitudini sopra 2.500m, valuta bene il livello fisico del cane.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Mountain size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Dolomiti UNESCO</h3><p className="text-sm text-muted-foreground">Sentieri segnati, paesaggi mozzafiato, rifugi accoglienti.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Snowflake size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Anche d'inverno</h3><p className="text-sm text-muted-foreground">Ciaspolate dog-friendly, sentieri innevati attrezzati.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Mucche al pascolo</h3><p className="text-sm text-muted-foreground">Mai attraversare con cane libero: vacche con vitelli attaccano.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per i sentieri trentini</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Funivie</p><p className="text-sm text-muted-foreground">Cani ammessi con museruola e biglietto ridotto. Comodo per partire da quota alta.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Altitudine</p><p className="text-sm text-muted-foreground">Sopra 2.000m il cane fatica come gli umani. Acclimatamento graduale, soste frequenti.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Pascoli</p><p className="text-sm text-muted-foreground">Mucche difendono vitelli. Cane SEMPRE al guinzaglio nei pascoli. No eccezioni.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Rifugi</p><p className="text-sm text-muted-foreground">Pernottamento dipende dal rifugio: chiama prima. Quasi tutti accettano cani nei tavoli esterni.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Trento, Bolzano, Bressanone hanno cliniche h24. Standard alpini elevati anche nei piccoli centri.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">I migliori sentieri verificati in Trentino-Alto Adige</h2>
            <div className="space-y-6">
              {sentieri.length > 0 ? (sentieri.map((s) => (<Link key={s.slug} href={`/sentieri/${slugifyRegioneS(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.difficolta} · {s.lunghezzaKm} km</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di piu' →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessun sentiero verificato al momento in Trentino-Alto Adige.</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutti i sentieri in Trentino-Alto Adige</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Sentieri dog-friendly verificati con difficolta, lunghezza e indicazioni pratiche.</p>
            <Link href="/sentieri/trentino-alto-adige" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutti i sentieri →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Sentieri", url: "/sentieri" }, { name: "Trentino-Alto Adige", url: "/sentieri/trentino-alto-adige" }, { name: "Guida", url: "/sentieri/trentino-alto-adige/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Sentieri per Cani in Trentino-Alto Adige 2026", descrizione: "I migliori sentieri dog-friendly in Trentino-Alto Adige. Dolomiti, Brenta, Stelvio.", slug: "trentino-sentieri-guida", regione: "Trentino-Alto Adige", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
