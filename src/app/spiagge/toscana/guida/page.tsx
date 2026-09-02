import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Toscana 2026 — Maremma, Versilia, Argentario Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Toscana. Maremma selvaggia, Versilia organizzata, Argentario nascosto. Ordinanze 2026, Bau Beach e consigli pratici per ogni costa.",
  keywords: ["spiagge cani toscana", "maremma cani", "versilia pet friendly", "argentario cani spiaggia"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/toscana/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani in Toscana 2026", url: "https://www.mifidodite.eu/spiagge/toscana/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function ToscanaSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Toscana").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Spiagge Toscana" fetchPriority="high" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Toscana", url: "/spiagge/toscana" }, { name: "Guida", url: "/spiagge/toscana/guida" }]} /></div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Toscana</h1>
              <p className="text-lg text-white/80 max-w-2xl">Maremma selvaggia, Versilia organizzata, Costa degli Etruschi e Argentario. Sabbia fine, pinete a ridosso del mare e spiagge dedicate ai cani in quasi tutti i Comuni costieri.</p>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Toscana: 400 km di costa, tre anime diverse</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La costa toscana ha tre identità. <strong>Versilia</strong> (Viareggio, Forte dei Marmi, Marina di Pietrasanta): spiaggia attrezzata, stabilimenti ordinati, ordinanze restrittive in alta stagione (cani prima delle 8 e dopo le 20 in alcuni Comuni). <strong>Costa degli Etruschi</strong> (Castiglioncello, San Vincenzo, Cecina): pinete a ridosso del mare, spiagge libere generose, Bau Beach organizzate. <strong>Maremma</strong> (Castiglione della Pescaia, Talamone, Capalbio): natura selvaggia, dune, spiagge lunghe e meno affollate, cani ammessi in larga maggioranza dei tratti liberi.</p>
              <p>Spiagge dedicate riconosciute: <strong>Marina di Cecina</strong> "Bau Park", <strong>Castiglione della Pescaia</strong> "Casetta Civinini", <strong>Castiglioncello</strong>, <strong>Marina di Grosseto</strong>. Argentario (Monte Argentario, Porto Ercole) ha calette nascoste raggiungibili in barca con cani ammessi a discrezione. L'Isola d'Elba accetta cani sui traghetti e in molte spiagge libere.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Sabbia fine</h3><p className="text-sm text-muted-foreground">Versilia e Maremma: sabbia chiara, comoda per i cani. Brucia molto al sole, attenzione orari.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Pinete d'ombra</h3><p className="text-sm text-muted-foreground">Tombolo, Cecina, San Rossore: pinete fino al mare. Pausa fresca per il cane durante la giornata.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Versilia restrittiva</h3><p className="text-sm text-muted-foreground">Forte dei Marmi e dintorni: ordinanze severe in alta stagione. Maremma più libera.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge toscane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Bau Beach</p><p className="text-sm text-muted-foreground">Prenota in anticipo: Marina di Cecina e Castiglione della Pescaia si riempiono già a giugno.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Maremma selvaggia</p><p className="text-sm text-muted-foreground">Cala Violina, Cala Civette: 30 minuti a piedi dal parcheggio. Ricompensa enorme. Cane al guinzaglio nel parco.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Pinete d'ombra</p><p className="text-sm text-muted-foreground">San Rossore, Tombolo: pause fresche d'estate. Attenzione forasacchi nella stagione secca.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Isola d'Elba</p><p className="text-sm text-muted-foreground">Traghetti Toremar accettano cani al guinzaglio (gratis al massimo 5kg, ridotti oltre).</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Cliniche h24 a Firenze, Pisa, Grosseto, Livorno. Pronto soccorso anche nei centri costieri minori.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Toscana</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (
                <Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}>
                  <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
                    <div className="grid sm:grid-cols-3 gap-0">
                      <div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>
                      <div className="col-span-2 p-6 flex flex-col justify-between">
                        <div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div>
                        <div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Toscana. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Toscana</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/toscana" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Toscana →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Toscana", url: "/spiagge/toscana" }, { name: "Guida", url: "/spiagge/toscana/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Toscana 2026", descrizione: "Le migliori spiagge dog-friendly in Toscana. Maremma selvaggia, Versilia organizzata, Argentario nascosto.", slug: "toscana-spiagge-guida", regione: "Toscana", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
