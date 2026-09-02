/**
 * Componente per inserire JSON-LD schema nel <head> della pagina
 * Usa dangerouslySetInnerHTML per renderizzare il JSON correttamente
 */

interface JsonLdSchemaProps {
  data: object | object[];
}

export function JsonLdSchema({ data }: JsonLdSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(data) ? data : [data]),
      }}
    />
  );
}
