import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Registro dei Trattamenti — MifidoDiTe.eu",
  description: "Registro dei trattamenti ai sensi dell'Art. 30 del Regolamento UE 2016/679 (GDPR).",
};

export default function RegistroTrattamentiPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Registro dei Trattamenti</h1>
          <p className="text-muted-foreground mb-2">Ai sensi dell&apos;Art. 30 del Regolamento UE 2016/679 (GDPR)</p>
          <p className="text-sm text-muted-foreground mb-10">Ultimo aggiornamento: 5 aprile 2026</p>

          <div className="prose prose-sm max-w-none text-foreground/80">

            <h2>Titolare del Trattamento</h2>
            <table>
              <tbody>
                <tr><td><strong>Denominazione</strong></td><td>MifidoDiTe.eu</td></tr>
                <tr><td><strong>Email</strong></td><td>bau@mifidodite.eu</td></tr>
                <tr><td><strong>PEC</strong></td><td>In fase di attivazione</td></tr>
                <tr><td><strong>P.IVA</strong></td><td>In fase di registrazione</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Trattamento 1: Navigazione del sito web</h2>
            <table>
              <tbody>
                <tr><td><strong>Finalita</strong></td><td>Erogazione del servizio web, sicurezza, analisi aggregate anonime</td></tr>
                <tr><td><strong>Base giuridica</strong></td><td>Legittimo interesse (Art. 6.1.f GDPR)</td></tr>
                <tr><td><strong>Categorie di interessati</strong></td><td>Visitatori del sito web</td></tr>
                <tr><td><strong>Categorie di dati</strong></td><td>Dati di navigazione (pagine visitate, timestamp), cookie tecnici di sessione</td></tr>
                <tr><td><strong>Destinatari</strong></td><td>Vercel Inc. (hosting, DPA sottoscritto)</td></tr>
                <tr><td><strong>Trasferimento extra-UE</strong></td><td>Vercel utilizza CDN globale con DPA conforme alle Clausole Contrattuali Standard (SCC)</td></tr>
                <tr><td><strong>Periodo di conservazione</strong></td><td>Log di navigazione: 26 mesi. Cookie di sessione: fino alla chiusura del browser</td></tr>
                <tr><td><strong>Misure di sicurezza</strong></td><td>HTTPS/TLS, HSTS preload, security headers (X-Frame-Options, CSP, XSS Protection)</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Trattamento 2: Iscrizione newsletter</h2>
            <table>
              <tbody>
                <tr><td><strong>Finalita</strong></td><td>Invio newsletter settimanale personalizzata con contenuti pet nella zona dell&apos;iscritto</td></tr>
                <tr><td><strong>Base giuridica</strong></td><td>Consenso esplicito (Art. 6.1.a GDPR)</td></tr>
                <tr><td><strong>Categorie di interessati</strong></td><td>Utenti che si iscrivono volontariamente alla newsletter</td></tr>
                <tr><td><strong>Categorie di dati</strong></td><td>Email (obbligatorio), CAP (facoltativo), nome animale (facoltativo), tipo animale (cane/gatto)</td></tr>
                <tr><td><strong>Destinatari</strong></td><td>Neon Tech Inc. (database, server EU Frankfurt, DPA); Brevo SAS (invio email, server EU Francia, DPA)</td></tr>
                <tr><td><strong>Trasferimento extra-UE</strong></td><td>Nessuno. Tutti i dati restano in UE</td></tr>
                <tr><td><strong>Periodo di conservazione</strong></td><td>Fino alla disiscrizione dell&apos;utente. Dati cancellati entro 30 giorni dalla richiesta</td></tr>
                <tr><td><strong>Misure di sicurezza</strong></td><td>Database crittografato (SSL/TLS), accesso limitato, rate limiting (max 3 iscrizioni/minuto per IP)</td></tr>
                <tr><td><strong>Diritto di opposizione</strong></td><td>Disiscrizione con un click tramite link in ogni email o pagina /unsubscribe</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Trattamento 3: Richieste di disponibilita (Lead)</h2>
            <table>
              <tbody>
                <tr><td><strong>Finalita</strong></td><td>Trasmissione della richiesta dell&apos;utente al professionista pet selezionato</td></tr>
                <tr><td><strong>Base giuridica</strong></td><td>Consenso esplicito (Art. 6.1.a GDPR) tramite checkbox obbligatorio nel form</td></tr>
                <tr><td><strong>Categorie di interessati</strong></td><td>Utenti che compilano il form &quot;Chiedi disponibilita&quot;</td></tr>
                <tr><td><strong>Categorie di dati</strong></td><td>Nome, email, telefono (facoltativo), date, tipo/numero animali, taglia, note</td></tr>
                <tr><td><strong>Destinatari</strong></td><td>Neon Tech Inc. (database); il Professionista selezionato (via email); Brevo SAS (invio email)</td></tr>
                <tr><td><strong>Trasferimento extra-UE</strong></td><td>Nessuno</td></tr>
                <tr><td><strong>Periodo di conservazione</strong></td><td>12 mesi dalla richiesta, poi anonimizzati</td></tr>
                <tr><td><strong>Misure di sicurezza</strong></td><td>Rate limiting (max 5 richieste/minuto per IP), nessun dato IP/User-Agent salvato</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Trattamento 4: Registrazione professionisti</h2>
            <table>
              <tbody>
                <tr><td><strong>Finalita</strong></td><td>Creazione e pubblicazione del profilo professionale sul Portale</td></tr>
                <tr><td><strong>Base giuridica</strong></td><td>Consenso esplicito (Art. 6.1.a) e esecuzione contrattuale (Art. 6.1.b)</td></tr>
                <tr><td><strong>Categorie di interessati</strong></td><td>Professionisti del settore pet che si registrano</td></tr>
                <tr><td><strong>Categorie di dati</strong></td><td>Nome attivita, nome referente, email, telefono, indirizzo, CAP, comune, provincia, descrizione, servizi, link social</td></tr>
                <tr><td><strong>Destinatari</strong></td><td>Neon Tech Inc. (database); pubblico (profilo visibile sul Portale)</td></tr>
                <tr><td><strong>Trasferimento extra-UE</strong></td><td>Nessuno</td></tr>
                <tr><td><strong>Periodo di conservazione</strong></td><td>Per tutta la durata dell&apos;account. Cancellazione entro 30 giorni dalla richiesta</td></tr>
                <tr><td><strong>Misure di sicurezza</strong></td><td>Autenticazione con token SHA256, cookie httpOnly/secure/sameSite, filtro IP admin</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Trattamento 5: Annunci adozione e SOS smarriti</h2>
            <table>
              <tbody>
                <tr><td><strong>Finalita</strong></td><td>Pubblicazione di annunci per adozione animali e segnalazioni di smarrimento</td></tr>
                <tr><td><strong>Base giuridica</strong></td><td>Consenso esplicito (Art. 6.1.a) tramite checkbox obbligatorio</td></tr>
                <tr><td><strong>Categorie di interessati</strong></td><td>Utenti che pubblicano annunci di adozione o segnalano smarrimenti</td></tr>
                <tr><td><strong>Categorie di dati</strong></td><td>Nome, email, telefono, comune, provincia, dati dell&apos;animale (specie, razza, eta, colore)</td></tr>
                <tr><td><strong>Destinatari</strong></td><td>Neon Tech Inc. (database); pubblico (annuncio visibile sul Portale dopo moderazione)</td></tr>
                <tr><td><strong>Trasferimento extra-UE</strong></td><td>Nessuno</td></tr>
                <tr><td><strong>Periodo di conservazione</strong></td><td>60 giorni dalla pubblicazione, poi cancellati automaticamente</td></tr>
                <tr><td><strong>Misure di sicurezza</strong></td><td>Moderazione pre-pubblicazione, rate limiting, scadenza automatica</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Trattamento 6: Raccolta dati da fonti pubbliche (Scraping)</h2>
            <table>
              <tbody>
                <tr><td><strong>Finalita</strong></td><td>Creazione di profili base di professionisti pet a partire da informazioni pubbliche</td></tr>
                <tr><td><strong>Base giuridica</strong></td><td>Legittimo interesse (Art. 6.1.f GDPR) bilanciato con diritto di opposizione</td></tr>
                <tr><td><strong>Categorie di interessati</strong></td><td>Professionisti pet le cui informazioni sono pubblicamente disponibili</td></tr>
                <tr><td><strong>Categorie di dati</strong></td><td>Nome attivita, indirizzo, telefono, servizi — solo dati gia pubblici</td></tr>
                <tr><td><strong>Fonti</strong></td><td>Siti web pubblici, Google Maps, PagineGialle, pagine social pubbliche</td></tr>
                <tr><td><strong>Destinatari</strong></td><td>Neon Tech Inc. (database); Anthropic/DeepSeek (analisi AI, no storage permanente)</td></tr>
                <tr><td><strong>Trasferimento extra-UE</strong></td><td>I dati testuali sono inviati ad Anthropic (EU) e DeepSeek per analisi. Non vengono usati per training dei modelli AI</td></tr>
                <tr><td><strong>Periodo di conservazione</strong></td><td>Fino alla richiesta di rimozione del professionista. Rimozione entro 48h lavorative</td></tr>
                <tr><td><strong>Diritto di opposizione</strong></td><td>I profili sono contrassegnati come &quot;importati automaticamente&quot;. Rimozione su richiesta a bau@mifidodite.eu</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Trattamento 7: Utilizzo sistemi AI</h2>
            <table>
              <tbody>
                <tr><td><strong>Finalita</strong></td><td>Generazione contenuti editoriali, descrizioni strutture, comunicazioni automatiche, analisi dati</td></tr>
                <tr><td><strong>Base giuridica</strong></td><td>Legittimo interesse (Art. 6.1.f) per contenuti; consenso (Art. 6.1.a) per comunicazioni dirette</td></tr>
                <tr><td><strong>Sistemi AI utilizzati</strong></td><td>Claude Haiku (Anthropic, server EU); DeepSeek (DeepSeek AI)</td></tr>
                <tr><td><strong>Dati trattati dall&apos;AI</strong></td><td>Testi pubblici per analisi, nomi attivita, descrizioni. Nessun dato personale di utenti</td></tr>
                <tr><td><strong>Trasparenza</strong></td><td>Contenuti AI identificati con badge/nota. Email AI con disclosure &quot;generata automaticamente&quot;</td></tr>
                <tr><td><strong>Decisioni automatizzate</strong></td><td>Nessuna decisione automatizzata con effetti giuridici sugli interessati (Art. 22 GDPR)</td></tr>
                <tr><td><strong>Training</strong></td><td>Nessun dato personale degli utenti viene utilizzato per addestrare modelli AI</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Responsabili del trattamento (Art. 28 GDPR)</h2>
            <table>
              <thead>
                <tr><th>Fornitore</th><th>Servizio</th><th>Sede</th><th>DPA</th></tr>
              </thead>
              <tbody>
                <tr><td>Neon Tech Inc.</td><td>Database PostgreSQL</td><td>Server EU (Frankfurt)</td><td>Disponibile su richiesta</td></tr>
                <tr><td>Vercel Inc.</td><td>Hosting e CDN</td><td>Globale con DPA e SCC</td><td>vercel.com/legal/dpa</td></tr>
                <tr><td>Brevo SAS</td><td>Email transazionali e newsletter</td><td>Server EU (Francia)</td><td>Incluso nel contratto</td></tr>
                <tr><td>Anthropic PBC</td><td>AI (Claude Haiku)</td><td>API EU</td><td>Da verificare</td></tr>
                <tr><td>DeepSeek AI</td><td>AI (DeepSeek Chat)</td><td>API</td><td>Da verificare</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Misure di sicurezza tecniche e organizzative</h2>
            <ul>
              <li>Crittografia in transito: HTTPS/TLS su tutte le connessioni</li>
              <li>HSTS preload con max-age 2 anni</li>
              <li>Security headers: X-Frame-Options DENY, X-XSS-Protection, X-Content-Type-Options nosniff</li>
              <li>Database crittografato con SSL (Neon PostgreSQL)</li>
              <li>Autenticazione admin: token SHA256, cookie httpOnly/secure/sameSite strict, filtro IP</li>
              <li>Rate limiting su tutte le API pubbliche (3-5 richieste/minuto per IP)</li>
              <li>Nessun dato IP/User-Agent salvato nei lead</li>
              <li>Password non salvate in chiaro (bcrypt per hash)</li>
              <li>Chiavi API in variabili d&apos;ambiente, mai nel codice sorgente</li>
              <li>Repository Git privato (GitHub)</li>
              <li>Accesso admin limitato per IP</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
