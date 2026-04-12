"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const COLORS: Record<string, string> = {
  hotel: "#C4683C",
  agriturismo: "#7A9E7E",
  bnb: "#D4A94C",
  camping: "#0284c7",
  casa_vacanza: "#A855F7",
};

interface Props {
  lat: number;
  lng: number;
  nome: string;
  tipo: "hotel" | "agriturismo" | "bnb" | "camping" | "casa_vacanza";
}

export default function MiniMapDormireInner({ lat, lng, nome, tipo }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const containerWithLeaflet = container as HTMLDivElement & { _leaflet_id?: number };
    if (containerWithLeaflet._leaflet_id) delete containerWithLeaflet._leaflet_id;

    const map = L.map(container, {
      center: [lat, lng],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '© <a href="https://openstreetmap.org">OSM</a> © <a href="https://carto.com">CARTO</a>',
      maxZoom: 19,
      subdomains: "abcd",
    }).addTo(map);

    const color = COLORS[tipo] || "#C4683C";

    const icon = L.divIcon({
      html: `<div style="
        width:42px;height:42px;
        background:${color};
        border:3px solid white;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 16px rgba(61,43,31,.35), 0 0 0 4px rgba(196,104,60,.2);
      "><div style="width:12px;height:12px;background:white;border-radius:50%;transform:rotate(45deg);"></div></div>`,
      iconSize: [42, 42],
      iconAnchor: [21, 42],
      className: "",
    });

    L.marker([lat, lng], { icon }).addTo(map).bindPopup(`<strong>${nome}</strong>`).openPopup();

    mapRef.current = map;
    const invalidateTimer = setTimeout(() => map.invalidateSize(), 150);

    return () => {
      clearTimeout(invalidateTimer);
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, nome, tipo]);

  return <div ref={containerRef} className="w-full h-full" />;
}
