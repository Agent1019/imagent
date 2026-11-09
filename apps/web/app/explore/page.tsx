import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import Layout from "@/app/layouts/Layout";
import type { Metadata } from "next";
import { getPackages, type PackageListItem } from "@/lib/data/packages";
import { ToolCard } from "./ToolCard";

const categoryLabelsZh: Record<string, string> = {
  All: "全部",
  Search: "搜索",
  Data: "数据",
  Finance: "金融",
  Social: "社交",
  Communication: "通讯",
  DevTools: "开发工具",
  "AI/ML": "AI/ML",
  Productivity: "生产力",
  Media: "媒体",
  "E-commerce": "电商",
  Jobs: "招聘",
  Travel: "出行",
  Weather: "天气",
  News: "新闻",
  Legal: "法律",
  Software: "软件",
  Maps: "地图",
  Marketing: "营销",
  Analytics: "分析",
  Trade: "贸易",
  Agents: "Agent",
  Other: "其他",
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);

  const title = locale === "zh" ? "探索 MCP Server - Imagent" : "Explore MCP Servers - Imagent";
  const description = locale === "zh"
    ? "浏览和发现数百个 MCP Server。按类别筛选，找到适合你 AI Agent 的工具。"
    : "Browse and discover hundreds of MCP servers. Filter by category to find the right tools for your AI agents.";

  return { title, description, robots: { index: true, follow: true } };
}

type PageProps = { searchParams: Promise<{ category?: string }> };

export default async function ExplorePage({ searchParams }: PageProps) {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);
  const isZh = locale === "zh";

  const params = await searchParams;
  const activeCategory = params.category || "All";

  // Fetch from database
  const result = await getPackages({
    page: 1,
    pageSize: 300,
    category: activeCategory === "All" ? undefined : activeCategory,
  });

  const tools = result.data;
  const total = result.total;

  // Get unique categories from DB data
  const allResult = await getPackages({ page: 1, pageSize: 1 });
  const categories = ["All", "Search", "Data", "AI/ML", "Finance", "Social", "E-commerce", "Communication", "DevTools", "Jobs", "Travel", "News", "Software", "Maps", "Legal"];

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      {/* Page Header */}
      <section className="pt-32 pb-16 px-4 md:px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {isZh ? "探索 MCP Server" : "Explore MCP Servers"}
          </h1>
          <p className="mt-3 text-gray-400 max-w-2xl">
            {isZh
              ? "浏览数百个为 AI Agent 构建的工具。按类别筛选，找到你需要的能力。"
              : "Browse hundreds of tools built for AI agents. Filter by category to find the capabilities you need."}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Category Filters */}
            <aside className="lg:w-56 shrink-0">
              <div className="lg:sticky lg:top-24">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  {isZh ? "分类" : "Categories"}
                </h2>
                <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat;
                    const label = isZh ? categoryLabelsZh[cat] || cat : cat;
                    return (
                      <a
                        key={cat}
                        href={cat === "All" ? "/explore" : `/explore?category=${cat}`}
                        className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm transition ${
                          isActive ? "bg-white/10 text-white font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {label}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Results count */}
              <p className="text-xs text-gray-500 mb-4">
                {isZh ? `显示 ${total} 个工具` : `Showing ${total} tools`}
                {activeCategory !== "All" && (
                  <span>
                    {" "}{isZh ? "分类：" : "in "}<span className="text-gray-300">{activeCategory}</span>
                  </span>
                )}
              </p>

              {/* Tool Grid */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} isZh={isZh} />
                ))}
              </div>

              {/* Empty state */}
              {tools.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <p className="text-gray-400">
                    {isZh ? "该分类下暂无工具" : "No tools found in this category."}
                  </p>
                  <a href="/explore" className="inline-block mt-4 text-sm text-white/70 hover:text-white transition">
                    {isZh ? "查看全部工具" : "View all tools"} &rarr;
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
