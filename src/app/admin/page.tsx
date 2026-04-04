import { Building2, Heart, MessageSquare, Users, Eye, TrendingUp, Newspaper, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Mock stats — verranno da Supabase
const STATS = [
  { label: "Strutture totali", value: "342", trend: "+12 questa settimana", icon: Building2, color: "text-primary", href: "/admin/strutture" },
  { label: "Annunci adozione", value: "89", trend: "14 da approvare", icon: Heart, color: "text-red-500", href: "/admin/adozioni" },
  { label: "Lead ricevuti", value: "1.247", trend: "+38 questo mese", icon: MessageSquare, color: "text-blue-500", href: "/admin/lead" },
  { label: "Newsletter iscritti", value: "4.832", trend: "+156 questo mese", icon: Users, color: "text-green-500", href: "/admin/newsletter" },
  { label: "Visite mensili", value: "28.4k", trend: "+22% vs mese precedente", icon: Eye, color: "text-purple-500", href: "#" },
  { label: "Articoli pubblicati", value: "24", trend: "3 in bozza", icon: Newspaper, color: "text-amber-500", href: "/admin/articoli" },
];

const AZIONI_URGENTI = [
  { tipo: "adozione", msg: "14 annunci adozione da approvare", href: "/admin/adozioni", urgenza: "alta" },
  { tipo: "struttura", msg: "3 strutture segnalate dagli utenti", href: "/admin/strutture", urgenza: "media" },
  { tipo: "recensione", msg: "7 recensioni da moderare", href: "/admin/strutture", urgenza: "media" },
  { tipo: "lead", msg: "5 lead non risposte da piu di 48h", href: "/admin/lead", urgenza: "bassa" },
];

const ATTIVITA_RECENTI = [
  { azione: "Nuova struttura registrata", dettaglio: "Pensione Amici Fedeli — Brescia", tempo: "5 min fa" },
  { azione: "Annuncio adozione pubblicato", dettaglio: "Birillo cerca famiglia — Milano", tempo: "12 min fa" },
  { azione: "Lead ricevuto", dettaglio: "Richiesta per Toelettatura Zampe d'Oro — Bologna", tempo: "25 min fa" },
  { azione: "Nuovo iscritto newsletter", dettaglio: "marco.r@email.it — CAP 20100", tempo: "1 ora fa" },
  { azione: "Recensione approvata", dettaglio: "5 stelle per Dog Hotel Villa Margherita", tempo: "2 ore fa" },
  { azione: "Scraping completato", dettaglio: "Lombardia: 8 nuove strutture trovate", tempo: "6 ore fa" },
  { azione: "Newsletter inviata", dettaglio: "4.200 email inviate, 38% aperture", tempo: "Lunedi 8:00" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Panoramica del portale MifidoDiTe.eu</p>
        </div>
        <span className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {STATS.map((s) => (
          <Link key={s.label} href={s.href}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.trend}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${s.color} group-hover:scale-110 transition-transform`}>
                <s.icon size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Azioni urgenti */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-500" />
            Azioni da fare
          </h2>
          <div className="space-y-3">
            {AZIONI_URGENTI.map((a, i) => (
              <Link key={i} href={a.href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    a.urgenza === "alta" ? "bg-red-500" : a.urgenza === "media" ? "bg-amber-500" : "bg-blue-400"
                  }`} />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">{a.msg}</span>
                </div>
                <span className="text-xs text-muted-foreground">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Attivita recenti */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Attivita recenti
          </h2>
          <div className="space-y-3">
            {ATTIVITA_RECENTI.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{a.azione}</p>
                  <p className="text-xs text-muted-foreground truncate">{a.dettaglio}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{a.tempo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
