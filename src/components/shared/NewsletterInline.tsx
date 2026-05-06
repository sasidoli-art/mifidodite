"use client";

import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  source?: string;
  compact?: boolean;
  buttonText?: string;
}

export function NewsletterInline({
  title = "Le nuove guide ogni mese",
  description = "Iscriviti per ricevere via email le nuove spiagge, strutture pet-friendly e guide del territorio. Niente spam, puoi cancellarti quando vuoi.",
  source = "sidebar",
  compact = false,
  buttonText = "Iscriviti gratis",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMsg("Email non valida");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tipo_animale: "cane", nome: source }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Errore durante l'iscrizione");
      }
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Errore");
    }
  }

  if (status === "ok") {
    return (
      <div className={`bg-secondary/10 border border-secondary/20 rounded-2xl ${compact ? "p-4" : "p-5"} flex gap-3 items-start`}>
        <Check size={compact ? 16 : 20} className="text-secondary flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-foreground text-sm">Iscrizione confermata!</div>
          <div className="text-xs text-muted-foreground mt-1">Riceverai le prossime guide via email.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border border-border rounded-2xl ${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-center gap-2 mb-2">
        <Mail size={16} className="text-primary" />
        <h3 className={`font-bold text-foreground ${compact ? "text-sm" : "text-base"}`}>{title}</h3>
      </div>
      <p className={`text-muted-foreground mb-3 leading-snug ${compact ? "text-xs" : "text-sm"}`}>{description}</p>
      <form onSubmit={submit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="La tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className="w-full px-4 py-2.5 rounded-full border-2 border-border bg-white text-sm focus:border-primary focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-full px-4 py-2.5 text-sm hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          {status === "loading" ? (
            <><Loader2 size={14} className="animate-spin" /> Iscrizione...</>
          ) : (
            buttonText
          )}
        </button>
        {status === "error" && (
          <p className="text-xs text-red-600 text-center">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
