"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import { StrutturaCard } from "@/components/shared/StrutturaCard";
import { CATEGORIE_LABELS } from "@/lib/types";
import type { StrutturaCard as StrutturaCardType, CategoriaTipo } from "@/lib/types";

const CATEGORIE_OPTIONS = Object.entries(CATEGORIE_LABELS).map(([value, label]) => ({ value, label }));

export function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [categoria, setCategoria] = useState(searchParams.get("cat") || "");
  const [raggio, setRaggio] = useState(30);
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<StrutturaCardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [categoria]);

  async function fetchResults() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoria) params.set("cat", categoria);
      if (query) params.set("q", query);
      const res = await fetch(`/api/strutture?${params}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchResults();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-muted">
            <MapPin size={20} className="text-muted-foreground shrink-0" />
            <input type="text" placeholder="CAP o comune..." value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
          </div>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
            className="px-4 py-3 rounded-xl bg-muted text-foreground outline-none cursor-pointer">
            <option value="">Tutte le categorie</option>
            {CATEGORIE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
            <Search size={20} /> Cerca
          </button>
          <button type="button" onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-2">
            <SlidersHorizontal size={18} />
          </button>
        </form>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Raggio:</label>
              <select value={raggio} onChange={(e) => setRaggio(Number(e.target.value))}
                className="px-3 py-2 rounded-lg bg-muted text-sm outline-none">
                <option value={5}>5 km</option><option value={10}>10 km</option>
                <option value={20}>20 km</option><option value={30}>30 km</option>
                <option value={50}>50 km</option><option value={100}>100 km</option>
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
            {CATEGORIE_LABELS[categoria as CategoriaTipo]} <X size={14} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {categoria ? CATEGORIE_LABELS[categoria as CategoriaTipo] : "Tutti i professionisti"}
        </h1>
        <span className="text-sm text-muted-foreground">{results.length} risultati</span>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
              <div className="h-48 bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((s) => (
            <StrutturaCard key={s.id} struttura={s} />
          ))}
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="text-center py-20 max-w-xl mx-auto">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-xl font-bold text-foreground mb-2">Stiamo costruendo la community</h3>
          <p className="text-muted-foreground mb-6">
            MifidoDiTe.eu sta crescendo. Le prime attivita registrate appariranno presto qui.
            Sei un professionista del mondo pet? Registrati gratis con il codice invito.
          </p>
          <a href="/registra-attivita" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            Registra la tua attivita
          </a>
        </div>
      )}
    </div>
  );
}
