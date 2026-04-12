"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Waves, Filter, X, Check } from "lucide-react";
import { MapSpiagge } from "./MapSpiagge";

export interface SpiaggiaUI {
  slug: string;
  nome: string;
  comune: string;
  provincia: string;
  regione: string;
  regioneSlug: string;
  tipo: "Stabilimento" | "Spiaggia libera";
  descrizione: string;
  servizi: string[];
  foto: string;
  lat: number;
  lng: number;
  bagnoConsentito?: boolean;
  guinzaglio?: "obbligatorio" | "libero" | "solo-fuori-acqua";
  prezzoTipo?: "gratuito" | "pagamento" | "con-consumazione";
}

type FiltroTipo = "tutti" | "Stabilimento" | "Spiaggia libera";

interface Props {
  spiagge: SpiaggiaUI[];
}

export function SpiaggeClient({ spiagge }: Props) {
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("tutti");
  const [filtroRegione, setFiltroRegione] = useState<string>("tutte");
  const [filtroGratis, setFiltroGratis] = useState(false);
  const [filtroBagno, setFiltroBagno] = useState(false);
  const [filtroSenzaGuinzaglio, setFiltroSenzaGuinzaglio] = useState(false);

  const regioni = useMemo(
    () => Array.from(new Set(spiagge.map((s) => s.regione))).sort(),
    [spiagge]
  );

  const filtrate = useMemo(() => {
    return spiagge.filter((s) => {
      if (filtroTipo !== "tutti" && s.tipo !== filtroTipo) return false;
      if (filtroRegione !== "tutte" && s.regione !== filtroRegione) return false;
      if (filtroGratis && s.prezzoTipo !== "gratuito") return false;
      if (filtroBagno && s.bagnoConsentito !== true) return false;
      if (filtroSenzaGuinzaglio && s.guinzaglio !== "libero") return false;
      return true;
    });
  }, [spiagge, filtroTipo, filtroRegione, filtroGratis, filtroBagno, filtroSenzaGuinzaglio]);

  const perRegioneFiltrate = useMemo(() => {
    const m: Record<string, SpiaggiaUI[]> = {};
    for (const s of filtrate) {
      if (!m[s.regione]) m[s.regione] = [];
      m[s.regione].push(s);
    }
    return m;
  }, [filtrate]);

  const regioniFiltrate = Object.keys(perRegioneFiltrate).sort();

  const pins = filtrate.map((s) => ({
    slug: s.slug,
    nome: s.nome,
    comune: s.comune,
    regione: s.regione,
    tipo: s.tipo,
    lat: s.lat,
    lng: s.lng,
  }));

  function resetFiltri() {
    setFiltroTipo("tutti");
    setFiltroRegione("tutte");
    setFiltroGratis(false);
    setFiltroBagno(false);
    setFiltroSenzaGuinzaglio(false);
  }

  const hasActiveFilters =
    filtroTipo !== "tutti" ||
    filtroRegione !== "tutte" ||
    filtroGratis ||
    filtroBagno ||
    filtroSenzaGuinzaglio;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <MapSpiagge spiagge={pins} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Filter size={18} className="text-primary" /> Filtra le spiagge
              <span className="text-sm font-normal text-muted-foreground">({filtrate.length} su {spiagge.length})</span>
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block tracking-wide">Tipo</label>
              <div className="flex gap-2">
                {(["tutti", "Stabilimento", "Spiaggia libera"] as FiltroTipo[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFiltroTipo(t)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex-1 border-2 ${
                      filtroTipo === t
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {t === "tutti" ? "Tutti" : t === "Stabilimento" ? "Stabilim." : "Libere"}
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
                <option value="tutte">Tutte le regioni</option>
                {regioni.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block tracking-wide">Caratteristiche</label>
              <div className="flex flex-wrap gap-2">
                <ToggleChip active={filtroGratis} onClick={() => setFiltroGratis(!filtroGratis)} label="Gratis" />
                <ToggleChip active={filtroBagno} onClick={() => setFiltroBagno(!filtroBagno)} label="Bagno consentito" />
                <ToggleChip active={filtroSenzaGuinzaglio} onClick={() => setFiltroSenzaGuinzaglio(!filtroSenzaGuinzaglio)} label="Senza guinzaglio" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filtrate.length === 0 ? (
          <div className="bg-muted rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">Nessuna spiaggia corrisponde ai filtri selezionati.</p>
            <button onClick={resetFiltri} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              <X size={14} /> Azzera filtri
            </button>
          </div>
        ) : (
          regioniFiltrate.map((regione) => (
            <section key={regione} id={regione.toLowerCase().replace(/[\s-]+/g, "-")} className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Waves className="text-accent" size={24} /> {regione}
                <span className="text-sm font-normal text-muted-foreground ml-2">({perRegioneFiltrate[regione].length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {perRegioneFiltrate[regione].map((s) => (
                  <Link
                    key={s.slug}
                    href={`/spiagge/${s.regioneSlug}/${s.slug}`}
                    id={`spiaggia-${s.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50 scroll-mt-24 block"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img src={s.foto} alt={s.nome} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                      <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${s.tipo === "Stabilimento" ? "bg-sky-600" : "bg-emerald-600"}`}>
                        {s.tipo}
                      </span>
                      {s.prezzoTipo === "gratuito" && (
                        <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500 text-white">Gratis</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{s.nome}</h3>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin size={14} /> {s.comune} ({s.provincia})
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{s.descrizione}</p>
                      {s.servizi && s.servizi.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {s.servizi.slice(0, 3).map((sv) => (
                            <span key={sv} className="text-xs bg-blue-50 text-accent px-2 py-0.5 rounded-full">{sv}</span>
                          ))}
                        </div>
                      )}
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
