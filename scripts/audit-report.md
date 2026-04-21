# Audit Cannibalization Magazine — MifidoDiTe.eu

**Generato**: 2026-04-21T19:57:39.606Z

## Riepilogo numerico

| Metrica | Valore |
|---|---|
| Articoli pubblicati analizzati | 186 |
| Cluster identificati (Fase 3 + 3-bis) | 18 |
| Redirect totali da applicare | 29 |
| └ da Fase 3 (Jaccard ≥ 0.5) | 22 |
| └ da Fase 3-bis (keyword scan) | 7 |
| Articoli da cancellare con 410 | 1 |
| Candidati da verificare manualmente | 3 |
| Falsi positivi scartati | 3 |
| Articoli singleton lasciati intatti | 138 |

**Decisioni**: consolidate=18, keep_separate=0, partial_overlap=0, delete_410=1

## Cluster consolidati

Ogni redirect è etichettato con la fonte: **[P3]** = catturato dal Jaccard (Fase 3), **[P3B]** = aggiunto dalla passata mirata sui singleton (Fase 3-bis). I redirect P3B hanno rischio di falso positivo più alto e vanno riletti con attenzione.

### cl_005 — Microchip cane obbligatorio (legge, costi, sanzioni, anagrafe)

**Decision**: consolidate  |  **Cluster size finale**: 3

> 3 articoli sul medesimo topic. Master scelto per word count più alto (806w) + data più recente + slug che copre tutte le query long-tail (costi, sanzioni, anagrafe). Differenza content tra i 3 è minima (<20%).

**Master scelto**:
- slug: `microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina`
- titolo: Microchip Cane Obbligatorio: Legge 281, Costi, Sanzioni e Anagrafe Canina
- 806w, categoria `salute`, creato 2026-04-12

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `microchip-cane-obbligatorio-legge-281` (778w) | `microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina` | Contenuto più scarno (778w). Slug più pulito ma master ha coda descrittiva più ricca per SEO long-tail. |
| [P3] | `microchip-cane-obbligatorio-legge-italiana` (689w) | `microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina` | 689w, contenuto più superficiale, slug meno specifico (generico 'legge italiana'). |

### cl_013 — Cani capiscono le emozioni umane (ricerca scientifica)

**Decision**: consolidate  |  **Cluster size finale**: 4

> 3 articoli sullo stesso tema scientifico. Master 1075w per word count più alto. Slug corto e senza code ridondanti.

**Master scelto**:
- slug: `cani-capiscono-emozioni-umane-ricerca`
- titolo: I Cani Capiscono Davvero le Nostre Emozioni: Cosa Dice la Ricerca
- 1075w, categoria `curiosita`, creato 2026-04-09

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `perche-cani-capiscono-emozioni-scienza-legame` (955w) | `cani-capiscono-emozioni-umane-ricerca` | 955w, più recente ma più corto come content. Lo slug con 'perche' è buono per intent ma master copre stessa query. |
| [P3] | `cani-capiscono-emozioni-scienza` (877w) | `cani-capiscono-emozioni-umane-ricerca` | 877w, contenuto più breve, slug nudo senza angolo. |
| **[P3B]** | `capacita-cognitive-cani-emozioni-umane` (671w) | `cani-capiscono-emozioni-umane-ricerca` | Fase 3-bis: framing 'capacità cognitive' è sub-topic ma copre stessa intent (cani che capiscono emozioni umane). 671w, content minore. |

### cl_018_merged — Razze di cani più longeve: studio UK Royal Veterinary College + dati ENCI

**Decision**: consolidate  |  **Cluster size finale**: 6

> CLUSTER PIÙ IMPORTANTE DELL'AUDIT (5 articoli Jaccard + 1 singleton keyword-matched = 6 articoli). Stesso studio UK RVC, stessi dati ENCI, stesso Jack Russell come razza longeva top. Master scelto per word count più alto (1059w) e slug che inizia con la keyword principale 'razze cani longevi'. NOTA: il singleton razze-cani-piu-longeve-enci-ricerche (840w) ha lo slug più pulito in assoluto ma content inferiore — se vuoi lo slug canonico migliore, fai un manual editing post-consolidamento copiando il body del master 1059w dentro lo slug più pulito. Per ora master = 1059w as-is.

