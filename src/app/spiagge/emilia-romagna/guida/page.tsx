import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Emilia-Romagna 2026 — Riviera Bau Beach | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Emilia-Romagna. Riviera Romagnola con le Bau Beach più organizzate d'Italia. Cervia, Bellaria, Rimini, Cattolica, Cesenatico.",
  keywords: ["spiagge cani emilia romagna", "rimini cani", "cervia bau beach", "bellaria pet friendly", "cattolica cani"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/emilia-romagna/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani in Emilia-Romagna 2026", url: "https://www.mifidodite.eu/spiagge/emilia-romagna/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function EmiliaRomagnaSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Emilia-Romagna").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80" alt="Spiagge Emilia-Romagna" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Emilia-Romagna", url: "/spiagge/emilia-romagna" }, { name: "Guida", url: "/spiagge/emilia-romagna/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Emilia-Romagna</h1><p className="text-lg text-white/80 max-w-2xl">La Riviera Romagnola è la patria delle Bau Beach. Cervia, Bellaria, Rimini, Cattolica, Cesenatico: stabilimenti dedicati ai cani dal 2000, organizzazione senza pari in Italia.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Riviera Romagnola: il modello Bau Beach</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>L'Emilia-Romagna ha inventato in Italia il concetto di "Bau Beach": stabilimento balneare dedicato esclusivamente ai cani, con ombrelloni, ciotole, docce per il bagnetto, zona libera per la corsa, veterinario di riferimento. Il primo è stato Cervia <strong>"No Problem Beach"</strong> nei primi anni 2000. Oggi ne esistono decine lungo i 130 km della Riviera: Cervia, Cesenatico, Bellaria-Igea Marina, Rimini, Riccione, Cattolica, Misano. Tutti accettano cani al guinzaglio, molti hanno aree off-leash recintate.</p>
              <p>Spiagge libere cane-friendly: <strong>Cervia zona Milano Marittima nord</strong>, <strong>Lido Adriano Bau Beach</strong>, <strong>Bellaria Igea</strong>, <strong>Cattolica zona sud</strong>, <strong>Comacchio Lidi</strong> (più tranquilli, Sud Adriatico). L'organizzazione è il punto di forza: prenotazioni online, regole chiare, personale formato. L'unico difetto: l'estate è affollatissima, prenota da maggio.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Bau Beach storiche</h3><p className="text-sm text-muted-foreground">Cervia, Bellaria, Cattolica: stabilimenti dedicati dal 2000. Le prime in Italia.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Servizi premium</h3><p className="text-sm text-muted-foreground">Docce, ciotole, aree off-leash, veterinari di riferimento, dog sitter su richiesta.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Folla estiva</h3><p className="text-sm text-muted-foreground">Luglio-agosto sovraffollata. Preferisci giugno e settembre per spazio e tranquillità.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge romagnole</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Prenotazione</p><p className="text-sm text-muted-foreground">Bau Beach storiche (Cervia, Bellaria, Cattolica) si riempiono entro maggio. Prenota online.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Treno + bici</p><p className="text-sm text-muted-foreground">Trenitalia Adriatica ferma in tutte le città. Lungomare ciclabili dovunque, bici a noleggio.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Stabilimenti generalisti</p><p className="text-sm text-muted-foreground">Molti stabilimenti normali accettano cani anche fuori Bau Beach. Chiedi prima.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Comacchio Lidi</p><p className="text-sm text-muted-foreground">Lidi di Comacchio (Volano, Pomposa): più tranquilli, meno turismo. Spiagge libere generose.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Rimini, Ravenna, Cesena, Ferrara hanno cliniche h24. Costa: servizi eccellenti.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Emilia-Romagna</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (<Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Emilia-Romagna. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Emilia-Romagna</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/emilia-romagna" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Emilia-Romagna →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Emilia-Romagna", url: "/spiagge/emilia-romagna" }, { name: "Guida", url: "/spiagge/emilia-romagna/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Emilia-Romagna 2026", descrizione: "Le migliori spiagge dog-friendly in Emilia-Romagna. Riviera Romagnola con le Bau Beach più organizzate d'Italia.", slug: "emilia-romagna-spiagge-guida", regione: "Emilia-Romagna", img: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
