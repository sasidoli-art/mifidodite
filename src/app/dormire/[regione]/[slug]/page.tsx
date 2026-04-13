import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Star, Euro, Dog, ExternalLink, Check, Info,
} from "lucide-react";
import {
  DORMIRE_SEED,
  slugifyRegioneD,
  getDormireBySlug,
  getDormireByRegione,
  buildBookingUrl,
  DORMIRE_TIPO_LABEL_SINGULAR,
  PREZZO_LABEL,
  PREZZO_DESCRIZIONE,
} from "@/lib/dormire-seed";
import { lodgingJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/json-ld";
import { NewsletterInline } from "@/components/shared/NewsletterInline";
import { MeteoWidget } from "@/app/spiagge/[regione]/[slug]/MeteoWidget";
import { MiniMapDormire } from "./MiniMapDormire";

export function generateStaticParams() {
  return DORMIRE_SEED.map((s) => ({
    regione: slugifyRegioneD(s.regione),
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ regione: string; slug: string }> }) {
  const { regione, slug } = await params;
  const struttura = getDormireBySlug(slug);
  if (!struttura) return { title: "Struttura non trovata — MifidoDiTe.eu" };
  const title = `${struttura.nome} — ${DORMIRE_TIPO_LABEL_SINGULAR[struttura.tipo]} pet-friendly a ${struttura.comune} | MifidoDiTe.eu`;
  const description = `${struttura.nome} a ${struttura.comune} (${struttura.regione}): ${struttura.descrizione.slice(0, 140)}`;
  const url = `https://www.mifidodite.eu/dormire/${regione}/${slug}`;
  return {
    title,
    description,
    keywords: [struttura.nome, `hotel pet friendly ${struttura.comune}`, `${struttura.tipo} cani ${struttura.regione}`],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "MifidoDiTe.eu",
      locale: "it_IT",
      images: [{ url: struttura.img, width: 800, height: 600, alt: struttura.nome }],
    },
    twitter: { card: "summary_large_image", title, description, images: [struttura.img] },
  };
}

const TAGLIA_LABEL: Record<string, string> = {
  piccola: "Fino a 10kg",
  media: "Fino a 25kg",
  grande: "Fino a 40kg",
  tutte: "Tutte le taglie",
};

const ANIMALI_LABEL: Record<string, string> = {
  cane: "Cani",
  gatto: "Gatti",
  entrambi: "Cani e gatti",
};

export default async function DormireDettaglioPage({ params }: { params: Promise<{ regione: string; slug: string }> }) {
  const { regione: regioneSlug, slug } = await params;
  const s = getDormireBySlug(slug);

  if (!s || slugifyRegioneD(s.regione) !== regioneSlug) notFound();

  const vicine = getDormireByRegione(regioneSlug).filter((x) => x.slug !== slug).slice(0, 3);
  const bookingUrl = buildBookingUrl(s.bookingQuery);

  const pageUrl = `https://www.mifidodite.eu/dormire/${regioneSlug}/${slug}`;
  const jsonLdData = [
    lodgingJsonLd({
      nome: s.nome,
      descrizione: s.descrizione,
      tipo: s.tipo,
      comune: s.comune,
      provincia: s.provincia,
      regione: s.regione,
      lat: s.lat,
      lng: s.lng,
      img: s.img,
      url: pageUrl,
      stelle: s.stelle,
      fascia: s.fascia,
      amenities: s.amenities,
    }),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Dormire", url: "/dormire" },
      { name: s.regione, url: `/dormire/${regioneSlug}` },
      { name: s.nome, url: `/dormire/${regioneSlug}/${slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdData)} />
      <Header />
      <main className="flex-1 pt-16">
        <section className="relative">
          <div className="h-80 sm:h-96 overflow-hidden relative">
            <img src={s.img} alt={s.nome} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <div className="mb-4">
                <Breadcrumbs
                  dark
                  items={[
                    { name: "Dormire", url: "/dormire" },
                    { name: s.regione, url: `/dormire/${regioneSlug}` },
                    { name: s.nome, url: `/dormire/${regioneSlug}/${slug}` },
                  ]}
                />
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-semibold px-3 py-1 rounded-full text-white bg-primary/90">
                  {DORMIRE_TIPO_LABEL_SINGULAR[s.tipo]}
                </span>
                {s.stelle && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent text-foreground inline-flex items-center gap-1">
                    {Array.from({ length: s.stelle }).map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </span>
                )}
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-foreground">
                  {PREZZO_LABEL[s.fascia]} {PREZZO_DESCRIZIONE[s.fascia]}
                </span>
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
                <h2 className="text-xl font-bold text-foreground mb-3">La struttura</h2>
                <p className="text-foreground leading-relaxed">{s.descrizione}</p>
                {s.amenities && s.amenities.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-wide mb-3">Caratteristiche e servizi</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {s.amenities.map((a) => (
                        <div key={a} className="flex items-center gap-2 text-sm text-foreground">
                          <Check size={16} className="text-primary flex-shrink-0" /> {a}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <Dog size={20} className="text-primary" /> Pet policy
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <InfoRow label="Animali accettati">
                    {ANIMALI_LABEL[s.animaliAmmessi]}
                  </InfoRow>
                  <InfoRow label="Taglia massima">
                    {TAGLIA_LABEL[s.tagliaMax]}
                  </InfoRow>
                  <InfoRow label="Supplemento cane">
                    {typeof s.supplementoCane === "number"
                      ? s.supplementoCane === 0
                        ? "Gratuito"
                        : `${s.supplementoCane}€/notte`
                      : "Variabile (verifica in fase di prenotazione)"}
                  </InfoRow>
                  <InfoRow label="Fascia prezzo">
                    {PREZZO_LABEL[s.fascia]} — {PREZZO_DESCRIZIONE[s.fascia]}
                  </InfoRow>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                  <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900">
                    <strong>Verifica prima di prenotare.</strong> Le politiche pet possono cambiare di stagione in stagione. Conferma taglia, supplemento e regole direttamente con la struttura o in fase di prenotazione su Booking.
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Dove si trova</h2>
                <MiniMapDormire lat={s.lat} lng={s.lng} nome={s.nome} tipo={s.tipo} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#003580] to-[#002659] text-white rounded-2xl p-6 shadow-xl">
                <div className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Prenotazione</div>
                <h3 className="font-bold text-2xl mb-2">Verifica disponibilita e prezzi</h3>
                <p className="text-white/80 text-sm mb-5">Controlla le date del tuo viaggio, leggi le recensioni degli ospiti con animali e prenota in sicurezza.</p>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#003580] font-bold rounded-full px-5 py-3.5 text-sm hover:bg-white/90 transition-colors"
                >
                  Apri su Booking.com <ExternalLink size={15} />
                </a>
                <p className="text-[10px] text-white/50 mt-3 text-center">Link affiliato — senza costi aggiuntivi per te</p>
              </div>

              <MeteoWidget lat={s.lat} lng={s.lng} />

              <NewsletterInline
                title="Nuove strutture ogni mese"
                description="Ricevi via email nuovi hotel e agriturismi pet-friendly, offerte stagionali e guide per viaggiare col cane."
                source="dormire-dettaglio"
                compact
              />

              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Euro size={16} className="text-accent" /> Altre idee in {s.regione}
                </h3>
                <div className="space-y-3">
                  {vicine.length > 0 ? vicine.map((v) => (
                    <Link
                      key={v.slug}
                      href={`/dormire/${regioneSlug}/${v.slug}`}
                      className="flex gap-3 items-center group"
                    >
                      <img src={v.img} alt={v.nome} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{v.nome}</div>
                        <div className="text-xs text-muted-foreground">{v.comune} • {PREZZO_LABEL[v.fascia]}</div>
                      </div>
                    </Link>
                  )) : (
                    <p className="text-sm text-muted-foreground">Nessun&apos;altra struttura in questa regione.</p>
                  )}
                </div>
                {vicine.length > 0 && (
                  <Link href={`/dormire/${regioneSlug}`} className="mt-4 block text-sm font-semibold text-primary hover:text-primary-dark text-center">
                    Tutte le strutture in {s.regione} →
                  </Link>
                )}
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">Anche le spiagge cane-friendly</h3>
                <p className="text-sm text-muted-foreground mb-3">Stai organizzando una vacanza al mare? Guarda la mappa delle spiagge dove il tuo cane e benvenuto.</p>
                <Link href={`/spiagge/${regioneSlug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Spiagge dog-friendly in {s.regione} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase text-muted-foreground tracking-wide mb-1">{label}</div>
      <div className="text-sm text-foreground font-medium">{children}</div>
    </div>
  );
}
