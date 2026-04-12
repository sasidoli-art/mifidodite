import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { neon } from "@neondatabase/serverless";
import { SPIAGGE_SEED, slugifyRegione, type SpiaggiaSeed } from "@/lib/spiagge-seed";
import { SpiaggeClient, type SpiaggiaUI } from "./SpiaggeClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mappa Spiagge Dog-Friendly in Italia 2026 — MifidoDiTe.eu",
  description: "La mappa interattiva delle spiagge italiane che accettano cani. Oltre 75 stabilimenti e spiagge libere verificate in 15 regioni, con filtri per tipo, prezzo e servizi.",
};

async function getSpiagge(): Promise<SpiaggiaUI[]> {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT nome, slug, comune, provincia, regione, descrizione, servizi, foto_copertina, latitudine, longitudine, tipo FROM strutture WHERE categoria = 'spiaggia_dog_friendly' AND attivo = true AND latitudine IS NOT NULL ORDER BY regione, comune`;
      if (rows.length > 0) {
        return rows.map((r) => ({
          nome: r.nome as string,
          slug: r.slug as string,
          comune: r.comune as string,
          provincia: r.provincia as string,
          regione: r.regione as string,
          regioneSlug: slugifyRegione(r.regione as string),
          tipo: (r.tipo as string) === "Spiaggia libera" ? "Spiaggia libera" : "Stabilimento",
          descrizione: r.descrizione as string,
          servizi: (r.servizi as string[]) || [],
          foto: (r.foto_copertina as string) || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
          lat: Number(r.latitudine),
          lng: Number(r.longitudine),
        }));
      }
    } catch {}
  }
  return SPIAGGE_SEED.map((s: SpiaggiaSeed) => ({
    nome: s.nome,
    slug: s.slug,
    comune: s.comune,
    provincia: s.provincia,
    regione: s.regione,
    regioneSlug: slugifyRegione(s.regione),
    tipo: s.tipo,
    descrizione: s.descrizione,
    servizi: s.servizi,
    foto: s.img,
    lat: s.lat,
    lng: s.lng,
    bagnoConsentito: s.bagnoConsentito,
    guinzaglio: s.guinzaglio,
    prezzoTipo: s.prezzoTipo,
  }));
}

export default async function SpiaggePage() {
  const spiagge = await getSpiagge();
  const regioni = Array.from(new Set(spiagge.map((s) => s.regione))).sort();

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Spiagge <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">Dog-Friendly</span> in Italia
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              {spiagge.length} spiagge verificate in {regioni.length} regioni dove il tuo cane e il benvenuto.
            </p>
          </div>
        </section>

        <SpiaggeClient spiagge={spiagge} />

        <section className="py-8 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Verifica sempre le ordinanze comunali prima di recarti in spiaggia con il tuo cane. Fonti: ENPA, Zampa Vacanza, Dogwelcome, hdsalento.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
