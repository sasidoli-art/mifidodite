const sql = require('postgres')('postgresql://neondb_owner:npg_eVGl9LvFu0mg@ep-delicate-mode-ald0h0hv.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require');

function slugify(t) {
  return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function askDS(p) {
  const r = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + process.env.DEEPSEEK_API_KEY },
    body: JSON.stringify({ model: 'deepseek-chat', max_tokens: 4000, messages: [{ role: 'user', content: p }] }),
  });
  return (await r.json()).choices?.[0]?.message?.content || '';
}

const topics = [
  { cat: 'curiosita', t: 'Quanti muscoli ha la coda di un cane? L anatomia segreta dei nostri amici', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80' },
  { cat: 'curiosita', t: 'Il naso del cane: 300 milioni di recettori olfattivi e cosa ci fanno', img: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&q=80' },
  { cat: 'curiosita', t: 'Perche i gatti atterrano sempre in piedi: la fisica del riflesso di raddrizzamento', img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80' },
  { cat: 'curiosita', t: 'Il cervello del cane e grande come un mandarino: cosa sa fare', img: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&q=80' },
  { cat: 'curiosita', t: 'I gatti possono bere acqua di mare: il rene felino e un capolavoro', img: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=80' },
  { cat: 'curiosita', t: 'Un anno del cane non sono 7 anni umani: la vera formula scientifica', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80' },
  { cat: 'curiosita', t: 'Il ronrr del gatto vibra a 25 Hz: frequenza che guarisce le ossa', img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=80' },
  { cat: 'curiosita', t: 'I cani vedono i colori? La vista canina spiegata con la scienza', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80' },
  { cat: 'curiosita', t: 'Il cane piu vecchio del mondo ha 31 anni: la storia di Bobi', img: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=800&q=80' },
  { cat: 'curiosita', t: '65 milioni di animali domestici in Italia: i numeri che non ti aspetti', img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80' },
  { cat: 'curiosita', t: 'Il gatto piu ricco del mondo ha ereditato 13 milioni di dollari', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80' },
  { cat: 'curiosita', t: 'Greyhound vs Ghepardo: chi vince sulla lunga distanza?', img: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80' },
  { cat: 'comportamento', t: 'Il cane ti fissa negli occhi: non e sfida, e amore (lo dice l ossitocina)', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80' },
  { cat: 'comportamento', t: 'I gatti riconoscono il loro nome: lo studio giapponese che lo dimostra', img: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&q=80' },
  { cat: 'comportamento', t: 'Perche il cane ti segue in bagno: 4 motivi scientifici', img: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=800&q=80' },
  { cat: 'comportamento', t: 'Il gatto porta topi morti in regalo: e un complimento (spiegazione etologica)', img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80' },
  { cat: 'comportamento', t: 'I cani sentono il tuo stress: lo studio che misura il cortisolo', img: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&q=80' },
  { cat: 'salute', t: 'Sterilizzazione del cane: pro, contro e quando farla secondo la scienza', img: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80' },
  { cat: 'salute', t: 'I denti del cane: come pulirli, quando preoccuparsi, cosa non fare', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80' },
  { cat: 'salute', t: 'Allergia al cane: non e il pelo, e una proteina. Come conviverci', img: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&q=80' },
  { cat: 'razze', t: 'Shiba Inu: il cane giapponese che ha conquistato i meme e il cuore di tutti', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80' },
  { cat: 'razze', t: 'Cavalier King Charles: il cane da re che soffre troppo', img: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=800&q=80' },
  { cat: 'razze', t: 'Bassotto: il cane salsiccia con un coraggio da leone', img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&q=80' },
  { cat: 'razze', t: 'Akita Inu: la storia di Hachiko e il cane piu fedele del mondo', img: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800&q=80' },
  { cat: 'razze', t: 'Bengala: il gatto leopardo da appartamento', img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=80' },
  { cat: 'guide', t: 'Microchip obbligatorio: come funziona, quanto costa, cosa rischi senza', img: 'https://images.unsplash.com/photo-1612531386530-97266f6f8cee?w=800&q=80' },
  { cat: 'guide', t: 'Assicurazione per il cane: serve davvero? Confronto polizze 2026', img: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800&q=80' },
  { cat: 'consigli', t: 'Caldo estivo e cani: colpo di calore, sintomi, prevenzione e primo soccorso', img: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80' },
  { cat: 'consigli', t: 'Capodanno con il cane: come gestire la paura dei botti (guida completa)', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80' },
  { cat: 'curiosita', t: 'CBD per animali: funziona davvero? Cosa dice la ricerca veterinaria', img: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&q=80' },
];

async function run() {
  let salvati = 0;
  for (const t of topics) {
    process.stdout.write(t.cat + ': ' + t.t.slice(0, 45) + '... ');
    try {
      const text = await askDS(
        'Sei un giornalista scientifico stile Focus/National Geographic. Scrivi un articolo su: "' + t.t +
        '". Categoria: ' + t.cat +
        '. Regole: 900-1300 parole, tono divulgativo ma rigoroso, cita studi e numeri reali, italiano fluente, struttura con h2, paragrafi max 3 righe, elenchi, grassetto su dati chiave. Chiudi con curiosita bonus e link MifidoDiTe.eu. JSON puro: {"titolo":"...","estratto":"2 frasi max 160 char","contenuto":"HTML con h2 p ul li strong","tempo_lettura":"X min","tags":["tag1"]}'
      );
      let clean = text.replace(/```json\s*/g, '').replace(/```/g, '').trim();
      const art = JSON.parse(clean);
      if (!art.titolo || !art.contenuto) { console.log('skip'); continue; }
      const slug = slugify(art.titolo);
      const ex = await sql`SELECT id FROM articoli WHERE slug = ${slug} LIMIT 1`;
      if (ex.length > 0) { console.log('dup'); continue; }
      await sql`INSERT INTO articoli (titolo, slug, categoria, estratto, contenuto, tempo_lettura, tags, img, pubblicato) VALUES (${art.titolo}, ${slug}, ${t.cat}, ${art.estratto}, ${art.contenuto}, ${art.tempo_lettura || '7 min'}, ${art.tags || []}, ${t.img}, ${true})`;
      salvati++;
      console.log('OK');
    } catch (e) { console.log('ERR'); }
    await new Promise(r => setTimeout(r, 2500));
  }
  const count = await sql`SELECT COUNT(*) as n FROM articoli`;
  const byCat = await sql`SELECT categoria, COUNT(*) as n FROM articoli GROUP BY categoria ORDER BY n DESC`;
  console.log('\nSalvati:', salvati, '| Totale articoli:', count[0].n);
  console.log('Per categoria:');
  byCat.forEach(c => console.log('  ' + c.categoria + ': ' + c.n));
  await sql.end();
}

run();
