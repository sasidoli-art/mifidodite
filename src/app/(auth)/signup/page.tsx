"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codiceInvito, setCodiceInvito] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!gdpr) {
      setError("Devi accettare l'informativa privacy per registrarti.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("La password deve avere almeno 8 caratteri.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, nome, telefono, codiceInvito }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
    } else {
      setError(data.error || "Errore nella registrazione.");
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-md text-center bg-white rounded-2xl shadow-sm p-10">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-foreground">Registrazione completata!</h2>
          <p className="text-muted-foreground mt-3">
            Il tuo account e stato creato. Riceverai una email di conferma.
            Il tuo profilo sara visibile dopo la verifica del nostro team.
          </p>
          <Link href="/login" className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors">
            Accedi al tuo account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🐾</span>
            <span className="text-2xl font-bold text-primary">
              MifidoDiTe<span className="text-foreground">.eu</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mt-6">Crea il tuo account</h1>
          <p className="text-muted-foreground mt-2">Registrati con codice invito per gestire la tua attivita</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Codice Invito *</label>
            <input type="text" required value={codiceInvito} onChange={(e) => setCodiceInvito(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Es: BENVENUTO" />
            <p className="text-xs text-muted-foreground mt-1">Hai ricevuto un codice invito? Inseriscilo qui.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Nome e Cognome *</label>
            <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Mario Rossi" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="info@tuaattivita.it" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Telefono</label>
            <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="+39 333 1234567" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password *</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Minimo 8 caratteri" />
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="gdpr" checked={gdpr} onChange={(e) => setGdpr(e.target.checked)}
              className="mt-1 accent-primary" />
            <label htmlFor="gdpr" className="text-xs text-muted-foreground leading-relaxed">
              Accetto l&apos;
              <Link href="/legal/privacy" className="text-primary hover:underline">informativa sulla privacy</Link>
              {" "}e autorizzo il trattamento dei dati personali ai sensi del GDPR (Reg. UE 2016/679).
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50">
            {loading ? "Registrazione..." : "Crea account"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Hai gia un account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">Accedi</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
