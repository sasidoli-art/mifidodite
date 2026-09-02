import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Trees, AlertTriangle } from "lucide-react";
import { SENTIERI_SEED, slugifyRegioneS } from "@/lib/sentieri-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Sentieri per Cani in Umbria 2026 — Sibillini, Trasimeno, Subasio | MifidoDiTe.eu",
  description: "I migliori sentieri dog-friendly in Umbria. Monti Sibillini, Lago Trasimeno, Monte Subasio, Cascata delle Marmore. Sentieri segnati per ogni livello con il cane.",
  keywords: ["sentieri cani umbria", "sibillini cani", "trasimeno pet friendly", "subasio cani"],
  alternates: { canonical: "https://www.mifidodite.eu/sentieri/umbria/guida" },
  openGraph: { type: "article", title: "Sentieri per Cani in Umbria 2026", url: "https://www.mifidodite.eu/sentieri/umbria/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function UmbriaSentieriGuida() {
  const sentieri = SENTIERI_SEED.filter(s => s.regione === "Umbria").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80" alt="Sentieri Umbria" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Sentieri", url: "/sentieri" }, { name: "Umbria", url: "/sentieri/umbria" }, { name: "Guida", url: "/sentieri/umbria/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Sentieri per Cani in Umbria</h1><p className="text-lg text-white/80 max-w-2xl">Monti Sibillini, Lago Trasimeno, Monte Subasio, Cascata delle Marmore. Cuore verde d'Italia: sentieri tranquilli, paesaggi medievali, ambiente boschivo.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Umbria: il cuore verde d'Italia</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>L'Umbria offre escursionismo tranquillo, poco affollato, in ambiente prevalentemente boschivo. <strong>Monti Sibillini</strong>: parco nazionale, sentieri di media difficolta', Piano Grande di Castelluccio (fioriture mozzafiato in giugno-luglio). <strong>Lago Trasimeno</strong>: sentiero del lago facile, ideale per famiglie. <strong>Monte Subasio</strong> (Assisi): panoramico, sentieri segnati. <strong>Cascata delle Marmore</strong>: belvedere accessibili. Cani al guinzaglio in tutti i parchi.</p>
              <p>Sentieri dog-friendly accertati: <strong>Monte Subasio</strong> (da Assisi), <strong>Castelluccio Piano Grande</strong>, <strong>Sentiero del Trasimeno</strong>, <strong>Cascata Marmore belvedere</strong>, <strong>Monte Vettore</strong> (Sibillini). Per Vettore sopra 2.000m valutare forma fisica del cane.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Mountain size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Sibillini</h3><p className="text-sm text-muted-foreground">Parco nazionale, sentieri media-alta quota, fioriture estive.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Trees size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Trasimeno</h3><p className="text-sm text-muted-foreground">Lago facile, ideale per cani anziani o famiglie con bambini.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Vipere</h3><p className="text-sm text-muted-foreground">Vipera comune presente in Sibillini e Subasio. Maggio-settembre attenzione.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per i sentieri umbri</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Castelluccio</p><p className="text-sm text-muted-foreground">Fioriture giugno-luglio: bellissimo ma affollato. Vai presto al mattino.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Subasio</p><p className="text-sm text-muted-foreground">Accessibile da Assisi a piedi. Panorami su tutta Umbria.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Stagione</p><p className="text-sm text-muted-foreground">Aprile-ottobre. Trasimeno tutto l'anno. Sibillini giugno-settembre per alta quota.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Vipere</p><p className="text-sm text-muted-foreground">Cane al guinzaglio, scarponi alti. Kit antivelenoso del veterinario.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Perugia, Terni, Foligno hanno cliniche h24. Montagna: kit pronto soccorso.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">I migliori sentieri verificati in Umbria</h2>
            <div className="space-y-6">
              {sentieri.length > 0 ? (sentieri.map((s) => (<Link key={s.slug} href={`/sentieri/${slugifyRegioneS(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.difficolta} · {s.lunghezzaKm} km</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di piu' →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessun sentiero verificato al momento in Umbria.</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutti i sentieri in Umbria</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Sentieri dog-friendly verificati con difficolta, lunghezza e indicazioni pratiche.</p>
            <Link href="/sentieri/umbria" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutti i sentieri →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Sentieri", url: "/sentieri" }, { name: "Umbria", url: "/sentieri/umbria" }, { name: "Guida", url: "/sentieri/umbria/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Sentieri per Cani in Umbria 2026", descrizione: "I migliori sentieri dog-friendly in Umbria. Monti Sibillini, Lago Trasimeno, Monte Subasio.", slug: "umbria-sentieri-guida", regione: "Umbria", img: "https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
