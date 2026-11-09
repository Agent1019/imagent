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

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  let locale = "en";
  for (const [prefix, loc] of Object.entries(prefixLocaleMap)) {
    if (host.startsWith(prefix)) {
      locale = loc;
      break;
    }
  }

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  response.headers.set("x-host", host);
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};
