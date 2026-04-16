// Geocoding sentieri dog-friendly
// Esegui: node scripts/geocode-sentieri.mjs

const SENTIERI = [
  // === TRENTINO-ALTO ADIGE ===
  { slug: "sentiero-alpe-siusi-dolomiti", nome: "Sentiero dell'Alpe di Siusi", comune: "Castelrotto", provincia: "BZ", regione: "Trentino-Alto Adige" },
  { slug: "giro-tre-cime-lavaredo", nome: "Giro delle Tre Cime di Lavaredo", comune: "Auronzo di Cadore", provincia: "BL", regione: "Veneto" },
  { slug: "sentiero-del-ponale-riva", nome: "Sentiero del Ponale", comune: "Riva del Garda", provincia: "TN", regione: "Trentino-Alto Adige" },
  { slug: "lago-braies-escursione", nome: "Giro del Lago di Braies", comune: "Braies", provincia: "BZ", regione: "Trentino-Alto Adige" },
  { slug: "val-di-funes-odle", nome: "Sentiero delle Odle Val di Funes", comune: "Funes", provincia: "BZ", regione: "Trentino-Alto Adige" },

  // === LOMBARDIA ===
  { slug: "sentiero-viandante-lago-como", nome: "Sentiero del Viandante", comune: "Abbadia Lariana", provincia: "LC", regione: "Lombardia" },
  { slug: "monte-isola-sentiero", nome: "Giro di Monte Isola", comune: "Monte Isola", provincia: "BS", regione: "Lombardia" },

  // === PIEMONTE ===
  { slug: "sentiero-balcone-monviso", nome: "Sentiero Balcone del Monviso", comune: "Crissolo", provincia: "CN", regione: "Piemonte" },
  { slug: "sacra-san-michele-sentiero", nome: "Sentiero per la Sacra di San Michele", comune: "Sant'Ambrogio di Torino", provincia: "TO", regione: "Piemonte" },

  // === LIGURIA ===
  { slug: "sentiero-azzurro-cinque-terre", nome: "Sentiero Azzurro (Cinque Terre)", comune: "Riomaggiore", provincia: "SP", regione: "Liguria" },
  { slug: "sentiero-rilke-trieste", nome: "Sentiero Rilke", comune: "Sistiana", provincia: "TS", regione: "Friuli-Venezia Giulia" },
  { slug: "alta-via-monti-liguri", nome: "Alta Via dei Monti Liguri (tappe)", comune: "Ventimiglia", provincia: "IM", regione: "Liguria" },

  // === TOSCANA ===
  { slug: "via-francigena-san-gimignano", nome: "Via Francigena tappa San Gimignano", comune: "San Gimignano", provincia: "SI", regione: "Toscana" },
  { slug: "sentiero-della-bonifica-valdichiana", nome: "Sentiero della Bonifica", comune: "Arezzo", provincia: "AR", regione: "Toscana" },
  { slug: "anello-monte-amiata", nome: "Anello del Monte Amiata", comune: "Abbadia San Salvatore", provincia: "SI", regione: "Toscana" },

  // === LAZIO ===
  { slug: "sentiero-monte-circeo", nome: "Sentiero del Monte Circeo", comune: "San Felice Circeo", provincia: "LT", regione: "Lazio" },
  { slug: "cammino-san-benedetto", nome: "Cammino di San Benedetto (tappe)", comune: "Norcia", provincia: "PG", regione: "Umbria" },

  // === CAMPANIA ===
  { slug: "sentiero-degli-dei-costiera", nome: "Sentiero degli Dei", comune: "Agerola", provincia: "NA", regione: "Campania" },
  { slug: "monte-faito-sentieri", nome: "Monte Faito escursioni", comune: "Vico Equense", provincia: "NA", regione: "Campania" },

  // === PUGLIA ===
  { slug: "gargano-foresta-umbra-sentieri", nome: "Sentieri della Foresta Umbra", comune: "Vieste", provincia: "FG", regione: "Puglia" },

  // === SICILIA ===
  { slug: "etna-sentiero-schiena-asino", nome: "Sentiero Schiena dell'Asino (Etna)", comune: "Zafferana Etnea", provincia: "CT", regione: "Sicilia" },
  { slug: "riserva-zingaro-sentiero", nome: "Riserva dello Zingaro", comune: "San Vito Lo Capo", provincia: "TP", regione: "Sicilia" },

  // === SARDEGNA ===
  { slug: "trekking-gola-gorropu", nome: "Trekking Gola di Gorropu", comune: "Urzulei", provincia: "NU", regione: "Sardegna" },
  { slug: "cala-luna-trekking-sardegna", nome: "Trekking per Cala Luna", comune: "Baunei", provincia: "NU", regione: "Sardegna" },

  // === ABRUZZO ===
  { slug: "sentiero-del-cuore-scanno", nome: "Sentiero del Cuore", comune: "Scanno", provincia: "AQ", regione: "Abruzzo" },
  { slug: "campo-imperatore-gran-sasso", nome: "Campo Imperatore escursioni", comune: "Castel del Monte", provincia: "AQ", regione: "Abruzzo" },
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
    `${s.nome}`,
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
  for (let i = 0; i < SENTIERI.length; i++) {
    const s = SENTIERI[i];
    process.stdout.write(`[${i + 1}/${SENTIERI.length}] ${s.slug}... `);
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
  const out = path.join(process.cwd(), "scripts", "sentieri-coords.json");
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log(`\nSaved ${results.length} results to ${out}`);
  const ok = results.filter((r) => r.lat !== null).length;
  console.log(`Successes: ${ok}/${results.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
