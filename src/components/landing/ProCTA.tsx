import Link from "next/link";

export function ProCTA() {
  return (
    <section
      id="professionisti-cta"
      className="py-20 relative bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url(/images/slider/bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-primary/90" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight animate-zoomIn">
          Hai una pensione, toelettatura
          <br />
          o sei un <span className="text-secondary">dog sitter</span>?
        </h2>

        <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto animate-fadeInUp delay-300">
          Migliaia di proprietari cercano ogni giorno qualcuno di fiducia vicino
          a loro. Registra gratis il tuo profilo e inizia a ricevere richieste.
          <strong className="text-white"> Nessun costo nascosto.</strong>
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {[
            { num: "1", title: "Registrati", desc: "Crea il tuo profilo gratis in 5 minuti" },
            { num: "2", title: "Fatti trovare", desc: "Il tuo profilo visibile a migliaia di proprietari" },
            { num: "3", title: "Ricevi clienti", desc: "Lead reali direttamente nella tua email" },
          ].map((step) => (
            <div key={step.num} className="text-center animate-fadeInUp delay-500">
              <div className="w-14 h-14 rounded-full bg-secondary text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-3">
                {step.num}
              </div>
              <h3 className="text-white font-bold text-lg">{step.title}</h3>
              <p className="text-white/60 text-sm mt-1">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fadeInUp delay-700">
          <Link
            href="/registra-attivita"
            className="bg-secondary text-white px-10 py-4 rounded text-lg font-bold uppercase tracking-wider hover:bg-secondary/90 transition-all"
            style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.2)" }}
          >
            Registra la tua attivita — gratis
          </Link>
          <Link
            href="/per-professionisti"
            className="border-2 border-white/40 text-white px-10 py-4 rounded text-lg font-bold uppercase tracking-wider hover:bg-white/10 transition-all"
          >
            Scopri i piani premium
          </Link>
        </div>

        <div className="mt-8 flex justify-center gap-8 text-white/50 text-sm">
          <span><strong className="text-white">2.400+</strong> professionisti registrati</span>
          <span><strong className="text-white">18.000+</strong> richieste al mese</span>
        </div>
      </div>
    </section>
  );
}
