"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, SlidersHorizontal, X, ExternalLink, Phone, Globe, Navigation } from "lucide-react";
import { StrutturaCard } from "@/components/shared/StrutturaCard";
import { CATEGORIE_LABELS } from "@/lib/types";
import type { StrutturaCard as StrutturaCardType, CategoriaTipo } from "@/lib/types";

const CATEGORIE_OPTIONS = Object.entries(CATEGORIE_LABELS).map(([value, label]) => ({ value, label }));

interface OSMPlace {
  id: string;
  nome: string;
  categoria: string;
  lat: number;
  lon: number;
  indirizzo: string | null;
  cap: string | null;
  comune: string | null;
  telefono: string | null;
  email: string | null;
  website: string | null;
  orari: string | null;
  osm_url: string;
}

// Categorie supportate da OSM
const OSM_SUPPORTED = new Set(["veterinario", "toelettatura", "pensione"]);

// Keyword di ricerca per categoria — usate per costruire query verso i siti esterni
const CATEGORIE_KEYWORDS: Record<string, string> = {
  pensione: "pensione cani gatti",
  hotel_pet_friendly: "hotel pet friendly",
  spiaggia_dog_friendly: "spiagge dog friendly",
  toelettatura: "toelettatura cani",
  dog_sitter: "dog sitter",
  cat_sitter: "cat sitter",
  educatore_cinofilo: "educatore cinofilo",
  veterinario: "veterinario",
  fotografo_pet: "fotografo pet",
  groomer: "toelettatura cani",
  dog_walking: "dog walking",
  pet_taxi: "pet taxi",
  altro: "servizi pet",
};

function buildExternalLinks(query: string, categoria: string) {
  const keyword = CATEGORIE_KEYWORDS[categoria] || "servizi pet";
  const luogo = query?.trim() || "Italia";
  const fullQuery = `${keyword} ${luogo}`;
  return {
    google: `https://www.google.com/maps/search/${encodeURIComponent(fullQuery)}`,
    paginegialle: `https://www.paginegialle.it/ricerca/${encodeURIComponent(keyword)}/${encodeURIComponent(luogo)}`,
    subito: `https://www.subito.it/annunci-italia/vendita/usato/?q=${encodeURIComponent(fullQuery)}`,
  };
}

