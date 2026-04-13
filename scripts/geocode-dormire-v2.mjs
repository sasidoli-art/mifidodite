// Geocoding v2 — espansione strutture ricettive (regioni scoperte + altri big name)
// Esegui: node scripts/geocode-dormire-v2.mjs

const STRUTTURE = [
  // === CALABRIA (aggiunte) ===
  { slug: "capovaticano-resort-tropea", nome: "Capovaticano Resort Thalasso & Spa", tipo: "hotel", comune: "Ricadi", provincia: "VV", regione: "Calabria" },
  { slug: "praia-art-resort-le-castella", nome: "Praia Art Resort", tipo: "hotel", comune: "Isola di Capo Rizzuto", provincia: "KR", regione: "Calabria" },
  { slug: "villaggio-san-lorenzo-marcelletti", nome: "Villaggio San Lorenzo", tipo: "casa_vacanza", comune: "Marina di Mandatoriccio", provincia: "CS", regione: "Calabria" },

  // === MARCHE (aggiunte oltre Villa Cattani) ===
  { slug: "borgo-dei-conti-villagrande", nome: "Borgo dei Conti Resort", tipo: "agriturismo", comune: "Monte Cerignone", provincia: "PU", regione: "Marche" },
  { slug: "hotel-villa-amalia-ancona", nome: "Hotel Villa Amalia", tipo: "hotel", comune: "Falconara Marittima", provincia: "AN", regione: "Marche" },
  { slug: "green-garden-camping-senigallia", nome: "Camping Green Garden", tipo: "camping", comune: "Senigallia", provincia: "AN", regione: "Marche" },

  // === ABRUZZO (nuove) ===
  { slug: "villaggio-eden-pineto", nome: "Villaggio Turistico Eden", tipo: "camping", comune: "Pineto", provincia: "TE", regione: "Abruzzo" },
  { slug: "golf-hotel-punta-aderci", nome: "Golf Hotel Punta Aderci", tipo: "hotel", comune: "Vasto", provincia: "CH", regione: "Abruzzo" },
  { slug: "le-casette-di-jemma-scanno", nome: "Le Casette di Jemma", tipo: "casa_vacanza", comune: "Scanno", provincia: "AQ", regione: "Abruzzo" },
  { slug: "sextantio-albergo-diffuso", nome: "Sextantio Albergo Diffuso", tipo: "bnb", comune: "Santo Stefano di Sessanio", provincia: "AQ", regione: "Abruzzo" },

  // === MOLISE ===
  { slug: "costa-verde-camping-molise", nome: "Costa Verde Camping Village", tipo: "camping", comune: "Montenero di Bisaccia", provincia: "CB", regione: "Molise" },
  { slug: "santavenere-termoli-bnb", nome: "Santavenere B&B", tipo: "bnb", comune: "Termoli", provincia: "CB", regione: "Molise" },

  // === FRIULI-VENEZIA GIULIA ===
  { slug: "falkensteiner-jesolo-lignano", nome: "Falkensteiner Hotel Park Lignano", tipo: "hotel", comune: "Lignano Sabbiadoro", provincia: "UD", regione: "Friuli-Venezia Giulia" },
  { slug: "camping-pino-mare-lignano", nome: "Camping Pino Mare", tipo: "camping", comune: "Lignano Riviera", provincia: "UD", regione: "Friuli-Venezia Giulia" },
  { slug: "grand-hotel-astoria-grado", nome: "Grand Hotel Astoria", tipo: "hotel", comune: "Grado", provincia: "GO", regione: "Friuli-Venezia Giulia" },
  { slug: "camping-europa-grado", nome: "Camping Europa", tipo: "camping", comune: "Grado", provincia: "GO", regione: "Friuli-Venezia Giulia" },

  // === BASILICATA (nuove) ===
  { slug: "la-mola-matera", nome: "La Mola B&B", tipo: "bnb", comune: "Matera", provincia: "MT", regione: "Basilicata" },
  { slug: "hotel-villa-del-mare-maratea", nome: "Villa del Mare", tipo: "hotel", comune: "Maratea", provincia: "PZ", regione: "Basilicata" },

  // === LAZIO (aggiuntive) ===
  { slug: "park-hotel-marlin-sabaudia", nome: "Park Hotel Marlin", tipo: "hotel", comune: "Sabaudia", provincia: "LT", regione: "Lazio" },
  { slug: "circeo-park-hotel", nome: "Circeo Park Hotel", tipo: "hotel", comune: "San Felice Circeo", provincia: "LT", regione: "Lazio" },
  { slug: "il-mulino-acquafredda", nome: "Il Mulino di Acquafredda", tipo: "agriturismo", comune: "Fiuggi", provincia: "FR", regione: "Lazio" },

  // === LIGURIA (aggiuntive) ===
  { slug: "grand-hotel-miramare-santa-margherita", nome: "Grand Hotel Miramare", tipo: "hotel", comune: "Santa Margherita Ligure", provincia: "GE", regione: "Liguria" },
  { slug: "camping-fossalta-dolceacqua", nome: "Camping Fossalta", tipo: "camping", comune: "Bordighera", provincia: "IM", regione: "Liguria" },
  { slug: "hotel-bristol-bordighera", nome: "Hotel Bristol", tipo: "hotel", comune: "Bordighera", provincia: "IM", regione: "Liguria" },

  // === TRENTINO-ALTO ADIGE ===
  { slug: "hotel-cavallino-bianco-ortisei", nome: "Hotel Cavallino Bianco", tipo: "hotel", comune: "Ortisei", provincia: "BZ", regione: "Trentino-Alto Adige" },
  { slug: "quellenhof-see-lodge-passiria", nome: "Quellenhof See Lodge", tipo: "hotel", comune: "San Martino in Passiria", provincia: "BZ", regione: "Trentino-Alto Adige" },
  { slug: "adler-mountain-lodge-alpe-siusi", nome: "Adler Mountain Lodge", tipo: "hotel", comune: "Alpe di Siusi", provincia: "BZ", regione: "Trentino-Alto Adige" },

  // === PIEMONTE (nuova regione) ===
  { slug: "camping-verbano-arolo", nome: "Camping Verbano", tipo: "camping", comune: "Leggiuno", provincia: "VA", regione: "Piemonte" },
  { slug: "hotel-astoria-stresa", nome: "Hotel Astoria", tipo: "hotel", comune: "Stresa", provincia: "VB", regione: "Piemonte" },
  { slug: "relais-sant-uffizio-cioccaro", nome: "Relais Sant'Uffizio", tipo: "agriturismo", comune: "Penango", provincia: "AT", regione: "Piemonte" },
];

