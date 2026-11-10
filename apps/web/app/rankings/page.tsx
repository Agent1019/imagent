import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import Layout from "@/app/layouts/Layout";
import type { Metadata } from "next";

type RankingTool = {
  rank: number;
  name: string;
  slug: string;
  category: string;
  calls7d: number;
  calls30d: number;
  growth7d: number;
  growth30d: number;
  status: "hot" | "rising" | "stable";
  color: string;
};

const rankings: RankingTool[] = [
  { rank: 1, name: "Tavily", slug: "tavily", category: "Search", calls7d: 2840000, calls30d: 11200000, growth7d: 18.4, growth30d: 42.1, status: "hot", color: "#3b82f6" },
  { rank: 2, name: "GitHub", slug: "github", category: "DevTools", calls7d: 2510000, calls30d: 10800000, growth7d: 12.3, growth30d: 28.7, status: "stable", color: "#ffffff" },
  { rank: 3, name: "Stripe", slug: "stripe", category: "Finance", calls7d: 2230000, calls30d: 9400000, growth7d: 8.9, growth30d: 21.3, status: "stable", color: "#6366f1" },
  { rank: 4, name: "Firecrawl", slug: "firecrawl", category: "Data", calls7d: 1980000, calls30d: 8100000, growth7d: 24.7, growth30d: 67.2, status: "hot", color: "#f97316" },
  { rank: 5, name: "Notion", slug: "notion", category: "Productivity", calls7d: 1760000, calls30d: 7200000, growth7d: 6.2, growth30d: 15.8, status: "stable", color: "#f5f5f5" },
  { rank: 6, name: "E2B", slug: "e2b", category: "DevTools", calls7d: 1540000, calls30d: 5900000, growth7d: 31.2, growth30d: 89.4, status: "hot", color: "#10b981" },
  { rank: 7, name: "Slack", slug: "slack", category: "Communication", calls7d: 1320000, calls30d: 5600000, growth7d: 4.1, growth30d: 11.2, status: "stable", color: "#e11d48" },
  { rank: 8, name: "Apollo", slug: "apollo", category: "Search", calls7d: 1180000, calls30d: 4800000, growth7d: 15.6, growth30d: 38.9, status: "rising", color: "#a855f7" },
  { rank: 9, name: "Browserbase", slug: "browserbase", category: "DevTools", calls7d: 980000, calls30d: 3700000, growth7d: 42.3, growth30d: 124.6, status: "hot", color: "#06b6d4" },
  { rank: 10, name: "Resend", slug: "resend", category: "Communication", calls7d: 870000, calls30d: 3400000, growth7d: 9.8, growth30d: 22.1, status: "stable", color: "#000000" },
  { rank: 11, name: "Brave Search", slug: "brave-search", category: "Search", calls7d: 760000, calls30d: 3100000, growth7d: 7.4, growth30d: 19.5, status: "stable", color: "#ef4444" },
  { rank: 12, name: "Composio", slug: "composio", category: "Productivity", calls7d: 640000, calls30d: 2500000, growth7d: 28.9, growth30d: 76.3, status: "rising", color: "#8b5cf6" },
];

function formatCalls(n: number): string {
  if (n >= 1000000) {
    return `${(n / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(0)}k`;
  }
  return n.toString();
}

function formatGrowth(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host =
    headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);

  const title =
    locale === "zh"
      ? "Agent 工具排行榜 - Imagent"
      : "Agent Tool Rankings - Imagent";
  const description =
    locale === "zh"
      ? "查看最热门的 MCP Server 排名。按使用量、增长率和分类浏览 AI Agent 工具排行。"
      : "See the most popular MCP server rankings. Browse AI agent tool rankings by usage, growth, and category.";

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

type TabKey = "most-used" | "growing" | "category";

const TAB_KEYS: TabKey[] = ["most-used", "growing", "category"];

