"use client";

import { useState } from "react";
import { Users, Eye, Send, TrendingUp, Clock, Mail, Phone, CheckCircle, XCircle } from "lucide-react";

// Mock data — verra da Supabase
const MOCK_STATS = {
  lead_totali: 47,
  lead_questo_mese: 12,
  visualizzazioni: 1234,
  risposte: 38,
};

const MOCK_LEAD = [
  {
    id: "l1", nome: "Laura Mantovani", email: "laura.m@email.it", telefono: "+39 333 1111111",
    data_inizio: "2026-04-10", data_fine: "2026-04-15", numero_animali: 1,
    tipo_animale: "cane", taglia: "media", note: "Il mio cane Rex e molto socievole.",
    stato: "nuovo", created_at: "2026-04-01T10:30:00",
  },
  {
    id: "l2", nome: "Marco Bianchi", email: "marco.b@email.it", telefono: "+39 333 2222222",
    data_inizio: "2026-04-20", data_fine: "2026-04-22", numero_animali: 2,
    tipo_animale: "gatto", taglia: null, note: "Due gatti fratelli, non separabili.",
    stato: "nuovo", created_at: "2026-03-31T15:45:00",
  },
  {
    id: "l3", nome: "Giulia Tosi", email: "giulia.t@email.it", telefono: null,
    data_inizio: "2026-05-01", data_fine: "2026-05-07", numero_animali: 1,
    tipo_animale: "cane", taglia: "grande", note: null,
    stato: "risposto", created_at: "2026-03-28T09:15:00",
  },
  {
    id: "l4", nome: "Alessandro Verdi", email: "alex.v@email.it", telefono: "+39 333 4444444",
    data_inizio: null, data_fine: null, numero_animali: 1,
    tipo_animale: "cane", taglia: "piccola", note: "Cerco dog sitter per weekend.",
    stato: "convertito", created_at: "2026-03-25T11:00:00",
  },
];

const STATO_BADGE: Record<string, { label: string; color: string }> = {
  nuovo: { label: "Nuovo", color: "bg-blue-100 text-blue-700" },
  inviato: { label: "Inviato", color: "bg-yellow-100 text-yellow-700" },
  visualizzato: { label: "Visualizzato", color: "bg-purple-100 text-purple-700" },
  risposto: { label: "Risposto", color: "bg-green-100 text-green-700" },
  convertito: { label: "Convertito", color: "bg-emerald-100 text-emerald-800" },
  scaduto: { label: "Scaduto", color: "bg-gray-100 text-gray-500" },
};

export function DashboardContent() {
  const [tab, setTab] = useState<"lead" | "profilo">("lead");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users, label: "Lead totali", value: MOCK_STATS.lead_totali, color: "text-primary" },
          { icon: Send, label: "Questo mese", value: MOCK_STATS.lead_questo_mese, color: "text-blue-500" },
          { icon: Eye, label: "Visualizzazioni", value: MOCK_STATS.visualizzazioni, color: "text-purple-500" },
          { icon: TrendingUp, label: "Risposte", value: MOCK_STATS.risposte, color: "text-green-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-6 w-fit">
        <button
          onClick={() => setTab("lead")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "lead" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Lead ricevuti
        </button>
        <button
          onClick={() => setTab("profilo")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "profilo" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Il mio profilo
        </button>
      </div>

      {tab === "lead" && (
        <div className="space-y-4">
          {MOCK_LEAD.map((lead) => {
            const badge = STATO_BADGE[lead.stato] || STATO_BADGE.nuovo;
            return (
              <div key={lead.id} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-foreground text-lg">{lead.nome}</h3>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail size={14} /> {lead.email}</span>
                      {lead.telefono && <span className="flex items-center gap-1"><Phone size={14} /> {lead.telefono}</span>}
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(lead.created_at).toLocaleDateString("it-IT")}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-1">
                      <CheckCircle size={14} /> Rispondi
                    </button>
                    <button className="border border-border text-muted-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-1">
                      <XCircle size={14} /> Archivia
                    </button>
                  </div>
                </div>

                {/* Dettagli richiesta */}
                <div className="mt-4 pt-4 border-t border-border grid sm:grid-cols-4 gap-3 text-sm">
                  {lead.data_inizio && (
                    <div>
                      <span className="text-muted-foreground">Date:</span>{" "}
                      <span className="font-medium">{lead.data_inizio} → {lead.data_fine}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Animale:</span>{" "}
                    <span className="font-medium capitalize">{lead.tipo_animale} {lead.taglia ? `(${lead.taglia})` : ""}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Quanti:</span>{" "}
                    <span className="font-medium">{lead.numero_animali}</span>
                  </div>
                </div>

                {lead.note && (
                  <div className="mt-3 bg-muted rounded-xl p-3 text-sm text-foreground">
                    <span className="text-muted-foreground">Note:</span> {lead.note}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === "profilo" && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Il tuo profilo</h2>
          <p className="text-muted-foreground">
            Qui potrai modificare i dati della tua attivita, aggiornare foto, servizi e prezzi.
          </p>
          <div className="mt-6 p-8 bg-muted rounded-xl text-center text-muted-foreground">
            Editor profilo in arrivo — per ora modifica i dati contattando{" "}
            <a href="mailto:bau@mifidodite.eu" className="text-primary font-medium">bau@mifidodite.eu</a>
          </div>
        </div>
      )}
    </div>
  );
}
