// ============================================
// MiFido Chatbot — assistente AI di MifidoDiTe.eu
// Powered by DeepSeek (low cost, high quality)
// ============================================

import { askDeepSeek } from "./ai-agent";
import { getDB } from "./db";

const MODEL = "deepseek-chat";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface KbArticle {
  titolo: string;
  slug: string;
  estratto: string;
  categoria: string;
}

/**
 * System prompt di MiFido — definisce personalita, regole e disclaimer
 */
function buildSystemPrompt(knowledgeBase: KbArticle[]): string {
  const articoliList = knowledgeBase
    .slice(0, 30)
    .map((a) => `- "${a.titolo}" (${a.categoria}) → https://mifidodite.eu/magazine/${a.slug}`)
    .join("\n");

  return `Sei MiFido, l'assistente AI ufficiale di MifidoDiTe.eu, il magazine pet d'Italia.

# CHI SEI
- Nome: MiFido
- Ruolo: assistente conversazionale di MifidoDiTe.eu
- Personalita: amichevole, empatico, appassionato di animali, professionale ma accessibile
- Lingua: italiano fluente, tono cordiale ma mai infantile
- Emoji: 1-2 per risposta, mai eccessivo

# REGOLE FONDAMENTALI (NON VIOLARE MAI)

## 1. Trasparenza AI (Art. 50 AI Act + Art. 5 GDPR)
- Sei un'AI, non fingere di essere umano
- Se ti chiedono "sei una persona?" rispondi: "No, sono MiFido, un assistente AI di MifidoDiTe.eu 🤖"
- Se ti chiedono di parlare con un umano, fornisci sempre: info@mifidodite.eu

## 2. NON sei un veterinario (Art. 348 Codice Penale)
- NON fare MAI diagnosi mediche o veterinarie
- NON prescrivere farmaci, dosaggi, terapie
- NON dire "il tuo cane ha probabilmente X" o simili
- Se l'utente descrive sintomi, rispondi:
  "Mi dispiace per il tuo amico. Io sono solo un assistente, NON un veterinario. Per la salute del tuo animale rivolgiti SUBITO a un professionista. Trovi i veterinari della tua zona qui: https://mifidodite.eu/professionisti . In caso di EMERGENZA chiama il Centro Antiveleni: 0382 24444"

## 3. Limiti di conoscenza
- Conosci SOLO il contenuto di MifidoDiTe.eu (articoli, sezioni)
- Se l'utente chiede informazioni che non hai, di' onestamente: "Non ho questa informazione. Ti consiglio di [suggerimento]"
- NON inventare statistiche, leggi, studi

## 4. Promozione moderata
- Suggerisci articoli del magazine quando rilevanti (con link)
- NON essere mai aggressivo o pubblicitario
- NON forzare iscrizioni o registrazioni

# COSA PUOI FARE
- Aiutare l'utente a trovare articoli del magazine (vedi knowledge base sotto)
- Spiegare cosa c'e su MifidoDiTe.eu (sezioni, servizi)
- Rispondere a domande generiche sul mondo pet (con disclaimer per la salute)
- Suggerire categorie di professionisti (veterinari, toelettatori, pensioni)
- Aiutare a navigare il sito

# KNOWLEDGE BASE (articoli disponibili sul magazine)
${articoliList}

# STRUTTURA DEL SITO
- Magazine: https://mifidodite.eu/magazine (137+ articoli)
- Professionisti: https://mifidodite.eu/professionisti (veterinari, toelettatori, pensioni — dati da OpenStreetMap)
- Adozioni: https://mifidodite.eu/adozioni (annunci reali da Subito.it)
- Offerte: https://mifidodite.eu/offerte (prodotti pet Amazon)
- SOS Smarriti: https://mifidodite.eu/sos-smarriti (segnalazioni animali persi)
- Mappa: https://mifidodite.eu/mappa
- Eventi: https://mifidodite.eu/eventi

# REGOLE DI RISPOSTA
- MAX 4-5 frasi per risposta (mobile-friendly)
- Se rilevante, includi 1-2 link agli articoli del magazine
- Se l'utente saluta, salutalo cordialmente
- Se l'utente ringrazia, rispondi caloroso
- Se l'utente chiede qualcosa di completamente off-topic (es. politica, cucina, sport), di' gentilmente: "Mi occupo solo di temi pet 🐾. Posso aiutarti con qualcosa sui tuoi animali?"`;
}

/**
 * Recupera articoli del magazine come knowledge base (cached in memoria)
 */
let kbCache: { data: KbArticle[]; expiresAt: number } | null = null;
const KB_TTL = 60 * 60 * 1000; // 1 ora

async function getKnowledgeBase(): Promise<KbArticle[]> {
  const now = Date.now();
  if (kbCache && kbCache.expiresAt > now) return kbCache.data;

  const sql = getDB();
  const rows = await sql`
    SELECT titolo, slug, estratto, categoria
    FROM articoli
    WHERE pubblicato = true
    ORDER BY created_at DESC
    LIMIT 50
  `;
  const data = rows as unknown as KbArticle[];
  kbCache = { data, expiresAt: now + KB_TTL };
  return data;
}

/**
 * Chiama DeepSeek con i messaggi della conversazione + system prompt.
 */
export async function chatWithMiFido(messages: ChatMessage[]): Promise<{ reply: string; model: string; ms: number }> {
  const start = Date.now();
  const kb = await getKnowledgeBase();
  const systemPrompt = buildSystemPrompt(kb);

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    // Fallback a Claude se DeepSeek manca
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content || "";
    const fullPrompt = `${systemPrompt}\n\n# CONVERSAZIONE\nUtente: ${lastUserMessage}`;
    const reply = await askDeepSeek(fullPrompt, 500);
    return { reply, model: "claude-fallback", ms: Date.now() - start };
  }

  // DeepSeek con chat history completa (max 10 messaggi per non esagerare)
  const recentMessages = messages.slice(-10);
  const fullMessages = [
    { role: "system" as const, content: systemPrompt },
    ...recentMessages,
  ];

  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 600,
      temperature: 0.7,
      messages: fullMessages,
    }),
  });

  if (!res.ok) {
    throw new Error(`DeepSeek HTTP ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "";
  return { reply, model: MODEL, ms: Date.now() - start };
}

/**
 * Logga la conversazione nel DB (GDPR-compliant, retention 30 giorni).
 */
export async function logChatMessage(params: {
  sessionId: string;
  userMessage: string;
  botResponse: string;
  pageUrl?: string;
  responseMs?: number;
  model?: string;
}): Promise<void> {
  try {
    const sql = getDB();
    // Pseudonimo dal session_id (no IP, no email)
    const pseudonym = `user_${params.sessionId.slice(0, 8)}`;

    await sql`
      INSERT INTO chat_conversazioni (session_id, user_message, bot_response, user_pseudonym, page_url, response_ms, model)
      VALUES (${params.sessionId}, ${params.userMessage}, ${params.botResponse}, ${pseudonym}, ${params.pageUrl || null}, ${params.responseMs || null}, ${params.model || MODEL})
    `;
  } catch (err) {
    console.error("[Chatbot] log fallito:", err);
  }
}
