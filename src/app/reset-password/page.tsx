"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetForm />
    </Suspense>
  );
}

function ResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-md text-center bg-white rounded-2xl shadow-sm p-10">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-foreground">Link non valido</h2>
          <p className="text-muted-foreground mt-3">
            Questo link non contiene un token valido. Richiedi un nuovo reset.
          </p>
          <Link href="/forgot-password" className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors">
            Richiedi nuovo link
          </Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("La password deve avere almeno 8 caratteri.");
      return;
    }

    if (password !== confirm) {
      setError("Le password non coincidono.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
    } else {
      setError(data.error || "Errore nel reset. Riprova.");
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-md text-center bg-white rounded-2xl shadow-sm p-10">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-foreground">Password aggiornata!</h2>
          <p className="text-muted-foreground mt-3">
            La tua password e stata reimpostata. Ora puoi accedere con la nuova password.
          </p>
          <Link href="/login" className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors">
            Accedi
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
          <h1 className="text-2xl font-bold text-foreground mt-6">Nuova password</h1>
          <p className="text-muted-foreground mt-2">Scegli una nuova password per il tuo account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Nuova password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Minimo 8 caratteri" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Conferma password</label>
            <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Ripeti la password" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50">
            {loading ? "Aggiornamento..." : "Salva nuova password"}
          </button>
        </form>
      </div>
    </div>
  );
}
