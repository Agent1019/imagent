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
    title: locale === "zh" ? "文档 - Imagent" : "Documentation - Imagent",
    description:
      locale === "zh"
        ? "Imagent 开发者文档 — 快速上手、CLI 参考、API 参考与集成指南。"
        : "Imagent developer documentation — quickstart, CLI reference, API reference, and integration guides.",
  };
}

const sidebarSections = [
  {
    titleEn: "Getting Started",
    titleZh: "快速开始",
    items: [
      { labelEn: "How it works", labelZh: "工作原理", href: "/docs#how-it-works" },
      { labelEn: "Quickstart", labelZh: "快速上手", href: "/docs#quickstart" },
    ],
  },
  {
    titleEn: "CLI Reference",
    titleZh: "CLI 参考",
    items: [
      { labelEn: "Overview", labelZh: "概览", href: "/docs/cli" },
      { labelEn: "discover", labelZh: "discover", href: "/docs/cli/discover" },
      { labelEn: "inspect", labelZh: "inspect", href: "/docs/cli/inspect" },
      { labelEn: "run", labelZh: "run", href: "/docs/cli/run" },
    ],
  },
  {
    titleEn: "API Reference",
    titleZh: "API 参考",
    items: [
      { labelEn: "Overview", labelZh: "概览", href: "/docs/api" },
      { labelEn: "/search", labelZh: "/search", href: "/docs/api/search" },
      { labelEn: "/invoke", labelZh: "/invoke", href: "/docs/api/invoke" },
      { labelEn: "/billing", labelZh: "/billing", href: "/docs/api/billing" },
    ],
  },
  {
    titleEn: "Integrations",
    titleZh: "集成",
    items: [
      { labelEn: "Overview", labelZh: "概览", href: "/docs/integrations" },
      { labelEn: "OAuth", labelZh: "OAuth", href: "/docs/integrations/oauth" },
      { labelEn: "Direct", labelZh: "直连", href: "/docs/integrations/direct" },
      { labelEn: "Proxy", labelZh: "代理", href: "/docs/integrations/proxy" },
    ],
  },
  {
    titleEn: "Examples",
    titleZh: "示例",
    items: [
      { labelEn: "Overview", labelZh: "概览", href: "/docs/examples" },
      { labelEn: "Research", labelZh: "研究", href: "/docs/examples/research" },
      { labelEn: "Sales", labelZh: "销售", href: "/docs/examples/sales" },
      { labelEn: "Content", labelZh: "内容", href: "/docs/examples/content" },
    ],
  },
];

