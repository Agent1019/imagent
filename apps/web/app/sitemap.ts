import type { MetadataRoute } from "next";
import { domainMap, locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `https://${domainMap[locale]}`;
  }
  languages["x-default"] = `https://${domainMap.en}`;

  return locales.map((locale) => ({
    url: `https://${domainMap[locale]}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
