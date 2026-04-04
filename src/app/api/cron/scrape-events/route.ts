import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { scrapeVacanzeAnimali, scrapeClinicheH24 } from "@/lib/scraper";
import { slugify } from "@/lib/utils";
import { verifyCron } from "@/lib/cron-auth";

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;
  const supabase = await createClient();
  let nuovi = 0;
  let errori = 0;

  // 1. Scrape eventi da vacanzeanimali.it
  try {
    const eventi = await scrapeVacanzeAnimali();
    for (const e of eventi) {
      if (!e.titolo) continue;
      const slug = slugify(`${e.titolo}-${e.citta || "italia"}`);

      const { data: exists } = await supabase
        .from("eventi")
        .select("id")
        .eq("slug", slug)
        .limit(1)
        .single();

      if (!exists) {
        await supabase.from("eventi").insert({
          titolo: e.titolo,
          slug,
          tipo: e.tipo,
          data_inizio: e.data || null,
          citta: e.citta || null,
          regione: e.regione || null,
          sommario: e.sommario || null,
          fonte_url: e.fonte_url,
          organizzatore: e.organizzatore || null,
          prezzo: e.prezzo || null,
        });
        nuovi++;
      }
    }
  } catch {
    errori++;
  }

  // 2. Scrape cliniche H24
  try {
    const cliniche = await scrapeClinicheH24();
    for (const c of cliniche) {
      if (!c.nome) continue;
      const slug = slugify(`${c.nome}-${c.citta || "italia"}`);

      const { data: exists } = await supabase
        .from("eventi")
        .select("id")
        .eq("slug", slug)
        .limit(1)
        .single();

      if (!exists) {
        await supabase.from("eventi").insert({
          titolo: c.nome,
          slug,
          tipo: c.tipo,
          citta: c.citta || null,
          regione: c.regione || null,
          sommario: c.descrizione || null,
          telefono: c.telefono || null,
          fonte_url: c.fonte_url,
        });
        nuovi++;
      }
    }
  } catch {
    errori++;
  }

  return NextResponse.json({ success: true, nuovi, errori });
}
