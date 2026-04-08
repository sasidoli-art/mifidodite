import { getDB } from "@/lib/db";
import { MessageSquare, Mail, Clock, User as UserIcon, Globe } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Chat MiFido — Admin MifidoDiTe" };

interface ChatRow {
  id: number;
  session_id: string;
  user_message: string;
  bot_response: string;
  user_pseudonym: string | null;
  user_nome: string | null;
  user_email: string | null;
  newsletter_signup: boolean;
  page_url: string | null;
  response_ms: number | null;
  model: string;
  created_at: string;
}

async function getStats() {
  const sql = getDB();
  const totale = await sql`SELECT count(*)::int as n FROM chat_conversazioni`;
  const oggi = await sql`SELECT count(*)::int as n FROM chat_conversazioni WHERE created_at >= CURRENT_DATE`;
  const ultimi7g = await sql`SELECT count(*)::int as n FROM chat_conversazioni WHERE created_at >= NOW() - INTERVAL '7 days'`;
  const sessioniUniche = await sql`SELECT count(DISTINCT session_id)::int as n FROM chat_conversazioni`;
  const conEmail = await sql`SELECT count(*)::int as n FROM chat_conversazioni WHERE user_email IS NOT NULL`;
  const newsletter = await sql`SELECT count(DISTINCT user_email)::int as n FROM chat_conversazioni WHERE newsletter_signup = true`;
  const tempoMedio = await sql`SELECT COALESCE(AVG(response_ms)::int, 0) as ms FROM chat_conversazioni WHERE response_ms IS NOT NULL`;

  return {
    totale: totale[0].n,
    oggi: oggi[0].n,
    ultimi7g: ultimi7g[0].n,
    sessioniUniche: sessioniUniche[0].n,
    conEmail: conEmail[0].n,
    newsletter: newsletter[0].n,
    tempoMedio: tempoMedio[0].ms,
  };
}

async function getChatList(limit: number = 100) {
  const sql = getDB();
  const rows = await sql`
    SELECT id, session_id, user_message, bot_response, user_pseudonym,
           user_nome, user_email, newsletter_signup, page_url, response_ms, model, created_at
    FROM chat_conversazioni
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows as unknown as ChatRow[];
}

export default async function AdminChatPage() {
  const [stats, chats] = await Promise.all([getStats(), getChatList(100)]);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Chat MiFido</h1>
        <p className="text-muted-foreground mt-2">
          Conversazioni con l&apos;assistente AI MiFido. Retention 30 giorni (GDPR).
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard icon={MessageSquare} label="Totale messaggi" value={stats.totale} />
        <StatCard icon={Clock} label="Ultimi 7 giorni" value={stats.ultimi7g} />
        <StatCard icon={UserIcon} label="Sessioni uniche" value={stats.sessioniUniche} />
        <StatCard icon={Mail} label="Iscritti newsletter" value={stats.newsletter} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 text-sm">
        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-muted-foreground text-xs">Messaggi oggi</p>
          <p className="font-bold text-foreground text-lg">{stats.oggi}</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-muted-foreground text-xs">Con email fornita</p>
          <p className="font-bold text-foreground text-lg">{stats.conEmail}</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-muted-foreground text-xs">Tempo medio risposta</p>
          <p className="font-bold text-foreground text-lg">{(stats.tempoMedio / 1000).toFixed(1)}s</p>
        </div>
      </div>

      {/* Lista conversazioni */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h2 className="font-bold text-foreground">Ultime 100 conversazioni</h2>
        </div>

        {chats.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare size={48} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">Nessuna conversazione ancora.</p>
            <p className="text-xs text-muted-foreground mt-1">Quando qualcuno chattera con MiFido, le conversazioni appariranno qui.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {chats.map((c) => (
              <ChatRowCard key={c.id} chat={c} />
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-6">
        Le conversazioni vengono cancellate automaticamente dopo 30 giorni (GDPR Art. 5)
      </p>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof MessageSquare; label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-border">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon size={22} className="text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}

function ChatRowCard({ chat: c }: { chat: ChatRow }) {
  const data = new Date(c.created_at);
  const dataStr = data.toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4 hover:bg-muted/20 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {c.user_nome ? (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
              <UserIcon size={13} className="text-primary" />
              {c.user_nome}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground font-mono">{c.user_pseudonym}</span>
          )}

          {c.user_email && (
            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
              <Mail size={10} />
              {c.user_email}
            </span>
          )}

          {c.newsletter_signup && (
            <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">
              📬 Newsletter
            </span>
          )}

          {c.page_url && c.page_url !== "/" && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Globe size={10} />
              {c.page_url}
            </span>
          )}
        </div>

        <div className="text-xs text-muted-foreground shrink-0">
          {dataStr}
          {c.response_ms && (
            <span className="ml-2 text-muted-foreground/60">
              {(c.response_ms / 1000).toFixed(1)}s
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="bg-primary/5 border-l-2 border-primary rounded-r-lg p-2.5">
          <p className="text-foreground">{c.user_message}</p>
        </div>
        <div className="bg-muted/40 rounded-lg p-2.5">
          <p className="text-foreground/80 whitespace-pre-wrap">{c.bot_response}</p>
        </div>
      </div>
    </div>
  );
}
