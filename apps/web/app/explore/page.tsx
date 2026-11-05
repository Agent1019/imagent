import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import Layout from "@/app/layouts/Layout";
import type { Metadata } from "next";

type Tool = {
  slug: string;
  name: string;
  descriptionEn: string;
  descriptionZh: string;
  category: string;
  tags: string[];
  installs: number;
  color: string;
};

const categories = [
  "All",
  "Search",
  "Data",
  "Finance",
  "Social",
  "Communication",
  "DevTools",
  "AI/ML",
  "Productivity",
  "Media",
];

const tools: Tool[] = [
  {
    slug: "firecrawl",
    name: "Firecrawl",
    descriptionEn: "Web scraping and crawling API for AI agents. Extract structured data from any URL.",
    descriptionZh: "AI Agent 网页抓取 API。从任意 URL 提取结构化数据。",
    category: "Data",
    tags: ["Data", "DevTools"],
    installs: 84200,
    color: "#f97316",
  },
  {
    slug: "apollo",
    name: "Apollo",
    descriptionEn: "B2B contact and company data API. Find decision-makers and enrich lead data.",
    descriptionZh: "B2B 联系人与公司数据 API。发现决策者并丰富线索数据。",
    category: "Search",
    tags: ["Search", "Data"],
    installs: 61300,
    color: "#a855f7",
  },
  {
    slug: "tavily",
    name: "Tavily",
    descriptionEn: "AI-optimized search engine for LLM agents. Real-time, accurate search results.",
    descriptionZh: "为 LLM Agent 优化的搜索引擎。实时、准确的搜索结果。",
    category: "Search",
    tags: ["Search", "AI/ML"],
    installs: 95700,
    color: "#3b82f6",
  },
  {
    slug: "brave-search",
    name: "Brave Search",
    descriptionEn: "Privacy-preserving search API. Independent web index with no tracking.",
    descriptionZh: "隐私保护搜索 API。独立网页索引，无追踪。",
    category: "Search",
    tags: ["Search"],
    installs: 52100,
    color: "#ef4444",
  },
  {
    slug: "e2b",
    name: "E2B",
    descriptionEn: "Code interpreter sandbox for AI agents. Run Python and JS in secure sandboxes.",
    descriptionZh: "AI Agent 代码解释器沙箱。在安全沙箱中运行 Python 和 JS。",
    category: "DevTools",
    tags: ["DevTools", "AI/ML"],
    installs: 73400,
    color: "#10b981",
  },
  {
    slug: "composio",
    name: "Composio",
    descriptionEn: "Unified tool integration platform. Connect 150+ apps to your AI agents.",
    descriptionZh: "统一工具集成平台。将 150+ 应用连接到 AI Agent。",
    category: "Productivity",
    tags: ["Productivity", "DevTools"],
    installs: 48900,
    color: "#8b5cf6",
  },
  {
    slug: "browserbase",
    name: "Browserbase",
    descriptionEn: "Cloud browser infrastructure for AI agents. Headless Chrome with full control.",
    descriptionZh: "AI Agent 云端浏览器基础设施。完全可控的无头 Chrome。",
    category: "DevTools",
    tags: ["DevTools", "Data"],
    installs: 37600,
    color: "#06b6d4",
  },
  {
    slug: "resend",
    name: "Resend",
    descriptionEn: "Email API for developers and agents. Send transactional emails at scale.",
    descriptionZh: "面向开发者和 Agent 的邮件 API。大规模发送事务邮件。",
    category: "Communication",
    tags: ["Communication", "DevTools"],
    installs: 44200,
    color: "#000000",
  },
  {
    slug: "stripe",
    name: "Stripe",
    descriptionEn: "Payment processing and financial infrastructure. Accept payments and manage subscriptions.",
    descriptionZh: "支付处理与金融基础设施。接受支付并管理订阅。",
    category: "Finance",
    tags: ["Finance", "DevTools"],
    installs: 89100,
    color: "#6366f1",
  },
  {
    slug: "slack",
    name: "Slack",
    descriptionEn: "Team messaging and collaboration. Send messages, manage channels, and automate workflows.",
    descriptionZh: "团队消息与协作。发送消息、管理频道并自动化工作流。",
    category: "Communication",
    tags: ["Communication", "Social"],
    installs: 67800,
    color: "#e11d48",
  },
  {
    slug: "notion",
    name: "Notion",
    descriptionEn: "Workspace and knowledge management. Read, write, and organize team knowledge.",
    descriptionZh: "工作空间与知识管理。读取、写入并组织团队知识。",
    category: "Productivity",
    tags: ["Productivity", "Data"],
    installs: 71500,
    color: "#f5f5f5",
  },
  {
    slug: "github",
    name: "GitHub",
    descriptionEn: "Code hosting and collaboration. Manage repos, issues, pull requests, and CI/CD.",
    descriptionZh: "代码托管与协作。管理仓库、Issue、PR 和 CI/CD。",
    category: "DevTools",
    tags: ["DevTools", "Productivity"],
    installs: 91200,
    color: "#ffffff",
  },
];

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
};

