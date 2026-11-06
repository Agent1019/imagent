import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import { blogCategoryLabels, blogPosts, getBlogPost } from "@/lib/i18n/blog";
import { localizedLabel } from "@/lib/i18n/labels";
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
  const zh = locale === "zh";
  const post = getBlogPost(slug);
  const title = post ? (zh ? post.titleZh : post.titleEn) : slug;
  const description = post
    ? zh
      ? post.excerptZh
      : post.excerptEn
    : zh
      ? `阅读 Imagent 关于 ${title} 的文章。`
      : `Read our latest insights on ${title.toLowerCase()}. Technical deep dives, product updates, and tutorials from the Imagent team.`;

  return {
    title: `${title} | ${zh ? "博客" : "Blog"} | Imagent`,
    robots: { index: false, follow: false },
    description,
    openGraph: {
      title: `${title} | ${zh ? "博客" : "Blog"} | Imagent`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${zh ? "博客" : "Blog"} | Imagent`,
      description,
    },
  };
}

const article = {
  tldrTitle: { en: "TL;DR", zh: "要点" },
  bullets: [
    {
      en: "MCP enables structured, schema-driven communication between AI agents and external tools.",
      zh: "MCP 让 AI Agent 和外部工具通过 schema 进行结构化通信。",
    },
    {
      en: "Agent-native auth requires scoped tokens with automatic rotation and zero human-in-the-loop patterns.",
      zh: "面向 Agent 的认证需要有范围的令牌、自动轮换，并且不依赖人工确认。",
    },
    {
      en: "Production deployments need capability manifests, health checks, and usage metering as first-class concerns.",
      zh: "生产部署要把能力清单、健康检查和用量计量当成一等能力。",
    },
    {
      en: "The Imagent registry provides discovery, authentication, and billing in a unified platform.",
      zh: "Imagent 目录把发现、认证和计费放在同一个平台里。",
    },
  ],
  sections: [
    {
      en: {
        title: "The Problem with Human-Native APIs",
        paragraphs: [
          "Traditional APIs were designed for human developers building browser and mobile applications. They assume interactive authentication flows, human-readable documentation, and manual integration processes. When AI agents need to interact with these APIs, they face fundamental friction points.",
          "Agents cannot fill out OAuth consent screens. They cannot read unstructured README files to understand rate limits. They cannot make judgment calls about whether a 429 response means \"retry in 30 seconds\" or \"your account is suspended.\" The entire API ecosystem needs a parallel track designed for machine consumption.",
        ],
      },
      zh: {
        title: "给人用的 API 有什么问题",
        paragraphs: [
          "传统 API 是给做网页和手机应用的人设计的。它们默认有交互式登录、给人看的文档，以及手工接入。AI Agent 去调用这些接口时，会卡在这些前提上。",
          "Agent 填不了 OAuth 同意页，也读不懂散落在 README 里的限流说明。它无法判断一个 429 是“30 秒后重试”还是“账号已被停用”。API 生态需要一条给机器消费的并行路径。",
        ],
      },
    },
  ],
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const zh = locale === "zh";
  const t = getContent(locale);
  const post = getBlogPost(slug);
  const title = post ? (zh ? post.titleZh : post.titleEn) : slug;
  const subtitle = post
    ? zh
      ? post.excerptZh
      : post.excerptEn
    : zh
      ? "如何用现代协议搭建并扩展面向 Agent 的基础设施。"
      : "A comprehensive guide to building and scaling agent-native infrastructure with modern protocols.";
  const related = blogPosts.filter((item) => item.slug !== slug).slice(0, 3);
  const tags = zh
    ? ["MCP", "Agent 基础设施", "协议设计", "认证", "Imagent"]
    : ["MCP", "Agent Infrastructure", "Protocol Design", "Authentication", "Imagent"];
  const rows = zh
    ? [
        ["发现", "文档网站", "机器可读的能力清单"],
        ["认证", "OAuth 同意页", "有范围的令牌，无界面"],
        ["错误处理", "给人看的提示", "结构化语义错误"],
        ["限流", "429 加 Retry-After", "结构化配额和退避"],
        ["计费", "人工订阅", "按次计量"],
      ]
    : [
        ["Discovery", "Documentation websites", "Machine-readable manifests"],
        ["Auth", "OAuth consent screens", "Scoped tokens, no UI"],
        ["Error handling", "Human-readable messages", "Structured semantic errors"],
        ["Rate limiting", "429 + Retry-After header", "Structured quota + backoff"],
        ["Billing", "Manual subscription", "Per-call metering"],
      ];

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <div className="pt-24">
        <article className="px-4 md:px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <a href="/blog" className="hover:text-white transition">{zh ? "博客" : "Blog"}</a>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-400">
                {localizedLabel(blogCategoryLabels, post?.category ?? "Engineering", zh)}
              </span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {subtitle}
            </p>

            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/40 to-purple-500/40 flex items-center justify-center text-sm font-bold text-white">
                Y
              </div>
              <div>
                <div className="text-sm font-medium text-white">{zh ? "Imagent 团队" : "Imagent Team"}</div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>{post ? (zh ? post.dateZh : post.dateEn) : zh ? "2026年3月12日" : "Mar 12, 2026"}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span>{post ? (zh ? post.readZh : post.readEn) : zh ? "10 分钟阅读" : "10 min read"}</span>
                </div>
              </div>
            </div>

            <div className={`h-64 rounded-xl bg-gradient-to-br ${post?.gradient ?? "from-orange-500/20 via-rose-500/20 to-purple-500/20"} relative mb-12 overflow-hidden`}>
              <div className="absolute inset-0 bg-[#0a0a0a]/10" />
            </div>

            <section className="mb-12">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  {zh ? article.tldrTitle.zh : article.tldrTitle.en}
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {article.bullets.map((item) => (
                    <li key={item.en} className="flex items-start gap-2">
                      <span className="text-orange-400 mt-0.5">&#x2022;</span>
                      {zh ? item.zh : item.en}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <div className="prose-invert max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {zh ? article.sections[0].zh.title : article.sections[0].en.title}
                </h2>
                {(zh ? article.sections[0].zh.paragraphs : article.sections[0].en.paragraphs).map((paragraph) => (
                  <p key={paragraph} className="text-gray-400 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {zh ? "MCP：给 Agent 用的结构化协议" : "MCP: A Structured Protocol for Agents"}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {zh
                    ? "模型上下文协议（MCP）补上了这个缺口：Agent 用结构化、带 schema 的方式发现和调用工具。每个 MCP Server 都会发布能力清单，用 JSON Schema 描述工具、参数和输出格式。"
                    : "The Model Context Protocol (MCP) addresses this gap by providing a structured, schema-driven way for agents to discover and interact with tools. Each MCP server publishes a capability manifest describing its tools, parameters, and output formats in machine-readable JSON Schema."}
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {zh
                    ? "下面是 Agent 通过 Imagent 目录连接 MCP Server 的例子："
                    : "Here is an example of how an agent connects to an MCP server through the Imagent registry:"}
                </p>

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

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {zh ? "给人用的 API 和给 Agent 用的 API" : "Human-Native vs. Agent-Native APIs"}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {zh
                    ? "差别主要在发现、认证和错误返回。对照如下："
                    : "The fundamental difference lies in how each API paradigm handles discovery, authentication, and error responses. Here is a comparison:"}
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">{zh ? "能力" : "Feature"}</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">{zh ? "给人用" : "Human-Native"}</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">{zh ? "给 Agent 用" : "Agent-Native"}</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      {rows.map((row, index) => (
                        <tr key={row[0]} className={index === rows.length - 1 ? "" : "border-b border-white/5"}>
                          <td className="py-3 px-4 text-white font-medium">{row[0]}</td>
                          <td className="py-3 px-4">{row[1]}</td>
                          <td className="py-3 px-4">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{zh ? "接下来" : "Looking Ahead"}</h2>
                <p className="text-gray-400 leading-relaxed">
                  {zh
                    ? "Agent 生态成熟后，协议会逐渐汇合。MCP、A2A 和函数调用会共用同一层基础设施。现在就开始做面向 Agent 的工具，等自主 Agent 成为外部服务的主要调用方时，分发优势会很明显。"
                    : "As the agent ecosystem matures, we expect protocol convergence. MCP, A2A, and Function Calling protocols will share common infrastructure layers. The teams that invest in agent-native tooling today will have a significant distribution advantage when autonomous agents become the primary consumers of external services."}
                </p>
              </section>
            </div>

            <section className="mb-16 pt-8 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
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

        <section className="px-4 md:px-6 pb-16 border-t border-white/5 pt-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">{zh ? "相关文章" : "Related Articles"}</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {related.map((articleItem) => (
                <a
                  key={articleItem.slug}
                  href={`/blog/${articleItem.slug}`}
                  className="group rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 hover:bg-white/[0.04] transition"
                >
                  <div className={`h-36 bg-gradient-to-br ${articleItem.gradient} relative`}>
                    <div className="absolute inset-0 bg-[#0a0a0a]/20" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                        {localizedLabel(blogCategoryLabels, articleItem.category, zh)}
                      </span>
                      <span className="text-xs text-gray-600">{zh ? articleItem.dateZh : articleItem.dateEn}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white group-hover:text-white/90 mb-2 leading-snug">
                      {zh ? articleItem.titleZh : articleItem.titleEn}
                    </h3>
                    <span className="text-xs text-gray-600">{zh ? articleItem.readZh : articleItem.readEn}</span>
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