**Master scelto**:
- slug: `razze-cani-longevi-studio-internazionale-italia-enci`
- titolo: Razze Cani Longevi: Studio Internazionale vs Dati ENCI Italia
- 1059w, categoria `curiosita`, creato 2026-04-09

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `longevita-cane-razze-piu-longeve-studio-uk-dati-enci-italia` (1035w) | `razze-cani-longevi-studio-internazionale-italia-enci` | 1035w, solo -2.3% word count del master ma slug inizia con 'longevita-cane' non con keyword principale. Data più recente. |
| [P3] | `studio-uk-razze-canine-longeve-dati-enci-italia` (855w) | `razze-cani-longevi-studio-internazionale-italia-enci` | 855w, slug inizia con 'studio-uk' che è modifier non keyword principale. |
| [P3] | `razze-canine-longeve-dati-enci-studio-internazionale` (820w) | `razze-cani-longevi-studio-internazionale-italia-enci` | 820w, word count più basso, slug simile al master ma con 'canine' vs 'cani'. |
| [P3] | `razze-cani-longevi-dati-enci-studio-inglese` (940w) | `razze-cani-longevi-studio-internazionale-italia-enci` | 940w, variante con 'inglese' invece di 'UK'. |
| **[P3B]** | `razze-cani-piu-longeve-enci-ricerche` (840w) | `razze-cani-longevi-studio-internazionale-italia-enci` | Fase 3-bis: 840w, SLUG PIÙ PULITO del cluster ma word count inferiore al master 1059w. Considerare manual editing per usare questo come canonico con body del master. |

### cl_001 — Vaccinazioni cane: calendario completo

**Decision**: consolidate  |  **Cluster size finale**: 4

> 2 articoli cluster + 2 singleton Fase 3-bis = 4 articoli stesso topic. Master per word count + slug più pulito (senza stopword 'del').

**Master scelto**:
- slug: `vaccinazioni-cane-calendario-completo`
- titolo: Vaccinazioni Cane: Calendario Completo e Linee Guida WSAVA
- 799w, categoria `salute`, creato 2026-04-08

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `vaccinazioni-del-cane-calendario-completo-e-costi` (702w) | `vaccinazioni-cane-calendario-completo` | 702w, slug con stopword 'del' e coda 'e-costi'. |
| **[P3B]** | `vaccini-cane-calendario-vaccinale-completo` (728w) | `vaccinazioni-cane-calendario-completo` | Fase 3-bis: slug non catturato dal Jaccard perché 'vaccini' vs 'vaccinazioni' differisce. Topic identico. |
| **[P3B]** | `vaccini-cane-calendario-completo-obbligatori-richiami-costi` (801w) | `vaccinazioni-cane-calendario-completo` | Fase 3-bis: 801w sullo stesso topic calendario vaccinale. Slug pesante. |

### cl_002 — Perché i gatti fanno le fusa: scoperte scientifiche

**Decision**: consolidate  |  **Cluster size finale**: 3

> Duplicato con hash random -mnnm3c0i = artefatto di generazione fallita. Master = slug pulito.

**Master scelto**:
- slug: `perche-gatti-fanno-fusa-benefici-salute`
- titolo: Perché i gatti fanno le fusa? Scoperte scientifiche e benefici
- 817w, categoria `curiosita`, creato 2026-04-06

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `perche-gatti-fanno-fusa-benefici-salute-mnnm3c0i` (557w) | `perche-gatti-fanno-fusa-benefici-salute` | 557w, slug con hash random mnnm3c0i = artefatto di generazione. MAI master per SEO. |
| **[P3B]** | `perche-il-gatto-fa-le-fusa-non-e-sempre-per-affetto` (756w) | `perche-gatti-fanno-fusa-benefici-salute` | Fase 3-bis: framing leggermente diverso ('non è sempre per affetto') ma topic identico (perché fanno le fusa). |

### cl_003 — Microbioma del cane e alimentazione

**Decision**: consolidate  |  **Cluster size finale**: 2

> Duplicato con hash random -mnnmd44t. Nonostante il duplicato con hash abbia word count leggermente più alto (771 vs 686), la regola 'slug con hash MAI master' prevale: un master con hash è penalizzato in SERP, il content extra non compensa.

**Master scelto**:
- slug: `microbioma-cane-alimentazione-ricerche`
- titolo: Microbioma del cane e alimentazione: le ultime ricerche scientifiche
- 686w, categoria `salute`, creato 2026-04-06

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `microbioma-cane-alimentazione-ricerche-mnnmd44t` (771w) | `microbioma-cane-alimentazione-ricerche` | 771w, slug con hash mnnmd44t. Override word count per regola hash-never-master. |

### cl_004 — Come scegliere il primo cucciolo / cane per principianti

**Decision**: consolidate  |  **Cluster size finale**: 2

> Master per word count più alto (1069w) e slug più specifico ('guida-cane-principianti' > 'guida-completa' generico).

