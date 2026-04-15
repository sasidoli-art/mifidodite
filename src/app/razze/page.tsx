import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { RAZZE } from "@/lib/razze-data";
import { MapPin, Dog, Home as HomeIcon, ArrowRight, Sparkles } from "lucide-react";
import { collectionJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Razze di cani: guide complete 2026 — MifidoDiTe.eu",
  description: "20 schede razza complete con caratteristiche, carattere, addestramento, salute, alimentazione e costi. Scegli la razza giusta per te con la nostra guida.",
  keywords: ["razze cani", "razze di cani", "caratteristiche razza cane", "scheda razza", "guida razze", "scegliere razza"],
  alternates: { canonical: "https://www.mifidodite.eu/razze" },
  openGraph: {
    type: "website",
    title: "Razze di cani: guide complete 2026",
    description: "20 schede dettagliate delle razze piu amate in Italia, con carattere, salute, costi e idonea per chi.",
    url: "https://www.mifidodite.eu/razze",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80", width: 1200, height: 630 }],
  },
};

const TAGLIA_LABEL = { piccola: "Piccola", media: "Media", grande: "Grande", gigante: "Gigante" };
const ENERGIA_LABEL = { bassa: "Bassa", media: "Media", alta: "Alta" };
const APPARTAMENTO_LABEL = {
  ottimo: "Perfetto in appartamento",
  medio: "Adattabile",
  sconsigliato: "Sconsigliato in appartamento",
};

export default function RazzePage() {
  const perTaglia: Record<string, typeof RAZZE> = { piccola: [], media: [], grande: [], gigante: [] };
  for (const r of RAZZE) perTaglia[r.taglia].push(r);

  const jsonLdData = collectionJsonLd("Razze di cani — schede complete", "/razze", RAZZE.length);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdData)} />
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">Razze di cani</span> — guide complete
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              {RAZZE.length} schede dettagliate: carattere, salute, addestramento, costi e chi ne e adatto.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/quiz-razza"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full px-6 py-3 text-sm shadow-lg hover:scale-[1.02] transition-all"
              >
                <Sparkles size={16} /> Non sai quale scegliere? Fai il quiz
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {(["piccola", "media", "grande", "gigante"] as const).map((taglia) => (
            perTaglia[taglia].length > 0 && (
              <section key={taglia} className="mb-14">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Dog className="text-primary" size={24} /> Taglia {TAGLIA_LABEL[taglia]}
                  <span className="text-sm font-normal text-muted-foreground ml-2">({perTaglia[taglia].length})</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {perTaglia[taglia].map((r) => (
                    <Link
                      key={r.slug}
                      href={`/razze/${r.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50"
                    >
                      <div className="h-52 overflow-hidden relative">
                        <img
                          src={r.foto}
                          alt={r.nome}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/95 text-foreground capitalize">
                          {ENERGIA_LABEL[r.energia]} energia
                        </span>
                        <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-primary/95 text-white">
                          ~{r.costoMensile}€/mese
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-extrabold text-xl text-foreground group-hover:text-primary transition-colors">{r.nome}</h3>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <MapPin size={12} /> {r.origine}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.descrizione}</p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                          <HomeIcon size={12} /> {APPARTAMENTO_LABEL[r.appartamento]}
                        </div>
                        <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                          Scheda completa <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          ))}

          <section className="mt-16 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-3xl border border-border p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Non sai ancora quale razza fa per te?</h2>
            <p className="text-muted-foreground mb-5 max-w-2xl mx-auto">
              Il nostro quiz di 6 domande ti suggerisce le 3 razze piu adatte al tuo stile di vita, alla tua casa e alla tua esperienza.
            </p>
            <Link
              href="/quiz-razza"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold rounded-full px-6 py-3 text-sm shadow-lg hover:bg-primary-dark transition-colors"
            >
              <Sparkles size={16} /> Fai il quiz gratis
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
