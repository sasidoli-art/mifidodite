import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Landmark, Waves, Mountain } from "lucide-react";
import { VACANZE_SEED } from "@/lib/vacanze-seed";

export const metadata = {
  title: "Vacanze con il Cane in Veneto 2026 — Hotel Pet-Friendly Venezia, Verona, Lago di Garda | MifidoDiTe.eu",
  description: "Scopri le migliori vacanze con il cane in Veneto. Hotel pet-friendly a Venezia, Verona, Treviso. Laghi, montagne e città UNESCO con il tuo cane.",
  keywords: ["vacanze cani veneto", "hotel pet friendly venezia", "verona cani", "lago di garda cani", "treviso cani"],
  alternates: { canonical: "https://www.mifidodite.eu/vacanze/veneto/guida" },
  openGraph: {
    type: "article",
    title: "Vacanze con il Cane in Veneto 2026",
    description: "Venezia, Verona, Lago di Garda. Scopri dove portare il tuo cane in Veneto.",
    url: "https://www.mifidodite.eu/vacanze/veneto/guida",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1552883547-74d440642117?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function VenetoGuida() {
  const venetoStructures = VACANZE_SEED.filter(s => s.regione === "Veneto").slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1552883547-74d440642117?w=1200&q=80" alt="Veneto" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs dark items={[{ name: "Vacanze", url: "/vacanze" }, { name: "Veneto", url: "/vacanze/veneto" }, { name: "Guida", url: "/vacanze/veneto/guida" }]} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Vacanze con il Cane in Veneto</h1>
              <p className="text-lg text-white/80 max-w-2xl">Venezia, Verona, Lago di Garda e le Dolomiti. Il Veneto offre bellezze straordinarie e una cultura pet-friendly. Scopri vacanze indimenticabili con il tuo cane.</p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Veneto: arte, laghi e montagne con il cane</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Il Veneto è una regione di straordinaria bellezza: la Repubblica Serena di Venezia, la dolce romanticità di Verona, il Lago di Garda e le Dolomiti. E tutto questo è accessibile a chi vuole viaggiare con il cane.</p>
              <p>Venezia è una sfida (città d'acqua), ma Verona, il Lago di Garda e l'entroterra veneto sono perfetti per chi ha un cane. Hotel accoglienti, sentieri escursionistici nelle Dolomiti, spiagge lacustri, e la cucina locale (risotto, prosecco, asparagi di Marostica) completano l'esperienza.</p>
            </div>
          </section>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <Landmark size={28} className="text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Arte e storia</h3>
              <p className="text-sm text-muted-foreground">Verona, Treviso, Padova. Città UNESCO dove il tuo cane al guinzaglio è il benvenuto nei centri storici.</p>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <Mountain size={28} className="text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Dolomiti</h3>
              <p className="text-sm text-muted-foreground">Sentieri cane-friendly tra le montagne più belle del mondo. Escursioni per tutte le difficoltà.</p>
            </div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
              <Waves size={28} className="text-secondary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Lago di Garda</h3>
              <p className="text-sm text-muted-foreground">Spiagge lacustri, sentieri panoramici, borghi affascinanti. Il più grande lago d'Italia è cane-friendly.</p>
            </div>
          </div>

          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli per vacanze in Veneto con il cane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Venezia: non portare il cane in centro città</p>
                  <p className="text-sm text-muted-foreground">Venezia è un labirinto di calli strette. Meglio esplorare Mestre o la terraferma con il cane.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Verona: una delle migliori città per cani</p>
                  <p className="text-sm text-muted-foreground">Verona è molto cane-friendly. Anfiteatro, Piazza Bra, Ponte Pietra: passeggia tranquillamente con il tuo cane.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Lago di Garda: sentieri e spiagge</p>
                  <p className="text-sm text-muted-foreground">Il lago ha bellissimi sentieri e spiagge cane-friendly. Limone, Malcesine, Sirmione: scegli la tua sponda.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <div>
                  <p className="font-semibold text-foreground">Dolomiti: escursionismo con il cane</p>
                  <p className="text-sm text-muted-foreground">Sentieri magnifici, rifugi che accolgono cani. Porta scarpe comode e acqua a sufficienza.</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le migliori strutture pet-friendly in Veneto</h2>
            <div className="space-y-6">
              {venetoStructures.length > 0 ? venetoStructures.map((s) => (
                <Link key={s.slug} href={`/vacanze/veneto/${s.slug}`}>
                  <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
                    <div className="grid sm:grid-cols-3 gap-0">
                      <div className="h-48 sm:h-auto overflow-hidden">
                        <img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="col-span-2 p-6 flex flex-col justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p>
                          <p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p>
                        </div>
                        <div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div>
                      </div>
                    </div>
                  </div>
                </Link>
              )) : <p className="text-muted-foreground text-center py-8">Nessuna struttura al momento. Torna presto!</p>}
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Scopri tutte le opzioni in Veneto</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Visualizza tutte le strutture pet-friendly verificate in Veneto. Hotel sul Lago di Garda, agriturismi nelle Dolomiti, B&B a Verona.</p>
            <Link href="/vacanze/veneto" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le strutture in Veneto →</Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
