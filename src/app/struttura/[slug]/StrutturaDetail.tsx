"use client";

import { Star, MapPin, Phone, Mail, Globe, Clock, Shield } from "lucide-react";
import { LeadForm } from "@/components/lead/LeadForm";

// Mock — verra da Supabase
const MOCK_STRUTTURA = {
  id: "1",
  nome: "Pensione Il Rifugio di Fido",
  slug: "pensione-il-rifugio-di-fido-bergamo",
  descrizione: "Pensione per cani e gatti con giardino recintato di 2000mq.",
  descrizione_storytelling:
    "Immagina un posto dove il tuo cane corre libero in un giardino enorme, circondato dal verde delle colline bergamasche. Al Rifugio di Fido ogni ospite ha il suo spazio, le sue coccole e la sua routine. Daniela e il suo team accolgono il tuo amico come fosse il loro: passeggiate mattutine, pasti preparati con cura, e una webcam sempre accesa per farti stare tranquillo anche quando sei lontano. Perche lasciare il tuo cane non deve essere un momento di ansia, ma di fiducia.",
  categoria: "pensione" as const,
  tipo_animale: "entrambi" as const,
  indirizzo: "Via delle Querce 15",
  cap: "24100",
  comune: "Bergamo",
  provincia: "BG",
  regione: "Lombardia",
  telefono: "+39 035 123 4567",
  email: "info@rifugiodifido.it",
  sito_web: "https://rifugiodifido.it",
  facebook_url: "https://facebook.com/rifugiodifido",
  instagram_url: "https://instagram.com/rifugiodifido",
  foto_copertina: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
  galleria: [
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&q=80",
  ],
  servizi: [
    "Giardino recintato 2000mq",
    "Webcam 24h",
    "Veterinario convenzionato",
    "Pasti personalizzati",
    "Passeggiate mattutine e serali",
    "Riscaldamento invernale",
  ],
  prezzi_indicativi: {
    "Cane piccolo": "da 18€/giorno",
    "Cane medio": "da 22€/giorno",
    "Cane grande": "da 28€/giorno",
    Gatto: "da 15€/giorno",
  } as Record<string, string>,
  orari_apertura: {
    "Lun-Ven": "08:00 - 19:00",
    Sabato: "09:00 - 18:00",
    Domenica: "10:00 - 17:00",
  } as Record<string, string>,
  taglie_accettate: ["piccola", "media", "grande"],
  rating_medio: 4.8,
  numero_recensioni: 124,
  affiliazione: "attivo" as const,
  piano: "premium" as const,
  verificato: true,
};

const MOCK_RECENSIONI = [
  {
    id: "r1",
    autore_nome: "Laura M.",
    rating: 5,
    titolo: "Il mio Lucky adora questo posto!",
    testo: "Lascio Lucky qui ogni volta che viaggio per lavoro. Torno e lo trovo sempre felice. Daniela e fantastica, manda foto e video ogni giorno.",
    tipo_animale: "cane" as const,
    nome_animale: "Lucky",
    created_at: "2026-03-15",
  },
  {
    id: "r2",
    autore_nome: "Marco B.",
    rating: 5,
    titolo: "Finalmente un posto di fiducia",
    testo: "Dopo anni di ansie per lasciare il cane, ho trovato il Rifugio. Ambiente pulito, personale attento, prezzi onesti. Consigliatissimo.",
    tipo_animale: "cane" as const,
    nome_animale: "Rex",
    created_at: "2026-03-10",
  },
  {
    id: "r3",
    autore_nome: "Giulia T.",
    rating: 4,
    titolo: "Ottima pensione",
    testo: "Bella struttura, giardino enorme. Unica nota: a volte la webcam va offline. Per il resto tutto perfetto.",
    tipo_animale: "gatto" as const,
    nome_animale: "Micio",
    created_at: "2026-02-28",
  },
];

interface Props {
  slug: string;
}

