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

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} | Blog | Imagent`,
    robots: { index: false, follow: false },
    description: `Read our latest insights on ${title.toLowerCase()}. Technical deep dives, product updates, and tutorials from the Imagent team.`,
    openGraph: {
      title: `${title} | Blog | Imagent`,
      description: `Read our latest insights on ${title.toLowerCase()}.`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Blog | Imagent`,
      description: `Read our latest insights on ${title.toLowerCase()}.`,
    },
  };
}

const relatedArticles = [
  {
    slug: "understanding-mcp-protocol-architecture",
    category: "Engineering",
    date: "Mar 12, 2026",
    title: "Understanding MCP Protocol Architecture: A Deep Dive",
    readTime: "8 min read",
    gradient: "from-orange-500/20 via-rose-500/20 to-purple-500/20",
  },
  {
    slug: "launching-tool-discovery-v2",
    category: "Product",
    date: "Mar 3, 2026",
    title: "Launching Tool Discovery v2: Semantic Search for Agents",
    readTime: "5 min read",
    gradient: "from-violet-500/20 via-fuchsia-500/20 to-pink-500/20",
  },
  {
    slug: "build-your-first-mcp-server",
    category: "Tutorials",
    date: "Feb 26, 2026",
    title: "Build Your First MCP Server in Under 30 Minutes",
    readTime: "12 min read",
    gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
  },
];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const subtitle = "A comprehensive guide to building and scaling agent-native infrastructure with modern protocols.";

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <div className="pt-24">
        <article className="px-4 md:px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <a href="/blog" className="hover:text-white transition">Blog</a>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-400">Engineering</span>
            </nav>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {subtitle}
            </p>

            {/* Author Line */}
            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/5">
              {/* Avatar placeholder */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/40 to-purple-500/40 flex items-center justify-center text-sm font-bold text-white">
                Y
              </div>
              <div>
                <div className="text-sm font-medium text-white">Imagent Team</div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>Mar 12, 2026</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span>10 min read</span>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="h-64 rounded-xl bg-gradient-to-br from-orange-500/20 via-rose-500/20 to-purple-500/20 relative mb-12 overflow-hidden">
              <div className="absolute inset-0 bg-[#0a0a0a]/10" />
            </div>

            {/* TL;DR */}
            <section className="mb-12">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">TL;DR</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">&#x2022;</span>
                    MCP enables structured, schema-driven communication between AI agents and external tools.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">&#x2022;</span>
                    Agent-native auth requires scoped tokens with automatic rotation and zero human-in-the-loop patterns.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">&#x2022;</span>
                    Production deployments need capability manifests, health checks, and usage metering as first-class concerns.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">&#x2022;</span>
                    The Imagent registry provides discovery, authentication, and billing in a unified platform.
                  </li>
                </ul>
              </div>
            </section>

            {/* Body Content */}
            <div className="prose-invert max-w-none">
              {/* Section 1 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">The Problem with Human-Native APIs</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Traditional APIs were designed for human developers building browser and mobile applications. They assume interactive authentication flows, human-readable documentation, and manual integration processes. When AI agents need to interact with these APIs, they face fundamental friction points.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Agents cannot fill out OAuth consent screens. They cannot read unstructured README files to understand rate limits. They cannot make judgment calls about whether a 429 response means &quot;retry in 30 seconds&quot; or &quot;your account is suspended.&quot; The entire API ecosystem needs a parallel track designed for machine consumption.
                </p>
              </section>

              {/* Section 2 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">MCP: A Structured Protocol for Agents</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  The Model Context Protocol (MCP) addresses this gap by providing a structured, schema-driven way for agents to discover and interact with tools. Each MCP server publishes a capability manifest describing its tools, parameters, and output formats in machine-readable JSON Schema.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Here is an example of how an agent connects to an MCP server through the Imagent registry:
                </p>

                {/* Code Block */}
                <div className="rounded-xl border border-white/10 bg-[#111111] overflow-hidden mb-6">
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

// Discover tools by capability
const tools = await client.search({
  capability: "generate PDF from markdown",
  protocol: "mcp",
  minTrustScore: 0.8,
});

// Authenticate and invoke
const result = await client.invoke({
  server: tools[0].id,
  method: "generate_pdf",
  params: {
    content: "# Report\\n\\nGenerated at " + new Date().toISOString(),
    template: "corporate",
  },
});

console.log(result.output.url);
// https://cdn.imagent.ai/outputs/abc123.pdf`}</code>
                  </pre>
                </div>
              </section>

              {/* Section 3: Comparison Table */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Human-Native vs. Agent-Native APIs</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  The fundamental difference lies in how each API paradigm handles discovery, authentication, and error responses. Here is a comparison:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Feature</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Human-Native</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Agent-Native</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Discovery</td>
                        <td className="py-3 px-4">Documentation websites</td>
                        <td className="py-3 px-4">Machine-readable manifests</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Auth</td>
                        <td className="py-3 px-4">OAuth consent screens</td>
                        <td className="py-3 px-4">Scoped tokens, no UI</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Error handling</td>
                        <td className="py-3 px-4">Human-readable messages</td>
                        <td className="py-3 px-4">Structured semantic errors</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Rate limiting</td>
                        <td className="py-3 px-4">429 + Retry-After header</td>
                        <td className="py-3 px-4">Structured quota + backoff</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-white font-medium">Billing</td>
                        <td className="py-3 px-4">Manual subscription</td>
                        <td className="py-3 px-4">Per-call metering</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Looking Ahead</h2>
                <p className="text-gray-400 leading-relaxed">
                  As the agent ecosystem matures, we expect protocol convergence. MCP, A2A, and Function Calling protocols will share common infrastructure layers. The teams that invest in agent-native tooling today will have a significant distribution advantage when autonomous agents become the primary consumers of external services.
                </p>
              </section>
            </div>

            {/* Tags */}
            <section className="mb-16 pt-8 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {["MCP", "Agent Infrastructure", "Protocol Design", "Authentication", "Imagent"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </article>

        {/* Related Articles */}
        <section className="px-4 md:px-6 pb-16 border-t border-white/5 pt-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <a
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 hover:bg-white/[0.04] transition"
                >
                  <div className={`h-36 bg-gradient-to-br ${article.gradient} relative`}>
                    <div className="absolute inset-0 bg-[#0a0a0a]/20" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-600">{article.date}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white group-hover:text-white/90 mb-2 leading-snug">
                      {article.title}
                    </h3>
                    <span className="text-xs text-gray-600">{article.readTime}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
