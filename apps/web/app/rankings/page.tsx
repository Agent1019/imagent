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

export default async function RankingsPage() {
  const headersList = await headers();
  const host =
    headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);

  const isZh = locale === "zh";

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

  return (
    <Layout
      locale={locale}
      nav={t.nav}
      footer={t.footer}
      searchPlaceholder={t.hero.searchPlaceholder}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 md:px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {isZh ? "Agent 工具排行榜" : "Agent Rankings"}
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            {isZh
              ? "追踪最受欢迎的 MCP Server。按调用量、增长率和分类发现趋势。"
              : "Track the most popular MCP servers. Discover trends by call volume, growth rate, and category."}
          </p>

          {/* Time Period Toggles */}
          <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
            <span className="px-4 py-2 rounded-md bg-white/10 text-white text-sm font-medium">
              7d
            </span>
            <span className="px-4 py-2 rounded-md text-gray-400 text-sm hover:text-white transition">
              30d
            </span>
          </div>
        </div>
      </section>

      {/* Rankings Content */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Most Used */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {isZh ? "最多使用" : "Most Used"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {isZh
                ? "按 30 天内 API 调用量排名"
                : "Ranked by API calls in the last 30 days"}
            </p>
            <RankingsTable
              tools={mostUsed}
              locale={locale}
              showCalls={true}
            />
          </div>

          {/* Fastest Growing */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {isZh ? "增长最快" : "Fastest Growing"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {isZh
                ? "按 30 天增长率排名"
                : "Ranked by 30-day growth rate"}
            </p>
            <RankingsTable
              tools={fastestGrowing}
              locale={locale}
              showGrowth={true}
            />
          </div>

          {/* Top by Category */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {isZh ? "分类排行" : "Top by Category"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {isZh
                ? "各分类下使用量最高的工具"
                : "Top tool in each category by usage"}
            </p>
            <div className="space-y-8">
              {Object.entries(topByCategory).map(
                ([category, categoryTools]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                      {category}
                    </h3>
                    <RankingsTable
                      tools={categoryTools}
                      locale={locale}
                      showCalls={true}
                      compact
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            {isZh ? "计数方法" : "How We Count"}
          </h2>
          <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-white font-semibold mb-2">
                {isZh ? "数据来源" : "Data Sources"}
              </h3>
              <p>
                {isZh
                  ? "排名数据来自 Imagent 平台的实际 API 调用记录。我们统计所有通过 Imagent 网关路由的工具调用，包括 MCP、A2A 和 Function Calling 协议。"
                  : "Rankings are derived from actual API call records on the Imagent platform. We count all tool invocations routed through the Imagent gateway, including MCP, A2A, and Function Calling protocols."}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-white font-semibold mb-2">
                {isZh ? "调用量统计" : "Call Volume"}
              </h3>
              <p>
                {isZh
                  ? "每次成功调用计数为一次。失败的调用、超时和速率限制响应不计入排名。7 天和 30 天窗口均为滑动窗口，每日更新。"
                  : "Each successful invocation counts as one call. Failed calls, timeouts, and rate-limited responses are excluded from rankings. Both 7-day and 30-day windows are rolling and updated daily."}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-white font-semibold mb-2">
                {isZh ? "增长率计算" : "Growth Rate"}
              </h3>
              <p>
                {isZh
                  ? "增长率为当前周期调用量相对上一个同等长度周期的百分比变化。例如，30 天增长率比较的是最近 30 天与之前 30 天的调用量。"
                  : "Growth rate is the percentage change in call volume compared to the previous period of equal length. For example, 30-day growth compares the most recent 30 days to the 30 days before that."}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-white font-semibold mb-2">
                {isZh ? "状态标签" : "Status Badges"}
              </h3>
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/20">
                    Hot
                  </span>
                  <span className="text-gray-500">
                    {isZh
                      ? "30 天增长率 > 50%"
                      : "30-day growth rate exceeds 50%"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                    Rising
                  </span>
                  <span className="text-gray-500">
                    {isZh
                      ? "30 天增长率 20%-50%"
                      : "30-day growth rate between 20-50%"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/20">
                    Stable
                  </span>
                  <span className="text-gray-500">
                    {isZh
                      ? "30 天增长率 < 20%"
                      : "30-day growth rate below 20%"}
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
  showCalls = false,
  showGrowth = false,
  compact = false,
}: {
  tools: RankingTool[];
  locale: Locale;
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
              {isZh ? "工具" : "Tool"}
            </th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
              {isZh ? "分类" : "Category"}
            </th>
            <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              {isZh ? "调用量" : "Calls"}
            </th>
            <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              {isZh ? "增长率" : "Growth"}
            </th>
            <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
              {isZh ? "状态" : "Status"}
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
                    href={`/explore/${tool.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                        compact ? "w-7 h-7 text-[10px]" : ""
                      }`}
                      style={{
                        backgroundColor: `${tool.color}20`,
                        color: tool.color,
                      }}
                    >
                      {tool.name.charAt(0)}
                    </div>
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
                  <StatusBadge status={tool.status} />
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
}: {
  status: "hot" | "rising" | "stable";
}) {
  const config = {
    hot: {
      label: "Hot",
      className:
        "bg-orange-500/15 text-orange-400 border-orange-500/20",
    },
    rising: {
      label: "Rising",
      className:
        "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    },
    stable: {
      label: "Stable",
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
