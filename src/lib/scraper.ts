import * as cheerio from "cheerio";

// ============================================
// Scraper leggero — fetch + cheerio, zero costi
// ============================================

export async function fetchPage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MifidoDiTeBot/1.0; +https://mifidodite.eu)",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

// ---- SCRAPER EVENTI DA VACANZEANIMALI.IT ----

export interface EventoScraped {
  titolo: string;
  tipo: "evento" | "fiera" | "raduno";
  data: string;
  citta: string;
  regione: string;
  indirizzo: string | null;
  sommario: string;
  fonte_url: string;
  organizzatore: string | null;
  prezzo: string | null;
}

export async function scrapeVacanzeAnimali(): Promise<EventoScraped[]> {
  const html = await fetchPage("https://www.vacanzeanimali.it/eventi.asp");
  if (!html) return [];

  const $ = cheerio.load(html);
  const eventi: EventoScraped[] = [];

  // Adatta i selettori in base alla struttura reale del sito
  $(".evento, .event-item, article, .list-item").each((_, el) => {
    const titolo =
      $(el).find("h2, h3, .title, .event-title").first().text().trim();
    const data = $(el).find(".date, .data, time").first().text().trim();
    const luogo =
      $(el).find(".location, .luogo, .city").first().text().trim();
    const desc =
      $(el).find("p, .description, .desc").first().text().trim();

    if (titolo && titolo.length > 3) {
      eventi.push({
        titolo,
        tipo: titolo.toLowerCase().includes("fiera") ? "fiera" : "evento",
        data: data || "",
        citta: luogo || "",
        regione: "",
        indirizzo: null,
        sommario: desc.slice(0, 300),
        fonte_url: "https://www.vacanzeanimali.it/eventi.asp",
        organizzatore: null,
        prezzo: null,
      });
    }
  });

  return eventi;
}

// ---- SCRAPER CLINICHE H24 DA ANIMALISOS.IT ----

export interface ClinicaScraped {
  nome: string;
  tipo: "clinica_h24" | "pronto_soccorso";
  citta: string;
  regione: string;
  indirizzo: string | null;
  telefono: string | null;
  descrizione: string;
  fonte_url: string;
  h24: boolean;
}

export async function scrapeClinicheH24(): Promise<ClinicaScraped[]> {
  const html = await fetchPage(
    "https://animalisos.it/pronto-soccorso-veterinario-strutture-h24-italia"
  );
  if (!html) return [];

  const $ = cheerio.load(html);
  const cliniche: ClinicaScraped[] = [];

  // Adatta selettori alla struttura reale
  $("table tr, .clinica, .structure, li").each((_, el) => {
    const text = $(el).text().trim();
    const nome =
      $(el).find("strong, b, h3, h4, .name").first().text().trim();
    const telefono =
      text.match(/(\+39[\s]?\d{2,4}[\s]?\d{4,8}|\d{2,4}[\s/.]\d{4,8})/)?.[0] || null;

    if (nome && nome.length > 3) {
      // Cerca indizi di citta nel testo
      const citta = text.match(
        /(?:Milano|Roma|Torino|Napoli|Bologna|Firenze|Genova|Palermo|Catania|Bari|Bergamo|Brescia|Verona|Padova|Venezia)/i
      )?.[0] || "";

      cliniche.push({
        nome,
        tipo: text.toLowerCase().includes("h24") ? "clinica_h24" : "pronto_soccorso",
        citta,
        regione: "",
        indirizzo: null,
        telefono,
        descrizione: text.slice(0, 300),
        fonte_url:
          "https://animalisos.it/pronto-soccorso-veterinario-strutture-h24-italia",
        h24: text.toLowerCase().includes("h24") || text.toLowerCase().includes("24 ore"),
      });
    }
  });

  return cliniche;
}

// ---- SCRAPER GENERICO PER QUALSIASI PAGINA ----

export async function scrapeGenericPage(url: string) {
  const html = await fetchPage(url);
  if (!html) return { title: "", text: "", links: [] as string[] };

  const $ = cheerio.load(html);

  // Rimuovi script, style, nav, footer
  $("script, style, nav, footer, header, aside").remove();

  return {
    title: $("title").text().trim(),
    text: $("body").text().replace(/\s+/g, " ").trim().slice(0, 5000),
    links: $("a[href]")
      .map((_, el) => $(el).attr("href"))
      .get()
      .filter((h): h is string => !!h),
  };
}
