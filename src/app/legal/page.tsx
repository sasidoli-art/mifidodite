import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Shield, FileText, Bot, Scale, Building2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Documenti Legali — MifidoDiTe.eu",
  description: "Tutti i documenti legali, privacy, termini, GDPR e AI Act di MifidoDiTe.eu.",
};

const DOCUMENTI = [
  {
    icon: Shield,
    titolo: "Privacy Policy",
    desc: "Informativa completa sul trattamento dei dati personali ai sensi del GDPR (Reg. UE 2016/679).",
    href: "/privacy",
    obbligatorio: true,
  },
  {
    icon: FileText,
    titolo: "Termini e Condizioni",
    desc: "Condizioni d'uso del portale, piani a pagamento, diritto di recesso, responsabilita.",
    href: "/termini",
    obbligatorio: true,
  },
  {
    icon: Scale,
    titolo: "Registro dei Trattamenti",
    desc: "Registro completo di tutti i trattamenti di dati personali ai sensi dell'Art. 30 GDPR.",
    href: "/legal/registro-trattamenti",
    obbligatorio: true,
  },
  {
    icon: Shield,
    titolo: "Valutazione d'Impatto (DPIA)",
    desc: "Valutazione d'impatto sulla protezione dei dati ai sensi dell'Art. 35 GDPR.",
    href: "/legal/dpia",
    obbligatorio: false,
  },
  {
    icon: Bot,
    titolo: "Registro Sistemi AI",
    desc: "Registro di tutti i sistemi di intelligenza artificiale utilizzati, ai sensi del Regolamento UE 2024/1689 (AI Act).",
    href: "/legal/registro-ai",
    obbligatorio: true,
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
            Tutti i documenti di conformita normativa di MifidoDiTe.eu.
          </p>

          {/* Info E-Commerce D.Lgs. 70/2003 */}
          <div className="bg-white rounded-2xl p-6 border border-border mb-8">
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2 mb-4">
              <Building2 size={20} className="text-primary" />
              Informazioni societarie (D.Lgs. 70/2003)
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Denominazione</p>
                <p className="font-medium text-foreground">MifidoDiTe.eu</p>
              </div>
              <div>
                <p className="text-muted-foreground">P.IVA</p>
                <p className="font-medium text-foreground">In fase di registrazione</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email generale</p>
                <p className="font-medium text-foreground"><a href="mailto:bau@mifidodite.eu" className="text-primary">bau@mifidodite.eu</a></p>
              </div>
              <div>
                <p className="text-muted-foreground">Email professionisti</p>
                <p className="font-medium text-foreground"><a href="mailto:pro@mifidodite.eu" className="text-primary">pro@mifidodite.eu</a></p>
              </div>
              <div>
                <p className="text-muted-foreground">Email newsletter</p>
                <p className="font-medium text-foreground"><a href="mailto:miao@mifidodite.eu" className="text-primary">miao@mifidodite.eu</a></p>
              </div>
              <div>
                <p className="text-muted-foreground">Email segnalazioni</p>
                <p className="font-medium text-foreground"><a href="mailto:sos@mifidodite.eu" className="text-primary">sos@mifidodite.eu</a></p>
              </div>
            </div>
          </div>

          {/* Documenti */}
          <div className="space-y-4">
            {DOCUMENTI.map((doc) => (
              <Link key={doc.href} href={doc.href}
                className="block bg-white rounded-2xl p-6 border border-border hover:shadow-md hover:border-primary/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <doc.icon size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{doc.titolo}</h3>
                      {doc.obbligatorio && (
                        <span className="text-xs bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded-full">Obbligatorio</span>
                      )}
                    </div>
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
