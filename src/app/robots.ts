import type { MetadataRoute } from "next";

// Robots.txt — strategia anti-scraping AI mantenendo SEO ufficiali
// Bot SEO permessi: Google, Bing, DuckDuckGo, Yandex
// Bot AI bloccati: tutti i crawler usati per training di LLM

const AI_BOTS_BLOCKED = [
  "GPTBot",                  // OpenAI
  "ChatGPT-User",            // OpenAI ChatGPT browse
  "OAI-SearchBot",           // OpenAI SearchGPT
  "ClaudeBot",               // Anthropic
  "Claude-Web",              // Anthropic
  "anthropic-ai",            // Anthropic legacy
  "Google-Extended",         // Google AI training (NON e' Googlebot SEO)
  "PerplexityBot",           // Perplexity
  "Perplexity-User",         // Perplexity
  "CCBot",                   // Common Crawl (usato da molti LLM)
  "Bytespider",              // ByteDance/TikTok
  "Amazonbot",               // Amazon
  "Applebot-Extended",       // Apple Intelligence
  "FacebookBot",             // Meta AI
  "Meta-ExternalAgent",      // Meta AI training
  "cohere-ai",               // Cohere
  "Diffbot",                 // Diffbot crawler
  "Omgilibot",               // Omgili
  "ImagesiftBot",            // Imagesift
  "YouBot",                  // You.com
  "Timpibot",                // Timpi
  "Kangaroo Bot",            // Kangaroo AI
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: tutti i bot ufficiali SEO
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/dashboard/", "/api/"],
      },
      // Blocco totale bot AI per training
      ...AI_BOTS_BLOCKED.map((bot) => ({
        userAgent: bot,
        disallow: "/",
      })),
    ],
    sitemap: "https://www.mifidodite.eu/sitemap.xml",
    host: "https://www.mifidodite.eu",
  };
}
