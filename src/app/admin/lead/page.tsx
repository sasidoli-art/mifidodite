"use client";

import { Mail, Phone, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";

const MOCK_LEAD = [
  { id: "l1", nome: "Laura Mantovani", email: "laura.m@email.it", telefono: "+39 333 111", struttura: "Pensione La Casa di Fido", data: "2026-04-04 10:30", stato: "nuovo", tipo_animale: "cane", note: "Cane Rex, taglia media" },
  { id: "l2", nome: "Marco Bianchi", email: "marco.b@email.it", telefono: "+39 333 222", struttura: "Toelettatura Zampe d'Oro", data: "2026-04-03 15:45", stato: "inviato", tipo_animale: "cane", note: null },
  { id: "l3", nome: "Giulia Tosi", email: "giulia.t@email.it", telefono: null, struttura: "Dog Hotel Villa Margherita", data: "2026-04-02 09:15", stato: "risposto", tipo_animale: "cane", note: "Periodo 1-7 maggio" },
  { id: "l4", nome: "Alessandro Verdi", email: "alex.v@email.it", telefono: "+39 333 444", struttura: "Sara Colombo — Dog Sitter", data: "2026-04-01 11:00", stato: "convertito", tipo_animale: "cane", note: "Weekend" },
  { id: "l5", nome: "Francesca Neri", email: "fra.n@email.it", telefono: null, struttura: "PawShot Fotografia", data: "2026-03-30 16:20", stato: "scaduto", tipo_animale: "gatto", note: "Servizio fotografico gatto persiano" },
];

const STATO_CONFIG: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  nuovo: { label: "Nuovo", color: "bg-blue-100 text-blue-700", icon: AlertCircle },
  inviato: { label: "Inviato", color: "bg-yellow-100 text-yellow-700", icon: Mail },
  risposto: { label: "Risposto", color: "bg-green-100 text-green-700", icon: CheckCircle },
  convertito: { label: "Convertito", color: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
  scaduto: { label: "Scaduto", color: "bg-gray-100 text-gray-500", icon: XCircle },
};

export default function AdminLeadPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lead Ricevuti</h1>
          <p className="text-sm text-muted-foreground">{MOCK_LEAD.length} lead totali</p>
        </div>
        <div className="flex gap-2">
          {Object.entries(STATO_CONFIG).map(([key, val]) => (
            <span key={key} className={`text-xs font-medium px-2.5 py-1 rounded-full ${val.color}`}>
              {val.label}: {MOCK_LEAD.filter((l) => l.stato === key).length}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-semibold">Richiedente</th>
              <th className="text-left p-4 font-semibold hidden md:table-cell">Struttura</th>
              <th className="text-left p-4 font-semibold hidden lg:table-cell">Note</th>
              <th className="text-center p-4 font-semibold">Stato</th>
              <th className="text-right p-4 font-semibold hidden sm:table-cell">Data</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LEAD.map((l) => {
              const stato = STATO_CONFIG[l.stato];
              return (
                <tr key={l.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-foreground">{l.nome}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail size={11} /> {l.email}</span>
                      {l.telefono && <span className="flex items-center gap-1"><Phone size={11} /> {l.telefono}</span>}
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{l.struttura}</td>
                  <td className="p-4 text-xs text-muted-foreground hidden lg:table-cell">{l.note || "—"}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stato.color}`}>
                      <stato.icon size={12} />
                      {stato.label}
                    </span>
                  </td>
                  <td className="p-4 text-right text-xs text-muted-foreground hidden sm:table-cell">
                    <span className="flex items-center justify-end gap-1"><Clock size={11} /> {l.data}</span>
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
