"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, PawPrint, Loader2, Mail, User } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "mifidodite-chat";
const SESSION_KEY = "mifidodite-chat-session";
const CONSENT_KEY = "mifidodite-chat-consent";
const USER_INFO_KEY = "mifidodite-chat-user";

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Ciao! 🐾 Sono **MiFido**, l'assistente AI di MifidoDiTe.eu. Posso aiutarti a trovare articoli, professionisti pet o offerte. **Non sono un veterinario** — per la salute del tuo animale rivolgiti sempre a un professionista.\n\nCosa cerchi oggi?",
};

interface UserInfo {
  name?: string;
  email?: string;
  newsletter?: boolean;
}

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
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formNewsletter, setFormNewsletter] = useState(false);
  const [formGdpr, setFormGdpr] = useState(false);
  const [formError, setFormError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isHidden =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/dashboard") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

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
      } catch { /* ignora */ }
    }

    const userStored = localStorage.getItem(USER_INFO_KEY);
    if (userStored) {
      try {
        setUserInfo(JSON.parse(userStored) as UserInfo);
      } catch { /* ignora */ }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (messages.length > 1) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open && consentGiven) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, consentGiven]);

  function startChat(asGuest: boolean) {
    setFormError("");

    if (asGuest) {
      // Skip form, entra come ospite
      setConsentGiven(true);
      localStorage.setItem(CONSENT_KEY, "true");
      return;
    }

    // Validazione form
    if (!formGdpr) {
      setFormError("Devi accettare la Privacy Policy per continuare.");
      return;
    }
    if (!formName.trim()) {
      setFormError("Inserisci almeno il tuo nome.");
      return;
    }
    if (formEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) {
      setFormError("Email non valida.");
      return;
    }

    const newUserInfo: UserInfo = {
      name: formName.trim(),
      email: formEmail.trim() || undefined,
      newsletter: formNewsletter,
    };

    setUserInfo(newUserInfo);
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(newUserInfo));

    // Personalizza il messaggio di benvenuto col nome
    setMessages([
      {
        role: "assistant",
        content: `Ciao **${newUserInfo.name}**! 🐾 Piacere di conoscerti. Sono **MiFido**, l'assistente AI di MifidoDiTe.eu. **Non sono un veterinario**, ma posso aiutarti a trovare articoli, professionisti o offerte pet. Cosa cerchi?`,
      },
    ]);

    setConsentGiven(true);
    localStorage.setItem(CONSENT_KEY, "true");
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
          userName: userInfo.name,
          userEmail: userInfo.email,
          newsletterSignup: userInfo.newsletter && newMessages.length === 1,
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
        <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[400px] h-[calc(100vh-4rem)] sm:h-[640px] max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 flex items-center justify-between shrink-0">
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

          {/* SCHERMATA BENVENUTO con form opzionale */}
          {!consentGiven && (
            <div className="flex-1 overflow-y-auto p-5">
              <div className="text-center mb-5">
                <div className="text-4xl mb-2">🐾</div>
                <h4 className="font-bold text-foreground text-lg">Ciao! Sono MiFido</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Presentati e iniziamo a chattare
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); startChat(false); }} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-foreground/70 block mb-1">Il tuo nome</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Mario"
                      maxLength={50}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-muted/30 outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground/70 block mb-1">Email (opzionale)</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="mario@esempio.it"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-muted/30 outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                    />
                  </div>
                </div>

                {/* Newsletter checkbox - solo se ha messo email */}
                {formEmail && (
                  <label className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formNewsletter}
                      onChange={(e) => setFormNewsletter(e.target.checked)}
                      className="mt-0.5 accent-primary shrink-0"
                    />
                    <div className="text-xs text-foreground/80 leading-snug">
                      <strong>📬 Iscrivimi alla newsletter</strong>
                      <br />
                      Ricevi 3 articoli pet selezionati + offerte ogni settimana. Puoi disiscriverti in qualsiasi momento.
                    </div>
                  </label>
                )}

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formGdpr}
                    onChange={(e) => setFormGdpr(e.target.checked)}
                    className="mt-0.5 accent-primary shrink-0"
                  />
                  <div className="text-xs text-muted-foreground leading-snug">
                    Accetto la{" "}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      Privacy Policy
                    </a>
                    . Le conversazioni vengono salvate per 30 giorni in modo pseudonimo.
                  </div>
                </label>

                {formError && <p className="text-xs text-red-500">{formError}</p>}

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-colors text-sm"
                >
                  Inizia la chat →
                </button>
              </form>

              <div className="text-center mt-4 pt-4 border-t border-border">
                <button
                  onClick={() => startChat(true)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Continua come ospite (senza dati)
                </button>
              </div>
            </div>
          )}

          {/* MESSAGGI */}
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

              <form onSubmit={sendMessage} className="border-t border-border p-3 bg-white shrink-0">
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
