import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani nel Lazio 2026 — Sabaudia, Sperlonga, Ostia Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly nel Lazio. Sabaudia, Sperlonga, Lido di Ostia, Circeo. Ordinanze comunali 2026, accessi nei parchi nazionali e Bau Beach.",
  keywords: ["spiagge cani lazio", "sabaudia cani", "sperlonga pet friendly", "lido ostia cani"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/lazio/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani nel Lazio 2026", url: "https://www.mifidodite.eu/spiagge/lazio/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function LazioSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Lazio").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80" alt="Spiagge Lazio" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Lazio", url: "/spiagge/lazio" }, { name: "Guida", url: "/spiagge/lazio/guida" }]} /></div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani nel Lazio</h1>
              <p className="text-lg text-white/80 max-w-2xl">Sabaudia, Sperlonga, Lido di Ostia, Circeo. Dune intatte del Parco Nazionale, spiagge cittadine accessibili da Roma in treno, scogliere e calette nascoste a sud.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Lazio: 300 km di costa tra Roma e Campania</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La costa laziale è varia. Sopra Roma (<strong>Civitavecchia, Santa Marinella, Ladispoli</strong>): spiagge attrezzate e libere accessibili in treno regionale. Sotto Roma (<strong>Lido di Ostia, Torvaianica, Anzio</strong>): la spiaggia dei romani, attrezzata ma meno turistica nei mesi non estivi. <strong>Sabaudia e San Felice Circeo</strong>: dune del Parco Nazionale, ordinanze restrittive ma zone permesse esistenti. <strong>Sperlonga, Gaeta, Formia, Scauri</strong>: a sud, spiagge più tranquille, calette nascoste, mare cristallino.</p>
              <p>Spiagge dog-friendly accertate: <strong>Lido di Ostia</strong> (zona Cancello 7-8 attrezzata), <strong>Torvaianica</strong> (Bau Beach), <strong>Fregene</strong> (zona dedicata), <strong>Tarquinia Lido</strong> (Bau Beach), <strong>Sperlonga</strong> (spiaggia di Levante). Il Parco del Circeo vieta cani sulla spiaggia centrale di Sabaudia; permessi nella zona nord e sud del parco. Verifica sempre l'ordinanza comunale prima di partire.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Treno da Roma</h3><p className="text-sm text-muted-foreground">Ostia, Ladispoli, Santa Marinella: 30-60 min da Roma. Cane gratis su FL5 e Roma-Lido.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Circeo restrittivo</h3><p className="text-sm text-muted-foreground">Sabaudia parco: cani vietati in molti tratti. Zone permesse esistono, ma vanno cercate.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><Sun size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Costa sud</h3><p className="text-sm text-muted-foreground">Sperlonga, Gaeta, Scauri: tranquille, meno affollate, ottime per cani sensibili al rumore.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge del Lazio</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Treno regionale</p><p className="text-sm text-muted-foreground">Cane al guinzaglio gratis fino a 8kg. Sopra, biglietto ridotto. Roma-Lido (Ostia) sempre gratis.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Circeo</p><p className="text-sm text-muted-foreground">Centro di Sabaudia: cani vietati. Zona Torre Paola e Punta Rossa: permessi al guinzaglio.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Sabbia rovente</p><p className="text-sm text-muted-foreground">Estate laziale brutale: spiagge attive prima delle 9 e dopo le 18. Test mano sulla sabbia per 5 sec.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Auto a Roma</p><p className="text-sm text-muted-foreground">Mai lasciare il cane in auto al sole. Multe fino a 10.000€ (art. 727 c.p.).</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Roma ha ospedali h24 (UVET Roma Sud, Veterinaria Aurelia). Costa: Ostia, Anzio, Latina cliniche serali.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate nel Lazio</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (
                <Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}>
                  <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
                    <div className="grid sm:grid-cols-3 gap-0">
                      <div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>
                      <div className="col-span-2 p-6 flex flex-col justify-between">
                        <div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div>
                        <div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento nel Lazio. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge nel Lazio</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/lazio" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge nel Lazio →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Lazio", url: "/spiagge/lazio" }, { name: "Guida", url: "/spiagge/lazio/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani nel Lazio 2026", descrizione: "Le migliori spiagge dog-friendly nel Lazio. Sabaudia, Sperlonga, Lido di Ostia, Circeo.", slug: "lazio-spiagge-guida", regione: "Lazio", img: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
