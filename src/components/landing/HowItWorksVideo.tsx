"use client";

import { motion } from "framer-motion";
import { Search, Heart, MessageCircle, Smile } from "lucide-react";
import { useState, useEffect } from "react";

// Storia animata: 4 scene che si auto-avanzano ogni 4 secondi
const SCENES = [
  {
    titolo: "1. Cerca",
    descrizione: "Inserisci dove sei e cosa cerchi: pensione, dog sitter, veterinario...",
    icon: Search,
    color: "#EA580C",
  },
  {
    titolo: "2. Scopri",
    descrizione: "Vedi i professionisti pet vicino a te con foto, recensioni e contatti",
    icon: Heart,
    color: "#F97316",
  },
  {
    titolo: "3. Contatta",
    descrizione: "Invia una richiesta gratuita. Riceverai risposta direttamente dal professionista",
    icon: MessageCircle,
    color: "#FB923C",
  },
  {
    titolo: "4. Goditi la tranquillita",
    descrizione: "Il tuo amico a 4 zampe e in mani sicure. Mi fido di te.",
    icon: Smile,
    color: "#FDBA74",
  },
];

export function HowItWorksVideo() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % SCENES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scene = SCENES[currentScene];
  const Icon = scene.icon;

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-white text-primary text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm mb-4">
            Come funziona MifidoDiTe
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground">
            Guarda come funziona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            In pochi secondi trovi chi si prendera cura del tuo amico a 4 zampe
          </p>
        </motion.div>

        {/* Video stage */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Schermo "video" con bordi tipo TV */}
          <div className="relative aspect-[16/9] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-foreground/5">
            {/* Sfondo decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
              {/* Zampine sfondo */}
              {[...Array(12)].map((_, i) => (
                <motion.svg
                  key={i}
                  className="absolute opacity-10"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={scene.color}
                  strokeWidth="1.5"
                  style={{
                    top: `${(i * 17) % 90}%`,
                    left: `${(i * 23) % 95}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <circle cx="11" cy="4" r="2" />
                  <circle cx="18" cy="8" r="2" />
                  <circle cx="20" cy="16" r="2" />
                  <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
                </motion.svg>
              ))}
            </div>

            {/* Scena animata */}
            <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
              <motion.div
                key={currentScene}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -30 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center max-w-md"
              >
                {/* Icona grande con anello pulsante */}
                <motion.div className="relative inline-block mb-6">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: scene.color, opacity: 0.2 }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.div
                    className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-xl"
                    style={{ background: `linear-gradient(135deg, ${scene.color}, ${scene.color}cc)` }}
                    animate={{ rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon size={56} className="text-white sm:size-16" strokeWidth={2.5} />
                  </motion.div>
                </motion.div>

                <motion.h3
                  className="text-2xl sm:text-4xl font-extrabold text-foreground mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {scene.titolo}
                </motion.h3>

                <motion.p
                  className="text-base sm:text-lg text-foreground/70 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {scene.descrizione}
                </motion.p>
              </motion.div>
            </div>

            {/* Brand badge in alto a sinistra */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold text-foreground">MifidoDiTe.eu</span>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-3 mt-6">
            {SCENES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentScene(i)}
                className="group relative h-2 transition-all"
                style={{ width: i === currentScene ? "40px" : "10px" }}
                aria-label={`Scena ${i + 1}`}
              >
                <span
                  className="absolute inset-0 rounded-full transition-all"
                  style={{
                    background: i === currentScene ? scene.color : "rgba(0,0,0,0.15)",
                  }}
                />
                {i === currentScene && !isPaused && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4.5, ease: "linear" }}
                    style={{ originX: 0 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Etichette scene piccole */}
          <div className="hidden sm:flex justify-center gap-1 mt-4 text-xs text-muted-foreground">
            {SCENES.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrentScene(i)}
                className={`px-3 py-1 rounded-full transition-all ${
                  i === currentScene ? "bg-white shadow-sm font-semibold text-foreground" : "hover:text-foreground"
                }`}
              >
                {s.titolo.replace(/^\d+\.\s/, "")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
