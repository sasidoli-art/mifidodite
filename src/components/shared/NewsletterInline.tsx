import { Mail } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  source?: string;
  compact?: boolean;
  buttonText?: string;
}

// Newsletter signup temporaneamente sospeso. Il componente resta presente
// per non rompere import esistenti ma mostra solo un messaggio statico.
export function NewsletterInline({
  title = "Newsletter in pausa",
  compact = false,
}: Props) {
  return (
    <div className={`bg-muted/40 border border-border rounded-2xl ${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-center gap-2 mb-2">
        <Mail size={16} className="text-muted-foreground" />
        <h3 className={`font-bold text-foreground ${compact ? "text-sm" : "text-base"}`}>{title}</h3>
      </div>
      <p className={`text-muted-foreground leading-snug ${compact ? "text-xs" : "text-sm"}`}>
        Stiamo aggiornando il progetto. Le nuove iscrizioni sono temporaneamente sospese — torna a trovarci presto.
      </p>
    </div>
  );
}
