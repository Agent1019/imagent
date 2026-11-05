import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";

export async function getRequestContext() {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  return { locale, zh: locale === "zh", t: getContent(locale), host };
}
