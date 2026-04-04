"use client";

import { Mail, Users, TrendingUp, Send, Eye, Calendar } from "lucide-react";

const STATS_NL = [
  { label: "Iscritti totali", value: "4.832", icon: Users, color: "text-green-500" },
  { label: "Tasso apertura medio", value: "38%", icon: Eye, color: "text-blue-500" },
  { label: "Inviate questo mese", value: "3", icon: Send, color: "text-primary" },
  { label: "Prossimo invio", value: "Lunedi 8:00", icon: Calendar, color: "text-purple-500" },
];

const INVII_RECENTI = [
  { data: "31 Mar 2026", oggetto: "Novita pet vicino a te", inviati: 4200, aperture: "38%", click: "12%" },
  { data: "24 Mar 2026", oggetto: "Nuove spiagge dog-friendly!", inviati: 4050, aperture: "42%", click: "15%" },
  { data: "17 Mar 2026", oggetto: "5 pensioni top vicino a te", inviati: 3890, aperture: "35%", click: "10%" },
  { data: "10 Mar 2026", oggetto: "Guida: come scegliere il dog sitter", inviati: 3750, aperture: "41%", click: "18%" },
];

export default function AdminNewsletterPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Newsletter</h1>
          <p className="text-sm text-muted-foreground">Gestione iscritti e invii settimanali</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2">
          <Send size={16} /> Invia newsletter ora
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS_NL.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Storico invii */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-foreground">Storico invii</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-semibold">Data</th>
              <th className="text-left p-4 font-semibold">Oggetto</th>
              <th className="text-center p-4 font-semibold hidden sm:table-cell">Inviati</th>
              <th className="text-center p-4 font-semibold hidden md:table-cell">Aperture</th>
              <th className="text-center p-4 font-semibold hidden lg:table-cell">Click</th>
            </tr>
          </thead>
          <tbody>
            {INVII_RECENTI.map((inv, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-4 text-muted-foreground">{inv.data}</td>
                <td className="p-4 font-medium text-foreground">{inv.oggetto}</td>
                <td className="p-4 text-center hidden sm:table-cell">{inv.inviati.toLocaleString()}</td>
                <td className="p-4 text-center hidden md:table-cell">
                  <span className="text-green-600 font-semibold">{inv.aperture}</span>
                </td>
                <td className="p-4 text-center hidden lg:table-cell">
                  <span className="text-blue-500 font-semibold">{inv.click}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
