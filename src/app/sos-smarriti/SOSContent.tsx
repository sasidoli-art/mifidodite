"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Heart, MapPin, Phone, Clock, Search, Eye, Share2, Plus, Dog, Cat } from "lucide-react";
import Link from "next/link";
import type { SOSSeed } from "@/lib/sos-seed";

export function SOSContent() {
  const [tab, setTab] = useState<"perso" | "trovato">("perso");
  const [provincia, setProvincia] = useState("");
  const [allSOS, setAllSOS] = useState<SOSSeed[]>([]);

  useEffect(() => {
    fetch("/api/sos-list").then(r => r.json()).then(setAllSOS).catch(() => {});
  }, []);

  const province = [...new Set(allSOS.map((s) => s.provincia))].sort();

  const filtered = allSOS.filter((s: SOSSeed) => {
    if (s.tipo !== tab) return false;
    if (provincia && s.provincia !== provincia) return false;
    return true;
  });

  return (
    <>
      {/* Hero urgente */}
      <section className="bg-gradient-to-br from-red-500 via-red-600 to-orange-500 py-14 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <AlertTriangle size={48} className="mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold">SOS Smarriti</h1>
          <p className="mt-3 text-lg text-white/90 max-w-xl mx-auto">
            Hai perso il tuo animale? Hai trovato un cane o gatto vagante?
            Pubblica un annuncio e aiutaci a riunire le famiglie.
          </p>
          <Link
            href="/sos-smarriti/segnala"
            className="inline-flex items-center gap-2 mt-6 bg-white text-red-600 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-white/90 transition-colors shadow-lg"
          >
            <Plus size={20} />
            Segnala subito
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setTab("perso")}
            className={`p-5 rounded-2xl border-2 text-center transition-all ${
              tab === "perso"
                ? "border-red-400 bg-red-50 shadow-sm"
                : "border-border bg-white hover:border-red-200"
            }`}
          >
            <AlertTriangle size={28} className={`mx-auto mb-2 ${tab === "perso" ? "text-red-500" : "text-muted-foreground"}`} />
            <h3 className={`font-bold text-lg ${tab === "perso" ? "text-red-600" : "text-muted-foreground"}`}>
              Ho perso
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Il mio animale e scomparso</p>
            <span className="inline-block mt-2 text-xs font-semibold bg-red-100 text-red-600 rounded-full px-2.5 py-0.5">
              {allSOS.filter((s) => s.tipo === "perso").length} segnalazioni
            </span>
          </button>

          <button
            onClick={() => setTab("trovato")}
            className={`p-5 rounded-2xl border-2 text-center transition-all ${
              tab === "trovato"
                ? "border-green-400 bg-green-50 shadow-sm"
                : "border-border bg-white hover:border-green-200"
            }`}
          >
            <Heart size={28} className={`mx-auto mb-2 ${tab === "trovato" ? "text-green-500" : "text-muted-foreground"}`} />
            <h3 className={`font-bold text-lg ${tab === "trovato" ? "text-green-600" : "text-muted-foreground"}`}>
              Ho trovato
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Ho trovato un animale vagante</p>
            <span className="inline-block mt-2 text-xs font-semibold bg-green-100 text-green-600 rounded-full px-2.5 py-0.5">
              {allSOS.filter((s) => s.tipo === "trovato").length} segnalazioni
            </span>
          </button>
        </div>

        {/* Filtro provincia */}
        <div className="flex items-center gap-3 mb-6">
          <select
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white border border-border text-sm outline-none cursor-pointer"
          >
            <option value="">Tutta Italia</option>
            {province.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <span className="text-sm text-muted-foreground">{filtered.length} segnalazioni</span>
        </div>

        {/* Card annunci */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((sos) => (
            <SOSCard key={sos.id} sos={sos} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-bold text-foreground">Nessuna segnalazione</h3>
            <p className="text-muted-foreground mt-2">Non ci sono segnalazioni per questa zona. Cambia provincia o pubblica tu una segnalazione.</p>
          </div>
        )}

        {/* Info box */}
        <div className="mt-12 bg-amber-50 rounded-2xl p-6 sm:p-8">
          <h3 className="font-bold text-foreground text-lg mb-3">Cosa fare se perdi il tuo animale</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-foreground/80">
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-primary font-bold">1.</span> Cerca subito nelle vicinanze — molti animali restano nel raggio di 1 km</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">2.</span> Lascia una cuccia o un tuo indumento fuori casa — l'odore li guida</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">3.</span> Pubblica una segnalazione qui e sui social</li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-primary font-bold">4.</span> Chiama i canili e i rifugi della zona</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">5.</span> Contatta la polizia municipale / ASL veterinaria</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">6.</span> Se ha il microchip, segnala lo smarrimento all'anagrafe canina</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function SOSCard({ sos: s }: { sos: SOSSeed }) {
  const isPerso = s.tipo === "perso";

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border-2 transition-all hover:shadow-lg ${
      isPerso ? "border-red-200 hover:border-red-300" : "border-green-200 hover:border-green-300"
    }`}>
      {/* Foto */}
      <div className="relative h-52 overflow-hidden">
        <img src={s.foto} alt={s.nome_animale || s.descrizione} className="w-full h-full object-cover" />
        <div className={`absolute top-0 left-0 right-0 py-1.5 text-center text-sm font-bold text-white ${
          isPerso ? "bg-red-500" : "bg-green-500"
        }`}>
          {isPerso ? "⚠️ SMARRITO" : "✅ TROVATO"}
        </div>
        {s.ricompensa && (
          <div className="absolute bottom-3 left-3 bg-amber-400 text-foreground text-xs font-bold px-3 py-1 rounded-full">
            {s.ricompensa}
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
          {s.specie === "gatto" ? <Cat size={12} /> : <Dog size={12} />}
          {s.specie === "gatto" ? "Gatto" : "Cane"}
        </div>
      </div>

      <div className="p-4">
        {/* Nome e razza */}
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {s.nome_animale && <span className="font-extrabold text-lg text-foreground">{s.nome_animale}</span>}
          {s.razza && <span className="text-sm text-muted-foreground">— {s.razza}</span>}
        </div>

        {/* Dettagli */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="capitalize">{s.colore}</span>
          <span className="capitalize">Taglia {s.taglia}</span>
        </div>

        {/* Dove e quando */}
        <div className="mt-3 space-y-1">
          <p className="text-sm flex items-center gap-1.5">
            <MapPin size={14} className={isPerso ? "text-red-400" : "text-green-500"} />
            <strong>{s.comune} ({s.provincia})</strong> — {s.indirizzo_evento}
          </p>
          <p className="text-xs flex items-center gap-1.5 text-muted-foreground">
            <Clock size={12} />
            {s.data_evento} {s.ora_evento ? `alle ${s.ora_evento}` : ""}
          </p>
        </div>

        <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{s.descrizione}</p>

        {/* Azioni */}
        <div className="flex gap-2 mt-4">
          <a
            href={`tel:${s.telefono_contatto.replace(/\s/g, "")}`}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white transition-colors ${
              isPerso ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            <Phone size={16} />
            Chiama
          </a>
          <button className="px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-colors" title="Condividi">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
