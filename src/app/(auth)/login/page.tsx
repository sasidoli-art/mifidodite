"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push(redirect);
      router.refresh();
    } else {
      setError(data.error || "Email o password non corretti.");
      setLoading(false);
    }
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
          <h1 className="text-2xl font-bold text-foreground mt-6">Accedi al tuo account</h1>
          <p className="text-muted-foreground mt-2">Gestisci la tua attivita e i tuoi lead</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="info@tuaattivita.it" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50">
            {loading ? "Accesso in corso..." : "Accedi"}
          </button>

          <div className="flex items-center justify-between text-sm">
            <Link href="/forgot-password" className="text-primary font-medium hover:underline">
              Password dimenticata?
            </Link>
            <Link href="/signup" className="text-muted-foreground hover:text-foreground">
              Registrati
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
