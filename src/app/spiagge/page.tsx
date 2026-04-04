import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { MapPin, Star, Waves } from "lucide-react";
import Link from "next/link";
import { SPIAGGE_SEED } from "@/lib/spiagge-seed";

export const metadata = {
  title: "Spiagge Dog-Friendly in Italia — MifidoDiTe.eu",
  description: "La guida completa alle spiagge italiane che accettano cani. Cerca per regione e trova la spiaggia perfetta per te e il tuo amico.",
};

const REGIONI = [...new Set(SPIAGGE_SEED.map((s) => s.regione))];

export default function SpiaggePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="text-5xl mb-4">🏖️</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
              Spiagge <span className="text-accent">Dog-Friendly</span> in Italia
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {SPIAGGE_SEED.length} spiagge verificate in {REGIONI.length} regioni dove il tuo cane e il benvenuto.
              Dati reali da ENPA, Zampa Vacanza e fonti ufficiali.
            </p>

            {/* Filtro regioni */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {REGIONI.map((r) => (
                <a
                  key={r}
                  href={`#${r.toLowerCase().replace(/[\s-]+/g, "-")}`}
                  className="bg-white text-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-colors cursor-pointer shadow-sm"
                >
                  {r} ({SPIAGGE_SEED.filter((s) => s.regione === r).length})
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Lista per regione */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {REGIONI.map((regione) => {
            const spiaggeRegione = SPIAGGE_SEED.filter((s) => s.regione === regione);
            return (
              <section key={regione} id={regione.toLowerCase().replace(/[\s-]+/g, "-")} className="mb-14 scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Waves className="text-accent" size={24} />
                  {regione}
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({spiaggeRegione.length} {spiaggeRegione.length === 1 ? "spiaggia" : "spiagge"})
                  </span>
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {spiaggeRegione.map((spiaggia) => (
                    <div
                      key={spiaggia.slug}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={spiaggia.img}
                          alt={spiaggia.nome}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Waves size={12} /> {spiaggia.tipo}
                        </span>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                          {spiaggia.nome}
                        </h3>
                        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                          <MapPin size={14} />
                          {spiaggia.comune} ({spiaggia.provincia})
                        </div>

                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                          {spiaggia.descrizione}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {spiaggia.servizi.slice(0, 4).map((s) => (
                            <span key={s} className="text-xs bg-blue-50 text-accent px-2 py-0.5 rounded-full">
                              {s}
                            </span>
                          ))}
                          {spiaggia.servizi.length > 4 && (
                            <span className="text-xs text-muted-foreground">+{spiaggia.servizi.length - 4}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Disclaimer */}
        <section className="py-8 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Verifica sempre le ordinanze comunali prima di recarti in spiaggia con il tuo cane.
              Le regole possono cambiare di stagione in stagione (generalmente da Pasqua al 2 novembre).
              <br />
              Fonti: ENPA, Zampa Vacanza, Dogwelcome, Wamiz, VacanzeAnimali.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
