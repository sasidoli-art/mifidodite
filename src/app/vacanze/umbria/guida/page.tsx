import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Church, Wine, Mountain } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Umbria 2026 — Hotel Pet-Friendly Perugia, Assisi | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Umbria. Hotel e B&B pet-friendly a Perugia, Assisi, Terni. Medioevo, arte e natura con il tuo cane.",
  keywords: ["vacanze cani umbria", "hotel pet friendly perugia", "vacanze cani assisi"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/umbria/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Umbria 2026",
    url: "https://www.mifidodite.eu/vacanze/umbria/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function UmbriaGuida() {
  const umbriaStructures = VACANZE_SEED.filter(s => s.regione === "Umbria").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80" alt="Umbria" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Umbria", url: "/vacanze/umbria" }, { name: "Guida", url: "/vacanze/umbria/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Umbria</h1>
              <p className="text-lg text-white/80 max-w-2xl">Perugia, Assisi, Terni. L'Umbria è cuore verde d'Italia: arte medievale, colline, natura selvaggia. Perfetta per vacanze tranquille con il cane.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Umbria: arte, colline e silenzio con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>L'Umbria non ha mare, ma ha qualcosa di raro: silenzio. Città d'arte: Assisi (Basilica San Francesco), Perugia (centro medievale), Orvieto (Duomo gotico). Cani al guinzaglio sono benvenuti negli spazi pubblici. Campagna verdissima: colline, vigneti, olive. Agriturismo sono comuni, cani sempre benvenuti. La cucina è semplice e sana: tartufi, salumi, olio.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Church size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Spiritualità e arte</h3>
              <p className="text-sm text-muted-foreground">Assisi, Orvieto, Perugia: città d'arte medioevale. Cani al guinzaglio ovunque.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Mountain size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Colline verdi</h3>
              <p className="text-sm text-muted-foreground">Paesaggio ondulato, sentieri, tranquillità. Perfetto per passeggiate lunghe.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Wine size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Vini e tartufi</h3>
              <p className="text-sm text-muted-foreground">Prodotti locali, agriturismo, ristorazione di qualità.</p>
            </div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per il Lazio</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Documenti</p><p className="text-sm text-muted-foreground">Microchip, passaporto, rabbia aggiornata.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Stagione</p><p className="text-sm text-muted-foreground">Primavera/autunno ideali. Estate calda.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Auto</p><p className="text-sm text-muted-foreground">Consigliata. Non lasciare cane in auto al sole.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Ristoranti</p><p className="text-sm text-muted-foreground">Tavoli esterni accettano cani. Agriturismo always.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Antiparassitari</p><p className="text-sm text-muted-foreground">Pulci e zecche comuni in campagna.</p></div>
              </li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Umbria</h2>
            <div className="space-y-6">
              {umbriaStructures.length > 0 ? (
                umbriaStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/umbria/${s.slug}`}>
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
              ) : (
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Umbria. Torna presto!</p>
              )}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Umbria</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Strutture pet-friendly verificate. Hotel e agriturismi in Umbria.</p>
            <Link href="/vacanze/umbria" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Umbria →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Vacanze", url: "/vacanze" }, { name: "Umbria", url: "/vacanze/umbria" }, { name: "Guida", url: "/vacanze/umbria/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Vacanze con il Cane in Umbria 2026", descrizione: "Scopri le migliori vacanze con il cane in Umbria. Hotel e B&B pet-friendly a Perugia, Assisi, Terni. Medioevo, arte e natura con il tuo cane.", slug: "umbria-guida", regione: "Umbria", img: "https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
