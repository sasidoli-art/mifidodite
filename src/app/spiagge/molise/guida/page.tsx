import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Molise 2026 — Termoli, Costa Adriatica Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Molise. Termoli, Petacciato, Campomarino, Marina di Montenero. Ordinanze 2026 e costa Adriatica meno conosciuta.",
  keywords: ["spiagge cani molise", "termoli cani", "costa adriatica molise", "petacciato pet friendly"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/molise/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani in Molise 2026", url: "https://www.mifidodite.eu/spiagge/molise/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function MoliseSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Molise").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Spiagge Molise" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Molise", url: "/spiagge/molise" }, { name: "Guida", url: "/spiagge/molise/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Molise</h1><p className="text-lg text-white/80 max-w-2xl">Termoli e 35 km di costa Adriatica meno conosciuta. Spiagge pulite, sabbia dorata, ordinanze permissive e turismo di massa quasi assente.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Molise: il segreto della costa Adriatica</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Il Molise ha solo 35 km di costa, ma di qualità. <strong>Termoli</strong>: borgo antico sul mare, spiagge attrezzate e libere, porto da cui partono i traghetti per le Tremiti. <strong>Costa nord</strong> (Petacciato, Montenero di Bisaccia): spiagge libere ampie, sabbia dorata, dune protette. <strong>Costa sud</strong> (Campomarino, Marina di Termoli): più attrezzata ma comunque tranquilla. Le ordinanze comunali sono permissive: cani al guinzaglio quasi ovunque, alcune Bau Beach in via di sviluppo.</p>
              <p>Spiagge cane-friendly accertate: <strong>Petacciato Marina</strong>, <strong>Campomarino Lido</strong>, <strong>Termoli Sant'Antonio</strong>, <strong>Montenero di Bisaccia</strong>. La piccolezza della costa è un vantaggio: in mezza giornata si esplora tutto. Le Isole Tremiti (a 40 min di traghetto da Termoli) accettano cani sulle imbarcazioni; calette accessibili in barca permettono cani liberi.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Costa intatta</h3><p className="text-sm text-muted-foreground">35 km poco affollati. Sabbia dorata, dune protette, atmosfera tranquilla.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Termoli porto</h3><p className="text-sm text-muted-foreground">Borgo antico, spiagge attigue, base per Tremiti. Cani benvenuti.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Servizi minimi</h3><p className="text-sm text-muted-foreground">Pochi stabilimenti dedicati. Vantaggio: poco affollato anche a Ferragosto.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge molisane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Come arrivare</p><p className="text-sm text-muted-foreground">Treno Trenitalia Adriatica ferma a Termoli. Auto necessaria per le spiagge minori.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Tremiti</p><p className="text-sm text-muted-foreground">Traghetti Tirrenia/Navlib da Termoli accettano cani al guinzaglio.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Stagione</p><p className="text-sm text-muted-foreground">Maggio-giugno e settembre: mare già caldo, niente folla. Inverno mite.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Combinare con montagna</p><p className="text-sm text-muted-foreground">In 1h di auto sei in Appennino (Campitello Matese): pause fresche d'estate.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Termoli e Campobasso hanno cliniche. Costa: kit pronto soccorso utile la sera.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Molise</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (<Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Molise. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Molise</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/molise" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Molise →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Molise", url: "/spiagge/molise" }, { name: "Guida", url: "/spiagge/molise/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Molise 2026", descrizione: "Le migliori spiagge dog-friendly in Molise. Termoli, Petacciato, Campomarino, Marina di Montenero.", slug: "molise-spiagge-guida", regione: "Molise", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
