"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import { StrutturaCard } from "@/components/shared/StrutturaCard";
import { CATEGORIE_LABELS } from "@/lib/types";
import type { StrutturaCard as StrutturaCardType, CategoriaTipo } from "@/lib/types";
import { PROFESSIONISTI_SEED } from "@/lib/professionisti-seed";

const ALL_DATA = PROFESSIONISTI_SEED;

const CATEGORIE_OPTIONS = Object.entries(CATEGORIE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [categoria, setCategoria] = useState(searchParams.get("cat") || "");
  const [raggio, setRaggio] = useState(30);
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<StrutturaCardType[]>(ALL_DATA);

  useEffect(() => {
    let filtered = ALL_DATA;
    if (categoria) {
      filtered = filtered.filter((s) => s.categoria === categoria);
    }
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.comune.toLowerCase().includes(q) ||
          s.provincia?.toLowerCase().includes(q) ||
          s.nome.toLowerCase().includes(q)
      );
    }
    setResults(filtered);
  }, [categoria, query]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-muted">
            <MapPin size={20} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="CAP, comune o provincia..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="px-4 py-3 rounded-xl bg-muted text-foreground outline-none cursor-pointer"
          >
            <option value="">Tutte le categorie</option>
            {CATEGORIE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Search size={20} />
            Cerca
          </button>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-2"
          >
            <SlidersHorizontal size={18} />
            <span className="sm:hidden lg:inline">Filtri</span>
          </button>
        </form>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Raggio:</label>
              <select value={raggio} onChange={(e) => setRaggio(Number(e.target.value))}
                className="px-3 py-2 rounded-lg bg-muted text-sm outline-none">
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={20}>20 km</option>
                <option value={30}>30 km</option>
                <option value={50}>50 km</option>
                <option value={100}>100 km</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Ordina per:</label>
              <select className="px-3 py-2 rounded-lg bg-muted text-sm outline-none">
                <option>Distanza</option>
                <option>Recensioni</option>
                <option>Rating</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Animale:</label>
              <select className="px-3 py-2 rounded-lg bg-muted text-sm outline-none">
                <option value="">Tutti</option>
                <option value="cane">Cane</option>
                <option value="gatto">Gatto</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {categoria && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Filtri attivi:</span>
          <button onClick={() => setCategoria("")}
            className="flex items-center gap-1 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full hover:bg-primary/20 transition-colors">
            {CATEGORIE_LABELS[categoria as CategoriaTipo]}
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {categoria ? CATEGORIE_LABELS[categoria as CategoriaTipo] : "Tutti i professionisti"}
        </h1>
        <span className="text-sm text-muted-foreground">{results.length} risultati</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((s) => (
          <StrutturaCard key={s.id} struttura={s} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-xl font-bold text-foreground mb-2">Nessun risultato</h3>
          <p className="text-muted-foreground">Prova a cambiare i filtri o ad ampliare il raggio di ricerca.</p>
        </div>
      )}
    </div>
  );
}
