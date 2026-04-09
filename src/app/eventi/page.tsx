import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Calendar, MapPin } from "lucide-react";

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
    } catch { /* fallback */ }
  }
  return [];
}

export default async function EventiPage() {
  const eventi = await getEventi();

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-muted py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
              Eventi <span className="text-primary">Pet</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
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
            <div className="max-w-2xl mx-auto py-12">
              <div className="text-center mb-8">
                <Calendar size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-bold">Calendario in costruzione</h3>
                <p className="text-muted-foreground mt-2">
                  Stiamo raccogliendo gli eventi pet italiani. Nel frattempo puoi consultare i calendari ufficiali:
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <a href="https://www.enci.it/eventi" target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-5 bg-white border-2 border-border hover:border-primary hover:shadow-md rounded-2xl transition-all">
                  <div className="text-2xl">🏆</div>
                  <span className="font-semibold text-foreground">Calendario ENCI</span>
                  <span className="text-xs text-muted-foreground">Esposizioni e raduni cinofili ufficiali</span>
                </a>
                <a href="https://www.bauadvisor.it/eventi" target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-5 bg-white border-2 border-border hover:border-primary hover:shadow-md rounded-2xl transition-all">
                  <div className="text-2xl">🐾</div>
                  <span className="font-semibold text-foreground">BauAdvisor</span>
                  <span className="text-xs text-muted-foreground">Eventi pet generici in Italia</span>
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
