import { NextResponse } from "next/server";
import { getPackages } from "@/lib/data/packages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/tools
 *
 * List packages with pagination and filtering.
 *
 * Query params:
 *   page     — Page number (default: 1)
 *   pageSize — Items per page (default: 24, max: 100)
 *   category — Filter by category/tag (e.g. "Search", "DevTools")
 *   search   — Search by package name
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const result = await getPackages({
      page: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 24,
      category: searchParams.get("category") || undefined,
      search: searchParams.get("search") || undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/tools]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
