"use client";

import { User, Coffee, MessageCircle, PawPrint } from "lucide-react";

const STATS = [
  { icon: User, value: "12.500+", label: "Proprietari felici" },
  { icon: PawPrint, value: "3.800+", label: "Professionisti registrati" },
  { icon: MessageCircle, value: "18.000+", label: "Richieste al mese" },
  { icon: Coffee, value: "350+", label: "Spiagge dog-friendly" },
];

export function Stats() {
  return (
    <section
      className="py-16 bg-fixed bg-center bg-cover relative"
      style={{ backgroundImage: "url(/images/slider/bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-dark/85" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center animate-fadeInUp delay-${(i + 1) * 200}`}
            >
              <stat.icon size={36} className="text-primary mx-auto mb-2" strokeWidth={1.5} />
              <div className="text-4xl sm:text-5xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 mt-2 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
