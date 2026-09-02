import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { MapPin, Waves, Sun, AlertTriangle } from "lucide-react";
import { SPIAGGE_SEED, slugifyRegione } from "@/lib/spiagge-seed";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Spiagge per Cani in Basilicata 2026 — Maratea, Metaponto Pet-Friendly | MifidoDiTe.eu",
  description: "Le migliori spiagge dog-friendly in Basilicata. Maratea Tirreno scogliere, Metaponto Ionio sabbia. Ordinanze 2026 e calette nascoste.",
  keywords: ["spiagge cani basilicata", "maratea cani", "metaponto pet friendly", "costa ionica basilicata"],
  alternates: { canonical: "https://www.mifidodite.eu/spiagge/basilicata/guida" },
  openGraph: { type: "article", title: "Spiagge per Cani in Basilicata 2026", url: "https://www.mifidodite.eu/spiagge/basilicata/guida", siteName: "MifidoDiTe.eu", locale: "it_IT", images: [{ url: "https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80", width: 1200, height: 630 }] },
};

export default function BasilicataSpiaggeGuida() {
  const spiagge = SPIAGGE_SEED.filter(s => s.regione === "Basilicata").slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative"><img src="https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80" alt="Spiagge Basilicata" fetchPriority="high" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /></div>
          <div className="absolute inset-0 flex flex-col justify-end"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"><div className="mb-4"><Breadcrumbs dark items={[{ name: "Spiagge", url: "/spiagge" }, { name: "Basilicata", url: "/spiagge/basilicata" }, { name: "Guida", url: "/spiagge/basilicata/guida" }]} /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">Spiagge per Cani in Basilicata</h1><p className="text-lg text-white/80 max-w-2xl">Maratea Tirreno con scogliere e calette, Metaponto Ionio con sabbia fine. La costa più breve d'Italia, ma intatta e poco affollata.</p></div></div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Basilicata: due tratti di costa, due paesaggi</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>La Basilicata ha solo 60 km di costa, divisi su due mari. <strong>Maratea (Tirreno)</strong>: la "perla del Tirreno", 30 km di scogliere, calette nascoste raggiungibili a piedi o in barca, mare cristallino. Spiagge ammesse ai cani al guinzaglio in genere, con eccezioni in alcuni tratti privati. <strong>Metaponto-Policoro (Ionio)</strong>: sabbia fine dorata, pinete a ridosso del mare, spiagge libere ampie. Cani benvenuti nella maggioranza dei tratti liberi, alcune Bau Beach in via di sviluppo.</p>
              <p>Spiagge cane-friendly accertate: <strong>Maratea Marina di Castrocucco</strong>, <strong>Acquafredda</strong>, <strong>Policoro Lido</strong>, <strong>Metaponto Lido</strong>. Le calette di Maratea (Filocaio, Spiaggia Nera) sono fotogeniche ma richiedono camminate, quindi attenzione al cane se non abituato a sentieri costieri scoscesi.</p>
            </div>
          </section>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6"><Waves size={28} className="text-primary mb-3" /><h3 className="font-bold text-foreground mb-2">Maratea Tirreno</h3><p className="text-sm text-muted-foreground">Scogliere, calette, mare turchese. Ordinanze permissive in zone libere.</p></div>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6"><Sun size={28} className="text-accent mb-3" /><h3 className="font-bold text-foreground mb-2">Metaponto Ionio</h3><p className="text-sm text-muted-foreground">Sabbia dorata, pinete, spiagge libere ampie. Poco affollate anche d'estate.</p></div>
            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6"><AlertTriangle size={28} className="text-secondary mb-3" /><h3 className="font-bold text-foreground mb-2">Caldo intenso</h3><p className="text-sm text-muted-foreground">Estate sopra 35°C. Spiagge sicure prima delle 9 e dopo le 18.</p></div>
          </div>
          <section className="mb-12 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Consigli pratici per le spiagge lucane</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Calette Maratea</p><p className="text-sm text-muted-foreground">Spiaggia Nera, Filocaio: sentieri ripidi. Cane abituato a dislivelli e zampe protette.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Pinete d'ombra</p><p className="text-sm text-muted-foreground">Metaponto e Policoro: pinete a ridosso del mare, pausa fresca. Attenzione forasacchi.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Come arrivare</p><p className="text-sm text-muted-foreground">Salerno-Maratea 2h auto. Bari-Metaponto 1h30m. Treno Trenitalia accetta cani.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Spiagge libere</p><p className="text-sm text-muted-foreground">Vasta scelta su Ionio, meno affollate di Calabria e Puglia limitrofe.</p></div></li>
              <li className="flex gap-3"><span className="text-primary font-bold flex-shrink-0 mt-1">→</span><div><p className="font-semibold text-foreground">Veterinari</p><p className="text-sm text-muted-foreground">Matera e Potenza hanno cliniche. Costa: servizi limitati la sera, kit pronto soccorso utile.</p></div></li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Le spiagge cane-friendly verificate in Basilicata</h2>
            <div className="space-y-6">
              {spiagge.length > 0 ? (spiagge.map((s) => (<Link key={s.slug} href={`/spiagge/${slugifyRegione(s.regione)}/${s.slug}`}><div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"><div className="grid sm:grid-cols-3 gap-0"><div className="h-48 sm:h-auto overflow-hidden"><img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="col-span-2 p-6 flex flex-col justify-between"><div><p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p><h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3><p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p><p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 120)}...</p></div><div className="mt-4 text-sm font-semibold text-primary">Scopri di più →</div></div></div></div></Link>))) : (<p className="text-muted-foreground text-center py-8">Nessuna spiaggia verificata al momento in Basilicata. Torna presto!</p>)}
            </div>
          </section>
          <section className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tutte le spiagge in Basilicata</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Spiagge dog-friendly verificate con ordinanze 2026 aggiornate.</p>
            <Link href="/spiagge/basilicata" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Vedi tutte le spiagge in Basilicata →</Link>
          </section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Spiagge", url: "/spiagge" }, { name: "Basilicata", url: "/spiagge/basilicata" }, { name: "Guida", url: "/spiagge/basilicata/guida" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Spiagge per Cani in Basilicata 2026", descrizione: "Le migliori spiagge dog-friendly in Basilicata. Maratea Tirreno scogliere, Metaponto Ionio sabbia.", slug: "basilicata-spiagge-guida", regione: "Basilicata", img: "https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=1200&q=80", datePublished: new Date().toISOString().split("T")[0], autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
