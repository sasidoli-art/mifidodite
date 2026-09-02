import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Abruzzo 2026 — Costa Trabocchi, Pescara, Vasto Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Abruzzo. Costa dei Trabocchi, Pescara, Vasto, Riccio. Ordinanze comunali 2026 e Bau Beach abruzzesi.",
  keywords: ["spiagge cani abruzzo", "pescara cani", "costa trabocchi pet friendly", "vasto cani"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/abruzzo/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani in Abruzzo 2026", url: "https://www.mifidodite.eu/spiagge/abruzzo/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function AbruzzoSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Abruzzo").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Spiagge Abruzzo" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Abruzzo", url: "/spiagge/abruzzo" }, { name: "Guida", url: "/spiagge/abruzzo/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Abruzzo</h1><p className="text-lg text-white/80 max-w-2xl">130 km di costa Adriatica: a nord sabbia fine (Pescara, Roseto), a sud la Costa dei Trabocchi con scogli e calette. Spiagge libere generose e Bau Beach in espansione.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Abruzzo: due coste in una</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>L'Abruzzo ha 130 km di costa con personalità distinte. <strong>Nord</strong> (Martinsicuro, Alba Adriatica, Tortoreto, Giulianova, Roseto, Pineto): sabbia chiara, lunghi rettilinei, pinete, spiagge libere ampie e numerosi stabilimenti pet-friendly. <strong>Pescara</strong>: spiaggia cittadina, attrezzata, accessibile. <strong>Sud</strong> (Costa dei Trabocchi: Francavilla, Ortona, San Vito Chietino, Fossacesia, Vasto, San Salvo): scogli, ciottoli, calette spettacolari, vista trabocchi (palafitte da pesca). Le ordinanze comunali sono in larga maggioranza permissive.</p>
              <p>Spiagge cane-friendly accertate: <strong>Pineto Bau Beach Village</strong>, <strong>Martinsicuro Bau Beach</strong>, <strong>Roseto Lido</strong>, <strong>Pescara Pineta</strong> (zona libera nord), <strong>Vasto Marina</strong>, <strong>Lido Riccio Ortona</strong> (Bau Beach). La Costa dei Trabocchi ha anche la pista ciclabile "Via Verde" lunga 42 km dove i cani sono i benvenuti.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Costa dei Trabocchi</h3><p className="text-sm text-muted-foreground">Scogli, calette, trabocchi storici. Via Verde ciclabile 42 km cane-friendly.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Nord sabbia</h3><p className="text-sm text-muted-foreground">Roseto, Alba Adriatica, Tortoreto: sabbia chiara, lunghi rettilinei, Bau Beach.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Pescara città</h3><p className="text-sm text-muted-foreground">Spiaggia urbana attrezzata. Cani al guinzaglio in zone dedicate. Verifica ordinanza.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge abruzzesi</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Via Verde Trabocchi</p><p className="text-sm text-muted-foreground">42 km ciclabile costiera. Cani al guinzaglio. Bici a noleggio nelle stazioni FS.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Treno</p><p className="text-sm text-muted-foreground">Trenitalia Adriatica ferma in ogni cittadina costiera. Cani gratis al guinzaglio.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Combinare con Gran Sasso</p><p className="text-sm text-muted-foreground">In 1h sei in Gran Sasso (2.000m): mare al mattino, montagna al pomeriggio.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Bau Beach</p><p className="text-sm text-muted-foreground">In aumento. Pineto e Martinsicuro le più note. Prenota entro maggio.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Pescara, Teramo, Chieti, L'Aquila hanno cliniche h24. Costa: servizi buoni.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Abruzzo</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (<Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Abruzzo. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Abruzzo</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/abruzzo" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Abruzzo →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Abruzzo", url: "/spiagge/abruzzo" }, { name: "Guida", url: "/spiagge/abruzzo/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Abruzzo 2026", descrizione: "Le migliori spiagge dog-friendly in Abruzzo. Costa dei Trabocchi, Pescara, Vasto, Riccio.", slug: "abruzzo-spiagge-guida", regione: "Abruzzo", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
