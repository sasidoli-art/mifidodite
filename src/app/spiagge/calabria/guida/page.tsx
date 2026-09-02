import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Calabria 2026 — Tropea, Capo Vaticano, Riace Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Calabria. Tropea Tirreno, Capo Vaticano, Roccella Ionica, costa Ionica. Ordinanze comunali 2026 e calette nascoste.",
  keywords: ["spiagge cani calabria", "tropea cani", "capo vaticano pet friendly", "costa ionica cani"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/calabria/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani in Calabria 2026", url: "https://www.mifidodite.eu/spiagge/calabria/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function CalabriaSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Calabria").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Spiagge Calabria" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Calabria", url: "/spiagge/calabria" }, { name: "Guida", url: "/spiagge/calabria/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Calabria</h1><p className="text-lg text-white/80 max-w-2xl">Tirreno e Ionio in una sola regione: 780 km di costa, sabbia fine e mare cristallino, spiagge selvagge meno affollate. La Calabria offre vere giornate libere con il cane.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Calabria: doppia costa, doppia possibilità</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Calabria ha due coste molto diverse. <strong>Tirreno</strong> (Tropea, Capo Vaticano, Praia a Mare, Diamante, Scilla): mare cristallino, scogliere granitiche, spiagge brevi tra falesie. <strong>Ionio</strong> (Roccella, Soverato, Caulonia, Riace): coste lunghe, sabbia fine, meno affollate, ideali per camminare a lungo. Le ordinanze comunali sono in genere meno restrittive del nord Italia: cani ammessi su quasi tutte le spiagge libere al guinzaglio. Stabilimenti dog-friendly stanno aumentando, soprattutto sull'Ionio.</p>
              <p>Spiagge cane-friendly accertate: <strong>Tropea</strong> (spiaggia libera est), <strong>Capo Vaticano</strong> (Grotticelle), <strong>Soverato</strong>, <strong>Roccella Ionica</strong> (Bau Beach), <strong>Diamante</strong> (zona dedicata). Il vantaggio della Calabria è la possibilità di trovare spiagge quasi deserte anche in agosto, soprattutto sull'Ionio centro-meridionale (Caulonia, Locri).</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Tropea Tirreno</h3><p className="text-sm text-muted-foreground">Sabbia bianca, mare turchese. Ordinanze flessibili. Capo Vaticano stupendo.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Ionio tranquillo</h3><p className="text-sm text-muted-foreground">Coste lunghe, spiagge libere immense, meno affollate anche d'estate.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Caldo estremo</h3><p className="text-sm text-muted-foreground">Luglio-agosto 38°C+. Sabbia rovente. Spiagge sicure prima delle 8 e dopo le 18.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge calabresi</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Stagione</p><p className="text-sm text-muted-foreground">Maggio-giugno e settembre: mare già caldo, niente folla, clima sopportabile per il cane.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Auto essenziale</p><p className="text-sm text-muted-foreground">Treni rari sulla Ionica. Auto necessaria per raggiungere le calette migliori.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Sila come pausa</p><p className="text-sm text-muted-foreground">Quando il caldo costiero è insopportabile, sali in Sila: 1.500m, 25°C, foreste, laghi.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Spiagge libere</p><p className="text-sm text-muted-foreground">Ionio centro: chilometri di spiagge libere quasi deserte. Cane libero possibile dove non c'è folla.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Cosenza, Reggio, Catanzaro hanno cliniche. Costa: servizi limitati la sera, kit pronto soccorso essenziale.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Calabria</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (<Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Calabria. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Calabria</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/calabria" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Calabria →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Calabria", url: "/spiagge/calabria" }, { name: "Guida", url: "/spiagge/calabria/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Calabria 2026", descrizione: "Le migliori spiagge dog-friendly in Calabria. Tropea Tirreno, Capo Vaticano, Roccella Ionica, costa Ionica.", slug: "calabria-spiagge-guida", regione: "Calabria", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
