import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, Fish } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Sardegna 2026 — Hotel Pet-Friendly Cagliari, Costa Smeralda | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Sardegna. Hotel e B&B pet-friendly a Cagliari, Costa Smeralda, Alghero. Spiagge di sabbia bianca e mare cristallino con il tuo cane.",
  keywords: ["vacanze cani sardegna", "hotel pet friendly costa smeralda", "spiagge sardegna cani", "cagliari cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/sardegna/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Sardegna 2026",
    url: "https://www.mifidodite.eu/vacanze/sardegna/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function SardegnaGuida() {
  const sardegnaStructures = VACANZE_SEED.filter(s => s.regione === "Sardegna").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Sardegna" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Sardegna", url: "/vacanze/sardegna" }, { name: "Guida", url: "/vacanze/sardegna/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Sardegna</h1>
              <p className="text-lg text-white/80 max-w-2xl">Cagliari, Costa Smeralda, Alghero. Spiagge di sabbia bianca, mare cristallino e cani benvenuti. La Sardegna è il paradiso con il tuo amico a 4 zampe.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Sardegna: spiagge di sogno e mare trasparente con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Sardegna è un'isola: spiagge su spiagge, tutte diverse. Costa Smeralda è celebre, ma cerca calette nascoste intorno. Alghero offre storia, lungomare cane-friendly. Cagliari è capitale, città affacciata sul mare. Tutte le spiagge accettano cani. Sabbia bianca, acqua cristallina, scogli granitici. Vento può essere forte in estate: proteggere il cane dal sole eccessivo. Cucina sarda: pane carasau, bottarga, formaggi di pecora, vini rossi.</p>
              <p>La Sardegna attrae proprietari che cercano il paradiso. Hotel di lusso e agriturismi accolgono cani. Mare perfetto per cani che amano nuotare. Veterinari presenti nei centri principali. Quando visiti, scopri spiagge meno note: la Sardegna è vasta e generosa.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Waves size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Spiagge di sogno</h3>
              <p className="text-sm text-muted-foreground">Sabbia bianca, mare cristallino. Costa Smeralda e calette nascoste.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Sun size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Sole e trasparenza</h3>
              <p className="text-sm text-muted-foreground">200+ giorni di sole all'anno. Acqua cristallina per nuotare con il cane.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Fish size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Cucina marina</h3>
              <p className="text-sm text-muted-foreground">Bottarga, pane carasau, formaggi di pecora, vini sardi.</p>
            </div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per la Sardegna</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Clima</p><p className="text-sm text-muted-foreground">Aprile-maggio, settembre-ottobre ideali. Estate molto calda, sole forte su spiagge.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Come arrivare</p><p className="text-sm text-muted-foreground">Aeroporti: Cagliari, Alghero, Olbia. Traghetti da Civitavecchia e Genova (auto benvenute).</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Spiagge cane-friendly</p><p className="text-sm text-muted-foreground">Tutte le spiagge pubbliche accettano cani. Scopri anche calette private.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Cagliari, Olbia, Alghero hanno cliniche. Centri minori hanno servizi.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Protezione solare</p><p className="text-sm text-muted-foreground">Sole intense. Proteggere il cane, portare acqua fresca sempre.</p></div>
              </li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Sardegna</h2>
            <div className="space-y-6">
              {sardegnaStructures.length > 0 ? (
                sardegnaStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/sardegna/${s.slug}`}>
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
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Sardegna. Torna presto!</p>
              )}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Sardegna</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Strutture pet-friendly verificate. Hotel, B&B e agriturismi in Sardegna.</p>
            <Link href="/vacanze/sardegna" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Sardegna →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Vacanze", url: "/vacanze" }, { name: "Sardegna", url: "/vacanze/sardegna" }, { name: "Guida", url: "/vacanze/sardegna/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Vacanze con il Cane in Sardegna 2026", descrizione: "Scopri le migliori vacanze con il cane in Sardegna. Hotel e B&B pet-friendly a Cagliari, Costa Smeralda, Alghero. Spiagge di sabbia bianca e mare cristallino con il tuo cane.", slug: "sardegna-guida", regione: "Sardegna", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
