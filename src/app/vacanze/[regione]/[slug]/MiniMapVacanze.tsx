"use client";

import dynamic from "next/dynamic";
import { Navigation } from "lucide-react";

const MiniMapVacanzeInner = dynamic(() => import("./MiniMapVacanzeInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <div className="text-muted-foreground text-sm">Caricamento mappa...</div>
    </div>
  ),
});

interface Props {
  lat: number;
  lng: number;
  nome: string;
  tipo: "hotel" | "agriturismo" | "bnb" | "camping" | "casa_vacanza";
}

export function MiniMapVacanze({ lat, lng, nome, tipo }: Props) {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;

  return (
    <div className="relative">
      <div className="h-[360px] w-full rounded-2xl overflow-hidden border border-border shadow-lg bg-white">
        <MiniMapVacanzeInner lat={lat} lng={lng} nome={nome} tipo={tipo} />
      </div>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 bg-white hover:bg-primary hover:text-white transition-colors border border-border shadow-md rounded-full px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 z-[1000]"
      >
        <Navigation size={14} /> Indicazioni Google Maps
      </a>
    </div>
  );
}
