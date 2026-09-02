import type { MetadataRoute } from "next";
import { SPIAGGE_SEED, slugifyRegione, getAllRegioniSlug as getAllSpiagge } from "@/lib/spiagge-seed";
import { VACANZE_SEED, slugifyRegioneV, getAllRegioniVacanze } from "@/lib/vacanze-seed";
import { RAZZE } from "@/lib/razze-data";
import { RISTORANTI_SEED, slugifyRegioneR, getAllRegioniRistoranti } from "@/lib/ristoranti-seed";
import { SENTIERI_SEED, slugifyRegioneS, getAllRegioniSentieri } from "@/lib/sentieri-seed";
import { ARTICOLI_SEED } from "@/lib/articoli-seed";

export const revalidate = 3600; // 1 ora

// Date stabili per lastModified (anti-pattern Google: lastmod=now per tutto)
// Aggiorna queste costanti SOLO quando il contenuto della sezione cambia davvero.
const LASTMOD_STATIC = new Date("2026-06-03T00:00:00Z");   // pagine statiche principali
const LASTMOD_LISTING = new Date("2026-06-03T00:00:00Z");  // listing regionali (cambiano con nuovi seed)
const LASTMOD_DETTAGLIO = new Date("2026-04-13T00:00:00Z"); // schede dettaglio (stabili dal 13 aprile)
const LASTMOD_GUIDE = new Date("2026-06-03T00:00:00Z");    // guide regionali (create giugno 2026)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.mifidodite.eu";
  const now = new Date();

  // === PAGINE STATICHE PRINCIPALI ===
  // Solo homepage e magazine usano `now` (contenuti che cambiano davvero ogni giorno).
  // Il resto usa date stabili: Google ignora lastmod=now su molti URL.
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },

    // Hub feature ad alto traffico
    { url: `${baseUrl}/spiagge`, lastModified: LASTMOD_LISTING, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/vacanze`, lastModified: LASTMOD_LISTING, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/razze`, lastModified: LASTMOD_LISTING, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/ristoranti`, lastModified: LASTMOD_LISTING, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/sentieri`, lastModified: LASTMOD_LISTING, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/magazine`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/professionisti`, lastModified: LASTMOD_LISTING, changeFrequency: "daily", priority: 0.9 },

    // Strumenti interattivi
    { url: `${baseUrl}/quiz-razza`, lastModified: LASTMOD_STATIC, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/quiz-vacanza`, lastModified: LASTMOD_GUIDE, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/faq`, lastModified: LASTMOD_GUIDE, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/guida-viaggio-cane-italia-2026`, lastModified: LASTMOD_GUIDE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/costo-cane`, lastModified: LASTMOD_STATIC, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/razioni-cane`, lastModified: LASTMOD_STATIC, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/eta-cane`, lastModified: LASTMOD_STATIC, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/peso-ideale-cane`, lastModified: LASTMOD_STATIC, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/mappa`, lastModified: LASTMOD_STATIC, changeFrequency: "weekly", priority: 0.8 },

    // Altre feature
    { url: `${baseUrl}/adozioni`, lastModified: LASTMOD_LISTING, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/sos-smarriti`, lastModified: LASTMOD_LISTING, changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/cliniche`, lastModified: LASTMOD_LISTING, changeFrequency: "weekly", priority: 0.75 },
    { url: `${baseUrl}/eventi`, lastModified: LASTMOD_LISTING, changeFrequency: "weekly", priority: 0.6 },

    // Pagine di servizio
    { url: `${baseUrl}/prezzi`, lastModified: LASTMOD_STATIC, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/chi-siamo`, lastModified: LASTMOD_STATIC, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/legal`, lastModified: LASTMOD_STATIC, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: LASTMOD_STATIC, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/termini`, lastModified: LASTMOD_STATIC, changeFrequency: "yearly", priority: 0.2 },
  ];

  // === SPIAGGE — pagine regionali ===
  const spiaggeRegionali: MetadataRoute.Sitemap = getAllSpiagge().map((regione) => ({
    url: `${baseUrl}/spiagge/${regione}`,
    lastModified: LASTMOD_LISTING,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // === SPIAGGE — dettaglio singole (77) ===
  const spiaggeDettaglio: MetadataRoute.Sitemap = SPIAGGE_SEED.map((s) => ({
    url: `${baseUrl}/spiagge/${slugifyRegione(s.regione)}/${s.slug}`,
    lastModified: LASTMOD_DETTAGLIO,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // === RAZZE — dettaglio singole (20) ===
  const razzeDettaglio: MetadataRoute.Sitemap = RAZZE.map((r) => ({
    url: `${baseUrl}/razze/${r.slug}`,
    lastModified: LASTMOD_DETTAGLIO,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // === RISTORANTI — pagine regionali ===
  const ristorantiRegionali: MetadataRoute.Sitemap = getAllRegioniRistoranti().map((regione) => ({
    url: `${baseUrl}/ristoranti/${regione}`,
    lastModified: LASTMOD_LISTING,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // === RISTORANTI — dettaglio singoli ===
  const ristorantiDettaglio: MetadataRoute.Sitemap = RISTORANTI_SEED.map((r) => ({
    url: `${baseUrl}/ristoranti/${slugifyRegioneR(r.regione)}/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // === SENTIERI — pagine regionali + dettaglio ===
  const sentieriRegionali: MetadataRoute.Sitemap = getAllRegioniSentieri().map((regione) => ({
    url: `${baseUrl}/sentieri/${regione}`,
    lastModified: LASTMOD_LISTING,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const sentieriDettaglio: MetadataRoute.Sitemap = SENTIERI_SEED.map((s) => ({
    url: `${baseUrl}/sentieri/${slugifyRegioneS(s.regione)}/${s.slug}`,
    lastModified: LASTMOD_DETTAGLIO,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // === VACANZE — pagine regionali ===
  const vacanzeRegionali: MetadataRoute.Sitemap = getAllRegioniVacanze().map((regione) => ({
    url: `${baseUrl}/vacanze/${regione}`,
    lastModified: LASTMOD_LISTING,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // === VACANZE — guide regionali statiche (20) ===
  // Pagine /vacanze/{regione}/guida create manualmente. Aggiornare lista quando se ne aggiungono di nuove.
  const VACANZE_GUIDE_SLUGS = [
    "abruzzo", "basilicata", "calabria", "campania", "emilia-romagna",
    "friuli-venezia-giulia", "lazio", "liguria", "lombardia", "marche",
    "molise", "piemonte", "puglia", "sardegna", "sicilia", "toscana",
    "trentino-alto-adige", "umbria", "valle-d-aosta", "veneto",
  ];
  const vacanzeGuide: MetadataRoute.Sitemap = VACANZE_GUIDE_SLUGS.map((slug) => ({
    url: `${baseUrl}/vacanze/${slug}/guida`,
    lastModified: LASTMOD_GUIDE,
    changeFrequency: "monthly" as const,
    priority: 0.9, // alta: sono pagine editoriali ricche di contenuto
  }));

  // === SPIAGGE — guide regionali statiche (15) ===
  // Pagine /spiagge/{regione}/guida create per le regioni costiere.
  const SPIAGGE_GUIDE_SLUGS = [
    "abruzzo", "basilicata", "calabria", "campania", "emilia-romagna",
    "friuli-venezia-giulia", "lazio", "liguria", "marche", "molise",
    "puglia", "sardegna", "sicilia", "toscana", "veneto",
  ];
  const spiaggeGuide: MetadataRoute.Sitemap = SPIAGGE_GUIDE_SLUGS.map((slug) => ({
    url: `${baseUrl}/spiagge/${slug}/guida`,
    lastModified: LASTMOD_GUIDE,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // === SENTIERI — guide regionali statiche (14) ===
  const SENTIERI_GUIDE_SLUGS = [
    "abruzzo", "campania", "friuli-venezia-giulia", "lazio", "liguria",
    "lombardia", "piemonte", "puglia", "sardegna", "sicilia", "toscana",
    "trentino-alto-adige", "umbria", "veneto",
  ];
  const sentieriGuide: MetadataRoute.Sitemap = SENTIERI_GUIDE_SLUGS.map((slug) => ({
    url: `${baseUrl}/sentieri/${slug}/guida`,
    lastModified: LASTMOD_GUIDE,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // === VACANZE — dettaglio singole (89) ===
  const vacanzeDettaglio: MetadataRoute.Sitemap = VACANZE_SEED.map((s) => ({
    url: `${baseUrl}/vacanze/${slugifyRegioneV(s.regione)}/${s.slug}`,
    lastModified: LASTMOD_DETTAGLIO,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // === ARTICOLI MAGAZINE — da DB se disponibile, altrimenti dal seed ===
  let articlePages: MetadataRoute.Sitemap = [];
  let dbArticleSlugs = new Set<string>();

  if (process.env.DATABASE_URL) {
    try {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT slug, updated_at, created_at FROM articoli WHERE pubblicato = true AND redirect_to_slug IS NULL ORDER BY created_at DESC`;
      articlePages = rows.map((r: Record<string, unknown>) => {
        const slug = r.slug as string;
        dbArticleSlugs.add(slug);
        return {
          url: `${baseUrl}/magazine/${slug}`,
          lastModified: new Date((r.updated_at || r.created_at) as string),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        };
      });
    } catch (err) {
      console.error("[sitemap] errore caricamento articoli DB:", err);
    }
  }

  // Aggiungi articoli dal seed che non sono gia' nel DB (nuovi seed locali)
  // Tenta di parsare la data italiana ("3 Giu 2026") dell'articolo, fallback a LASTMOD_STATIC.
  const MESI_IT: Record<string, number> = {
    gen: 0, feb: 1, mar: 2, apr: 3, mag: 4, giu: 5,
    lug: 6, ago: 7, set: 8, ott: 9, nov: 10, dic: 11,
  };
  function parseDataIt(s: string | undefined): Date {
    if (!s) return LASTMOD_STATIC;
    const m = s.toLowerCase().match(/^(\d{1,2})\s+([a-z]{3})\s+(\d{4})$/);
    if (!m) return LASTMOD_STATIC;
    const giorno = parseInt(m[1], 10);
    const mese = MESI_IT[m[2]];
    const anno = parseInt(m[3], 10);
    if (mese === undefined) return LASTMOD_STATIC;
    return new Date(Date.UTC(anno, mese, giorno));
  }

  const seedArticlePages: MetadataRoute.Sitemap = ARTICOLI_SEED
    .filter((a) => !dbArticleSlugs.has(a.slug))
    .map((a) => ({
      url: `${baseUrl}/magazine/${a.slug}`,
      lastModified: parseDataIt((a as { data?: string }).data),
      changeFrequency: "monthly" as const,
      priority: 0.75, // leggermente alto perche' sono articoli nuovi hub/regionali
    }));

  return [
    ...staticPages,
    ...razzeDettaglio,
    ...ristorantiRegionali,
    ...ristorantiDettaglio,
    ...sentieriRegionali,
    ...sentieriDettaglio,
    ...sentieriGuide,
    ...spiaggeRegionali,
    ...spiaggeDettaglio,
    ...spiaggeGuide,
    ...vacanzeRegionali,
    ...vacanzeDettaglio,
    ...vacanzeGuide,
    ...articlePages,
    ...seedArticlePages,
  ];
}
