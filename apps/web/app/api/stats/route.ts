import { NextResponse } from "next/server";
import { getPlatformStats } from "@/lib/data/packages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/stats
 *
 * Platform-level stats (user count, service count).
 * User count includes a +18K floor on top of real data.
 */
export async function GET() {
  try {
    const stats = await getPlatformStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("[GET /api/stats]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
