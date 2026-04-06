// ============================================
// AI Agent — wrapper multi-provider
// Claude Haiku → DeepSeek → OpenRouter (accesso a tutti i modelli)
// ============================================

export async function askAI(prompt: string, maxTokens: number = 4000): Promise<string> {
  // 1. Claude Haiku (Anthropic diretto — preciso)
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return await askClaude(prompt, maxTokens);
    } catch (err) {
      console.warn("[AI] Claude fallito:", (err as Error).message);
    }
  }

  // 2. DeepSeek (molto economico, volume)
  if (process.env.DEEPSEEK_API_KEY) {
    try {
      return await askDeepSeek(prompt, maxTokens);
    } catch (err) {
      console.warn("[AI] DeepSeek fallito:", (err as Error).message);
    }
  }

  // 3. OpenRouter (accesso a decine di modelli come fallback)
  if (process.env.OPENROUTER_API_KEY) {
    try {
      return await askOpenRouter(prompt, maxTokens);
    } catch (err) {
      console.warn("[AI] OpenRouter fallito:", (err as Error).message);
    }
  }

  throw new Error("Nessuna API AI configurata (serve ANTHROPIC_API_KEY, DEEPSEEK_API_KEY o OPENROUTER_API_KEY)");
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
    throw new Error(`Claude: ${err}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || "";
}

// DeepSeek (API compatibile OpenAI)
export async function askDeepSeek(prompt: string, maxTokens: number = 4000): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY mancante");

  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

// OpenRouter (accesso a Claude, GPT-4, Llama, Mistral, Gemini e altri)
export async function askOpenRouter(prompt: string, maxTokens: number = 4000): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY mancante");

  // Usa il modello piu economico e veloce disponibile
  // Qwen di Alibaba — economico, veloce, ottima qualita
  const model = process.env.OPENROUTER_MODEL || "qwen/qwen-2.5-72b-instruct";

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://mifidodite.eu",
      "X-Title": "MifidoDiTe.eu",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

// Estrai JSON da una risposta AI (gestisce markdown fences)
export function extractJSON(text: string): unknown {
  // Rimuovi markdown code fences
  const cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

  // Prova oggetto {...}
  const objMatch = cleaned.match(/\{[\s\S]*\}/);
  if (objMatch) {
    try { return JSON.parse(objMatch[0]); } catch { /* try array */ }
  }

  // Prova array [...]
  const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    try { return JSON.parse(arrayMatch[0]); } catch { /* give up */ }
  }

  throw new Error("Nessun JSON valido trovato nella risposta AI");
}
