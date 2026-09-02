import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Waves, AlertTriangle } from "lucide-react";
import { SENTIERI_SEED, slugifyRegioneS } from "@/lib/sentieri-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Sentieri per Cani in Lombardia 2026 — Laghi, Orobie, Stelvio | MifidoDiTe.eu",
  description: "I migliori sentieri dog-friendly in Lombardia. Lago di Como, Garda, Iseo, Orobie, Stelvio. Sentieri segnati CAI, escursioni per ogni livello con il cane.",
  keywords: ["sentieri cani lombardia", "sentieri lago como cani", "orobie pet friendly", "stelvio cani"],
  alternates: { canonical: "https://www.mifidodite.eu/sentieri/lombardia/guida" },
  openGraph: { type: "article", title: "Sentieri per Cani in Lombardia 2026", url: "https://www.mifidodite.eu/sentieri/lombardia/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function LombardiaSentieriGuida() {
  const sentieri = SENTIERI_SEED.filter(s => s.regione === "Lombardia").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Sentieri Lombardia" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Sentieri", url: "/sentieri" }, { name: "Lombardia", url: "/sentieri/lombardia" }, { name: "Guida", url: "/sentieri/lombardia/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Sentieri per Cani in Lombardia</h1><p className="text-lg text-white/80 max-w-2xl">Lago di Como, Garda, Iseo, Orobie, Stelvio. Lombardia montana e lacustre: sentieri panoramici, accessibili da Milano in 1-2 ore, accoglienti per cani.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Lombardia: laghi, montagne, parchi nazionali</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Lombardia offre escursionismo estremamente vario. <strong>Lago di Como</strong>: sentieri panoramici tra ville antiche, sentieri lacustri facili (Sentiero del Viandante). <strong>Lago di Garda</strong>: Monte Baldo, sponda lombarda con sentieri panoramici. <strong>Lago d'Iseo</strong>: Monte Isola, dolce e adatto a famiglie. <strong>Orobie bergamasche e valtellinesi</strong>: media-alta quota, ambienti alpini. <strong>Stelvio</strong>: il parco nazionale piu' grande d'Italia, ambienti d'alta quota. Cani al guinzaglio in tutte le aree protette.</p>
              <p>Sentieri dog-friendly accertati: <strong>Sentiero del Viandante</strong> (Lago di Como), <strong>Giro di Monte Isola</strong> (Iseo), <strong>Bocchette del Tremalzo</strong>, <strong>Piani di Bobbio</strong>, <strong>Resegone</strong> (Lecco). Per altitudini Stelvio, valuta forma fisica del cane.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Sentieri lacustri</h3><p className="text-sm text-muted-foreground">Como, Garda, Iseo: panorami su acqua, sentieri facili, vento fresco.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Mountain size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Orobie</h3><p className="text-sm text-muted-foreground">Bergamasche e valtellinesi: ambiente alpino accessibile.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Stelvio</h3><p className="text-sm text-muted-foreground">Parco nazionale: cane al guinzaglio sempre. Altitudine elevata.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per i sentieri lombardi</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Da Milano</p><p className="text-sm text-muted-foreground">Como 50 min, Lecco 1h, Garda 1h30m, Iseo 1h, Stelvio 3h. Auto consigliata.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Traghetti laghi</p><p className="text-sm text-muted-foreground">Navigazione Lago di Como e Garda accetta cani al guinzaglio gratis.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Stagione</p><p className="text-sm text-muted-foreground">Sentieri lacustri tutto l'anno. Orobie e Stelvio giugno-settembre.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Pascoli</p><p className="text-sm text-muted-foreground">Cane al guinzaglio in pascoli con vacche. Mai eccezioni.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Milano, Bergamo, Brescia, Lecco hanno cliniche h24. Montagna: kit pronto soccorso.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">I migliori sentieri verificati in Lombardia</h2>
            <div className="space-y-6">
              {sentieri.length > 0 ? (sentieri.map((s) => (<Link key={s.slug} href={`/sentieri/${slugifyRegioneS(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.difficolta} · {s.lunghezzaKm} km</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di piu' →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessun sentiero verificato al momento in Lombardia.</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutti i sentieri in Lombardia</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Sentieri dog-friendly verificati con difficolta, lunghezza e indicazioni pratiche.</p>
            <Link href="/sentieri/lombardia" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutti i sentieri →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Sentieri", url: "/sentieri" }, { name: "Lombardia", url: "/sentieri/lombardia" }, { name: "Guida", url: "/sentieri/lombardia/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Sentieri per Cani in Lombardia 2026", descrizione: "I migliori sentieri dog-friendly in Lombardia. Lago di Como, Garda, Iseo, Orobie, Stelvio.", slug: "lombardia-sentieri-guida", regione: "Lombardia", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
