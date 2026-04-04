// ============================================
// Scraper Subito.it — API pubblica Hades
// Estrae annunci reali di cani/gatti in regalo/adozione
// ============================================

export interface SubitoAnnuncio {
  id: string;
  titolo: string;
  descrizione: string;
  comune: string;
  provincia: string;
  regione: string;
  url: string;
  img: string | null;
  data: string;
  tipo: "offro" | "cerco";
  specie: "cane" | "gatto";
  fonte: "subito.it";
}

const SUBITO_API = "https://hades.subito.it/v1/search/items";

// Parole chiave che indicano che NON e un annuncio di animale vero
const BLACKLIST = [
  "cuccia", "trasportino", "guinzaglio", "crocchette", "antiparassit",
  "quadro", "dipinto", "casa vacanz", "arredamento", "mobili",
  "recinzion", "cancell", "gabbia", "mangiatoia",
];

export async function fetchSubitoAnimali(params: {
  query?: string;
  tipo?: "g" | "s"; // g = regalo, s = vendita
  limit?: number;
  specie?: "cane" | "gatto";
}): Promise<SubitoAnnuncio[]> {
  const { query, tipo = "g", limit = 20, specie = "cane" } = params;
  const q = query || (specie === "gatto" ? "gatto regalo" : "cane regalo");

  try {
    const url = `${SUBITO_API}?category=7&type=${tipo}&sort=datedesc&lim=${limit}&q=${encodeURIComponent(q)}&start=0`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return [];

    const data = await res.json();
    const ads = data.ads || [];

    return ads
      .map((ad: Record<string, unknown>): SubitoAnnuncio | null => {
        const subject = (ad as { subject?: string }).subject || "";
        const body = (ad as { body?: string }).body || "";
        const fullText = `${subject} ${body}`.toLowerCase();

        // Filtra annunci non pertinenti
        if (BLACKLIST.some((kw) => fullText.includes(kw))) return null;

        // Deve menzionare un animale
        const isCane = fullText.includes("cane") || fullText.includes("cucciolo") || fullText.includes("cagnol");
        const isGatto = fullText.includes("gatto") || fullText.includes("gattino") || fullText.includes("micio");
        if (!isCane && !isGatto) return null;

        const geo = ad.geo as Record<string, Record<string, string>> | undefined;
        const urls = ad.urls as Record<string, string> | undefined;
        const images = ad.images as Array<{ cdn_base_url?: string }> | undefined;
        const dates = ad.dates as Record<string, string> | undefined;
        const urn = (ad as { urn?: string }).urn || "";

        return {
          id: `subito-${urn.split(":")[3] || Date.now()}`,
          titolo: subject,
          descrizione: body.slice(0, 250),
          comune: geo?.town?.value || geo?.city?.value || "",
          provincia: geo?.city?.short_name || "",
          regione: geo?.region?.value || "",
          url: urls?.default || "",
          img: images?.[0]?.cdn_base_url
            ? `${images[0].cdn_base_url}/rule/square-300`
            : null,
          data: dates?.display?.split(" ")[0] || "",
          tipo: "offro",
          specie: isGatto ? "gatto" : "cane",
          fonte: "subito.it",
        };
      })
      .filter((ad: SubitoAnnuncio | null): ad is SubitoAnnuncio => ad !== null);
  } catch {
    return [];
  }
}

// Fetch sia cani che gatti in regalo
export async function fetchAllSubitoAdozioni(): Promise<SubitoAnnuncio[]> {
  const [cani, gatti] = await Promise.all([
    fetchSubitoAnimali({ specie: "cane", limit: 15 }),
    fetchSubitoAnimali({ specie: "gatto", limit: 10 }),
  ]);

  return [...cani, ...gatti];
}
