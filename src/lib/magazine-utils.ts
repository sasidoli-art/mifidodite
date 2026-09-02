// Utility per il magazine: shuffle stabile, featured rotation, pool immagini

/**
 * Deterministic shuffle: stabile per 1 ora, poi cambia.
 * Cache-friendly (revalidate del magazine page funziona).
 */
export function shuffleByHour<T>(items: T[]): T[] {
  const seed = Math.floor(Date.now() / (1000 * 60 * 60)); // hourly seed
  return items
    .map((item, idx) => ({ item, sort: hashedRandom(seed * 31 + idx) }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

/**
 * Seleziona un articolo "featured" che cambia ogni settimana.
 * Preferisce contenuti evergreen (guide, salute, razze, comportamento).
 */
export function pickFeatured<T extends { categoria: string; slug: string }>(
  items: T[]
): T {
  if (items.length === 0) return items[0];
  const weekIdx = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  const evergreen = items.filter((a) =>
    ["guide", "razze", "salute", "comportamento", "estate"].includes(a.categoria)
  );
  const pool = evergreen.length > 0 ? evergreen : items;
  return pool[weekIdx % pool.length];
}

/**
 * Hashing 32-bit per pseudorandom deterministico.
 */
function hashedRandom(n: number): number {
  let h = n | 0;
  h = ((h ^ (h >>> 16)) * 0x85ebca6b) | 0;
  h = ((h ^ (h >>> 13)) * 0xc2b2ae35) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/**
 * Pool di immagini Unsplash per categoria — usate come fallback
 * quando un articolo ha immagine duplicata o generica.
 */
export const IMG_POOL_BY_CATEGORY: Record<string, string[]> = {
  guide: [
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "https://images.unsplash.com/photo-1583337426008-2fef51aa841a?w=800&q=80",
    "https://images.unsplash.com/photo-1568393691080-1f97a9f48dba?w=800&q=80",
    "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&q=80",
  ],
  salute: [
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
    "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80",
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80",
  ],
  comportamento: [
    "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800&q=80",
    "https://images.unsplash.com/photo-1568393691080-1f97a9f48dba?w=800&q=80",
    "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&q=80",
    "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80",
  ],
  razze: [
    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=800&q=80",
    "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80",
    "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&q=80",
    "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=800&q=80",
    "https://images.unsplash.com/photo-1593134257782-e89567b7718a?w=800&q=80",
    "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?w=800&q=80",
  ],
  curiosita: [
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
  ],
  estate: [
    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&q=80",
    "https://images.unsplash.com/photo-1583336663277-620dc1996580?w=800&q=80",
    "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&q=80",
    "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=800&q=80",
  ],
  spiagge: [
    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=800&q=80",
  ],
  vacanze: [
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    "https://images.unsplash.com/photo-1577720643272-265e434f2f85?w=800&q=80",
  ],
  sentieri: [
    "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  ],
  aneddoti: [
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  ],
  gatti: [
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=800&q=80",
  ],
  generic: [
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
    "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80",
  ],
};

const GENERIC_IMG_PATTERNS = [
  "photo-1587300003388",
  "photo-1601758228041",
];

/**
 * Restituisce un'immagine "fresca" per l'articolo.
 * Se l'immagine originale e' generica o assente, sceglie dal pool della categoria
 * in modo deterministico basato su slug + ora.
 */
export function pickImage(
  article: { slug: string; categoria: string; img?: string }
): string {
  const orig = article.img || "";
  const isGeneric = !orig || GENERIC_IMG_PATTERNS.some((p) => orig.includes(p));
  if (!isGeneric) return orig;

  const pool =
    IMG_POOL_BY_CATEGORY[article.categoria] || IMG_POOL_BY_CATEGORY.generic;
  // Seleziona in base allo slug (stabile) + ora (varia ogni ora)
  const hour = Math.floor(Date.now() / (1000 * 60 * 60));
  const slugHash = simpleHash(article.slug);
  return pool[(slugHash + hour) % pool.length];
}

function simpleHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h = h | 0;
  }
  return Math.abs(h);
}
