import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const prefixLocaleMap: Record<string, string> = {
  "chinese.": "zh",
  "spanish.": "es",
  "french.": "fr",
  "german.": "de",
  "portuguese.": "pt",
  "italian.": "it",
  "japanese.": "ja",
  "korean.": "ko",
};

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  let locale = "en";
  for (const [prefix, loc] of Object.entries(prefixLocaleMap)) {
    if (host.startsWith(prefix)) {
      locale = loc;
      break;
    }
  }

  request.headers.set("x-locale", locale);
  request.headers.set("x-host", host);
  request.headers.set("x-pathname", request.nextUrl.pathname);

  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return response;

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });
    // Refreshes the session cookie when it is close to expiring.
    await supabase.auth.getUser();
  } catch {
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|woff2?)$).*)"],
};
