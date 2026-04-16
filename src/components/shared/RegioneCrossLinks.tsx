import Link from "next/link";
import { Waves, BedDouble, Utensils, Mountain, ArrowRight } from "lucide-react";

interface Props {
  regione: string;
  regioneSlug: string;
  /** Sezione corrente da escludere dalla lista. */
  excludeSection: "spiagge" | "vacanze" | "ristoranti" | "sentieri";
}

const ALL_SECTIONS = [
  { id: "spiagge", icon: Waves, label: "Spiagge", desc: "dog-friendly", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { id: "vacanze", icon: BedDouble, label: "Vacanze", desc: "hotel e agriturismi", color: "text-primary bg-primary/5 border-primary/20" },
  { id: "ristoranti", icon: Utensils, label: "Ristoranti", desc: "pet-friendly", color: "text-accent bg-accent/10 border-accent/30" },
  { id: "sentieri", icon: Mountain, label: "Sentieri", desc: "escursioni col cane", color: "text-amber-700 bg-amber-50 border-amber-200" },
] as const;

export function RegioneCrossLinks({ regione, regioneSlug, excludeSection }: Props) {
  const sections = ALL_SECTIONS.filter((s) => s.id !== excludeSection);

  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <h3 className="font-bold text-foreground mb-1">Anche in {regione}</h3>
      <p className="text-xs text-muted-foreground mb-4">Scopri le altre sezioni della regione.</p>
      <div className="space-y-2">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.id}
              href={`/${s.id}/${regioneSlug}`}
              className={`group flex items-center gap-3 border-2 rounded-xl p-3 transition-all hover:-translate-y-0.5 ${s.color}`}
            >
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-foreground group-hover:underline">{s.label}</div>
                <div className="text-[11px] text-muted-foreground leading-tight">{s.desc}</div>
              </div>
              <ArrowRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
