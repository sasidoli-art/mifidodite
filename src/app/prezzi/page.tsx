import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { TrendingUp, MapPin, Info } from "lucide-react";

export const metadata = {
  title: "Quanto costa? Prezzi medi pensioni, dog sitter e toelettatura in Italia — MifidoDiTe.eu",
  description: "Scopri i prezzi medi di pensioni per cani, dog sitter, toelettatura, educatori cinofili e veterinari in Italia, citta per citta.",
};

const PREZZI = [
  {
    categoria: "Pensione per cani",
    emoji: "🏠",
    media_italia: "20-30€/giorno",
    dettaglio: [
      { taglia: "Cane piccolo (0-10 kg)", range: "15-22€/giorno" },
      { taglia: "Cane medio (10-25 kg)", range: "20-28€/giorno" },
      { taglia: "Cane grande (25+ kg)", range: "25-35€/giorno" },
      { taglia: "Gatto", range: "12-20€/giorno" },
    ],
    citta: [
      { citta: "Milano", range: "25-40€" },
      { citta: "Roma", range: "22-35€" },
      { citta: "Napoli", range: "15-25€" },
      { citta: "Bologna", range: "20-30€" },
      { citta: "Firenze", range: "22-32€" },
      { citta: "Torino", range: "18-28€" },
    ],
    nota: "I prezzi variano in base a servizi inclusi (passeggiate, webcam, pasti personalizzati). Le pensioni premium con suite individuali possono arrivare a 50-60€/giorno.",
  },
  {
    categoria: "Dog sitter",
    emoji: "🐕",
    media_italia: "10-20€/visita",
    dettaglio: [
      { taglia: "Visita a domicilio (30 min)", range: "8-15€" },
      { taglia: "Visita a domicilio (1 ora)", range: "12-20€" },
      { taglia: "Passeggiata (1 ora)", range: "10-18€" },
      { taglia: "Giornata intera (8h)", range: "30-50€" },
      { taglia: "Pernottamento", range: "25-45€/notte" },
    ],
    citta: [
      { citta: "Milano", range: "15-25€" },
      { citta: "Roma", range: "12-22€" },
      { citta: "Napoli", range: "8-15€" },
      { citta: "Bologna", range: "10-18€" },
      { citta: "Firenze", range: "12-20€" },
      { citta: "Torino", range: "10-18€" },
    ],
    nota: "Molti dog sitter applicano sconti per servizi ricorrenti (abbonamento settimanale/mensile). I prezzi aumentano nei periodi di alta stagione (Natale, agosto).",
  },
  {
    categoria: "Toelettatura",
    emoji: "✂️",
    media_italia: "25-50€/seduta",
    dettaglio: [
      { taglia: "Bagno + asciugatura (piccolo)", range: "20-30€" },
      { taglia: "Bagno + asciugatura (grande)", range: "35-50€" },
      { taglia: "Taglio completo", range: "30-60€" },
      { taglia: "Stripping", range: "40-80€" },
      { taglia: "Toelettatura gatto", range: "35-55€" },
    ],
    citta: [
      { citta: "Milano", range: "35-65€" },
      { citta: "Roma", range: "30-55€" },
      { citta: "Napoli", range: "20-40€" },
      { citta: "Bologna", range: "25-50€" },
    ],
    nota: "Il prezzo dipende molto dalla razza e dal tipo di pelo. Razze a pelo lungo o riccio (Barboncino, Bichon) costano di piu. Lo stripping e il trattamento piu caro.",
  },
  {
    categoria: "Educatore cinofilo",
    emoji: "🎓",
    media_italia: "30-60€/lezione",
    dettaglio: [
      { taglia: "Lezione individuale (1 ora)", range: "35-60€" },
      { taglia: "Corso di gruppo (per lezione)", range: "15-25€" },
      { taglia: "Puppy class (4-6 lezioni)", range: "80-150€" },
      { taglia: "Percorso educativo completo (10 lezioni)", range: "300-500€" },
      { taglia: "Riabilitazione comportamentale", range: "50-80€/seduta" },
    ],
    citta: [
      { citta: "Milano", range: "45-70€" },
      { citta: "Roma", range: "40-65€" },
      { citta: "Bologna", range: "35-55€" },
      { citta: "Torino", range: "35-60€" },
    ],
    nota: "Un buon educatore cinofilo vale ogni centesimo. Diffida da chi promette risultati in 1-2 lezioni. Un percorso serio richiede almeno 6-10 incontri.",
  },
  {
    categoria: "Veterinario",
    emoji: "🏥",
    media_italia: "30-60€/visita",
    dettaglio: [
      { taglia: "Visita generica", range: "30-50€" },
      { taglia: "Vaccinazione", range: "25-40€ (per vaccino)" },
      { taglia: "Sterilizzazione cane femmina", range: "200-400€" },
      { taglia: "Sterilizzazione cane maschio", range: "150-300€" },
      { taglia: "Sterilizzazione gatto", range: "100-200€" },
      { taglia: "Ecografia", range: "60-120€" },
      { taglia: "Radiografia", range: "50-100€" },
      { taglia: "Analisi del sangue", range: "40-80€" },
    ],
    citta: [
      { citta: "Milano", range: "40-70€ (visita)" },
      { citta: "Roma", range: "35-60€ (visita)" },
      { citta: "Napoli", range: "25-45€ (visita)" },
      { citta: "Bologna", range: "30-55€ (visita)" },
    ],
    nota: "I prezzi veterinari non sono regolamentati e variano molto. Le cliniche H24 e i centri specialistici hanno tariffe piu alte ma offrono servizi avanzati.",
  },
];

export default function PrezziPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <TrendingUp size={48} className="mx-auto mb-4 text-secondary" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
              Quanto costa?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Prezzi medi aggiornati per pensioni, dog sitter, toelettatura, educatori e veterinari in Italia.
              Citta per citta, servizio per servizio.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {PREZZI.map((cat) => (
            <section key={cat.categoria} className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden">
              {/* Header categoria */}
              <div className="bg-muted/50 p-6 flex items-center gap-4 border-b border-border">
                <span className="text-4xl">{cat.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{cat.categoria}</h2>
                  <p className="text-primary font-semibold text-lg">Media Italia: {cat.media_italia}</p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Tabella prezzi per servizio */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Prezzi per servizio</h3>
                  <div className="space-y-1">
                    {cat.dettaglio.map((d) => (
                      <div key={d.taglia} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <span className="text-foreground text-sm">{d.taglia}</span>
                        <span className="font-bold text-primary text-sm">{d.range}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prezzi per citta */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-1">
                    <MapPin size={16} className="text-primary" /> Prezzi per citta
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {cat.citta.map((c) => (
                      <div key={c.citta} className="bg-muted/50 rounded-xl p-3 text-center">
                        <p className="font-semibold text-foreground text-sm">{c.citta}</p>
                        <p className="text-primary font-bold text-sm mt-0.5">{c.range}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nota */}
                <div className="flex gap-3 bg-amber-50 rounded-xl p-4">
                  <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">{cat.nota}</p>
                </div>
              </div>
            </section>
          ))}

          <p className="text-xs text-center text-muted-foreground">
            I prezzi sono indicativi e basati su una media delle strutture presenti su MifidoDiTe.eu.
            Ultimo aggiornamento: Aprile 2026. Contatta direttamente il professionista per un preventivo preciso.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
