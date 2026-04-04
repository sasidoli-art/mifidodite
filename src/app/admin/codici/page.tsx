"use client";

import { useState } from "react";
import { Plus, Copy, Check, Crown, Tag, Users, Zap, Gift, Shield, Trash2 } from "lucide-react";

// Mock — verra da Supabase
interface MockCodice {
  id: string;
  codice: string;
  tipo: string;
  bypass: boolean;
  piano: string;
  mesi_gratis: number;
  sconto: number;
  referente: string;
  utilizzi: number;
  max: number | null;
  attivo: boolean;
}

const MOCK_CODICI: MockCodice[] = [
  { id: "1", codice: "VIP-ADMIN", tipo: "vip", bypass: true, piano: "top", mesi_gratis: 0, sconto: 0, referente: "Admin", utilizzi: 0, max: 1, attivo: true },
  { id: "2", codice: "VIP-TESTER", tipo: "vip", bypass: true, piano: "top", mesi_gratis: 0, sconto: 0, referente: "Tester", utilizzi: 2, max: 5, attivo: true },
  { id: "3", codice: "BENVENUTO", tipo: "lancio", bypass: false, piano: "", mesi_gratis: 1, sconto: 0, referente: "Sistema", utilizzi: 47, max: 0, attivo: true },
  { id: "4", codice: "LANCIO", tipo: "lancio", bypass: false, piano: "", mesi_gratis: 0, sconto: 50, referente: "Sistema", utilizzi: 23, max: 500, attivo: true },
  { id: "5", codice: "FIERA2026", tipo: "lancio", bypass: false, piano: "", mesi_gratis: 1, sconto: 0, referente: "Sistema", utilizzi: 0, max: 200, attivo: true },
  { id: "6", codice: "SARA-BG-2026", tipo: "referral", bypass: false, piano: "", mesi_gratis: 0, sconto: 50, referente: "Sara Colombo", utilizzi: 4, max: 0, attivo: true },
  { id: "7", codice: "MARCO-MI-2026", tipo: "referral", bypass: false, piano: "", mesi_gratis: 0, sconto: 50, referente: "Marco Ferri", utilizzi: 7, max: 0, attivo: true },
];

const TIPO_CONFIG: Record<string, { label: string; icon: typeof Crown; color: string; bg: string }> = {
  vip: { label: "VIP", icon: Crown, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  lancio: { label: "Lancio", icon: Zap, color: "text-primary", bg: "bg-orange-50 border-orange-200" },
  referral: { label: "Referral", icon: Users, color: "text-accent", bg: "bg-blue-50 border-blue-200" },
  sconto: { label: "Sconto", icon: Tag, color: "text-secondary", bg: "bg-green-50 border-green-200" },
};

export default function AdminCodiciPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  function copyCode(codice: string) {
    navigator.clipboard.writeText(codice);
    setCopied(codice);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Codici Sconto e VIP</h1>
          <p className="text-sm text-muted-foreground">Gestisci codici promozionali, referral e accessi VIP</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Nuovo codice
        </button>
      </div>

      {/* Form creazione rapida */}
      {showCreate && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6 border border-border">
          <h3 className="font-bold text-foreground mb-4">Crea nuovo codice</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Codice</label>
              <input type="text" placeholder="VIP-NOME" className="w-full px-3 py-2 rounded-lg border border-border text-sm outline-none uppercase" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Tipo</label>
              <select className="w-full px-3 py-2 rounded-lg border border-border text-sm outline-none">
                <option value="vip">VIP (bypass pagamento)</option>
                <option value="lancio">Lancio (promozione)</option>
                <option value="sconto">Sconto %</option>
                <option value="referral">Referral</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Per chi</label>
              <input type="text" placeholder="Nome referente" className="w-full px-3 py-2 rounded-lg border border-border text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Max utilizzi</label>
              <input type="number" placeholder="Illimitato" className="w-full px-3 py-2 rounded-lg border border-border text-sm outline-none" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">Crea codice</button>
            <button onClick={() => setShowCreate(false)} className="text-muted-foreground px-4 py-2 text-sm">Annulla</button>
          </div>
        </div>
      )}

      {/* Stats rapide */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Codici VIP attivi", value: MOCK_CODICI.filter(c => c.tipo === "vip").length, icon: Crown, color: "text-amber-500" },
          { label: "Codici lancio", value: MOCK_CODICI.filter(c => c.tipo === "lancio").length, icon: Zap, color: "text-primary" },
          { label: "Referral attivi", value: MOCK_CODICI.filter(c => c.tipo === "referral").length, icon: Users, color: "text-accent" },
          { label: "Totale utilizzi", value: MOCK_CODICI.reduce((a, c) => a + c.utilizzi, 0), icon: Gift, color: "text-secondary" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <s.icon size={18} className={s.color} />
              <span className="text-2xl font-bold text-foreground">{s.value}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Lista codici */}
      <div className="space-y-3">
        {MOCK_CODICI.map((c) => {
          const config = TIPO_CONFIG[c.tipo] || TIPO_CONFIG.sconto;
          return (
            <div key={c.id} className={`bg-white rounded-xl p-5 shadow-sm border ${
              c.tipo === "vip" ? "border-l-4 border-l-amber-400" : ""
            }`}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  {/* Codice con bottone copia */}
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-4 py-2 rounded-lg text-sm font-mono font-bold text-foreground tracking-wider">
                      {c.codice}
                    </code>
                    <button
                      onClick={() => copyCode(c.codice)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Copia codice"
                    >
                      {copied === c.codice ? (
                        <Check size={14} className="text-secondary" />
                      ) : (
                        <Copy size={14} className="text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  {/* Badge tipo */}
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${config.bg} ${config.color} flex items-center gap-1`}>
                    <config.icon size={12} />
                    {config.label}
                  </span>

                  {/* Bypass badge */}
                  {"bypass" in c && c.bypass && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                      <Shield size={12} /> Bypass pagamento
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>di <strong className="text-foreground">{c.referente}</strong></span>
                  <span>
                    Usato <strong className="text-foreground">{c.utilizzi}</strong>
                    {c.max ? `/${c.max}` : ""} volte
                  </span>
                  <button className="p-2 hover:bg-red-50 rounded-lg" title="Disattiva">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>

              {/* Dettagli */}
              <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                {c.mesi_gratis > 0 && (
                  <span>🎁 {c.mesi_gratis} mese gratis</span>
                )}
                {c.sconto > 0 && (
                  <span>💰 {c.sconto}% di sconto</span>
                )}
                {c.piano && (
                  <span>👑 Piano {c.piano} incluso</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
