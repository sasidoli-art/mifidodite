import type { MetadataRoute } from "next";
import { ARTICOLI_SEED } from "@/lib/articoli-seed";
import { PROFESSIONISTI_SEED } from "@/lib/professionisti-seed";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mifidodite.eu";

  // Pagine statiche
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/magazine`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/professionisti`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/mappa`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/adozioni`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/sos-smarriti`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/offerte`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/spiagge`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/cliniche`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/eventi`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${baseUrl}/prezzi`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/per-professionisti`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/partner`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/chi-siamo`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/termini`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  // Articoli magazine
  const articlePages = ARTICOLI_SEED.map((article) => ({
    url: `${baseUrl}/magazine/${article.slug}`,
    lastModified: new Date(article.data),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Professionisti
  const proPages = PROFESSIONISTI_SEED.map((pro) => ({
    url: `${baseUrl}/struttura/${pro.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages, ...proPages];
}
