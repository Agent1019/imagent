import { NextResponse } from "next/server";
import { getPackageBySlug } from "@/lib/data/packages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/tools/[slug]
 *
 * Get a single package by slug.
 * Returns 404 if not found.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const pkg = await getPackageBySlug(slug);

    if (!pkg) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(pkg);
  } catch (error) {
    console.error("[GET /api/tools/[slug]]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
