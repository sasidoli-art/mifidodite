import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/json-ld";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface Props {
  items: BreadcrumbItem[];
  dark?: boolean;
}

export function Breadcrumbs({ items, dark = false }: Props) {
  // Prepend Home se non gia' presente
  const fullItems: BreadcrumbItem[] =
    items[0]?.url === "/" ? items : [{ name: "Home", url: "/" }, ...items];

  const textClass = dark ? "text-white/70" : "text-muted-foreground";
  const linkClass = dark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-primary";
  const currentClass = dark ? "text-white font-medium" : "text-foreground font-medium";
  const sepClass = dark ? "text-white/40" : "text-muted-foreground/50";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(fullItems))}
      />
      <nav aria-label="Breadcrumb" className={`text-sm ${textClass}`}>
        <ol className="flex items-center flex-wrap gap-1.5">
          {fullItems.map((item, i) => {
            const isLast = i === fullItems.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-1.5">
                {isLast ? (
                  <span className={currentClass}>{item.name}</span>
                ) : (
                  <Link
                    href={item.url}
                    className={`inline-flex items-center gap-1 ${linkClass} transition-colors`}
                  >
                    {i === 0 && <Home size={13} />}
                    {item.name}
                  </Link>
                )}
                {!isLast && <ChevronRight size={13} className={sepClass} />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
