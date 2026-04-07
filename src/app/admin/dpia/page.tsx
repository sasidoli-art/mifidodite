export const metadata = {
  title: "DPIA — Admin MifidoDiTe",
};

export default function DPIAPage() {
  return (
    <div className="max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Valutazione d&apos;Impatto sulla Protezione dei Dati (DPIA)</h1>
          <p className="text-muted-foreground mb-2">Ai sensi dell&apos;Art. 35 del Regolamento UE 2016/679 (GDPR)</p>
          <p className="text-sm text-muted-foreground mb-10">Data valutazione: 5 aprile 2026</p>

          <div className="prose prose-sm max-w-none text-foreground/80">

            <h2>1. Descrizione del trattamento</h2>
            <p>MifidoDiTe.eu e un portale web che consente la ricerca di professionisti pet in Italia. Il portale raccoglie dati personali tramite form (newsletter, lead, registrazione, adozioni, SOS smarriti) e raccoglie dati pubblici tramite scraping automatizzato di fonti web. Utilizza sistemi di intelligenza artificiale per generare contenuti e analizzare dati.</p>

            <h2>2. Necessita e proporzionalita</h2>
            <h3>Dati raccolti e finalita</h3>
            <table>
              <thead><tr><th>Dato</th><th>Necessario?</th><th>Motivazione</th></tr></thead>
              <tbody>
                <tr><td>Email (newsletter)</td><td>Si</td><td>Indispensabile per inviare la newsletter</td></tr>
                <tr><td>CAP (newsletter)</td><td>Facoltativo</td><td>Per personalizzare i contenuti per zona</td></tr>
                <tr><td>Nome/Email/Tel (lead)</td><td>Si</td><td>Per permettere al professionista di rispondere</td></tr>
                <tr><td>Dati animale (lead)</td><td>Si</td><td>Per fornire un servizio pertinente</td></tr>
                <tr><td>Dati professionista (registrazione)</td><td>Si</td><td>Per creare il profilo pubblico</td></tr>
                <tr><td>Dati pubblici (scraping)</td><td>Si, con bilanciamento</td><td>Per popolare il portale — bilanciato con diritto di opposizione</td></tr>
              </tbody>
            </table>
            <p><strong>Valutazione:</strong> I dati raccolti sono proporzionati alle finalita. I dati facoltativi sono chiaramente identificati. Non vengono raccolti dati non necessari (IP e User-Agent rimossi dai lead).</p>

            <h2>3. Valutazione dei rischi</h2>

            <h3>Rischio 1: Scraping dati pubblici senza consenso</h3>
            <table>
              <tbody>
                <tr><td><strong>Probabilita</strong></td><td>Media</td></tr>
                <tr><td><strong>Impatto</strong></td><td>Medio</td></tr>
                <tr><td><strong>Rischio residuo</strong></td><td>BASSO</td></tr>
                <tr><td><strong>Mitigazione</strong></td><td>Profili contrassegnati come &quot;importati automaticamente&quot;. Diritto di opposizione chiaro (rimozione entro 48h). Base giuridica: legittimo interesse con bilanciamento. Solo dati gia pubblici.</td></tr>
              </tbody>
            </table>

            <h3>Rischio 2: Utilizzo AI per generazione contenuti</h3>
            <table>
              <tbody>
                <tr><td><strong>Probabilita</strong></td><td>Bassa</td></tr>
                <tr><td><strong>Impatto</strong></td><td>Basso</td></tr>
                <tr><td><strong>Rischio residuo</strong></td><td>MOLTO BASSO</td></tr>
                <tr><td><strong>Mitigazione</strong></td><td>Contenuti AI chiaramente identificati con badge/nota. Nessun dato personale degli utenti inviato ai modelli AI. AI usata solo per testi pubblici, non per decisioni automatizzate. Conformita AI Act (Reg. 2024/1689).</td></tr>
              </tbody>
            </table>

            <h3>Rischio 3: Trasmissione dati a professionisti (lead)</h3>
            <table>
              <tbody>
                <tr><td><strong>Probabilita</strong></td><td>Bassa</td></tr>
                <tr><td><strong>Impatto</strong></td><td>Medio</td></tr>
                <tr><td><strong>Rischio residuo</strong></td><td>BASSO</td></tr>
                <tr><td><strong>Mitigazione</strong></td><td>Consenso esplicito tramite checkbox obbligatorio. L&apos;utente e informato che i dati saranno condivisi con la struttura specifica. Dati minimi (solo quelli necessari per il contatto).</td></tr>
              </tbody>
            </table>

            <h3>Rischio 4: Email automatiche AI a professionisti (outreach)</h3>
            <table>
              <tbody>
                <tr><td><strong>Probabilita</strong></td><td>Media</td></tr>
                <tr><td><strong>Impatto</strong></td><td>Basso</td></tr>
                <tr><td><strong>Rischio residuo</strong></td><td>BASSO</td></tr>
                <tr><td><strong>Mitigazione</strong></td><td>Disclosure obbligatoria &quot;generata automaticamente&quot; in ogni email. Link di rimozione dati in ogni email. Warm-up graduale (3 email/giorno iniziali). Rate limiting. Solo email a professionisti con dati gia pubblici.</td></tr>
              </tbody>
            </table>

            <h3>Rischio 5: Violazione dati (data breach)</h3>
            <table>
              <tbody>
                <tr><td><strong>Probabilita</strong></td><td>Bassa</td></tr>
                <tr><td><strong>Impatto</strong></td><td>Alto</td></tr>
                <tr><td><strong>Rischio residuo</strong></td><td>MEDIO</td></tr>
                <tr><td><strong>Mitigazione</strong></td><td>HTTPS/TLS, HSTS, security headers, database crittografato, accesso admin con IP filtering + token SHA256, chiavi API in env variables, repository privato, rate limiting su tutte le API.</td></tr>
              </tbody>
            </table>

            <h2>4. Conclusione</h2>
            <p>Il livello di rischio complessivo per i diritti e le liberta degli interessati e <strong>BASSO</strong>. I trattamenti sono proporzionati, le misure di sicurezza adeguate e i diritti degli interessati garantiti. Non si ravvisano elementi che richiedano la consultazione preventiva del Garante (Art. 36 GDPR).</p>
            <p>La presente valutazione sara aggiornata in caso di modifiche sostanziali ai trattamenti o all&apos;introduzione di nuove funzionalita.</p>

            <h2>5. Approvazione</h2>
            <p>Valutazione effettuata da: Titolare del trattamento, MifidoDiTe.eu<br />
            Data: 5 aprile 2026<br />
            Prossima revisione: 5 aprile 2027</p>
      </div>
    </div>
  );
}
