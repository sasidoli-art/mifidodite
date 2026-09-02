// Sequenza welcome 5 email per nuovi iscritti newsletter MifidoDiTe.eu
// Da inviare via Brevo o Nodemailer dopo la conferma di iscrizione.
// Timing consigliato: email 1 immediata, 2 dopo 2gg, 3 dopo 5gg, 4 dopo 9gg, 5 dopo 14gg

export interface EmailWelcome {
  /** Giorno della sequenza (0 = immediato) */
  giorno: number;
  /** Subject email */
  subject: string;
  /** Anteprima nel client email (50-90 char) */
  preheader: string;
  /** Body HTML (utilizza tag base, no CSS complessi per compatibilita') */
  html: string;
  /** Body plain text di fallback */
  text: string;
}

const baseUrl = "https://www.mifidodite.eu";

export const WELCOME_SEQUENCE: EmailWelcome[] = [
  {
    giorno: 0,
    subject: "Benvenuto in MifidoDiTe! Ecco cosa trovi qui (e cosa NON troverai)",
    preheader: "Una redazione vera, niente recensioni inventate, solo verifiche dirette.",
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1f2937; line-height: 1.6;">
  <h1 style="color: #ea580c; font-size: 24px; margin-bottom: 16px;">Benvenuto a MifidoDiTe.eu</h1>
  <p>Ciao,</p>
  <p>Grazie per esserti iscritto. Siamo una piccola redazione pet indipendente che lavora a un portale per proprietari di cani e gatti in Italia. Niente algoritmi che ti riempiono di pubblicita', niente recensioni inventate.</p>
  <p><strong>Cosa trovi su MifidoDiTe.eu:</strong></p>
  <ul>
    <li>77 spiagge dog-friendly verificate, regione per regione</li>
    <li>89 strutture pet-friendly con ordinanze 2026</li>
    <li>38 ristoranti che accolgono cani</li>
    <li>26 sentieri segnati e percorribili con il cane</li>
    <li>20 schede razze, articoli sul comportamento e la salute</li>
    <li>SOS Smarriti — la mappa nazionale dei cani persi</li>
  </ul>
  <p><strong>Cosa NON troverai:</strong> recensioni a pagamento, ratings inventati, falsi testimonial. Tutto e' verificato a mano dal nostro team.</p>
  <p>Inizia da qui: <a href="${baseUrl}/guida-viaggio-cane-italia-2026" style="color: #ea580c; font-weight: 600;">la nostra Guida Pratica al Viaggio con il Cane in Italia 2026</a> (gratis, 20 pagine scaricabili come PDF).</p>
  <p>A presto,<br>Il team MifidoDiTe</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
  <p style="font-size: 12px; color: #6b7280;">Ricevi questa email perche' ti sei iscritto alla newsletter di MifidoDiTe.eu. <a href="${baseUrl}/unsubscribe" style="color: #6b7280;">Disiscriviti</a> in un click.</p>
</div>`,
    text: `Benvenuto a MifidoDiTe.eu

Ciao,

Grazie per esserti iscritto. Siamo una piccola redazione pet indipendente che lavora a un portale per proprietari di cani e gatti in Italia.

Cosa trovi su MifidoDiTe.eu:
- 77 spiagge dog-friendly verificate
- 89 strutture pet-friendly con ordinanze 2026
- 38 ristoranti che accolgono cani
- 26 sentieri segnati con cane
- 20 schede razze, articoli su comportamento e salute
- SOS Smarriti

Inizia da qui: ${baseUrl}/guida-viaggio-cane-italia-2026

A presto,
Il team MifidoDiTe

---
Disiscriviti: ${baseUrl}/unsubscribe`,
  },
  {
    giorno: 2,
    subject: "Le 10 spiagge dog-friendly piu' belle d'Italia (la nostra selezione)",
    preheader: "Dalle Bau Beach romagnole al Salento, abbiamo verificato spiaggia per spiaggia.",
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1f2937; line-height: 1.6;">
  <h1 style="color: #ea580c; font-size: 24px; margin-bottom: 16px;">Le 10 spiagge dog-friendly piu' belle d'Italia</h1>
  <p>Negli ultimi mesi abbiamo mappato 77 spiagge dog-friendly in Italia. Ecco i nostri top 10, regione per regione:</p>
  <ol>
    <li><strong>Cervia "No Problem Beach"</strong> (Emilia-Romagna) — la prima Bau Beach d'Italia</li>
    <li><strong>Lido Riccio Ortona</strong> (Abruzzo) — costa dei Trabocchi</li>
    <li><strong>Pescoluse</strong> (Puglia) — "Maldive del Salento"</li>
    <li><strong>Marina di Cecina Bau Park</strong> (Toscana) — pineta a ridosso</li>
    <li><strong>Marina di Camerota</strong> (Campania) — Cilento selvaggio</li>
    <li><strong>Lignano Bau Beach</strong> (Friuli) — organizzazione austriaca</li>
    <li><strong>Tropea spiaggia est</strong> (Calabria) — sabbia bianca, mare turchese</li>
    <li><strong>Senigallia "Spiaggia di Velluto"</strong> (Marche) — sabbia fine</li>
    <li><strong>Procida Pozzo Vecchio</strong> (Campania) — isola cane-friendly</li>
    <li><strong>Mondello zona libera</strong> (Sicilia) — Palermo affacciata sul mare</li>
  </ol>
  <p><a href="${baseUrl}/spiagge" style="color: #ea580c; font-weight: 600;">Vedi tutte le 77 spiagge verificate</a> con ordinanze 2026 aggiornate.</p>
  <p>Una domanda: <strong>su quale costa stai pensando per le prossime vacanze?</strong> Rispondi a questa email, lo leggiamo davvero.</p>
  <p>A presto,<br>Il team MifidoDiTe</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
  <p style="font-size: 12px; color: #6b7280;"><a href="${baseUrl}/unsubscribe" style="color: #6b7280;">Disiscriviti</a></p>
</div>`,
    text: `Le 10 spiagge dog-friendly piu' belle d'Italia

Negli ultimi mesi abbiamo mappato 77 spiagge dog-friendly in Italia. Ecco i nostri top 10:

1. Cervia "No Problem Beach" (Emilia-Romagna)
2. Lido Riccio Ortona (Abruzzo)
3. Pescoluse (Puglia)
4. Marina di Cecina Bau Park (Toscana)
5. Marina di Camerota (Campania)
6. Lignano Bau Beach (Friuli)
7. Tropea (Calabria)
8. Senigallia (Marche)
9. Procida Pozzo Vecchio (Campania)
10. Mondello (Sicilia)

Tutte le 77 spiagge: ${baseUrl}/spiagge

Su quale costa stai pensando per le prossime vacanze? Rispondi a questa email.

A presto,
Il team MifidoDiTe`,
  },
  {
    giorno: 5,
    subject: "Strutture pet-friendly: cosa cercare prima di prenotare",
    preheader: "Le 5 cose da chiedere a un hotel prima di scegliere, per evitare brutte sorprese.",
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1f2937; line-height: 1.6;">
  <h1 style="color: #ea580c; font-size: 24px; margin-bottom: 16px;">Hotel pet-friendly: cosa chiedere prima di prenotare</h1>
  <p>"Pet-friendly" non e' uno standard. E' una parola di marketing. Da hotel a hotel cambia tutto. Ecco le 5 domande da fare prima di prenotare:</p>
  <ol>
    <li><strong>"Posso lasciare il cane in camera da solo?"</strong> Spesso vietato. Importante se vuoi cenare fuori senza il cane.</li>
    <li><strong>"C'e' uscita diretta sul giardino?"</strong> Comoda per pipi notturne, evita ascensori con altri ospiti.</li>
    <li><strong>"Quanto e' il supplemento?"</strong> Da 0 a 50+ euro/notte. Chiedi in chiaro.</li>
    <li><strong>"Il cane puo' venire al ristorante interno o solo nei dehors?"</strong> Cambia molto in casi di pioggia.</li>
    <li><strong>"Ci sono cani altri ospiti?"</strong> Importante se il tuo cane e' reattivo con altri cani.</li>
  </ol>
  <p>Abbiamo selezionato 89 strutture pet-friendly verificate, con risposta concreta a queste domande nella scheda di ogni hotel.</p>
  <p><a href="${baseUrl}/vacanze" style="color: #ea580c; font-weight: 600;">Esplora le 89 strutture verificate</a> con guide regionali per Lazio, Toscana, Sardegna e altre 17 regioni.</p>
  <p>A presto,<br>Il team MifidoDiTe</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
  <p style="font-size: 12px; color: #6b7280;"><a href="${baseUrl}/unsubscribe" style="color: #6b7280;">Disiscriviti</a></p>
</div>`,
    text: `Hotel pet-friendly: cosa chiedere prima di prenotare

"Pet-friendly" non e' uno standard. Cambia tutto da hotel a hotel.

Le 5 domande da fare prima di prenotare:
1. Posso lasciare il cane in camera da solo?
2. C'e' uscita diretta sul giardino?
3. Quanto e' il supplemento?
4. Cane al ristorante interno o solo dehors?
5. Ci sono altri cani?

89 strutture verificate: ${baseUrl}/vacanze

A presto,
Il team MifidoDiTe`,
  },
  {
    giorno: 9,
    subject: "Conosci la tua razza? Le 5 cose che molti proprietari ignorano",
    preheader: "Anche se conosci il tuo cane da anni, ci sono dettagli che cambiano tutto.",
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1f2937; line-height: 1.6;">
  <h1 style="color: #ea580c; font-size: 24px; margin-bottom: 16px;">5 cose della tua razza che forse non sai</h1>
  <p>Abbiamo scritto 20 schede razza dettagliate, e in ogni scheda ci sono dettagli che cambiano la vita del cane:</p>
  <ul>
    <li><strong>Bulldog Francese</strong>: sotto i 25°C non puo' esercitarsi a lungo, rischio colpo di calore mortale.</li>
    <li><strong>Cavalier King</strong>: il 50% sviluppa MVD (malattia cardiaca) entro i 5 anni. Ecocardio annuale dai 5 anni.</li>
    <li><strong>Border Collie</strong>: ha bisogno di 3-4 ore di attivita' al giorno. Se non le ricevi, sviluppa OCD (comportamenti compulsivi).</li>
    <li><strong>Bassotto</strong>: niente salti dal divano, mai. Schiena fragilissima, IVDD frequente.</li>
    <li><strong>Pastore Tedesco</strong>: torsione gastrica e' la causa di morte improvvisa piu' frequente. Mai esercizio dopo pasti abbondanti.</li>
  </ul>
  <p><a href="${baseUrl}/razze" style="color: #ea580c; font-weight: 600;">Trova la scheda della tua razza</a> — abbiamo coperto Labrador, Pastore Tedesco, Chihuahua, Jack Russell, Beagle, Cane Corso e altre 14.</p>
  <p>P.S. Se hai un meticcio, abbiamo una scheda anche per il meticcio: forse la piu' importante di tutte.</p>
  <p>A presto,<br>Il team MifidoDiTe</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
  <p style="font-size: 12px; color: #6b7280;"><a href="${baseUrl}/unsubscribe" style="color: #6b7280;">Disiscriviti</a></p>
</div>`,
    text: `5 cose della tua razza che forse non sai

- Bulldog Francese: sotto i 25°C niente esercizio
- Cavalier King: 50% sviluppa MVD entro 5 anni
- Border Collie: 3-4 ore attivita' al giorno
- Bassotto: niente salti dal divano
- Pastore Tedesco: torsione gastrica e' la causa morte improvvisa

Tutte le schede razza: ${baseUrl}/razze

A presto,
Il team MifidoDiTe`,
  },
  {
    giorno: 14,
    subject: "Ultima email della sequenza: come continueremo (e cosa ci aiuti a fare)",
    preheader: "Le tue prossime email saranno tematiche, ogni 2-3 settimane. Senza spam.",
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1f2937; line-height: 1.6;">
  <h1 style="color: #ea580c; font-size: 24px; margin-bottom: 16px;">Ci siamo conosciuti. Cosa succede adesso</h1>
  <p>Hai ricevuto 5 email da noi nelle ultime 2 settimane. Da qui in poi le email saranno meno frequenti: 1-2 al mese, sempre tematiche.</p>
  <p><strong>Cosa puoi aspettarti:</strong></p>
  <ul>
    <li>Nuove guide regionali quando le pubblichiamo</li>
    <li>Articoli stagionali (estate spiagge, autunno funghi, inverno freddo)</li>
    <li>SOS smarriti della tua zona (se ci hai detto la provincia)</li>
    <li>Eventi pet-friendly nelle tue vicinanze</li>
  </ul>
  <p><strong>Come puoi aiutarci:</strong></p>
  <ul>
    <li>Segnala una struttura pet-friendly che conosci scrivendoci a <a href="mailto:info@mifidodite.eu" style="color: #ea580c;">info@mifidodite.eu</a></li>
    <li>Suggerisci un argomento per i nostri articoli: rispondi a questa email</li>
    <li>Se ci trovi utili, condividi il sito con un amico che ha un cane</li>
  </ul>
  <p>Siamo piccoli e indipendenti. Ogni iscritto fa la differenza per noi.</p>
  <p>Grazie ancora,<br>Il team MifidoDiTe</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
  <p style="font-size: 12px; color: #6b7280;"><a href="${baseUrl}/unsubscribe" style="color: #6b7280;">Disiscriviti</a> in qualsiasi momento.</p>
</div>`,
    text: `Ci siamo conosciuti. Cosa succede adesso

Le prossime email saranno tematiche, 1-2 al mese.

Cosa puoi aspettarti:
- Nuove guide regionali
- Articoli stagionali
- SOS smarriti zona tua
- Eventi pet-friendly

Come puoi aiutarci:
- Segnala strutture: ${baseUrl}/registra-attivita
- Suggerisci argomenti: rispondi a questa email
- Condividi il sito con amici

Grazie,
Il team MifidoDiTe`,
  },
];
