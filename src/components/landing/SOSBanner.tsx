"use client";

import { AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function SOSBanner() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/sos-smarriti" className="group block">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-8 sm:p-10 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 overflow-hidden">
                {/* Immagine */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-4 border-white/20 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&q=80"
                    alt="Cane smarrito"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    SOS SMARRITI
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    Hai perso il tuo animale?
                  </h3>
                  <p className="text-white/85 mt-2 text-base sm:text-lg max-w-lg">
                    Pubblica una segnalazione <strong>gratuita</strong>. Avvisiamo tutti i proprietari nella tua zona. Insieme lo ritroviamo.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 bg-white text-red-600 hover:bg-white/90 px-7 py-3 rounded-full font-bold text-sm transition-all group-hover:shadow-lg group-hover:gap-3">
                    Segnala ora <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <AlertTriangle size={200} className="absolute -right-10 -bottom-10 text-white/5 rotate-12" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
