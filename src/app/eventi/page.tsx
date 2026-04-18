import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Calendar, MapPin, Mail, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Eventi Pet — MifidoDiTe.eu",
  description: "Raduni, fiere, eventi per cani e gatti in Italia.",
};

interface Evento {
  id: string;
  titolo: string;
  tipo: string;
  data_inizio: string | null;
  data_fine: string | null;
  citta: string | null;
  regione: string | null;
  sommario: string | null;
  organizzatore: string | null;
  prezzo: string | null;
}

async function getEventi(): Promise<Evento[]> {
  if (process.env.DATABASE_URL) {
    try {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL!);
      const rows = await sql`SELECT id, titolo, tipo, data_inizio::text, data_fine::text, citta, regione, sommario, organizzatore, prezzo FROM eventi WHERE attivo = true ORDER BY data_inizio ASC`;
      if (rows.length > 0) return rows as Evento[];
    } catch (err) {
      console.error("[eventi] DB query failed:", err);
    }
  }
  return [];
}

export default async function EventiPage() {
  const eventi = await getEventi();

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-foreground py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Eventi <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">Pet</span>
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Raduni, fiere, mostre canine e eventi per cani e gatti in tutta Italia.
              {eventi.length > 0 && ` ${eventi.length} eventi in programma.`}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {eventi.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventi.map((e) => (
                <div key={e.id} className="bg-white rounded-2xl p-5 shadow-sm border border-border/50 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      e.tipo === "fiera" ? "bg-purple-100 text-purple-700"
                      : e.tipo === "raduno" ? "bg-green-100 text-green-700"
                      : e.tipo === "mostra" ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-primary"
                    }`}>
                      {(e.tipo || "evento").charAt(0).toUpperCase() + (e.tipo || "evento").slice(1)}
                    </span>
                    {e.prezzo ? (
                      <span className="text-xs text-muted-foreground">{e.prezzo}</span>
                    ) : null}
                  </div>

                  <h3 className="font-bold text-foreground text-lg">{e.titolo}</h3>

                  {e.data_inizio && (
                    <div className="flex items-center gap-1 mt-2 text-sm text-primary font-medium">
                      <Calendar size={14} />
                      {e.data_inizio}
                      {e.data_fine ? ` → ${e.data_fine}` : ""}
                    </div>
                  )}

                  {e.citta && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin size={14} />
                      {e.citta}{e.regione ? `, ${e.regione}` : ""}
                    </div>
                  )}

                  {e.sommario && (
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{e.sommario}</p>
                  )}

                  {e.organizzatore && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Organizzato da: <strong>{e.organizzatore}</strong>
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto py-12">
              <div className="text-center mb-10">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Calendar size={40} className="text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
                  Sezione in crescita
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                  Stiamo costruendo il calendario italiano degli eventi pet: mostre cinofile ENCI, raduni di razza, fiere del settore, gare di agility, giornate di sensibilizzazione.
                  Nel frattempo, ecco dove trovarli:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-10">
                <a href="https://www.enci.it/eventi" target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-5 bg-white border border-border hover:border-primary hover:shadow-md rounded-2xl transition-all">
                  <div className="text-2xl shrink-0">🏆</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 font-semibold text-foreground group-hover:text-primary transition-colors">
                      Calendario ENCI <ExternalLink size={12} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Esposizioni e raduni cinofili ufficiali</p>
                  </div>
                </a>
                <a href="https://www.bauadvisor.it/eventi" target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-5 bg-white border border-border hover:border-primary hover:shadow-md rounded-2xl transition-all">
                  <div className="text-2xl shrink-0">🐾</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 font-semibold text-foreground group-hover:text-primary transition-colors">
                      BauAdvisor <ExternalLink size={12} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Eventi pet generici in Italia</p>
                  </div>
                </a>
              </div>

              <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-2xl p-6 sm:p-8 border border-border text-center">
                <h3 className="text-lg font-bold text-foreground mb-2">Organizzi un evento pet?</h3>
                <p className="text-sm text-muted-foreground mb-5 max-w-xl mx-auto">
                  Scrivici per farlo inserire nel nostro calendario. Gratis e senza vincoli: basta data, luogo, orari e una descrizione.
                </p>
                <a href="mailto:info@mifidodite.eu?subject=Segnala%20evento%20pet" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors">
                  <Mail size={16} /> Segnala un evento
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