export default async function RankingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; period?: string }>;
}) {
  const headersList = await headers();
  const host =
    headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);

  const { tab: rawTab = "most-used", period: rawPeriod = "7d" } =
    await searchParams;

  const activeTab: TabKey =
    rawTab === "growing" || rawTab === "category" ? rawTab : "most-used";

  const period = rawPeriod === "30d" ? "30d" : "7d";

  // Data preparation
  const mostUsed = [...rankings].sort((a, b) => b.calls30d - a.calls30d);
  const fastestGrowing = [...rankings].sort(
    (a, b) => b.growth30d - a.growth30d
  );

  const topByCategory: Record<string, RankingTool[]> = {};
  for (const tool of rankings) {
    if (!topByCategory[tool.category]) {
      topByCategory[tool.category] = [];
    }
    topByCategory[tool.category].push(tool);
  }

  // Build href helper that preserves both params
  function tabHref(key: TabKey) {
    return `/rankings?tab=${key}&period=${period}`;
  }
  function periodHref(p: string) {
    return `/rankings?tab=${activeTab}&period=${p}`;
  }

  return (
    <Layout
      locale={locale}
      nav={t.nav}
      footer={t.footer}
      searchPlaceholder={t.hero.searchPlaceholder}
    >
      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t.rankings.title}
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            {t.rankings.subtitle}
          </p>
        </div>
      </section>

      {/* Tab Switcher + Period Toggle Bar */}
      <section className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
            {TAB_KEYS.map((key) => {
              const isActive = key === activeTab;
              const label =
                key === "most-used"
                  ? t.rankings.mostUsed
                  : key === "growing"
                  ? t.rankings.fastest
                  : t.rankings.byCategory;
              return (
                <a
                  key={key}
                  href={tabHref(key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
                    isActive
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Period Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
            <a
              href={periodHref("7d")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                period === "7d"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              7d
            </a>
            <a
              href={periodHref("30d")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                period === "30d"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              30d
            </a>
          </div>
        </div>
      </section>

      {/* Rankings Content — single active tab */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {activeTab === "most-used" && (
            <div>
              <p className="text-sm text-gray-500 mb-6">
                {t.rankings.descMostUsed}
              </p>
              <RankingsTable
                tools={mostUsed}
                locale={locale}
                rankingsI18n={t.rankings}
                showCalls={true}
              />
            </div>
          )}

          {activeTab === "growing" && (
            <div>
              <p className="text-sm text-gray-500 mb-6">
                {t.rankings.descFastest}
              </p>
              <RankingsTable
                tools={fastestGrowing}
                locale={locale}
                rankingsI18n={t.rankings}
                showGrowth={true}
              />
            </div>
          )}

          {activeTab === "category" && (
            <div>
              <p className="text-sm text-gray-500 mb-6">
                {t.rankings.descByCategory}
              </p>
              <div className="space-y-8">
                {Object.entries(topByCategory).map(
                  ([category, categoryTools]) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                        {t.explore.catLabels[category] ?? category}
                      </h3>
                      <RankingsTable
                        tools={categoryTools}
                        locale={locale}
                        rankingsI18n={t.rankings}
                        showCalls={true}
                        compact
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">
            {t.rankings.howWeCount}
          </h2>
          <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-white font-semibold mb-2">
                {t.rankings.dataSources}
              </h3>
              <p>
                {t.rankings.dataSourcesDesc}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-white font-semibold mb-2">
                {t.rankings.callVolume}
              </h3>
              <p>
                {t.rankings.callVolumeDesc}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-white font-semibold mb-2">
                {t.rankings.growthRate}
              </h3>
              <p>
                {t.rankings.growthRateDesc}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-white font-semibold mb-2">
                {t.rankings.statusBadges}
              </h3>
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/20">
                    {t.rankings.hot}
                  </span>
                  <span className="text-gray-500">
                    {t.rankings.hotDesc}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                    {t.rankings.rising}
                  </span>
                  <span className="text-gray-500">
                    {t.rankings.risingDesc}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/20">
                    {t.rankings.stable}
                  </span>
                  <span className="text-gray-500">
                    {t.rankings.stableDesc}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* ------------------------------------------------------------------ */
/*  Table Component                                                    */
/* ------------------------------------------------------------------ */

function RankingsTable({
  tools,
  locale,
  rankingsI18n,
  showCalls = false,
  showGrowth = false,
  compact = false,
}: {
  tools: RankingTool[];
  locale: Locale;
  rankingsI18n: {
    tool: string; category: string; calls: string; growth: string; status: string;
    hot: string; rising: string; stable: string;
  };
  showCalls?: boolean;
  showGrowth?: boolean;
  compact?: boolean;
}) {
  const isZh = locale === "zh";

  return (
    <div className="rounded-xl border border-white/5 overflow-x-auto">
      <table className="w-full min-w-[500px] text-sm">
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.02]">
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
              #
            </th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              {rankingsI18n.tool}
            </th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
              {rankingsI18n.category}
            </th>
            <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              {rankingsI18n.calls}
            </th>
            <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              {rankingsI18n.growth}
            </th>
            <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
              {rankingsI18n.status}
            </th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool, i) => {
            const isEven = i % 2 === 0;
            return (
              <tr
                key={tool.slug}
                className={`border-b border-white/5 last:border-b-0 ${
                  isEven ? "bg-transparent" : "bg-white/[0.01]"
                } hover:bg-white/[0.03] transition`}
              >
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                  {tool.rank}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`/tools/${tool.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${tool.slug === "brave-search" ? "brave.com" : tool.slug === "e2b" ? "e2b.dev" : tool.slug === "resend" ? "resend.com" : tool.slug === "composio" ? "composio.dev" : tool.slug === "browserbase" ? "browserbase.com" : `${tool.slug}.com`}&sz=64`}
                      alt={tool.name}
                      className={`w-8 h-8 rounded-lg shrink-0 bg-white/[0.05] ${compact ? "w-7 h-7" : ""}`}
                      loading="lazy"
                    />
                    <span className="font-medium text-white group-hover:text-gray-200 transition truncate">
                      {tool.name}
                    </span>
                  </a>
                </td>
                <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-white/5 border border-white/5">
                    {tool.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-gray-300 font-mono hidden md:table-cell">
                  {formatCalls(tool.calls30d)}
                </td>
                <td className="px-4 py-3 text-right font-mono">
                  <span
                    className={`${
                      tool.growth30d >= 30
                        ? "text-emerald-400"
                        : tool.growth30d >= 10
                        ? "text-blue-400"
                        : "text-gray-400"
                    }`}
                  >
                    {formatGrowth(tool.growth30d)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={tool.status} isZh={isZh} hotLabel={rankingsI18n.hot} risingLabel={rankingsI18n.rising} stableLabel={rankingsI18n.stable} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({
  status,
  isZh,
  hotLabel,
  risingLabel,
  stableLabel,
}: {
  status: "hot" | "rising" | "stable";
  isZh: boolean;
  hotLabel: string;
  risingLabel: string;
  stableLabel: string;
}) {
  const config = {
    hot: {
      label: hotLabel,
      className:
        "bg-orange-500/15 text-orange-400 border-orange-500/20",
    },
    rising: {
      label: risingLabel,
      className:
        "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    },
    stable: {
      label: stableLabel,
      className: "bg-white/5 text-gray-400 border-white/10",
    },
  };

  const { label, className } = config[status];

  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full border ${className}`}
    >
      {label}
    </span>
  );
}
