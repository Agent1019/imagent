import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import Layout from "@/app/layouts/Layout";
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
  { method: "GET", path: "/api/v1/tools/{slug}/capabilities", desc: "List all capabilities and tool functions available on this server." },
  { method: "POST", path: "/api/v1/tools/{slug}/invoke", desc: "Invoke a specific tool function with structured parameters." },
  { method: "GET", path: "/api/v1/tools/{slug}/health", desc: "Check server health status, uptime, average latency." },
  { method: "POST", path: "/api/v1/tools/{slug}/authenticate", desc: "Exchange an agent identity token (AIT) for a scoped access token." },
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

          {/* Tool Header */}
          <div className="flex flex-wrap items-start gap-5 mb-10">
            <img
              src={`https://www.google.com/s2/favicons?domain=${slug}.com&sz=128`}
              alt={toolName}
              className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{toolName}</h1>
                <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  96
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                A high-performance MCP server providing web search, content extraction, website crawling, and site mapping capabilities for AI agents. Built for reliability with structured outputs.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">Search</span>
                <span className="text-xs text-gray-500">v1.4.0</span>
                <span className="text-xs text-gray-500">MIT License</span>
                <span className="text-xs text-gray-500">15.2K installs</span>
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Tabbed content */}
            <div className="flex-1 min-w-0">
              {/* Tab bar */}
              <div className="flex items-center gap-1 border-b border-white/10 mb-6 overflow-x-auto scrollbar-hide">
                {[
                  { label: t.toolDetail.endpointsTitle, icon: "📋" },
                  { label: "Tools", icon: "🔧", badge: 5 },
                  { label: "Setup", icon: "⚡" },
                  { label: "Comments", icon: "💬", badge: 3 },
                  { label: "Changelog", icon: "📦", badge: 4 },
                ].map((tab, i) => (
                  <button
                    key={tab.label}
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                      i === 0
                        ? "border-white text-white"
                        : "border-transparent text-gray-500 hover:text-gray-300 hover:border-white/20"
                    }`}
                  >
                    <span className="text-xs">{tab.icon}</span>
                    {tab.label}
                    {tab.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-gray-500">{tab.badge}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab: Overview / Endpoints */}
              <div className="space-y-4 mb-12">
                <h2 className="text-lg font-semibold text-white mb-4">{td.endpointsTitle}</h2>
                {mockEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.path}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 transition"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${methodColor[endpoint.method] || "bg-gray-500/10 text-gray-400"}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-gray-300 break-all">
                        {endpoint.path.replace("{slug}", slug)}
                      </code>
                    </div>
                    <p className="text-sm text-gray-500 pl-[60px]">{endpoint.desc}</p>
                  </div>
                ))}
              </div>

              {/* Tab: Tools */}
              <div className="mb-12">
                <h2 className="text-lg font-semibold text-white mb-4">Available Tools</h2>
                <p className="text-sm text-gray-400 mb-4">This server exposes {mockTools.length} tools that your agent can invoke.</p>
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
              </div>

              {/* Tab: Setup */}
              <div className="mb-12">
                <h2 className="text-lg font-semibold text-white mb-4">Quick Setup</h2>
                <div className="rounded-xl border border-white/10 bg-[#111] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-xs text-gray-500 ml-1">terminal</span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 font-mono text-sm">$</span>
                      <code className="text-sm font-mono text-gray-200">npx @imagent/cli add {slug}</code>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 font-mono text-sm">$</span>
                      <code className="text-sm font-mono text-gray-200">npx @imagent/cli configure {slug}</code>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-sm text-gray-400">Or add as a Skill with one command:</p>
                  <code className="text-xs font-mono text-gray-300 mt-2 block bg-black/30 rounded-lg px-3 py-2">npx @imagent/cli skill add {slug}</code>
                </div>
              </div>

              {/* Tab: Comments */}
              <div className="mb-12">
                <h2 className="text-lg font-semibold text-white mb-4">Comments</h2>
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
              </div>

              {/* Tab: Changelog */}
              <div className="mb-12">
                <h2 className="text-lg font-semibold text-white mb-4">Changelog</h2>
                <div className="space-y-4">
                  {mockChangelog.map((entry, i) => (
                    <div key={entry.version} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full shrink-0 ${i === 0 ? "bg-emerald-400" : "bg-gray-600"}`} />
                        {i < mockChangelog.length - 1 && <div className="w-px flex-1 bg-white/5 mt-1" />}
                      </div>
                      <div className="pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-white">v{entry.version}</span>
                          {i === 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Latest</span>}
                          <span className="text-xs text-gray-500">{entry.date}</span>
                        </div>
                        <p className="text-sm text-gray-400">{entry.changes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="lg:w-80 shrink-0 space-y-5">
              {/* Install button */}
              <a
                href="#"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Install
              </a>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 border border-white/10 rounded-xl text-sm text-gray-300 hover:border-white/25 hover:bg-white/5 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>
                  Refresh
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-white/10 rounded-xl text-sm text-gray-300 hover:border-white/25 hover:bg-white/5 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
                  Share
                </a>
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
                  { label: "Version", value: "1.4.0" },
                  { label: "Installs", value: "15,234" },
                  { label: "Category", value: "Search" },
                  { label: "Protocol", value: "MCP" },
                  { label: "License", value: "MIT" },
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
                  <span className="text-sm font-medium text-white">Remote Service</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  This tool runs remotely on the provider&apos;s infrastructure. No local installation or setup required.
                </p>
              </div>

              {/* Tags */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <span className="text-sm font-medium text-white mb-3 block">Tags</span>
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
                <span className="text-sm font-medium text-white block">Links</span>
                {[
                  { label: "GitHub Repository", href: "https://github.com" },
                  { label: "Documentation", href: "#" },
                  { label: "Homepage", href: `https://${slug}.com` },
                  { label: "Report Issue", href: "#" },
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <span>{tool.installs} installs</span>
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
