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
    <div>
      {/* Hero scuro con ricerca integrata */}
      <section className="bg-foreground py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
        <div className="max-w-[1160px] mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Cerca <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">professionisti pet</span>
            </h1>
            <p className="mt-3 text-white/50 text-base sm:text-lg max-w-xl mx-auto">
              Veterinari, pensioni, toelettatori e molto altro nella tua zona. Dati reali da OpenStreetMap.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
              <MapPin size={18} className="text-white/40 shrink-0" />
              <input type="text" placeholder="CAP o comune..." value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm" />
            </div>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
              className="px-5 py-3.5 rounded-full bg-white/10 border border-white/10 text-white/80 outline-none cursor-pointer text-sm backdrop-blur-sm [&>option]:text-foreground [&>option]:bg-white">
              <option value="">Tutte le categorie</option>
              {CATEGORIE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button type="submit"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg text-sm">
              <Search size={18} /> Cerca
            </button>
          </form>
        </div>
      </section>

      {/* Contenuto risultati */}
      <div className="max-w-[1160px] mx-auto px-6 py-8">

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
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <a href={links.google} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-[20px] border border-border card-hover group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><MapPin size={22} className="text-primary" /></div>
                <span className="font-bold text-foreground group-hover:text-primary text-sm">Google Maps</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">Apri ricerca <ExternalLink size={11} /></span>
              </a>
              <a href={links.paginegialle} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-[20px] border border-border card-hover group">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center"><Phone size={22} className="text-secondary" /></div>
                <span className="font-bold text-foreground group-hover:text-primary text-sm">PagineGialle</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">Apri ricerca <ExternalLink size={11} /></span>
              </a>
              <a href={links.subito} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-[20px] border border-border card-hover group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center"><Search size={22} className="text-accent" /></div>
                <span className="font-bold text-foreground group-hover:text-primary text-sm">Subito.it</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">Apri ricerca <ExternalLink size={11} /></span>
              </a>
            </div>

            {/* CTA professionisti */}
            <div className="bg-muted rounded-[20px] p-6 text-center border border-border">
              <p className="text-sm text-foreground font-semibold mb-2">Sei un professionista del mondo pet?</p>
              <p className="text-sm text-muted-foreground mb-4">
                Registra la tua attivita gratis su MifidoDiTe.eu con il codice invito e fatti trovare dai proprietari della tua zona.
              </p>
              <a href="/registra-attivita" className="inline-flex items-center gap-2 bg-primary hover:bg-foreground text-white px-7 py-3.5 rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm">
                Registra la tua attivita
              </a>
            </div>
          </div>
        );
      })()}
    </div>
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
