import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Campania 2026 — Cilento, Costiera, Procida Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Campania. Cilento selvaggio, Procida cane-friendly, Costiera Sorrentina, Salerno. Ordinanze 2026 e traghetti per Capri/Ischia.",
  keywords: ["spiagge cani campania", "cilento cani", "procida pet friendly", "costiera amalfitana cani"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/campania/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani in Campania 2026", url: "https://www.mifidodite.eu/spiagge/campania/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function CampaniaSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Campania").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Spiagge Campania" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Campania", url: "/spiagge/campania" }, { name: "Guida", url: "/spiagge/campania/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Campania</h1><p className="text-lg text-white/80 max-w-2xl">Cilento, Procida, Costiera Sorrentina, Salerno. Mare cristallino, calette nascoste e l'isola più cane-friendly d'Italia (Procida) accessibile da Napoli e Pozzuoli.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Campania: dal Cilento a Procida, varietà costiera</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Campania ha due anime per il cane. <strong>Costiera Amalfitana</strong>: spiagge piccole, scogliere, affollate in alta stagione. Cani ammessi in pochi tratti (Erchie, Conca dei Marini), molti stabilimenti vietano. <strong>Cilento</strong>: 100+ km di costa selvaggia, spiagge libere generose, Bandiere Blu (Palinuro, Marina di Camerota, Acciaroli). Qui i cani trovano vero spazio. <strong>Procida</strong> è il caso speciale: isola con spiagge dedicate ai cani (Chiaiolella, Pozzo Vecchio), atmosfera tranquilla, accessibile in 40 min di traghetto da Napoli.</p>
              <p>Capri ha cani ammessi ma con <strong>museruola obbligatoria</strong> (ordinanza locale rara in Italia). Ischia: alcune calette accettano cani, hotel più rilassati. Spiagge dog-friendly accertate: <strong>Marina di Camerota</strong>, <strong>Pisciotta</strong>, <strong>Procida Pozzo Vecchio</strong>, <strong>Salerno Santa Teresa</strong>, <strong>Castellammare di Stabia</strong> (zona libera est). Verifica sempre l'ordinanza prima del viaggio.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Cilento selvaggio</h3><p className="text-sm text-muted-foreground">100 km costa, Bandiere Blu, spiagge libere. Marina di Camerota e Palinuro top.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Procida cane-friendly</h3><p className="text-sm text-muted-foreground">L'isola più accogliente. Spiagge dedicate. Traghetti gratis al guinzaglio.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Capri: museruola</h3><p className="text-sm text-muted-foreground">Ordinanza unica: cane ammesso solo con museruola, anche piccolo. Verifica prima.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge campane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Traghetti</p><p className="text-sm text-muted-foreground">Caremar e Snav accettano cani gratis al guinzaglio. Procida da Napoli/Pozzuoli, Capri/Ischia da Sorrento.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Cilento</p><p className="text-sm text-muted-foreground">Auto necessaria per esplorare. Coast road statale 18 e 447 panoramiche.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Costiera</p><p className="text-sm text-muted-foreground">Spiagge piccole e affollate. Preferisci Erchie, Conca, Furore. Evita Positano nel weekend.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Caldo brutale</p><p className="text-sm text-muted-foreground">Luglio-agosto 35°C+. Spiagge accessibili prima delle 8 e dopo le 18. Mai lasciare il cane al sole.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Napoli ha cliniche h24. Salerno e Cilento centro: servizi limitati la sera, kit pronto soccorso essenziale.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Campania</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (<Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Campania. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Campania</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/campania" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Campania →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Campania", url: "/spiagge/campania" }, { name: "Guida", url: "/spiagge/campania/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Campania 2026", descrizione: "Le migliori spiagge dog-friendly in Campania. Cilento, Procida, Costiera Sorrentina, Salerno.", slug: "campania-spiagge-guida", regione: "Campania", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
