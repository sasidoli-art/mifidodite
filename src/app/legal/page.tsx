import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Shield, FileText, Building2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Documenti Legali — MifidoDiTe.eu",
  description: "Privacy Policy e Termini di MifidoDiTe.eu.",
};

const DOCUMENTI = [
  {
    icon: Shield,
    titolo: "Privacy Policy",
    desc: "Come trattiamo i tuoi dati personali ai sensi del GDPR (Reg. UE 2016/679).",
    href: "/privacy",
  },
  {
    icon: FileText,
    titolo: "Termini e Condizioni",
    desc: "Condizioni d'uso del portale, registrazione, responsabilita.",
    href: "/termini",
  },
];

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Documenti Legali</h1>
          <p className="text-muted-foreground mb-10">
            Le informazioni essenziali su come usiamo MifidoDiTe.eu.
          </p>

          {/* Info societarie */}
          <div className="bg-white rounded-2xl p-6 border border-border mb-8">
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2 mb-4">
              <Building2 size={20} className="text-primary" />
              Contatti
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Denominazione</p>
                <p className="font-medium text-foreground">MifidoDiTe.eu</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email contatti</p>
                <p className="font-medium text-foreground">
                  <a href="mailto:info@mifidodite.eu" className="text-primary">info@mifidodite.eu</a>
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Newsletter</p>
                <p className="font-medium text-foreground">
                  <a href="mailto:newsletter@mifidodite.eu" className="text-primary">newsletter@mifidodite.eu</a>
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Notifiche sistema</p>
                <p className="font-medium text-foreground">
                  <a href="mailto:noreply@mifidodite.eu" className="text-primary">noreply@mifidodite.eu</a>
                </p>
              </div>
            </div>
          </div>

          {/* Documenti */}
          <div className="space-y-4">
            {DOCUMENTI.map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="block bg-white rounded-2xl p-6 border border-border hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <doc.icon size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{doc.titolo}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{doc.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-10">
            Autorita di controllo: Garante per la protezione dei dati personali —{" "}
            <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              www.garanteprivacy.it
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
