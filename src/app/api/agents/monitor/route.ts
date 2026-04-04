import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { fetchSubitoAnimali } from "@/lib/subito-scraper";
import { askAI, extractJSON } from "@/lib/ai-agent";
import { slugify } from "@/lib/utils";
import { logAgent, startTimer } from "@/lib/agent-logger";

// ============================================
// AGENTE MONITOR
// Cerca animali smarriti su Subito.it e li importa nell'SOS.
// Controlla anche se annunci SOS gia pubblicati sono stati risolti.
// ============================================

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;
  const elapsed = startTimer();

  let importati = 0;

  // 1. Cerca su Subito.it annunci di smarrimento
  const queries = [
    "cane smarrito",
    "cane perso",
    "gatto smarrito",
    "gatto perso",
    "trovato cane",
    "trovato gatto",
  ];

  const annunci: Array<{
    titolo: string;
    descrizione: string;
    comune: string;
    provincia: string;
    tipo: "perso" | "trovato";
    specie: string;
    url: string;
  }> = [];

  for (const q of queries) {
    try {
      const risultati = await fetchSubitoAnimali({
        query: q,
        tipo: "g", // regalo/gratis — gli smarriti spesso sono in questa categoria
        limit: 5,
        specie: q.includes("gatto") ? "gatto" : "cane",
      });

      for (const r of risultati) {
        const isTrovato = q.includes("trovato");
        const lowerText = `${r.titolo} ${r.descrizione}`.toLowerCase();

        // Filtra solo annunci realmente di smarrimento
        if (
          lowerText.includes("smarrit") ||
          lowerText.includes("perso") ||
          lowerText.includes("perd") ||
          lowerText.includes("trovat") ||
          lowerText.includes("scappat") ||
          lowerText.includes("fuggit")
        ) {
          annunci.push({
            titolo: r.titolo,
            descrizione: r.descrizione,
            comune: r.comune,
            provincia: r.provincia,
            tipo: isTrovato ? "trovato" : "perso",
            specie: r.specie,
            url: r.url,
          });
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch {
      // Continua
    }
  }

  // 2. Per ogni annuncio, usa Claude per estrarre dati strutturati
  if (annunci.length > 0 && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    for (const ann of annunci.slice(0, 10)) {
      try {
        const prompt = `Analizza questo annuncio di animale ${ann.tipo === "perso" ? "smarrito" : "trovato"} e estrai i dati.

TITOLO: ${ann.titolo}
DESCRIZIONE: ${ann.descrizione}
ZONA: ${ann.comune} (${ann.provincia})

Estrai in JSON:
{
  "nome_animale": "nome se menzionato, altrimenti null",
  "specie": "cane o gatto",
  "razza": "razza se menzionata, altrimenti null",
  "colore": "colore se menzionato",
  "taglia": "piccola/media/grande se deducibile, altrimenti null",
  "descrizione_pulita": "riscrittura chiara e concisa in 2-3 frasi"
}

Se l'annuncio non e realmente di un animale smarrito/trovato, rispondi con null.`;

        const response = await askAI(prompt, 500);
        const dati = extractJSON(response) as {
          nome_animale: string | null;
          specie: string;
          razza: string | null;
          colore: string | null;
          taglia: string | null;
          descrizione_pulita: string;
        } | null;

        if (!dati) continue;

        const slug = slugify(`${ann.tipo}-${dati.nome_animale || dati.specie}-${ann.comune}-${Date.now()}`);

        // Controlla duplicati
        const { data: exists } = await supabase
          .from("sos_smarriti")
          .select("id")
          .eq("comune", ann.comune)
          .ilike("descrizione", `%${ann.titolo.slice(0, 30)}%`)
          .limit(1)
          .single();

        if (!exists) {
          await supabase.from("sos_smarriti").insert({
            tipo: ann.tipo,
            nome_animale: dati.nome_animale,
            specie: dati.specie || ann.specie,
            razza: dati.razza,
            colore: dati.colore,
            taglia: dati.taglia,
            descrizione: `${dati.descrizione_pulita}\n\n📎 Fonte: ${ann.url}`,
            data_evento: new Date().toISOString().split("T")[0],
            comune: ann.comune,
            provincia: ann.provincia,
            nome_contatto: "Da Subito.it",
            telefono_contatto: "Vedi annuncio originale",
          });
          importati++;
        }
      } catch {
        // Continua
      }
    }
  }

  await logAgent({
    agente: "monitor",
    stato: importati > 0 ? "ok" : annunci.length > 0 ? "parziale" : "errore",
    risultati_trovati: annunci.length,
    risultati_salvati: importati,
    durata_ms: elapsed(),
  });

  return NextResponse.json({
    success: true,
    agente: "monitor",
    annunci_trovati: annunci.length,
    importati,
  });
}