export default async function DocsPage() {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);
  const zh = locale === "zh";

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <div className="pt-32 pb-20 px-4 md:px-6 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-7xl mx-auto flex gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              {sidebarSections.map((section) => (
                <div key={section.titleEn}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    {zh ? section.titleZh : section.titleEn}
                  </h3>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const isCurrent = item.href === "/docs#how-it-works" && section.titleEn === "Getting Started";
                      return (
                        <a
                          key={item.labelEn}
                          href={item.href}
                          className={`block px-3 py-1.5 rounded-md text-sm transition ${
                            isCurrent
                              ? "text-white bg-white/10 font-medium"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {zh ? item.labelZh : item.labelEn}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* H1 */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              {zh ? "Imagent 快速上手" : "Getting Started with Imagent"}
            </h1>

            {/* Overview */}
            <p className="text-lg text-gray-400 leading-relaxed mb-10">
              {zh
                ? "Imagent 是 AI Agent 的基础设施层 — 一个用于发现、认证和调用 MCP Server 的统一平台。无论你是为 Agent 接入新工具，还是发布自己的 MCP Server，只需三步即可完成。"
                : "Imagent is the infrastructure layer for AI agents — a unified platform to discover, authenticate, and invoke MCP servers. Whether you're connecting your agent to new tools or publishing your own MCP server, you can be up and running in three steps."}
            </p>

            {/* Steps */}
            <section id="how-it-works" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8">
                {zh ? "3 步连接你的 Agent" : "3 steps to connect your agent"}
              </h2>

              <div className="space-y-10">
                {/* Step 1 */}
                <div className="flex gap-5 items-start">
                  <span className="text-3xl font-bold font-mono text-orange-400 shrink-0 leading-none mt-0.5">01</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {zh ? "安装 CLI 并初始化" : "Install the CLI and initialize"}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {zh
                        ? "使用 npm 安装 Imagent CLI，然后在项目中初始化。这会在你的项目根目录生成一个 imagent.config.json 配置文件。"
                        : "Install the Imagent CLI via npm, then initialize it in your project. This creates an imagent.config.json file in your project root."}
                    </p>
                    <div className="rounded-lg bg-black/60 border border-white/5 p-4 font-mono text-sm">
                      <div className="text-gray-300">
                        <span className="text-gray-500 select-none">$ </span>npm install -g @imagent/cli
                      </div>
                      <div className="text-gray-300 mt-1">
                        <span className="text-gray-500 select-none">$ </span>imagent init
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-5 items-start">
                  <span className="text-3xl font-bold font-mono text-emerald-400 shrink-0 leading-none mt-0.5">02</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {zh ? "发现并添加 MCP Server" : "Discover and add MCP servers"}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {zh
                        ? "使用语义搜索查找满足你需求的 MCP Server。查看能力、信任分数和定价后，一键添加到你的项目。"
                        : "Search for MCP servers by capability using semantic search. Review their capabilities, trust scores, and pricing, then add them to your project with a single command."}
                    </p>
                    <div className="rounded-lg bg-black/60 border border-white/5 p-4 font-mono text-sm">
                      <div className="text-gray-300">
                        <span className="text-gray-500 select-none">$ </span>imagent discover &quot;generate PDF from markdown&quot;
                      </div>
                      <div className="text-gray-300 mt-1">
                        <span className="text-gray-500 select-none">$ </span>imagent add @imagent/pdf-generator
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-5 items-start">
                  <span className="text-3xl font-bold font-mono text-purple-400 shrink-0 leading-none mt-0.5">03</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {zh ? "认证并调用" : "Authenticate and invoke"}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {zh
                        ? "通过内置的 OAuth 流程完成认证，然后调用 MCP Server。Imagent 自动处理令牌轮换、权限作用域和用量计量。"
                        : "Authenticate via the built-in OAuth flow, then invoke the MCP server. Imagent handles token rotation, permission scoping, and usage metering automatically."}
                    </p>
                    <div className="rounded-lg bg-black/60 border border-white/5 p-4 font-mono text-sm">
                      <div className="text-gray-300">
                        <span className="text-gray-500 select-none">$ </span>imagent auth @imagent/pdf-generator
                      </div>
                      <div className="text-gray-300 mt-1">
                        <span className="text-gray-500 select-none">$ </span>imagent run @imagent/pdf-generator generate &apos;{"{...}"}&apos;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section id="quickstart">
              <h2 className="text-2xl font-bold text-white mb-6">
                {zh ? "下一步" : "Next steps"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    titleEn: "CLI Reference",
                    titleZh: "CLI 参考",
                    descEn: "Explore all CLI commands and options for managing MCP servers from the terminal.",
                    descZh: "了解在终端管理 MCP Server 的所有 CLI 命令和选项。",
                    href: "/docs/cli",
                    icon: (
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    ),
                  },
                  {
                    titleEn: "API Reference",
                    titleZh: "API 参考",
                    descEn: "Full REST API documentation — search, invoke, billing endpoints, and more.",
                    descZh: "完整的 REST API 文档 — 搜索、调用、计费端点等。",
                    href: "/docs/api",
                    icon: (
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    ),
                  },
                  {
                    titleEn: "Integrations",
                    titleZh: "集成指南",
                    descEn: "Connect Imagent with OAuth, direct connections, or proxy setups.",
                    descZh: "通过 OAuth、直连或代理方式接入 Imagent。",
                    href: "/docs/integrations",
                    icon: (
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.87-3.124a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364l1.757 1.757" />
                      </svg>
                    ),
                  },
                  {
                    titleEn: "Examples",
                    titleZh: "示例",
                    descEn: "Real-world examples for research, sales, and content workflows.",
                    descZh: "适用于研究、销售和内容工作流的真实示例。",
                    href: "/docs/examples",
                    icon: (
                      <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    ),
                  },
                ].map((card) => (
                  <a
                    key={card.titleEn}
                    href={card.href}
                    className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 hover:bg-white/[0.04] transition"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {card.icon}
                      <h3 className="text-sm font-semibold text-white group-hover:text-white transition">
                        {zh ? card.titleZh : card.titleEn}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {zh ? card.descZh : card.descEn}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
