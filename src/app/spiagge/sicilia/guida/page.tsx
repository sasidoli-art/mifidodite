import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Sicilia 2026 — San Vito, Cefalù, Mondello Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Sicilia. San Vito lo Capo, Cefalù, Mondello, Taormina, Ortigia. Ordinanze 2026, ordinanze comunali variabili e calette segrete.",
  keywords: ["spiagge cani sicilia", "san vito lo capo cani", "cefalu pet friendly", "mondello cani", "taormina cani"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/sicilia/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani in Sicilia 2026", url: "https://www.mifidodite.eu/spiagge/sicilia/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function SiciliaSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Sicilia").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Spiagge Sicilia" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Sicilia", url: "/spiagge/sicilia" }, { name: "Guida", url: "/spiagge/sicilia/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Sicilia</h1><p className="text-lg text-white/80 max-w-2xl">San Vito lo Capo, Cefalù, Mondello, Taormina, Siracusa Ortigia. 1.500 km di costa con tre mari (Tirreno, Ionio, Mediterraneo) e ordinanze diversissime.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Sicilia: tre mari, regole locali</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Sicilia ha 1.500 km di costa su tre mari diversi. <strong>Tirreno</strong> (Palermo, Cefalù, San Vito lo Capo, Castellammare del Golfo): mare cristallino, sabbia bianca, ordinanze comunali variabili. <strong>Ionio</strong> (Taormina, Catania, Siracusa Ortigia, Marzamemi): scogli vulcanici, sabbia nera in alcuni tratti, baie chiuse. <strong>Mediterraneo</strong> (Sciacca, Agrigento Scala dei Turchi, Marsala, Mazara del Vallo): coste lunghe, sabbia chiara, dune. Le ordinanze comunali sono in genere meno restrittive del nord Italia, ma molto variabili da Comune a Comune.</p>
              <p>Spiagge cane-friendly accertate: <strong>Mondello zona libera</strong>, <strong>Cefalù Bau Beach</strong>, <strong>San Vito lo Capo zona libera ovest</strong>, <strong>Taormina Isola Bella zona dedicata</strong>, <strong>Marzamemi calette est</strong>, <strong>Agrigento Lido Azzurro</strong>. Le Isole Egadi (Favignana) e Eolie (Lipari, Vulcano) hanno ordinanze proprie: Favignana è particolarmente cane-friendly, Lipari più restrittiva.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Tre mari</h3><p className="text-sm text-muted-foreground">Tirreno, Ionio, Mediterraneo. Acqua cristallina e personalità costiere diverse.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Sole brutale</h3><p className="text-sm text-muted-foreground">Estate sopra 38°C. Mai uscire tra 11 e 18. Sabbia rovente, polpastrelli a rischio.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Ordinanze locali</h3><p className="text-sm text-muted-foreground">Variano da Comune a Comune. Verifica URP comunale prima di partire.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge siciliane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Traghetti</p><p className="text-sm text-muted-foreground">Caronte&amp;Tourist Messina, GNV Palermo: cani al guinzaglio gratis o supplemento minimo.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Aprile-maggio</p><p className="text-sm text-muted-foreground">Mare già caldo, niente folla, ordinanze in genere più permissive. Periodo migliore.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Isole Egadi</p><p className="text-sm text-muted-foreground">Favignana cane-friendly: spiagge ammesse, hidrofoil da Trapani accetta cani.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Etna in alternativa</p><p className="text-sm text-muted-foreground">Quando il caldo costiero è insopportabile, sali sull'Etna: 1.800m, 25°C, cani al guinzaglio nei sentieri.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Palermo, Catania, Siracusa, Trapani hanno cliniche h24. Interno: servizi limitati la sera.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Sicilia</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (<Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Sicilia. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Sicilia</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/sicilia" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Sicilia →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Sicilia", url: "/spiagge/sicilia" }, { name: "Guida", url: "/spiagge/sicilia/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Sicilia 2026", descrizione: "Le migliori spiagge dog-friendly in Sicilia. San Vito lo Capo, Cefalù, Mondello, Taormina, Ortigia.", slug: "sicilia-spiagge-guida", regione: "Sicilia", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
