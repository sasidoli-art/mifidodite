import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { MapPin, Phone, Clock, ExternalLink, Heart, Users } from "lucide-react";
import { neon } from "@neondatabase/serverless";
import { CLINICHE_SEED, getClinichePerRegione } from "@/lib/cliniche-seed";
import type { ClinicaSeed } from "@/lib/cliniche-seed";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cliniche Veterinarie, Ambulatori e Rifugi in Italia — MifidoDiTe.eu",
  description: "Elenco completo di cliniche veterinarie, pronto soccorso H24, ambulatori, canili e rifugi in tutta Italia.",
};

interface ClinicaDB {
  id: string;
  nome: string;
  slug: string;
  tipo: string;
  indirizzo: string | null;
  comune: string;
  provincia: string;
  regione: string;
  telefono: string | null;
  sito_web: string | null;
  orari: string | null;
  h24: boolean;
  emergenza: boolean;
  servizi: string[];
  accetta_donazioni?: boolean;
  link_donazioni?: string;
  cerca_volontari?: boolean;
  link_volontari?: string;
  descrizione?: string;
}

async function getCliniche(): Promise<Record<string, ClinicaDB[]>> {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT * FROM cliniche WHERE attivo = true ORDER BY regione, comune, nome`;
      if (rows.length > 0) {
        const map: Record<string, ClinicaDB[]> = {};
        for (const r of rows) {
          const regione = (r.regione as string) || "Altro";
          if (!map[regione]) map[regione] = [];
          map[regione].push(r as unknown as ClinicaDB);
        }
        return map;
      }
    } catch (err) {
      console.error("Cliniche DB error:", err);
    }
  }
  // Fallback seed
  const seedMap = getClinichePerRegione();
  const result: Record<string, ClinicaDB[]> = {};
  for (const [reg, items] of Object.entries(seedMap)) {
    result[reg] = items.map((c) => ({ ...c, id: c.slug, accetta_donazioni: c.accetta_donazioni, link_donazioni: c.link_donazioni, cerca_volontari: c.cerca_volontari, link_volontari: c.link_volontari, descrizione: c.descrizione } as unknown as ClinicaDB));
  }
  return result;
}

const TIPO_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  clinica: { label: "Clinica Veterinaria", color: "bg-blue-100 text-blue-700", icon: "🏥" },
  ambulatorio: { label: "Ambulatorio", color: "bg-green-100 text-green-700", icon: "💊" },
  pronto_soccorso: { label: "Pronto Soccorso", color: "bg-red-100 text-red-700", icon: "🚑" },
  rifugio: { label: "Rifugio Animali", color: "bg-purple-100 text-purple-700", icon: "🏠" },
  canile: { label: "Canile", color: "bg-amber-100 text-amber-700", icon: "🐕" },
  gattile: { label: "Gattile", color: "bg-pink-100 text-pink-700", icon: "🐈" },
};

export default async function ClinichePage() {
  const perRegione = await getCliniche();
  const regioniConDati = Object.keys(perRegione).sort();
  const totaleCliniche = Object.values(perRegione).flat().length;
  const h24Count = Object.values(perRegione).flat().filter((c) => c.h24).length;
  const rifugiCount = Object.values(perRegione).flat().filter((c) => c.tipo === "rifugio" || c.tipo === "canile").length;

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-foreground py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Cliniche Veterinarie e <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">Rifugi</span>
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              {totaleCliniche} strutture in {regioniConDati.length} regioni. Cliniche H24, ambulatori, canili e rifugi.
            </p>
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center"><div className="text-3xl font-extrabold text-white">{totaleCliniche}</div><div className="text-sm text-white/50">Strutture</div></div>
              <div className="text-center"><div className="text-3xl font-extrabold text-red-400">{h24Count}</div><div className="text-sm text-white/50">Aperte H24</div></div>
              <div className="text-center"><div className="text-3xl font-extrabold text-secondary">{rifugiCount}</div><div className="text-sm text-white/50">Rifugi e canili</div></div>
            </div>
          </div>
        </section>

        <section className="py-8 border-b border-border bg-white sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {regioniConDati.map((r) => (
                <a key={r} href={`#${r.toLowerCase().replace(/[\s']+/g, "-")}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-muted text-foreground hover:bg-primary hover:text-white transition-colors whitespace-nowrap">
                  {r} ({perRegione[r].length})
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-4">
            <div className="text-4xl">🚨</div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-red-700 text-lg">Emergenza veterinaria?</h3>
              <p className="text-red-600 text-sm mt-1">Cerca la clinica H24 piu vicina qui sotto o chiama il pronto soccorso veterinario della tua citta.</p>
            </div>
          </div>

          {regioniConDati.map((regione) => (
            <section key={regione} id={regione.toLowerCase().replace(/[\s']+/g, "-")} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2 scroll-mt-36">
                <MapPin className="text-primary" size={24} /> {regione}
                <span className="text-sm font-normal text-muted-foreground ml-2">({perRegione[regione].length})</span>
              </h2>
              <div className="space-y-4">
                {perRegione[regione].map((c) => {
                  const tipoInfo = TIPO_LABELS[c.tipo] || TIPO_LABELS.clinica;
                  return (
                    <div key={c.id || c.slug} className={`bg-white rounded-2xl p-5 shadow-sm border border-border/50 hover:shadow-md transition-all ${c.h24 ? "border-l-4 border-l-red-400" : ""}`}>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xl">{tipoInfo.icon}</span>
                            <h3 className="font-bold text-foreground text-lg">{c.nome}</h3>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${tipoInfo.color}`}>{tipoInfo.label}</span>
                            {c.h24 && <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">H24</span>}
                          </div>
                          {c.indirizzo && <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground"><MapPin size={14} className="shrink-0" />{c.indirizzo} — {c.comune}</div>}
                          {!c.indirizzo && c.comune && <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground"><MapPin size={14} />{c.comune}{c.provincia ? ` (${c.provincia})` : ""}</div>}
                          {c.orari && <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground"><Clock size={14} />{c.orari}</div>}
                          {c.servizi && c.servizi.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {c.servizi.map((s) => <span key={s} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{s}</span>)}
                            </div>
                          )}
                          {c.descrizione && <p className="mt-3 text-sm text-muted-foreground">{c.descrizione}</p>}
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                          {c.telefono && (
                            <a href={`tel:${c.telefono.replace(/\s/g, "")}`}
                              className={`${c.h24 ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary-dark"} text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm`}>
                              <Phone size={16} />{c.telefono}
                            </a>
                          )}
                          {c.sito_web && (
                            <a href={c.sito_web} target="_blank" rel="noopener noreferrer"
                              className="border border-border text-muted-foreground px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-muted transition-colors text-sm">
                              <ExternalLink size={14} />Sito web
                            </a>
                          )}
                          {c.accetta_donazioni && (
                            <a href={c.link_donazioni || `mailto:sos@mifidodite.eu?subject=Donazione per ${c.nome}`}
                              target={c.link_donazioni ? "_blank" : undefined} rel={c.link_donazioni ? "noopener noreferrer" : undefined}
                              className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm">
                              <Heart size={16} />Dona a questo rifugio
                            </a>
                          )}
                          {c.cerca_volontari && (
                            <a href={c.link_volontari || `mailto:sos@mifidodite.eu?subject=Volontariato presso ${c.nome}`}
                              target={c.link_volontari ? "_blank" : undefined} rel={c.link_volontari ? "noopener noreferrer" : undefined}
                              className="border-2 border-secondary text-secondary px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary hover:text-white transition-colors text-sm">
                              <Users size={16} />Diventa volontario
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

          <div className="mt-12 bg-muted rounded-2xl p-8 text-center">
            <Heart className="mx-auto text-primary mb-4" size={40} />
            <h3 className="text-xl font-bold text-foreground">Conosci una clinica che manca?</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">Segnalacela e la aggiungeremo.</p>
            <a href="mailto:sos@mifidodite.eu?subject=Segnalazione clinica/rifugio"
              className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Segnala una struttura
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
