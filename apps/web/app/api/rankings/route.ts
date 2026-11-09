import { NextResponse } from "next/server";
import { getTopPackages } from "@/lib/data/packages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/rankings
 *
 * Get top packages ranked by install count.
 *
 * Query params:
 *   limit — Number of results (default: 50, max: 100)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    const data = await getTopPackages(limit);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("[GET /api/rankings]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
