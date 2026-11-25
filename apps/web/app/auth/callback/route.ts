import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAuthConfigured, publicOrigin, safeNext } from "@/lib/auth";

function nextFromCookie(request: Request): string {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|; )imagent_next=([^;]*)/);
  if (!match) return "/";
  try {
    return safeNext(decodeURIComponent(match[1]));
  } catch {
    return "/";
  }
}

function redirect(request: Request, path: string) {
  const response = NextResponse.redirect(`${publicOrigin(request)}${path}`);
  response.cookies.set("imagent_next", "", { path: "/", maxAge: 0 });
  return response;
}

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");
  const next = nextFromCookie(request);

  if (!isAuthConfigured() || !code) {
    return redirect(request, "/login?error=1");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return redirect(request, "/login?error=1");
  return redirect(request, next);
}
