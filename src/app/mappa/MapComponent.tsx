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
}

const CAT_COLORS: Record<string, string> = {
  veterinario: "#C4683C",
  toelettatura: "#7A9E7E",
  pensione: "#D4A94C",
};

const CAT_ICONS: Record<string, string> = {
  veterinario: "+",
  toelettatura: "✂",
  pensione: "🏠",
};

export default function MapComponent({ pins, selected, onSelect, userPos, onBoundsChange }: Props) {
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

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
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
      const iconChar = CAT_ICONS[pin.tipo] || "•";

      const icon = L.divIcon({
        html: `<div style="
          width:32px;height:32px;
          background:${color};
          border:2px solid white;
          border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-size:14px;color:white;font-weight:bold;
          box-shadow:0 2px 8px rgba(0,0,0,.25);
          cursor:pointer;
        ">${iconChar}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        className: "",
      });

      const marker = L.marker([pin.lat, pin.lon], { icon }).addTo(markersRef.current!);
      marker.on("click", () => onSelect(pin));
    });
  }, [pins, onSelect]);

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
        width:16px;height:16px;
        background:#3D2B1F;
        border:3px solid white;
        border-radius:50%;
        box-shadow:0 0 0 6px rgba(61,43,31,.15),0 2px 4px rgba(0,0,0,.2);
      "></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      className: "",
    });

    L.marker(userPos, { icon: userIcon }).addTo(mapRef.current);
    mapRef.current.flyTo(userPos, 12, { duration: 1.5 });
  }, [userPos]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] lg:min-h-[500px]" />
  );
}
