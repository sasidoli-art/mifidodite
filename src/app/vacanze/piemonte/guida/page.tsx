import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Wine, Utensils } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Piemonte 2026 — Hotel Pet-Friendly Torino, Alba, Asti | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Piemonte. Hotel pet-friendly a Torino, Alba, Asti. Vigne, montagne e cultura con il tuo cane.",
  keywords: ["vacanze cani piemonte", "hotel pet friendly torino", "langhe cani", "alba cani", "vacanze piemonte"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/piemonte/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Piemonte 2026",
    description: "Torino, Langhe, Roero. Scopri dove portare il tuo cane in Piemonte tra vigne e montagne.",
    url: "https://www.mifidodite.eu/vacanze/piemonte/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function PiemonteGuida() {
  const piemonteStructures = VACANZE_SEED.filter(s => s.regione === "Piemonte").slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Piemonte" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Piemonte", url: "/vacanze/piemonte" }, { name: "Guida", url: "/vacanze/piemonte/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Piemonte</h1>
              <p className="text-lg text-white/80 max-w-2xl">Langhe, Roero, Astigiano. Il Piemonte offre vigne straordinarie, montagne e città eleganti. Scopri vacanze indimenticabili con il tuo cane.</p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Piemonte: vigne, montagne e cultura con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Il Piemonte è una regione di raffinata eleganza e bellezza naturale. Le colline delle Langhe e del Roero, i vini Barolo e Barbera, i castelli medievali: è un paradiso per chi ama viaggiare con il cane.</p>
              <p>Gli agriturismi piemontesi sono particolarmente cane-friendly. Potrai passeggiare tra i vigneti, mangiare le specialità locali (tajarin, brasato, formaggi straordinari), e dormire in splendide cascine ristrutturate dove il tuo cane è il benvenuto.</p>
            </div>
          </section>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Mountain size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Langhe e Roero</h3>
              <p className="text-sm text-muted-foreground">Colline patrimonio UNESCO. Sentieri cane-friendly tra i vigneti più prestigiosi d'Italia.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Wine size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Vini straordinari</h3>
              <p className="text-sm text-muted-foreground">Barolo, Barbera, Nebbiolo. Degustazioni e cantine con spazi aperti per i cani.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Utensils size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Cucina piemontese</h3>
              <p className="text-sm text-muted-foreground">Tajarin, brasato, panisse, agnolotti. Ristoranti con dehors cane-friendly.</p>
            </div>
          </div>

          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli per vacanze in Piemonte con il cane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Primavera e autunno: stagioni ideali</p>
                  <p className="text-sm text-muted-foreground">Maggio-giugno e settembre-ottobre offrono il clima perfetto per escursioni tra i vigneti.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Agriturismi: la scelta migliore</p>
                  <p className="text-sm text-muted-foreground">Gli agriturismi piemontesi sono perfetti per cani. Spazi aperti, contadini amanti degli animali, e cibo genuino.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Torino è elegante e cane-friendly</p>
                  <p className="text-sm text-muted-foreground">Parchi urbani, Piazza Castello, Parco della Cittadella. I torinesi apprezzano i cani.</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Piemonte</h2>
            <div className="space-y-6">
              {piemonteStructures.length > 0 ? piemonteStructures.map((s) => (
                <Link key={s.slug} href={`/vacanze/piemonte/${s.slug}`}>
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
              )) : <p className="text-muted-foreground text-center py-8">Nessuna struttura al momento. Torna presto!</p>}
            </div>
          </section>

          <section className="bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Piemonte</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Visualizza tutte le strutture pet-friendly verificate in Piemonte. Agriturismi nelle Langhe, hotel a Torino, case vacanza in collina.</p>
            <Link href="/vacanze/piemonte" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Piemonte →</Link>
          </section>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Vacanze", url: "/vacanze" },
            { name: "Piemonte", url: "/vacanze/piemonte" },
            { name: "Guida", url: "/vacanze/piemonte/guida" },
          ]))}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({
            titolo: "Vacanze con il Cane in Piemonte 2026",
            descrizione: "Scopri le migliori vacanze con il cane in Piemonte. Hotel pet-friendly a Torino, Alba, Asti. Vigne, montagne e cultura con il tuo cane.",
            slug: "piemonte-guida",
            regione: "Piemonte",
            img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
            datePublished: new Date().toISOString().split("T")[0],
            autoreName: "MifidoDiTe Team",
          }))}
        />
      </main>
      <Footer />
    </>
  );
}
