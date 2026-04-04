// ============================================
// AI Agent — wrapper multi-provider
// Supporta: Claude Haiku (Anthropic) + Grok (xAI)
// Usa Claude come primario, Grok come fallback
// ============================================

// Chiama l'AI migliore disponibile
export async function askAI(prompt: string, maxTokens: number = 4000): Promise<string> {
  // Prova Claude prima (piu economico e preciso per i nostri usi)
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return await askClaude(prompt, maxTokens);
    } catch (err) {
      console.warn("[AI] Claude fallito, provo Grok:", (err as Error).message);
    }
  }

  // Fallback su Grok
  if (process.env.GROK_API_KEY) {
    try {
      return await askGrok(prompt, maxTokens);
    } catch (err) {
      console.error("[AI] Anche Grok fallito:", (err as Error).message);
    }
  }

  throw new Error("Nessuna API AI configurata (serve ANTHROPIC_API_KEY o GROK_API_KEY)");
}

// Claude Haiku (Anthropic)
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

// Grok (xAI) — compatibile con API OpenAI
export async function askGrok(prompt: string, maxTokens: number = 4000): Promise<string> {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) throw new Error("GROK_API_KEY mancante");

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-3-mini-fast",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Grok API error: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
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
