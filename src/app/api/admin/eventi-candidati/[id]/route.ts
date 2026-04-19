import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDB } from "@/lib/db";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

const AUTH_COOKIE = "mifidodite-session";

async function checkAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE);
  if (!session?.value) return false;
  try {
    const data = JSON.parse(Buffer.from(session.value, "base64").toString());
    return data.ruolo === "admin";
  } catch {
    return false;
  }
}

interface Candidato {
  id: string;
  titolo_raw: string;
  descrizione_raw: string | null;
  citta: string | null;
  regione: string | null;
  data_evento: string | null;
  data_evento_fine: string | null;
  categoria: string | null;
  fonte_url: string;
  stato: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const action = body.action as "approve" | "reject";

  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ error: "Azione non valida" }, { status: 400 });
  }

  const sql = getDB();

  const rows = await sql`SELECT * FROM eventi_candidati WHERE id = ${id} LIMIT 1`;
  if (rows.length === 0) {
    return NextResponse.json({ error: "Candidato non trovato" }, { status: 404 });
  }
  const c = rows[0] as unknown as Candidato;

  if (c.stato !== "pending") {
    return NextResponse.json({ error: `Stato gia ${c.stato}, nessuna modifica` }, { status: 409 });
  }

  if (action === "reject") {
    await sql`
      UPDATE eventi_candidati
      SET stato = 'rejected', reviewed_at = NOW()
      WHERE id = ${id}
    `;
    return NextResponse.json({ success: true, stato: "rejected" });
  }

  // action === "approve" — promuovi in `eventi`
  const tipo = c.categoria === "gatti" ? "evento" : "evento";
  const slugBase = slugify(`${c.titolo_raw}-${c.citta || "italia"}`).slice(0, 250);

  // Risolvi collisioni di slug
  let slug = slugBase;
  let suffix = 2;
  while (true) {
    const exists = await sql`SELECT id FROM eventi WHERE slug = ${slug} LIMIT 1`;
    if (exists.length === 0) break;
    slug = `${slugBase}-${suffix++}`;
    if (suffix > 20) break;
  }

  const inserted = await sql`
    INSERT INTO eventi (
      titolo, slug, tipo, data_inizio, data_fine,
      citta, regione, sommario, fonte_url, attivo
    ) VALUES (
      ${c.titolo_raw}, ${slug}, ${tipo},
      ${c.data_evento}, ${c.data_evento_fine},
      ${c.citta}, ${c.regione},
      ${c.descrizione_raw?.slice(0, 2000) || null},
      ${c.fonte_url}, TRUE
    )
    RETURNING id
  `;
  const eventoId = (inserted[0] as { id: string }).id;

  await sql`
    UPDATE eventi_candidati
    SET stato = 'published', reviewed_at = NOW(), promosso_evento_id = ${eventoId}
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true, stato: "published", evento_id: eventoId, slug });
}
