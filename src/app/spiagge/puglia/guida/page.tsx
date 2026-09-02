import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Puglia 2026 — Salento, Polignano, Tremiti Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Puglia. Salento sabbia bianca, Polignano scogliere, Gargano e Tremiti. Ordinanze comunali 2026 e Bau Beach del Salento.",
  keywords: ["spiagge cani puglia", "salento cani", "polignano pet friendly", "tremiti cani", "gargano cani"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/puglia/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani in Puglia 2026", url: "https://www.mifidodite.eu/spiagge/puglia/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function PugliaSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Puglia").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80" alt="Spiagge Puglia" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Puglia", url: "/spiagge/puglia" }, { name: "Guida", url: "/spiagge/puglia/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Puglia</h1><p className="text-lg text-white/80 max-w-2xl">Salento sabbia bianca, Polignano scogli mozzafiato, Gargano selvaggio, Isole Tremiti. 800 km di costa: la regione con più varietà di spiagge dog-friendly d'Italia.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Puglia: 800 km di costa per ogni tipo di vacanza</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Puglia è enorme per il viaggiatore con cane. <strong>Gargano</strong> (Vieste, Peschici, Mattinata): scogliere bianche, baie chiuse, faraglioni. Cani ammessi nella maggior parte delle spiagge libere. <strong>Adriatico centrale</strong> (Polignano a Mare, Monopoli, Brindisi): scogliere e calette, alcune Bau Beach. <strong>Salento</strong> (Otranto, Santa Maria di Leuca, Gallipoli, Porto Cesareo): sabbia caraibica, mare turchese, le Bau Beach più organizzate del Sud Italia. <strong>Ionio</strong> (Taranto, Castellaneta Marina): sabbia dorata, pinete a ridosso, spiagge generose.</p>
              <p>Spiagge cane-friendly accertate: <strong>Pescoluse Salento</strong> ("Maldive del Salento", zona libera), <strong>Porto Cesareo</strong> (Bau Beach), <strong>Vieste</strong> (Pizzomunno zona est), <strong>Polignano</strong> (Cala Paura), <strong>Otranto</strong> (Baia dei Turchi nord), <strong>Castellaneta Marina</strong> (Bau Beach). Tremiti: traghetti accettano cani, alcune calette accessibili in barca permettono cani liberi.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Salento turchese</h3><p className="text-sm text-muted-foreground">Pescoluse, Porto Cesareo, Otranto. Sabbia bianca, mare caraibico, Bau Beach.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Gargano selvaggio</h3><p className="text-sm text-muted-foreground">Vieste, Peschici, Mattinata. Falesie bianche, baie chiuse, pinete d'Aleppo.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Caldo estremo</h3><p className="text-sm text-muted-foreground">Salento luglio-agosto 38°C. Sabbia rovente. Mai uscire tra 11 e 17.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge pugliesi</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Bau Beach</p><p className="text-sm text-muted-foreground">Salento ne ha 10+ stabilimenti. Prenota entro maggio per agosto.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Gargano libero</p><p className="text-sm text-muted-foreground">Peschici-Vieste: spiagge libere immense. Cane libero possibile dove non c'è folla.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Tremiti</p><p className="text-sm text-muted-foreground">Traghetti da Termoli/Vasto accettano cani. Hotel sull'isola: verifica policy prima.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Salento</p><p className="text-sm text-muted-foreground">Auto necessaria. Coste lunghe, spiagge non collegate da bus.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Bari, Lecce, Brindisi, Taranto hanno cliniche h24. Salento minore: servizi limitati.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Puglia</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (<Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Puglia. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Puglia</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/puglia" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Puglia →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Puglia", url: "/spiagge/puglia" }, { name: "Guida", url: "/spiagge/puglia/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Puglia 2026", descrizione: "Le migliori spiagge dog-friendly in Puglia. Salento sabbia bianca, Polignano scogliere, Gargano e Tremiti.", slug: "puglia-spiagge-guida", regione: "Puglia", img: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
