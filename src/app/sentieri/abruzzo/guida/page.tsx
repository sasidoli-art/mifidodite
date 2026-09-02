import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Trees, AlertTriangle } from "lucide-react";
import { SENTIERI_SEED, slugifyRegioneS } from "@/lib/sentieri-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Sentieri per Cani in Abruzzo 2026 — Gran Sasso, Majella, Sirente | MifidoDiTe.eu",
  description: "I migliori sentieri dog-friendly in Abruzzo. Gran Sasso, Majella, Sirente-Velino, Parco Abruzzo. Sentieri segnati per ogni livello con il cane.",
  keywords: ["sentieri cani abruzzo", "gran sasso cani", "majella pet friendly", "parco abruzzo cani"],
  alternates: { canonical: "https://www.mifidodite.eu/sentieri/abruzzo/guida" },
  openGraph: { type: "article", title: "Sentieri per Cani in Abruzzo 2026", url: "https://www.mifidodite.eu/sentieri/abruzzo/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function AbruzzoSentieriGuida() {
  const sentieri = SENTIERI_SEED.filter(s => s.regione === "Abruzzo").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Sentieri Abruzzo" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Sentieri", url: "/sentieri" }, { name: "Abruzzo", url: "/sentieri/abruzzo" }, { name: "Guida", url: "/sentieri/abruzzo/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Sentieri per Cani in Abruzzo</h1><p className="text-lg text-white/80 max-w-2xl">Gran Sasso, Majella, Sirente-Velino, Parco Nazionale d'Abruzzo. La regione piu' verde d'Italia: 3 parchi nazionali, 1 regionale, sentieri segnati ovunque.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Abruzzo: 3 parchi nazionali, escursionismo eccellente</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>L'Abruzzo e' la regione con la concentrazione di parchi nazionali piu' alta d'Italia. <strong>Gran Sasso e Monti della Laga</strong>: parco nazionale, Corno Grande (2.912m), Campo Imperatore. <strong>Majella</strong>: parco nazionale UNESCO, sentieri impegnativi. <strong>Parco Nazionale d'Abruzzo, Lazio e Molise</strong>: il piu' antico parco italiano, orsi marsicani, sentieri segnati. <strong>Sirente-Velino</strong>: parco regionale, Sentiero del Cuore (Scanno). Cani al guinzaglio obbligatorio in tutti i parchi, sempre.</p>
              <p>Sentieri dog-friendly accertati: <strong>Sentiero del Cuore Scanno</strong>, <strong>Campo Imperatore</strong>, <strong>Sentiero Italia Majella</strong>, <strong>Pacentro borgo-sentieri</strong>, <strong>Lago di Scanno</strong>. Per Corno Grande necessario alpinismo, non escursione classica.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Mountain size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Gran Sasso</h3><p className="text-sm text-muted-foreground">Campo Imperatore, Corno Grande. Ambiente alpino del centro Italia.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Trees size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Parco Nazionale</h3><p className="text-sm text-muted-foreground">Il piu' antico d'Italia. Orsi marsicani, lupi, camosci. Cane al guinzaglio.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Fauna grande</h3><p className="text-sm text-muted-foreground">Orsi, lupi, cinghiali. Cane al guinzaglio, distanza dalla fauna.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per i sentieri abruzzesi</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Campo Imperatore</p><p className="text-sm text-muted-foreground">Funivia dal Brecciaiola accetta cani con museruola.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Orsi marsicani</p><p className="text-sm text-muted-foreground">Parco Nazionale: rari, non pericolosi. Cane al guinzaglio assolutamente.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Stagione</p><p className="text-sm text-muted-foreground">Giugno-settembre per alta quota. Aprile-maggio per Maiella inferiore.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Mare + montagna</p><p className="text-sm text-muted-foreground">Costa Adriatica in 1h. Mattina spiagge, pomeriggio sentieri in quota.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">L'Aquila, Pescara, Teramo, Chieti hanno cliniche h24.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">I migliori sentieri verificati in Abruzzo</h2>
            <div className="space-y-6">
              {sentieri.length > 0 ? (sentieri.map((s) => (<Link key={s.slug} href={`/sentieri/${slugifyRegioneS(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.difficolta} · {s.lunghezzaKm} km</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di piu' →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessun sentiero verificato al momento in Abruzzo.</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutti i sentieri in Abruzzo</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Sentieri dog-friendly verificati con difficolta, lunghezza e indicazioni pratiche.</p>
            <Link href="/sentieri/abruzzo" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutti i sentieri →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Sentieri", url: "/sentieri" }, { name: "Abruzzo", url: "/sentieri/abruzzo" }, { name: "Guida", url: "/sentieri/abruzzo/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Sentieri per Cani in Abruzzo 2026", descrizione: "I migliori sentieri dog-friendly in Abruzzo. Gran Sasso, Majella, Sirente, Parco Abruzzo.", slug: "abruzzo-sentieri-guida", regione: "Abruzzo", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
