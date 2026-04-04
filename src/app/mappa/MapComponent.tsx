"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapPin } from "@/lib/mappa-data";
import { PIN_COLORS, CATEGORIE_MAPPA } from "@/lib/mappa-data";

interface Props {
  pins: MapPin[];
  selected: MapPin | null;
  onSelect: (pin: MapPin) => void;
  userPos: [number, number] | null;
}

export default function MapComponent({ pins, selected, onSelect, userPos }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Inizializza mappa
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [42.5, 12.5], // Centro Italia
      zoom: 6,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Aggiorna markers quando cambiano i pin
  useEffect(() => {
    if (!markersRef.current || !mapRef.current) return;
    markersRef.current.clearLayers();

    pins.forEach((pin) => {
      const color = PIN_COLORS[pin.tipo] || "#e67e22";
      const emoji = CATEGORIE_MAPPA[pin.categoria]?.emoji || "🐾";

      const icon = L.divIcon({
        html: `<div style="
          width: 36px; height: 36px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
        ">${emoji}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        className: "",
      });

      const marker = L.marker([pin.lat, pin.lng], { icon })
        .addTo(markersRef.current!);

      marker.on("click", () => onSelect(pin));
    });
  }, [pins, onSelect]);

  // Centra su pin selezionato
  useEffect(() => {
    if (!mapRef.current || !selected) return;
    mapRef.current.flyTo([selected.lat, selected.lng], 13, { duration: 1 });
  }, [selected]);

  // Posizione utente
  useEffect(() => {
    if (!mapRef.current || !userPos) return;

    const userIcon = L.divIcon({
      html: `<div style="
        width: 20px; height: 20px;
        background: #3b82f6;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 8px rgba(59,130,246,0.2), 0 2px 4px rgba(0,0,0,0.2);
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      className: "",
    });

    L.marker(userPos, { icon: userIcon }).addTo(mapRef.current);
    mapRef.current.flyTo(userPos, 11, { duration: 1.5 });
  }, [userPos]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px]" />
  );
}
