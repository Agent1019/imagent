import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import Layout from "@/app/layouts/Layout";
import CopyButton from "@/app/components/CopyButton";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);

  const toolName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `${toolName} - MCP Server | Imagent`,
    description: `Discover ${toolName} on Imagent. View endpoints, pricing, trust score, and integrate with your AI agent in one line.`,
    openGraph: {
      title: `${toolName} - MCP Server | Imagent`,
      description: `Discover ${toolName} on Imagent. View endpoints, pricing, trust score, and integrate with your AI agent in one line.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${toolName} - MCP Server | Imagent`,
      description: `Discover ${toolName} on Imagent. View endpoints, pricing, trust score, and integrate with your AI agent in one line.`,
    },
  };
}

const mockEndpoints = [
  { method: "GET", path: "/api/v1/tools/{slug}/capabilities" },
  { method: "POST", path: "/api/v1/tools/{slug}/invoke" },
  { method: "GET", path: "/api/v1/tools/{slug}/health" },
  { method: "POST", path: "/api/v1/tools/{slug}/authenticate" },
];

const mockTools = [
  { name: "search", desc: "Search the web for real-time information on any topic with structured results." },
  { name: "extract", desc: "Extract raw page content from URLs in markdown or text format." },
  { name: "crawl", desc: "Crawl websites starting from a URL to collect content with configurable depth." },
  { name: "map", desc: "Map website structures by listing all URLs starting from a base URL." },
  { name: "research", desc: "Deep research across multiple sources with citation and fact-checking." },
];

const mockRelatedTools = [
  { slug: "brave-search", name: "Brave Search", category: "Search", trustScore: 94, installs: "12.8K", description: "Privacy-focused web search API with structured results and snippet extraction." },
  { slug: "exa", name: "Exa", category: "Search", trustScore: 92, installs: "8.4K", description: "Neural search engine API for semantic content discovery and retrieval." },
  { slug: "firecrawl", name: "Firecrawl", category: "Data", trustScore: 96, installs: "15.2K", description: "Web scraping and crawling with automatic content extraction and formatting." },
  { slug: "serpapi", name: "SerpApi", category: "Search", trustScore: 90, installs: "6.1K", description: "Google search results API with structured data extraction." },
];

const mockComments = [
  { user: "Alex Chen", avatar: "A", rating: 5, date: "2026-10-28", text: "Excellent search quality and very fast response times. The structured results are perfect for agent workflows." },
  { user: "Sarah K", avatar: "S", rating: 4, date: "2026-10-15", text: "Great tool for web research. Rate limits are reasonable and the API is well-documented." },
  { user: "DevOps Bot", avatar: "D", rating: 5, date: "2026-09-30", text: "Integrates seamlessly with our agent pipeline. Health endpoint is a nice touch for monitoring." },
];

