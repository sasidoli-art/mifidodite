"use client";

import { useState, useEffect } from "react";
import { Cookie, Settings } from "lucide-react";
import Link from "next/link";
import { readConsent, writeConsent } from "@/lib/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }

    const openHandler = () => {
      setAnalyticsChecked(readConsent()?.analytics ?? false);
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener("mifidodite-consent-open", openHandler);
    return () => window.removeEventListener("mifidodite-consent-open", openHandler);
  }, []);

  function acceptAll() {
    writeConsent(true);
    setVisible(false);
  }

  function rejectOptional() {
    writeConsent(false);
    setVisible(false);
  }

  function saveCustom() {
    writeConsent(analyticsChecked);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4">
      <div className="max-w-3xl mx-auto bg-foreground text-white rounded-2xl shadow-2xl p-5">
        <div className="flex items-start gap-3">
          <Cookie size={24} className="text-primary shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm leading-relaxed">
              Usiamo <strong>cookie tecnici</strong> (sempre attivi, necessari al funzionamento) e{" "}
              <strong>cookie analitici anonimi</strong> (Google Analytics 4, con IP mascherato) per capire come viene usato il sito.
              Puoi accettare o rifiutare i cookie analitici in ogni momento.{" "}
              <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>
            </p>

            {expanded && (
              <div className="mt-4 space-y-3 bg-white/5 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-not-allowed opacity-80">
                  <input type="checkbox" checked disabled className="mt-1 accent-primary" />
                  <div className="text-xs">
                    <div className="font-bold">Cookie tecnici (sempre attivi)</div>
                    <div className="text-white/60 mt-0.5">
                      Sessione, autenticazione, preferenze. Non cedibili.
                    </div>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                    className="mt-1 accent-primary"
                  />
                  <div className="text-xs">
                    <div className="font-bold">Cookie analitici (Google Analytics 4)</div>
                    <div className="text-white/60 mt-0.5">
                      IP anonimizzato, dati aggregati. Ci aiutano a capire quali pagine sono piu utili. Conservazione 26 mesi.
                    </div>
                  </div>
                </label>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              {!expanded && (
                <>
                  <button
                    onClick={acceptAll}
                    className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors"
                  >
                    Accetta tutto
                  </button>
                  <button
                    onClick={rejectOptional}
                    className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Solo essenziali
                  </button>
                  <button
                    onClick={() => setExpanded(true)}
                    className="flex items-center gap-1.5 text-white/70 hover:text-white px-3 py-2 text-sm underline"
                  >
                    <Settings size={14} /> Personalizza
                  </button>
                </>
              )}
              {expanded && (
                <>
                  <button
                    onClick={saveCustom}
                    className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors"
                  >
                    Salva preferenze
                  </button>
                  <button
                    onClick={acceptAll}
                    className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Accetta tutto
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
