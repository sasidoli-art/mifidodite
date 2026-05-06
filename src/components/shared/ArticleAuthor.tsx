import { AUTORI } from "@/lib/autori";

interface ArticleAuthorProps {
  autoreId: string;
  data?: string;
  tempoLettura?: string;
}

export function ArticleAuthor({ autoreId, data, tempoLettura }: ArticleAuthorProps) {
  const autore = AUTORI[autoreId] || AUTORI["team-mifidodite"];

  return (
    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
      {autore.foto && (
        <img
          src={autore.foto}
          alt={autore.nome}
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{autore.nome}</p>
        <p className="text-xs text-muted-foreground">{autore.titolo}</p>
        {(data || tempoLettura) && (
          <p className="text-xs text-muted-foreground mt-1">
            {data && <span>{data}</span>}
            {data && tempoLettura && <span> • </span>}
            {tempoLettura && <span>{tempoLettura} min</span>}
          </p>
        )}
      </div>
    </div>
  );
}
