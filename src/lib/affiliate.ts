// Affiliate disattivati — sito attualmente senza monetizzazione
// (manca P.IVA: nessun link affiliate Amazon o tracking commerciale).
// Le funzioni qui sotto restano come stub per non rompere import esistenti.

export function amazonLink(asin: string, locale: "it" | "de" | "fr" = "it"): string {
  const domain = locale === "it" ? "amazon.it" : locale === "de" ? "amazon.de" : "amazon.fr";
  return `https://www.${domain}/dp/${asin}`;
}

export function amazonSearchLink(keyword: string): string {
  const q = encodeURIComponent(keyword);
  return `https://www.amazon.it/s?k=${q}`;
}

export function trackingLink(offertaId: string): string {
  return `/api/offerte/${offertaId}/click`;
}

export function extractAsin(url: string): string | null {
  const match = url.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/);
  return match ? match[1] : null;
}
