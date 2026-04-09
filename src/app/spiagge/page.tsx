import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { MapPin, Waves } from "lucide-react";
import { neon } from "@neondatabase/serverless";
import { SPIAGGE_SEED } from "@/lib/spiagge-seed";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Spiagge Dog-Friendly in Italia — MifidoDiTe.eu",
  description: "La guida completa alle spiagge italiane che accettano cani.",
};

interface Spiaggia {
  nome: string;
  slug: string;
  comune: string;
  provincia: string;
  regione: string;
  descrizione: string;
  servizi: string[];
  foto_copertina: string | null;
}

async function getSpiagge(): Promise<Record<string, Spiaggia[]>> {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT nome, slug, comune, provincia, regione, descrizione, servizi, foto_copertina FROM strutture WHERE categoria = 'spiaggia_dog_friendly' AND attivo = true ORDER BY regione, comune`;
      if (rows.length > 0) {
        const map: Record<string, Spiaggia[]> = {};
        for (const r of rows) {
          const regione = (r.regione as string) || "Altro";
          if (!map[regione]) map[regione] = [];
          map[regione].push(r as unknown as Spiaggia);
        }
        return map;
      }
    } catch {}
  }
  const map: Record<string, Spiaggia[]> = {};
  for (const s of SPIAGGE_SEED) {
    if (!map[s.regione]) map[s.regione] = [];
    map[s.regione].push({ ...s, descrizione: s.descrizione, foto_copertina: s.img } as unknown as Spiaggia);
  }
  return map;
}

export default async function SpiaggePage() {
  const perRegione = await getSpiagge();
  const regioni = Object.keys(perRegione).sort();
  const totale = Object.values(perRegione).flat().length;

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-foreground py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Spiagge <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">Dog-Friendly</span> in Italia
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              {totale} spiagge verificate in {regioni.length} regioni dove il tuo cane e il benvenuto.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {regioni.map((r) => (
                <a key={r} href={`#${r.toLowerCase().replace(/[\s-]+/g, "-")}`}
                  className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors border border-white/10">
                  {r} ({perRegione[r].length})
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {regioni.map((regione) => (
            <section key={regione} id={regione.toLowerCase().replace(/[\s-]+/g, "-")} className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Waves className="text-accent" size={24} /> {regione}
                <span className="text-sm font-normal text-muted-foreground ml-2">({perRegione[regione].length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {perRegione[regione].map((s) => (
                  <div key={s.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/50">
                    <div className="h-48 overflow-hidden">
                      <img src={s.foto_copertina || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80"} alt={s.nome} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-foreground">{s.nome}</h3>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin size={14} /> {s.comune} ({s.provincia})
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{s.descrizione}</p>
                      {s.servizi && s.servizi.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {s.servizi.slice(0, 4).map((sv) => (
                            <span key={sv} className="text-xs bg-blue-50 text-accent px-2 py-0.5 rounded-full">{sv}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="py-8 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Verifica le ordinanze comunali prima di recarti in spiaggia con il tuo cane. Fonti: ENPA, Zampa Vacanza, Dogwelcome.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
