import { headers } from "next/headers";
import { type Locale, locales, domainMap, localeNames, localeFlags } from "@/lib/i18n/config";
import { getAuthCopy } from "@/lib/auth-copy";
import { getAuthUser } from "@/lib/auth";
import NavSearch from "../components/NavSearch";
import ScrollEffects from "../components/ScrollEffects";
import MobileNav from "../components/MobileNav";
import UserMenu from "../components/UserMenu";

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
  explore: string;
  rankings: string;
  pricing: string;
  documentation: string;
  apiReference: string;
  blog: string;
  about: string;
  careers: string;
  privacy: string;
  terms: string;
};

const partnerLabels: Record<Locale, string> = {
  en: "Ecosystem partners", zh: "生态合作伙伴", ko: "생태계 파트너",
  pt: "Parceiros do ecossistema", it: "Partner dell’ecosistema", es: "Socios del ecosistema",
  ja: "エコシステムパートナー", de: "Ökosystem-Partner", fr: "Partenaires de l’écosystème",
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
  const user = await getAuthUser();
  const account = getAuthCopy(locale);
  const footerPartners = (
    <div className="footer-partners" data-footer-partners>
      <p>{partnerLabels[locale]}{locale === "zh" || locale === "ja" ? "：" : ":"}</p>
      <ul aria-label={partnerLabels[locale]}>
        <li>KAIYUAN Foundation</li>
        <li>{locale === "zh" ? "易宝支付" : "Yeepay"}</li>
        <li>{locale === "zh" ? "博联" : "BroadLink"}</li>
      </ul>
    </div>
  );

  return (
    <>
      <ScrollEffects />

      {/* Navigation */}
      <nav id="main-nav" className="fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-8 shrink-0">
            {/* Mobile Navigation - visible only below md, left of logo */}
            <MobileNav
              nav={nav}
              locale={locale}
              locales={locales}
              domainMap={domainMap}
              localeNames={localeNames}
              localeFlags={localeFlags}
              pathname={pathname}
              user={user}
              signOutLabel={account.signOut}
            />
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
                    <span className="text-xs">{localeFlags[l]}</span>
                    {localeNames[l]}
                  </a>
                ))}
              </div>
            </div>

            {user ? (
              <UserMenu user={user} signOutLabel={account.signOut} />
            ) : (
              <>
                <a href="/login" className="hidden md:inline text-sm text-gray-400 hover:text-white transition px-2 py-1.5 whitespace-nowrap shrink-0">
                  {nav.signIn}
                </a>
                <a
                  href="/signup"
                  className="text-sm bg-white text-black px-3 md:px-4 py-1.5 rounded-lg font-medium hover:bg-gray-200 transition whitespace-nowrap shrink-0"
                >
                  {nav.getStarted}
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-8 mb-12">
            {/* Brand and understated ecosystem names, below the product description. */}
            <div className="min-w-0 md:flex-1 md:max-w-[440px]">
              <div className="text-lg font-bold mb-4">Imagent</div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs" data-footer-tagline>{footer.tagline}</p>
                <div className="site-footer-social-icons text-gray-400">
                  <span role="img" aria-label="Discord">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                    </svg>
                  </span>
                  <span role="img" aria-label="Twitter / X">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </span>
                  <a
                    href="/community"
                    aria-label="Forum"
                    className="inline-flex text-gray-400 hover:text-gray-300 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  </a>
                </div>
            </div>
            {/* Link columns — right-aligned, with bounded gaps on narrow desktops. */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-6 lg:gap-16 min-w-0 [overflow-wrap:anywhere]">
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
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 site-footer-bottom">
            <span className="site-footer-copyright">{footer.copyright}</span>
            {footerPartners}
            <div className="flex gap-6 site-footer-legal">
              <a href="/privacy" className="hover:text-white transition">{footer.privacy}</a>
              <a href="/terms" className="hover:text-white transition">{footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
