// ============================================
// Affiliate links — Amazon + future provider
// ============================================

const AMAZON_TAG = process.env.AMAZON_AFFILIATE_TAG || "mifidodite-21";

/**
 * Genera link Amazon con affiliate tag.
 * @param asin Product ASIN (es. B07KQ8L7TR)
 * @param locale "it" | "de" | "fr" — default it
 */
export function amazonLink(asin: string, locale: "it" | "de" | "fr" = "it"): string {
  const domain = locale === "it" ? "amazon.it" : locale === "de" ? "amazon.de" : "amazon.fr";
  return `https://www.${domain}/dp/${asin}/?tag=${AMAZON_TAG}`;
}

/**
 * Genera link search Amazon con keyword + tag.
 * Utile quando non hai l'ASIN ma vuoi cercare un prodotto.
 */
export function amazonSearchLink(keyword: string): string {
  const q = encodeURIComponent(keyword);
  return `https://www.amazon.it/s?k=${q}&tag=${AMAZON_TAG}`;
}

/**
 * Costruisce l'URL di redirect interno (passa per il nostro tracker).
 * Cosi possiamo contare i click prima di mandare l'utente su Amazon.
 */
export function trackingLink(offertaId: string): string {
  return `/api/offerte/${offertaId}/click`;
}

/**
 * Estrae l'ASIN da un URL Amazon.
 * Funziona con: /dp/B07KQ8L7TR, /gp/product/B07KQ8L7TR, etc.
 */
export function extractAsin(url: string): string | null {
  const match = url.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/);
  return match ? match[1] : null;
}
