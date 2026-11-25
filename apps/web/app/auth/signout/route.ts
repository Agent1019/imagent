import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAuthConfigured, publicOrigin } from "@/lib/auth";

export async function POST(request: Request) {
  const origin = publicOrigin(request);
  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && requestOrigin !== origin) {
    return new NextResponse("Bad origin", { status: 403 });
  }
  if (isAuthConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  return NextResponse.redirect(`${origin}/`, { status: 303 });
}
