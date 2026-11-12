import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import Layout from "@/app/layouts/Layout";
import type { Metadata } from "next";
import { getPackages, type PackageListItem } from "@/lib/data/packages";
import { ToolCard } from "./ToolCard";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);
  const t = getContent(locale);

  const title = `${t.explore.title} - Imagent`;
  const description = t.explore.subtitle;

  return { title, description, robots: { index: true, follow: true } };
}

type PageProps = { searchParams: Promise<{ category?: string; tab?: string }> };

export default async function ExplorePage({ searchParams }: PageProps) {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);
  const isZh = locale === "zh";

  const params = await searchParams;
  const activeTab = params.tab || "mcp";
  const activeCategory = params.category || "All";

  // Fetch MCP data (always, for MCP tab)
  const result = await getPackages({
    page: 1,
    pageSize: 300,
    category: activeCategory === "All" ? undefined : activeCategory,
  });

  const tools = result.data;
  const total = result.total;

  const categories = ["All", "Search", "Data", "AI/ML", "Finance", "Social", "E-commerce", "Communication", "DevTools", "Jobs", "Travel", "News", "Software", "Maps", "Legal"];

  const tabs = [
    { key: "mcp", label: t.explore.tabMcp },
    { key: "tasks", label: t.explore.tabTasks },
    { key: "data", label: t.explore.tabData },
  ];

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      {/* Page Header */}
      <section className="pt-24 md:pt-28 pb-5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {t.explore.title}
            </h1>
            <p className="mt-1.5 text-sm text-gray-400 max-w-xl">
              {t.explore.subtitle}
            </p>
          </div>

          {/* Tab Navigation — right-aligned */}
          <nav className="flex gap-1 shrink-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <a
                  key={tab.key}
                  href={`/explore${tab.key === "mcp" ? "" : `?tab=${tab.key}`}`}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </a>
              );
            })}
          </nav>
        </div>
      </section>

      {/* MCP Tab */}
      {activeTab === "mcp" && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Category Filters */}
              <aside className="lg:w-56 shrink-0">
                <div className="lg:sticky lg:top-24">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    {t.explore.categories}
                  </h2>
                  <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat;
                      const label = t.explore.catLabels[cat] || cat;
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
                  {t.explore.showing} {total} {t.explore.toolsCount}
                  {activeCategory !== "All" && (
                    <span>
                      {" "}{t.explore.inCategory} <span className="text-gray-300">{activeCategory}</span>
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
                      {t.explore.noTools}
                    </p>
                    <a href="/explore" className="inline-block mt-4 text-sm text-white/70 hover:text-white transition">
                      {t.explore.viewAll} &rarr;
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tasks Tab - Coming Soon */}
      {activeTab === "tasks" && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">Coming soon</p>
              <p className="text-gray-500 text-sm mt-2">Agent-to-Agent task marketplace</p>
            </div>
          </div>
        </section>
      )}

      {/* Data Tab - Coming Soon */}
      {activeTab === "data" && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">Coming soon</p>
              <p className="text-gray-500 text-sm mt-2">Agent data exchange marketplace</p>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
