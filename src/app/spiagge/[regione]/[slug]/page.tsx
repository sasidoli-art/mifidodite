import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Calendar, Clock, Euro, Car, Waves, Dog, Globe, Phone,
  Check, X, Info, AlertTriangle,
} from "lucide-react";
import {
  SPIAGGE_SEED,
  slugifyRegione,
  getSpiaggiaBySlug,
  getSpiaggeByRegione,
  type SpiaggiaSeed,
} from "@/lib/spiagge-seed";
import { spiaggiaJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/json-ld";
import { NewsletterInline } from "@/components/shared/NewsletterInline";
import { MeteoWidget } from "./MeteoWidget";
import { MiniMap } from "./MiniMap";

export function generateStaticParams() {
  return SPIAGGE_SEED.map((s) => ({
    regione: slugifyRegione(s.regione),
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ regione: string; slug: string }> }) {
  const { regione, slug } = await params;
  const spiaggia = getSpiaggiaBySlug(slug);
  if (!spiaggia) {
    return { title: "Spiaggia non trovata — MifidoDiTe.eu" };
  }
  const title = `${spiaggia.nome} — Spiaggia dog-friendly a ${spiaggia.comune} | MifidoDiTe.eu`;
  const description = `${spiaggia.nome} a ${spiaggia.comune} (${spiaggia.regione}): ${spiaggia.descrizione.slice(0, 140)}`;
  const url = `https://www.mifidodite.eu/spiagge/${regione}/${slug}`;
  return {
    title,
    description,
    keywords: [spiaggia.nome, `spiaggia cani ${spiaggia.comune}`, `dog beach ${spiaggia.regione}`, "spiagge dog friendly"],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "MifidoDiTe.eu",
      locale: "it_IT",
      images: [{ url: spiaggia.img, width: 800, height: 600, alt: spiaggia.nome }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [spiaggia.img],
    },
  };
}

const GUINZAGLIO_LABELS = {
  obbligatorio: "Obbligatorio",
  libero: "Non richiesto",
  "solo-fuori-acqua": "Solo fuori dall'acqua",
};

const PREZZO_LABELS = {
  gratuito: "Gratuito",
  pagamento: "A pagamento",
  "con-consumazione": "Con consumazione",
};

const PARCHEGGIO_LABELS = {
  gratuito: "Gratuito",
  pagamento: "A pagamento",
  assente: "Non disponibile",
};

export default async function SpiaggiaDettaglioPage({ params }: { params: Promise<{ regione: string; slug: string }> }) {
  const { regione: regioneSlug, slug } = await params;
  const spiaggia = getSpiaggiaBySlug(slug);

  if (!spiaggia || slugifyRegione(spiaggia.regione) !== regioneSlug) {
    notFound();
  }

  const s: SpiaggiaSeed = spiaggia;
  const vicine = getSpiaggeByRegione(regioneSlug).filter((x) => x.slug !== slug).slice(0, 3);

  const pageUrl = `https://www.mifidodite.eu/spiagge/${regioneSlug}/${slug}`;
  const jsonLdData = [
    spiaggiaJsonLd({
      nome: s.nome,
      descrizione: s.descrizione,
      comune: s.comune,
      provincia: s.provincia,
      regione: s.regione,
      lat: s.lat,
      lng: s.lng,
      img: s.img,
      url: pageUrl,
    }),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Spiagge", url: "/spiagge" },
      { name: s.regione, url: `/spiagge/${regioneSlug}` },
      { name: s.nome, url: `/spiagge/${regioneSlug}/${slug}` },
    ]),
  ];

  const hasInfoPratiche =
    s.stagioneInizio || s.orari || s.guinzaglio !== undefined ||
    s.bagnoConsentito !== undefined || s.prezzoTipo || s.parcheggio;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdData)} />
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src={s.img} alt={s.nome} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs
                  dark
                  items={[
                    { name: "Spiagge", url: "/spiagge" },
                    { name: s.regione, url: `/spiagge/${regioneSlug}` },
                    { name: s.nome, url: `/spiagge/${regioneSlug}/${slug}` },
                  ]}
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${s.tipo === "Stabilimento" ? "bg-sky-600" : "bg-emerald-600"}`}>
                  {s.tipo}
                </span>
                {s.prezzoTipo === "gratuito" && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500 text-white">Gratis</span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">{s.nome}</h1>
              <div className="flex items-center gap-2 mt-3 text-white/80">
                <MapPin size={16} /> {s.comune} ({s.provincia}) — {s.regione}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-3">La spiaggia</h2>
                <p className="text-foreground leading-relaxed">{s.descrizione}</p>
                {s.servizi && s.servizi.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-wide mb-3">Servizi</h3>
                    <div className="flex flex-wrap gap-2">
                      {s.servizi.map((sv) => (
                        <span key={sv} className="text-sm bg-muted text-foreground px-3 py-1.5 rounded-full font-medium">{sv}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {hasInfoPratiche ? (
                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-5">Informazioni pratiche</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(s.stagioneInizio || s.stagioneFine) && (
                      <InfoRow icon={<Calendar size={18} className="text-primary" />} label="Stagione">
                        {s.stagioneInizio || "?"} — {s.stagioneFine || "?"}
                      </InfoRow>
                    )}
                    {s.orari && (
                      <InfoRow icon={<Clock size={18} className="text-primary" />} label="Orari">{s.orari}</InfoRow>
                    )}
                    {s.guinzaglio && (
                      <InfoRow icon={<Dog size={18} className="text-primary" />} label="Guinzaglio">
                        {GUINZAGLIO_LABELS[s.guinzaglio]}
                      </InfoRow>
                    )}
                    {s.bagnoConsentito !== undefined && (
                      <InfoRow icon={<Waves size={18} className="text-primary" />} label="Bagno cani">
                        {s.bagnoConsentito ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700"><Check size={14} /> Consentito</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-700"><X size={14} /> Non consentito</span>
                        )}
                      </InfoRow>
                    )}
                    {s.prezzoTipo && (
                      <InfoRow icon={<Euro size={18} className="text-primary" />} label="Accesso">
                        {PREZZO_LABELS[s.prezzoTipo]}
                      </InfoRow>
                    )}
                    {s.parcheggio && (
                      <InfoRow icon={<Car size={18} className="text-primary" />} label="Parcheggio">
                        {PARCHEGGIO_LABELS[s.parcheggio]}
                      </InfoRow>
                    )}
                  </div>
                  {(s.telefono || s.website || s.instagram || s.ordinanzaUrl) && (
                    <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-3">
                      {s.telefono && (
                        <a href={`tel:${s.telefono}`} className="inline-flex items-center gap-1.5 text-sm bg-muted px-4 py-2 rounded-full font-semibold text-foreground hover:bg-primary/10">
                          <Phone size={14} /> {s.telefono}
                        </a>
                      )}
                      {s.website && (
                        <a href={s.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm bg-muted px-4 py-2 rounded-full font-semibold text-foreground hover:bg-primary/10">
                          <Globe size={14} /> Sito web
                        </a>
                      )}
                      {s.instagram && (
                        <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm bg-muted px-4 py-2 rounded-full font-semibold text-foreground hover:bg-primary/10">
                          Instagram
                        </a>
                      )}
                      {s.ordinanzaUrl && (
                        <a href={s.ordinanzaUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm bg-amber-50 px-4 py-2 rounded-full font-semibold text-amber-800 hover:bg-amber-100">
                          <Info size={14} /> Ordinanza comunale
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-3">
                  <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900">
                    <strong>Info pratiche in aggiornamento.</strong> Stagione, orari, prezzi e regole possono variare di anno in anno. Contatta direttamente la struttura o consulta l&apos;ordinanza comunale prima di andare.
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Come arrivare</h2>
                <MiniMap lat={s.lat} lng={s.lng} nome={s.nome} tipo={s.tipo} />
              </div>
            </div>

            <div className="space-y-6">
              <MeteoWidget lat={s.lat} lng={s.lng} />

              <NewsletterInline
                title="Nuove spiagge ogni mese"
                description="Ricevi via email le nuove dog beach italiane, le guide stagionali e i consigli per viaggiare col cane."
                source="spiagge-dettaglio"
                compact
              />

              <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">Cerchi altro per la tua vacanza?</h3>
                <p className="text-white/80 text-sm mb-4">Trova veterinari e pensioni in {s.regione}.</p>
                <div className="flex flex-col gap-2">
                  <Link href="/professionisti?cat=veterinario" className="bg-white text-primary font-semibold rounded-full px-4 py-2.5 text-sm hover:bg-white/90 text-center">
                    Trova veterinari
                  </Link>
                  <Link href="/professionisti?cat=pensione" className="bg-white/20 border border-white/30 text-white font-semibold rounded-full px-4 py-2.5 text-sm hover:bg-white/30 text-center">
                    Trova pensioni
                  </Link>
                </div>
              </div>

              {vicine.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-5">
                  <h3 className="font-bold text-foreground mb-4">Altre spiagge in {s.regione}</h3>
                  <div className="space-y-3">
                    {vicine.map((v) => (
                      <Link
                        key={v.slug}
                        href={`/spiagge/${regioneSlug}/${v.slug}`}
                        className="flex gap-3 items-center group"
                      >
                        <img src={v.img} alt={v.nome} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{v.nome}</div>
                          <div className="text-xs text-muted-foreground">{v.comune}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href={`/spiagge/${regioneSlug}`} className="mt-4 block text-sm font-semibold text-primary hover:text-primary-dark text-center">
                    Tutte le spiagge in {s.regione} →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs font-bold uppercase text-muted-foreground tracking-wide">{label}</div>
        <div className="text-sm text-foreground font-medium mt-0.5">{children}</div>
      </div>
    </div>
  );
}
