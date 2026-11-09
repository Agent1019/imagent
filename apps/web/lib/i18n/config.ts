export const locales = ["en", "zh", "es", "fr", "de", "pt", "it", "ja", "ko"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
};

export const localeFlags: Record<Locale, string> = {
  en: "\u{1F1FA}\u{1F1F8}",
  zh: "\u{1F1E8}\u{1F1F3}",
  es: "\u{1F1EA}\u{1F1F8}",
  fr: "\u{1F1EB}\u{1F1F7}",
  de: "\u{1F1E9}\u{1F1EA}",
  pt: "\u{1F1E7}\u{1F1F7}",
  it: "\u{1F1EE}\u{1F1F9}",
  ja: "\u{1F1EF}\u{1F1F5}",
  ko: "\u{1F1F0}\u{1F1F7}",
};

export const domainMap: Record<Locale, string> = {
  en: "imagent.ai",
  zh: "chinese.imagent.ai",
  es: "spanish.imagent.ai",
  fr: "french.imagent.ai",
  de: "german.imagent.ai",
  pt: "portuguese.imagent.ai",
  it: "italian.imagent.ai",
  ja: "japanese.imagent.ai",
  ko: "korean.imagent.ai",
};

const hostPrefixMap: Record<string, Locale> = {
  "chinese.": "zh",
  "spanish.": "es",
  "french.": "fr",
  "german.": "de",
  "portuguese.": "pt",
  "italian.": "it",
  "japanese.": "ja",
  "korean.": "ko",
};

export function getLocaleFromHost(host: string): Locale {
  const hostname = host.split(":")[0];
  for (const [prefix, locale] of Object.entries(hostPrefixMap)) {
    if (hostname.startsWith(prefix)) return locale;
  }
  return defaultLocale;
}
