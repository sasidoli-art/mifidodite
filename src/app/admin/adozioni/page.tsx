"use client";

import { useState } from "react";
import { Check, X, Eye, AlertTriangle, Heart, HandHeart, Search } from "lucide-react";
import Link from "next/link";
import { ADOZIONI_SEED, formatEta } from "@/lib/adozioni-seed";

export default function AdminAdozioniPage() {
  const [filtroStato, setFiltroStato] = useState<"tutti" | "da_approvare" | "attivi">("da_approvare");

  // Simula annunci da approvare (tutti i seed sono "approvati", ne aggiungiamo di finti)
  const daApprovare = [
    { id: "pending1", titolo: "Cucciolo di Labrador cerca famiglia", specie: "cane", comune: "Parma", provincia: "PR", tipo: "adotta", created_at: "2026-04-04", nome_contatto: "Marco V.", approvato: false },
    { id: "pending2", titolo: "Gattina sterilizzata cerca casa", specie: "gatto", comune: "Lecce", provincia: "LE", tipo: "adotta", created_at: "2026-04-04", nome_contatto: "Ass. Gatti Liberi", approvato: false },
    { id: "pending3", titolo: "Cerco dog sitter per vacanza agosto", specie: "cane", comune: "Rimini", provincia: "RN", tipo: "cerco", created_at: "2026-04-03", nome_contatto: "Laura T.", approvato: false },
  ];

  const tutti = [
    ...daApprovare,
    ...ADOZIONI_SEED.map((a) => ({ ...a, approvato: true })),
  ];

  const filtrati = filtroStato === "da_approvare"
    ? tutti.filter((a) => !a.approvato)
    : filtroStato === "attivi"
    ? tutti.filter((a) => a.approvato)
    : tutti;

  const tipoIcon = { adotta: Heart, offro: HandHeart, cerco: Search };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestione Adozioni</h1>
          <p className="text-sm text-muted-foreground">{daApprovare.length} annunci in attesa di approvazione</p>
        </div>
      </div>

      {/* Filtri stato */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "da_approvare" as const, label: "Da approvare", count: daApprovare.length },
          { id: "attivi" as const, label: "Attivi", count: ADOZIONI_SEED.length },
          { id: "tutti" as const, label: "Tutti", count: tutti.length },
        ].map((f) => (
          <button key={f.id} onClick={() => setFiltroStato(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filtroStato === f.id ? "bg-primary text-white" : "bg-white text-foreground hover:bg-muted"
            }`}>
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Lista annunci */}
      <div className="space-y-3">
        {filtrati.map((a) => {
          const Icon = tipoIcon[a.tipo as keyof typeof tipoIcon] || Heart;
          return (
            <div key={a.id} className={`bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 ${!a.approvato ? "border-l-4 border-l-amber-400" : ""}`}>
              <Icon size={20} className={a.tipo === "adotta" ? "text-red-400" : a.tipo === "offro" ? "text-primary" : "text-accent"} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-foreground truncate">{a.titolo}</p>
                  {!a.approvato && (
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle size={10} /> Da approvare
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {a.comune} ({a.provincia}) — {a.nome_contatto} — {a.created_at}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {"slug" in a && (
                  <Link href={`/adozioni/${a.slug}`} className="p-2 hover:bg-muted rounded-lg" title="Vedi">
                    <Eye size={16} className="text-muted-foreground" />
                  </Link>
                )}
                {!a.approvato && (
                  <>
                    <button className="p-2 hover:bg-green-50 rounded-lg" title="Approva">
                      <Check size={16} className="text-green-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg" title="Rifiuta">
                      <X size={16} className="text-red-400" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
