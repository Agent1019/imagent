import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import { blogCategoryLabels, blogPosts } from "@/lib/i18n/blog";
import { localizedLabel } from "@/lib/i18n/labels";
import Layout from "@/app/layouts/Layout";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);
  const zh = locale === "zh";
  const description = zh
    ? "关于 MCP Server、AI Agent、协议设计和 Agent 基础设施的文章。"
    : "Insights on MCP servers, AI agents, protocol design, and the future of agent-native infrastructure.";

  return {
    title: zh ? "博客 | Imagent" : "Blog | Imagent",
    robots: { index: false, follow: false },
    description,
    openGraph: {
      title: zh ? "博客 | Imagent" : "Blog | Imagent",
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: zh ? "博客 | Imagent" : "Blog | Imagent",
      description,
    },
  };
}

const categories = ["All", "Engineering", "Product", "Tutorials", "Company"] as const;

export default async function Page() {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const zh = locale === "zh";
  const t = getContent(locale);

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <div className="pt-24">
        {/* Header */}
        <section className="px-4 md:px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              {zh ? "博客" : "Blog"}
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              {zh
                ? "关于 MCP Server、AI Agent、协议设计和 Agent 基础设施的文章。"
                : "Insights on MCP servers, AI agents, protocol design, and the future of agent-native infrastructure."}
            </p>
          </div>
        </section>

        {/* Category Filters */}
        <section className="px-4 md:px-6 pb-8">
          <div className="max-w-6xl mx-auto">
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
                  {localizedLabel(blogCategoryLabels, cat, zh)}
                </a>
              ))}
            </div>

            <p className="mt-6 text-sm text-gray-500">
              {zh ? `${blogPosts.length} 篇文章` : `${blogPosts.length} posts`}
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="px-4 md:px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
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
                        {localizedLabel(blogCategoryLabels, post.category, zh)}
                      </span>
                      <span className="text-xs text-gray-600">{zh ? post.dateZh : post.dateEn}</span>
                    </div>

                    <h2 className="text-lg font-semibold text-white group-hover:text-white/90 mb-2 leading-snug">
                      {zh ? post.titleZh : post.titleEn}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {zh ? post.excerptZh : post.excerptEn}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{zh ? post.readZh : post.readEn}</span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-300 transition flex items-center gap-1">
                        {zh ? "继续阅读" : "Read more"}
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
        <section className="px-4 md:px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between border-t border-white/5 pt-8">
              <span className="text-sm text-gray-600 cursor-default">
                {zh ? "上一页" : "Previous"}
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
                {zh ? "下一页" : "Next"}
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
