# SEARCH PROMPTS — Query per scraping settimanale

## Istruzioni per n8n / Firecrawl
Usa queste query in rotazione settimanale. Ogni settimana copri una regione diversa,
ciclando su tutte le 20 regioni italiane.

---

## 1. PENSIONI PER ANIMALI

### Google Search
```
"pensione per cani" "{COMUNE}" OR "{PROVINCIA}"
"pensione per animali" "{REGIONE}" recensioni
"pensione cani e gatti" vicino "{CAP}"
site:facebook.com "pensione cani" "{PROVINCIA}"
```

### Facebook Search
```
pensione cani {COMUNE}
pensione animali {PROVINCIA}
dog boarding {COMUNE} Italia
```

### Google Maps
```
pensione per cani {COMUNE}
pensione animali domestici {PROVINCIA}
```

---

## 2. SPIAGGE DOG-FRIENDLY

### Google Search
```
"spiaggia cani ammessi" "{REGIONE}" {ANNO}
"spiaggia dog friendly" "{PROVINCIA}" elenco
"bau beach" "{REGIONE}"
"spiaggia libera cani" "{COMUNE}"
site:facebook.com "spiaggia cani" "{PROVINCIA}"
```

### Facebook / Gruppi
```
spiaggia cani {REGIONE}
bau beach {PROVINCIA}
mare con cane {REGIONE}
spiagge dog friendly {REGIONE} {ANNO}
```

---

## 3. TOELETTATURA / GROOMER

### Google Search
```
"toelettatura cani" "{COMUNE}" OR "{PROVINCIA}"
"grooming cani" "{COMUNE}" prezzi
"toeletta animali" "{PROVINCIA}"
site:facebook.com "toelettatura" cani "{PROVINCIA}"
```

### Facebook
```
toelettatura cani {COMUNE}
groomer cani {PROVINCIA}
toeletta animali {COMUNE}
```

---

## 4. DOG SITTER / CAT SITTER

### Google Search
```
"dog sitter" "{COMUNE}" disponibile
"cat sitter" "{COMUNE}" a domicilio
"pet sitter" "{PROVINCIA}" prezzi
site:facebook.com "dog sitter" "{PROVINCIA}"
```

### Facebook / Gruppi
```
dog sitter {COMUNE}
cerco dog sitter {PROVINCIA}
pet sitter disponibile {COMUNE}
cat sitter {COMUNE}
```

---

## 5. EDUCATORI CINOFILI

### Google Search
```
"educatore cinofilo" "{COMUNE}" OR "{PROVINCIA}"
"addestramento cani" "{COMUNE}" corso
"istruttore cinofilo" "{PROVINCIA}"
site:facebook.com "educatore cinofilo" "{PROVINCIA}"
```

### Facebook
```
educatore cinofilo {COMUNE}
addestramento cani {PROVINCIA}
corso educazione cane {COMUNE}
```

---

## 6. VETERINARI

### Google Search
```
"veterinario" "{COMUNE}" "cani e gatti"
"clinica veterinaria" "{COMUNE}" orari
"ambulatorio veterinario" "{PROVINCIA}"
```

### Google Maps
```
veterinario {COMUNE}
clinica veterinaria {PROVINCIA}
```

---

## 7. FOTOGRAFI PET

### Google Search
```
"fotografo animali" "{PROVINCIA}"
"pet photography" "{REGIONE}" Italia
"foto cani" professionista "{COMUNE}"
site:facebook.com "fotografo animali" "{REGIONE}"
site:instagram.com "pet photographer" "{REGIONE}"
```

### Facebook / Instagram
```
fotografo animali {REGIONE}
pet photography {PROVINCIA}
servizio fotografico cani {REGIONE}
```

---

## 8. DOG WALKING / PET TAXI

### Google Search
```
"dog walking" "{COMUNE}" servizio
"passeggiate cani" "{COMUNE}" professionista
"pet taxi" "{PROVINCIA}"
"trasporto animali" "{COMUNE}"
```

### Facebook
```
dog walking {COMUNE}
passeggiata cani servizio {PROVINCIA}
pet taxi {COMUNE}
```

---

## ROTAZIONE REGIONALE SETTIMANALE

| Settimana | Regioni |
|-----------|---------|
| 1 | Lombardia, Piemonte |
| 2 | Veneto, Friuli Venezia Giulia |
| 3 | Emilia-Romagna, Toscana |
| 4 | Lazio, Campania |
| 5 | Puglia, Calabria |
| 6 | Sicilia, Sardegna |
| 7 | Liguria, Trentino-Alto Adige |
| 8 | Marche, Umbria |
| 9 | Abruzzo, Molise |
| 10 | Basilicata, Valle d'Aosta |

Ciclo completo: 10 settimane → ripeti.

---

## PROMPT PER GENERAZIONE DESCRIZIONE STORYTELLING

Dopo aver estratto i dati grezzi, usa questo prompt per generare la descrizione emozionale:

```
Sei un copywriter italiano specializzato nel mondo pet.

Scrivi una descrizione emozionale e persuasiva (150-250 parole) per questa struttura/professionista:

Nome: {nome}
Categoria: {categoria}
Comune: {comune}
Servizi: {servizi}
Descrizione originale: {descrizione}

Regole:
- Tono: caldo, rassicurante, come se parlassi a un proprietario preoccupato di lasciare il suo animale
- Usa il "tu" diretto
- Includi il concetto di FIDUCIA (il brand è "Mi fido di te")
- Menziona almeno 2 servizi specifici
- Chiudi con una call-to-action morbida ("Chiedi disponibilità", "Scopri di più")
- NON inventare servizi o dettagli non presenti nei dati
- Scrivi in italiano fluente, evita anglicismi inutili
- Evita frasi generiche tipo "il migliore della zona"
```
