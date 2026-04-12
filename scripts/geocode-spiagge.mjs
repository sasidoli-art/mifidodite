// Geocoding one-shot per le spiagge del seed.
// Esegui da c:/PROGETTI/mifidodite/app/: node scripts/geocode-spiagge.mjs
// Output: scripts/spiagge-coords.json

const SPIAGGE = [
  { slug: "rimini-dog-no-problem-bagno-81", nome: "Rimini Dog No Problem Bagno 81", comune: "Rimini", regione: "Emilia-Romagna" },
  { slug: "fido-beach-san-mauro-mare", nome: "Fido Beach", comune: "San Mauro a Mare", regione: "Emilia-Romagna" },
  { slug: "maremoto-beach-lido-estensi", nome: "Maremoto Beach", comune: "Lido degli Estensi", regione: "Emilia-Romagna" },
  { slug: "spiaggia-libera-lido-di-classe", nome: "Spiaggia Libera Cani", comune: "Lido di Classe", regione: "Emilia-Romagna" },
  { slug: "dog-beach-san-vincenzo", nome: "Dog Beach San Vincenzo", comune: "San Vincenzo", regione: "Toscana" },
  { slug: "single-fin-tuscany-dog-beach-calambrone", nome: "Single Fin Tuscany Dog Beach", comune: "Calambrone", regione: "Toscana" },
  { slug: "bau-beach-follonica", nome: "Bau Beach", comune: "Follonica", regione: "Toscana" },
  { slug: "spiaggia-di-pippo-baba-beach-albenga", nome: "Spiaggia di Pippo Baba Beach", comune: "Albenga", regione: "Liguria" },
  { slug: "baubeach-maccarese", nome: "BauBeach", comune: "Maccarese Fiumicino", regione: "Lazio" },
  { slug: "tequila-dog-beach-montalto", nome: "Tequila Dog Beach", comune: "Montalto di Castro", regione: "Lazio" },
  { slug: "bau-beach-palinuro", nome: "Bau Beach Palinuro", comune: "Palinuro", regione: "Campania" },
  { slug: "il-santos-torre-canne", nome: "Il Santos", comune: "Torre Canne Fasano", regione: "Puglia" },
  { slug: "dog-waterpark-bari", nome: "Dog Waterpark", comune: "Bari", regione: "Puglia" },
  { slug: "tiliguerta-dog-beach-costa-rei", nome: "Tiliguerta Dog Beach Costa Rei", comune: "Muravera", regione: "Sardegna" },
  { slug: "spiaggia-di-pluto-bibione", nome: "Spiaggia di Pluto", comune: "Bibione", regione: "Veneto" },
  { slug: "pachuka-beach-club-lido-venezia", nome: "Pachuka Beach Club", comune: "Lido di Venezia", regione: "Veneto" },
  { slug: "ombelico-del-mondo-mondello", nome: "L'Ombelico del Mondo", comune: "Mondello Palermo", regione: "Sicilia" },
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
    `${s.comune} spiaggia`,
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
  for (let i = 0; i < SPIAGGE.length; i++) {
    const s = SPIAGGE[i];
    process.stdout.write(`[${i + 1}/${SPIAGGE.length}] ${s.slug}... `);
    try {
      const r = await geocode(s);
      results.push(r);
      console.log(r.lat ? `OK (${r.lat.toFixed(4)}, ${r.lon.toFixed(4)}) via "${r.query}"` : "FAIL");
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      results.push({ ...s, lat: null, lon: null });
    }
  }
  const fs = await import("fs");
  const path = await import("path");
  const out = path.join(process.cwd(), "scripts", "spiagge-coords.json");
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log(`\nSaved ${results.length} results to ${out}`);
  const ok = results.filter((r) => r.lat !== null).length;
  console.log(`Successes: ${ok}/${results.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