export function StrutturaDetail({ slug }: Props) {
  // TODO: fetch reale da Supabase usando slug
  const s = MOCK_STRUTTURA;
  const recensioni = MOCK_RECENSIONI;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-primary">Home</a>
        {" / "}
        <a href="/professionisti" className="hover:text-primary">Professionisti</a>
        {" / "}
        <span className="text-foreground">{s.nome}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonna principale */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero immagine */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src={s.foto_copertina || ""}
              alt={s.nome}
              className="w-full h-64 sm:h-96 object-cover"
            />
          </div>

          {/* Galleria */}
          {s.galleria.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {s.galleria.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden h-28 sm:h-36">
                  <img src={img} alt={`${s.nome} foto ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
                </div>
              ))}
            </div>
          )}

          {/* Info base */}
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {s.nome}
                  </h1>
                  {s.verificato && (
                    <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      <Shield size={12} /> Verificato
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span>{s.indirizzo}, {s.cap} {s.comune} ({s.provincia})</span>
                </div>
              </div>

              {s.rating_medio > 0 && (
                <div className="text-center bg-primary/10 rounded-xl px-4 py-2">
                  <div className="text-2xl font-bold text-primary">{s.rating_medio.toFixed(1)}</div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < Math.round(s.rating_medio) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.numero_recensioni} recensioni</div>
                </div>
              )}
            </div>

            {/* Descrizione storytelling */}
            <div className="mt-6">
              <p className="text-foreground leading-relaxed text-lg">
                {s.descrizione_storytelling || s.descrizione}
              </p>
            </div>

            {/* Contatti */}
            <div className="mt-6 flex flex-wrap gap-3">
              {s.telefono && (
                <a href={`tel:${s.telefono}`} className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                  <Phone size={16} /> {s.telefono}
                </a>
              )}
              {s.email && (
                <a href={`mailto:${s.email}`} className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                  <Mail size={16} /> Email
                </a>
              )}
              {s.sito_web && (
                <a href={s.sito_web} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                  <Globe size={16} /> Sito web
                </a>
              )}
              {s.facebook_url && (
                <a href={s.facebook_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors">
                  <Globe size={16} /> Facebook
                </a>
              )}
              {s.instagram_url && (
                <a href={s.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl text-sm font-medium hover:bg-pink-500 hover:text-white transition-colors">
                  <Globe size={16} /> Instagram
                </a>
              )}
            </div>
          </div>

          {/* Servizi */}
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Servizi</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {s.servizi.map((servizio) => (
                <div key={servizio} className="flex items-center gap-2 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {servizio}
                </div>
              ))}
            </div>
          </div>

          {/* Prezzi */}
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Prezzi indicativi</h2>
            <div className="space-y-2">
              {Object.entries(s.prezzi_indicativi).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-foreground">{key}</span>
                  <span className="font-semibold text-primary">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Orari */}
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock size={20} /> Orari di apertura
            </h2>
            <div className="space-y-2">
              {Object.entries(s.orari_apertura).map(([giorno, orario]) => (
                <div key={giorno} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-foreground font-medium">{giorno}</span>
                  <span className="text-muted-foreground">{orario}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recensioni */}
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Recensioni ({recensioni.length})
            </h2>
            <div className="space-y-6">
              {recensioni.map((r) => (
                <div key={r.id} className="border-b border-border last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-foreground">{r.autore_nome}</span>
                      {r.nome_animale && (
                        <span className="text-sm text-muted-foreground ml-2">
                          con {r.nome_animale} 🐾
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className={i < r.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                      ))}
                    </div>
                  </div>
                  {r.titolo && (
                    <h4 className="font-medium text-foreground mt-2">{r.titolo}</h4>
                  )}
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{r.testo}</p>
                  <span className="text-xs text-muted-foreground mt-2 block">{r.created_at}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar — Lead Form sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <LeadForm strutturaId={s.id} strutturaNome={s.nome} />
          </div>
        </div>
      </div>
    </div>
  );
}
