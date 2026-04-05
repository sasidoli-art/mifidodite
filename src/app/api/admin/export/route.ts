import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

// API di esportazione dati — per adempimento Art. 15 GDPR (diritto di accesso)
// e per fornire dati agli enti di controllo (Garante, GdF)
//
// Protetta: richiede sessione admin valida (cookie)
// Formati: JSON
//
// Parametro: ?table=newsletter|lead|strutture|articoli|eventi|cliniche|offerte|adozioni|sos|codici|agent_logs

export const dynamic = "force-dynamic";

const TABELLE_CONSENTITE = [
  "newsletter_iscritti",
  "lead",
  "strutture",
  "articoli",
  "eventi",
  "cliniche",
  "offerte",
  "annunci_adozioni",
  "sos_smarriti",
  "codici_sconto",
  "agent_logs",
  "social_posts",
];

const TABLE_MAP: Record<string, string> = {
  newsletter: "newsletter_iscritti",
  lead: "lead",
  strutture: "strutture",
  articoli: "articoli",
  eventi: "eventi",
  cliniche: "cliniche",
  offerte: "offerte",
  adozioni: "annunci_adozioni",
  sos: "sos_smarriti",
  codici: "codici_sconto",
  agent_logs: "agent_logs",
  social: "social_posts",
};

export async function GET(request: NextRequest) {
  // Verifica auth admin
  const session = request.cookies.get("mifidodite-admin-session");
  if (!session?.value || session.value.length !== 64 || !/^[a-f0-9]+$/.test(session.value)) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Database non configurato" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const tableParam = searchParams.get("table") || "";
  const emailFilter = searchParams.get("email") || ""; // Per richieste Art. 15 specifiche

  const tableName = TABLE_MAP[tableParam];
  if (!tableName || !TABELLE_CONSENTITE.includes(tableName)) {
    return NextResponse.json({
      error: "Tabella non valida",
      tabelle_disponibili: Object.keys(TABLE_MAP),
    }, { status: 400 });
  }

  try {
    const sql = postgres(process.env.DATABASE_URL);

    let rows;
    if (emailFilter) {
      rows = await sql.unsafe(`SELECT * FROM ${tableName} WHERE email ILIKE $1 OR email_contatto ILIKE $1 ORDER BY created_at DESC LIMIT 1000`, [`%${emailFilter}%`]);
    } else {
      rows = await sql.unsafe(`SELECT * FROM ${tableName} ORDER BY created_at DESC LIMIT 1000`);
    }
    await sql.end();

    const now = new Date().toISOString().split("T")[0];

    return NextResponse.json({
      export_date: now,
      table: tableName,
      total_records: rows.length,
      filter: emailFilter || "nessuno",
      gdpr_note: "Dati esportati ai sensi dell'Art. 15 GDPR (diritto di accesso) e per adempimenti verso autorita di controllo.",
      data: rows,
    }, {
      headers: {
        "Content-Disposition": `attachment; filename="mifidodite-${tableParam}-${now}.json"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Errore esportazione: " + String(err) }, { status: 500 });
  }
}
