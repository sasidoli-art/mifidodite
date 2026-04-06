"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setSent(true);
    } else {
      const data = await res.json();
      setError(data.error || "Errore nell'invio. Riprova.");
    }
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-md text-center bg-white rounded-2xl shadow-sm p-10">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-2xl font-bold text-foreground">Controlla la tua email</h2>
          <p className="text-muted-foreground mt-3">
            Se <strong>{email}</strong> e registrato, riceverai un link per reimpostare la password.
            Il link scade tra 1 ora.
          </p>
          <Link href="/login" className="inline-block mt-6 text-primary font-semibold hover:underline">
            Torna al login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🐾</span>
            <span className="text-2xl font-bold text-primary">
              MifidoDiTe<span className="text-foreground">.eu</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mt-6">Password dimenticata?</h1>
          <p className="text-muted-foreground mt-2">Inserisci la tua email e ti invieremo un link per reimpostarla</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="La tua email di registrazione" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50">
            {loading ? "Invio in corso..." : "Invia link di reset"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Ricordi la password?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">Accedi</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
