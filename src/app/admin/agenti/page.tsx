"use client";

import { Bot, Search, Pen, Share2, Mail, Eye, Clock, AlertTriangle, CheckCircle, XCircle, RefreshCw, DollarSign } from "lucide-react";

// Mock logs — verranno dal DB tabella agent_logs
const MOCK_LOGS = [
  { id: "1", agente: "scraper", stato: "ok", citta: "Milano (MI)", trovati: 12, salvati: 8, errori: 0, durata: 45200, costo: 0.0032, data: "2026-04-04 07:00" },
  { id: "2", agente: "writer", stato: "ok", citta: null, trovati: 2, salvati: 2, errori: 0, durata: 28100, costo: 0.0045, data: "2026-04-04 07:01" },
  { id: "3", agente: "scraper", stato: "parziale", citta: "Roma (RM)", trovati: 5, salvati: 3, errori: 2, durata: 38400, costo: 0.0028, data: "2026-04-03 07:00" },
  { id: "4", agente: "social", stato: "ok", citta: null, trovati: 4, salvati: 0, errori: 0, durata: 12300, costo: 0.0018, data: "2026-04-03 07:01" },
  { id: "5", agente: "scraper", stato: "ok", citta: "Torino (TO)", trovati: 9, salvati: 7, errori: 0, durata: 41000, costo: 0.0030, data: "2026-04-02 07:00" },
  { id: "6", agente: "outreach", stato: "ok", citta: null, trovati: 10, salvati: 6, errori: 0, durata: 52000, costo: 0.0022, data: "2026-04-01 07:01" },
  { id: "7", agente: "scraper", stato: "errore", citta: "Napoli (NA)", trovati: 0, salvati: 0, errori: 7, durata: 15000, costo: 0.0010, data: "2026-03-31 07:00" },
  { id: "8", agente: "monitor", stato: "parziale", citta: null, trovati: 8, salvati: 2, errori: 0, durata: 33000, costo: 0.0025, data: "2026-03-30 07:00" },
  { id: "9", agente: "writer", stato: "ok", citta: null, trovati: 2, salvati: 2, errori: 0, durata: 26000, costo: 0.0040, data: "2026-03-29 07:00" },
  { id: "10", agente: "scraper", stato: "ok", citta: "Bologna (BO)", trovati: 11, salvati: 9, errori: 0, durata: 43000, costo: 0.0035, data: "2026-03-28 07:00" },
];

const AGENTI_CONFIG: Record<string, { label: string; icon: typeof Bot; color: string }> = {
  scraper: { label: "Scraper", icon: Search, color: "text-primary" },
  writer: { label: "Writer", icon: Pen, color: "text-blue-500" },
  social: { label: "Social", icon: Share2, color: "text-pink-500" },
  outreach: { label: "Outreach", icon: Mail, color: "text-green-500" },
  monitor: { label: "Monitor", icon: Eye, color: "text-purple-500" },
};

const STATO_ICON = {
  ok: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
  parziale: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50" },
  errore: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
};

export default function AdminAgentiPage() {
  const costoTotale = MOCK_LOGS.reduce((sum, l) => sum + l.costo, 0);
  const esecuzioniOk = MOCK_LOGS.filter((l) => l.stato === "ok").length;
  const esecuzioniErrore = MOCK_LOGS.filter((l) => l.stato === "errore").length;
  const totaleSalvati = MOCK_LOGS.reduce((sum, l) => sum + l.salvati, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bot size={24} className="text-primary" />
            Agenti AI
          </h1>
          <p className="text-sm text-muted-foreground">Monitoraggio esecuzioni e performance</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2">
          <RefreshCw size={16} /> Esegui ora
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {Object.entries(AGENTI_CONFIG).map(([key, config]) => {
          const logs = MOCK_LOGS.filter((l) => l.agente === key);
          const ultimo = logs[0];
          const ultimoStato = ultimo ? STATO_ICON[ultimo.stato as keyof typeof STATO_ICON] : null;

          return (
            <div key={key} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <config.icon size={18} className={config.color} />
                <span className="font-bold text-foreground text-sm">{config.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {ultimoStato && <ultimoStato.icon size={14} className={ultimoStato.color} />}
                <span className="text-xs text-muted-foreground">
                  {ultimo ? `Ultimo: ${ultimo.data.split(" ")[0]}` : "Mai eseguito"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {logs.length} esecuzioni totali
              </p>
            </div>
          );
        })}
      </div>

      {/* Riepilogo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Esecuzioni OK</p>
          <p className="text-2xl font-bold text-green-600">{esecuzioniOk}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Errori</p>
          <p className="text-2xl font-bold text-red-500">{esecuzioniErrore}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Record salvati</p>
          <p className="text-2xl font-bold text-foreground">{totaleSalvati}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Costo totale stimato</p>
          <p className="text-2xl font-bold text-foreground flex items-center gap-1">
            <DollarSign size={18} />
            {costoTotale.toFixed(4)}
          </p>
        </div>
      </div>

      {/* Log dettagliato */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-foreground">Log esecuzioni</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-semibold">Data</th>
              <th className="text-left p-3 font-semibold">Agente</th>
              <th className="text-center p-3 font-semibold">Stato</th>
              <th className="text-left p-3 font-semibold hidden md:table-cell">Dettaglio</th>
              <th className="text-center p-3 font-semibold hidden sm:table-cell">Trovati</th>
              <th className="text-center p-3 font-semibold hidden sm:table-cell">Salvati</th>
              <th className="text-right p-3 font-semibold hidden lg:table-cell">Durata</th>
              <th className="text-right p-3 font-semibold hidden lg:table-cell">Costo</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LOGS.map((log) => {
              const agente = AGENTI_CONFIG[log.agente];
              const stato = STATO_ICON[log.stato as keyof typeof STATO_ICON];

              return (
                <tr key={log.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-3 text-muted-foreground text-xs">
                    <Clock size={11} className="inline mr-1" />
                    {log.data}
                  </td>
                  <td className="p-3">
                    <span className={`flex items-center gap-1.5 font-medium ${agente.color}`}>
                      <agente.icon size={14} />
                      {agente.label}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${stato.bg} ${stato.color}`}>
                      <stato.icon size={11} />
                      {log.stato}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs hidden md:table-cell">
                    {log.citta || "—"}
                  </td>
                  <td className="p-3 text-center font-medium hidden sm:table-cell">{log.trovati}</td>
                  <td className="p-3 text-center font-medium hidden sm:table-cell">{log.salvati}</td>
                  <td className="p-3 text-right text-muted-foreground text-xs hidden lg:table-cell">
                    {(log.durata / 1000).toFixed(1)}s
                  </td>
                  <td className="p-3 text-right text-muted-foreground text-xs hidden lg:table-cell">
                    ${log.costo.toFixed(4)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
