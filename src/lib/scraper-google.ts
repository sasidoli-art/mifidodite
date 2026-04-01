import * as cheerio from "cheerio";

// ============================================
// Scraper Google Maps / Search — zero costi
// Cerca cliniche, ambulatori, rifugi reali via Google
// ============================================

interface GoogleResult {
  nome: string;
  indirizzo: string;
  telefono: string | null;
  rating: number | null;
  tipo: string;
  comune: string;
  provincia: string;
  regione: string;
}

// Usa Google search per trovare cliniche in una citta
export async function cercaClinicheGoogle(
  citta: string,
  provincia: string,
  regione: string,
  tipo: "clinica veterinaria" | "ambulatorio veterinario" | "pronto soccorso veterinario" | "rifugio animali" | "canile comunale"
): Promise<GoogleResult[]> {
  const query = encodeURIComponent(`${tipo} ${citta} ${provincia}`);
  const url = `https://www.google.com/search?q=${query}&num=10&hl=it`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "it-IT,it;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return [];
    const html = await res.text();
    const $ = cheerio.load(html);

    const results: GoogleResult[] = [];

    // Estrai risultati dal local pack di Google
    $(".VkpGBb, .rllt__details, .dbg0pd").each((_, el) => {
      const nome = $(el).find(".OSrXXb, .dbg0pd, span[role='heading']").first().text().trim();
      const indirizzo = $(el).find(".rllt__wrapped, .lMbq3e").text().trim();
      const rating = parseFloat($(el).find(".yi40Hd, .BTtC6e").text().trim()) || null;
      const telefono = $(el).text().match(/(\+39[\s]?\d{2,4}[\s]?\d{4,8}|\d{2,4}[\s/.]\d{4,8})/)?.[0] || null;

      if (nome && nome.length > 3) {
        results.push({
          nome,
          indirizzo: indirizzo || citta,
          telefono,
          rating,
          tipo: tipo.replace(" veterinario", "").replace(" veterinaria", "").replace(" comunale", "").replace(" animali", ""),
          comune: citta,
          provincia,
          regione,
        });
      }
    });

    // Fallback: estrai dai risultati organici
    if (results.length === 0) {
      $("h3").each((_, el) => {
        const nome = $(el).text().trim();
        if (
          nome.length > 5 &&
          nome.length < 100 &&
          !nome.includes("Google") &&
          !nome.includes("Ricerca") &&
          (nome.toLowerCase().includes("veterinar") ||
            nome.toLowerCase().includes("clinica") ||
            nome.toLowerCase().includes("ambulatorio") ||
            nome.toLowerCase().includes("rifugio") ||
            nome.toLowerCase().includes("canile"))
        ) {
          results.push({
            nome: nome.replace(/ - .*$/, "").trim(),
            indirizzo: citta,
            telefono: null,
            rating: null,
            tipo: tipo.replace(" veterinario", "").replace(" veterinaria", "").replace(" comunale", "").replace(" animali", ""),
            comune: citta,
            provincia,
            regione,
          });
        }
      });
    }

    return results.slice(0, 10);
  } catch {
    return [];
  }
}

// Citta principali italiane per regione
export const CITTA_ITALIANE: Record<string, { citta: string; prov: string }[]> = {
  Lombardia: [
    { citta: "Milano", prov: "MI" },
    { citta: "Bergamo", prov: "BG" },
    { citta: "Brescia", prov: "BS" },
    { citta: "Monza", prov: "MB" },
    { citta: "Como", prov: "CO" },
    { citta: "Varese", prov: "VA" },
  ],
  Lazio: [
    { citta: "Roma", prov: "RM" },
    { citta: "Latina", prov: "LT" },
    { citta: "Frosinone", prov: "FR" },
    { citta: "Viterbo", prov: "VT" },
  ],
  Campania: [
    { citta: "Napoli", prov: "NA" },
    { citta: "Salerno", prov: "SA" },
    { citta: "Caserta", prov: "CE" },
  ],
  Piemonte: [
    { citta: "Torino", prov: "TO" },
    { citta: "Novara", prov: "NO" },
    { citta: "Alessandria", prov: "AL" },
  ],
  Veneto: [
    { citta: "Venezia", prov: "VE" },
    { citta: "Verona", prov: "VR" },
    { citta: "Padova", prov: "PD" },
    { citta: "Vicenza", prov: "VI" },
    { citta: "Treviso", prov: "TV" },
  ],
  "Emilia-Romagna": [
    { citta: "Bologna", prov: "BO" },
    { citta: "Modena", prov: "MO" },
    { citta: "Parma", prov: "PR" },
    { citta: "Rimini", prov: "RN" },
    { citta: "Reggio Emilia", prov: "RE" },
  ],
  Toscana: [
    { citta: "Firenze", prov: "FI" },
    { citta: "Pisa", prov: "PI" },
    { citta: "Livorno", prov: "LI" },
    { citta: "Siena", prov: "SI" },
  ],
  Puglia: [
    { citta: "Bari", prov: "BA" },
    { citta: "Lecce", prov: "LE" },
    { citta: "Taranto", prov: "TA" },
    { citta: "Foggia", prov: "FG" },
  ],
  Sicilia: [
    { citta: "Palermo", prov: "PA" },
    { citta: "Catania", prov: "CT" },
    { citta: "Messina", prov: "ME" },
    { citta: "Siracusa", prov: "SR" },
  ],
  Sardegna: [
    { citta: "Cagliari", prov: "CA" },
    { citta: "Sassari", prov: "SS" },
    { citta: "Olbia", prov: "SS" },
  ],
  Liguria: [
    { citta: "Genova", prov: "GE" },
    { citta: "La Spezia", prov: "SP" },
    { citta: "Savona", prov: "SV" },
  ],
  "Friuli Venezia Giulia": [
    { citta: "Trieste", prov: "TS" },
    { citta: "Udine", prov: "UD" },
  ],
  "Trentino-Alto Adige": [
    { citta: "Trento", prov: "TN" },
    { citta: "Bolzano", prov: "BZ" },
  ],
  Marche: [
    { citta: "Ancona", prov: "AN" },
    { citta: "Pesaro", prov: "PU" },
  ],
  Umbria: [
    { citta: "Perugia", prov: "PG" },
    { citta: "Terni", prov: "TR" },
  ],
  Abruzzo: [
    { citta: "Pescara", prov: "PE" },
    { citta: "L'Aquila", prov: "AQ" },
  ],
  Calabria: [
    { citta: "Cosenza", prov: "CS" },
    { citta: "Catanzaro", prov: "CZ" },
    { citta: "Reggio Calabria", prov: "RC" },
  ],
  Basilicata: [
    { citta: "Potenza", prov: "PZ" },
    { citta: "Matera", prov: "MT" },
  ],
  Molise: [
    { citta: "Campobasso", prov: "CB" },
  ],
  "Valle d'Aosta": [
    { citta: "Aosta", prov: "AO" },
  ],
};

export const REGIONI = Object.keys(CITTA_ITALIANE);