**Master scelto**:
- slug: `scegliere-primo-cucciolo-guida-cane-principianti`
- titolo: Come Scegliere il Primo Cucciolo: Guida Completa per Principianti
- 1069w, categoria `guide`, creato 2026-04-12

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `come-scegliere-primo-cucciolo-guida-completa` (858w) | `scegliere-primo-cucciolo-guida-cane-principianti` | 858w, slug con 'guida-completa' che è coda ridondante (tutti gli articoli sono 'completi'). |

### cl_006 — Razze di gatti italiane (Siamese Italiano, Gatto delle Foreste, Sokoke)

**Decision**: consolidate  |  **Cluster size finale**: 2

> Varianti singolare/plurale dello stesso topic. Master scelto per word count più alto + grammatica italiana corretta ('razze gatti italiane' concorda con 'razze' femminile plurale).

**Master scelto**:
- slug: `razze-gatti-italiane-siamese-foreste-sokoke`
- titolo: Razze di Gatti Italiane: Siamese, Foreste e Sokoke
- 877w, categoria `razze`, creato 2026-04-08

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `razze-gatti-italiani-siamese-foreste-sokoke` (801w) | `razze-gatti-italiane-siamese-foreste-sokoke` | 801w, grammatica 'italiani' non concorda con 'razze' (femminile). |

### cl_007 — Educazione del cucciolo nei primi 6 mesi

**Decision**: consolidate  |  **Cluster size finale**: 2

> Master per word count + slug più corto (evita stopword 'base').

**Master scelto**:
- slug: `educazione-cucciolo-primi-6-mesi-socializzazione-comandi`
- titolo: Educazione del Cucciolo nei Primi 6 Mesi: Guida Completa
- 909w, categoria `comportamento`, creato 2026-04-08

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `educazione-cucciolo-primi-6-mesi-socializzazione-comandi-base` (782w) | `educazione-cucciolo-primi-6-mesi-socializzazione-comandi` | 782w, slug con 'base' ridondante. |

### cl_008 — Trasporto cani in auto: Art. 169 Codice della Strada

**Decision**: consolidate  |  **Cluster size finale**: 3

> 2 cluster + 1 singleton Fase 3-bis = 3 articoli stesso topic (la 3a variante che Antonio aveva segnalato). Master per word count + slug con formato canonico 'art-169'.

**Master scelto**:
- slug: `trasporto-cani-auto-art-169-codice-strada`
- titolo: Trasporto cani in auto: obblighi legali e sanzioni secondo Art. 169 CDS
- 785w, categoria `guide`, creato 2026-04-08

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `trasporto-cani-auto-articolo-169-codice-strada` (747w) | `trasporto-cani-auto-art-169-codice-strada` | 747w, variante 'articolo' invece di 'art' (master ha forma più canonica). |
| **[P3B]** | `trasporto-cani-auto-regole-sanzioni-sistemi-sicurezza` (723w) | `trasporto-cani-auto-art-169-codice-strada` | Fase 3-bis: la 3a variante che Antonio aveva segnalato. Stesso topic Art. 169. |

### cl_009 — Trasporto gatti in auto: sicurezza e Codice della Strada

**Decision**: consolidate  |  **Cluster size finale**: 2

> Master nettamente più completo (+49% word count). Lo slug ha 'consigli' come coda ma il contenuto più ricco prevale.

**Master scelto**:
- slug: `trasporto-gatti-auto-sicurezza-codice-strada-consigli`
- titolo: Trasporto gatti in auto: guida sicura, obblighi legali e consigli pratici
- 899w, categoria `gatti`, creato 2026-04-12

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `trasporto-gatti-auto-sicurezza-codice-strada` (602w) | `trasporto-gatti-auto-sicurezza-codice-strada-consigli` | 602w, contenuto molto più scarno (-33%). Slug più pulito ma content insufficiente. |

### cl_010 — Cani in autostrada e vacanza: regole Codice della Strada

**Decision**: consolidate  |  **Cluster size finale**: 2

> Varianti quasi identiche (779 vs 758w). Master per word count e slug più corto.

**Master scelto**:
- slug: `cani-autostrada-vacanza-regole-codice-strada`
- titolo: Cani in Autostrada e Vacanza: Regole, Documenti e Traghetti
- 779w, categoria `viaggi`, creato 2026-04-08

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `cani-autostrada-vacanza-regole-codice-strada-traghetti` (758w) | `cani-autostrada-vacanza-regole-codice-strada` | 758w, slug ha '-traghetti' come coda (topic ancillare coperto nel master). |

