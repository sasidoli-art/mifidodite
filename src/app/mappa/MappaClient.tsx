"use client";

import { useState, useEffect, useCallback } from "react";
import { MapPin, Navigation, Filter, Loader2, X, Phone, Globe, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

interface MapPinData {
  id: string;
  nome: string;
  categoria: string;
  tipo: string;
  lat: number;
  lon: number;
  comune: string;
  indirizzo: string;
  telefono: string;
  website: string;
  orari: string;
}

const CATEGORIE = [
  { key: "veterinario", label: "Veterinari", color: "#C4683C" },
  { key: "toelettatura", label: "Toelettatura", color: "#7A9E7E" },
  { key: "pensione", label: "Pensioni", color: "#D4A94C" },
];

export function MappaClient() {
  const [pins, setPins] = useState<MapPinData[]>([]);
  const [selected, setSelected] = useState<MapPinData | null>(null);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [filtri, setFiltri] = useState<string[]>(["veterinario", "toelettatura", "pensione"]);
  const [lastBbox, setLastBbox] = useState("");
  const [zoomTooFar, setZoomTooFar] = useState(true);
  const [searchCity, setSearchCity] = useState("");
  const [flyTo, setFlyTo] = useState<[number, number, number] | null>(null); // [lat, lon, zoom]

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
        () => {}
      );
    }
  }, []);

  async function searchCityOnMap(e: React.FormEvent) {
    e.preventDefault();
    if (!searchCity.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchCity)}&countrycodes=it&format=json&limit=1`, {
        headers: { "User-Agent": "MifidoDiTe.eu/1.0" },
      });
      const data = await res.json();
      if (data.length > 0) {
        const lat = Number(data[0].lat);
        const lon = Number(data[0].lon);
        setLastBbox(""); // Reset cache per forzare ricaricamento
        setFlyTo([lat, lon, 13]);
      }
    } catch { /* silent */ }
    finally { setLoading(false); }
  }

  const loadOSMData = useCallback(async (south: number, west: number, north: number, east: number) => {
    const bboxKey = `${south.toFixed(3)},${west.toFixed(3)},${north.toFixed(3)},${east.toFixed(3)},${filtri.join(",")}`;
    if (bboxKey === lastBbox) return;
    setLastBbox(bboxKey);
    setLoading(true);
    console.log("[Mappa] Loading OSM data for bbox:", south.toFixed(3), west.toFixed(3), north.toFixed(3), east.toFixed(3));

    try {
      const query = `[out:json][timeout:12];(${filtri.map(cat => {
        const tag = cat === "veterinario" ? '["amenity"="veterinary"]' : cat === "toelettatura" ? '["shop"="pet_grooming"]' : '["amenity"="animal_boarding"]';
        return `node${tag}["name"](${south},${west},${north},${east});`;
      }).join("")});out 80;`;

      const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`, {
        headers: { "User-Agent": "MifidoDiTe.eu/1.0" },
      });

      if (!res.ok) { setPins([]); return; }
      const data = await res.json();
      const elements = data.elements || [];

      const results: MapPinData[] = elements
        .filter((e: Record<string, unknown>) => e.tags && (e.tags as Record<string, string>).name)
        .map((e: Record<string, unknown>) => {
          const tags = e.tags as Record<string, string>;
          const cat = tags.amenity === "veterinary" ? "veterinario" : tags.shop === "pet_grooming" ? "toelettatura" : "pensione";
          const street = tags["addr:street"];
          const num = tags["addr:housenumber"];
          return {
            id: `osm-${e.id}`,
            nome: tags.name,
            categoria: cat,
            tipo: cat,
            lat: e.lat as number,
            lon: e.lon as number,
            comune: tags["addr:city"] || "",
            indirizzo: street ? `${street}${num ? ` ${num}` : ""}` : "",
            telefono: tags.phone || tags["contact:phone"] || "",
            website: tags.website || tags["contact:website"] || "",
            orari: tags.opening_hours || "",
          };
        });

      setPins(results);
    } catch {
      setPins([]);
    } finally {
      setLoading(false);
    }
  }, [filtri, lastBbox]);

  const onBoundsChange = useCallback((bounds: { south: number; west: number; north: number; east: number }) => {
    const latDiff = bounds.north - bounds.south;
    console.log("[Mappa] onBoundsChange latDiff:", latDiff.toFixed(3));
    if (latDiff < 3) {
      setZoomTooFar(false);
      loadOSMData(bounds.south, bounds.west, bounds.north, bounds.east);
    } else {
      setZoomTooFar(true);
    }
  }, [loadOSMData]);

  function toggleFiltro(cat: string) {
    setFiltri(prev => {
      const next = prev.includes(cat) ? prev.filter(f => f !== cat) : [...prev, cat];
      setLastBbox("");
      return next;
    });
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-border p-4 lg:p-5 shrink-0 lg:overflow-y-auto lg:max-h-[calc(100vh-60px)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            Mappa Pet
          </h1>
          {loading && <Loader2 size={16} className="animate-spin text-primary" />}
          {!loading && pins.length > 0 && (
            <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">{pins.length}</span>
          )}
        </div>

        {/* Ricerca citta */}
        <form onSubmit={searchCityOnMap} className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-muted border border-border">
            <MapPin size={14} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Cerca citta..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
            />
          </div>
          <button type="submit" className="bg-primary text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors shrink-0">
            Vai
          </button>
        </form>

        <button
          onClick={() => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(
                (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude])
              );
            }
          }}
          className="w-full flex items-center justify-center gap-2 bg-foreground text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-foreground/90 transition-colors mb-4"
        >
          <Navigation size={15} /> Usa la mia posizione
        </button>

        <div className="space-y-1 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
            <Filter size={11} /> Categorie
          </p>
          {CATEGORIE.map(({ key, label, color }) => {
            const active = filtri.includes(key);
            const count = pins.filter(p => p.categoria === key).length;
            return (
              <button key={key} onClick={() => toggleFiltro(key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${active ? "bg-muted font-semibold text-foreground" : "text-muted-foreground hover:bg-muted/50"}`}>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: active ? color : "#ccc" }} />
                  {label}
                </span>
                <span className="text-xs">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-muted rounded-xl p-3 text-xs text-muted-foreground mb-4">
          {zoomTooFar
            ? <p><strong className="text-foreground">Zooma sulla mappa</strong> per vedere veterinari, toelettatori e pensioni nella zona.</p>
            : <p>Dati reali da <strong>OpenStreetMap</strong>. Sposta o zooma per aggiornare.</p>
          }
        </div>

        {pins.length > 0 && (
          <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
            {pins.slice(0, 30).map(p => (
              <button key={p.id} onClick={() => setSelected(p)}
                className={`w-full text-left p-2.5 rounded-xl text-sm transition-all ${selected?.id === p.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted border border-transparent"}`}>
                <p className="font-semibold text-foreground line-clamp-1 text-[13px]">{p.nome}</p>
                {p.comune && <p className="text-[11px] text-muted-foreground mt-0.5">{p.comune}</p>}
              </button>
            ))}
          </div>
        )}

        <p className="text-[10px] text-muted-foreground mt-4">© OpenStreetMap contributors, ODbL</p>
      </div>

      {/* Mappa */}
      <div className="flex-1 relative min-h-[400px] lg:min-h-0">
        <MapComponent pins={pins} selected={selected} onSelect={setSelected} userPos={userPos} onBoundsChange={onBoundsChange} flyTo={flyTo} />

        {selected && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white rounded-[20px] shadow-xl p-5 z-[1000] border border-border">
            <button onClick={() => setSelected(null)} className="absolute top-3 right-3 p-1 hover:bg-muted rounded-lg">
              <X size={16} className="text-muted-foreground" />
            </button>
            <h3 className="font-bold text-foreground text-lg pr-8">{selected.nome}</h3>
            {selected.indirizzo && (
              <p className="text-sm text-muted-foreground mt-1 flex items-start gap-1">
                <MapPin size={13} className="mt-0.5 shrink-0" /> {selected.indirizzo}{selected.comune ? `, ${selected.comune}` : ""}
              </p>
            )}
            {selected.orari && <p className="text-xs text-muted-foreground mt-2">Orari: {selected.orari}</p>}
            <div className="flex flex-wrap gap-2 mt-4">
              {selected.telefono && (
                <a href={`tel:${selected.telefono}`} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-2 rounded-full font-semibold">
                  <Phone size={12} /> {selected.telefono}
                </a>
              )}
              {selected.website && (
                <a href={selected.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-muted text-foreground px-3 py-2 rounded-full font-semibold">
                  <Globe size={12} /> Sito
                </a>
              )}
              <a href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lon}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-muted text-foreground px-3 py-2 rounded-full font-semibold">
                <ExternalLink size={12} /> Maps
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
