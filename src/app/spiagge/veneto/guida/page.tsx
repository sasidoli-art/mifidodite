import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Veneto 2026 — Jesolo, Cavallino, Caorle Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Veneto. Jesolo, Cavallino-Treporti, Caorle, Bibione, Lido di Venezia. Ordinanze 2026 e Bau Beach lungo l'Adriatico veneto.",
  keywords: ["spiagge cani veneto", "jesolo cani", "cavallino pet friendly", "caorle cani", "bibione pet friendly"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/veneto/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani in Veneto 2026", url: "https://www.mifidodite.eu/spiagge/veneto/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function VenetoSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Veneto").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Spiagge Veneto" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Veneto", url: "/spiagge/veneto" }, { name: "Guida", url: "/spiagge/veneto/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Veneto</h1><p className="text-lg text-white/80 max-w-2xl">Jesolo, Cavallino-Treporti, Caorle, Bibione, Lido di Venezia. 160 km di costa Adriatica organizzata, sabbia fine e Bau Beach veneziane.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Veneto: standard alti, ordinanze chiare</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Il Veneto ha una costa breve ma molto sviluppata. <strong>Jesolo</strong>: 15 km di sabbia fine, Bau Beach storiche fin dagli anni 2000. <strong>Cavallino-Treporti</strong>: tra Jesolo e il Lido, pinete a ridosso, spiagge libere ampie. <strong>Caorle</strong>: borgo veneziano sul mare, lungomare con dehors aperti ai cani. <strong>Bibione</strong>: spiagge ordinate, Bau Beach numerose. <strong>Lido di Venezia</strong>: spiagge libere ammesse ai cani, atmosfera unica. Le ordinanze comunali venete sono chiare e in genere permissive: cani al guinzaglio quasi ovunque, alcune restrizioni in alta stagione nei lidi più centrali.</p>
              <p>Spiagge cane-friendly accertate: <strong>Jesolo Pluto Beach</strong>, <strong>Cavallino zona libera nord</strong>, <strong>Caorle Spiaggia di Levante zona dedicata</strong>, <strong>Bibione Pluto Park</strong>, <strong>Lido di Venezia Alberoni</strong>. Il Lido ha anche una zona libera al limite sud dove i cani sono spesso liberi (controlla ordinanza specifica).</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Jesolo storica</h3><p className="text-sm text-muted-foreground">Bau Beach fin dagli anni 2000. 15 km sabbia fine, organizzazione tedesca.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Lido di Venezia</h3><p className="text-sm text-muted-foreground">Spiagge urbane raggiungibili in vaporetto col cane. Atmosfera unica al mondo.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Caldo umido</h3><p className="text-sm text-muted-foreground">Pianura Padana: luglio-agosto afosi. Cane sensibile soffre molto. Esci presto.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge venete</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Vaporetto al Lido</p><p className="text-sm text-muted-foreground">Da Venezia centro ACTV vaporetto linea 1 e 5.1: cane gratis al guinzaglio.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Bau Beach</p><p className="text-sm text-muted-foreground">Jesolo Pluto Beach, Bibione Pluto Park: prenota online entro giugno.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Pinete d'ombra</p><p className="text-sm text-muted-foreground">Cavallino, Bibione: pinete a ridosso del mare. Pausa fresca per il cane.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Caorle vecchia</p><p className="text-sm text-muted-foreground">Centro storico veneziano + spiaggia: cane al guinzaglio in piazza e dehors.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Venezia Mestre, Padova, Treviso hanno cliniche h24. Costa: servizi eccellenti.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Veneto</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (<Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Veneto. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Veneto</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/veneto" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Veneto →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Veneto", url: "/spiagge/veneto" }, { name: "Guida", url: "/spiagge/veneto/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Veneto 2026", descrizione: "Le migliori spiagge dog-friendly in Veneto. Jesolo, Cavallino-Treporti, Caorle, Bibione, Lido di Venezia.", slug: "veneto-spiagge-guida", regione: "Veneto", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