### cl_011 — Vendere o regalare un cane: obblighi di legge

**Decision**: consolidate  |  **Cluster size finale**: 2

> Master per word count + slug senza ridondanza 'obblighi-legge-legale'.

**Master scelto**:
- slug: `vendere-regalare-cane-legge-italia-obblighi`
- titolo: Vendere o regalare il cane: guida completa alla legge italiana
- 964w, categoria `guide`, creato 2026-04-08

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `vendere-regalare-cane-obblighi-legge-legale` (876w) | `vendere-regalare-cane-legge-italia-obblighi` | 876w, slug con 'legge-legale' ridondante. |

### cl_012 — Passaggio di proprietà del cane: procedura italiana

**Decision**: consolidate  |  **Cluster size finale**: 2

> Master per word count enormemente superiore (1873 vs 985 = +90%). Quasi il doppio di contenuto.

**Master scelto**:
- slug: `passaggio-proprieta-cane-guida-procedura-italiana`
- titolo: Passaggio di Proprietà del Cane: Guida Completa alla Procedura Italiana
- 1873w, categoria `guide`, creato 2026-04-09

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `passaggio-proprieta-cane-guida-italiana` (985w) | `passaggio-proprieta-cane-guida-procedura-italiana` | 985w, il master ha quasi il doppio del contenuto. |

### cl_015 — Pastore del Caucaso: il cane da guerra dell'esercito russo

**Decision**: consolidate  |  **Cluster size finale**: 2

> Duplicato con hash mnrj073p. Master = slug pulito con anche word count leggermente superiore.

**Master scelto**:
- slug: `pastore-caucaso-cane-guerra-russo`
- titolo: Pastore del Caucaso: il cane da guerra dell'esercito russo
- 1202w, categoria `curiosita`, creato 2026-04-09

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `pastore-caucaso-cane-guerra-russo-mnrj073p` (1169w) | `pastore-caucaso-cane-guerra-russo` | 1169w, slug con hash mnrj073p = artefatto di generazione. |

### cl_016 — Pastore Tedesco nelle forze armate / polizia (storia militare)

**Decision**: consolidate  |  **Cluster size finale**: 2

> Duplicato con hash mnrj0th3. Come cl_003: il duplicato con hash ha word count più alto (1343w) ma la regola hash-never-master vince.

**Master scelto**:
- slug: `pastore-tedesco-esercito-polizia-addestramento`
- titolo: Pastore Tedesco nelle forze armate: da Rin Tin Tin ai cani anti-IED
- 1191w, categoria `curiosita`, creato 2026-04-09

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `pastore-tedesco-esercito-polizia-addestramento-mnrj0th3` (1343w) | `pastore-tedesco-esercito-polizia-addestramento` | 1343w (+13%), slug con hash mnrj0th3 = artefatto. Override word count per regola hash. |

### cl_017 — Malinois Belga: cane eroe del raid a Bin Laden (Navy SEAL)

**Decision**: consolidate  |  **Cluster size finale**: 2

> Master per word count + slug più corto senza coda.

**Master scelto**:
- slug: `malinois-belga-navy-seal-cani`
- titolo: Malinois Belga: il cane eroe del raid a Bin Laden
- 1394w, categoria `curiosita`, creato 2026-04-09

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| [P3] | `malinois-belga-navy-seal-cani-operazioni-speciali` (1314w) | `malinois-belga-navy-seal-cani` | 1314w, slug con coda 'operazioni-speciali' ridondante. |

### cl_019 — Perché i cani inclinano la testa (studio scienza)

**Decision**: consolidate  |  **Cluster size finale**: 2

> Fase 3-bis: cluster NUOVO non catturato dal Jaccard 0.5. Gli slug divergono fortemente in lunghezza (5 vs 11 token) → Jaccard = 4/11 = 0.36, sotto soglia. Topic identico (perché cani inclinano la testa + studio).

**Master scelto**:
- slug: `perche-cani-inclinano-testa-studio`
- titolo: Perché i cani inclinano la testa? Uno studio rivela il motivo
- 722w, categoria `curiosita`, creato 2026-04-14

**Redirect**:

| fonte | slug da redirectare | →  | rationale |
|---|---|---|---|
| **[P3B]** | `perche-i-cani-inclinano-la-testa-quando-parliamo-la-scienza-dietro-quel-gesto-irresistibile` (684w) | `perche-cani-inclinano-testa-studio` | Fase 3-bis: slug 11 token con stopwords multiple (i, la, quando, quel). Stesso topic, 684w. Master 722w ha slug pulito + più content. |

## Da cancellare con HTTP 410 Gone

