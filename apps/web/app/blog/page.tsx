import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import Layout from "@/app/layouts/Layout";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);

  return {
    title: "Blog | Imagent",
    robots: { index: false, follow: false },
    description: "Insights on MCP servers, AI agents, protocol design, and the future of agent-native infrastructure.",
    openGraph: {
      title: "Blog | Imagent",
      description: "Insights on MCP servers, AI agents, protocol design, and the future of agent-native infrastructure.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | Imagent",
      description: "Insights on MCP servers, AI agents, protocol design, and the future of agent-native infrastructure.",
    },
  };
}

const categories = ["All", "Engineering", "Product", "Tutorials", "Company"] as const;

const mockPosts = [
  {
    slug: "understanding-mcp-protocol-architecture",
    category: "Engineering",
    date: "Mar 12, 2026",
    title: "Understanding MCP Protocol Architecture: A Deep Dive",
    excerpt: "How the Model Context Protocol enables structured communication between AI agents and external tools, and why it matters for production systems.",
    readTime: "8 min read",
    gradient: "from-orange-500/20 via-rose-500/20 to-purple-500/20",
  },
  {
    slug: "agent-authentication-best-practices",
    category: "Engineering",
    date: "Mar 8, 2026",
    title: "Agent Authentication Best Practices for Production",
    excerpt: "Scoped tokens, identity chains, and zero-trust patterns — a practical guide to securing autonomous agent-to-tool interactions at scale.",
    readTime: "6 min read",
    gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
  },
  {
    slug: "launching-tool-discovery-v2",
    category: "Product",
    date: "Mar 3, 2026",
    title: "Launching Tool Discovery v2: Semantic Search for Agents",
    excerpt: "Our new vector-based search engine lets agents find tools by capability description, not just by name. Here is what changed and why.",
    readTime: "5 min read",
    gradient: "from-violet-500/20 via-fuchsia-500/20 to-pink-500/20",
  },
  {
    slug: "build-your-first-mcp-server",
    category: "Tutorials",
    date: "Feb 26, 2026",
    title: "Build Your First MCP Server in Under 30 Minutes",
    excerpt: "A step-by-step tutorial covering server setup, capability manifests, schema validation, and publishing to the Imagent registry.",
    readTime: "12 min read",
    gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
  },
  {
    slug: "why-agent-economy-needs-infrastructure",
    category: "Company",
    date: "Feb 18, 2026",
    title: "Why the Agent Economy Needs Dedicated Infrastructure",
    excerpt: "Human-native APIs were built for browsers and mobile apps. Agent-native infrastructure requires a fundamentally different approach to auth, billing, and discovery.",
    readTime: "7 min read",
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
  },
  {
    slug: "usage-based-billing-for-mcp-servers",
    category: "Product",
    date: "Feb 10, 2026",
    title: "Usage-Based Billing for MCP Servers: How It Works",
    excerpt: "A technical breakdown of our metering pipeline, from invocation events to invoice generation. Includes webhook integration and real-time dashboards.",
    readTime: "9 min read",
    gradient: "from-rose-500/20 via-pink-500/20 to-fuchsia-500/20",
  },
];

export default async function Page() {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <div className="pt-24">
        {/* Header */}
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Blog
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              Insights on MCP servers, AI agents, protocol design, and the future of agent-native infrastructure.
            </p>
          </div>
        </section>

        {/* Category Filters */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <a
                  key={cat}
                  href={i === 0 ? "/blog" : `/blog?category=${cat.toLowerCase()}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                    i === 0
                      ? "bg-white text-black border-white hover:bg-gray-200"
                      : "bg-white/[0.03] text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat}
                </a>
              ))}
            </div>

            {/* Results Count */}
            <p className="mt-6 text-sm text-gray-500">
              {mockPosts.length} posts
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mockPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 hover:bg-white/[0.04] transition"
                >
                  {/* Gradient Placeholder Image */}
                  <div className={`h-48 bg-gradient-to-br ${post.gradient} relative`}>
                    <div className="absolute inset-0 bg-[#0a0a0a]/20" />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-600">{post.date}</span>
                    </div>

                    <h2 className="text-lg font-semibold text-white group-hover:text-white/90 mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{post.readTime}</span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-300 transition flex items-center gap-1">
                        Read more
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Pagination */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between border-t border-white/5 pt-8">
              <span className="text-sm text-gray-600 cursor-default">
                Previous
              </span>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-black text-sm font-medium">
                  1
                </span>
                <a
                  href="/blog?page=2"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition"
                >
                  2
                </a>
                <a
                  href="/blog?page=3"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition"
                >
                  3
                </a>
              </div>
              <a
                href="/blog?page=2"
                className="text-sm text-gray-400 hover:text-white transition flex items-center gap-1"
              >
                Next
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
