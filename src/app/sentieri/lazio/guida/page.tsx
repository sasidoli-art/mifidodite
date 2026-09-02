import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Trees, AlertTriangle } from "lucide-react";
import { SENTIERI_SEED, slugifyRegioneS } from "@/lib/sentieri-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Sentieri per Cani nel Lazio 2026 — Simbruini, Circeo, Castelli Romani | MifidoDiTe.eu",
  description: "I migliori sentieri dog-friendly nel Lazio. Monti Simbruini, Parco del Circeo, Castelli Romani, Monti della Tolfa. Sentieri segnati con il cane vicino a Roma.",
  keywords: ["sentieri cani lazio", "circeo cani", "castelli romani pet friendly", "simbruini cani"],
  alternates: { canonical: "https://www.mifidodite.eu/sentieri/lazio/guida" },
  openGraph: { type: "article", title: "Sentieri per Cani nel Lazio 2026", url: "https://www.mifidodite.eu/sentieri/lazio/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function LazioSentieriGuida() {
  const sentieri = SENTIERI_SEED.filter(s => s.regione === "Lazio").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80" alt="Sentieri Lazio" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Sentieri", url: "/sentieri" }, { name: "Lazio", url: "/sentieri/lazio" }, { name: "Guida", url: "/sentieri/lazio/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Sentieri per Cani nel Lazio</h1><p className="text-lg text-white/80 max-w-2xl">Monti Simbruini, Circeo, Castelli Romani, Aurunci, Monti della Tolfa. Sentieri accessibili da Roma in 1-2 ore, dal mare alla montagna.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Lazio: l'escursionismo intorno a Roma</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Il Lazio offre una varieta' sorprendente di ambienti, tutti raggiungibili da Roma in tempi brevi. <strong>Monti Simbruini</strong>: parco regionale, sentieri media difficolta', faggete fitte. <strong>Castelli Romani</strong>: laghi vulcanici (Albano, Nemi) con sentieri facili. <strong>Parco del Circeo</strong>: sentieri costieri, ma cani vietati in alcune zone protette. <strong>Monti Aurunci</strong>: a sud, sentieri panoramici sul Tirreno. <strong>Monti della Tolfa</strong>: a nord, ambiente collinare-boschivo.</p>
              <p>Sentieri dog-friendly accertati: <strong>Lago di Albano</strong> (giro lacustre), <strong>Camposecco</strong> (Simbruini), <strong>Promontorio Circeo</strong> (zona libera), <strong>Monte Cairo</strong>, <strong>Subiaco-monastero San Benedetto</strong>. Circeo: cani vietati in centro parco, ammessi nelle zone nord/sud.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Mountain size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Simbruini</h3><p className="text-sm text-muted-foreground">Parco regionale, faggete, sentieri media difficolta' da Roma in 1h30m.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Trees size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Castelli Romani</h3><p className="text-sm text-muted-foreground">Laghi vulcanici, sentieri facili, ideali per famiglie.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Circeo restrittivo</h3><p className="text-sm text-muted-foreground">Cani vietati in molte zone. Verifica accessi prima.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per i sentieri laziali</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Da Roma</p><p className="text-sm text-muted-foreground">Castelli 30 min, Simbruini 1h30m, Circeo 1h, Aurunci 2h. Auto necessaria.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Estate brutale</p><p className="text-sm text-muted-foreground">Luglio-agosto: sentieri costieri impraticabili. Vai in quota o aspetta.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Vipere</p><p className="text-sm text-muted-foreground">Vipera comune in tutto il Lazio. Cane al guinzaglio, kit antivenomo.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Circeo</p><p className="text-sm text-muted-foreground">Sabaudia parco: cani vietati centro. Zone permesse: nord, sud.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Roma ospedali h24, Frosinone, Latina, Rieti, Viterbo cliniche serali.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">I migliori sentieri verificati nel Lazio</h2>
            <div className="space-y-6">
              {sentieri.length > 0 ? (sentieri.map((s) => (<Link key={s.slug} href={`/sentieri/${slugifyRegioneS(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.difficolta} · {s.lunghezzaKm} km</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di piu' →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessun sentiero verificato al momento nel Lazio.</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutti i sentieri nel Lazio</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Sentieri dog-friendly verificati con difficolta, lunghezza e indicazioni pratiche.</p>
            <Link href="/sentieri/lazio" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutti i sentieri →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Sentieri", url: "/sentieri" }, { name: "Lazio", url: "/sentieri/lazio" }, { name: "Guida", url: "/sentieri/lazio/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Sentieri per Cani nel Lazio 2026", descrizione: "I migliori sentieri dog-friendly nel Lazio. Simbruini, Circeo, Castelli Romani, Aurunci.", slug: "lazio-sentieri-guida", regione: "Lazio", img: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
