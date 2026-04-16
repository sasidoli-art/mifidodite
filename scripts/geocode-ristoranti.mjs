// Geocoding one-shot ristoranti pet-friendly
// Esegui: node scripts/geocode-ristoranti.mjs
// Output: scripts/ristoranti-coords.json

const RISTORANTI = [
  // === MILANO / LOMBARDIA ===
  { slug: "cascina-cuccagna-milano", nome: "Cascina Cuccagna", tipo: "ristorante", comune: "Milano", provincia: "MI", regione: "Lombardia" },
  { slug: "ratana-milano", nome: "Ratana", tipo: "ristorante", comune: "Milano", provincia: "MI", regione: "Lombardia" },
  { slug: "giannino-milano", nome: "Giannino Milano", tipo: "ristorante", comune: "Milano", provincia: "MI", regione: "Lombardia" },
  { slug: "osteria-del-binari-milano", nome: "Osteria del Binari", tipo: "osteria", comune: "Milano", provincia: "MI", regione: "Lombardia" },
  { slug: "temakinho-milano-navigli", nome: "Temakinho Navigli", tipo: "ristorante", comune: "Milano", provincia: "MI", regione: "Lombardia" },
  { slug: "lido-pace-como", nome: "Lido di Villa Olmo", tipo: "ristorante", comune: "Como", provincia: "CO", regione: "Lombardia" },

  // === ROMA / LAZIO ===
  { slug: "la-pergola-roma", nome: "La Pergola Rome Cavalieri", tipo: "ristorante", comune: "Roma", provincia: "RM", regione: "Lazio" },
  { slug: "eataly-roma", nome: "Eataly Roma Ostiense", tipo: "ristorante", comune: "Roma", provincia: "RM", regione: "Lazio" },
  { slug: "pierluigi-roma", nome: "Pierluigi Ristorante", tipo: "ristorante", comune: "Roma", provincia: "RM", regione: "Lazio" },
  { slug: "da-enzo-al-29-roma", nome: "Da Enzo al 29", tipo: "osteria", comune: "Roma", provincia: "RM", regione: "Lazio" },
  { slug: "roscioli-roma", nome: "Salumeria Roscioli", tipo: "bistrot", comune: "Roma", provincia: "RM", regione: "Lazio" },

  // === FIRENZE / TOSCANA ===
  { slug: "il-santo-bevitore-firenze", nome: "Il Santo Bevitore", tipo: "osteria", comune: "Firenze", provincia: "FI", regione: "Toscana" },
  { slug: "zeb-firenze", nome: "ZEB Gastronomia", tipo: "bistrot", comune: "Firenze", provincia: "FI", regione: "Toscana" },
  { slug: "obica-firenze", nome: "Obica Mozzarella Bar Firenze", tipo: "ristorante", comune: "Firenze", provincia: "FI", regione: "Toscana" },
  { slug: "osteria-vincanto-firenze", nome: "Osteria Vincanto", tipo: "osteria", comune: "Firenze", provincia: "FI", regione: "Toscana" },
  { slug: "agriturismo-fattoria-fibbiano", nome: "Fattoria Fibbiano", tipo: "agriturismo", comune: "Terricciola", provincia: "PI", regione: "Toscana" },

  // === VENEZIA / VENETO ===
  { slug: "osteria-al-cicheto-venezia", nome: "Osteria Al Cicheto", tipo: "osteria", comune: "Venezia", provincia: "VE", regione: "Veneto" },
  { slug: "ristorante-giorgione-venezia", nome: "Ristorante Giorgione Padova", tipo: "ristorante", comune: "Padova", provincia: "PD", regione: "Veneto" },
  { slug: "bar-pocol-cortina", nome: "Baita Pie Tofana", tipo: "ristorante", comune: "Cortina d'Ampezzo", provincia: "BL", regione: "Veneto" },

  // === NAPOLI / CAMPANIA ===
  { slug: "pizzeria-da-michele-napoli", nome: "L'Antica Pizzeria da Michele", tipo: "pizzeria", comune: "Napoli", provincia: "NA", regione: "Campania" },
  { slug: "starita-materdei-napoli", nome: "Pizzeria Starita a Materdei", tipo: "pizzeria", comune: "Napoli", provincia: "NA", regione: "Campania" },
  { slug: "don-alfonso-1890-santagata", nome: "Don Alfonso 1890", tipo: "ristorante", comune: "Sant'Agata sui Due Golfi", provincia: "NA", regione: "Campania" },

  // === BOLOGNA / EMILIA-ROMAGNA ===
  { slug: "trattoria-anna-maria-bologna", nome: "Trattoria Anna Maria", tipo: "osteria", comune: "Bologna", provincia: "BO", regione: "Emilia-Romagna" },
  { slug: "osteria-bottega-bologna", nome: "Osteria Bottega", tipo: "osteria", comune: "Bologna", provincia: "BO", regione: "Emilia-Romagna" },
  { slug: "pizzeria-palaz-parma", nome: "Pizzeria Palaz", tipo: "pizzeria", comune: "Parma", provincia: "PR", regione: "Emilia-Romagna" },

  // === PUGLIA ===
  { slug: "osteria-piazzetta-cattedrale-ostuni", nome: "Osteria Piazzetta Cattedrale", tipo: "osteria", comune: "Ostuni", provincia: "BR", regione: "Puglia" },
  { slug: "la-sommita-ostuni-ristorante", nome: "La Sommita Relais Ristorante", tipo: "ristorante", comune: "Ostuni", provincia: "BR", regione: "Puglia" },
  { slug: "trullo-sovrano-alberobello", nome: "Trullo d'Oro", tipo: "ristorante", comune: "Alberobello", provincia: "BA", regione: "Puglia" },

  // === SICILIA ===
  { slug: "antica-focacceria-san-francesco-palermo", nome: "Antica Focacceria San Francesco", tipo: "osteria", comune: "Palermo", provincia: "PA", regione: "Sicilia" },
  { slug: "osteria-mercato-catania", nome: "Osteria Antica Marina", tipo: "osteria", comune: "Catania", provincia: "CT", regione: "Sicilia" },
  { slug: "dolci-dolcerie-taormina", nome: "Bam Bar Taormina", tipo: "bistrot", comune: "Taormina", provincia: "ME", regione: "Sicilia" },

  // === LIGURIA ===
  { slug: "trattoria-rosmarino-genova", nome: "Trattoria Rosmarino", tipo: "osteria", comune: "Genova", provincia: "GE", regione: "Liguria" },
  { slug: "il-marin-genova", nome: "Il Marin Eataly Genova", tipo: "ristorante", comune: "Genova", provincia: "GE", regione: "Liguria" },
  { slug: "la-brinca-ne", nome: "La Brinca", tipo: "osteria", comune: "Ne", provincia: "GE", regione: "Liguria" },

  // === PIEMONTE ===
  { slug: "del-cambio-torino", nome: "Del Cambio", tipo: "ristorante", comune: "Torino", provincia: "TO", regione: "Piemonte" },
  { slug: "eataly-torino", nome: "Eataly Torino Lingotto", tipo: "ristorante", comune: "Torino", provincia: "TO", regione: "Piemonte" },

  // === SARDEGNA ===
  { slug: "agriturismo-locci-zuddas-dolianova", nome: "Agriturismo Locci Zuddas", tipo: "agriturismo", comune: "Dolianova", provincia: "CA", regione: "Sardegna" },
  { slug: "sa-domu-antiga-asuni", nome: "Sa Domu Antiga", tipo: "agriturismo", comune: "Asuni", provincia: "OR", regione: "Sardegna" },
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
    `${s.nome}`,
    `${s.comune} ${s.regione}`,
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
  for (let i = 0; i < RISTORANTI.length; i++) {
    const s = RISTORANTI[i];
    process.stdout.write(`[${i + 1}/${RISTORANTI.length}] ${s.slug}... `);
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
  const out = path.join(process.cwd(), "scripts", "ristoranti-coords.json");
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log(`\nSaved ${results.length} results to ${out}`);
  const ok = results.filter((r) => r.lat !== null).length;
  console.log(`Successes: ${ok}/${results.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
