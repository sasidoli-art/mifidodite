"use client";

import { useState } from "react";
import { Download, Shield, Search, Database } from "lucide-react";

const TABELLE = [
  { id: "newsletter", label: "Newsletter iscritti", desc: "Email, CAP, tipo animale" },
  { id: "lead", label: "Lead ricevuti", desc: "Richieste di disponibilita" },
  { id: "strutture", label: "Strutture/Professionisti", desc: "Tutti i profili" },
  { id: "articoli", label: "Articoli magazine", desc: "Contenuti editoriali" },
  { id: "eventi", label: "Eventi", desc: "Fiere, raduni, mostre" },
  { id: "cliniche", label: "Cliniche e rifugi", desc: "Strutture sanitarie" },
  { id: "offerte", label: "Offerte", desc: "Promozioni prodotti" },
  { id: "adozioni", label: "Annunci adozioni", desc: "Adotta/Offro/Cerco" },
  { id: "sos", label: "SOS Smarriti", desc: "Segnalazioni smarrimento" },
  { id: "codici", label: "Codici sconto", desc: "Codici promozionali" },
  { id: "agent_logs", label: "Log agenti AI", desc: "Esecuzioni cron" },
  { id: "social", label: "Post social", desc: "Bozze social media" },
];

export default function ExportPage() {
  const [emailSearch, setEmailSearch] = useState("");

  function downloadExport(table: string) {
    const params = new URLSearchParams({ table });
    if (emailSearch) params.set("email", emailSearch);
    window.open(`/api/admin/export?${params}`, "_blank");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Database size={24} className="text-primary" />
            Esportazione Dati
          </h1>
          <p className="text-sm text-muted-foreground">
            Per adempimenti GDPR (Art. 15 diritto di accesso) e richieste autorita di controllo
          </p>
        </div>
      </div>

      {/* Info GDPR */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Shield size={20} className="text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <strong>Art. 15 GDPR — Diritto di accesso:</strong> Se un utente chiede quali dati abbiamo su di lui,
          usa il filtro email per esportare solo i suoi dati. L&apos;esportazione deve essere fornita entro 30 giorni dalla richiesta.
        </div>
      </div>

      {/* Filtro per email specifica */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <label className="block text-sm font-semibold text-foreground mb-2">
          Cerca per email (Art. 15 — diritto di accesso specifico)
        </label>
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
            <Search size={16} className="text-muted-foreground" />
            <input type="email" placeholder="email@esempio.it" value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm" />
          </div>
          {emailSearch && (
            <button onClick={() => setEmailSearch("")} className="text-sm text-primary hover:underline">
              Resetta
            </button>
          )}
        </div>
        {emailSearch && (
          <p className="text-xs text-muted-foreground mt-2">
            L&apos;esportazione includera solo i record associati a &quot;{emailSearch}&quot;
          </p>
        )}
      </div>

      {/* Tabelle esportabili */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TABELLE.map((t) => (
          <button key={t.id} onClick={() => downloadExport(t.id)}
            className="bg-white rounded-xl p-4 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all text-left group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{t.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
              </div>
              <Download size={18} className="text-muted-foreground group-hover:text-primary shrink-0" />
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-8">
        I dati vengono esportati in formato JSON. Massimo 1.000 record per esportazione.
        Per dataset completi contattare l&apos;amministratore di sistema.
      </p>
    </div>
  );
}
