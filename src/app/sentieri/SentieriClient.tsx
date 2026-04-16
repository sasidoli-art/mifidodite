"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Filter, X, Check, Mountain, Clock, ArrowUpRight } from "lucide-react";
import { MapSentieri } from "./MapSentieri";
import type { Difficolta, SentieroTipo } from "@/lib/sentieri-types";

export interface SentieroUI {
  slug: string;
  nome: string;
  comune: string;
  provincia: string;
  regione: string;
  regioneSlug: string;
  tipo: SentieroTipo;
  difficolta: Difficolta;
  lunghezzaKm: number;
  dislivelloM: number;
  durataOre: number;
  adattoACuccioli: boolean;
  descrizione: string;
  img: string;
  lat: number;
  lng: number;
}

type FiltroDiff = "tutti" | Difficolta;

const DIFF_BADGE: Record<Difficolta, { bg: string; label: string }> = {
  facile: { bg: "bg-emerald-500", label: "Facile" },
  media: { bg: "bg-amber-500", label: "Media" },
  difficile: { bg: "bg-red-500", label: "Difficile" },
};

interface Props {
  sentieri: SentieroUI[];
}

export function SentieriClient({ sentieri }: Props) {
  const [filtroDiff, setFiltroDiff] = useState<FiltroDiff>("tutti");
  const [filtroRegione, setFiltroRegione] = useState<string>("tutte");
  const [filtroCuccioli, setFiltroCuccioli] = useState(false);

  const regioni = useMemo(
    () => Array.from(new Set(sentieri.map((s) => s.regione))).sort(),
    [sentieri]
  );

  const filtrati = useMemo(() => {
    return sentieri.filter((s) => {
      if (filtroDiff !== "tutti" && s.difficolta !== filtroDiff) return false;
      if (filtroRegione !== "tutte" && s.regione !== filtroRegione) return false;
      if (filtroCuccioli && !s.adattoACuccioli) return false;
      return true;
    });
  }, [sentieri, filtroDiff, filtroRegione, filtroCuccioli]);

  const perRegione = useMemo(() => {
    const m: Record<string, SentieroUI[]> = {};
    for (const s of filtrati) {
      if (!m[s.regione]) m[s.regione] = [];
      m[s.regione].push(s);
    }
    return m;
  }, [filtrati]);

  const regioniFiltrate = Object.keys(perRegione).sort();

  const pins = filtrati.map((s) => ({
    slug: s.slug, nome: s.nome, comune: s.comune, regione: s.regione, difficolta: s.difficolta, lat: s.lat, lng: s.lng,
  }));

  function resetFiltri() {
    setFiltroDiff("tutti");
    setFiltroRegione("tutte");
    setFiltroCuccioli(false);
  }

  const hasActiveFilters = filtroDiff !== "tutti" || filtroRegione !== "tutte" || filtroCuccioli;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <MapSentieri sentieri={pins} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Filter size={18} className="text-primary" /> Filtra
              <span className="text-sm font-normal text-muted-foreground">({filtrati.length} su {sentieri.length})</span>
            </h2>
            {hasActiveFilters && (
              <button onClick={resetFiltri} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark">
                <X size={14} /> Azzera
              </button>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block tracking-wide">Difficolta</label>
              <div className="flex gap-2">
                {(["tutti", "facile", "media", "difficile"] as FiltroDiff[]).map((d) => (
                  <button key={d} onClick={() => setFiltroDiff(d)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border-2 flex-1 ${filtroDiff === d ? "border-primary bg-primary/5 text-primary" : "border-border bg-white text-muted-foreground hover:border-primary/50"}`}
                  >
                    {d === "tutti" ? "Tutti" : d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block tracking-wide">Regione</label>
              <select value={filtroRegione} onChange={(e) => setFiltroRegione(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-border bg-white text-sm font-medium focus:border-primary focus:outline-none">
                <option value="tutte">Tutte</option>
                {regioni.map((r) => (<option key={r} value={r}>{r}</option>))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block tracking-wide">Animali</label>
              <ToggleChip active={filtroCuccioli} onClick={() => setFiltroCuccioli(!filtroCuccioli)} label="Adatto a cuccioli" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filtrati.length === 0 ? (
          <div className="bg-muted rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">Nessun sentiero corrisponde ai filtri.</p>
            <button onClick={resetFiltri} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              <X size={14} /> Azzera
            </button>
          </div>
        ) : (
          regioniFiltrate.map((regione) => (
            <section key={regione} className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {regione}
                <span className="text-sm font-normal text-muted-foreground ml-2">({perRegione[regione].length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {perRegione[regione].map((s) => (
                  <Link key={s.slug} href={`/sentieri/${s.regioneSlug}/${s.slug}`}
                    id={`sentiero-${s.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50 scroll-mt-24 block"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img src={s.img} alt={s.nome} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                      <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${DIFF_BADGE[s.difficolta].bg}`}>
                        {DIFF_BADGE[s.difficolta].label}
                      </span>
                      {s.adattoACuccioli && (
                        <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">Cuccioli OK</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">{s.nome}</h3>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin size={14} /> {s.comune}
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Mountain size={12} /> {s.lunghezzaKm} km</span>
                        <span className="flex items-center gap-1"><ArrowUpRight size={12} /> {s.dislivelloM}m</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {s.durataOre}h</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{s.descrizione}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
}

function ToggleChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border-2 ${active ? "border-primary bg-primary text-white" : "border-border bg-white text-muted-foreground hover:border-primary/50"}`}>
      {active && <Check size={12} />}
      {label}
    </button>
  );
}
