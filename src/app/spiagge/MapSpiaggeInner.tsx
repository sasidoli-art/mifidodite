"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface SpiaggiaPin {
  slug: string;
  nome: string;
  comune: string;
  regione: string;
  tipo: "Stabilimento" | "Spiaggia libera";
  lat: number;
  lng: number;
}

interface Props {
  spiagge: SpiaggiaPin[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

const TIPO_COLORS: Record<SpiaggiaPin["tipo"], string> = {
  "Stabilimento": "#0284c7",
  "Spiaggia libera": "#059669",
};

function buildPinHtml(color: string, selected: boolean): string {
  const size = selected ? 42 : 34;
  const ring = selected ? ", 0 0 0 4px rgba(196,104,60,.35)" : "";
  return `<div style="
    width:${size}px;height:${size}px;
    background:${color};
    border:2.5px solid white;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 3px 12px rgba(61,43,31,.25), 0 0 0 1px rgba(61,43,31,.05)${ring};
    cursor:pointer;
  "><div style="width:10px;height:10px;background:white;border-radius:50%;transform:rotate(45deg);"></div></div>`;
}

function makeIcon(tipo: SpiaggiaPin["tipo"], selected: boolean): L.DivIcon {
  const size = selected ? 42 : 34;
  return L.divIcon({
    html: buildPinHtml(TIPO_COLORS[tipo], selected),
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    className: "",
  });
}

export default function MapSpiaggeInner({ spiagge, selectedSlug, onSelect }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<globalThis.Map<string, L.Marker>>(new globalThis.Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const didFitRef = useRef(false);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // INIT mappa — una sola volta, guard contro double-init di StrictMode
  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    // Se un precedente init ha lasciato _leaflet_id, puliamo
    const containerWithLeaflet = container as HTMLDivElement & { _leaflet_id?: number };
    if (containerWithLeaflet._leaflet_id) {
      delete containerWithLeaflet._leaflet_id;
    }

    const map = L.map(container, {
      center: [42.0, 12.5],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: true,
      preferCanvas: false,
    });

    L.tileLayer("https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '© <a href="https://openstreetmap.org">OSM</a> © <a href="https://carto.com">CARTO</a>',
      maxZoom: 19,
      subdomains: "abcd",
    }).addTo(map);

    mapRef.current = map;

    // invalidateSize dopo che il layout si e' stabilizzato
    const invalidateTimer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(invalidateTimer);
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
      didFitRef.current = false;
    };
  }, []);

  // CREA/AGGIORNA MARKERS quando spiagge cambiano (NON quando selectedSlug cambia)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    if (spiagge.length === 0) return;

    spiagge.forEach((s) => {
      const marker = L.marker([s.lat, s.lng], { icon: makeIcon(s.tipo, false) })
        .addTo(map)
        .bindTooltip(
          `<strong>${s.nome}</strong><br/><span style="color:#666">${s.comune}</span>`,
          { direction: "top", offset: [0, -34], className: "spiaggia-tooltip" }
        );
      marker.on("click", () => onSelectRef.current(s.slug));
      markersRef.current.set(s.slug, marker);
    });

    // fitBounds SOLO al primo caricamento
    if (!didFitRef.current && spiagge.length > 1) {
      const bounds = L.latLngBounds(spiagge.map((s) => [s.lat, s.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
      didFitRef.current = true;
    }
  }, [spiagge]);

  // AGGIORNA stile marker selezionato + flyTo — separato dalla creazione
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker, slug) => {
      const s = spiagge.find((x) => x.slug === slug);
      if (!s) return;
      marker.setIcon(makeIcon(s.tipo, slug === selectedSlug));
    });

    if (selectedSlug) {
      const s = spiagge.find((x) => x.slug === selectedSlug);
      if (s) {
        map.flyTo([s.lat, s.lng], Math.max(map.getZoom(), 11), { duration: 0.7 });
      }
    }
  }, [selectedSlug, spiagge]);

  return <div ref={containerRef} className="w-full h-full" style={{ minHeight: 300 }} />;
}
