import { NextResponse } from "next/server";
import { searchPackages } from "@/lib/data/packages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/tools/search?q=...
 *
 * Search packages by name keyword.
 * Returns top matches ranked by install count.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);

    if (!query.trim()) {
      return NextResponse.json({ data: [] });
    }

    const results = await searchPackages(query, limit);
    return NextResponse.json({ data: results });
  } catch (error) {
    console.error("[GET /api/tools/search]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
