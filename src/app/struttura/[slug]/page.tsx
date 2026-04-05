import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { neon } from "@neondatabase/serverless";
import { Star, MapPin, Phone, Mail, Globe, Clock, Shield } from "lucide-react";
import { LeadForm } from "@/components/lead/LeadForm";
import { CATEGORIE_LABELS } from "@/lib/types";
import type { CategoriaTipo } from "@/lib/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Struttura {
  id: string;
  nome: string;
  slug: string;
  descrizione: string | null;
  descrizione_storytelling: string | null;
  categoria: string;
  comune: string;
  provincia: string | null;
  regione: string | null;
  indirizzo: string | null;
  telefono: string | null;
  email: string | null;
  sito_web: string | null;
  foto_copertina: string | null;
  servizi: string[];
  rating_medio: number;
  numero_recensioni: number;
  verificato: boolean;
}

async function getStruttura(slug: string): Promise<Struttura | null> {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT * FROM strutture WHERE slug = ${slug} AND attivo = true LIMIT 1`;
      if (rows.length > 0) return rows[0] as unknown as Struttura;
    } catch {}
  }
  return null;
}

async function getSimili(categoria: string, excludeSlug: string) {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT nome, slug, comune, provincia, foto_copertina, rating_medio FROM strutture WHERE categoria = ${categoria} AND slug != ${excludeSlug} AND attivo = true ORDER BY random() LIMIT 3`;
      return rows;
    } catch {}
  }
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getStruttura(slug);
  return {
    title: s ? `${s.nome} — ${s.comune} — MifidoDiTe.eu` : "Struttura — MifidoDiTe.eu",
    description: s?.descrizione_storytelling || s?.descrizione || "",
  };
}

export default async function StrutturaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getStruttura(slug);

  if (!s) {
    return (
      <>
        <Header />
        <main className="flex-1 py-20 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="text-2xl font-bold">Struttura non trovata</h1>
          <Link href="/professionisti" className="text-primary mt-4 inline-block hover:underline">Torna ai professionisti</Link>
        </main>
        <Footer />
      </>
    );
  }

  const simili = await getSimili(s.categoria, slug);
  const catLabel = CATEGORIE_LABELS[s.categoria as CategoriaTipo] || s.categoria;

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            {" / "}
            <Link href="/professionisti" className="hover:text-primary">Professionisti</Link>
            {" / "}
            <span className="text-foreground">{s.nome}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Hero foto */}
              {s.foto_copertina && (
                <div className="rounded-2xl overflow-hidden">
                  <img src={s.foto_copertina} alt={s.nome} className="w-full h-64 sm:h-96 object-cover" />
                </div>
              )}

              {/* Info */}
              <div className="bg-white rounded-2xl p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{s.nome}</h1>
                      {s.verificato && (
                        <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                          <Shield size={12} /> Verificato
                        </span>
                      )}
                    </div>
                    <span className="inline-block mt-2 text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">{catLabel}</span>
                    <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                      <MapPin size={16} />
                      <span>{s.indirizzo ? `${s.indirizzo}, ` : ""}{s.comune}{s.provincia ? ` (${s.provincia})` : ""}</span>
                    </div>
                  </div>

                  {Number(s.rating_medio) > 0 && (
                    <div className="text-center bg-primary/10 rounded-xl px-4 py-2">
                      <div className="text-2xl font-bold text-primary">{Number(s.rating_medio).toFixed(1)}</div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className={i < Math.round(Number(s.rating_medio)) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.numero_recensioni} recensioni</div>
                    </div>
                  )}
                </div>

                {/* Descrizione */}
                <div className="mt-6">
                  <p className="text-foreground leading-relaxed text-lg">
                    {s.descrizione_storytelling || s.descrizione || "Nessuna descrizione disponibile."}
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
                </div>
              </div>

              {/* Servizi */}
              {s.servizi && s.servizi.length > 0 && (
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
              )}

              {/* Simili */}
              {simili.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">Strutture simili</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {(simili as Array<Record<string, string>>).map((sim) => (
                      <Link key={String(sim.slug)} href={`/struttura/${String(sim.slug)}`} className="group">
                        {sim.foto_copertina ? (
                          <div className="h-28 rounded-xl overflow-hidden mb-2">
                            <img src={String(sim.foto_copertina)} alt={String(sim.nome)} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                        ) : null}
                        <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{String(sim.nome)}</h4>
                        <p className="text-xs text-muted-foreground">{String(sim.comune)} ({String(sim.provincia)})</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar — Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <LeadForm strutturaId={s.id} strutturaNome={s.nome} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
