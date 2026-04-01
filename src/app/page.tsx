import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Categories } from "@/components/landing/Categories";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Categories />

        {/* Trust section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Perche MifidoDiTe?
            </h2>
            <div className="grid sm:grid-cols-3 gap-8 mt-10">
              <div>
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-semibold text-lg mb-2">
                  Troviamo chi non si trova
                </h3>
                <p className="text-muted-foreground text-sm">
                  Cerchiamo ogni settimana su Facebook, gruppi locali e
                  passaparola. Portiamo alla luce i professionisti invisibili.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">💛</div>
                <h3 className="font-semibold text-lg mb-2">
                  Recensioni vere
                </h3>
                <p className="text-muted-foreground text-sm">
                  Solo recensioni verificate da altri proprietari. Nessuna
                  valutazione comprata o falsa.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">📍</div>
                <h3 className="font-semibold text-lg mb-2">
                  Vicino a te, davvero
                </h3>
                <p className="text-muted-foreground text-sm">
                  Ricerca per CAP con raggio in km. Risultati reali, non
                  generici elenchi nazionali.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
