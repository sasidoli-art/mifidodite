import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Termini e Condizioni — MifidoDiTe.eu",
  description: "Termini e condizioni di utilizzo del portale MifidoDiTe.eu.",
};

export default function TerminiPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Termini e Condizioni</h1>
          <p className="text-muted-foreground mb-10">Ultimo aggiornamento: 5 aprile 2026</p>

          <div className="prose prose-lg max-w-none text-foreground/80">
            <h2>1. Definizioni</h2>
            <ul>
              <li><strong>&quot;Portale&quot;</strong>: il sito web MifidoDiTe.eu e tutti i servizi ad esso collegati.</li>
              <li><strong>&quot;Titolare&quot;</strong>: il soggetto che gestisce il Portale, contattabile a bau@mifidodite.eu.</li>
              <li><strong>&quot;Utente&quot;</strong>: qualsiasi persona fisica che accede e utilizza il Portale.</li>
              <li><strong>&quot;Professionista&quot;</strong>: persona fisica o giuridica che registra la propria attivita pet sul Portale.</li>
              <li><strong>&quot;Lead&quot;</strong>: richiesta di disponibilita o contatto inviata da un Utente a un Professionista tramite il Portale.</li>
              <li><strong>&quot;Contenuto AI&quot;</strong>: qualsiasi testo, descrizione o comunicazione generata o rielaborata con l&apos;assistenza di sistemi di intelligenza artificiale.</li>
            </ul>

            <h2>2. Oggetto del servizio</h2>
            <p>MifidoDiTe.eu e un portale di intermediazione nel settore degli animali domestici. Il Portale consente agli Utenti di cercare e contattare professionisti del settore pet (pensioni, dog sitter, toelettatori, educatori cinofili, veterinari, hotel pet-friendly, spiagge dog-friendly, ecc.) e ai Professionisti di ricevere visibilita e richieste di contatto.</p>
            <p>Il Portale <strong>non fornisce direttamente servizi pet</strong> e non e parte del rapporto contrattuale tra Utente e Professionista. Non e responsabile della qualita, disponibilita, sicurezza o esecuzione dei servizi offerti dai Professionisti.</p>

            <h2>3. Utilizzo del Portale — Utenti</h2>
            <p>L&apos;accesso al Portale e gratuito. L&apos;utilizzo e riservato a persone maggiorenni (o minorenni con il consenso verificabile di un genitore o tutore). L&apos;Utente si impegna a:</p>
            <ul>
              <li>Fornire informazioni veritiere e complete nelle richieste di disponibilita e nei form di contatto</li>
              <li>Non utilizzare il Portale per scopi illeciti, fraudolenti o contrari al buon costume</li>
              <li>Non inviare spam, contenuti offensivi, diffamatori o discriminatori</li>
              <li>Non tentare di accedere a sezioni riservate del Portale senza autorizzazione</li>
              <li>Rispettare i Professionisti, gli altri Utenti e gli animali</li>
            </ul>

            <h2>4. Registrazione Professionisti</h2>
            <p>I Professionisti possono registrare gratuitamente la propria attivita. Con la registrazione, il Professionista:</p>
            <ul>
              <li>Dichiara che le informazioni fornite sono veritiere, aggiornate e complete</li>
              <li>Autorizza espressamente la pubblicazione del proprio profilo sul Portale, incluse le informazioni di contatto</li>
              <li>Si impegna a rispondere alle richieste ricevute in modo tempestivo e professionale</li>
              <li>Si impegna a rispettare tutte le normative vigenti in materia di servizi pet, igiene, sicurezza e tutela degli animali</li>
              <li>Prende atto che il proprio profilo potrebbe essere arricchito con descrizioni generate dall&apos;AI, chiaramente identificate come tali</li>
            </ul>
            <p>Il Professionista puo richiedere la modifica o la rimozione del proprio profilo in qualsiasi momento scrivendo a <a href="mailto:pro@mifidodite.eu">pro@mifidodite.eu</a>.</p>

            <h2>5. Piani a pagamento</h2>
            <p>Il Portale offre i seguenti piani per i Professionisti:</p>
            <ul>
              <li><strong>Free (gratuito per sempre):</strong> profilo base, 1 foto, visibilita nei risultati di ricerca. L&apos;Utente puo visualizzare il numero di lead ricevuti ma non i dettagli di contatto.</li>
              <li><strong>Pro (19,90 euro/mese):</strong> accesso completo ai lead (nome, email, telefono), fino a 10 foto, badge &quot;Verificato&quot;, statistiche visite e lead, descrizione professionale AI.</li>
              <li><strong>Top (24,90 euro/mese):</strong> tutto del piano Pro piu: foto illimitate, mini-sito personale, evidenza nei risultati e nella homepage, inclusione nella newsletter settimanale, upload certificati, report mensile.</li>
            </ul>
            <p>I pagamenti sono gestiti tramite piattaforme terze sicure e conformi PCI-DSS. L&apos;abbonamento si rinnova automaticamente ogni mese salvo disdetta. La disdetta puo essere effettuata in qualsiasi momento e ha effetto dalla fine del periodo gia pagato. Non sono previsti rimborsi per periodi parziali. I piani Pro e Top prevedono 14 giorni di prova gratuita.</p>

            <h2>6. Annunci di adozione e SOS Smarriti</h2>
            <p>Il Portale consente la pubblicazione di annunci di adozione animali e segnalazioni di smarrimento. L&apos;Utente che pubblica un annuncio:</p>
            <ul>
              <li>Dichiara che le informazioni fornite sono veritiere</li>
              <li>Autorizza espressamente la pubblicazione dell&apos;annuncio e dei propri dati di contatto (nome, telefono)</li>
              <li>Prende atto che i dati saranno visibili pubblicamente</li>
              <li>Puo richiedere la rimozione dell&apos;annuncio in qualsiasi momento</li>
            </ul>
            <p>Gli annunci sono soggetti a moderazione e possono essere rimossi se non conformi. Gli annunci scadono automaticamente dopo 60 giorni dalla pubblicazione. Il Portale non e responsabile per la veridicita degli annunci ne per l&apos;esito delle adozioni.</p>

            <h2>7. Recensioni</h2>
            <p>Gli Utenti possono lasciare recensioni sui Professionisti. Le recensioni devono:</p>
            <ul>
              <li>Essere basate su esperienze reali e personali</li>
              <li>Non contenere linguaggio offensivo, diffamatorio, discriminatorio o minaccioso</li>
              <li>Non contenere dati personali di terzi senza il loro consenso</li>
              <li>Non essere commissionate, incentivate o false</li>
            </ul>
            <p>Il Portale si riserva il diritto di rimuovere recensioni non conformi entro 48 ore dalla segnalazione. I Professionisti possono segnalare recensioni inappropriate tramite il pannello di gestione o scrivendo a <a href="mailto:bau@mifidodite.eu">bau@mifidodite.eu</a>.</p>

            <h2>8. Limitazione di responsabilita</h2>
            <p>Il Portale agisce esclusivamente come intermediario e non e responsabile per:</p>
            <ul>
              <li>La qualita, sicurezza, legalita o conformita dei servizi offerti dai Professionisti</li>
              <li>La veridicita, completezza o aggiornamento delle informazioni fornite dai Professionisti o dagli Utenti</li>
              <li>Danni diretti, indiretti, incidentali o consequenziali derivanti dall&apos;utilizzo del Portale</li>
              <li>Danni derivanti dai servizi dei Professionisti o dalle adozioni</li>
              <li>Interruzioni temporanee del servizio per manutenzione, aggiornamenti o cause di forza maggiore</li>
              <li>Inesattezze nei contenuti generati dall&apos;AI</li>
            </ul>

            <h2>9. Proprieta intellettuale</h2>
            <p>Tutti i contenuti del Portale (testi, grafica, logo, codice sorgente, database) sono di proprieta esclusiva di MifidoDiTe.eu o utilizzati su licenza. E vietata la riproduzione, distribuzione o modifica non autorizzata. I Professionisti mantengono la proprieta dei contenuti (foto, descrizioni originali) da loro caricati sul proprio profilo.</p>

            <h2>10. Raccolta dati da fonti pubbliche (Scraping)</h2>
            <p>Il Portale raccoglie informazioni pubblicamente disponibili su professionisti del settore pet da fonti pubbliche (siti web, pagine social, directory online, Google Maps). Queste informazioni vengono utilizzate per creare profili base che i Professionisti possono reclamare, verificare e completare.</p>
            <p>I profili importati automaticamente sono chiaramente contrassegnati come tali. Qualsiasi Professionista puo richiedere la rimozione del proprio profilo scrivendo a <a href="mailto:bau@mifidodite.eu">bau@mifidodite.eu</a>. La rimozione avviene entro 48 ore lavorative dalla richiesta.</p>

            <h2>11. Intelligenza Artificiale</h2>
            <p>Il Portale utilizza sistemi di intelligenza artificiale (AI) per le seguenti finalita:</p>
            <ul>
              <li><strong>Contenuti editoriali:</strong> gli articoli del magazine possono essere generati o rielaborati con l&apos;assistenza dell&apos;AI. Ogni articolo riporta una nota di trasparenza.</li>
              <li><strong>Descrizioni strutture:</strong> le descrizioni emozionali delle strutture pet possono essere create dall&apos;AI a partire da informazioni pubbliche. Le descrizioni AI sono identificate come tali.</li>
              <li><strong>Comunicazioni automatiche:</strong> alcune email (inviti ai professionisti) sono generate automaticamente dall&apos;AI. Ogni email contiene una disclosure di trasparenza.</li>
              <li><strong>Analisi dati:</strong> l&apos;AI analizza e struttura informazioni raccolte da fonti pubbliche per creare profili e contenuti.</li>
            </ul>
            <p>Ai sensi del Regolamento UE 2024/1689 (AI Act), il Portale si impegna alla massima trasparenza sull&apos;utilizzo di sistemi AI. L&apos;AI non viene utilizzata per prendere decisioni automatizzate che producono effetti giuridici sugli utenti. I contenuti generati dall&apos;AI possono contenere inesattezze e non sostituiscono il parere di un professionista.</p>

            <h2>12. Diritto di recesso</h2>
            <p>Per i piani a pagamento, il Professionista-consumatore ha diritto di recedere entro 14 giorni dalla sottoscrizione ai sensi del D.Lgs. 206/2005 (Codice del Consumo), senza necessita di indicarne le ragioni. Per esercitare il recesso, inviare comunicazione a <a href="mailto:pro@mifidodite.eu">pro@mifidodite.eu</a>. Il rimborso sara effettuato entro 14 giorni dal ricevimento della comunicazione.</p>

            <h2>13. Legge applicabile e foro competente</h2>
            <p>I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia e competente in via esclusiva il Foro del luogo di residenza o domicilio del consumatore, ai sensi dell&apos;art. 33 del D.Lgs. 206/2005 (Codice del Consumo). Per i Professionisti non consumatori, e competente il Foro di competenza del Titolare.</p>

            <h2>14. Modifiche ai Termini</h2>
            <p>Il Titolare si riserva il diritto di modificare i presenti Termini in qualsiasi momento. Le modifiche sostanziali saranno comunicate via email agli utenti registrati con almeno 15 giorni di preavviso e pubblicate su questa pagina con indicazione della data di ultimo aggiornamento. L&apos;utilizzo continuato del Portale dopo la notifica costituisce accettazione dei Termini modificati.</p>

            <h2>15. Contatti</h2>
            <p>
              Per domande sui Termini e Condizioni:<br />
              Email: <a href="mailto:bau@mifidodite.eu">bau@mifidodite.eu</a><br />
              Per i professionisti: <a href="mailto:pro@mifidodite.eu">pro@mifidodite.eu</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
