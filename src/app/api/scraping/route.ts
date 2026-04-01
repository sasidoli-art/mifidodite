import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

// API endpoint chiamata da n8n dopo lo scraping
// Riceve un array di strutture estratte e le salva/aggiorna nel DB

interface ScrapedStruttura {
  nome: string;
  categoria: string;
  tipo_animale?: string;
  indirizzo?: string;
  cap?: string;
  comune: string;
  provincia?: string;
  regione?: string;
  telefono?: string;
  email?: string;
  sito_web?: string;
  facebook_url?: string;
  instagram_url?: string;
  google_maps_url?: string;
  descrizione?: string;
  servizi?: string[];
  prezzi_indicativi?: Record<string, string>;
  orari_apertura?: Record<string, string>;
  taglie_accettate?: string[];
  fonte_url?: string;
}

export async function POST(request: NextRequest) {
  // Auth check semplice con API key
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await request.json();
  const { strutture, fonte }: { strutture: ScrapedStruttura[]; fonte: string } = body;

  if (!strutture?.length) {
    return NextResponse.json({ error: "Nessuna struttura fornita" }, { status: 400 });
  }

  const supabase = await createClient();
  let nuove = 0;
  let aggiornate = 0;
  let errori = 0;

  for (const s of strutture) {
    try {
      if (!s.nome || !s.comune) {
        errori++;
        continue;
      }

      const slug = slugify(`${s.nome}-${s.comune}`);

      // Controlla se esiste gia (per slug o combinazione nome+comune)
      const { data: esistente } = await supabase
        .from("strutture")
        .select("id")
        .or(`slug.eq.${slug},and(nome.ilike.%${s.nome}%,comune.ilike.%${s.comune}%)`)
        .limit(1)
        .single();

      if (esistente) {
        // Aggiorna solo i campi non nulli
        await supabase
          .from("strutture")
          .update({
            telefono: s.telefono || undefined,
            email: s.email || undefined,
            sito_web: s.sito_web || undefined,
            facebook_url: s.facebook_url || undefined,
            instagram_url: s.instagram_url || undefined,
            servizi: s.servizi?.length ? s.servizi : undefined,
            prezzi_indicativi: s.prezzi_indicativi || undefined,
            ultimo_scraping: new Date().toISOString(),
            dati_grezzi_scraping: s,
          })
          .eq("id", esistente.id);
        aggiornate++;
      } else {
        // Inserisci nuova
        await supabase.from("strutture").insert({
          nome: s.nome,
          slug,
          categoria: s.categoria as never,
          tipo_animale: (s.tipo_animale || "entrambi") as never,
          descrizione: s.descrizione || null,
          indirizzo: s.indirizzo || null,
          cap: s.cap || null,
          comune: s.comune,
          provincia: s.provincia || null,
          regione: s.regione || null,
          telefono: s.telefono || null,
          email: s.email || null,
          sito_web: s.sito_web || null,
          facebook_url: s.facebook_url || null,
          instagram_url: s.instagram_url || null,
          google_maps_url: s.google_maps_url || null,
          servizi: s.servizi || [],
          prezzi_indicativi: s.prezzi_indicativi || {},
          orari_apertura: s.orari_apertura || {},
          taglie_accettate: s.taglie_accettate || [],
          fonte: (fonte || "scraping_facebook") as never,
          fonte_url: s.fonte_url || null,
          ultimo_scraping: new Date().toISOString(),
          dati_grezzi_scraping: s,
        });
        nuove++;
      }
    } catch {
      errori++;
    }
  }

  // Log dello scraping
  await supabase.from("scraping_log").insert({
    fonte: (fonte || "scraping_facebook") as never,
    strutture_trovate: strutture.length,
    strutture_nuove: nuove,
    strutture_aggiornate: aggiornate,
    errori,
    completato_il: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    totale: strutture.length,
    nuove,
    aggiornate,
    errori,
  });
}
