import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Mountain, Snowflake, Utensils } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Vacanze con il Cane in Valle d'Aosta 2026 — Hotel Pet-Friendly Aosta, Courmayeur | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Valle d'Aosta. Hotel pet-friendly ad Aosta, Courmayeur, Monte Bianco. Montagne alpine, escursionismo con il tuo cane.",
  keywords: ["vacanze cani valle d'aosta", "hotel pet friendly courmayeur", "monte bianco cani", "aosta cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/valle-d-aosta/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Valle d'Aosta 2026",
    url: "https://www.mifidodite.eu/vacanze/valle-d-aosta/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function ValleDaostaGuida() {
  const valleDaostaStructures = VACANZE_SEED.filter(s => s.regione === "Valle d'Aosta").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Valle d'Aosta" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Valle d'Aosta", url: "/vacanze/valle-d-aosta" }, { name: "Guida", url: "/vacanze/valle-d-aosta/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Valle d'Aosta</h1>
              <p className="text-lg text-white/80 max-w-2xl">Aosta, Courmayeur, Monte Bianco. La Valle d'Aosta è il tetto d'Europa: montagne alpine nobili, sentieri spettacolari e cani benvenuti.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Valle d'Aosta: Alpi alpine e avventure montane con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Valle d'Aosta è il tetto d'Italia. Aosta è capitale tranquilla, porta alle Alpi. Courmayeur è località sciistica, base per Monte Bianco e Gran Paradiso. Sentieri montani: escursionismo puro per cani robusti. Rifugi accolgono cani. Paesaggi alpini mozzafiato. Clima fresco anche d'estate: perfetto per cani che soffrono il caldo. Cucina valdostana: fontina, toma, capra, zuppe calde, fonduta, vini montani.</p>
              <p>La Valle d'Aosta attrae proprietari che cercano montagna seria. Non è spiaggia, è altitudine e sfida. Cani atletici si sentono a casa. Veterinari a Aosta e Courmayeur. Ospitalità alpina. Escursionismo è il cuore delle vacanze qui.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Mountain size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Alpi nobili</h3>
              <p className="text-sm text-muted-foreground">Monte Bianco, Gran Paradiso. Escursionismo alpino per cani.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Snowflake size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Rifugi montani</h3>
              <p className="text-sm text-muted-foreground">Alpini accolgono cani. Pause rifocillanti durante escursioni.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Utensils size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Fontina e montagna</h3>
              <p className="text-sm text-muted-foreground">Cucina valdostana autentica, formaggi, piatti caldi.</p>
            </div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per la Valle d'Aosta</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Altitudine</p><p className="text-sm text-muted-foreground">Courmayeur 1200m, rifugi fino a 3000m+. Cane acclimatato a freddo.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Escursionismo</p><p className="text-sm text-muted-foreground">Giugno-settembre. Sentieri alpini segnalati. Guida locale consigliata.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Come arrivare</p><p className="text-sm text-muted-foreground">Torino (2h). Auto essenziale. Strade montane benche.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Aosta ha cliniche. Courmayeur ha servizi. Montagna remota: kit pronto soccorso.</p></div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div><p className="font-semibold text-foreground">Attrezzatura</p><p className="text-sm text-muted-foreground">Giacca per cane, scarpe montane, acqua abbondante sempre.</p></div>
              </li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Valle d'Aosta</h2>
            <div className="space-y-6">
              {valleDaostaStructures.length > 0 ? (
                valleDaostaStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/valle-d-aosta/${s.slug}`}>
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
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Valle d'Aosta. Torna presto!</p>
              )}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Valle d'Aosta</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Strutture pet-friendly verificate. Hotel e rifugi in Valle d'Aosta.</p>
            <Link href="/vacanze/valle-d-aosta" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Valle d'Aosta →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Vacanze", url: "/vacanze" }, { name: "Valle d'Aosta", url: "/vacanze/valle-d-aosta" }, { name: "Guida", url: "/vacanze/valle-d-aosta/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Vacanze con il Cane in Valle d'Aosta 2026", descrizione: "Scopri le migliori vacanze con il cane in Valle d'Aosta. Hotel pet-friendly ad Aosta, Courmayeur, Monte Bianco. Montagne alpine, escursionismo con il tuo cane.", slug: "valle-d-aosta-guida", regione: "Valle d'Aosta", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
