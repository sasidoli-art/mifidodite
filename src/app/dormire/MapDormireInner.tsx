"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface DormirePin {
  slug: string;
  nome: string;
  comune: string;
  regione: string;
  tipo: "hotel" | "agriturismo" | "bnb" | "camping" | "casa_vacanza";
  lat: number;
  lng: number;
}

interface Props {
  strutture: DormirePin[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

const TIPO_COLORS: Record<DormirePin["tipo"], string> = {
  hotel: "#C4683C",          // primary brand
  agriturismo: "#7A9E7E",    // secondary (verde)
  bnb: "#D4A94C",            // accent (oro)
  camping: "#0284c7",        // blu
  casa_vacanza: "#A855F7",   // viola
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

function makeIcon(tipo: DormirePin["tipo"], selected: boolean): L.DivIcon {
  const size = selected ? 42 : 34;
  return L.divIcon({
    html: buildPinHtml(TIPO_COLORS[tipo], selected),
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    className: "",
  });
}

export default function MapDormireInner({ strutture, selectedSlug, onSelect }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<globalThis.Map<string, L.Marker>>(new globalThis.Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const didFitRef = useRef(false);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const containerWithLeaflet = container as HTMLDivElement & { _leaflet_id?: number };
    if (containerWithLeaflet._leaflet_id) delete containerWithLeaflet._leaflet_id;

    const map = L.map(container, {
      center: [42.0, 12.5],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '© <a href="https://openstreetmap.org">OSM</a> © <a href="https://carto.com">CARTO</a>',
      maxZoom: 19,
      subdomains: "abcd",
    }).addTo(map);

    mapRef.current = map;
    const invalidateTimer = setTimeout(() => map.invalidateSize(), 150);

    return () => {
      clearTimeout(invalidateTimer);
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
      didFitRef.current = false;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    if (strutture.length === 0) return;

    strutture.forEach((s) => {
      const marker = L.marker([s.lat, s.lng], { icon: makeIcon(s.tipo, false) })
        .addTo(map)
        .bindTooltip(
          `<strong>${s.nome}</strong><br/><span style="color:#666">${s.comune}</span>`,
          { direction: "top", offset: [0, -34], className: "spiaggia-tooltip" }
        );
      marker.on("click", () => onSelectRef.current(s.slug));
      markersRef.current.set(s.slug, marker);
    });

    if (!didFitRef.current && strutture.length > 1) {
      const bounds = L.latLngBounds(strutture.map((s) => [s.lat, s.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
      didFitRef.current = true;
    }
  }, [strutture]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker, slug) => {
      const s = strutture.find((x) => x.slug === slug);
      if (!s) return;
      marker.setIcon(makeIcon(s.tipo, slug === selectedSlug));
    });

    if (selectedSlug) {
      const s = strutture.find((x) => x.slug === selectedSlug);
      if (s) {
        map.flyTo([s.lat, s.lng], Math.max(map.getZoom(), 11), { duration: 0.7 });
      }
    }
  }, [selectedSlug, strutture]);

  return <div ref={containerRef} className="w-full h-full" style={{ minHeight: 300 }} />;
}
