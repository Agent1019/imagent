import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const locale = host.startsWith("zh.") ? "zh" : "en";

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  response.headers.set("x-host", host);

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};
