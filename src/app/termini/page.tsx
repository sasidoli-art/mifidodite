import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Termini di Servizio — MifidoDiTe.eu",
  description: "Termini e condizioni di utilizzo del portale MifidoDiTe.eu.",
};

export default function TerminiPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Termini di Servizio</h1>
          <p className="text-muted-foreground mb-10">Ultimo aggiornamento: Aprile 2026</p>

          <div className="prose prose-lg max-w-none text-foreground/80">
            <h2>1. Definizioni</h2>
            <ul>
              <li><strong>"Portale"</strong>: il sito web MifidoDiTe.eu e tutti i servizi ad esso collegati.</li>
              <li><strong>"Utente"</strong>: qualsiasi persona che accede al Portale.</li>
              <li><strong>"Professionista"</strong>: persona fisica o giuridica che registra la propria attivita sul Portale.</li>
              <li><strong>"Lead"</strong>: richiesta di disponibilita inviata da un Utente a un Professionista tramite il Portale.</li>
            </ul>

            <h2>2. Oggetto del servizio</h2>
            <p>MifidoDiTe.eu e un portale di intermediazione che consente agli Utenti di cercare e contattare professionisti del settore pet (pensioni, dog sitter, toelettatori, veterinari, spiagge dog-friendly, ecc.) e ai Professionisti di ricevere visibilita e richieste di contatto.</p>
            <p>Il Portale <strong>non fornisce direttamente servizi pet</strong> e non e responsabile della qualita, disponibilita o esecuzione dei servizi offerti dai Professionisti.</p>

            <h2>3. Utilizzo del Portale</h2>
            <p>L'accesso al Portale e gratuito per gli Utenti. L'utilizzo e consentito a persone maggiorenni o minorenni con il consenso dei genitori. L'Utente si impegna a:</p>
            <ul>
              <li>Fornire informazioni veritiere nelle richieste di disponibilita</li>
              <li>Non utilizzare il Portale per scopi illeciti o fraudolenti</li>
              <li>Non inviare spam o contenuti offensivi</li>
              <li>Rispettare i Professionisti e gli altri Utenti</li>
            </ul>

            <h2>4. Registrazione Professionisti</h2>
            <p>I Professionisti possono registrare gratuitamente la propria attivita. Con la registrazione, il Professionista:</p>
            <ul>
              <li>Dichiara che le informazioni fornite sono veritiere e aggiornate</li>
              <li>Autorizza la pubblicazione del proprio profilo sul Portale</li>
              <li>Si impegna a rispondere alle richieste ricevute in modo tempestivo e professionale</li>
              <li>Si impegna a rispettare le normative vigenti in materia di servizi pet, igiene e sicurezza</li>
            </ul>

            <h2>5. Piani a pagamento</h2>
            <p>Il Portale offre piani a pagamento per i Professionisti:</p>
            <ul>
              <li><strong>Free:</strong> listing base gratuito, fino a 3 foto, ricezione lead via email.</li>
              <li><strong>Premium (29 euro/mese):</strong> priorita nei risultati, galleria illimitata, badge verificato, statistiche.</li>
              <li><strong>Premium Plus (59 euro/mese):</strong> tutto Premium + evidenza in homepage, newsletter dedicata, supporto prioritario.</li>
            </ul>
            <p>I pagamenti sono gestiti tramite Stripe. L'abbonamento si rinnova automaticamente ogni mese. Il Professionista puo cancellare l'abbonamento in qualsiasi momento; la cancellazione ha effetto dalla fine del periodo gia pagato.</p>

            <h2>6. Recensioni</h2>
            <p>Gli Utenti possono lasciare recensioni sui Professionisti. Le recensioni devono:</p>
            <ul>
              <li>Essere basate su esperienze reali e personali</li>
              <li>Non contenere linguaggio offensivo, diffamatorio o discriminatorio</li>
              <li>Non contenere dati personali di terzi</li>
            </ul>
            <p>Il Portale si riserva il diritto di rimuovere recensioni che violano queste regole. I Professionisti possono segnalare recensioni inappropriate.</p>

            <h2>7. Limitazione di responsabilita</h2>
            <p>Il Portale agisce come intermediario e non e responsabile per:</p>
            <ul>
              <li>La qualita, sicurezza o legalita dei servizi offerti dai Professionisti</li>
              <li>La veridicita delle informazioni fornite dai Professionisti o dagli Utenti</li>
              <li>Danni diretti o indiretti derivanti dall'utilizzo del Portale o dai servizi dei Professionisti</li>
              <li>Interruzioni temporanee del servizio per manutenzione o cause di forza maggiore</li>
            </ul>

            <h2>8. Proprieta intellettuale</h2>
            <p>Tutti i contenuti del Portale (testi, grafica, logo, codice) sono di proprieta di MifidoDiTe.eu o utilizzati su licenza. E vietata la riproduzione non autorizzata. I Professionisti mantengono la proprieta dei contenuti (foto, descrizioni) caricati sul proprio profilo.</p>

            <h2>9. Dati scraping</h2>
            <p>Il Portale raccoglie informazioni pubblicamente disponibili su professionisti del settore pet da fonti pubbliche (siti web, pagine social, directory). Queste informazioni vengono utilizzate per creare profili base che i Professionisti possono reclamare e completare. I profili importati automaticamente sono contrassegnati come tali. Qualsiasi Professionista puo richiedere la rimozione del proprio profilo scrivendo a <a href="mailto:bau@mifidodite.eu">bau@mifidodite.eu</a>. La rimozione avviene entro 48 ore dalla richiesta.</p>

            <h2>10. Contenuti generati con Intelligenza Artificiale</h2>
            <p>Il Portale utilizza sistemi di intelligenza artificiale per:</p>
            <ul>
              <li>Generare e rielaborare contenuti editoriali (articoli del magazine)</li>
              <li>Creare descrizioni emozionali delle strutture a partire da dati pubblici</li>
              <li>Generare comunicazioni automatiche (email di invito ai professionisti)</li>
              <li>Analizzare e strutturare dati raccolti da fonti pubbliche</li>
            </ul>
            <p>Tutti i contenuti generati dall&apos;AI sono identificati come tali tramite apposita nota di trasparenza. L&apos;AI non viene utilizzata per prendere decisioni automatizzate che producono effetti giuridici sugli utenti. Il Portale si impegna alla conformita con il Regolamento UE 2024/1689 (AI Act).</p>

            <h2>11. Legge applicabile e foro competente</h2>
            <p>I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia e competente il Foro del luogo di residenza del consumatore, ai sensi del D.Lgs. 206/2005 (Codice del Consumo).</p>

            <h2>11. Modifiche ai termini</h2>
            <p>Il Portale si riserva il diritto di modificare i presenti Termini in qualsiasi momento. Le modifiche saranno comunicate via email agli utenti registrati e pubblicate su questa pagina.</p>

            <h2>12. Contatti</h2>
            <p>
              Per domande sui Termini di Servizio:<br />
              Email: <a href="mailto:bau@mifidodite.eu">bau@mifidodite.eu</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