const UA = "MifidoDiTe.eu/1.0 (contact: info@mifidodite.eu)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function nominatimQuery(q) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&countrycodes=it&format=json&limit=1&addressdetails=0`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.length === 0) return null;
  return { lat: Number(data[0].lat), lon: Number(data[0].lon), display: data[0].display_name };
}

async function geocode(s) {
  const queries = [
    `${s.nome} ${s.comune}`,
    `${s.comune} ${s.regione}`,
    `${s.comune}`,
  ];
  for (const q of queries) {
    const r = await nominatimQuery(q);
    await sleep(1100);
    if (r) return { ...s, ...r, query: q };
  }
  return { ...s, lat: null, lon: null, query: null };
}

async function main() {
  const results = [];
  for (let i = 0; i < STRUTTURE.length; i++) {
    const s = STRUTTURE[i];
    process.stdout.write(`[${i + 1}/${STRUTTURE.length}] ${s.slug}... `);
    try {
      const r = await geocode(s);
      results.push(r);
      console.log(r.lat ? `OK (${r.lat.toFixed(4)}, ${r.lon.toFixed(4)})` : "FAIL");
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      results.push({ ...s, lat: null, lon: null });
    }
  }
  const fs = await import("fs");
  const path = await import("path");
  const out = path.join(process.cwd(), "scripts", "dormire-coords-v2.json");
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log(`\nSaved ${results.length} results to ${out}`);
  const ok = results.filter((r) => r.lat !== null).length;
  console.log(`Successes: ${ok}/${results.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