const mockChangelog = [
  { version: "1.4.0", date: "2026-11-01", changes: "Added deep research tool with multi-source citation support." },
  { version: "1.3.2", date: "2026-10-15", changes: "Improved crawl performance and added configurable depth parameter." },
  { version: "1.3.0", date: "2026-09-20", changes: "New map tool for website structure discovery." },
  { version: "1.2.0", date: "2026-08-10", changes: "Added extract tool with markdown output format." },
];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);
  const td = t.toolDetail;

  const toolName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const methodColor: Record<string, string> = {
    GET: "bg-emerald-500/10 text-emerald-400",
    POST: "bg-orange-500/10 text-orange-400",
    PUT: "bg-blue-500/10 text-blue-400",
    DELETE: "bg-red-500/10 text-red-400",
  };

  const epDescs = [td.epList, td.epInvoke, td.epHealth, td.epAuth];

  const tabs = [
    { label: td.endpointsTitle, href: "#endpoints" },
    { label: td.tabTools, href: "#tools", badge: 5 },
    { label: td.tabComments, href: "#comments", badge: 3 },
    { label: td.tabChangelog, href: "#changelog", badge: 4 },
  ];

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <div className="pt-20 px-4 md:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <a href="/" className="hover:text-white transition">Imagent</a>
            <span>/</span>
            <a href="/explore" className="hover:text-white transition">{t.explore.title}</a>
            <span>/</span>
            <span className="text-gray-300">{toolName}</span>
          </nav>

          {/* Tool Header — full width with action buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
            <img
              src={`https://www.google.com/s2/favicons?domain=${slug}.com&sz=128`}
              alt={toolName}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.05] border border-white/10 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{toolName}</h1>
                <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  96
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                A high-performance MCP server providing web search, content extraction, website crawling, and site mapping capabilities for AI agents.
              </p>
            </div>
            {/* Action buttons in header */}
            <div className="flex items-center gap-2 shrink-0 sm:ml-auto">
              <a href="#" className="flex items-center gap-1.5 px-3.5 py-2 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-white/25 hover:bg-white/5 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>
                <span className="hidden sm:inline">{td.refresh}</span>
              </a>
              <a href="#" className="flex items-center gap-1.5 px-3.5 py-2 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-white/25 hover:bg-white/5 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
                <span className="hidden sm:inline">{td.share}</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3.5 py-2 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-white/25 hover:bg-white/5 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">Search</span>
            <span className="text-xs text-gray-500">v1.4.0</span>
            <span className="text-xs text-gray-500">MIT License</span>
            <span className="text-xs text-gray-500">15.2K {td.installs.toLowerCase()}</span>
          </div>

          {/* Mobile-only install button — visible below sm */}
          <div className="sm:hidden mb-6">
            <a href="#setup-mobile" className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {td.install}
            </a>
          </div>

          {/* Tab bar — full width divider */}
          <div className="flex items-center gap-1 border-b border-white/10 overflow-x-auto scrollbar-hide">
            {tabs.map((tab, i) => (
              <a
                key={tab.label}
                href={tab.href}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                  i === 0
                    ? "border-white text-white"
                    : "border-transparent text-gray-500 hover:text-gray-300 hover:border-white/20"
                }`}
              >
                {tab.label}
                {tab.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-gray-500">{tab.badge}</span>
                )}
              </a>
            ))}
          </div>

          {/* Content: two-column below tabs */}
          <div className="flex flex-col lg:flex-row gap-8 pt-6">
            {/* Left: Tab content */}
            <div className="flex-1 min-w-0">
              {/* Endpoints */}
              <section id="endpoints" className="mb-14 scroll-mt-24">
                <h2 className="text-lg font-semibold text-white mb-4">{td.endpointsTitle}</h2>
                <div className="space-y-3">
                  {mockEndpoints.map((endpoint, idx) => (
                    <div key={endpoint.path} className="rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 transition">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${methodColor[endpoint.method] || "bg-gray-500/10 text-gray-400"}`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono text-gray-300 break-all">
                          {endpoint.path.replace("{slug}", slug)}
                        </code>
                      </div>
                      <p className="text-sm text-gray-500 pl-[60px]">{epDescs[idx]}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tools */}
              <section id="tools" className="mb-14 scroll-mt-24">
                <h2 className="text-lg font-semibold text-white mb-2">{td.availableTools}</h2>
                <p className="text-sm text-gray-400 mb-4">{td.toolsDesc}</p>
                <div className="space-y-3">
                  {mockTools.map((tool) => (
                    <div key={tool.name} className="rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 transition">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-emerald-400 font-mono text-sm font-semibold">{tool.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">tool</span>
                      </div>
                      <p className="text-sm text-gray-500">{tool.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Comments */}
              <section id="comments" className="mb-14 scroll-mt-24">
                <h2 className="text-lg font-semibold text-white mb-4">{td.tabComments}</h2>
                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.user} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                          {comment.avatar}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-white">{comment.user}</span>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg key={i} className={`w-3 h-3 ${i < comment.rating ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">{comment.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Changelog */}
              <section id="changelog" className="mb-14 scroll-mt-24">
                <h2 className="text-lg font-semibold text-white mb-4">{td.tabChangelog}</h2>
                <div className="space-y-0">
                  {mockChangelog.map((entry, i) => (
                    <div key={entry.version} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full shrink-0 ${i === 0 ? "bg-emerald-400" : "bg-gray-600"}`} />
                        {i < mockChangelog.length - 1 && <div className="w-px flex-1 bg-white/5 mt-1" />}
                      </div>
                      <div className="pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-white">v{entry.version}</span>
                          {i === 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">{td.latest}</span>}
                          <span className="text-xs text-gray-500">{entry.date}</span>
                        </div>
                        <p className="text-sm text-gray-400">{entry.changes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Mobile-only install section — visible below sm, after all tabs */}
              <section id="setup-mobile" className="lg:hidden mb-14 scroll-mt-24">
                <h2 className="text-lg font-semibold text-white mb-4">{td.install}</h2>
                <div className="space-y-4">
                  {/* CLI */}
                  <div className="code-block rounded-xl border border-white/10 bg-[#111] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{td.installCli}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">{td.recommended}</span>
                      </div>
                      <CopyButton />
                    </div>
                    <div className="px-5 py-4 flex items-center gap-3">
                      <span className="text-emerald-400 font-mono text-sm select-none">$</span>
                      <code className="text-sm font-mono text-gray-200 select-all">npx @imagent/cli add {slug}</code>
                    </div>
                  </div>
                  {/* MCP */}
                  <div className="code-block rounded-xl border border-white/10 bg-[#111] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{td.installMcp}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">{td.httpLabel}</span>
                      </div>
                      <CopyButton />
                    </div>
                    <div className="px-5 py-4">
                      <code className="text-sm font-mono text-gray-200 select-all">https://mcp.imagent.ai/{slug}</code>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right sidebar — install + stats + info */}
            <div className="lg:w-80 shrink-0 space-y-5">
              {/* Install section — desktop only */}
              <div className="hidden lg:block space-y-4">
                {/* Install button */}
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {td.install}
                </a>

                {/* CLI */}
                <div className="code-block rounded-xl border border-white/10 bg-[#111] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white">{td.installCli}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">{td.recommended}</span>
                    </div>
                    <CopyButton />
                  </div>
                  <div className="px-5 py-3 flex items-center gap-3">
                    <span className="text-emerald-400 font-mono text-sm select-none">$</span>
                    <code className="text-xs font-mono text-gray-200 select-all">npx @imagent/cli add {slug}</code>
                  </div>
                </div>

                {/* MCP Server URL */}
                <div className="code-block rounded-xl border border-white/10 bg-[#111] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white">{td.installMcp}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">{td.httpLabel}</span>
                    </div>
                    <CopyButton />
                  </div>
                  <div className="px-5 py-3">
                    <code className="text-xs font-mono text-gray-200 select-all">https://mcp.imagent.ai/{slug}</code>
                  </div>
                </div>

                {/* JSON Config */}
                <div className="code-block rounded-xl border border-white/10 bg-[#111] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white">{td.installJson}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400">{td.manual}</span>
                    </div>
                    <CopyButton />
                  </div>
                  <pre className="px-5 py-3 text-xs text-gray-300 font-mono overflow-x-auto leading-relaxed">{`{
  "mcpServers": {
    "${slug}": {
      "type": "http",
      "url": "https://mcp.imagent.ai/${slug}"
    }
  }
}`}</pre>
                </div>

                {/* Skill */}
                <div className="code-block rounded-xl border border-white/10 bg-[#111] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white">{td.installSkill}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400">{td.oneLiner}</span>
                    </div>
                    <CopyButton />
                  </div>
                  <div className="px-5 py-3 flex items-center gap-3">
                    <span className="text-emerald-400 font-mono text-sm select-none">$</span>
                    <code className="text-xs font-mono text-gray-200 select-all">npx @imagent/cli skill add {slug}</code>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{td.trustScore}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-24 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-400" style={{ width: "96%" }} />
                    </div>
                    <span className="text-sm font-semibold text-white">96</span>
                  </div>
                </div>
                <div className="h-px bg-white/5" />
                {[
                  { label: td.version, value: "1.4.0" },
                  { label: td.installs, value: "15,234" },
                  { label: td.category, value: "Search" },
                  { label: td.protocol, value: "MCP" },
                  { label: td.license, value: "MIT" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{stat.label}</span>
                    <span className="text-sm text-white">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Service Type */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <span className="text-sm font-medium text-white">{td.remoteService}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{td.remoteServiceDesc}</p>
              </div>

              {/* Tags */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <span className="text-sm font-medium text-white mb-3 block">{td.tags}</span>
                <div className="flex flex-wrap gap-2">
                  {["web-search", "extraction", "crawling", "mapping", "research", "real-time"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-gray-400 border border-white/5 hover:border-white/10 transition cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 space-y-3">
                <span className="text-sm font-medium text-white block">{td.links}</span>
                {[
                  { label: td.githubRepo, href: "https://github.com" },
                  { label: td.documentation, href: "#" },
                  { label: td.homepage, href: `https://${slug}.com` },
                  { label: td.reportIssue, href: "#" },
                ].map((link) => (
                  <a key={link.label} href={link.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <section className="mt-16 pt-12 border-t border-white/5">
            <h2 className="text-2xl font-bold text-white mb-2">{td.relatedTitle}</h2>
            <p className="text-gray-400 mb-8">{td.relatedDesc} {toolName}.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockRelatedTools.map((tool) => (
                <a
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 hover:bg-white/[0.04] transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${tool.slug}.com&sz=64`}
                      alt={tool.name}
                      className="w-8 h-8 rounded-lg"
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-white truncate">{tool.name}</h3>
                      <span className="text-xs text-gray-500">{tool.category}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{tool.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      {tool.trustScore}
                    </div>
                    <span>{tool.installs} {td.installs.toLowerCase()}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
