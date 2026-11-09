import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { domainMap, locales } from "@/lib/i18n/config";

const siteHosts = new Set<string>(Object.values(domainMap));

function originFromHost(hostHeader: string | null) {
  const hostname = (hostHeader || "imagent.ai").split(":")[0].toLowerCase();
  if (siteHosts.has(hostname)) return `https://${hostname}`;
  if (hostname === "www.imagent.ai") return "https://imagent.ai";
  return "https://imagent.ai";
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headerList = await headers();
  const origin = originFromHost(headerList.get("x-host") || headerList.get("host"));
  const sitemaps = locales.map((locale) => `https://${domainMap[locale]}/sitemap.xml`);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/explore",
          "/rankings",
          "/blog",
          "/docs",
          "/pricing",
          "/api/",
          "/login",
          "/signup",
          "/publish",
          "/dashboard",
          "/about",
          "/careers",
          "/privacy",
          "/terms",
        ],
      },
    ],
    sitemap: [origin + "/sitemap.xml", ...sitemaps.filter((url) => url !== origin + "/sitemap.xml")],
    host: origin,
  };
}
