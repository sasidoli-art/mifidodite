import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PrintButton } from "./PrintButton";
import { breadcrumbJsonLd, newsArticleJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Guida Pratica Viaggio con il Cane in Italia 2026 — Scarica gratis | MifidoDiTe.eu",
  description: "Guida completa al viaggio con il cane in Italia: documenti, trasporti, spiagge, hotel, ristoranti, ordinanze regionali. 20 pagine, scaricabile come PDF.",
  keywords: ["guida viaggio cane italia", "pdf cane viaggio", "guida pratica cani", "vacanze cane 2026"],
  alternates: { canonical: "https://www.mifidodite.eu/guida-viaggio-cane-italia-2026" },
  openGraph: {
    type: "article",
    title: "Guida Pratica Viaggio con il Cane in Italia 2026",
    description: "20 pagine di consigli pratici, ordinanze regionali e checklist. Scaricabile come PDF.",
    url: "https://www.mifidodite.eu/guida-viaggio-cane-italia-2026",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
    images: [{ url: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function GuidaViaggioCaneItalia2026() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 print:pt-0">
        <div className="bg-gradient-to-b from-primary/10 to-transparent border-b border-border print:hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ name: "Guida Viaggio Cane Italia 2026", url: "/guida-viaggio-cane-italia-2026" }]} />
            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Guida Pratica al Viaggio con il Cane in Italia 2026</h1>
                <p className="text-muted-foreground mt-2">20 pagine, ordinanze aggiornate, checklist, consigli regione per regione.</p>
              </div>
              <PrintButton />
            </div>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 print:py-4 print:px-0 print:max-w-none">
          {/* PDF Cover */}
          <section className="text-center mb-16 print:mb-12 print:break-after-page">
            <p className="text-sm uppercase tracking-wider text-primary font-bold mb-4">MifidoDiTe.eu — Edizione 2026</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 print:hidden">Guida Pratica al Viaggio con il Cane in Italia</h1>
            <h2 className="hidden print:block text-5xl font-extrabold text-foreground mb-6">Guida Pratica al Viaggio con il Cane in Italia 2026</h2>
            <p className="text-xl text-muted-foreground mb-8">Documenti, trasporti, spiagge, hotel, ristoranti, ordinanze regionali. La guida verificata dal team MifidoDiTe.</p>
            <div className="text-sm text-muted-foreground">
              <p>Pubblicazione: giugno 2026 · Versione 1.0</p>
              <p>www.mifidodite.eu · redazione pet italiana</p>
            </div>
          </section>

          {/* Sezione 1: Documenti */}
          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">1. Documenti obbligatori in Italia</h2>
            <ul className="space-y-3 text-foreground/85">
              <li><strong>Microchip</strong>: obbligatorio dal 1° gennaio 1994. Codice ISO 15 cifre.</li>
              <li><strong>Iscrizione anagrafe canina</strong>: registrato presso ASL della residenza entro 60 giorni dall'adozione.</li>
              <li><strong>Libretto sanitario</strong>: vaccinazioni e sverminazioni aggiornate.</li>
              <li><strong>Passaporto europeo</strong>: per viaggi all'estero (incluso paesi UE). Rilasciato dal veterinario. Include vaccinazione antirabbica valida (almeno 21 giorni prima).</li>
              <li><strong>Antirabbica</strong>: obbligatoria per cani da caccia e per attraversamento confini. Validità 3 anni in Italia.</li>
            </ul>
          </section>

          {/* Sezione 2: Trasporti */}
          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">2. Trasporti pubblici</h2>

            <h3 className="text-lg font-semibold mt-4 mb-2">Treno (Trenitalia, Italo, regionali)</h3>
            <ul className="space-y-2 text-foreground/85 text-sm">
              <li>Cani piccoli (fino 10 kg) in trasportino: <strong>gratis</strong>.</li>
              <li>Cani medi/grandi: biglietto al 50% della tariffa "intera". Museruola obbligatoria, guinzaglio max 1,5m.</li>
              <li>Frecciarossa: cani grandi solo in 1° classe e Executive.</li>
              <li>Italo: cani grandi solo Smart, Comfort, Prima. Vagone "Smart Mode" senza cani.</li>
              <li>Cani guida per non vedenti: sempre gratis, ovunque.</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">Auto (Codice della Strada art. 169)</h3>
            <ul className="space-y-2 text-foreground/85 text-sm">
              <li>Trasportino omologato, oppure griglia divisoria/rete tra abitacolo e zona cane, oppure cintura per cani.</li>
              <li>Multa per trasporto irregolare: 87-348 euro + 1 punto patente.</li>
              <li><strong>Mai lasciare il cane in auto al sole</strong>: art. 727 c.p., fino a 1 anno carcere + 10.000 euro multa.</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">Aereo</h3>
            <ul className="space-y-2 text-foreground/85 text-sm">
              <li>Cabina: fino a 8 kg (cane + trasportino). 50-75 euro nazionale, fino a 300 euro intercontinentale.</li>
              <li>Stiva: cani grandi in kennel IATA. 75-400 euro a seconda della tratta.</li>
              <li>Ryanair NON accetta cani (tranne cani guida).</li>
              <li>Prenota minimo 72 ore prima e conferma.</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">Traghetti</h3>
            <ul className="space-y-2 text-foreground/85 text-sm">
              <li>Tirrenia, Moby, GNV: cani in cabina con supplemento o nei box-canile.</li>
              <li>Cani piccoli: spesso ammessi gratis al guinzaglio nei ponti.</li>
              <li>Verifica policy specifica per ogni compagnia e rotta.</li>
            </ul>
          </section>

          {/* Sezione 3: Spiagge */}
          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">3. Spiagge — regole generali</h2>
            <p className="text-foreground/85 mb-3">In Italia non esiste una legge nazionale sui cani in spiaggia: ogni Comune emette la propria ordinanza balneare, valida da maggio a settembre.</p>
            <ul className="space-y-2 text-foreground/85">
              <li><strong>Spiagge libere</strong>: cani ammessi quasi ovunque al guinzaglio, con sacchetti per pulizia. Museruola da portare con sé.</li>
              <li><strong>Spiagge attrezzate</strong>: dipende dal gestore. Esistono Bau Beach certificate.</li>
              <li><strong>Aree protette</strong>: spesso vietate (es. Sabaudia parco, alcune AMP).</li>
              <li><strong>Orari</strong>: fascia sicura quasi ovunque: prima delle 9 e dopo le 19.</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">Regioni più permissive (consigliate)</h3>
            <p className="text-foreground/85 text-sm">Emilia-Romagna (Riviera Bau Beach), Marche (Senigallia), Abruzzo (Costa dei Trabocchi), Friuli (Lignano), Puglia (Salento), Calabria (Ionio).</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Regioni con ordinanze restrittive</h3>
            <p className="text-foreground/85 text-sm">Liguria (molti Comuni), Toscana Versilia, Sardegna (La Pelosa vieta totalmente), Campania (Costiera Amalfitana limitata), Capri (museruola obbligatoria).</p>
          </section>

          {/* Sezione 4: Hotel */}
          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">4. Hotel e strutture ricettive</h2>
            <ul className="space-y-2 text-foreground/85">
              <li><strong>Pet-friendly</strong>: termine senza standard legale. Verifica sempre policy specifica.</li>
              <li><strong>Supplemento</strong>: comune. Da gratis a 20 euro/notte, alcuni resort lusso 50+ euro.</li>
              <li><strong>Camera con uscita giardino</strong>: chiedi sempre. Comoda per pipi notturne.</li>
              <li><strong>Cani lasciati soli in camera</strong>: spesso vietato. Verifica.</li>
              <li><strong>Pasti</strong>: dehors quasi sempre OK, sale interne dipendono.</li>
              <li><strong>Piscine</strong>: cani quasi sempre vietati. Eccezioni in alcuni resort dedicati.</li>
              <li><strong>Spa wellness</strong>: vietato.</li>
              <li><strong>Agriturismo</strong>: in genere più aperti dei resort. Spazio all'aperto incluso.</li>
            </ul>
          </section>

          {/* Sezione 5: Ristoranti */}
          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">5. Ristoranti</h2>
            <p className="text-foreground/85 mb-3">Non esiste un divieto nazionale ai cani nei ristoranti. La regolamentazione (Reg. CE 852/2004) richiede solo che gli alimenti siano protetti.</p>
            <ul className="space-y-2 text-foreground/85">
              <li><strong>Dehors</strong>: ammessi quasi ovunque al guinzaglio.</li>
              <li><strong>Sale interne</strong>: discrezione del titolare. Sempre più ristoranti aprono ai cani.</li>
              <li><strong>Galateo</strong>: cane sotto il tavolo, calmo, non sui tavoli o sedie, non rumoroso.</li>
              <li><strong>Acqua</strong>: portala tu in ciotola pieghevole, non aspettare di chiedere.</li>
              <li><strong>Snack appartati</strong>: pasti pre-passeggiata, snack masticabili durante.</li>
            </ul>
          </section>

          {/* Sezione 6: Sentieri */}
          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">6. Sentieri e parchi nazionali</h2>
            <ul className="space-y-2 text-foreground/85">
              <li><strong>Sentieri CAI</strong>: cani al guinzaglio quasi ovunque, museruola facoltativa.</li>
              <li><strong>Parchi nazionali</strong>: guinzaglio obbligatorio sempre (Gran Sasso, Sila, Pollino, Stelvio, ecc.).</li>
              <li><strong>Riserve naturali</strong>: spesso vietato, verifica.</li>
              <li><strong>Aree pic-nic</strong>: cani ammessi al guinzaglio, raccogli sempre.</li>
              <li><strong>Forasacchi</strong>: rischio enorme maggio-settembre. Controlla orecchie, occhi, zampe dopo ogni passeggiata.</li>
              <li><strong>Vipere</strong>: presenti in tutta Italia tranne Sardegna. Antidoto in veterinaria, kit primo soccorso per uscite lontane.</li>
            </ul>
          </section>

          {/* Sezione 7: Alimentazione in viaggio */}
          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">7. Alimentazione in viaggio</h2>
            <ul className="space-y-2 text-foreground/85">
              <li><strong>Stesse crocchette di casa</strong>: porta sufficienti per tutto il viaggio. Mai cambi improvvisi.</li>
              <li><strong>Ciotola pieghevole</strong>: utile per soste e ristoranti.</li>
              <li><strong>Acqua</strong>: 50-100 ml per kg di peso al giorno. Più con caldo.</li>
              <li><strong>Pasti distanziati dai viaggi</strong>: almeno 2 ore prima per evitare vomito.</li>
              <li><strong>Snack masticabili</strong>: lunghi viaggi, distraggono e calmano.</li>
              <li><strong>Vietati</strong>: cioccolato, uva, cipolla, aglio, xilitolo, ossa cotte. Mai dargli avanzi.</li>
            </ul>
          </section>

          {/* Sezione 8: Salute in viaggio */}
          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">8. Kit di primo soccorso per il viaggio</h2>
            <ul className="space-y-2 text-foreground/85">
              <li>Garze sterili, cerotti elastici</li>
              <li>Disinfettante (clorexidina, no alcol)</li>
              <li>Pinzetta a punte arrotondate (forasacchi)</li>
              <li>Termometro rettale</li>
              <li>Antiparassitario d'emergenza</li>
              <li>Crocchette di prove (se vomito intestinale)</li>
              <li>Sieri reidratanti</li>
              <li>Numero veterinario di casa + 2 veterinari nella zona di destinazione</li>
              <li>Carta sanitaria con allergie e farmaci abituali</li>
              <li>Snack di emergenza (zucchero per ipoglicemie)</li>
            </ul>
          </section>

          {/* Sezione 9: Emergenze */}
          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">9. Emergenze: cosa fare</h2>

            <h3 className="text-lg font-semibold mt-4 mb-2">Colpo di calore</h3>
            <p className="text-foreground/85 text-sm">Sposta all'ombra, bagna pancia/zampe/inguine con acqua fresca (NON gelata), ventilatore. Veterinario subito se non recupera in 15 minuti.</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Cane scappato</h3>
            <p className="text-foreground/85 text-sm">Microchip aggiornato indispensabile. Chiama 112 + ASL veterinaria locale. Segnala su <strong>MifidoDiTe.eu sezione SOS Smarriti</strong>.</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Morso di vipera</h3>
            <p className="text-foreground/85 text-sm">Immobilizza zona morsa, NON sucare, NON applicare ghiaccio. Veterinario entro 1 ora per antidoto.</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Forasacchio in orecchio/naso</h3>
            <p className="text-foreground/85 text-sm">NON cercare di estrarre con dita. Veterinario subito.</p>
          </section>

          {/* Sezione 10: Checklist partenza */}
          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">10. Checklist partenza</h2>
            <p className="text-foreground/85 mb-3">Da spuntare la sera prima:</p>
            <ul className="space-y-2 text-foreground/85">
              <li>☐ Documenti (microchip aggiornato, libretto sanitario, passaporto se necessario)</li>
              <li>☐ Crocchette + ciotole + acqua</li>
              <li>☐ Trasportino omologato per auto/treno/aereo</li>
              <li>☐ Pettorina + guinzaglio + museruola</li>
              <li>☐ Kit primo soccorso</li>
              <li>☐ Antiparassitari aggiornati</li>
              <li>☐ Sacchetti per pulizia (doppia dose)</li>
              <li>☐ Asciugamano dedicato</li>
              <li>☐ Giochi e oggetto profumato di casa</li>
              <li>☐ Numeri veterinario casa + veterinari destinazione</li>
              <li>☐ Prenotazione hotel pet-friendly confermata</li>
              <li>☐ Ricarica del telefono e Powerbank</li>
            </ul>
          </section>

          {/* Footer pdf */}
          <section className="mt-16 pt-8 border-t border-border text-center print:mt-12 print:break-before-page">
            <p className="text-sm text-muted-foreground mb-2">Questa guida è frutto del lavoro del team editoriale MifidoDiTe.</p>
            <p className="text-sm text-muted-foreground mb-4">Per aggiornamenti, suggerimenti, segnalazioni: <strong>info@mifidodite.eu</strong></p>
            <p className="text-xs text-muted-foreground">© 2026 MifidoDiTe.eu — Portale pet-friendly italiano</p>
            <p className="text-xs text-muted-foreground mt-2">Versione 1.0 — Giugno 2026 — www.mifidodite.eu</p>
          </section>

          <div className="mt-12 print:hidden bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Salva o stampa questa guida</h3>
            <p className="text-muted-foreground mb-4">Clicca sul pulsante in alto per salvarla come PDF, oppure usa Cmd+P (Mac) / Ctrl+P (Windows).</p>
            <PrintButton />
          </div>
        </article>

        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Guida Viaggio Cane Italia 2026", url: "/guida-viaggio-cane-italia-2026" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsArticleJsonLd({ titolo: "Guida Pratica al Viaggio con il Cane in Italia 2026", descrizione: "Guida completa al viaggio con il cane in Italia: documenti, trasporti, spiagge, hotel, ristoranti, ordinanze regionali. Scaricabile come PDF.", slug: "guida-viaggio-cane-italia-2026", regione: "Italia", img: "https://images.unsplash.com/photo-1552832860-cfcddd32af19?w=1200&q=80", datePublished: "2026-06-03", autoreName: "MifidoDiTe Team" }))} />
      </main>
      <Footer />
    </>
  );
}
