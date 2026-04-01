import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { MapPin, Phone, Clock, ExternalLink, Shield, Heart } from "lucide-react";
import Link from "next/link";
import { CLINICHE_SEED, getClinichePerRegione } from "@/lib/cliniche-seed";
import { REGIONI } from "@/lib/scraper-google";

export const metadata = {
  title: "Cliniche Veterinarie, Ambulatori e Rifugi in Italia — MifidoDiTe.eu",
  description: "Elenco completo di cliniche veterinarie, pronto soccorso H24, ambulatori, canili e rifugi in tutta Italia, citta per citta.",
};

const TIPO_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  clinica: { label: "Clinica Veterinaria", color: "bg-blue-100 text-blue-700", icon: "🏥" },
  ambulatorio: { label: "Ambulatorio", color: "bg-green-100 text-green-700", icon: "💊" },
  pronto_soccorso: { label: "Pronto Soccorso", color: "bg-red-100 text-red-700", icon: "🚑" },
  rifugio: { label: "Rifugio Animali", color: "bg-purple-100 text-purple-700", icon: "🏠" },
  canile: { label: "Canile", color: "bg-amber-100 text-amber-700", icon: "🐕" },
  gattile: { label: "Gattile", color: "bg-pink-100 text-pink-700", icon: "🐈" },
};

export default function ClinichePage() {
  const perRegione = getClinichePerRegione();
  const regioniConDati = Object.keys(perRegione).sort();
  const h24Count = CLINICHE_SEED.filter((c) => c.h24).length;
  const rifugiCount = CLINICHE_SEED.filter((c) => c.tipo === "rifugio" || c.tipo === "canile").length;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
              Cliniche Veterinarie e <span className="text-primary">Rifugi</span> in Italia
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Elenco aggiornato di cliniche H24, ambulatori, pronto soccorso, canili e rifugi.
              Citta per citta, regione per regione.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-foreground">{CLINICHE_SEED.length}</div>
                <div className="text-sm text-muted-foreground">Strutture</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-red-500">{h24Count}</div>
                <div className="text-sm text-muted-foreground">Aperte H24</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-purple-500">{rifugiCount}</div>
                <div className="text-sm text-muted-foreground">Rifugi e canili</div>
              </div>
            </div>
          </div>
        </section>

        {/* Indice regioni */}
        <section className="py-8 border-b border-border bg-white sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {regioniConDati.map((r) => (
                <a
                  key={r}
                  href={`#${r.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "")}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-muted text-foreground hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
                >
                  {r} ({perRegione[r].length})
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Lista per regione */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Banner H24 */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-4">
            <div className="text-4xl">🚨</div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-red-700 text-lg">Emergenza veterinaria?</h3>
              <p className="text-red-600 text-sm mt-1">
                Se il tuo animale ha bisogno di cure urgenti, cerca la clinica H24 piu vicina qui sotto o chiama il pronto soccorso veterinario della tua citta.
              </p>
            </div>
          </div>

          {regioniConDati.map((regione) => (
            <section
              key={regione}
              id={regione.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "")}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2 scroll-mt-36">
                <MapPin className="text-primary" size={24} />
                {regione}
              </h2>

              <div className="space-y-4">
                {perRegione[regione].map((c) => {
                  const tipoInfo = TIPO_LABELS[c.tipo] || TIPO_LABELS.clinica;

                  return (
                    <div
                      key={c.slug}
                      className={`bg-white rounded-2xl p-5 shadow-sm border border-border/50 hover:shadow-md transition-all ${
                        c.h24 ? "border-l-4 border-l-red-400" : ""
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xl">{tipoInfo.icon}</span>
                            <h3 className="font-bold text-foreground text-lg">{c.nome}</h3>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${tipoInfo.color}`}>
                              {tipoInfo.label}
                            </span>
                            {c.h24 && (
                              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full animate-pulse">
                                H24
                              </span>
                            )}
                            {c.emergenza && !c.h24 && (
                              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                                Emergenze
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                            <MapPin size={14} className="shrink-0" />
                            {c.indirizzo} — {c.comune} ({c.provincia})
                          </div>

                          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                            <Clock size={14} className="shrink-0" />
                            {c.orari}
                          </div>

                          {c.servizi.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {c.servizi.map((s) => (
                                <span key={s} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 shrink-0">
                          {c.telefono && (
                            <a
                              href={`tel:${c.telefono.replace(/\s/g, "")}`}
                              className={`${
                                c.h24 ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary-dark"
                              } text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm`}
                            >
                              <Phone size={16} />
                              {c.telefono}
                            </a>
                          )}
                          {c.sito_web && (
                            <a
                              href={c.sito_web}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="border border-border text-muted-foreground px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-muted transition-colors text-sm"
                            >
                              <ExternalLink size={14} />
                              Sito web
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* CTA bottom */}
          <div className="mt-12 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 text-center">
            <Heart className="mx-auto text-primary mb-4" size={40} />
            <h3 className="text-xl font-bold text-foreground">Conosci una clinica che manca?</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Stiamo costruendo l'elenco piu completo d'Italia. Se conosci una clinica, ambulatorio o rifugio che non e presente, segnalacelo.
            </p>
            <a
              href="mailto:segnalazioni@mifidodite.eu?subject=Segnalazione clinica/rifugio"
              className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Segnala una struttura
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