function formatInstalls(n: number): string {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return n.toString();
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host =
    headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);

  const title =
    locale === "zh"
      ? "探索 MCP Server - Imagent"
      : "Explore MCP Servers - Imagent";
  const description =
    locale === "zh"
      ? "浏览和发现数千个 MCP Server。按类别筛选，找到适合你 AI Agent 的工具。"
      : "Browse and discover thousands of MCP servers. Filter by category to find the right tools for your AI agents.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ExplorePage({ searchParams }: PageProps) {
  const headersList = await headers();
  const host =
    headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);

  const params = await searchParams;
  const activeCategory = params.category || "All";

  const filteredTools =
    activeCategory === "All"
      ? tools
      : tools.filter((tool) => tool.tags.includes(activeCategory));

  const isZh = locale === "zh";

  return (
    <Layout
      locale={locale}
      nav={t.nav}
      footer={t.footer}
      searchPlaceholder={t.hero.searchPlaceholder}
    >
      {/* Page Header */}
      <section className="pt-24 pb-8 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {isZh ? "探索 MCP Server" : "Explore MCP Servers"}
          </h1>
          <p className="mt-3 text-gray-400 max-w-2xl">
            {isZh
              ? "浏览数千个为 AI Agent 构建的工具。按类别筛选，找到你需要的能力。"
              : "Browse thousands of tools built for AI agents. Filter by category to find the capabilities you need."}
          </p>
        </div>
      </section>

      <section className="py-8 px-6">
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
                    const label = isZh
                      ? categoryLabelsZh[cat] || cat
                      : cat;
                    return (
                      <a
                        key={cat}
                        href={
                          cat === "All"
                            ? "/explore"
                            : `/explore?category=${cat}`
                        }
                        className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm transition ${
                          isActive
                            ? "bg-white/10 text-white font-medium"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
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
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder={
                      isZh ? "搜索工具..." : "Search tools..."
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:border-white/25 transition"
                    readOnly
                  />
                </div>
              </div>

              {/* Results count */}
              <p className="text-xs text-gray-500 mb-4">
                {isZh
                  ? `显示 ${filteredTools.length} 个工具`
                  : `Showing ${filteredTools.length} tools`}
                {activeCategory !== "All" && (
                  <span>
                    {" "}
                    {isZh ? "分类：" : "in "}
                    <span className="text-gray-300">{activeCategory}</span>
                  </span>
                )}
              </p>

              {/* Tool Grid */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <a
                    key={tool.slug}
                    href={`/explore/${tool.slug}`}
                    className="group block rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 hover:bg-white/[0.04] transition"
                  >
                    {/* Icon + Name */}
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-sm"
                        style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
                      >
                        {tool.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm group-hover:text-white transition truncate">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                          {isZh
                            ? tool.descriptionZh
                            : tool.descriptionEn}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-gray-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Installs */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span>{formatInstalls(tool.installs)}</span>
                      <span className="text-gray-600">
                        {isZh ? "安装" : "installs"}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Empty state */}
              {filteredTools.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400">
                    {isZh
                      ? "该分类下暂无工具"
                      : "No tools found in this category."}
                  </p>
                  <a
                    href="/explore"
                    className="inline-block mt-4 text-sm text-white/70 hover:text-white transition"
                  >
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
