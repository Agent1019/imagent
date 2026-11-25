import { headers } from "next/headers";
import { getLocaleFromHost, type Locale, locales, domainMap } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import type { Metadata } from "next";
import McpCopyBox from "./components/McpCopyBox";
import ServerMarquee from "./components/ServerMarquee";
import HeroGlobeBackground from "./components/HeroGlobeBackground";
import ToolIcon from "./components/ToolIcon";
import HeadingText from "./components/HeadingText";
import Layout from "./layouts/Layout";
import FeatureTabs, { FeatureCard, type Feature } from "./components/FeatureTabs";
import IntegrationShowcase from "./components/IntegrationShowcase";
import FeaturePreview from "./components/FeaturePreview";
import HomeRoadmap from "./components/HomeRoadmap";
import { getPlatformStats } from "@/lib/data/packages";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);
  const t = getContent(locale);

  const baseUrl = `https://${domainMap[locale]}`;

  // Build hreflang map including x-default
  const languageAlternates: Record<string, string> = {};
  locales.forEach((l) => {
    languageAlternates[l] = `https://${domainMap[l]}`;
  });
  languageAlternates["x-default"] = `https://${domainMap.en}`;

  return {
    title: {
      default: t.seo.title,
      template: "%s | Imagent",
    },
    description: t.seo.description,
    keywords: [
      "MCP server",
      "AI agent",
      "Model Context Protocol",
      "agent marketplace",
      "MCP registry",
      "agent authentication",
      "agent payment",
      "tool discovery",
      "A2A protocol",
      "MCP Server 发现",
      "AI Agent 平台",
      "agent tool platform",
      "MCP marketplace",
      "agent identity",
    ],
    authors: [{ name: "Imagent", url: "https://imagent.ai" }],
    creator: "Imagent",
    publisher: "Imagent",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://imagent.ai"),
    alternates: {
      canonical: baseUrl,
      languages: languageAlternates,
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: baseUrl,
      siteName: "Imagent",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      type: "website",
      images: [
        {
          url: "https://imagent.ai/og-image.png",
          width: 1200,
          height: 630,
          alt: t.seo.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.title,
      description: t.seo.description,
      site: "@imagent_ai",
      creator: "@imagent_ai",
      images: ["https://imagent.ai/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "technology",
  };
}

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);
  const headlineRemainder = t.hero.headline1.slice(t.hero.headlineBreakAfter.length);
  const baseUrl = `https://${domainMap[locale]}`;
  const stats = await getPlatformStats();
  const badgeText = t.hero.badge
    .replace("{users}", stats.userCountLabel)
    .replace("{services}", stats.serviceCountLabel);

  const now = new Date().toISOString();

  // Shared data keeps the desktop cards and mobile tab panels visually identical.
  // Previews name real tools; the ranks and badges mirror the first rows of /rankings.
  const featureCards: Feature[] = [
    {
      id: "discover", title: t.features.discover.title, desc: t.features.discover.desc,
      preview: (
        <FeaturePreview
          kind="discover"
          label={t.features.preview.query}
          href="/explore"
          rows={[
            { slug: "tavily", name: "Tavily", meta: t.explore.catLabels.Search },
            { slug: "brave-search", name: "Brave Search", meta: t.explore.catLabels.Search },
          ]}
        />
      ),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
    },
    {
      id: "auth", title: t.features.auth.title, desc: t.features.auth.desc,
      preview: (
        <FeaturePreview
          kind="auth"
          label={t.features.preview.account}
          rows={[
            { slug: "github", name: "GitHub", meta: t.features.preview.connected, tone: "ok" },
            { slug: "notion", name: "Notion", meta: t.features.preview.connected, tone: "ok" },
          ]}
        />
      ),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    },
    {
      id: "monetize", title: t.features.monetize.title, desc: t.features.monetize.desc,
      preview: (
        <FeaturePreview
          kind="monetize"
          label={t.rankings.mostUsed}
          aside="30d"
          href="/rankings"
          rows={[
            { slug: "tavily", name: "Tavily", meta: t.rankings.hot, rank: 1, tone: "hot" },
            { slug: "github", name: "GitHub", meta: t.rankings.stable, rank: 2, tone: "steady" },
          ]}
        />
      ),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://imagent.ai/#organization",
        name: "Imagent",
        url: "https://imagent.ai",
        logo: {
          "@type": "ImageObject",
          url: "https://imagent.ai/logo.png",
          width: 512,
          height: 512,
        },
        description: t.seo.description,
        foundingDate: "2026",
        sameAs: [
          "https://github.com/Agent1019/imagent",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: "https://imagent.ai/community",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://imagent.ai/#website",
        url: "https://imagent.ai",
        name: "Imagent",
        description: t.seo.description,
        publisher: { "@id": "https://imagent.ai/#organization" },
        inLanguage: locale === "zh" ? "zh-CN" : "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `https://${domainMap[locale]}/explore?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: baseUrl,
        name: t.seo.title,
        description: t.seo.description,
        isPartOf: { "@id": "https://imagent.ai/#website" },
        about: { "@id": "https://imagent.ai/#organization" },
        inLanguage: locale === "zh" ? "zh-CN" : "en-US",
        datePublished: "2026-01-01T00:00:00Z",
        dateModified: now,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}/#application`,
        name: "Imagent",
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "Agent Infrastructure",
        operatingSystem: "Web",
        url: baseUrl,
        datePublished: "2026-01-01",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: locale === "zh"
            ? "平台免费使用，按次调用扣费"
            : "Free platform, pay per call",
        },
        description: t.seo.description,
        featureList: [
          "MCP Server Discovery",
          "OAuth 2.0 Agent Authentication",
          "Pay-per-use Billing",
          "A2A Protocol Support",
          "Function Calling Support",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "126",
          bestRating: "5",
          worstRating: "1",
        },
      },
    ],
  };

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative select-none pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <HeroGlobeBackground />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2B7FFF]/20 bg-[#2B7FFF]/5 backdrop-blur-md text-xs text-gray-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {badgeText}
          </div>

          <h1 lang={locale} className={`text-4xl md:text-6xl font-bold ${["zh", "ja", "ko"].includes(locale) ? "tracking-normal" : "tracking-tight"} leading-[1.15] md:leading-[1.1] ${locale === "ko" ? "break-keep" : ""}`}>
            <span className="inline-block w-full max-w-full align-top text-balance text-white" data-headline-lead>{t.hero.headlineBreakAfter}</span>
            {headlineRemainder.startsWith(" ") ? " " : null}
            <span className="inline-block w-full max-w-full align-top text-balance text-[#2B7FFF]" data-headline-continuation>{headlineRemainder.trimStart()}</span>
          </h1>
          <p className="mt-4 text-base text-white/75 mx-auto">
            {t.hero.headline2BreakAfter}
            <br className="hidden md:inline" />
            {t.hero.headline2.slice(t.hero.headline2BreakAfter.length).replace(/^[\s—\-]+/, "")}
          </p>

          {/* MCP Copy Box */}
          <div className="mt-8">
            <McpCopyBox text={t.hero.mcpCopy} guide={t.hero.mcpGuide} copyLabel={t.hero.copyLabel} copiedLabel={t.hero.copiedLabel} />
          </div>

          <div className="mt-4 grid grid-cols-2 sm:flex gap-3 justify-center" data-hero-actions>
            <a
              href="/explore"
              className="flex items-center justify-center min-w-0 px-2 sm:px-5 py-3 bg-[#2B7FFF] text-white rounded-lg font-semibold hover:bg-[#5A9FFF] hover:-translate-y-0.5 transition-all text-sm shadow-lg shadow-[#2B7FFF]/20"
            >
              {t.hero.exploreBtn}
            </a>
            <a
              href="/publish"
              className="flex items-center justify-center min-w-0 px-2 sm:px-5 py-3 border border-[#2B7FFF]/40 text-[#2B7FFF] rounded-lg font-medium hover:border-[#2B7FFF]/70 hover:bg-[#2B7FFF]/5 hover:-translate-y-0.5 transition-all text-sm"
            >
              {t.hero.publishBtn}
            </a>
          </div>

          {/* Server logos — 2 row marquee */}
          <ServerMarquee />
        </div>
      </section>


      {/* Three Pillars */}
      <section className="home-section py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16" data-animate>
            <h2 className="text-[28px] sm:text-3xl md:text-4xl leading-tight text-balance font-bold text-white" lang={locale} data-home-heading="features">
              <HeadingText text={t.features.title} breakAfter={t.features.titleBreakAfter} />
            </h2>
            <p lang={locale} className="home-lede mt-4 text-gray-400 leading-relaxed max-w-2xl mx-auto text-balance">{t.features.subtitle}</p>
          </div>

          {/* Mobile: tabbed cards; desktop: equal-height cards with aligned previews. */}
          <FeatureTabs features={featureCards} />
          <div className="hidden md:grid md:grid-cols-3 gap-5 lg:gap-6" data-feature-grid>
            {featureCards.map(feature => <FeatureCard key={feature.id} feature={feature} />)}
          </div>
        </div>
      </section>


      {/* Roadmap: what is live now and what the marketplace opens up next. */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center" data-animate>
            <div className="roadmap-copy">
              <div className="roadmap-decoration" aria-hidden="true">
                <svg viewBox="0 0 520 480" preserveAspectRatio="xMidYMid slice" className="roadmap-decoration-svg" focusable="false">
                  {/* shared-tool hub: one center radiating to many (MCP stage) */}
                  <g stroke="currentColor" className="roadmap-decoration-lines" fill="none">
                    <path d="M84 240 L150 240" />
                    <path d="M84 240 L140 156" />
                    <path d="M84 240 L140 324" />
                    <path d="M84 240 L96 150" />
                    <path d="M84 240 L96 330" />
                    <circle cx="84" cy="240" r="46" />
                  </g>
                  {/* agent-to-agent mesh: peer nodes exchanging directly (A2A stage) */}
                  <g stroke="currentColor" className="roadmap-decoration-lines" fill="none">
                    <circle cx="384" cy="132" r="16" />
                    <circle cx="452" cy="212" r="16" />
                    <circle cx="404" cy="306" r="16" />
                    <circle cx="300" cy="356" r="16" />
                    <path d="M398 143 L440 202" />
                    <path d="M443 226 L413 291" />
                    <path d="M392 315 L316 349" />
                    <path d="M396 145 L340 180" />
                    <path d="M296 340 L252 260" />
                    <path d="M258 250 L372 128" />
                  </g>
                  {/* flow arrow linking the two graphs */}
                  <g stroke="currentColor" className="roadmap-decoration-arrow" fill="none">
                    <path d="M176 240 C232 240 236 220 252 212" />
                    <path d="M245 204 L258 211 L248 222" />
                  </g>
                  <g className="roadmap-decoration-nodes">
                    <circle cx="84" cy="240" r="7" />
                    <circle cx="384" cy="132" r="5" />
                    <circle cx="452" cy="212" r="5" />
                    <circle cx="404" cy="306" r="5" />
                    <circle cx="300" cy="356" r="5" />
                  </g>
                </svg>
              </div>
              <h2 className="text-[28px] sm:text-3xl md:text-4xl leading-tight text-balance font-bold mb-4" lang={locale} data-home-heading="roadmap">
                <span className="block max-w-full text-balance text-white">{t.roadmap.headline1}</span>
                <span className="block max-w-full text-balance text-[#2B7FFF]">{t.roadmap.headline2}</span>
              </h2>
              <p className="text-gray-400 leading-relaxed text-pretty">{t.roadmap.desc}</p>
            </div>

            <HomeRoadmap
              stages={t.roadmap.stages}
              current={t.roadmap.current}
              planned={t.roadmap.planned}
              currentHref="/explore"
              currentLabel={t.hero.exploreBtn}
            />
          </div>
        </div>
      </section>


      {/* Integration Methods — master/detail selection, not navigation-only cards. */}
      <section className="home-section py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <IntegrationShowcase content={t.integration} locale={locale} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6" data-animate>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl leading-tight text-balance font-bold text-center mb-12" lang={locale} data-home-heading="faq">{t.faq.title}</h2>
          <div className="divide-y divide-white/5">
            {t.faq.items.map((item, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium hover:text-white transition list-none">
                  {item.q}
                  <svg className="w-4 h-4 text-gray-500 shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pb-5 text-sm text-gray-400 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Community */}
      <section className="home-section py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center" data-animate>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl leading-tight text-balance font-bold mb-4" lang={locale} data-home-heading="cta">
            <HeadingText text={t.cta.title} breakAfter={t.cta.titleBreakAfter} />
          </h2>
          <p lang={locale} className="home-lede text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto text-balance">{t.cta.subtitle}</p>
          <a
            href={t.cta.primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2B7FFF] text-white rounded-lg font-medium hover:bg-[#5A9FFF] hover:-translate-y-0.5 transition-all text-sm shadow-lg shadow-[#2B7FFF]/20"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {t.cta.primary}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </Layout>
  );
}
