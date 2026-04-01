import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Calendar, MapPin, Phone, Clock, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Eventi Pet e Cliniche H24 — MifidoDiTe.eu",
  description: "Raduni, fiere, eventi per cani e gatti in Italia. Cliniche veterinarie H24 e pronto soccorso.",
};

// Mock — verra da Supabase tabella eventi
const EVENTI = [
  {
    id: "e1", titolo: "Quattrozampe in Fiera 2026 — Milano", tipo: "fiera",
    data_inizio: "2026-05-10", data_fine: "2026-05-11", citta: "Milano", regione: "Lombardia",
    indirizzo: "Fiera Milano, Rho", sommario: "La piu grande fiera pet d'Italia torna a Milano con oltre 200 espositori, area adozioni, sfilate canine e consulenze veterinarie gratuite.",
    prezzo: "€12 online, €15 in cassa", organizzatore: "Quattrozampe in Fiera", img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
  },
  {
    id: "e2", titolo: "Sausage Walk Milano — Raduno Bassotti", tipo: "raduno",
    data_inizio: "2026-04-20", data_fine: null, citta: "Milano", regione: "Lombardia",
    indirizzo: "Parco Sempione, Milano", sommario: "Il raduno piu dolce d'Italia! Centinaia di bassotti si incontrano per una passeggiata al parco. Aperto a tutte le razze.",
    prezzo: "Gratuito", organizzatore: "Sausage Walk Italia", img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&q=80",
  },
  {
    id: "e3", titolo: "World Dog Show 2026 — Bologna", tipo: "fiera",
    data_inizio: "2026-06-18", data_fine: "2026-06-21", citta: "Bologna", regione: "Emilia-Romagna",
    indirizzo: "BolognaFiere", sommario: "L'evento cinofilo piu importante al mondo arriva in Italia! Esposizioni, gare di agility, grooming show e molto altro.",
    prezzo: "da €20", organizzatore: "FCI / ENCI", img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
  },
];

const CLINICHE = [
  {
    id: "c1", nome: "Clinica Veterinaria Gran Sasso — H24", citta: "Milano", regione: "Lombardia",
    indirizzo: "Via Ampere 61, Milano", telefono: "02 2940 5482",
    descrizione: "Pronto soccorso veterinario aperto 24 ore su 24, 365 giorni l'anno. Terapia intensiva, chirurgia d'urgenza, diagnostica avanzata.",
    h24: true,
  },
  {
    id: "c2", nome: "Clinica Veterinaria Malpensa — H24", citta: "Samarate", regione: "Lombardia",
    indirizzo: "Via Alcide De Gasperi 2, Samarate (VA)", telefono: "0331 721 233",
    descrizione: "Centro specialistico con pronto soccorso H24. Ortopedia, neurologia, oncologia, cardiologia.",
    h24: true,
  },
  {
    id: "c3", nome: "Futuravet — Pronto Soccorso", citta: "Tolentino", regione: "Marche",
    indirizzo: "Contrada Pace 44, Tolentino (MC)", telefono: "0733 969 096",
    descrizione: "Pronto soccorso e terapia intensiva veterinaria. Reperibilita notturna e festiva.",
    h24: false,
  },
];

export default function EventiPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
              Eventi Pet e <span className="text-primary">Cliniche H24</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Raduni, fiere ed eventi per cani e gatti in tutta Italia.
              Cliniche veterinarie aperte H24 per ogni emergenza.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Eventi */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
              <Calendar className="text-primary" size={24} />
              Prossimi eventi
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EVENTI.map((e) => (
                <div key={e.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border/50">
                  <div className="h-44 overflow-hidden">
                    <img src={e.img} alt={e.titolo} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        e.tipo === "fiera" ? "bg-purple-100 text-purple-700" :
                        e.tipo === "raduno" ? "bg-green-100 text-green-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {e.tipo.charAt(0).toUpperCase() + e.tipo.slice(1)}
                      </span>
                      {e.prezzo && (
                        <span className="text-xs text-muted-foreground">{e.prezzo}</span>
                      )}
                    </div>

                    <h3 className="font-bold text-foreground text-lg">{e.titolo}</h3>

                    <div className="flex items-center gap-1 mt-2 text-sm text-primary font-medium">
                      <Calendar size={14} />
                      {e.data_inizio}
                      {e.data_fine ? ` → ${e.data_fine}` : ""}
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin size={14} />
                      {e.indirizzo || e.citta}
                    </div>

                    <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                      {e.sommario}
                    </p>

                    {e.organizzatore && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Organizzato da: <strong>{e.organizzatore}</strong>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cliniche H24 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
              <Clock className="text-red-500" size={24} />
              Cliniche Veterinarie H24 e Pronto Soccorso
            </h2>

            <div className="space-y-4">
              {CLINICHE.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-foreground text-lg">{c.nome}</h3>
                        {c.h24 && (
                          <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                            H24
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                        <MapPin size={14} className="shrink-0" />
                        {c.indirizzo} — {c.regione}
                      </div>

                      <p className="text-sm text-muted-foreground mt-3">{c.descrizione}</p>
                    </div>

                    {c.telefono && (
                      <a
                        href={`tel:${c.telefono.replace(/\s/g, "")}`}
                        className="shrink-0 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
                      >
                        <Phone size={18} />
                        {c.telefono}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-8 text-center">
              In caso di emergenza chiama sempre il pronto soccorso veterinario piu vicino.
              <br />Questi dati vengono aggiornati settimanalmente.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
