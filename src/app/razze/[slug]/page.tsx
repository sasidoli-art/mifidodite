import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Scale, Ruler, Heart, Baby, Home as HomeIcon, Zap, GraduationCap,
  Dog, Sparkles, Check, X, ArrowRight, AlertCircle,
} from "lucide-react";
import { RAZZE } from "@/lib/razze-data";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/json-ld";

export function generateStaticParams() {
  return RAZZE.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const razza = RAZZE.find((r) => r.slug === slug);
  if (!razza) return { title: "Razza non trovata — MifidoDiTe.eu" };

  const title = `${razza.nome} — Caratteristiche, carattere, prezzo, addestramento | MifidoDiTe.eu`;
  const description = `${razza.nome}: scheda completa. ${razza.descrizione} Peso ${razza.pesoMinKg}-${razza.pesoMaxKg}kg, origine ${razza.origine}. Costo mensile ~${razza.costoMensile}€.`;
  const url = `https://www.mifidodite.eu/razze/${slug}`;

  return {
    title,
    description,
    keywords: [razza.nome, `${razza.nome} caratteristiche`, `${razza.nome} prezzo`, `${razza.nome} carattere`, `${razza.nome} costo`, `${razza.nome} addestramento`],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "MifidoDiTe.eu",
      locale: "it_IT",
      images: [{ url: razza.foto, width: 800, height: 600, alt: razza.nome }],
    },
    twitter: { card: "summary_large_image", title, description, images: [razza.foto] },
  };
}

const TAGLIA_LABEL = { piccola: "Piccola", media: "Media", grande: "Grande", gigante: "Gigante" };
const ENERGIA_LABEL = { bassa: "Bassa", media: "Media", alta: "Alta" };
const APPARTAMENTO_LABEL = { ottimo: "Perfetto in appartamento", medio: "Adattabile", sconsigliato: "Sconsigliato in appartamento" };
const BAMBINI_LABEL = { ottimo: "Ottimo", buono: "Buono", medio: "Con cautela" };
const PELO_LABEL = { corto: "Corto", medio: "Medio", lungo: "Lungo" };
const ESPERIENZA_LABEL = { principiante: "Principiante OK", intermedio: "Intermedio", esperto: "Solo esperti" };

