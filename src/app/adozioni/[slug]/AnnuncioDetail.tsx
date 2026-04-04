"use client";

import { useState } from "react";
import { ArrowLeft, MapPin, Heart, Syringe, Shield, Baby, Dog, Cat, Phone, Mail, Send, CheckCircle } from "lucide-react";
import Link from "next/link";
import { formatEta } from "@/lib/adozioni-seed";
import type { AnnuncioSeed } from "@/lib/adozioni-seed";

interface Props {
  annuncio: AnnuncioSeed;
  simili: AnnuncioSeed[];
}

export function AnnuncioDetail({ annuncio: a, simili }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/adozioni" className="hover:text-primary flex items-center gap-1 w-fit">
          <ArrowLeft size={16} /> Torna alle adozioni
        </Link>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonna principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Foto principale */}
          <div className="rounded-2xl overflow-hidden">
            <img src={a.foto_principale} alt={a.titolo} className="w-full h-72 sm:h-[450px] object-cover" />
          </div>

          {/* Galleria */}
          {a.galleria.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {a.galleria.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden h-28 sm:h-36">
                  <img src={img} alt={`${a.nome_animale || "Foto"} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
                </div>
              ))}
            </div>
          )}

          {/* Info principale */}
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            {/* Badge tipo */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {a.tipo === "adotta" && <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">In adozione</span>}
              {a.tipo === "offro" && <span className="bg-orange-100 text-primary text-sm font-bold px-3 py-1 rounded-full">Cerca nuova famiglia</span>}
              {a.tipo === "cerco" && <span className="bg-blue-100 text-accent text-sm font-bold px-3 py-1 rounded-full">Cerca animale</span>}
              {a.nome_organizzazione && (
                <span className="bg-muted text-muted-foreground text-sm font-medium px-3 py-1 rounded-full">{a.nome_organizzazione}</span>
              )}
            </div>

            {/* Nome e titolo */}
            {a.nome_animale && (
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary">{a.nome_animale}</h1>
            )}
            <h2 className={`${a.nome_animale ? "text-xl mt-2" : "text-3xl"} font-bold text-foreground leading-snug`}>
              {a.titolo}
            </h2>

            <div className="flex items-center gap-1 mt-3 text-muted-foreground">
              <MapPin size={16} />
              <span>{a.comune} ({a.provincia}) — {a.regione}</span>
            </div>

            {/* Scheda dati */}
            {a.tipo !== "cerco" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 p-4 bg-muted/50 rounded-xl">
                <div>
                  <span className="text-xs text-muted-foreground block">Specie</span>
                  <span className="font-semibold capitalize flex items-center gap-1">
                    {a.specie === "cane" ? <Dog size={14} /> : <Cat size={14} />}
                    {a.specie}
                  </span>
                </div>
                {a.razza && (
                  <div>
                    <span className="text-xs text-muted-foreground block">Razza</span>
                    <span className="font-semibold">{a.razza}</span>
                  </div>
                )}
                {a.eta_mesi && (
                  <div>
                    <span className="text-xs text-muted-foreground block">Eta</span>
                    <span className="font-semibold">{formatEta(a.eta_mesi)}</span>
                  </div>
                )}
                {a.sesso !== "non_specificato" && (
                  <div>
                    <span className="text-xs text-muted-foreground block">Sesso</span>
                    <span className="font-semibold capitalize">{a.sesso}</span>
                  </div>
                )}
                {a.taglia && (
                  <div>
                    <span className="text-xs text-muted-foreground block">Taglia</span>
                    <span className="font-semibold capitalize">{a.taglia}</span>
                  </div>
                )}
                {a.colore && (
                  <div>
                    <span className="text-xs text-muted-foreground block">Colore</span>
                    <span className="font-semibold">{a.colore}</span>
                  </div>
                )}
              </div>
            )}

            {/* Descrizione */}
            <div className="mt-6">
              <h3 className="font-bold text-foreground text-lg mb-3">
                {a.tipo === "cerco" ? "Cosa cerco" : "La sua storia"}
              </h3>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{a.descrizione}</p>
            </div>

            {/* Carattere */}
            {a.carattere && (
              <div className="mt-6">
                <h3 className="font-bold text-foreground text-lg mb-3">Carattere</h3>
                <p className="text-foreground/80 leading-relaxed italic">"{a.carattere}"</p>
              </div>
            )}

            {/* Salute e compatibilita */}
            {a.tipo !== "cerco" && (
              <div className="mt-6">
                <h3 className="font-bold text-foreground text-lg mb-3">Salute e compatibilita</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Syringe size={16} className={a.vaccinato ? "text-secondary" : "text-muted-foreground"} />
                    <span className={a.vaccinato ? "text-foreground" : "text-muted-foreground"}>
                      {a.vaccinato ? "Vaccinato" : "Non vaccinato"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className={a.sterilizzato ? "text-secondary" : "text-muted-foreground"} />
                    <span className={a.sterilizzato ? "text-foreground" : "text-muted-foreground"}>
                      {a.sterilizzato ? "Sterilizzato/a" : "Non sterilizzato/a"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className={a.microchip ? "text-secondary" : "text-muted-foreground"} />
                    <span className={a.microchip ? "text-foreground" : "text-muted-foreground"}>
                      {a.microchip ? "Microchip registrato" : "Senza microchip"}
                    </span>
                  </div>
                  {a.compatibile_bambini !== null && (
                    <div className="flex items-center gap-2">
                      <Baby size={16} className={a.compatibile_bambini ? "text-secondary" : "text-red-400"} />
                      <span>{a.compatibile_bambini ? "Compatibile con bambini" : "Non adatto ai bambini"}</span>
                    </div>
                  )}
                  {a.compatibile_cani !== null && (
                    <div className="flex items-center gap-2">
                      <Dog size={16} className={a.compatibile_cani ? "text-secondary" : "text-red-400"} />
                      <span>{a.compatibile_cani ? "Va d'accordo con altri cani" : "Non compatibile con altri cani"}</span>
                    </div>
                  )}
                  {a.compatibile_gatti !== null && (
                    <div className="flex items-center gap-2">
                      <Cat size={16} className={a.compatibile_gatti ? "text-secondary" : "text-red-400"} />
                      <span>{a.compatibile_gatti ? "Va d'accordo con i gatti" : "Non compatibile con gatti"}</span>
                    </div>
                  )}
                </div>

                {a.note_salute && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-xl">
                    <p className="text-sm text-amber-800"><strong>Note salute:</strong> {a.note_salute}</p>
                  </div>
                )}
              </div>
            )}

            {/* Costo */}
            {a.costo_adozione && (
              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <p className="font-semibold text-secondary">{a.costo_adozione}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar — Form contatto */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <ContattoForm annuncio={a} />

            {/* Info contatto */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-3">Pubblicato da</h3>
              <p className="font-semibold text-foreground">{a.nome_contatto}</p>
              {a.nome_organizzazione && (
                <p className="text-sm text-muted-foreground">{a.nome_organizzazione}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2 capitalize">{a.tipo_contatto}</p>
              {a.richiesta_preaffido && (
                <div className="mt-4 p-3 bg-amber-50 rounded-xl text-sm text-amber-800">
                  <strong>Richiesto pre-affido:</strong> sara necessaria una visita a domicilio prima dell'affido definitivo.
                </div>
              )}
            </div>

            {/* Annunci simili */}
            {simili.length > 0 && (
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-4">Annunci simili</h3>
                <div className="space-y-3">
                  {simili.map((s) => (
                    <Link key={s.slug} href={`/adozioni/${s.slug}`} className="flex gap-3 group">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <img src={s.foto_principale} alt={s.nome_animale || s.titolo} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        {s.nome_animale && <p className="font-bold text-primary text-sm">{s.nome_animale}</p>}
                        <p className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{s.titolo}</p>
                        <p className="text-xs text-muted-foreground">{s.comune} ({s.provincia})</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Form di contatto per l'annuncio
// ============================================

function ContattoForm({ annuncio }: { annuncio: AnnuncioSeed }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefono: "",
    messaggio: "",
    ha_giardino: false,
    ha_altri_animali: false,
    ha_bambini: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/adozioni/contatto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ annuncio_id: annuncio.id, ...form }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // gestione errore
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 rounded-2xl p-8 text-center">
        <CheckCircle size={48} className="mx-auto mb-4 text-secondary" />
        <h3 className="text-xl font-bold text-foreground mb-2">Messaggio inviato!</h3>
        <p className="text-muted-foreground text-sm">
          {annuncio.nome_contatto} ricevera il tuo messaggio e ti rispondera al piu presto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <div className="text-center mb-2">
        <Heart size={24} className="mx-auto text-red-400 mb-2" />
        <h3 className="font-bold text-foreground text-lg">
          {annuncio.tipo === "cerco" ? "Hai l'animale giusto?" : `Vuoi conoscere ${annuncio.nome_animale || "questo animale"}?`}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">Scrivi a {annuncio.nome_contatto}</p>
      </div>

      <div>
        <input type="text" required placeholder="Il tuo nome *" value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
      </div>
      <div>
        <input type="email" required placeholder="La tua email *" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
      </div>
      <div>
        <input type="tel" placeholder="Telefono (opzionale)" value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
      </div>
      <div>
        <textarea required rows={3} placeholder="Il tuo messaggio... *" value={form.messaggio}
          onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none" />
      </div>

      {annuncio.tipo !== "cerco" && (
        <div className="space-y-2 pt-2 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground">Informazioni utili (opzionali):</p>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.ha_giardino}
              onChange={(e) => setForm({ ...form, ha_giardino: e.target.checked })}
              className="accent-primary rounded" />
            Ho un giardino/spazio esterno
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.ha_altri_animali}
              onChange={(e) => setForm({ ...form, ha_altri_animali: e.target.checked })}
              className="accent-primary rounded" />
            Ho altri animali in casa
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.ha_bambini}
              onChange={(e) => setForm({ ...form, ha_bambini: e.target.checked })}
              className="accent-primary rounded" />
            Ho bambini
          </label>
        </div>
      )}

      <button type="submit" disabled={loading}
        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 text-sm">
        <Send size={16} />
        {loading ? "Invio in corso..." : "Invia messaggio"}
      </button>
    </form>
  );
}
