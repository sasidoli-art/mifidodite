import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Liguria 2026 — Riviera Ligure Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Liguria. Cinque Terre, Sanremo, Bordighera, Riviera di Ponente e Levante. Ordinanze comunali 2026, ciottoli vs sabbia, consigli pratici.",
  keywords: ["spiagge cani liguria", "cinque terre cani", "sanremo cani spiaggia", "riviera ligure pet friendly"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/liguria/guida" },
  openGraph: {
    type: "article",
    title: "Spiagge per Cani in Liguria 2026",
    url: "https://www.mifidodite.eu/spiagge/liguria/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function LiguriaSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Liguria").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Spiagge Liguria" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Liguria", url: "/spiagge/liguria" }, { name: "Guida", url: "/spiagge/liguria/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Liguria</h1>
              <p className="text-lg text-white/80 max-w-2xl">Riviera di Ponente e Levante, Cinque Terre, Portofino. Coste a ciottoli, calette nascoste e qualche tratto sabbioso a Bordighera e Spotorno.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Liguria: ciottoli, calette e ordinanze restrittive</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Liguria è curva: 330 km di costa stretta tra monti e mare. La maggior parte delle spiagge è a ciottoli (Levante: Sestri Levante, Cinque Terre, Levanto), con qualche tratto di sabbia a Ponente (Bordighera, Spotorno, Albisola, Loano). Le ordinanze comunali sono fra le più restrittive d'Italia: molti Comuni limitano l'accesso ai cani durante le ore centrali della giornata in alta stagione (15 giugno - 15 settembre). La regola standard è "ammessi prima delle 9 e dopo le 19", con eccezioni per spiagge dedicate.</p>
              <p>Spiagge cane-friendly accertate: <strong>Sanremo</strong> (zona Tre Ponti, ammessi tutto il giorno), <strong>Albenga</strong> (spiaggia libera est), <strong>Levanto</strong> (zona pinete a est), <strong>Bonassola</strong> (frazione cane-friendly). I ciottoli sono un vantaggio per i cani: meno polpastrelli ustionati rispetto alla sabbia rovente. Lo svantaggio è camminarci a piedi nudi.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Waves size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Acque pulite</h3>
              <p className="text-sm text-muted-foreground">Mare cristallino soprattutto in Levante. Bandiera Blu in molte località.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <AlertTriangle size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Ordinanze rigide</h3>
              <p className="text-sm text-muted-foreground">Verifica sempre prima: molti Comuni limitano accesso in alta stagione tra 9 e 19.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Sun size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Stagionalità</h3>
              <p className="text-sm text-muted-foreground">Maggio-giugno e settembre i mesi migliori. Inverno mite, accessi liberi.</p>
            </div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge liguri</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Verifica ordinanze</p><p className="text-sm text-muted-foreground">Ogni Comune emana la sua ad aprile. Chiama l'URP o controlla il sito comunale.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Ciottoli e zampe</p><p className="text-sm text-muted-foreground">Ciottoli grandi possono ferire i polpastrelli su lunghe percorrenze. Verifica zampe dopo la giornata.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Cinque Terre</p><p className="text-sm text-muted-foreground">Spiagge piccole e affollate. Levante meno affollato (Bonassola, Framura, Deiva).</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Treno regionale</p><p className="text-sm text-muted-foreground">Cane gratis al guinzaglio. Utile per evitare parcheggi limitati lungo la costa.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Acqua dolce</p><p className="text-sm text-muted-foreground">Porta sempre 1-2 litri. Fontanelle pubbliche non sempre presenti in spiaggia libera.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Liguria</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (
                spiagge.map((s) => (
                  <Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}>
                    <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
                      <div className="grid sm:grid-cols-3 gap-0">
                        <div className="h-48 sm:h-auto overflow-hidden">
                          <img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="col-span-2 p-6 flex flex-col justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p>
                            <p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p>
                          </div>
                          <div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Liguria. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Liguria</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/liguria" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Liguria →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Liguria", url: "/spiagge/liguria" }, { name: "Guida", url: "/spiagge/liguria/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Liguria 2026", descrizione: "Le migliori spiagge dog-friendly in Liguria. Cinque Terre, Sanremo, Bordighera, Riviera di Ponente e Levante. Ordinanze comunali 2026.", slug: "liguria-spiagge-guida", regione: "Liguria", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
