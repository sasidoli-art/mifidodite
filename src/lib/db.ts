import { neon } from "@neondatabase/serverless";

export function getDB() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL non configurata");
  return neon(url);
}
