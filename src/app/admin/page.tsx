import { getDB } from "@/lib/db";
import Link from "next/link";
import { Newspaper, MessageSquare, Mail, Heart, Bot, ShoppingBag, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard — Admin MifidoDiTe" };

async function getStats() {
  const sql = getDB();
  const [articoli, bozze, newsletter, lead, chat, offerte, agentLogs, sos] = await Promise.all([
    sql`SELECT count(*)::int as n FROM articoli WHERE pubblicato = true`,
    sql`SELECT count(*)::int as n FROM articoli WHERE pubblicato = false`,
    sql`SELECT count(*)::int as n FROM newsletter_iscritti WHERE attivo = true`,
    sql`SELECT count(*)::int as n FROM lead`,
    sql`SELECT count(*)::int as n FROM chat_conversazioni`,
    sql`SELECT count(*)::int as n FROM offerte WHERE attivo = true`,
    sql`SELECT count(*)::int as n FROM agent_logs WHERE created_at >= NOW() - INTERVAL '7 days'`,
    sql`SELECT count(*)::int as n FROM sos_smarriti WHERE stato = 'attivo'`,
  ]);
  return { articoli: articoli[0].n, bozze: bozze[0].n, newsletter: newsletter[0].n, lead: lead[0].n, chat: chat[0].n, offerte: offerte[0].n, agentRuns: agentLogs[0].n, sos: sos[0].n };
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const cards = [
    { label: "Articoli pubblicati", value: stats.articoli, icon: Newspaper, href: "/admin/articoli", color: "bg-green-50 text-green-700" },
    { label: "Bozze in attesa", value: stats.bozze, icon: Newspaper, href: "/admin/articoli", color: stats.bozze > 0 ? "bg-amber-50 text-amber-700" : "bg-muted text-muted-foreground", badge: stats.bozze > 0 },
    { label: "Iscritti newsletter", value: stats.newsletter, icon: Mail, href: "/admin/newsletter", color: "bg-blue-50 text-blue-700" },
    { label: "Lead ricevuti", value: stats.lead, icon: MessageSquare, href: "/admin/lead", color: "bg-purple-50 text-purple-700" },
    { label: "Chat Zampa", value: stats.chat, icon: MessageCircle, href: "/admin/chat", color: "bg-orange-50 text-orange-700" },
    { label: "Offerte attive", value: stats.offerte, icon: ShoppingBag, href: "/admin/offerte", color: "bg-emerald-50 text-emerald-700" },
    { label: "Agent runs (7gg)", value: stats.agentRuns, icon: Bot, href: "/admin/agenti", color: "bg-indigo-50 text-indigo-700" },
    { label: "SOS smarriti attivi", value: stats.sos, icon: Heart, href: "/admin", color: "bg-red-50 text-red-700" },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Panoramica MifidoDiTe.eu — dati in tempo reale dal database</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className={`relative ${c.color} rounded-2xl p-5 hover:shadow-md transition-all`}>
            {c.badge && <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />}
            <c.icon size={22} className="mb-2 opacity-70" />
            <p className="text-3xl font-bold">{c.value}</p>
            <p className="text-xs font-medium mt-1 opacity-70">{c.label}</p>
          </Link>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="font-bold text-foreground mb-4">Azioni rapide</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {stats.bozze > 0 && (
            <Link href="/admin/articoli" className="bg-amber-50 border border-amber-200 rounded-xl p-4 hover:shadow-sm transition-all">
              <p className="font-bold text-amber-800">{stats.bozze} bozze da approvare</p>
              <p className="text-xs text-amber-700 mt-1">Clicca per revisare e pubblicare</p>
            </Link>
          )}
          <Link href="/admin/chat" className="bg-orange-50 border border-orange-200 rounded-xl p-4 hover:shadow-sm transition-all">
            <p className="font-bold text-orange-800">Chat Zampa</p>
            <p className="text-xs text-orange-700 mt-1">Conversazioni degli utenti</p>
          </Link>
          <Link href="/admin/agenti" className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 hover:shadow-sm transition-all">
            <p className="font-bold text-indigo-800">Agenti AI</p>
            <p className="text-xs text-indigo-700 mt-1">Stato delle automazioni</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
