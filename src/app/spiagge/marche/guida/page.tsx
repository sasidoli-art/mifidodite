import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani nelle Marche 2026 — Conero, Numana, San Benedetto Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly nelle Marche. Riviera del Conero, Numana, Senigallia, San Benedetto del Tronto. Ordinanze 2026 e Bau Beach marchigiane.",
  keywords: ["spiagge cani marche", "conero cani", "numana pet friendly", "senigallia cani", "san benedetto cani"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/marche/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani nelle Marche 2026", url: "https://www.mifidodite.eu/spiagge/marche/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function MarcheSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Marche").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Spiagge Marche" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Marche", url: "/spiagge/marche" }, { name: "Guida", url: "/spiagge/marche/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani nelle Marche</h1><p className="text-lg text-white/80 max-w-2xl">Riviera del Conero con scogliere e baie, Senigallia "Spiaggia di Velluto", San Benedetto e Grottammare. 180 km di costa Adriatica organizzata e accessibile.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Marche: Conero diverso, riviera ordinata</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>Le Marche hanno 180 km di costa con due personalità. <strong>Riviera del Conero</strong> (Numana, Sirolo, Portonovo): unica zona italiana dove l'Appennino tocca il mare. Scogliere bianche, baie chiuse, calette raggiungibili a piedi o in barca. <strong>Resto della costa</strong> (Pesaro, Fano, Senigallia, Civitanova, San Benedetto, Grottammare): spiagge attrezzate, sabbia fine, lungomare ciclabili, Bau Beach numerose. Le ordinanze comunali sono in genere permissive: cani al guinzaglio quasi ovunque, alcune restrizioni in alta stagione fra 9 e 19 nei lidi più centrali.</p>
              <p>Spiagge cane-friendly accertate: <strong>Sirolo Urbani</strong>, <strong>Numana zona sud</strong>, <strong>Senigallia Bau Bau</strong>, <strong>Pesaro Bau Beach</strong>, <strong>Fano Sassonia est</strong>, <strong>San Benedetto Riviera</strong>, <strong>Grottammare Bau Beach</strong>. Senigallia ha il record marchigiano di stabilimenti dog-friendly grazie alla tradizione turistica.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Riviera Conero</h3><p className="text-sm text-muted-foreground">Scogliere bianche, baie chiuse, calette. Unica costa appenninica d'Italia.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Senigallia velluto</h3><p className="text-sm text-muted-foreground">"Spiaggia di Velluto": sabbia fine come polvere. Bau Beach numerose.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Parco Conero</h3><p className="text-sm text-muted-foreground">In area protetta cani al guinzaglio obbligatorio. Verifica accessi via sentiero.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge marchigiane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Conero a piedi</p><p className="text-sm text-muted-foreground">Sirolo-Numana sentiero 264: vista mare, accesso a calette. Cani al guinzaglio nel parco.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Bau Beach</p><p className="text-sm text-muted-foreground">Senigallia, Pesaro, San Benedetto: 5+ stabilimenti ciascuno. Prenota entro giugno.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Treno regionale</p><p className="text-sm text-muted-foreground">Trenitalia Adriatica ferma in tutte le città costiere. Cani gratis fino a 8kg.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Aprile-giugno</p><p className="text-sm text-muted-foreground">Periodo migliore: mare già caldo, niente folla, ordinanze più permissive.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Ancona, Pesaro, Ascoli, Macerata hanno cliniche h24. Costa: servizi buoni.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate nelle Marche</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (<Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento nelle Marche. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge nelle Marche</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/marche" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge nelle Marche →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Marche", url: "/spiagge/marche" }, { name: "Guida", url: "/spiagge/marche/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani nelle Marche 2026", descrizione: "Le migliori spiagge dog-friendly nelle Marche. Riviera del Conero, Numana, Senigallia, San Benedetto del Tronto.", slug: "marche-spiagge-guida", regione: "Marche", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
