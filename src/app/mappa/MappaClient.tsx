"use client";

import { useState, useEffect } from "react";
import { MapPin, Navigation, Star, X, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MAP_PINS, CATEGORIE_MAPPA } from "@/lib/mappa-data";
import type { MapPin as MapPinType } from "@/lib/mappa-data";

// Leaflet va caricato solo lato client
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export function MappaClient() {
  const [filtri, setFiltri] = useState<string[]>([]);
  const [selected, setSelected] = useState<MapPinType | null>(null);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  // Geolocalizzazione
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
        () => {} // Utente ha rifiutato
      );
    }
  }, []);

  const filtered = filtri.length > 0
    ? MAP_PINS.filter((p) => filtri.includes(p.categoria))
    : MAP_PINS;

  function toggleFiltro(cat: string) {
    setFiltri((prev) =>
      prev.includes(cat) ? prev.filter((f) => f !== cat) : [...prev, cat]
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Sidebar filtri */}
      <div className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-border p-4 lg:p-6 shrink-0 lg:overflow-y-auto lg:max-h-[calc(100vh-64px)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <MapPin size={20} className="text-primary" />
            Mappa Pet
          </h1>
          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
            {filtered.length} risultati
          </span>
        </div>

        {/* Geolocalizzazione */}
        <button
          onClick={() => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(
                (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude])
              );
            }
          }}
          className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors mb-4"
        >
          <Navigation size={16} />
          Usa la mia posizione
        </button>

        {/* Filtri categoria */}
        <div className="space-y-1 mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
            <Filter size={12} /> Filtra per categoria
          </p>
          {Object.entries(CATEGORIE_MAPPA).map(([key, { label, emoji }]) => {
            const count = MAP_PINS.filter((p) => p.categoria === key).length;
            const active = filtri.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleFiltro(key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary text-white font-semibold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{emoji}</span>
                  {label}
                </span>
                <span className={`text-xs ${active ? "text-white/70" : "text-muted-foreground"}`}>
                  {count}
                </span>
              </button>
            );
          })}
          {filtri.length > 0 && (
            <button
              onClick={() => setFiltri([])}
              className="w-full text-center text-xs text-primary hover:underline mt-2"
            >
              Mostra tutti
            </button>
          )}
        </div>

        {/* Lista risultati */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Strutture ({filtered.length})
          </p>
          {filtered.map((pin) => (
            <button
              key={pin.id}
              onClick={() => setSelected(pin)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                selected?.id === pin.id
                  ? "bg-primary/10 border border-primary/30"
                  : "hover:bg-muted border border-transparent"
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0">
                  {CATEGORIE_MAPPA[pin.categoria]?.emoji || "🐾"}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{pin.nome}</p>
                  <p className="text-xs text-muted-foreground">{pin.comune} ({pin.provincia})</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">{pin.rating}</span>
                    <span className="text-xs text-muted-foreground">({pin.recensioni})</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mappa */}
      <div className="flex-1 relative min-h-[400px] lg:min-h-0">
        <MapComponent
          pins={filtered}
          selected={selected}
          onSelect={setSelected}
          userPos={userPos}
        />

        {/* Popup dettaglio */}
        {selected && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white rounded-2xl shadow-xl p-5 z-[1000] border border-border">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 p-1 hover:bg-muted rounded-lg"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-3">
              <span className="text-2xl">{CATEGORIE_MAPPA[selected.categoria]?.emoji || "🐾"}</span>
              <div className="min-w-0">
                <h3 className="font-bold text-foreground text-lg">{selected.nome}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin size={13} /> {selected.comune} ({selected.provincia})
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">{selected.rating}</span>
                  <span className="text-xs text-muted-foreground">({selected.recensioni} recensioni)</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-3">{selected.descrizione}</p>

            <div className="flex gap-2 mt-4">
              <Link
                href={`/struttura/${selected.slug}`}
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl font-semibold text-center text-sm transition-colors"
              >
                Vedi scheda completa
              </Link>
              <Link
                href={`/struttura/${selected.slug}`}
                className="px-4 py-2.5 rounded-xl border border-border text-foreground hover:bg-muted transition-colors"
              >
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
