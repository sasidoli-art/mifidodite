"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, PawPrint, Loader2 } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "mifidodite-chat";
const SESSION_KEY = "mifidodite-chat-session";
const CONSENT_KEY = "mifidodite-chat-consent";

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Ciao! 🐾 Sono **MiFido**, l'assistente AI di MifidoDiTe.eu. Posso aiutarti a trovare articoli, professionisti pet o offerte. **Non sono un veterinario** — per la salute del tuo animale rivolgiti sempre a un professionista.\n\nCosa cerchi oggi?",
};

function generateSessionId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function ChatBot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Non mostrare su admin, login, dashboard (DOPO gli hooks per rispettare regole React)
  const isHidden =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/dashboard") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  // Carica session, consenso e messaggi da localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = generateSessionId();
      localStorage.setItem(SESSION_KEY, sid);
    }
    setSessionId(sid);

    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "true") setConsentGiven(true);

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      } catch {
        // ignora
      }
    }
  }, []);

  // Salva messaggi
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (messages.length > 1) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    }
  }, [messages]);

  // Auto-scroll in fondo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input quando si apre
  useEffect(() => {
    if (open && consentGiven) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, consentGiven]);

  function acceptConsent() {
    setConsentGiven(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(CONSENT_KEY, "true");
    }
  }

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          messages: newMessages,
          pageUrl: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Mi dispiace, ho avuto un problema." },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Errore di connessione. Riprova tra poco." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    setMessages([WELCOME_MESSAGE]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  // Format markdown semplice (grassetto + link)
  function formatMessage(text: string): React.ReactNode {
    const parts: React.ReactNode[] = [];
    const lines = text.split("\n");
    lines.forEach((line, lineIdx) => {
      if (lineIdx > 0) parts.push(<br key={`br-${lineIdx}`} />);

      const segments = line.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g);
      segments.forEach((seg, segIdx) => {
        const key = `${lineIdx}-${segIdx}`;
        if (seg.startsWith("**") && seg.endsWith("**")) {
          parts.push(<strong key={key}>{seg.slice(2, -2)}</strong>);
        } else if (seg.startsWith("http")) {
          parts.push(
            <a key={key} href={seg} target="_blank" rel="noopener noreferrer" className="text-primary underline break-all">
              {seg}
            </a>
          );
        } else {
          parts.push(seg);
        }
      });
    });
    return parts;
  }

  if (isHidden) return null;

  return (
    <>
      {/* Bottone fluttuante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 group"
          aria-label="Apri chat con MiFido"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            <div className="relative bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-all hover:scale-110">
              <MessageCircle size={24} />
            </div>
          </div>
          <div className="absolute bottom-full right-0 mb-2 bg-white text-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
            Chiedi a MiFido 🐾
          </div>
        </button>
      )}

      {/* Finestra chat */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[400px] h-[calc(100vh-4rem)] sm:h-[600px] max-h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <PawPrint size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">MiFido</h3>
                <p className="text-xs text-white/80">Assistente AI · MifidoDiTe.eu</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Chiudi chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Consenso GDPR (primo accesso) */}
          {!consentGiven && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h4 className="font-bold text-foreground mb-2">Prima di iniziare</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                MiFido e un&apos;assistente AI. Le tue conversazioni vengono salvate in modo anonimo per 30 giorni
                per migliorare il servizio (nessun dato personale viene raccolto).
              </p>
              <p className="text-xs text-muted-foreground mb-5">
                Per dettagli leggi la{" "}
                <a href="/privacy" className="text-primary underline" target="_blank">
                  Privacy Policy
                </a>
                .
              </p>
              <button
                onClick={acceptConsent}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors w-full"
              >
                Accetto e inizio la chat
              </button>
              <button onClick={() => setOpen(false)} className="mt-3 text-xs text-muted-foreground hover:underline">
                Annulla
              </button>
            </div>
          )}

          {/* Messaggi */}
          {consentGiven && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-br-md"
                          : "bg-white text-foreground rounded-bl-md border border-border"
                      }`}
                    >
                      {formatMessage(msg.content)}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3">
                      <Loader2 size={16} className="animate-spin text-primary" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="border-t border-border p-3 bg-white">
                <div className="flex gap-2 items-end">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Scrivi un messaggio..."
                    rows={1}
                    maxLength={2000}
                    className="flex-1 resize-none px-3 py-2 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30 text-sm max-h-24"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="bg-primary hover:bg-primary-dark text-white p-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    aria-label="Invia messaggio"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
                  <button onClick={clearChat} type="button" className="hover:text-foreground transition-colors">
                    Pulisci chat
                  </button>
                  <span>🤖 AI · Non sono un veterinario</span>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
