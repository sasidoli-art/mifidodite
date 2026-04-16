import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { RISTORANTI_SEED, slugifyRegioneR } from "@/lib/ristoranti-seed";
import { RistorantiClient, type RistoranteUI } from "./RistorantiClient";

export const metadata = {
  title: "Ristoranti pet-friendly in Italia 2026 — Dove mangiare con il cane | MifidoDiTe.eu",
  description: "Mappa dei ristoranti, pizzerie, osterie e agriturismi pet-friendly in Italia. Dehors, giardini e locali che accolgono i cani.",
  keywords: ["ristoranti pet friendly", "dove mangiare con il cane", "ristoranti cani ammessi", "pizzerie pet friendly"],
  alternates: { canonical: "https://www.mifidodite.eu/ristoranti" },
  openGraph: {
    type: "website",
    title: "Ristoranti pet-friendly in Italia 2026",
    description: "Mappa dei ristoranti che accolgono i cani: osterie, pizzerie, agriturismi e bistrot.",
    url: "https://www.mifidodite.eu/ristoranti",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function RistorantiPage() {
  const ristoranti: RistoranteUI[] = RISTORANTI_SEED.map((r) => ({
    slug: r.slug,
    nome: r.nome,
    comune: r.comune,
    provincia: r.provincia,
    regione: r.regione,
    regioneSlug: slugifyRegioneR(r.regione),
    tipo: r.tipo,
    descrizione: r.descrizione,
    fascia: r.fascia,
    cucina: r.cucina,
    conDehors: r.conDehors,
    conGiardino: r.conGiardino,
    menuCane: r.menuCane,
    ciotoleAcqua: r.ciotoleAcqua,
    img: r.img,
    lat: r.lat,
    lng: r.lng,
  }));

  const regioni = Array.from(new Set(ristoranti.map((r) => r.regione))).sort();

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Ristoranti <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">pet-friendly</span> in Italia
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              {ristoranti.length} ristoranti, osterie, pizzerie e agriturismi in {regioni.length} regioni dove il tuo cane e il benvenuto. Mappa interattiva con filtri.
            </p>
          </div>
        </section>

        <RistorantiClient ristoranti={ristoranti} />

        <section className="py-8 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Verifica sempre con il ristorante prima di andare: le politiche pet possono variare per stagione, orario e tipo di cane. La maggior parte dei ristoranti accetta cani nell&apos;area dehors/esterna.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
