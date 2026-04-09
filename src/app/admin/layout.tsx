import Link from "next/link";
import { LogoPawDark } from "@/components/shared/Logo";
import {
  LayoutDashboard,
  Building2,
  Heart,
  MessageSquare,
  Newspaper,
  Mail,
  Tag,
  Bot,
  Database,
  Scale,
  ShoppingBag,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";

const SIDEBAR_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/agenti", label: "Agenti AI", icon: Bot },
  { href: "/admin/chat", label: "Chat Zampa", icon: MessageCircle },
  { href: "/admin/strutture", label: "Strutture", icon: Building2 },
  { href: "/admin/offerte", label: "Offerte Affiliate", icon: ShoppingBag },
  { href: "/admin/codici", label: "Codici Sconto", icon: Tag },
  { href: "/admin/adozioni", label: "Adozioni", icon: Heart },
  { href: "/admin/lead", label: "Lead", icon: MessageSquare },
  { href: "/admin/articoli", label: "Articoli", icon: Newspaper },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/export", label: "Esporta Dati", icon: Database },
  { href: "/admin/legal", label: "Compliance", icon: Scale },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground text-white shrink-0 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <LogoPawDark size={24} />
            <div>
              <span className="font-bold text-white">MiFidoDiTe<span className="text-[#FF6B35]">.eu</span></span>
              <span className="text-xs block text-white/40">Pannello Admin</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Footer sidebar */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/10 transition-colors">
            <Settings size={18} />
            Vai al sito
          </Link>
          <Link href="/login" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-white/10 transition-colors">
            <LogOut size={18} />
            Esci
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar mobile */}
        <header className="lg:hidden bg-foreground text-white p-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <LogoPawDark size={20} />
            <span className="font-bold text-sm">Admin MiFidoDiTe</span>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
