import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Friuli-Venezia Giulia 2026 — Grado, Lignano, Trieste | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Friuli-Venezia Giulia. Grado, Lignano Sabbiadoro, Trieste Barcola. Ordinanze 2026 e Bau Beach friulane.",
  keywords: ["spiagge cani friuli", "grado pet friendly", "lignano cani", "trieste barcola"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/friuli-venezia-giulia/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani in Friuli-Venezia Giulia 2026", url: "https://www.mifidodite.eu/spiagge/friuli-venezia-giulia/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function FriuliSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Friuli-Venezia Giulia").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80" alt="Spiagge Friuli-Venezia Giulia" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Friuli-Venezia Giulia", url: "/spiagge/friuli-venezia-giulia" }, { name: "Guida", url: "/spiagge/friuli-venezia-giulia/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Friuli-Venezia Giulia</h1><p className="text-lg text-white/80 max-w-2xl">Grado, Lignano Sabbiadoro, Trieste Barcola. 110 km di costa Adriatica con sabbia dorata, lagune e la peculiare costa carsica triestina.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Friuli-Venezia Giulia: dal Tagliamento al Carso</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La costa friulana ha tre identità. <strong>Lignano Sabbiadoro</strong>: 8 km di spiaggia dorata, organizzata, con stabilimenti dog-friendly numerosi. <strong>Grado</strong>: "isola del sole", spiaggia sud rivolta a sud (unica caratteristica), Bau Beach storiche, atmosfera mitteleuropea. <strong>Trieste Barcola</strong>: spiaggia urbana cittadina, sabbia mista a ciottoli, vista golfo, Bagno comunale storico ammette cani in zone specifiche. Le ordinanze friulane sono in genere chiare e ben rispettate, cani al guinzaglio in larga maggioranza degli accessi.</p>
              <p>Spiagge cane-friendly accertate: <strong>Lignano Bau Beach</strong>, <strong>Grado spiaggia est</strong>, <strong>Marano Lagunare</strong> (laguna meno turistica), <strong>Trieste Pedocin zona dedicata</strong>. La laguna di Marano e Grado offre giri in barca dove i cani sono ammessi, con calette accessibili solo via mare.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Lignano organizzata</h3><p className="text-sm text-muted-foreground">8 km sabbia dorata, Bau Beach numerose, atmosfera austro-tedesca.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Grado sud</h3><p className="text-sm text-muted-foreground">"Isola del sole": unica spiaggia italiana rivolta a sud. Più ore di luce.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Bora</h3><p className="text-sm text-muted-foreground">Vento forte tipico triestino. Cani sensibili meglio in calma. Verifica meteo.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge friulane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Bau Beach</p><p className="text-sm text-muted-foreground">Lignano e Grado: stabilimenti dedicati con prenotazione online. Standard alti.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Laguna Marano</p><p className="text-sm text-muted-foreground">Tour in barca con cani al guinzaglio. Calette appartate accessibili solo via mare.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Trieste città</p><p className="text-sm text-muted-foreground">Pedocin storico bagno separato uomini/donne. Verifica accesso cani in zona specifica.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Stagione</p><p className="text-sm text-muted-foreground">Giugno e settembre ottimi: mare già caldo, niente folla, atmosfera rilassata.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Trieste, Udine, Gorizia hanno cliniche h24. Costa: servizi eccellenti.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Friuli-Venezia Giulia</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (<Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Friuli-Venezia Giulia. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Friuli-Venezia Giulia</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/friuli-venezia-giulia" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Friuli-Venezia Giulia →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Friuli-Venezia Giulia", url: "/spiagge/friuli-venezia-giulia" }, { name: "Guida", url: "/spiagge/friuli-venezia-giulia/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Friuli-Venezia Giulia 2026", descrizione: "Le migliori spiagge dog-friendly in Friuli-Venezia Giulia. Grado, Lignano Sabbiadoro, Trieste Barcola.", slug: "friuli-spiagge-guida", regione: "Friuli-Venezia Giulia", img: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
