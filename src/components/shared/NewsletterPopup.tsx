"use client";

import { Mail, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

// Newsletter popup in modalita "pausa": invece del form di iscrizione,
// mostra un messaggio. Mantenuto come componente per non rompere import.
export function NewsletterPopup({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <Mail size={36} className="mx-auto text-primary mb-3" />
          <h3 className="text-xl font-bold text-foreground mb-2">Newsletter in pausa</h3>
          <p className="text-sm text-muted-foreground">
            Stiamo aggiornando il progetto. Le nuove iscrizioni sono temporaneamente sospese.
            Torna a trovarci presto, oppure continua a leggere il nostro magazine.
          </p>
        </div>
      </div>
    </div>
  );
}
