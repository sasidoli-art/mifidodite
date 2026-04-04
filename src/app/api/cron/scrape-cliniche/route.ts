import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cercaClinicheGoogle, CITTA_ITALIANE, REGIONI } from "@/lib/scraper-google";
import { slugify } from "@/lib/utils";
import { verifyCron } from "@/lib/cron-auth";

// Vercel Cron: ogni sabato alle 5:00
// Scrapa una regione per volta (rotazione settimanale)

const TIPI_RICERCA = [
  "clinica veterinaria",
  "ambulatorio veterinario",
  "pronto soccorso veterinario",
  "rifugio animali",
  "canile comunale",
] as const;

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;

  const supabase = await createClient();

  // Determina quale regione scrapare questa settimana
  const settimana = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const regioneIndex = settimana % REGIONI.length;
  const regione = REGIONI[regioneIndex];
  const citta = CITTA_ITALIANE[regione] || [];

  let nuove = 0;
  let errori = 0;

  for (const { citta: nomeCitta, prov } of citta) {
    for (const tipo of TIPI_RICERCA) {
      try {
        const risultati = await cercaClinicheGoogle(nomeCitta, prov, regione, tipo);

        for (const r of risultati) {
          if (!r.nome) continue;

          const slug = slugify(`${r.nome}-${r.comune}`);

          // Controlla duplicati
          const { data: exists } = await supabase
            .from("cliniche")
            .select("id")
            .eq("slug", slug)
            .limit(1)
            .single();

          if (!exists) {
            const h24 = r.nome.toLowerCase().includes("h24") ||
              r.nome.toLowerCase().includes("24 ore") ||
              tipo === "pronto soccorso veterinario";

            await supabase.from("cliniche").insert({
              nome: r.nome,
              slug,
              tipo: tipo === "pronto soccorso veterinario" ? "pronto_soccorso"
                : tipo === "clinica veterinaria" ? "clinica"
                : tipo === "ambulatorio veterinario" ? "ambulatorio"
                : tipo === "rifugio animali" ? "rifugio"
                : "canile",
              indirizzo: r.indirizzo !== r.comune ? r.indirizzo : null,
              comune: r.comune,
              provincia: r.provincia,
              regione: r.regione,
              telefono: r.telefono,
              h24,
              emergenza: h24 || (tipo as string).includes("pronto soccorso"),
              fonte: "google",
            });
            nuove++;
          }
        }

        // Pausa tra le ricerche per non sovraccaricare
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch {
        errori++;
      }
    }
  }

  return NextResponse.json({
    success: true,
    regione,
    citta_analizzate: citta.length,
    nuove,
    errori,
  });
}
