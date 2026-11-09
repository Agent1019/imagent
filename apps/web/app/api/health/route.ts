import { NextResponse } from "next/server";
import { isDbConnected, getDb } from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/health
 *
 * Health check endpoint. Verifies database connectivity.
 */
export async function GET() {
  const checks: Record<string, string> = {
    status: "ok",
    timestamp: new Date().toISOString(),
    database: "disconnected",
  };

  if (isDbConnected()) {
    try {
      const db = getDb();
      const { sql } = await import("drizzle-orm");
      const result = await db.execute(sql`SELECT 1`);
      checks.database = result ? "connected" : "no result";
    } catch (error) {
      checks.database = `error: ${(error as Error).message}`;
      checks.status = "degraded";
    }
  } else {
    checks.status = "offline";
  }

  return NextResponse.json(checks);
}
