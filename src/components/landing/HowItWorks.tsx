import { Search, Star, Send } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Cerca vicino a te",
    description:
      "Inserisci il tuo CAP o comune e scopri pensioni, professionisti e spiagge pet-friendly nel raggio di 30 km.",
  },
  {
    icon: Star,
    title: "Scegli con fiducia",
    description:
      "Leggi le recensioni di altri proprietari, guarda le foto e confronta servizi e prezzi.",
  },
  {
    icon: Send,
    title: "Chiedi disponibilita",
    description:
      "Compila il form in 30 secondi. Il professionista riceve la tua richiesta e ti risponde direttamente.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Come funziona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tre passi per trovare chi si prendera cura del tuo amico
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {STEPS.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-primary mb-6">
                <step.icon size={32} />
              </div>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
