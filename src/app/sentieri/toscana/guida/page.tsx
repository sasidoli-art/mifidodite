import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Trees, AlertTriangle } from "lucide-react";
import { SENTIERI_SEED, slugifyRegioneS } from "@/lib/sentieri-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Sentieri per Cani in Toscana 2026 — Appennino, Maremma, Apuane | MifidoDiTe.eu",
  description: "I migliori sentieri dog-friendly in Toscana. Appennino Tosco-Emiliano, Maremma, Alpi Apuane, Chianti. Sentieri segnati CAI per ogni livello con il cane.",
  keywords: ["sentieri cani toscana", "maremma cani", "apuane pet friendly", "chianti cani"],
  alternates: { canonical: "https://www.mifidodite.eu/sentieri/toscana/guida" },
  openGraph: { type: "article", title: "Sentieri per Cani in Toscana 2026", url: "https://www.mifidodite.eu/sentieri/toscana/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function ToscanaSentieriGuida() {
  const sentieri = SENTIERI_SEED.filter(s => s.regione === "Toscana").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80" alt="Sentieri Toscana" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Sentieri", url: "/sentieri" }, { name: "Toscana", url: "/sentieri/toscana" }, { name: "Guida", url: "/sentieri/toscana/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Sentieri per Cani in Toscana</h1><p className="text-lg text-white/80 max-w-2xl">Appennino Tosco-Emiliano, Maremma selvaggia, Alpi Apuane marmoree, Chianti UNESCO. Quattro ambienti diversi a poche ore da Firenze.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Toscana: 4 ambienti, infinite escursioni</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Toscana offre 4 ambienti escursionistici molto diversi. <strong>Appennino Tosco-Emiliano</strong>: parchi naturali (Foreste Casentinesi, Orecchiella), sentieri di media difficolta'. <strong>Maremma</strong>: parco regionale di Uccellina, dune costiere, sentieri pianeggianti. <strong>Alpi Apuane</strong>: ambiente alpino con cave di marmo, sentieri faticosi. <strong>Chianti UNESCO</strong>: colline vinicole con sentieri facili tra vigneti. Cani al guinzaglio in tutti i parchi.</p>
              <p>Sentieri dog-friendly accertati: <strong>Foreste Casentinesi</strong> (Monte Falterona), <strong>Sentiero Maremma</strong> (Uccellina), <strong>Lago di Massaciuccoli</strong>, <strong>Brunello Trail</strong> (Chianti), <strong>Garfagnana</strong>. Per Apuane, valutare difficolta' specifica del sentiero.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Mountain size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Appennino</h3><p className="text-sm text-muted-foreground">Foreste Casentinesi: parchi nazionali, ambiente boschivo fresco.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Trees size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Maremma</h3><p className="text-sm text-muted-foreground">Parco regionale: ambiente costiero selvaggio, pianeggiante.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Forasacchi</h3><p className="text-sm text-muted-foreground">Maggio-settembre. Maremma e colline: rischio massimo.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per i sentieri toscani</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Casentinesi</p><p className="text-sm text-muted-foreground">Foreste fitte, fresco anche d'estate. Cinghiali e lupi presenti.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Maremma</p><p className="text-sm text-muted-foreground">Parco regionale: cane al guinzaglio. Cinghiali, daini, bovini al pascolo.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Apuane</p><p className="text-sm text-muted-foreground">Sentieri impegnativi, dislivelli importanti. Cane sportivo necessario.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Forasacchi</p><p className="text-sm text-muted-foreground">Controlla orecchie, occhi, zampe dopo ogni passeggiata maggio-settembre.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Firenze, Pisa, Grosseto, Siena, Arezzo hanno cliniche h24.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">I migliori sentieri verificati in Toscana</h2>
            <div className="space-y-6">
              {sentieri.length > 0 ? (sentieri.map((s) => (<Link key={s.slug} href={`/sentieri/${slugifyRegioneS(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.difficolta} · {s.lunghezzaKm} km</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di piu' →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessun sentiero verificato al momento in Toscana.</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutti i sentieri in Toscana</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Sentieri dog-friendly verificati con difficolta, lunghezza e indicazioni pratiche.</p>
            <Link href="/sentieri/toscana" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutti i sentieri →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Sentieri", url: "/sentieri" }, { name: "Toscana", url: "/sentieri/toscana" }, { name: "Guida", url: "/sentieri/toscana/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Sentieri per Cani in Toscana 2026", descrizione: "I migliori sentieri dog-friendly in Toscana. Appennino, Maremma, Apuane, Chianti.", slug: "toscana-sentieri-guida", regione: "Toscana", img: "https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
