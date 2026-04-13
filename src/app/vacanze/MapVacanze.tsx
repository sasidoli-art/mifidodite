"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { MapPin, Navigation } from "lucide-react";
import type { VacanzaPin } from "./MapVacanzeInner";

const MapVacanzeInner = dynamic(() => import("./MapVacanzeInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <div className="text-muted-foreground text-sm">Caricamento mappa...</div>
    </div>
  ),
});

interface Props {
  strutture: VacanzaPin[];
}

const TIPO_LABEL: Record<VacanzaPin["tipo"], string> = {
  hotel: "Hotel",
  agriturismo: "Agriturismo",
  bnb: "B&B",
  camping: "Camping",
  casa_vacanza: "Casa vac.",
};

const TIPO_COLOR: Record<VacanzaPin["tipo"], string> = {
  hotel: "#C4683C",
  agriturismo: "#7A9E7E",
  bnb: "#D4A94C",
  camping: "#0284c7",
  casa_vacanza: "#A855F7",
};

export function MapVacanze({ strutture }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const handleSelect = useCallback((slug: string) => {
    setSelectedSlug(slug);
    const el = document.getElementById(`struttura-${slug}`);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-4", "ring-primary/40");
        setTimeout(() => el.classList.remove("ring-4", "ring-primary/40"), 2000);
      }, 400);
    }
  }, []);

  const counters: Record<VacanzaPin["tipo"], number> = {
    hotel: 0, agriturismo: 0, bnb: 0, camping: 0, casa_vacanza: 0,
  };
  strutture.forEach((s) => counters[s.tipo]++);

  return (
    <div className="relative">
      <div className="h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden border border-border shadow-lg bg-white">
        <MapVacanzeInner strutture={strutture} selectedSlug={selectedSlug} onSelect={handleSelect} />
      </div>

      <div className="absolute top-4 right-4 bg-white rounded-xl shadow-md border border-border p-3 z-[1000] text-xs max-w-[180px]">
        <div className="font-bold text-foreground mb-2 flex items-center gap-1.5">
          <MapPin size={12} className="text-primary" /> Legenda
        </div>
        <div className="space-y-1.5">
          {(Object.keys(TIPO_LABEL) as VacanzaPin["tipo"][]).map((t) => (
            counters[t] > 0 && (
              <div key={t} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: TIPO_COLOR[t] }} />
                <span className="text-muted-foreground">{TIPO_LABEL[t]} ({counters[t]})</span>
              </div>
            )
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-xl shadow-md border border-border px-3 py-2 z-[1000] text-xs text-muted-foreground flex items-center gap-1.5">
        <Navigation size={12} /> Clicca un pin per scorrere alla scheda
      </div>
    </div>
  );
}
