"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { MapPin, Navigation } from "lucide-react";
import type { SentieroPin } from "./MapSentieriInner";

const MapSentieriInner = dynamic(() => import("./MapSentieriInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <div className="text-muted-foreground text-sm">Caricamento mappa...</div>
    </div>
  ),
});

interface Props {
  sentieri: SentieroPin[];
}

export function MapSentieri({ sentieri }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const handleSelect = useCallback((slug: string) => {
    setSelectedSlug(slug);
    const el = document.getElementById(`sentiero-${slug}`);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-4", "ring-primary/40");
        setTimeout(() => el.classList.remove("ring-4", "ring-primary/40"), 2000);
      }, 400);
    }
  }, []);

  return (
    <div className="relative">
      <div className="h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden border border-border shadow-lg bg-white">
        <MapSentieriInner sentieri={sentieri} selectedSlug={selectedSlug} onSelect={handleSelect} />
      </div>
      <div className="absolute top-4 right-4 bg-white rounded-xl shadow-md border border-border p-3 z-[1000] text-xs">
        <div className="font-bold text-foreground mb-2 flex items-center gap-1.5"><MapPin size={12} className="text-primary" /> Difficolta</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Facile</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500" /> Media</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500" /> Difficile</div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-xl shadow-md border border-border px-3 py-2 z-[1000] text-xs text-muted-foreground flex items-center gap-1.5">
        <Navigation size={12} /> Clicca un pin per scorrere alla scheda
      </div>
    </div>
  );
}
