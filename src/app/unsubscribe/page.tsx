"use client";

import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CheckCircle, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function UnsubscribeForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUnsubscribe(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div className="text-center">
        <CheckCircle size={48} className="mx-auto mb-4 text-secondary" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Disiscrizione completata</h2>
        <p className="text-muted-foreground">Non riceverai piu la newsletter di MifidoDiTe.eu.</p>
        <p className="text-sm text-muted-foreground mt-4">Ci mancherai. Se cambi idea, puoi sempre reiscriverti dalla homepage.</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Mail size={48} className="mx-auto mb-4 text-muted-foreground" />
      <h2 className="text-2xl font-bold text-foreground mb-2">Vuoi cancellarti dalla newsletter?</h2>
      <p className="text-muted-foreground mb-6">Conferma la tua email per disiscriverti.</p>
      <form onSubmit={handleUnsubscribe} className="max-w-sm mx-auto space-y-3">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="La tua email" className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary/30" />
        <button type="submit" disabled={loading}
          className="w-full bg-foreground text-white py-3 rounded-xl font-semibold disabled:opacity-50">
          {loading ? "..." : "Cancellami dalla newsletter"}
        </button>
      </form>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-20 px-4">
        <div className="max-w-md mx-auto">
          <Suspense>
            <UnsubscribeForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
