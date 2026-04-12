"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Filter, X, Check, ExternalLink, Star } from "lucide-react";
import { MapDormire } from "./MapDormire";
import type { DormireTipo, PrezzoFascia } from "@/lib/dormire-types";

export interface DormireUI {
  slug: string;
  nome: string;
  comune: string;
  provincia: string;
  regione: string;
  regioneSlug: string;
  tipo: DormireTipo;
  descrizione: string;
  fascia: PrezzoFascia;
  stelle?: 1 | 2 | 3 | 4 | 5;
  tagliaMax: "piccola" | "media" | "grande" | "tutte";
  amenities: string[];
  img: string;
  lat: number;
  lng: number;
  bookingUrl: string;
}

type FiltroTipo = "tutti" | DormireTipo;
type FiltroFascia = "tutte" | PrezzoFascia;

interface Props {
  strutture: DormireUI[];
}

const TIPO_LABEL: Record<DormireTipo, string> = {
  hotel: "Hotel & Resort",
  agriturismo: "Agriturismi",
  bnb: "B&B & Boutique",
  camping: "Camping & Glamping",
  casa_vacanza: "Case Vacanza",
};

const TIPO_BADGE: Record<DormireTipo, { bg: string; label: string }> = {
  hotel: { bg: "bg-primary", label: "Hotel" },
  agriturismo: { bg: "bg-secondary", label: "Agriturismo" },
  bnb: { bg: "bg-accent", label: "B&B" },
  camping: { bg: "bg-sky-600", label: "Camping" },
  casa_vacanza: { bg: "bg-purple-600", label: "Casa vacanza" },
};

const FASCIA_LABEL: Record<PrezzoFascia, string> = {
  economico: "€",
  medio: "€€",
  alto: "€€€",
  luxury: "€€€€",
};

export function DormireClient({ strutture }: Props) {
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("tutti");
  const [filtroRegione, setFiltroRegione] = useState<string>("tutte");
  const [filtroFascia, setFiltroFascia] = useState<FiltroFascia>("tutte");
  const [filtroTagliaGrande, setFiltroTagliaGrande] = useState(false);

  const regioni = useMemo(
    () => Array.from(new Set(strutture.map((s) => s.regione))).sort(),
    [strutture]
  );

  const filtrate = useMemo(() => {
    return strutture.filter((s) => {
      if (filtroTipo !== "tutti" && s.tipo !== filtroTipo) return false;
      if (filtroRegione !== "tutte" && s.regione !== filtroRegione) return false;
      if (filtroFascia !== "tutte" && s.fascia !== filtroFascia) return false;
      if (filtroTagliaGrande && s.tagliaMax !== "tutte" && s.tagliaMax !== "grande") return false;
      return true;
    });
  }, [strutture, filtroTipo, filtroRegione, filtroFascia, filtroTagliaGrande]);

  const perRegioneFiltrate = useMemo(() => {
    const m: Record<string, DormireUI[]> = {};
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
    setFiltroFascia("tutte");
    setFiltroTagliaGrande(false);
  }

  const hasActiveFilters =
    filtroTipo !== "tutti" ||
    filtroRegione !== "tutte" ||
    filtroFascia !== "tutte" ||
    filtroTagliaGrande;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <MapDormire strutture={pins} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Filter size={18} className="text-primary" /> Filtra le strutture
              <span className="text-sm font-normal text-muted-foreground">({filtrate.length} su {strutture.length})</span>
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
              <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block tracking-wide">Tipo struttura</label>
              <div className="flex flex-wrap gap-2">
                {(["tutti", "hotel", "agriturismo", "bnb", "camping", "casa_vacanza"] as FiltroTipo[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFiltroTipo(t)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border-2 ${
                      filtroTipo === t
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {t === "tutti" ? "Tutti" : TIPO_LABEL[t as DormireTipo].split(" ")[0]}
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

            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block tracking-wide">Fascia prezzo</label>
              <select
                value={filtroFascia}
                onChange={(e) => setFiltroFascia(e.target.value as FiltroFascia)}
                className="w-full px-3 py-2 rounded-xl border-2 border-border bg-white text-sm font-medium focus:border-primary focus:outline-none"
              >
                <option value="tutte">Tutte le fasce</option>
                <option value="economico">€ Economico</option>
                <option value="medio">€€ Medio</option>
                <option value="alto">€€€ Alto</option>
                <option value="luxury">€€€€ Luxury</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold uppercase text-muted-foreground tracking-wide mr-1">Animali:</span>
            <ToggleChip
              active={filtroTagliaGrande}
              onClick={() => setFiltroTagliaGrande(!filtroTagliaGrande)}
              label="Accetta taglia grande"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filtrate.length === 0 ? (
          <div className="bg-muted rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">Nessuna struttura corrisponde ai filtri selezionati.</p>
            <button onClick={resetFiltri} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              <X size={14} /> Azzera filtri
            </button>
          </div>
        ) : (
          regioniFiltrate.map((regione) => (
            <section key={regione} id={regione.toLowerCase().replace(/[\s-]+/g, "-")} className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {regione}
                <span className="text-sm font-normal text-muted-foreground ml-2">({perRegioneFiltrate[regione].length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {perRegioneFiltrate[regione].map((s) => (
                  <div
                    key={s.slug}
                    id={`struttura-${s.slug}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50 scroll-mt-24 flex flex-col"
                  >
                    <Link href={`/dormire/${s.regioneSlug}/${s.slug}`} className="block group">
                      <div className="h-48 overflow-hidden relative">
                        <img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                        <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${TIPO_BADGE[s.tipo].bg}`}>
                          {TIPO_BADGE[s.tipo].label}
                        </span>
                        <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/95 text-foreground">
                          {FASCIA_LABEL[s.fascia]}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-1">
                          {s.stelle && Array.from({ length: s.stelle }).map((_, i) => (
                            <Star key={i} size={12} fill="#D4A94C" stroke="#D4A94C" />
                          ))}
                        </div>
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">{s.nome}</h3>
                        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                          <MapPin size={14} /> {s.comune} ({s.provincia})
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{s.descrizione}</p>
                        {s.amenities && s.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {s.amenities.slice(0, 3).map((a) => (
                              <span key={a} className="text-xs bg-muted text-foreground px-2 py-0.5 rounded-full">{a}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="px-4 pb-4 mt-auto">
                      <a
                        href={s.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#003580] hover:bg-[#002659] text-white text-sm font-semibold rounded-full px-4 py-2.5 transition-colors"
                      >
                        Prenota su Booking <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
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
