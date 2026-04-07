import Link from "next/link";
import { Scale, Bot, Shield, FileText, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Compliance — Admin MifidoDiTe",
};

const DOCUMENTI = [
  {
    icon: Scale,
    titolo: "Registro dei Trattamenti (Art. 30 GDPR)",
    desc: "Lista completa di tutti i trattamenti di dati personali gestiti dal sistema. Da mostrare al Garante su richiesta.",
    href: "/admin/registro-trattamenti",
    obbligatorio: true,
  },
  {
    icon: Bot,
    titolo: "Registro Sistemi AI (Art. 50 AI Act)",
    desc: "Elenco di tutti i sistemi di intelligenza artificiale utilizzati. Conformita Reg. UE 2024/1689.",
    href: "/admin/registro-ai",
    obbligatorio: true,
  },
  {
    icon: Shield,
    titolo: "Valutazione d'Impatto (DPIA)",
    desc: "Analisi rischi privacy ai sensi dell'Art. 35 GDPR. Da aggiornare periodicamente.",
    href: "/admin/dpia",
    obbligatorio: false,
  },
];

const PUBBLICI = [
  { titolo: "Privacy Policy", href: "/privacy", desc: "Visibile a tutti gli utenti" },
  { titolo: "Termini e Condizioni", href: "/termini", desc: "Visibile a tutti gli utenti" },
];

export default function AdminLegalPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Compliance Legale</h1>
        <p className="text-muted-foreground mt-2">
          Documenti tecnici di conformita normativa. Solo accesso admin.
        </p>
      </div>

      {/* Alert importante */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-3">
        <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-900 text-sm">Importante</p>
          <p className="text-amber-800 text-sm mt-1">
            Questi documenti sono obbligatori da mantenere ma non da pubblicare.
            Vanno mostrati al Garante della Privacy o all&apos;Autorita AI Act solo se richiesti.
            Aggiornali ogni volta che modifichi il sistema (nuova AI, nuovo trattamento, etc.).
          </p>
        </div>
      </div>

      {/* Documenti tecnici */}
      <h2 className="text-xl font-bold text-foreground mb-4">Registri tecnici</h2>
      <div className="space-y-3 mb-12">
        {DOCUMENTI.map((doc) => (
          <Link
            key={doc.href}
            href={doc.href}
            className="block bg-white rounded-2xl p-5 border border-border hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <doc.icon size={22} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {doc.titolo}
                  </h3>
                  {doc.obbligatorio && (
                    <span className="text-xs bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded-full">
                      Obbligatorio
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{doc.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Documenti pubblici */}
      <h2 className="text-xl font-bold text-foreground mb-4">Documenti pubblici</h2>
      <div className="space-y-3">
        {PUBBLICI.map((doc) => (
          <a
            key={doc.href}
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-2xl p-5 border border-border hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <FileText size={22} className="text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {doc.titolo}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{doc.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-10">
        Autorita di controllo: Garante per la protezione dei dati personali —{" "}
        <a
          href="https://www.garanteprivacy.it"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          www.garanteprivacy.it
        </a>
      </p>
    </div>
  );
}
