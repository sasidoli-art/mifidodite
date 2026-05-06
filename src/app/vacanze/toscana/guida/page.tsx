import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Bed, Utensils, Wine } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";

export const metadata = {
  title: "Vacanze con il Cane in Toscana 2026 — Hotel e B&B Pet-Friendly | MifidoDiTe.eu",
  description: "Guida completa alle vacanze con il cane in Toscana. Scopri i migliori hotel e agriturismi pet-friendly, consigli per visitare Firenze, Siena e la Val d'Orcia con il tuo cane.",
  keywords: ["vacanze cani toscana", "hotel pet friendly toscana", "agriturismi cani toscana", "firenze cani", "siena cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/toscana/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Toscana 2026",
    description: "Scopri dove portare il tuo cane in Toscana: hotel pet-friendly, sentieri, ristoranti e attrazioni dog-friendly.",
    url: "https://www.mifidodite.eu/vacanze/toscana/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1546425782-e1dae7191497?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function ToscanaGuida() {
  const toscanaStructures = VACANZE_SEED.filter(s => s.regione === "Toscana").slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1546425782-e1dae7191497?w=1200&q=80"
              alt="Toscana paesaggio"
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs
                  dark
                  items={[
                    { name: "Vacanze", url: "/vacanze" },
                    { name: "Toscana", url: "/vacanze/toscana" },
                    { name: "Guida", url: "/vacanze/toscana/guida" },
                  ]}
                />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">
                Vacanze con il Cane in Toscana
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                Scopri come trascorrere una vacanza indimenticabile in Toscana con il tuo cane. Hotel pet-friendly, sentieri dog-friendly e ristoranti che vi accolgono entrambi.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Intro */}
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">La Toscana è perfetta per chi ama viaggiare con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>
                La Toscana è una delle regioni più affascinanti d'Italia, e la buona notizia è che è incredibilmente pet-friendly. Dalle colline del Chianti ai paesaggi della Val d'Orcia, la Toscana offre paesaggi spettacolari e una cultura che accoglie gli animali domestici.
              </p>
              <p>
                Che tu stia cercando un elegante agriturismo nelle campagne toscane, un hotel storico a Firenze, o una casa vacanza immersa nella natura, troverai strutture dove il tuo cane è veramente benvenuto. E non è solo l'alloggio: ristoranti, sentieri, mercati locali e attrazioni turistiche sono generalmente molto accoglienti verso i cani.
              </p>
            </div>
          </section>

          {/* Sezioni tematiche */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Bed size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Dove dormire</h3>
              <p className="text-sm text-muted-foreground">Agriturismi, hotel e B&B che accettano cani. Scopri le migliori strutture verificate.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Wine size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Dove mangiare</h3>
              <p className="text-sm text-muted-foreground">Ristoranti con tavoli all'aperto dove il tuo cane è il benvenuto, dal casale al centro città.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <MapPin size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Cosa fare</h3>
              <p className="text-sm text-muted-foreground">Sentieri escursionistici, mercati, città storiche e attrazioni dog-friendly in tutta la regione.</p>
            </div>
          </div>

          {/* Consigli pratici */}
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per una vacanza in Toscana con il tuo cane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Documenti e assicurazione</p>
                  <p className="text-sm text-muted-foreground">Porta il passaporto del cane, il certificato di microchip e una copia del libretto vaccinale. Considera un'assicurazione viaggio per il tuo cane.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Meteo estivo in Toscana</p>
                  <p className="text-sm text-muted-foreground">Le estati toscane possono essere molto calde. Evita gli orari più caldi (12-16), organizza passeggiate al mattino e al tramonto. Porta sempre acqua con te.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Contatti veterinari</p>
                  <p className="text-sm text-muted-foreground">Salva i numeri di emergenza veterinaria prima di partire. I veterinari toscani sono generalmente molto professionali.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Guinzaglio e controllo</p>
                  <p className="text-sm text-muted-foreground">Alcuni sentieri richiedono il guinzaglio, soprattutto in aree protette. Verificare le ordinanze locali prima di visitare attrazioni turistiche.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Top 3 Strutture */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Toscana</h2>
            <div className="space-y-6">
              {toscanaStructures.length > 0 ? (
                toscanaStructures.map((s) => (
                  <Link key={s.slug} href={`/vacanze/toscana/${s.slug}`}>
                    <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
                      <div className="grid sm:grid-cols-3 gap-0">
                        <div className="h-48 sm:h-auto overflow-hidden">
                          <img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="col-span-2 p-6 flex flex-col justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3">
                              <MapPin size={14} /> {s.comune} ({s.provincia})
                            </p>
                            <p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p>
                          </div>
                          <div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">Nessuna struttura verificata al momento in Toscana. Torna presto per gli aggiornamenti!</p>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Pronto per una vacanza indimenticabile?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Scopri tutte le strutture pet-friendly verificate a mano in Toscana. Filtra per tipo, prezzo e taglia del cane.
            </p>
            <Link href="/vacanze/toscana" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">
              Vedi tutte le strutture in Toscana →
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
