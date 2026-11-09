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
    robots: { index: false, follow: false },
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

const endpointKeys = ["epList", "epInvoke", "epHealth", "epAuth"] as const;

const mockEndpoints = [
  {
    method: "GET",
    path: "/api/v1/tools/{slug}/capabilities",
  },
  {
    method: "POST",
    path: "/api/v1/tools/{slug}/invoke",
  },
  {
    method: "GET",
    path: "/api/v1/tools/{slug}/health",
  },
  {
    method: "POST",
    path: "/api/v1/tools/{slug}/authenticate",
  },
];

const mockRelatedTools = [
  { slug: "pdf-generator", name: "PDF Generator", category: "Documents", trustScore: 96, description: "Convert markdown, HTML, or structured data to PDF with templates." },
  { slug: "image-resize", name: "Image Resize", category: "Media", trustScore: 94, description: "Resize, crop, and optimize images for web and mobile delivery." },
  { slug: "code-analyzer", name: "Code Analyzer", category: "Developer Tools", trustScore: 92, description: "Static analysis and vulnerability scanning for source code repositories." },
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
    GET: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    POST: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    PUT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <div className="pt-24">
        {/* Hero */}
        <section className="px-4 md:px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Developer Tools
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {td.trustScore}: 96
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {toolName}
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              A high-performance MCP server that provides structured tool capabilities for AI agents.
              Built for reliability with built-in authentication, usage metering, and real-time health monitoring.
            </p>

            {/* Terminal Copy Block */}
            <div className="mt-8 rounded-xl border border-white/10 bg-[#111111] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-gray-500 ml-2">{td.terminal}</span>
                </div>
                <span className="text-xs text-gray-600">{td.copyCmd}</span>
              </div>
              <div className="px-5 py-4 flex items-center gap-3">
                <span className="text-emerald-400 font-mono text-sm">$</span>
                <code className="text-sm font-mono text-gray-200">npx @imagent/cli add {slug}</code>
              </div>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="px-4 md:px-6 py-16 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">{td.endpointsTitle}</h2>
            <p className="text-gray-400 mb-8">{td.endpointsDesc}</p>

            <div className="space-y-4">
              {mockEndpoints.map((endpoint, idx) => (
                <div
                  key={endpoint.path}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 transition"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span
                      className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${methodColor[endpoint.method] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-sm font-mono text-gray-300 break-all">
                      {endpoint.path.replace("{slug}", slug)}
                    </code>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed pl-0 sm:pl-[52px]">
                    {td[endpointKeys[idx]]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="px-4 md:px-6 py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">{td.relatedTitle}</h2>
            <p className="text-gray-400 mb-8">{td.relatedDesc} {toolName}.</p>

            <div className="grid md:grid-cols-3 gap-6">
              {mockRelatedTools.map((tool) => (
                <a
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 hover:bg-white/[0.04] transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                      {tool.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-emerald-400">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {tool.trustScore}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-white/90 mb-1.5">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {tool.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
