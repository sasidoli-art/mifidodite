"use client";

import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("mifidodite-cookies-accepted");
    if (!accepted) {
      // Mostra dopo 1 secondo per non bloccare il primo render
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("mifidodite-cookies-accepted", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4">
      <div className="max-w-3xl mx-auto bg-foreground text-white rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
        <Cookie size={24} className="text-primary shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm leading-relaxed">
            Questo sito utilizza solo <strong>cookie tecnici</strong> necessari al funzionamento.
            Non utilizziamo cookie di profilazione o di terze parti.{" "}
            <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={accept}
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors"
          >
            Ho capito
          </button>
          <button
            onClick={accept}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Chiudi"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
