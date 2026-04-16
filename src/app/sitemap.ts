import type { MetadataRoute } from "next";
import { SPIAGGE_SEED, slugifyRegione, getAllRegioniSlug as getAllSpiagge } from "@/lib/spiagge-seed";
import { VACANZE_SEED, slugifyRegioneV, getAllRegioniVacanze } from "@/lib/vacanze-seed";
import { RAZZE } from "@/lib/razze-data";
import { RISTORANTI_SEED, slugifyRegioneR, getAllRegioniRistoranti } from "@/lib/ristoranti-seed";
import { SENTIERI_SEED, slugifyRegioneS, getAllRegioniSentieri } from "@/lib/sentieri-seed";
import { ARTICOLI_SEED } from "@/lib/articoli-seed";

export const revalidate = 3600; // 1 ora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.mifidodite.eu";
  const now = new Date();

  // === PAGINE STATICHE PRINCIPALI ===
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },

    // Hub feature ad alto traffico
    { url: `${baseUrl}/spiagge`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/vacanze`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/razze`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/ristoranti`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/sentieri`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/magazine`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/professionisti`, lastModified: now, changeFrequency: "daily", priority: 0.9 },

    // Strumenti interattivi
    { url: `${baseUrl}/quiz-razza`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/costo-cane`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/razioni-cane`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/eta-cane`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/peso-ideale-cane`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/mappa`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // Altre feature
    { url: `${baseUrl}/adozioni`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/sos-smarriti`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/cliniche`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${baseUrl}/offerte`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/eventi`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },

    // Pagine di servizio
    { url: `${baseUrl}/prezzi`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/per-professionisti`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/partner`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/chi-siamo`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/registra-attivita`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/legal`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/termini`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // === SPIAGGE — pagine regionali ===
  const spiaggeRegionali: MetadataRoute.Sitemap = getAllSpiagge().map((regione) => ({
    url: `${baseUrl}/spiagge/${regione}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // === SPIAGGE — dettaglio singole (77) ===
  const spiaggeDettaglio: MetadataRoute.Sitemap = SPIAGGE_SEED.map((s) => ({
    url: `${baseUrl}/spiagge/${slugifyRegione(s.regione)}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // === RAZZE — dettaglio singole (20) ===
  const razzeDettaglio: MetadataRoute.Sitemap = RAZZE.map((r) => ({
    url: `${baseUrl}/razze/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // === RISTORANTI — pagine regionali ===
  const ristorantiRegionali: MetadataRoute.Sitemap = getAllRegioniRistoranti().map((regione) => ({
    url: `${baseUrl}/ristoranti/${regione}`,
    lastModified: now,
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
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const sentieriDettaglio: MetadataRoute.Sitemap = SENTIERI_SEED.map((s) => ({
    url: `${baseUrl}/sentieri/${slugifyRegioneS(s.regione)}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // === VACANZE — pagine regionali ===
  const vacanzeRegionali: MetadataRoute.Sitemap = getAllRegioniVacanze().map((regione) => ({
    url: `${baseUrl}/vacanze/${regione}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // === VACANZE — dettaglio singole (89) ===
  const vacanzeDettaglio: MetadataRoute.Sitemap = VACANZE_SEED.map((s) => ({
    url: `${baseUrl}/vacanze/${slugifyRegioneV(s.regione)}/${s.slug}`,
    lastModified: now,
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
      const rows = await sql`SELECT slug, updated_at, created_at FROM articoli WHERE pubblicato = true ORDER BY created_at DESC`;
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
  const seedArticlePages: MetadataRoute.Sitemap = ARTICOLI_SEED
    .filter((a) => !dbArticleSlugs.has(a.slug))
    .map((a) => ({
      url: `${baseUrl}/magazine/${a.slug}`,
      lastModified: now,
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
    ...spiaggeRegionali,
    ...spiaggeDettaglio,
    ...vacanzeRegionali,
    ...vacanzeDettaglio,
    ...articlePages,
    ...seedArticlePages,
  ];
}