Articoli che NON devono essere redirectati — vanno fatti ritornare 410 Gone a Google.

- `test-articolo` — "Test articolo" (673w)
  - Articolo di test pubblicato per errore in produzione. Slug 'test-articolo', contenuto di test.

## Candidati Fase 3-bis DA VERIFICARE (non auto-applicati)

Questi 3 articoli sono stati pescati dalla scan keyword ma il loro destino richiede conferma. Leggi il body completo e dimmi cosa fare con ciascuno.

### `microchip-sottocutaneo-obbligatorio-guida-completa-a-funzionamento-costi-e-rischi` (1120w)
- Cluster candidato: **cl_005**
- Perché è dubbio: 'Microchip sottocutaneo' potrebbe essere topic tecnico generico (include microchip umani per tech/privacy). Va letto il body completo per confermare se è sul cane o no.

### `animali-longevi-studi-internazionali-italia` (1039w)
- Cluster candidato: **cl_018_merged**
- Perché è dubbio: Topic 'animali longevi' generico (include gatti, altri pet), non solo razze cani. Potrebbe essere articolo hub legittimo autonomo.

### `il-potere-curativo-delle-fusa-quando-il-ronzio-del-gatto-diventa-terapia-per-le-ossa` (847w)
- Cluster candidato: **cl_002**
- Perché è dubbio: Angolo specifico (potere curativo vibrazioni 25-150 Hz su osso) che è sub-topic scientifico autonomo del 'perché fanno le fusa'. Leaning KEEP_SEPARATE come sub-topic dedicato.

## Falsi positivi scartati (keep_separate)

Articoli identificati come possibili match dalla scan keyword ma scartati dopo analisi del topic.

- `passaggio-proprieta-gatto-anagrafe-felina`
  - Cluster scartato: cl_012
  - Perché: Topic 'GATTO' non cane. Procedura anagrafe felina, legittimo articolo autonomo.
- `le-5-razze-migliori-come-cani-guida-labrador-golden-pastore-tedesco-e-altre`
  - Cluster scartato: cl_016
  - Perché: Listicle 'top 5 cani guida' — Pastore Tedesco è citato come uno dei 5 ma il topic è cani guida in generale.
- `pastore-tedesco-carattere-salute-e-tutto-quello-che-devi-sapere`
  - Cluster scartato: cl_016
  - Perché: Articolo enciclopedico sulla razza (standard, carattere, salute). Il cluster cl_016 è specificamente su uso militare/polizia.

## Segnalazioni fuori scope audit

Pulizie separate da fare dopo, non parte della remediation cannibalization.

### Categoria orfana

**Categoria errata**: `salute animale` (1 articolo) → andrebbe normalizzata in `salute` (24 articoli).
- `robot-umanoide-allontana-cinghiali-varsavia-tecnologia-fauna-urbana` — "Robot umanoide allontana i cinghiali a Varsavia: la tecnologia per la fauna urbana"

**SQL suggerito** (NON eseguito):
```sql
UPDATE articoli SET categoria = 'salute' WHERE categoria = 'salute animale';
```

### Slug con hash random (artefatti generazione AI)

Pattern identificato: slug terminanti in `-mn[a-z0-9]{6,}` — probabilmente timestamp random dei processi di generazione.

- `perche-gatti-fanno-fusa-benefici-salute-mnnm3c0i`
- `microbioma-cane-alimentazione-ricerche-mnnmd44t`
- `pastore-caucaso-cane-guerra-russo-mnrj073p`
- `pastore-tedesco-esercito-polizia-addestramento-mnrj0th3`

Tutti questi slug sono GIÀ nei cluster consolidate sopra (cl_002, cl_003, cl_015, cl_016) come non-master → dopo i redirect le righe DB vanno cancellate o lasciate inaccessibili da sitemap.xml.

## Prossimi passi suggeriti

1. **Revisiona i 3 candidati Fase 3-bis dubbi** e conferma se fare redirect o keep_separate.
2. **Applica i 29 redirect** via `next.config.ts` o `app/scripts/apply-redirects.sql` (generato come output opzionale, non eseguito).
3. **Cancella il test-articolo** con HTTP 410 (rotta dedicata o `app/test-articolo/route.ts` che ritorna 410).
4. **Re-submit sitemap** in Search Console dopo i redirect.
5. **Monitora** Search Console per 2-3 settimane: CTR dovrebbe salire sopra 2% se la cannibalization era il problema reale.
6. **Fuori scope** (quando avrai tempo): UPDATE categoria orfana, valuta se cancellare fisicamente le righe redirected dopo 30 giorni.
