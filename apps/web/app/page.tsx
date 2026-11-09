import { headers } from "next/headers";
import { getLocaleFromHost, type Locale, locales, domainMap } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import type { Metadata } from "next";
import McpCopyBox from "./components/McpCopyBox";
import Layout from "./layouts/Layout";
import FeatureTabs from "./components/FeatureTabs";
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
  const baseUrl = `https://${domainMap[locale]}`;
  const stats = await getPlatformStats();
  const badgeText = t.hero.badge
    .replace("{users}", stats.userCountLabel)
    .replace("{services}", stats.serviceCountLabel);

  const now = new Date().toISOString();

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
          "https://github.com/sunyuqing1019/imagent",
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
      <section className="pt-24 md:pt-28 pb-12 md:pb-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {badgeText}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            {t.hero.headline1}
          </h1>
          <p className="mt-5 text-xl md:text-2xl font-medium bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
            {t.hero.headline2}
          </p>

          {/* MCP Copy Box */}
          <McpCopyBox text={t.hero.mcpCopy} guide={t.hero.mcpGuide} />

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/explore"
              className="px-5 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 hover:-translate-y-0.5 transition-all text-sm"
            >
              {t.hero.exploreBtn}
            </a>
            <a
              href="/publish"
              className="px-5 py-3 border border-white/15 rounded-lg font-medium hover:border-white/30 hover:bg-white/5 hover:-translate-y-0.5 transition-all text-sm"
            >
              {t.hero.publishBtn}
            </a>
          </div>

          {/* Server logos — 2 row marquee */}
          <style>{`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes scroll-right {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
          `}</style>
          <div className="mt-3 max-w-5xl mx-auto space-y-2 overflow-hidden">
            {/* Row 1 — scrolls left */}
            <div className="flex overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
              <div className="flex gap-2 shrink-0 animate-[scroll-left_30s_linear_infinite]">
                {[
                  { name: "Firecrawl", domain: "firecrawl.dev" },
                  { name: "Brave", domain: "brave.com" },
                  { name: "Tavily", domain: "tavily.com" },
                  { name: "Slack", domain: "slack.com" },
                  { name: "GitHub", domain: "github.com" },
                  { name: "Notion", domain: "notion.so" },
                  { name: "Stripe", domain: "stripe.com" },
                  { name: "Resend", domain: "resend.com" },
                  { name: "Postgres", domain: "postgresql.org" },
                  { name: "Puppeteer", domain: "pptr.dev" },
                ].concat([
                  { name: "Firecrawl", domain: "firecrawl.dev" },
                  { name: "Brave", domain: "brave.com" },
                  { name: "Tavily", domain: "tavily.com" },
                  { name: "Slack", domain: "slack.com" },
                  { name: "GitHub", domain: "github.com" },
                  { name: "Notion", domain: "notion.so" },
                  { name: "Stripe", domain: "stripe.com" },
                  { name: "Resend", domain: "resend.com" },
                  { name: "Postgres", domain: "postgresql.org" },
                  { name: "Puppeteer", domain: "pptr.dev" },
                ]).map((s, i) => (
                  <div key={`${s.name}-${i}`} className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02]">
                    <img src={`https://www.google.com/s2/favicons?domain=${s.domain}&sz=64`} alt={s.name} className="w-4 h-4 rounded" loading="lazy" />
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Row 2 — scrolls right */}
            <div className="flex overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
              <div className="flex gap-2 shrink-0 animate-[scroll-right_30s_linear_infinite]">
                {[
                  { name: "Google Maps", domain: "google.com" },
                  { name: "E2B", domain: "e2b.dev" },
                  { name: "Composio", domain: "composio.dev" },
                  { name: "Browserbase", domain: "browserbase.com" },
                  { name: "Apollo", domain: "apollo.io" },
                  { name: "Linear", domain: "linear.app" },
                  { name: "Supabase", domain: "supabase.com" },
                  { name: "Redis", domain: "redis.io" },
                  { name: "MongoDB", domain: "mongodb.com" },
                  { name: "Twilio", domain: "twilio.com" },
                ].concat([
                  { name: "Google Maps", domain: "google.com" },
                  { name: "E2B", domain: "e2b.dev" },
                  { name: "Composio", domain: "composio.dev" },
                  { name: "Browserbase", domain: "browserbase.com" },
                  { name: "Apollo", domain: "apollo.io" },
                  { name: "Linear", domain: "linear.app" },
                  { name: "Supabase", domain: "supabase.com" },
                  { name: "Redis", domain: "redis.io" },
                  { name: "MongoDB", domain: "mongodb.com" },
                  { name: "Twilio", domain: "twilio.com" },
                ]).map((s, i) => (
                  <div key={`${s.name}-${i}`} className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02]">
                    <img src={`https://www.google.com/s2/favicons?domain=${s.domain}&sz=64`} alt={s.name} className="w-4 h-4 rounded" loading="lazy" />
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Three Pillars */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-animate>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">{t.features.title}</h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">{t.features.subtitle}</p>
          </div>

          {/* Mobile: tabbed card */}
          <FeatureTabs features={[
            {
              title: t.features.discover.title,
              desc: t.features.discover.desc,
              code: <><span className="text-purple-400">GET</span> /api/v1/search<br /><span className="text-gray-500">?q=pdf+generation&protocol=mcp</span></>,
              icon: <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
              bg: "bg-orange-500/10",
            },
            {
              title: t.features.auth.title,
              desc: t.features.auth.desc,
              code: <><span className="text-emerald-400">Authorization</span>: Bearer<br /><span className="text-gray-500">imt_a1b2c3d4...x9y0z</span></>,
              icon: <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
              bg: "bg-emerald-500/10",
            },
            {
              title: t.features.monetize.title,
              desc: t.features.monetize.desc,
              code: <><span className="text-amber-400">GET</span> /api/v1/usage<br /><span className="text-gray-500">{"{ \"calls\": 142, \"cost\": \"$0.14\" }"}</span></>,
              icon: <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>,
              bg: "bg-purple-500/10",
            },
          ]} />

          {/* Desktop: 3-column grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
                title: t.features.discover.title,
                desc: t.features.discover.desc,
                code: <><span className="text-purple-400">GET</span> /api/v1/search<br /><span className="text-gray-500">?q=pdf+generation&protocol=mcp</span></>,
                bg: "bg-orange-500/10",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: t.features.auth.title,
                desc: t.features.auth.desc,
                code: <><span className="text-emerald-400">Authorization</span>: Bearer<br /><span className="text-gray-500">imt_a1b2c3d4...x9y0z</span></>,
                bg: "bg-emerald-500/10",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                ),
                title: t.features.monetize.title,
                desc: t.features.monetize.desc,
                code: <><span className="text-amber-400">GET</span> /api/v1/usage<br /><span className="text-gray-500">{"{ \"calls\": 142, \"cost\": \"$0.14\" }"}</span></>,
                bg: "bg-purple-500/10",
              },
            ].map((card) => (
              <div key={card.title} className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-white/10 hover:bg-white/[0.04] transition">
                <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-5`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                <div className="mt-6 p-4 rounded-lg bg-black/40 border border-white/5">
                  <code className="text-xs text-gray-300">{card.code}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* API Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center" data-animate>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.apiSection.headline1}
                <br />
                <span className="text-gray-500">{t.apiSection.headline2}</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">{t.apiSection.desc}</p>
              <div className="space-y-3">
                {t.apiSection.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <svg className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <span className="text-xs text-gray-500">agent.ts</span>
              </div>
              <pre className="p-5 text-xs leading-relaxed overflow-x-auto">
                <code className="text-gray-300">{`import { ImagentClient } from "@imagent/sdk";

const client = new ImagentClient({
  apiKey: process.env.IMAGENT_KEY,
});

// 1. Discover tools by capability
const tools = await client.search({
  capability: "generate PDF from markdown",
  protocol: "mcp",
  minTrustScore: 0.8,
});

// 2. Authenticate and invoke
const result = await client.invoke({
  server: tools[0].id,
  method: "generate_pdf",
  params: { content: markdownBody },
  auth: { scope: "read:templates" },
});

// 3. Usage is metered automatically
console.log(result.usage);
// { calls: 1, cost: "$0.002", latency: "142ms" }`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>


      {/* Community + CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto" data-animate>
          {/* CTA */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">{t.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/signup"
                className="px-8 py-3.5 bg-white text-black rounded-lg font-medium hover:bg-gray-200 hover:-translate-y-0.5 transition-all text-sm"
              >
                {t.cta.primary}
              </a>
              <a
                href="/docs"
                className="px-8 py-3.5 border border-white/15 rounded-lg font-medium hover:border-white/30 hover:bg-white/5 hover:-translate-y-0.5 transition-all text-sm"
              >
                {t.cta.secondary}
              </a>
            </div>
          </div>

          {/* Community Channels */}
          <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
            {[
              {
                name: "GitHub",
                desc: locale === "zh" ? "开源贡献" : "Open Source",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                ),
                href: "https://github.com/sunyuqing1019/imagent",
                color: "text-white",
              },
              {
                name: "Discord",
                desc: locale === "zh" ? "实时交流" : "Live Chat",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                  </svg>
                ),
                href: "#",
                color: "text-[#5865F2]",
              },
              {
                name: "Twitter / X",
                desc: locale === "zh" ? "最新动态" : "Updates",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                ),
                href: "#",
                color: "text-white",
              },
              {
                name: "Forum",
                desc: locale === "zh" ? "深度讨论" : "Discussions",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                ),
                href: "/community",
                color: "text-orange-400",
              },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex flex-col items-center gap-2 hover:opacity-80 transition text-center"
              >
                <div className={`${item.color} opacity-70 group-hover:opacity-100 transition`}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
