"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import { StrutturaCard } from "@/components/shared/StrutturaCard";
import { CATEGORIE_LABELS } from "@/lib/types";
import type { StrutturaCard as StrutturaCardType, CategoriaTipo } from "@/lib/types";

// Mock data — verra da Supabase
const MOCK_RESULTS: StrutturaCardType[] = [
  {
    id: "1",
    nome: "Pensione Il Rifugio di Fido",
    slug: "pensione-il-rifugio-di-fido-bergamo",
    descrizione: "Giardino recintato 2000mq, webcam 24h, veterinario convenzionato. Il tuo amico come a casa.",
    descrizione_storytelling: "Immagina un posto dove il tuo cane corre libero in un giardino enorme, sorvegliato da persone che lo amano quanto te...",
    categoria: "pensione",
    comune: "Bergamo",
    provincia: "BG",
    foto_copertina: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80",
    rating_medio: 4.8,
    numero_recensioni: 124,
    piano: "premium",
    in_evidenza: true,
    distanza_km: 2.3,
  },
  {
    id: "2",
    nome: "Sara — Dog Sitter Certificata",
    slug: "sara-dog-sitter-certificata-milano",
    descrizione: "A domicilio, passeggiate personalizzate, esperienza con cuccioli e cani anziani.",
    descrizione_storytelling: null,
    categoria: "dog_sitter",
    comune: "Milano",
    provincia: "MI",
    foto_copertina: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
    rating_medio: 4.9,
    numero_recensioni: 89,
    piano: "premium",
    in_evidenza: true,
    distanza_km: 5.1,
  },
  {
    id: "3",
    nome: "Toelettatura Zampe d'Oro",
    slug: "toelettatura-zampe-doro-roma",
    descrizione: "Stripping, taglio di razza, bagno ozono. Trattamenti delicati per ogni tipo di pelo.",
    descrizione_storytelling: null,
    categoria: "toelettatura",
    comune: "Roma",
    provincia: "RM",
    foto_copertina: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80",
    rating_medio: 4.7,
    numero_recensioni: 67,
    piano: "free",
    in_evidenza: false,
    distanza_km: 8.4,
  },
  {
    id: "4",
    nome: "Dott. Bianchi — Veterinario",
    slug: "dott-bianchi-veterinario-firenze",
    descrizione: "Specializzato in ortopedia e nutrizione. Clinica moderna, ambiente sereno per il tuo animale.",
    descrizione_storytelling: null,
    categoria: "veterinario",
    comune: "Firenze",
    provincia: "FI",
    foto_copertina: null,
    rating_medio: 4.6,
    numero_recensioni: 45,
    piano: "free",
    in_evidenza: false,
    distanza_km: 12.0,
  },
  {
    id: "5",
    nome: "Marco — Educatore Cinofilo",
    slug: "marco-educatore-cinofilo-torino",
    descrizione: "Metodo gentile, approccio positivo. Corsi individuali e di gruppo per cani di tutte le eta.",
    descrizione_storytelling: null,
    categoria: "educatore_cinofilo",
    comune: "Torino",
    provincia: "TO",
    foto_copertina: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    rating_medio: 4.5,
    numero_recensioni: 32,
    piano: "free",
    in_evidenza: false,
    distanza_km: 15.7,
  },
  {
    id: "6",
    nome: "PetPhoto Studio",
    slug: "petphoto-studio-napoli",
    descrizione: "Servizi fotografici professionali per cani e gatti. In studio o all'aperto.",
    descrizione_storytelling: null,
    categoria: "fotografo_pet",
    comune: "Napoli",
    provincia: "NA",
    foto_copertina: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&q=80",
    rating_medio: 4.9,
    numero_recensioni: 28,
    piano: "premium_plus",
    in_evidenza: true,
    distanza_km: 3.2,
  },
];

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
  const [results, setResults] = useState<StrutturaCardType[]>(MOCK_RESULTS);

  // Filtra mock in base alla categoria selezionata
  useEffect(() => {
    if (categoria) {
      setResults(MOCK_RESULTS.filter((s) => s.categoria === categoria));
    } else {
      setResults(MOCK_RESULTS);
    }
  }, [categoria]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // TODO: chiamata reale a Supabase cerca_strutture_vicine()
    if (categoria) {
      setResults(MOCK_RESULTS.filter((s) => s.categoria === categoria));
    } else {
      setResults(MOCK_RESULTS);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search header */}
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

        {/* Filtri espandibili */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Raggio:</label>
              <select
                value={raggio}
                onChange={(e) => setRaggio(Number(e.target.value))}
                className="px-3 py-2 rounded-lg bg-muted text-sm outline-none"
              >
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

      {/* Filtri attivi */}
      {categoria && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Filtri attivi:</span>
          <button
            onClick={() => setCategoria("")}
            className="flex items-center gap-1 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
          >
            {CATEGORIE_LABELS[categoria as CategoriaTipo]}
            <X size={14} />
          </button>
        </div>
      )}

      {/* Risultati */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {categoria
            ? CATEGORIE_LABELS[categoria as CategoriaTipo]
            : "Tutti i professionisti"}
        </h1>
        <span className="text-sm text-muted-foreground">
          {results.length} risultati
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((s) => (
          <StrutturaCard key={s.id} struttura={s} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Nessun risultato
          </h3>
          <p className="text-muted-foreground">
            Prova a cambiare i filtri o ad ampliare il raggio di ricerca.
          </p>
        </div>
      )}
    </div>
  );
}
