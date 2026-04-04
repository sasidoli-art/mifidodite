// ============================================
// AI Agent — wrapper per chiamate Claude Haiku
// Usato da tutti e 5 gli agenti
// ============================================

export async function askClaude(prompt: string, maxTokens: number = 4000): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY mancante");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error: ${err}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || "";
}

// Estrai JSON da una risposta che potrebbe contenere testo extra
export function extractJSON(text: string): unknown {
  // Cerca array JSON
  const arrayMatch = text.match(/\[[\s\S]*\]/);
  if (arrayMatch) return JSON.parse(arrayMatch[0]);

  // Cerca oggetto JSON
  const objMatch = text.match(/\{[\s\S]*\}/);
  if (objMatch) return JSON.parse(objMatch[0]);

  throw new Error("Nessun JSON trovato nella risposta");
}
