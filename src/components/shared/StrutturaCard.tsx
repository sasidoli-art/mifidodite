import Link from "next/link";
import { Star, MapPin, Crown } from "lucide-react";
import type { StrutturaCard as StrutturaCardType } from "@/lib/types";
import { CATEGORIE_LABELS, CATEGORIE_ICONS } from "@/lib/types";

interface Props {
  struttura: StrutturaCardType;
}

export function StrutturaCard({ struttura: s }: Props) {
  return (
    <Link
      href={`/struttura/${s.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50"
    >
      {/* Immagine */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {s.foto_copertina ? (
          <img
            src={s.foto_copertina}
            alt={s.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-orange-50 to-amber-50">
            {CATEGORIE_ICONS[s.categoria] || "🐾"}
          </div>
        )}

        {s.piano !== "free" && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <Crown size={12} />
            Premium
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-full">
          {CATEGORIE_LABELS[s.categoria]}
        </div>

        {s.distanza_km !== undefined && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
            {s.distanza_km < 1 ? "&lt;1 km" : `${s.distanza_km.toFixed(1)} km`}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-lg">
          {s.nome}
        </h3>

        <div className="flex items-center gap-1 mt-1.5 text-sm text-muted-foreground">
          <MapPin size={14} className="shrink-0" />
          <span>
            {s.comune}
            {s.provincia ? ` (${s.provincia})` : ""}
          </span>
        </div>

        {s.rating_medio > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(s.rating_medio)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-semibold">{s.rating_medio.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">
              ({s.numero_recensioni})
            </span>
          </div>
        )}

        {s.descrizione_storytelling ? (
          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {s.descrizione_storytelling}
          </p>
        ) : s.descrizione ? (
          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {s.descrizione}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
