"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

interface Props {
  pins: MapPinData[];
  selected: MapPinData | null;
  onSelect: (pin: MapPinData) => void;
  userPos: [number, number] | null;
  onBoundsChange?: (bounds: { south: number; west: number; north: number; east: number }) => void;
  flyTo?: [number, number, number] | null; // [lat, lon, zoom]
}

const CAT_COLORS: Record<string, string> = {
  veterinario: "#C4683C",
  toelettatura: "#7A9E7E",
  pensione: "#D4A94C",
};

// SVG inline monocolore per i pin — stile coerente col sito
const CAT_SVG: Record<string, string> = {
  // Croce veterinaria
  veterinario: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  // Forbici toelettatura
  toelettatura: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
  // Casa pensione
  pensione: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
};

export default function MapComponent({ pins, selected, onSelect, userPos, onBoundsChange, flyTo }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const boundsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inizializza mappa
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [42.5, 12.5],
      zoom: 6,
      zoomControl: true,
    });

    // Tile layer pulito e neutro (CARTO Voyager — piu leggibile di Positron)
    L.tileLayer("https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '© <a href="https://openstreetmap.org">OSM</a> © <a href="https://carto.com">CARTO</a>',
      maxZoom: 19,
      subdomains: "abcd",
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // Notifica bounds quando l'utente sposta/zooma (debounced)
    function emitBounds() {
      if (boundsTimerRef.current) clearTimeout(boundsTimerRef.current);
      boundsTimerRef.current = setTimeout(() => {
        if (!mapRef.current || !onBoundsChange) return;
        const b = mapRef.current.getBounds();
        onBoundsChange({
          south: b.getSouth(),
          west: b.getWest(),
          north: b.getNorth(),
          east: b.getEast(),
        });
      }, 1000); // 1s debounce per evitare loop
    }

    map.on("moveend", emitBounds);
    map.on("zoomend", emitBounds);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [onBoundsChange]);

  // Aggiorna markers
  useEffect(() => {
    if (!markersRef.current || !mapRef.current) return;
    markersRef.current.clearLayers();

    pins.forEach((pin) => {
      const color = CAT_COLORS[pin.tipo] || "#C4683C";
      const svg = CAT_SVG[pin.tipo] || CAT_SVG.veterinario;

      const icon = L.divIcon({
        html: `<div style="
          width:36px;height:36px;
          background:${color};
          border:2.5px solid white;
          border-radius:12px;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 3px 12px rgba(61,43,31,.25), 0 0 0 1px rgba(61,43,31,.05);
          cursor:pointer;
          transition:transform .2s;
        " onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">${svg}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        className: "",
      });

      const marker = L.marker([pin.lat, pin.lon], { icon }).addTo(markersRef.current!);
      marker.on("click", () => onSelect(pin));
    });
  }, [pins, onSelect]);

  // FlyTo da ricerca citta
  useEffect(() => {
    if (!mapRef.current || !flyTo) return;
    mapRef.current.flyTo([flyTo[0], flyTo[1]], flyTo[2], { duration: 1.5 });
  }, [flyTo]);

  // Centra su pin selezionato (setView senza animazione per evitare loop moveend)
  useEffect(() => {
    if (!mapRef.current || !selected) return;
    mapRef.current.setView([selected.lat, selected.lon], Math.max(mapRef.current.getZoom(), 13), { animate: false });
  }, [selected]);

  // Posizione utente
  useEffect(() => {
    if (!mapRef.current || !userPos) return;

    const userIcon = L.divIcon({
      html: `<div style="
        width:14px;height:14px;
        background:#C4683C;
        border:3px solid white;
        border-radius:50%;
        box-shadow:0 0 0 8px rgba(196,104,60,.15),0 2px 6px rgba(0,0,0,.2);
      "></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      className: "",
    });

    L.marker(userPos, { icon: userIcon }).addTo(mapRef.current);
    mapRef.current.flyTo(userPos, 12, { duration: 1.5 });
  }, [userPos]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] lg:min-h-[500px]" />
  );
}
