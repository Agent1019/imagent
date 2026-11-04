export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

export const domainMap: Record<Locale, string> = {
  en: "imagent.ai",
  zh: "zh.imagent.ai",
};

export function getLocaleFromHost(host: string): Locale {
  const hostname = host.split(":")[0];
  if (hostname.startsWith("zh.")) return "zh";
  return defaultLocale;
}
