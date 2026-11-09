import { headers } from "next/headers";
import { type Locale, locales, domainMap, localeNames } from "@/lib/i18n/config";
import NavSearch from "../components/NavSearch";
import ScrollEffects from "../components/ScrollEffects";
import MobileNav from "../components/MobileNav";

type NavContent = {
  explore: string;
  rankings: string;
  blog: string;
  community: string;
  docs: string;
  pricing: string;
  signIn: string;
  getStarted: string;
};

type FooterContent = {
  tagline: string;
  product: string;
  developers: string;
  company: string;
  copyright: string;
};

type LayoutProps = {
  locale: Locale;
  nav: NavContent;
  footer: FooterContent;
  searchPlaceholder: string;
  children: React.ReactNode;
};

export default async function Layout({ locale, nav, footer, searchPlaceholder, children }: LayoutProps) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  return (
    <>
      <ScrollEffects />

      {/* Navigation */}
      <nav id="main-nav" className="fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8 shrink-0">
            <a href="/" className="text-2xl font-bold tracking-tight text-white shrink-0">
              Imagent
            </a>
            <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm text-gray-400 overflow-hidden">
              <a href="/explore" className="hover:text-white transition shrink-0">{nav.explore}</a>
              <a href="/rankings" className="hover:text-white transition shrink-0">{nav.rankings}</a>
              <a href="/blog" className="hover:text-white transition shrink-0">{nav.blog}</a>
              <a href="/community" className="hover:text-white transition shrink-0">{nav.community}</a>
              <a href="/docs" className="hover:text-white transition shrink-0">{nav.docs}</a>
              <a href="/pricing" className="hover:text-white transition shrink-0">{nav.pricing}</a>
            </div>
          </div>
          <div className="flex items-center justify-end gap-1.5 md:gap-2 lg:gap-3 flex-1 min-w-0 md:ml-4 lg:ml-8">
            <NavSearch placeholder={searchPlaceholder} />

            {/* Language Dropdown - hidden on mobile, MobileNav handles it */}
            <div className="hidden md:block relative group shrink-0">
              <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition px-2 py-1.5 rounded-lg hover:bg-white/5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span>{localeNames[locale]}</span>
                <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-36 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                {locales.map((l) => (
                  <a
                    key={l}
                    href={`https://${domainMap[l]}${pathname}`}
                    className={`flex items-center gap-2 px-3 py-2 text-sm first:rounded-t-lg last:rounded-b-lg transition ${
                      locale === l
                        ? "text-white bg-white/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-xs">{l === "en" ? "\u{1F1FA}\u{1F1F8}" : "\u{1F1E8}\u{1F1F3}"}</span>
                    {localeNames[l]}
                  </a>
                ))}
              </div>
            </div>

            <a href="/login" className="hidden md:inline text-sm text-gray-400 hover:text-white transition px-2 py-1.5 whitespace-nowrap shrink-0">
              {nav.signIn}
            </a>
            <a
              href="/signup"
              className="text-sm bg-white text-black px-3 md:px-4 py-1.5 rounded-lg font-medium hover:bg-gray-200 transition whitespace-nowrap shrink-0"
            >
              {nav.getStarted}
            </a>

            {/* Mobile Navigation - visible only below md */}
            <MobileNav
              nav={nav}
              locale={locale}
              locales={locales}
              domainMap={domainMap}
              localeNames={localeNames}
              pathname={pathname}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="shrink-0">
              <div className="text-lg font-bold mb-4">Imagent</div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs">{footer.tagline}</p>
            </div>
            {/* Link columns — right-aligned */}
            <div className="grid grid-cols-3 gap-12 md:gap-24">
              <div>
                <div className="text-sm font-semibold mb-3 text-gray-300">{footer.product}</div>
                <div className="space-y-2 text-sm text-gray-500">
                  <a href="/explore" className="block hover:text-white transition">{footer.explore}</a>
                  <a href="/rankings" className="block hover:text-white transition">{footer.rankings}</a>
                  <a href="/pricing" className="block hover:text-white transition">{footer.pricing}</a>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-3 text-gray-300">{footer.developers}</div>
                <div className="space-y-2 text-sm text-gray-500">
                  <a href="/docs" className="block hover:text-white transition">{footer.documentation}</a>
                  <a href="/docs/api" className="block hover:text-white transition">{footer.apiReference}</a>
                  <a href="/blog" className="block hover:text-white transition">{footer.blog}</a>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-3 text-gray-300">{footer.company}</div>
                <div className="space-y-2 text-sm text-gray-500">
                  <a href="/about" className="block hover:text-white transition">{footer.about}</a>
                  <a href="/blog" className="block hover:text-white transition">{footer.blog}</a>
                  <a href="/careers" className="block hover:text-white transition">{footer.careers}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <span>{footer.copyright}</span>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition">{footer.privacy}</a>
              <a href="/terms" className="hover:text-white transition">{footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
