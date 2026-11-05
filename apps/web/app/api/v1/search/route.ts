import { NextRequest, NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";

export async function GET(request: NextRequest) {
  const supabase = createPublicClient();
  if (!supabase) {
    return NextResponse.json({ error: "registry_unconfigured" }, { status: 503 });
  }

  const q = (request.nextUrl.searchParams.get("q") ?? "").replace(/[%_,]/g, " ").trim();
  let query = supabase
    .from("packages")
    .select("id, name, description, version, trust_score, install_count, status")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(20);
  if (q) {
    query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
  }
  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ query: q, results: data ?? [] });
}