export default async function RazzaDettaglioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const razza = RAZZE.find((r) => r.slug === slug);
  if (!razza) notFound();

  // Race condition guard: TS non sa che razza e definito dopo notFound()
  const r = razza!;

  const altre = RAZZE.filter((x) => x.slug !== slug && x.taglia === r.taglia).slice(0, 3);

  const jsonLdData = [
    // DogBreed schema — parziale supporto Google ma utile
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${r.nome}: scheda completa`,
      description: r.descrizione,
      image: [r.foto],
      author: { "@type": "Organization", name: "MifidoDiTe.eu", url: "https://www.mifidodite.eu" },
      publisher: {
        "@type": "Organization",
        name: "MifidoDiTe.eu",
        logo: { "@type": "ImageObject", url: "https://www.mifidodite.eu/icon" },
      },
      datePublished: new Date().toISOString(),
      inLanguage: "it-IT",
      about: {
        "@type": "Thing",
        name: r.nome,
        description: `${r.nome} razza di cane, ${r.origine}`,
      },
    },
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Razze", url: "/razze" },
      { name: r.nome, url: `/razze/${slug}` },
    ]),
    faqJsonLd(r.faq.map((f) => ({ question: f.q, answer: f.a }))),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdData)} />
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-[420px] overflow-hidden relative">
            <img src={r.foto} alt={r.nome} fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs
                  dark
                  items={[
                    { name: "Razze", url: "/razze" },
                    { name: r.nome, url: `/razze/${slug}` },
                  ]}
                />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">{r.nome}</h1>
              <div className="flex items-center gap-3 mt-3 text-white/80 text-sm flex-wrap">
                <span className="flex items-center gap-1"><MapPin size={14} /> {r.origine}</span>
                <span>&middot;</span>
                <span>Taglia {TAGLIA_LABEL[r.taglia]}</span>
                <span>&middot;</span>
                <span>Pelo {PELO_LABEL[r.pelo]}</span>
                <span>&middot;</span>
                <span>Vita {r.vitaMediaMinAnni}-{r.vitaMediaMaxAnni} anni</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-8">
              {/* Intro */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <p className="text-lg text-foreground leading-relaxed">{r.descrizione}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {r.caratteristiche.map((c) => (
                    <span key={c} className="text-xs bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-full font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Storia */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Dog className="text-primary" size={22} /> Storia e origine
                </h2>
                <p className="text-foreground leading-relaxed">{r.storia}</p>
              </div>

              {/* Carattere */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Heart className="text-primary" size={22} /> Carattere e temperamento
                </h2>
                <p className="text-foreground leading-relaxed">{r.carattere}</p>
              </div>

              {/* Addestramento */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="text-primary" size={22} /> Addestramento
                </h2>
                <p className="text-foreground leading-relaxed">{r.addestramento}</p>
              </div>

              {/* Salute */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <AlertCircle className="text-primary" size={22} /> Salute
                </h2>
                <p className="text-foreground leading-relaxed mb-4">{r.salute}</p>
                {r.saluteProblemi.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-wide mb-2">Problemi comuni</h3>
                    <ul className="space-y-1.5">
                      {r.saluteProblemi.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Alimentazione */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-3">Alimentazione</h2>
                <p className="text-foreground leading-relaxed">{r.alimentazione}</p>
              </div>

              {/* Toelettatura */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-3">Toelettatura</h2>
                <p className="text-foreground leading-relaxed">{r.toelettatura}</p>
              </div>

              {/* Ideale per / Non adatto a */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-1.5">
                    <Check size={18} /> Ideale per
                  </h3>
                  <ul className="space-y-1.5">
                    {r.idealePer.map((i) => (
                      <li key={i} className="text-sm text-emerald-900 flex items-start gap-2">
                        <Check size={14} className="flex-shrink-0 mt-0.5" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                  <h3 className="font-bold text-red-900 mb-3 flex items-center gap-1.5">
                    <X size={18} /> Non adatto a
                  </h3>
                  <ul className="space-y-1.5">
                    {r.nonAdattoA.map((i) => (
                      <li key={i} className="text-sm text-red-900 flex items-start gap-2">
                        <X size={14} className="flex-shrink-0 mt-0.5" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQ */}
              {r.faq.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-foreground mb-5">Domande frequenti</h2>
                  <div className="space-y-5">
                    {r.faq.map((f, i) => (
                      <div key={i} className={i > 0 ? "pt-5 border-t border-border" : ""}>
                        <h3 className="font-bold text-foreground mb-2">{f.q}</h3>
                        <p className="text-foreground/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: f.a }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Box info rapide */}
              <div className="bg-white rounded-2xl border border-border p-5 sticky top-20">
                <h3 className="font-bold text-foreground mb-4">Scheda rapida</h3>
                <div className="space-y-3">
                  <StatRow icon={<Scale size={16} className="text-primary" />} label="Peso">
                    {r.pesoMinKg}-{r.pesoMaxKg} kg
                  </StatRow>
                  <StatRow icon={<Ruler size={16} className="text-primary" />} label="Altezza">
                    {r.altezzaMinCm}-{r.altezzaMaxCm} cm
                  </StatRow>
                  <StatRow icon={<Heart size={16} className="text-primary" />} label="Vita media">
                    {r.vitaMediaMinAnni}-{r.vitaMediaMaxAnni} anni
                  </StatRow>
                  <StatRow icon={<Zap size={16} className="text-primary" />} label="Energia">
                    {ENERGIA_LABEL[r.energia]}
                  </StatRow>
                  <StatRow icon={<HomeIcon size={16} className="text-primary" />} label="Appartamento">
                    <span className="capitalize">{r.appartamento === "ottimo" ? "Ottimo" : r.appartamento === "medio" ? "Medio" : "No"}</span>
                  </StatRow>
                  <StatRow icon={<Baby size={16} className="text-primary" />} label="Bambini">
                    {BAMBINI_LABEL[r.bambini]}
                  </StatRow>
                  <StatRow icon={<GraduationCap size={16} className="text-primary" />} label="Esperienza">
                    {ESPERIENZA_LABEL[r.esperienzaMinima]}
                  </StatRow>
                </div>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="text-xs font-bold uppercase text-muted-foreground tracking-wide mb-1">Costo mensile stimato</div>
                  <div className="text-3xl font-extrabold text-primary">~{r.costoMensile}€</div>
                  <p className="text-xs text-muted-foreground mt-1">Cibo, veterinario, accessori, toelettatura</p>
                </div>
                <Link
                  href="/costo-cane"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold rounded-full px-4 py-2.5 hover:bg-primary-dark transition-colors"
                >
                  Calcola costo dettagliato <ArrowRight size={14} />
                </Link>
              </div>

              {/* Quiz CTA */}
              <div className="bg-gradient-to-br from-primary via-primary to-accent text-white rounded-2xl p-5">
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                  <Sparkles size={18} /> Non sei sicuro?
                </h3>
                <p className="text-white/85 text-sm mb-4">Scopri con il quiz se questa razza e quella giusta per te, o quali alternative potresti considerare.</p>
                <Link href="/quiz-razza" className="w-full inline-flex items-center justify-center gap-2 bg-white text-primary font-bold rounded-full px-4 py-2.5 text-sm hover:bg-white/90 transition-colors">
                  Fai il quiz razza
                </Link>
              </div>

              {/* Altre razze */}
              {altre.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-5">
                  <h3 className="font-bold text-foreground mb-4">Altre razze {TAGLIA_LABEL[r.taglia].toLowerCase()}</h3>
                  <div className="space-y-3">
                    {altre.map((a) => (
                      <Link key={a.slug} href={`/razze/${a.slug}`} className="flex gap-3 items-center group">
                        <img src={a.foto} alt={a.nome} loading="lazy" decoding="async" className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{a.nome}</div>
                          <div className="text-xs text-muted-foreground">~{a.costoMensile}€/mese</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/razze" className="mt-4 block text-sm font-semibold text-primary text-center">
                    Tutte le razze →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-wide">{label}</div>
        <div className="text-sm text-foreground font-semibold">{children}</div>
      </div>
    </div>
  );
}
