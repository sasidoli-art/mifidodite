import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Trees, AlertTriangle } from "lucide-react";
import { SENTIERI_SEED, slugifyRegioneS } from "@/lib/sentieri-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Sentieri per Cani in Friuli-Venezia Giulia 2026 — Alpi Giulie, Carso | MifidoDiTe.eu",
  description: "I migliori sentieri dog-friendly in Friuli-Venezia Giulia. Alpi Giulie, Carso, Dolomiti Friulane. Sentieri segnati per ogni livello con il cane.",
  keywords: ["sentieri cani friuli", "alpi giulie cani", "carso pet friendly", "dolomiti friulane"],
  alternates: { canonical: "https://www.mifidodite.eu/sentieri/friuli-venezia-giulia/guida" },
  openGraph: { type: "article", title: "Sentieri per Cani in Friuli-Venezia Giulia 2026", url: "https://www.mifidodite.eu/sentieri/friuli-venezia-giulia/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function FriuliSentieriGuida() {
  const sentieri = SENTIERI_SEED.filter(s => s.regione === "Friuli-Venezia Giulia").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80" alt="Sentieri Friuli-Venezia Giulia" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Sentieri", url: "/sentieri" }, { name: "Friuli-Venezia Giulia", url: "/sentieri/friuli-venezia-giulia" }, { name: "Guida", url: "/sentieri/friuli-venezia-giulia/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Sentieri per Cani in Friuli-Venezia Giulia</h1><p className="text-lg text-white/80 max-w-2xl">Alpi Giulie (Triglav, Mangart), Dolomiti Friulane, Carso triestino. Sentieri di confine tra Italia, Austria, Slovenia.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Friuli-Venezia Giulia: confine alpino e Carso</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Il Friuli-Venezia Giulia offre tre ambienti molto diversi. <strong>Alpi Giulie</strong>: Mangart, Jof di Montasio, sentieri di confine con Slovenia e Austria. <strong>Dolomiti Friulane</strong> (UNESCO): meno note ma spettacolari, parco regionale. <strong>Carso triestino</strong>: ambiente carsico unico, doline, grotte, sentieri pianeggianti. <strong>Prealpi Carniche</strong>: media difficolta'. Cani al guinzaglio obbligatorio nei parchi.</p>
              <p>Sentieri dog-friendly accertati: <strong>Sentiero Rilke</strong> (Carso, vista mare), <strong>Lago di Fusine</strong> (Alpi Giulie), <strong>Sella Nevea-Mangart</strong>, <strong>Forni di Sopra Dolomiti Friulane</strong>, <strong>Val Saisera</strong>. Per Mangart e alta quota, valuta forma fisica del cane.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Mountain size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Alpi Giulie</h3><p className="text-sm text-muted-foreground">Mangart, Montasio. Sentieri di confine, ambiente alpino.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Trees size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Carso</h3><p className="text-sm text-muted-foreground">Ambiente unico, doline, grotte, vista mare da quote basse.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Bora</h3><p className="text-sm text-muted-foreground">Vento triestino fortissimo. Verifica meteo, cane sensibile soffre.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per i sentieri friulani</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Sentiero Rilke</p><p className="text-sm text-muted-foreground">Carso, panoramico sul Golfo di Trieste. Facile, accessibile, tutto l'anno.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Confini</p><p className="text-sm text-muted-foreground">Sentieri attraversano Slovenia/Austria. Microchip e passaporto sempre aggiornati.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Stagione</p><p className="text-sm text-muted-foreground">Giugno-settembre per alta quota. Carso tutto l'anno.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Bora</p><p className="text-sm text-muted-foreground">Vento gelido fino a 200 km/h in inverno. Mai sui crinali con bora forte.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Trieste, Udine, Pordenone hanno cliniche h24. Montagna: kit pronto soccorso.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">I migliori sentieri verificati in Friuli-Venezia Giulia</h2>
            <div className="space-y-6">
              {sentieri.length > 0 ? (sentieri.map((s) => (<Link key={s.slug} href={`/sentieri/${slugifyRegioneS(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.difficolta} · {s.lunghezzaKm} km</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di piu' →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessun sentiero verificato al momento in Friuli-Venezia Giulia.</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutti i sentieri in Friuli-Venezia Giulia</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Sentieri dog-friendly verificati con difficolta, lunghezza e indicazioni pratiche.</p>
            <Link href="/sentieri/friuli-venezia-giulia" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutti i sentieri →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Sentieri", url: "/sentieri" }, { name: "Friuli-Venezia Giulia", url: "/sentieri/friuli-venezia-giulia" }, { name: "Guida", url: "/sentieri/friuli-venezia-giulia/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Sentieri per Cani in Friuli-Venezia Giulia 2026", descrizione: "I migliori sentieri dog-friendly in Friuli-Venezia Giulia. Alpi Giulie, Carso, Dolomiti Friulane.", slug: "friuli-sentieri-guida", regione: "Friuli-Venezia Giulia", img: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
