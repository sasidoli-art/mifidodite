"use client";

import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Tag, MapPin, Clock, ExternalLink, Filter, X, Percent } from "lucide-react";
import { OFFERTE_SEED, CATEGORIE_PRODOTTO } from "@/lib/offerte-seed";
import type { OffertaSeed } from "@/lib/offerte-seed";

export default function OffertePage() {
  const [categoria, setCategoria] = useState("");
  const [provincia, setProvincia] = useState("");

  const province = [...new Set(OFFERTE_SEED.map((o) => o.provincia))].sort();

  const filtered = OFFERTE_SEED.filter((o) => {
    if (categoria && o.categoria_prodotto !== categoria) return false;
    if (provincia && o.provincia !== provincia) return false;
    return true;
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <Percent size={48} className="mx-auto mb-4 text-fuchsia-500" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
              Offerte e <span className="text-primary">Volantini</span> Pet
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Le migliori offerte su cibo, accessori e prodotti per cani e gatti
              dai negozi di tutta Italia. Aggiornate ogni settimana.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filtri */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-8 flex flex-wrap items-center gap-3">
            <Filter size={18} className="text-muted-foreground" />

            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
              className="px-3 py-2 rounded-lg bg-muted text-sm outline-none cursor-pointer">
              <option value="">Tutte le categorie</option>
              {Object.entries(CATEGORIE_PRODOTTO).map(([key, { label, emoji }]) => (
                <option key={key} value={key}>{emoji} {label}</option>
              ))}
            </select>

            <select value={provincia} onChange={(e) => setProvincia(e.target.value)}
              className="px-3 py-2 rounded-lg bg-muted text-sm outline-none cursor-pointer">
              <option value="">Tutta Italia</option>
              {province.map((p) => (
                <option key={p} value={p}>{p === "IT" ? "Online" : p}</option>
              ))}
            </select>

            {(categoria || provincia) && (
              <button onClick={() => { setCategoria(""); setProvincia(""); }}
                className="text-sm text-primary hover:underline flex items-center gap-1">
                <X size={14} /> Resetta
              </button>
            )}

            <span className="ml-auto text-sm text-muted-foreground">{filtered.length} offerte</span>
          </div>

          {/* Categorie quick */}
          <div className="flex flex-wrap gap-2 mb-8">
            {Object.entries(CATEGORIE_PRODOTTO).map(([key, { label, emoji }]) => {
              const count = OFFERTE_SEED.filter((o) => o.categoria_prodotto === key).length;
              return (
                <button key={key} onClick={() => setCategoria(categoria === key ? "" : key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    categoria === key
                      ? "bg-primary text-white"
                      : "bg-white text-foreground hover:bg-muted border border-border"
                  }`}>
                  {emoji} {label}
                  <span className="text-xs opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Grid offerte */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((offerta) => (
              <OffertaCard key={offerta.id} offerta={offerta} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Tag size={48} className="mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-bold">Nessuna offerta trovata</h3>
              <p className="text-muted-foreground mt-2">Prova a cambiare i filtri.</p>
            </div>
          )}

          {/* Info */}
          <div className="mt-12 bg-muted/50 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-foreground mb-2">Sei un negozio pet?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Pubblica le tue offerte su MifidoDiTe.eu e raggiungi migliaia di proprietari nella tua zona. Gratis.
            </p>
            <a href="/registra-attivita" className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
              Registra il tuo negozio
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function OffertaCard({ offerta: o }: { offerta: OffertaSeed }) {
  const catInfo = CATEGORIE_PRODOTTO[o.categoria_prodotto];
  const scaduto = new Date(o.valido_al) < new Date();

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border/50 ${scaduto ? "opacity-50" : ""}`}>
      {/* Immagine */}
      <div className="relative h-40 overflow-hidden bg-muted">
        <img src={o.img} alt={o.titolo} className="w-full h-full object-cover" />

        {o.sconto_percentuale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-extrabold px-3 py-1 rounded-full">
            -{o.sconto_percentuale}%
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white/90 text-foreground text-xs font-medium px-2 py-0.5 rounded-full">
          {catInfo?.emoji} {catInfo?.label}
        </div>

        {scaduto && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-foreground font-bold px-4 py-2 rounded-full text-sm">Scaduta</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Negozio */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-primary">{o.nome_negozio}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin size={10} />
            {o.provincia === "IT" ? "Online" : `${o.comune} (${o.provincia})`}
          </span>
        </div>

        {/* Titolo */}
        <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2">{o.titolo}</h3>

        {/* Marca */}
        {o.marca && <p className="text-xs text-muted-foreground mt-1">{o.marca}</p>}

        {/* Prezzo */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-lg font-extrabold text-primary">{o.prezzo_scontato}</span>
          {o.prezzo_originale && (
            <span className="text-sm text-muted-foreground line-through">{o.prezzo_originale}</span>
          )}
        </div>

        {/* Validita */}
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <Clock size={11} />
          Valida fino al {new Date(o.valido_al).toLocaleDateString("it-IT")}
        </div>
      </div>
    </div>
  );
}