export function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [categoria, setCategoria] = useState(searchParams.get("cat") || "");
  const [raggio, setRaggio] = useState(30);
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<StrutturaCardType[]>([]);
  const [osmResults, setOsmResults] = useState<OSMPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOSM, setLoadingOSM] = useState(false);

  useEffect(() => {
    fetchResults();
  }, [categoria]);

  async function fetchResults() {
    setLoading(true);
    setOsmResults([]);
    try {
      const params = new URLSearchParams();
      if (categoria) params.set("cat", categoria);
      if (query) params.set("q", query);
      const res = await fetch(`/api/strutture?${params}`);
      const data = await res.json();
      setResults(data);

      // Se DB vuoto + citta → fetch OSM (con categoria specifica o tutte)
      if (data.length === 0 && query) {
        if (categoria && OSM_SUPPORTED.has(categoria)) {
          await fetchOSM(categoria);
        } else if (!categoria) {
          // Senza categoria: cerca su tutte quelle supportate
          await fetchOSMAll();
        }
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchOSM(cat: string) {
    setLoadingOSM(true);
    try {
      const params = new URLSearchParams();
      params.set("categoria", cat);
      params.set("citta", query);
      params.set("limit", "30");
      const res = await fetch(`/api/osm?${params}`);
      const data = await res.json();
      if (data.places) setOsmResults(data.places);
    } catch (err) {
      console.error("OSM fetch error:", err);
    } finally {
      setLoadingOSM(false);
    }
  }

  async function fetchOSMAll() {
    setLoadingOSM(true);
    try {
      // Cerca su tutte le categorie supportate da OSM in parallelo
      const cats = Array.from(OSM_SUPPORTED);
      const promises = cats.map((c) => {
        const p = new URLSearchParams();
        p.set("categoria", c);
        p.set("citta", query);
        p.set("limit", "10");
        return fetch(`/api/osm?${p}`).then((r) => r.json()).catch(() => null);
      });
      const results = await Promise.all(promises);
      const allPlaces = results.flatMap((r) => (r?.places as OSMPlace[]) || []);
      setOsmResults(allPlaces);
    } catch (err) {
      console.error("OSM fetch all error:", err);
    } finally {
      setLoadingOSM(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchResults();
  }

  return (
    <div className="max-w-[1160px] mx-auto px-6 py-8">
      <div className="bg-white rounded-[20px] border border-border p-5 sm:p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-4 py-3.5 rounded-full bg-muted/60 border border-border">
            <MapPin size={18} className="text-muted-foreground shrink-0" />
            <input type="text" placeholder="CAP o comune..." value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm" />
          </div>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
            className="px-4 py-3.5 rounded-full bg-muted/60 border border-border text-foreground outline-none cursor-pointer text-sm">
            <option value="">Tutte le categorie</option>
            {CATEGORIE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button type="submit"
            className="bg-primary hover:bg-foreground text-white px-8 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm">
            <Search size={18} /> Cerca
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

      {/* Risultati da OpenStreetMap (quando il DB e vuoto) */}
      {!loading && results.length === 0 && (osmResults.length > 0 || loadingOSM) && (
        <div className="mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <MapPin size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900">Risultati da OpenStreetMap</p>
              <p className="text-blue-800 mt-0.5">
                Mostriamo {osmResults.length > 0 ? `${osmResults.length} ` : ""}attivita reali da OpenStreetMap, la mappa libera del mondo. I dati possono essere incompleti — se sei il titolare,{" "}
                <a href="/registra-attivita" className="underline font-semibold">registrati gratis</a> per gestire la tua scheda.
              </p>
            </div>
          </div>

          {loadingOSM && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
              <p className="text-muted-foreground text-sm mt-2">Caricamento da OpenStreetMap...</p>
            </div>
          )}

          {osmResults.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {osmResults.map((p) => <OSMCard key={p.id} place={p} />)}
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center mt-6">
            Dati © OpenStreetMap contributors, licenza ODbL
          </p>
        </div>
      )}

      {!loading && results.length === 0 && osmResults.length === 0 && !loadingOSM && (() => {
        const links = buildExternalLinks(query, categoria);
        const categoriaLabel = categoria ? CATEGORIE_LABELS[categoria as CategoriaTipo] : "professionisti pet";
        return (
          <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Stiamo costruendo la community</h3>
              <p className="text-muted-foreground">
                MifidoDiTe.eu sta crescendo. Nel frattempo puoi cercare {categoriaLabel.toLowerCase()}{query ? ` a ${query}` : ""} sui principali portali italiani:
              </p>
            </div>

            {/* Link esterni — Google, PagineGialle, Subito */}
            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              <a href={links.google} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-5 bg-white border-2 border-border hover:border-primary hover:shadow-md rounded-2xl transition-all group">
                <div className="text-2xl">🗺️</div>
                <span className="font-semibold text-foreground group-hover:text-primary">Google Maps</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">Apri ricerca <ExternalLink size={11} /></span>
              </a>
              <a href={links.paginegialle} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-5 bg-white border-2 border-border hover:border-primary hover:shadow-md rounded-2xl transition-all group">
                <div className="text-2xl">📞</div>
                <span className="font-semibold text-foreground group-hover:text-primary">PagineGialle</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">Apri ricerca <ExternalLink size={11} /></span>
              </a>
              <a href={links.subito} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-5 bg-white border-2 border-border hover:border-primary hover:shadow-md rounded-2xl transition-all group">
                <div className="text-2xl">📋</div>
                <span className="font-semibold text-foreground group-hover:text-primary">Subito.it</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">Apri ricerca <ExternalLink size={11} /></span>
              </a>
            </div>

            {/* CTA professionisti */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center border border-amber-200">
              <p className="text-sm text-foreground font-semibold mb-2">Sei un professionista del mondo pet?</p>
              <p className="text-sm text-muted-foreground mb-4">
                Registra la tua attivita gratis su MifidoDiTe.eu con il codice invito e fatti trovare dai proprietari della tua zona.
              </p>
              <a href="/registra-attivita" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                Registra la tua attivita
              </a>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// Card per risultati OpenStreetMap
function OSMCard({ place: p }: { place: OSMPlace }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lon}`;
  return (
    <div className="bg-white rounded-[20px] border border-border overflow-hidden card-hover p-5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-foreground leading-snug flex-1">{p.nome}</h3>
        <span className="text-xs bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-full shrink-0">OSM</span>
      </div>

      {p.indirizzo && (
        <p className="text-sm text-muted-foreground flex items-start gap-1 mb-1">
          <MapPin size={13} className="mt-0.5 shrink-0" />
          <span>
            {p.indirizzo}
            {p.cap && p.comune ? <><br />{p.cap} {p.comune}</> : p.comune ? <><br />{p.comune}</> : null}
          </span>
        </p>
      )}

      {p.orari && (
        <p className="text-xs text-muted-foreground mt-2 line-clamp-1">Orari: {p.orari}</p>
      )}

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        {p.telefono && (
          <a href={`tel:${p.telefono}`} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-full font-semibold transition-colors">
            <Phone size={12} /> Chiama
          </a>
        )}
        {p.website && (
          <a href={p.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-muted hover:bg-border text-foreground px-3 py-1.5 rounded-full font-semibold transition-colors">
            <Globe size={12} /> Sito
          </a>
        )}
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-muted hover:bg-border text-foreground px-3 py-1.5 rounded-full font-semibold transition-colors">
          <Navigation size={12} /> Mappa
        </a>
      </div>
    </div>
  );
}
