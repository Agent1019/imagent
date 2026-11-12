import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import Layout from "@/app/layouts/Layout";
import CopyButton from "@/app/components/CopyButton";
import InstallConfig from "@/app/components/InstallConfig";
import ToolIcon from "@/app/components/ToolIcon";
import StickyTabs from "@/app/components/StickyTabs";
import { getPackageBySlug } from "@/lib/data/packages";
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
    openGraph: { title: `${toolName} - MCP Server | Imagent`, description: `Discover ${toolName} on Imagent.`, type: "website" },
    twitter: { card: "summary_large_image", title: `${toolName} - MCP Server | Imagent` },
  };
}

const mockEndpoints = [
  { method: "GET", path: "/api/v1/tools/{slug}/capabilities", price: "Free" },
  { method: "POST", path: "/api/v1/tools/{slug}/invoke", price: "$0.01/call" },
  { method: "GET", path: "/api/v1/tools/{slug}/health", price: "Free" },
  { method: "POST", path: "/api/v1/tools/{slug}/authenticate", price: "Free" },
];

const mockTools = [
  { name: "search", desc: "Search the web for real-time information on any topic with structured results.", rateLimit: "100 req/min", price: "$0.01/call" },
  { name: "extract", desc: "Extract raw page content from URLs in markdown or text format.", rateLimit: "50 req/min", price: "$0.005/call" },
  { name: "crawl", desc: "Crawl websites starting from a URL to collect content with configurable depth.", rateLimit: "20 req/min", price: "$0.02/call" },
  { name: "map", desc: "Map website structures by listing all URLs starting from a base URL.", rateLimit: "30 req/min", price: "$0.01/call" },
  { name: "research", desc: "Deep research across multiple sources with citation and fact-checking.", rateLimit: "20 req/min", price: "$0.05/call" },
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

const mockUseCases = [
  { title: "AI Research Agent", desc: "Use search + research tools to build an agent that answers questions with real-time web data and citations.", code: `const tools = await client.search({ capability: "web research" });\nconst result = await client.invoke({ server: tools[0].id, method: "research", params: { query: "AI trends 2026" } });` },
  { title: "Content Pipeline", desc: "Crawl websites and extract structured content for knowledge base ingestion.", code: `const pages = await client.invoke({ server: id, method: "crawl", params: { url: "https://docs.example.com" } });\nconst content = await client.invoke({ server: id, method: "extract", params: { url: pages[0] } });` },
  { title: "Competitive Monitoring", desc: "Map competitor sites and track structural changes over time.", code: `const sitemap = await client.invoke({ server: id, method: "map", params: { url: "https://competitor.com" } });` },
];

const mockGuides = [
  { q: "How do I authenticate with this MCP server?", a: "Use your Imagent identity token (AIT). Run `npx @imagent/cli configure tavily` to set up authentication automatically. The CLI handles token refresh and scoping." },
  { q: "What happens when I exceed the rate limit?", a: "Imagent queues overflow requests transparently. Your agent receives a 429 status with a retry-after header. No data is lost." },
  { q: "Can I use this with LangChain or CrewAI?", a: "Yes. Any framework that supports MCP, A2A, or function calling works out of the box. The protocol is handled automatically." },
  { q: "How is billing handled?", a: "Pay per call. Each tool publishes its price, and you're billed from your unified Imagent balance. Failed calls are never charged." },
];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);
  const td = t.toolDetail;
  const tool = await getPackageBySlug(slug).catch((error: unknown) => {
    console.error("Unable to load tool icon metadata:", error);
    return null;
  });
  const toolName = tool?.name || slug.charAt(0).toUpperCase() + slug.slice(1);

  const methodColor: Record<string, string> = {
    GET: "bg-emerald-500/10 text-emerald-400",
    POST: "bg-orange-500/10 text-orange-400",
    PUT: "bg-blue-500/10 text-blue-400",
    DELETE: "bg-red-500/10 text-red-400",
  };

  const epDescs = [td.epList, td.epInvoke, td.epHealth, td.epAuth];

  const tabs = [
    { label: td.endpointsTitle, href: "#endpoints" },
    { label: td.tabTools, href: "#tools" },
    { label: "Use Cases", href: "#usecases" },
    { label: td.tabChangelog, href: "#changelog" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <div className="pt-20 pb-24">
        <div className="tool-detail-layout max-w-7xl mx-auto px-4 md:px-6" data-tool-detail-layout>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <a href="/" className="hover:text-white transition">Imagent</a>
            <span>/</span>
            <a href="/explore" className="hover:text-white transition">{t.explore.title}</a>
            <span>/</span>
            <span className="text-gray-300">{toolName}</span>
          </nav>

          {/* Tool Header */}
          <div className="mb-6" data-tool-header>
            <div className="flex flex-wrap items-start gap-x-3 sm:gap-x-4 gap-y-3">
              <ToolIcon
                slug={slug}
                name={toolName}
                src={tool?.logoUrl}
                color={tool?.color}
                className="w-14 h-14 rounded-xl"
                loading="eager"
              />
              <div className="flex-1 min-w-0" data-tool-summary>
                {/* Title + mobile action icons (share & github) */}
                <div className="flex items-center justify-between gap-2 min-w-0 mb-1.5">
                  <h1 className="min-w-0 truncate text-xl sm:text-2xl font-bold text-white">{toolName}</h1>
                  {/* Mobile-only: share & github beside the title */}
                  <div className="flex items-center gap-1 sm:hidden shrink-0">
                    <a href="#" className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-300 hover:bg-white/5 transition" aria-label={td.share}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-300 hover:bg-white/5 transition" aria-label="GitHub">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  </div>
                </div>
                {/* Badges + capability tags — single line, scrollable */}
                <div className="flex items-center gap-1.5 mb-2 overflow-x-auto scrollbar-hide whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    96
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Active
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">Search</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Tools
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20 shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    Resources
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20 shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    Prompts
                  </span>
                </div>
              </div>
              {/* Action buttons — desktop only (mobile icons sit next to title) */}
              <div className="hidden sm:flex items-center gap-2 shrink-0 sm:ml-auto" data-tool-actions>
                <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-white/25 hover:bg-white/5 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
                  <span>{td.share}</span>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-white/25 hover:bg-white/5 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Description — below icon row, left-aligned */}
            <p className="text-gray-400 text-sm leading-relaxed mt-3">
              A high-performance MCP server providing web search, content extraction, website crawling, and site mapping capabilities for AI agents.
            </p>

            {/* Author + stats — single line, horizontal scroll on overflow */}
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 overflow-x-auto scrollbar-hide whitespace-nowrap">
              <span className="shrink-0">by <a href={`https://${slug}.com`} target="_blank" rel="noopener noreferrer" className="text-gray-300 underline decoration-gray-600 underline-offset-2 hover:text-white hover:decoration-gray-400 transition">tavily-ai</a></span>
              <span>v1.4.0</span>
              <span>MIT License</span>
              <span className="flex items-center gap-1 shrink-0">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                4.8 (126)
              </span>
              <span className="flex items-center gap-1 shrink-0">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                2.0K
              </span>
              <span className="shrink-0">15.2K {td.installs.toLowerCase()}</span>
            </div>
          </div>

          {/* Mobile-only install section — above tabs */}
          <section id="setup-mobile" className="lg:hidden pt-2 pb-4">
            <InstallConfig slug={slug} t={{
              installConfig: td.installConfig, viewDetails: td.viewDetails,
              tabInstall: td.tabInstall, tabPublish: td.tabPublish,
              iamAgent: td.iamAgent, iamHuman: td.iamHuman,
              agentPromptHint: td.agentPromptHint, agentPromptLabel: td.agentPromptLabel,
              copyPrompt: td.copyPrompt,
              installCli: td.installCli, installMcp: td.installMcp,
              installJson: td.installJson, installSkill: td.installSkill,
              recommended: td.recommended, httpLabel: td.httpLabel,
              manual: td.manual, oneLiner: td.oneLiner,
            }} />
          </section>

          {/* Tab bar — sticky with scroll spy */}
          <StickyTabs tabs={tabs} />

          {/* Content: two-column below tabs */}
          <div className="flex flex-col lg:flex-row gap-8 pt-6">
            {/* Left: Tab content */}
            <div className="flex-1 min-w-0">
              {/* Endpoints */}
              <section id="endpoints" className="mb-8 scroll-mt-24">
                <h2 className="text-lg font-semibold text-white mb-4">{td.endpointsTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {mockEndpoints.map((endpoint, idx) => (
                    <div key={endpoint.path} className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 hover:border-white/20 hover:bg-white/[0.06] transition">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${methodColor[endpoint.method] || "bg-gray-500/10 text-gray-400"}`}>
                          {endpoint.method}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400">{endpoint.price}</span>
                      </div>
                      <code className="text-xs font-mono text-gray-300 break-all block mb-2 leading-relaxed">
                        {endpoint.path.replace("{slug}", slug)}
                      </code>
                      <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{epDescs[idx]}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tools with pricing + rate limits */}
              <section id="tools" className="mb-8 scroll-mt-24">
                <h2 className="text-lg font-semibold text-white mb-2">{td.availableTools}</h2>
                <p className="text-sm text-gray-400 mb-4">{mockTools.length} {td.toolsDesc}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {mockTools.map((tool) => (
                    <div key={tool.name} className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 hover:border-white/20 hover:bg-white/[0.06] transition">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-400 font-mono text-sm font-semibold">{tool.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">tool</span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-3">{tool.desc}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 border-t border-white/[0.08] pt-2">
                        <span>{tool.rateLimit}</span>
                        <span className="text-white font-medium">{tool.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Use Cases */}
              <section id="usecases" className="mb-8 scroll-mt-24">
                <h2 className="text-lg font-semibold text-white mb-4">Use Cases</h2>
                <div className="space-y-4">
                  {mockUseCases.map((uc) => (
                    <div key={uc.title} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                      <h3 className="text-sm font-semibold text-white mb-1">{uc.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{uc.desc}</p>
                      <div className="code-block rounded-lg border border-white/10 bg-[#111] overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                          <span className="text-[10px] text-gray-500">agent.ts</span>
                          <CopyButton />
                        </div>
                        <pre className="px-4 py-3 text-xs text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">{uc.code}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Changelog */}
              <section id="changelog" className="mb-8 scroll-mt-24">
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

              {/* FAQ */}
              <section id="faq" className="mb-8 scroll-mt-24">
                <h2 className="text-lg font-semibold text-white mb-4">FAQ</h2>
                <div className="divide-y divide-white/5">
                  {mockGuides.map((item, i) => (
                    <details key={i} className="group">
                      <summary className="flex items-center justify-between py-4 cursor-pointer text-sm font-medium hover:text-white transition list-none">
                        {item.q}
                        <svg className="w-4 h-4 text-gray-500 shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Right sidebar — desktop install and trust summary; other cards remain mobile-only. */}
            <aside className="tool-detail-sidebar lg:w-80 shrink-0" data-tool-sidebar>
              {/* Install section — desktop only */}
              <div className="hidden lg:block" data-tool-install-desktop>
                <InstallConfig slug={slug} showDetails={false} t={{
                  installConfig: td.installConfig, viewDetails: td.viewDetails,
                  tabInstall: td.tabInstall, tabPublish: td.tabPublish,
                  iamAgent: td.iamAgent, iamHuman: td.iamHuman,
                  agentPromptHint: td.agentPromptHint, agentPromptLabel: td.agentPromptLabel,
                  copyPrompt: td.copyPrompt,
                  installCli: td.installCli, installMcp: td.installMcp,
                  installJson: td.installJson, installSkill: td.installSkill,
                  recommended: td.recommended, httpLabel: td.httpLabel,
                  manual: td.manual, oneLiner: td.oneLiner,
                }} />
              </div>

              {/* Rating — mobile only */}
              <div className="lg:hidden rounded-xl border border-white/5 bg-white/[0.02] p-5" data-tool-sidebar-extra="rating">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-bold text-white">4.8</span>
                  <div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < 5 ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">126 ratings</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1;
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="text-gray-500 w-3">{star}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full rounded-full bg-yellow-400/60" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-gray-500 w-8 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trust score and metadata */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 space-y-4" data-tool-trust>
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
                  { label: td.version, value: "1.4.0", mobileOnly: true },
                  { label: td.installs, value: "15,234" },
                  { label: td.category, value: "Search", mobileOnly: true },
                  { label: td.protocol, value: "MCP" },
                  { label: td.license, value: "MIT" },
                ].map((stat) => (
                  <div key={stat.label} className={`${stat.mobileOnly ? "lg:hidden " : ""}flex items-center justify-between`} data-tool-stat={stat.mobileOnly ? "mobile-only" : undefined}>
                    <span className="text-sm text-gray-500">{stat.label}</span>
                    <span className="text-sm text-white">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Service Type — mobile only */}
              <div className="lg:hidden rounded-xl border border-white/5 bg-white/[0.02] p-5" data-tool-sidebar-extra="service">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <span className="text-sm font-medium text-white">{td.remoteService}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{td.remoteServiceDesc}</p>
              </div>

              {/* Tags — mobile only */}
              <div className="lg:hidden rounded-xl border border-white/5 bg-white/[0.02] p-5" data-tool-sidebar-extra="tags">
                <span className="text-sm font-medium text-white mb-3 block">{td.tags}</span>
                <div className="flex flex-wrap gap-2">
                  {["web-search", "extraction", "crawling", "mapping", "research", "real-time"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-gray-400 border border-white/5 hover:border-white/10 transition cursor-pointer">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Links — mobile only */}
              <div className="lg:hidden rounded-xl border border-white/5 bg-white/[0.02] p-5 space-y-3" data-tool-sidebar-extra="links">
                <span className="text-sm font-medium text-white block">{td.links}</span>
                {[
                  { label: td.githubRepo, href: "https://github.com" },
                  { label: td.documentation, href: "#" },
                  { label: td.homepage, href: `https://${slug}.com` },
                  { label: td.reportIssue, href: "#" },
                ].map((link) => (
                  <a key={link.label} href={link.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </aside>
          </div>

          {/* Related Tools */}
          <section className="mt-10 pt-8 border-t border-white/5">
            <h2 className="text-2xl font-bold text-white mb-2">{td.relatedTitle}</h2>
            <p className="text-gray-400 mb-8">{td.relatedDesc} {toolName}.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockRelatedTools.map((tool) => (
                <a key={tool.slug} href={`/tools/${tool.slug}`} className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 hover:bg-white/[0.04] transition">
                  <div className="flex items-center gap-3 mb-3">
                    <ToolIcon slug={tool.slug} name={tool.name} className="w-8 h-8 rounded-lg" />
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
