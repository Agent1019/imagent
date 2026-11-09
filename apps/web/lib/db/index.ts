import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Singleton database connection for serverless (Vercel) environments.
 *
 * Uses Supabase Transaction Pooler URL for connection pooling.
 * Get your pooler URL from: Supabase Dashboard → Settings → Database → Connection string → Transaction pooler
 *
 * Required env var:
 *   DATABASE_URL — Supabase transaction pooler connection string
 *                  e.g. postgresql://postgres.[project-ref]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
 *
 * If DATABASE_URL is not set, db will be null and the data service
 * layer will return empty results (graceful degradation).
 */
const globalForDb = globalThis as typeof globalThis & {
  _sql: ReturnType<typeof postgres> | undefined;
  _db: PostgresJsDatabase<typeof schema> | null | undefined;
};

function createDb(): PostgresJsDatabase<typeof schema> | null {
  const url = process.env.DATABASE_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[db] DATABASE_URL not set — data layer running in offline mode."
      );
    }
    return null;
  }
  const sql = postgres(url, {
    max: 5, // Allow parallel queries (e.g. Promise.all in getPackages). max:1 deadlocks concurrent queries.
    connect_timeout: 15,
  });
  return drizzle(sql, { schema });
}

export const db = globalForDb._db !== undefined ? globalForDb._db : createDb();

if (process.env.NODE_ENV !== "production") {
  globalForDb._db = db;
}

/** Returns true if database is connected and available. */
export function isDbConnected(): boolean {
  return db !== null;
}

/** Returns the db instance, asserting it is connected. Use after isDbConnected() guard. */
export function getDb(): PostgresJsDatabase<typeof schema> {
  if (!db) throw new Error("Database not connected");
  return db;
}
