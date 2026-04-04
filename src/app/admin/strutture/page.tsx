"use client";

import { useState } from "react";
import { Search, Check, X, Eye, Edit, Trash2, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";
import { PROFESSIONISTI_SEED } from "@/lib/professionisti-seed";
import { CATEGORIE_LABELS } from "@/lib/types";
import type { CategoriaTipo } from "@/lib/types";

export default function AdminStrutturePage() {
  const [search, setSearch] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const strutture = PROFESSIONISTI_SEED.filter((s) => {
    if (search && !s.nome.toLowerCase().includes(search.toLowerCase()) && !s.comune.toLowerCase().includes(search.toLowerCase())) return false;
    if (filtroCategoria && s.categoria !== filtroCategoria) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Strutture e Professionisti</h1>
          <p className="text-sm text-muted-foreground">{strutture.length} risultati</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors">
          + Aggiungi manualmente
        </button>
      </div>

      {/* Filtri */}
      <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap gap-3 shadow-sm">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
          <Search size={16} className="text-muted-foreground" />
          <input type="text" placeholder="Cerca per nome o comune..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}
          className="px-3 py-2 rounded-lg bg-muted text-sm outline-none cursor-pointer">
          <option value="">Tutte le categorie</option>
          {Object.entries(CATEGORIE_LABELS).map(([val, lab]) => (
            <option key={val} value={val}>{lab}</option>
          ))}
        </select>
      </div>

      {/* Tabella */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-semibold text-foreground">Nome</th>
              <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">Categoria</th>
              <th className="text-left p-4 font-semibold text-foreground hidden sm:table-cell">Comune</th>
              <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">Piano</th>
              <th className="text-center p-4 font-semibold text-foreground hidden lg:table-cell">Rating</th>
              <th className="text-center p-4 font-semibold text-foreground hidden lg:table-cell">Lead</th>
              <th className="text-right p-4 font-semibold text-foreground">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {strutture.map((s) => (
              <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {s.foto_copertina ? (
                      <img src={s.foto_copertina} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">🐾</div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground">{s.nome}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">{s.comune} ({s.provincia})</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {CATEGORIE_LABELS[s.categoria as CategoriaTipo]}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground hidden sm:table-cell">{s.comune} ({s.provincia})</td>
                <td className="p-4 hidden lg:table-cell">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    s.piano === "premium_plus" ? "bg-foreground text-white" :
                    s.piano === "premium" ? "bg-primary text-white" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {s.piano === "premium_plus" ? "TOP" : s.piano === "premium" ? "PRO" : "FREE"}
                  </span>
                </td>
                <td className="p-4 text-center hidden lg:table-cell">
                  <span className="font-semibold">{s.rating_medio}</span>
                  <span className="text-xs text-muted-foreground ml-1">({s.numero_recensioni})</span>
                </td>
                <td className="p-4 text-center hidden lg:table-cell text-muted-foreground">—</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/struttura/${s.slug}`} className="p-2 hover:bg-muted rounded-lg transition-colors" title="Vedi">
                      <Eye size={16} className="text-muted-foreground" />
                    </Link>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Modifica">
                      <Edit size={16} className="text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Elimina">
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
