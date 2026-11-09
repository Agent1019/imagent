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
      <section className="pt-24 md:pt-28 pb-8 px-4 md:px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {t.explore.title}
          </h1>
          <p className="mt-2 text-sm text-gray-400 max-w-2xl">
            {t.explore.subtitle}
          </p>
        </div>
      </section>

      <section className="py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
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
    </Layout>
  );
}
