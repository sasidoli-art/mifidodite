"use client";

import { useState, useEffect } from "react";
import { Heart, Plus, Syringe, Shield, ExternalLink, RefreshCw, Dog, Cat, MapPin } from "lucide-react";
import Link from "next/link";

export function AdozioniContent() {

  return (
    <>
      {/* Hero */}
      <section className="bg-muted py-16">
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
        {/* Sezione Subito.it — annunci reali */}
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
        {annunci.map((ad, index) => (
          <a
            key={`${ad.id}-${index}`}
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

