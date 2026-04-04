"use client";

import { useState, useEffect } from "react";
import { Heart, HandHeart, Search, MapPin, Filter, Plus, Syringe, Shield, Dog, Cat, Baby, X, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";
import { ADOZIONI_SEED, formatEta } from "@/lib/adozioni-seed";
import type { AnnuncioSeed } from "@/lib/adozioni-seed";

const TABS = [
  { id: "adotta" as const, label: "Adotta", icon: Heart, desc: "Animali che cercano famiglia", color: "text-red-500" },
  { id: "offro" as const, label: "Offro", icon: HandHeart, desc: "Cerco nuova casa per il mio animale", color: "text-primary" },
  { id: "cerco" as const, label: "Cerco", icon: Search, desc: "Sto cercando un animale da adottare", color: "text-accent" },
];

export function AdozioniContent() {
  const [tab, setTab] = useState<"adotta" | "offro" | "cerco">("adotta");
  const [specie, setSpecie] = useState<string>("");
  const [taglia, setTaglia] = useState<string>("");
  const [provincia, setProvincia] = useState<string>("");

  const filtered = ADOZIONI_SEED.filter((a) => {
    if (a.tipo !== tab) return false;
    if (specie && a.specie !== specie) return false;
    if (taglia && a.taglia !== taglia) return false;
    if (provincia && a.provincia !== provincia) return false;
    return true;
  });

  const province = [...new Set(ADOZIONI_SEED.filter((a) => a.tipo === tab).map((a) => a.provincia))].sort();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🏠</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
            Adozioni <span className="text-primary">del cuore</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ogni animale merita una famiglia. Ogni famiglia merita l'animale giusto.
            Qui si incontrano.
          </p>
          <Link
            href="/adozioni/pubblica"
            className="inline-flex items-center gap-2 mt-6 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Plus size={18} />
            Pubblica un annuncio
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSpecie(""); setTaglia(""); setProvincia(""); }}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all text-center ${
                tab === t.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/30 bg-white"
              }`}
            >
              <t.icon size={28} className={`mx-auto mb-2 ${tab === t.id ? t.color : "text-muted-foreground"}`} />
              <h3 className={`font-bold text-lg ${tab === t.id ? "text-foreground" : "text-muted-foreground"}`}>
                {t.label}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{t.desc}</p>
              <span className="inline-block mt-2 text-xs font-semibold bg-muted rounded-full px-2.5 py-0.5">
                {ADOZIONI_SEED.filter((a) => a.tipo === t.id).length} annunci
              </span>
            </button>
          ))}
        </div>

        {/* Filtri */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8 flex flex-wrap items-center gap-3">
          <Filter size={18} className="text-muted-foreground" />

          <select
            value={specie}
            onChange={(e) => setSpecie(e.target.value)}
            className="px-3 py-2 rounded-lg bg-muted text-sm outline-none cursor-pointer"
          >
            <option value="">Tutti gli animali</option>
            <option value="cane">Cani</option>
            <option value="gatto">Gatti</option>
          </select>

          {tab !== "cerco" && (
            <select
              value={taglia}
              onChange={(e) => setTaglia(e.target.value)}
              className="px-3 py-2 rounded-lg bg-muted text-sm outline-none cursor-pointer"
            >
              <option value="">Tutte le taglie</option>
              <option value="piccola">Piccola (0-10 kg)</option>
              <option value="media">Media (10-25 kg)</option>
              <option value="grande">Grande (25-45 kg)</option>
              <option value="gigante">Gigante (45+ kg)</option>
            </select>
          )}

          <select
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            className="px-3 py-2 rounded-lg bg-muted text-sm outline-none cursor-pointer"
          >
            <option value="">Tutta Italia</option>
            {province.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {(specie || taglia || provincia) && (
            <button
              onClick={() => { setSpecie(""); setTaglia(""); setProvincia(""); }}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <X size={14} /> Resetta
            </button>
          )}
        </div>

        {/* Risultati */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((annuncio) => (
            <AnnuncioCard key={annuncio.id} annuncio={annuncio} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Nessun annuncio trovato</h3>
            <p className="text-muted-foreground mb-6">Prova a cambiare i filtri o pubblica tu un annuncio.</p>
            <Link
              href="/adozioni/pubblica"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Plus size={18} /> Pubblica annuncio
            </Link>
          </div>
        )}

        {/* Info box */}
        {/* Sezione Subito.it */}
        <SubitoSection />

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          <div className="bg-red-50 rounded-2xl p-6 text-center">
            <Heart size={28} className="mx-auto mb-3 text-red-500" />
            <h3 className="font-bold text-foreground mb-2">Adozione responsabile</h3>
            <p className="text-sm text-muted-foreground">
              Adottare e un impegno per tutta la vita dell'animale. Informati bene sulla razza, le esigenze e i costi prima di decidere.
            </p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <Shield size={28} className="mx-auto mb-3 text-accent" />
            <h3 className="font-bold text-foreground mb-2">Annunci verificati</h3>
            <p className="text-sm text-muted-foreground">
              Ogni annuncio viene controllato dal nostro team prima della pubblicazione. Zero truffe, zero annunci commerciali.
            </p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 text-center">
            <Syringe size={28} className="mx-auto mb-3 text-secondary" />
            <h3 className="font-bold text-foreground mb-2">Salute garantita</h3>
            <p className="text-sm text-muted-foreground">
              Chiediamo sempre lo stato vaccinale, la sterilizzazione e il microchip. La salute dell'animale viene prima di tutto.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================
// Sezione annunci da Subito.it
// ============================================

interface SubitoAd {
  id: string;
  titolo: string;
  descrizione: string;
  comune: string;
  provincia: string;
  regione: string;
  url: string;
  img: string | null;
  data: string;
  specie: string;
}

function SubitoSection() {
  const [annunci, setAnnunci] = useState<SubitoAd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subito")
      .then((res) => res.json())
      .then((data) => setAnnunci(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-16 text-center py-10">
        <RefreshCw size={24} className="mx-auto text-muted-foreground animate-spin mb-3" />
        <p className="text-muted-foreground text-sm">Caricamento annunci da Subito.it...</p>
      </div>
    );
  }

  if (annunci.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            Annunci da Subito.it
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Annunci reali di cani e gatti in regalo — aggiornati in tempo reale
          </p>
        </div>
        <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
          {annunci.length} annunci
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {annunci.map((ad) => (
          <a
            key={ad.id}
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50"
          >
            {/* Foto */}
            <div className="relative h-48 overflow-hidden bg-muted">
              <img
                src={ad.img || (ad.specie === "gatto"
                  ? "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80"
                  : "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80"
                )}
                alt={ad.titolo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ad.specie === "gatto"
                    ? "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80"
                    : "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80";
                }}
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-primary">
                  In regalo
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 text-foreground text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                <ExternalLink size={10} />
                Subito.it
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                {ad.specie === "gatto" ? <Cat size={12} /> : <Dog size={12} />}
                {ad.specie === "gatto" ? "Gatto" : "Cane"}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {ad.titolo}
              </h3>

              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <MapPin size={13} />
                <span>{ad.comune} ({ad.provincia})</span>
              </div>

              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {ad.descrizione}
              </p>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground">{ad.data}</span>
                <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:underline">
                  Vedi su Subito.it <ExternalLink size={11} />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground mt-6">
        Questi annunci provengono da Subito.it e vengono aggiornati automaticamente.
        MifidoDiTe non e responsabile del contenuto degli annunci esterni.
      </p>
    </div>
  );
}

// ============================================
// Card singolo annuncio
// ============================================

function AnnuncioCard({ annuncio: a }: { annuncio: AnnuncioSeed }) {
  const tipoColor = {
    adotta: "bg-red-100 text-red-700",
    offro: "bg-orange-100 text-primary",
    cerco: "bg-blue-100 text-accent",
  };

  const tipoLabel = {
    adotta: "In adozione",
    offro: "Cerca famiglia",
    cerco: "Cerca animale",
  };

  return (
    <Link
      href={`/adozioni/${a.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50"
    >
      {/* Foto */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={a.foto_principale}
          alt={a.titolo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tipoColor[a.tipo]}`}>
            {tipoLabel[a.tipo]}
          </span>
          {a.tipo_contatto !== "privato" && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 text-foreground">
              {a.tipo_contatto === "associazione" ? "Associazione" : a.tipo_contatto === "rifugio" ? "Rifugio" : "Canile"}
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
          {a.specie === "cane" ? <Dog size={12} /> : <Cat size={12} />}
          {a.specie === "cane" ? "Cane" : "Gatto"}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Nome animale + razza */}
        {a.nome_animale && (
          <div className="flex items-center gap-2 mb-1">
            <span className="font-extrabold text-primary text-lg">{a.nome_animale}</span>
            {a.razza && <span className="text-sm text-muted-foreground">— {a.razza}</span>}
          </div>
        )}

        <h3 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {a.titolo}
        </h3>

        {/* Dettagli quick */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin size={13} /> {a.comune} ({a.provincia})
          </span>
          {a.eta_mesi && (
            <span>{formatEta(a.eta_mesi)}</span>
          )}
          {a.taglia && (
            <span className="capitalize">Taglia {a.taglia}</span>
          )}
          {a.sesso !== "non_specificato" && (
            <span className="capitalize">{a.sesso}</span>
          )}
        </div>

        {/* Badges salute */}
        {a.tipo !== "cerco" && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {a.vaccinato && (
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Vaccinato</span>
            )}
            {a.sterilizzato && (
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Sterilizzato</span>
            )}
            {a.microchip && (
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Microchip</span>
            )}
            {a.compatibile_bambini && (
              <span className="text-xs bg-blue-50 text-accent px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <Baby size={10} /> Bambini ok
              </span>
            )}
          </div>
        )}

        {/* Descrizione breve */}
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{a.descrizione}</p>

        {/* Costo */}
        {a.costo_adozione && (
          <p className="text-xs font-medium text-secondary mt-2">{a.costo_adozione}</p>
        )}
      </div>
    </Link>
  );
}
