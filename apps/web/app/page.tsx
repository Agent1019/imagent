import { headers } from "next/headers";
import { getLocaleFromHost, type Locale, locales, domainMap } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import type { Metadata } from "next";
import McpCopyBox from "./components/McpCopyBox";
import Layout from "./layouts/Layout";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);
  const t = getContent(locale);

  const baseUrl = `https://${domainMap[locale]}`;

  return {
    title: t.seo.title,
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
    ],
    authors: [{ name: "Imagent", url: baseUrl }],
    creator: "Imagent",
    publisher: "Imagent",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://${domainMap[l]}`])
      ),
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: baseUrl,
      siteName: "Imagent",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t.seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.title,
      description: t.seo.description,
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://imagent.ai/#organization",
        name: "Imagent",
        url: "https://imagent.ai",
        description: t.seo.description,
        sameAs: [
          "https://github.com/sunyuqing1019/imagent",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://imagent.ai/#website",
        url: `https://${domainMap[locale]}`,
        name: "Imagent",
        description: t.seo.description,
        publisher: { "@id": "https://imagent.ai/#organization" },
        inLanguage: locale === "zh" ? "zh-CN" : "en-US",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `https://${domainMap[locale]}/#application`,
        name: "Imagent",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: t.seo.description,
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
      <section className="pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {t.hero.badge}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            {t.hero.headline1}
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-medium bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
            {t.hero.headline2}
          </p>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle1}
            <br className="hidden md:block" />
            {t.hero.subtitle2}
          </p>

          {/* MCP Copy Box */}
          <McpCopyBox text={t.hero.mcpCopy} guide={t.hero.mcpGuide} />

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/explore"
              className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition text-sm"
            >
              {t.hero.exploreBtn}
            </a>
            <a
              href="/docs"
              className="px-6 py-3 border border-white/15 rounded-lg font-medium hover:border-white/30 hover:bg-white/5 transition text-sm"
            >
              {t.hero.publishBtn}
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 md:px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10,000+", label: t.stats.servers },
            { value: "50M+", label: t.stats.calls },
            { value: "2,400+", label: t.stats.publishers },
            { value: "99.9%", label: t.stats.uptime },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t.features.title}</h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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

      {/* How It Works */}
      <section className="py-24 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t.howItWorks.title}</h2>
            <p className="mt-4 text-gray-400">{t.howItWorks.subtitle}</p>
          </div>

          <div className="space-y-12">
            {t.howItWorks.steps.map((step, i) => (
              <div key={i} className="flex gap-6 md:gap-10 items-start">
                <div className={`text-4xl md:text-5xl font-bold font-mono shrink-0 ${
                  i === 0 ? "text-orange-400" : i === 1 ? "text-emerald-400" : "text-purple-400"
                }`}>
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-24 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-gray-500 ml-2">agent.ts</span>
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

      {/* Protocol Support */}
      <section className="py-24 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-6">{t.protocols}</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-40">
            {["MCP", "A2A", "OpenAI", "Anthropic", "LangChain", "CrewAI"].map((name) => (
              <span key={name} className="text-lg font-semibold text-gray-400 tracking-wide">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-gray-400 mb-8">{t.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/signup"
              className="px-8 py-3.5 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition text-sm"
            >
              {t.cta.primary}
            </a>
            <a
              href="/docs"
              className="px-8 py-3.5 border border-white/15 rounded-lg font-medium hover:border-white/30 hover:bg-white/5 transition text-sm"
            >
              {t.cta.secondary}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
