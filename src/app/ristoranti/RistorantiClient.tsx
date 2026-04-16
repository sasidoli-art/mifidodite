"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Filter, X, Check, Utensils } from "lucide-react";
import { MapRistoranti } from "./MapRistoranti";
import type { RistoranteTipo, FasciaPrezzo } from "@/lib/ristoranti-types";

export interface RistoranteUI {
  slug: string;
  nome: string;
  comune: string;
  provincia: string;
  regione: string;
  regioneSlug: string;
  tipo: RistoranteTipo;
  descrizione: string;
  fascia: FasciaPrezzo;
  cucina: string;
  conDehors: boolean;
  conGiardino: boolean;
  menuCane: boolean;
  ciotoleAcqua: boolean;
  img: string;
  lat: number;
  lng: number;
}

type FiltroTipo = "tutti" | RistoranteTipo;

const TIPO_LABEL: Record<RistoranteTipo, string> = {
  ristorante: "Ristoranti",
  agriturismo: "Agriturismi",
  dog_cafe: "Dog cafe",
  cat_cafe: "Cat cafe",
  pizzeria: "Pizzerie",
  osteria: "Osterie",
  brewery: "Brewery",
  bistrot: "Bistrot",
};

const TIPO_BADGE: Record<RistoranteTipo, { bg: string; label: string }> = {
  ristorante: { bg: "bg-primary", label: "Ristorante" },
  agriturismo: { bg: "bg-secondary", label: "Agriturismo" },
  dog_cafe: { bg: "bg-accent", label: "Dog cafe" },
  cat_cafe: { bg: "bg-accent", label: "Cat cafe" },
  pizzeria: { bg: "bg-orange-500", label: "Pizzeria" },
  osteria: { bg: "bg-amber-800", label: "Osteria" },
  brewery: { bg: "bg-yellow-700", label: "Brewery" },
  bistrot: { bg: "bg-sky-600", label: "Bistrot" },
};

const FASCIA_LABEL: Record<FasciaPrezzo, string> = {
  economico: "€",
  medio: "€€",
  alto: "€€€",
  luxury: "€€€€",
};

interface Props {
  ristoranti: RistoranteUI[];
}

export function RistorantiClient({ ristoranti }: Props) {
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("tutti");
  const [filtroRegione, setFiltroRegione] = useState<string>("tutte");
  const [filtroDehors, setFiltroDehors] = useState(false);
  const [filtroGiardino, setFiltroGiardino] = useState(false);

  const regioni = useMemo(
    () => Array.from(new Set(ristoranti.map((r) => r.regione))).sort(),
    [ristoranti]
  );

  const filtrati = useMemo(() => {
    return ristoranti.filter((r) => {
      if (filtroTipo !== "tutti" && r.tipo !== filtroTipo) return false;
      if (filtroRegione !== "tutte" && r.regione !== filtroRegione) return false;
      if (filtroDehors && !r.conDehors) return false;
      if (filtroGiardino && !r.conGiardino) return false;
      return true;
    });
  }, [ristoranti, filtroTipo, filtroRegione, filtroDehors, filtroGiardino]);

  const perRegione = useMemo(() => {
    const m: Record<string, RistoranteUI[]> = {};
    for (const r of filtrati) {
      if (!m[r.regione]) m[r.regione] = [];
      m[r.regione].push(r);
    }
    return m;
  }, [filtrati]);

  const regioniFiltrate = Object.keys(perRegione).sort();

  const pins = filtrati.map((r) => ({
    slug: r.slug,
    nome: r.nome,
    comune: r.comune,
    regione: r.regione,
    tipo: r.tipo,
    lat: r.lat,
    lng: r.lng,
  }));

  function resetFiltri() {
    setFiltroTipo("tutti");
    setFiltroRegione("tutte");
    setFiltroDehors(false);
    setFiltroGiardino(false);
  }

  const hasActiveFilters =
    filtroTipo !== "tutti" ||
    filtroRegione !== "tutte" ||
    filtroDehors ||
    filtroGiardino;

  const tipiPresenti = Array.from(new Set(ristoranti.map((r) => r.tipo)));

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <MapRistoranti ristoranti={pins} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Filter size={18} className="text-primary" /> Filtra
              <span className="text-sm font-normal text-muted-foreground">({filtrati.length} su {ristoranti.length})</span>
            </h2>
            {hasActiveFilters && (
              <button
                onClick={resetFiltri}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark"
              >
                <X size={14} /> Azzera filtri
              </button>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block tracking-wide">Tipo locale</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFiltroTipo("tutti")}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border-2 ${
                    filtroTipo === "tutti"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-white text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  Tutti
                </button>
                {tipiPresenti.map((t) => (
                  <button
                    key={t}
                    onClick={() => setFiltroTipo(t)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border-2 ${
                      filtroTipo === t
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {TIPO_LABEL[t]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block tracking-wide">Regione</label>
              <select
                value={filtroRegione}
                onChange={(e) => setFiltroRegione(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-border bg-white text-sm font-medium focus:border-primary focus:outline-none"
              >
                <option value="tutte">Tutte</option>
                {regioni.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block tracking-wide">Caratteristiche</label>
              <div className="flex flex-wrap gap-2">
                <ToggleChip active={filtroDehors} onClick={() => setFiltroDehors(!filtroDehors)} label="Con dehors" />
                <ToggleChip active={filtroGiardino} onClick={() => setFiltroGiardino(!filtroGiardino)} label="Con giardino" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filtrati.length === 0 ? (
          <div className="bg-muted rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">Nessun ristorante corrisponde ai filtri.</p>
            <button onClick={resetFiltri} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              <X size={14} /> Azzera filtri
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
                {perRegione[regione].map((r) => (
                  <Link
                    key={r.slug}
                    href={`/ristoranti/${r.regioneSlug}/${r.slug}`}
                    id={`ristorante-${r.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50 scroll-mt-24 block"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img src={r.img} alt={r.nome} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                      <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${TIPO_BADGE[r.tipo].bg}`}>
                        {TIPO_BADGE[r.tipo].label}
                      </span>
                      <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/95 text-foreground">
                        {FASCIA_LABEL[r.fascia]}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">{r.nome}</h3>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin size={14} /> {r.comune} ({r.provincia})
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 italic">{r.cucina}</p>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.descrizione}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {r.conDehors && <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Dehors</span>}
                        {r.conGiardino && <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Giardino</span>}
                        {r.ciotoleAcqua && <span className="text-[10px] bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full">Ciotole</span>}
                      </div>
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
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border-2 ${
        active
          ? "border-primary bg-primary text-white"
          : "border-border bg-white text-muted-foreground hover:border-primary/50"
      }`}
    >
      {active && <Check size={12} />}
      {label}
    </button>
  );
}
