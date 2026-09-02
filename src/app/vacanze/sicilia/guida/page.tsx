import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Utensils, Sun } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Sicilia 2026 — Hotel Pet-Friendly Palermo, Catania | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Sicilia. Hotel e B&B pet-friendly a Palermo, Catania, Mondello. Spiagge, mare e cultura con il tuo cane.",
  keywords: ["vacanze cani sicilia", "hotel pet friendly palermo", "vacanze cani catania", "mondello cani", "spiagge sicilia cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/sicilia/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Sicilia 2026",
    description: "Palermo, Catania, Mondello e le spiagge siciliane. Scopri dove portare il tuo cane in Sicilia.",
    url: "https://www.mifidodite.eu/vacanze/sicilia/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function SiciliaGuida() {
  const siciliaStructures = VACANZE_SEED.filter(s => s.regione === "Sicilia").slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=1200&q=80" alt="Sicilia" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Sicilia", url: "/vacanze/sicilia" }, { name: "Guida", url: "/vacanze/sicilia/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Sicilia</h1>
              <p className="text-lg text-white/80 max-w-2xl">Palermo, Catania, le spiagge di Mondello. La Sicilia accoglie cani con calore e autenticità. Scopri spiagge, cibo straordinario e culture millenarie con il tuo amico.</p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Sicilia: sole, spiagge e cani felici</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Sicilia è un'isola dove il caldo, il mare cristallino e l'accoglienza si incontrano. I siciliani amano gli animali e vedrai cani ovunque: nelle piazze di Palermo, sulle spiagge di Mondello, nei ristoranti con dehors. Le strutture ricettive accolgono cani senza problemi, e potrai portare il tuo amico a scoprire la bellezza e la cultura dell'isola.</p>
              <p>Dall'Arancino al sarde a beccafico, la cucina siciliana è straordinaria. E gli hotel? Tra i più cane-friendly d'Italia. Aggiungi spiagge selvagge, escursioni, e l'atmosfera unica della Sicilia, e avrai una vacanza indimenticabile.</p>
            </div>
          </section>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Waves size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Spiagge selvagge</h3>
              <p className="text-sm text-muted-foreground">Mondello, Cefalù, San Vito Lo Capo. Spiagge dove il cane corre libero e nuota nel mare cristallino.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Utensils size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Gastronomia unica</h3>
              <p className="text-sm text-muted-foreground">Arancini, pasta alla norma, sarde a beccafico. Ristoranti siciliani amanti dei cani.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Sun size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Sole e calore</h3>
              <p className="text-sm text-muted-foreground">Clima mite tutto l'anno. Perfetto per vacanze lunghe e relax con il tuo cane.</p>
            </div>
          </div>

          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli per vacanze in Sicilia con il cane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Protezione dal sole: fondamentale</p>
                  <p className="text-sm text-muted-foreground">Il sole siciliano è intenso. Porta sempre acqua, ombrellone e protezione solare. Passeggie al mattino e al tramonto.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Palermo è molto cane-friendly</p>
                  <p className="text-sm text-muted-foreground">Quattro Canti, Mondello, ristoranti storici: i cani sono benvenuti ovunque. Portalo al guinzaglio nei centri storici.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Estate da evitare nelle città</p>
                  <p className="text-sm text-muted-foreground">Giugno-agosto, Palermo e Catania sono troppo calde. Meglio maggio, settembre, ottobre per esplorare le città.</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Sicilia</h2>
            <div className="space-y-6">
              {siciliaStructures.length > 0 ? siciliaStructures.map((s) => (
                <Link key={s.slug} href={`/vacanze/sicilia/${s.slug}`}>
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

          <section className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Sicilia</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Visualizza tutte le strutture pet-friendly verificate in Sicilia. Hotel a Palermo, B&B a Catania, case vacanza al mare.</p>
            <Link href="/vacanze/sicilia" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Sicilia →</Link>
          </section>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Vacanze", url: "/vacanze" },
            { name: "Sicilia", url: "/vacanze/sicilia" },
            { name: "Guida", url: "/vacanze/sicilia/guida" },
          ]))}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({
            titolo: "Vacanze con il Cane in Sicilia 2026",
            descrizione: "Scopri le migliori vacanze con il cane in Sicilia. Hotel e B&B pet-friendly a Palermo, Catania, Mondello. Spiagge, mare e cultura con il tuo cane.",
            slug: "sicilia-guida",
            regione: "Sicilia",
            img: "https://images.unsplash.com/photo-1525174262454-b46e1a505f87?w=1200&q=80",
            datePublished: new Date().toISOString().split("T")[0],
            autoreName: "MifidoDiTe Team",
          }))}
        />
      </main>
      <Footer />
    </>
  );
}
