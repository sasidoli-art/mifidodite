"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { MapPin, Navigation } from "lucide-react";
import type { RistorantePin } from "./MapRistorantiInner";

const MapRistorantiInner = dynamic(() => import("./MapRistorantiInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <div className="text-muted-foreground text-sm">Caricamento mappa...</div>
    </div>
  ),
});

interface Props {
  ristoranti: RistorantePin[];
}

export function MapRistoranti({ ristoranti }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const handleSelect = useCallback((slug: string) => {
    setSelectedSlug(slug);
    const el = document.getElementById(`ristorante-${slug}`);
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
        <MapRistorantiInner ristoranti={ristoranti} selectedSlug={selectedSlug} onSelect={handleSelect} />
      </div>

      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-xl shadow-md border border-border px-3 py-2 z-[1000] text-xs text-muted-foreground flex items-center gap-1.5">
        <Navigation size={12} /> Clicca un pin per scorrere alla scheda
      </div>

      <div className="absolute top-4 right-4 bg-white rounded-xl shadow-md border border-border p-3 z-[1000] text-xs">
        <div className="font-bold text-foreground mb-1 flex items-center gap-1.5">
          <MapPin size={12} className="text-primary" /> {ristoranti.length} locali
        </div>
      </div>
    </div>
  );
}
