"use client";

import { useEffect, useState } from "react";
import { NewsletterPopup } from "./NewsletterPopup";

const STORAGE_KEY = "mifidodite-exit-popup-shown";
const DISMISS_DAYS = 7;

export function NewsletterPopupExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Non mostrare se gia' visto nelle ultime 7 giorni
    try {
      const lastShown = localStorage.getItem(STORAGE_KEY);
      if (lastShown) {
        const last = new Date(lastShown);
        const days = (Date.now() - last.getTime()) / (1000 * 60 * 60 * 24);
        if (days < DISMISS_DAYS) return;
      }
    } catch {
      // localStorage inaccessibile: procedi comunque
    }

    let triggered = false;

    function handleMouseLeave(e: MouseEvent) {
      // Si attiva solo quando il mouse esce dal top della pagina
      if (triggered) return;
      if (e.clientY > 0) return;
      triggered = true;
      setOpen(true);
      try {
        localStorage.setItem(STORAGE_KEY, new Date().toISOString());
      } catch {
        // ignora errore
      }
    }

    // Aspetta 5 secondi prima di attivare il listener (evita falsi trigger immediati)
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <NewsletterPopup open={open} onClose={() => setOpen(false)} />;
}
