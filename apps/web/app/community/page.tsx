import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import Layout from "@/app/layouts/Layout";
import type { Metadata } from "next";

/* ================================================================== */
/*  METADATA                                                          */
/* ================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host =
    headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);

  return {
    title: locale === "zh" ? "社区 - Imagent" : "Community - Imagent",
    description:
      locale === "zh"
        ? "加入 Imagent 社区论坛 — 与全球开发者交流 MCP 开发、Agent 框架与工具分享。"
        : "Join the Imagent community forum — discuss MCP development, agent frameworks, and tool sharing with developers worldwide.",
    robots: { index: false, follow: false },
  };
}

/* ================================================================== */
/*  TYPES & DATA                                                      */
/* ================================================================== */

type Category = {
  key: string;
  en: string;
  zh: string;
};

const categories: Category[] = [
  { key: "all", en: "All", zh: "全部" },
  { key: "mcp", en: "MCP Development", zh: "MCP 开发" },
  { key: "agent", en: "Agent Framework", zh: "Agent 框架" },
  { key: "tools", en: "Tool Sharing", zh: "工具分享" },
  { key: "qa", en: "Q&A", zh: "问答" },
  { key: "announcements", en: "Announcements", zh: "公告" },
];

type Post = {
  id: number;
  category: string;
  categoryColor: string;
  titleEn: string;
  titleZh: string;
  excerptEn: string;
  excerptZh: string;
  authorName: string;
  authorInitials: string;
  authorColor: string;
  timeEn: string;
  timeZh: string;
  replies: number;
  views: number;
  pinned: boolean;
};

const posts: Post[] = [
  {
    id: 1,
    category: "announcements",
    categoryColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    titleEn: "Imagent v2.0 Released — New Plugin Architecture & MCP 2025 Support",
    titleZh: "Imagent v2.0 发布 — 全新插件架构与 MCP 2025 支持",
    excerptEn:
      "We are excited to announce the release of Imagent v2.0, featuring a completely redesigned plugin system, native MCP 2025 protocol support, and significant performance improvements across the board.",
    excerptZh:
      "我们很高兴宣布 Imagent v2.0 正式发布，带来全新设计的插件系统、原生 MCP 2025 协议支持，以及全面的性能提升。",
    authorName: "Alex Kim",
    authorInitials: "AK",
    authorColor: "bg-violet-500",
    timeEn: "2h ago",
    timeZh: "2 小时前",
    replies: 47,
    views: 1823,
    pinned: true,
  },
  {
    id: 2,
    category: "announcements",
    categoryColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    titleEn: "Community Guidelines Update — Please Read Before Posting",
    titleZh: "社区准则更新 — 发帖前请阅读",
    excerptEn:
      "We have updated our community guidelines to better reflect our growing community. Please take a moment to review the new rules around code sharing, respectful discussion, and content attribution.",
    excerptZh:
      "我们更新了社区准则，以更好地适应不断壮大的社区。请花一点时间阅读关于代码分享、尊重讨论和内容署名的新规则。",
    authorName: "Sara Ramirez",
    authorInitials: "SR",
    authorColor: "bg-blue-500",
    timeEn: "3d ago",
    timeZh: "3 天前",
    replies: 12,
    views: 4210,
    pinned: true,
  },
  {
    id: 3,
    category: "mcp",
    categoryColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    titleEn: "Best Practices for MCP Server Versioning and Backwards Compatibility",
    titleZh: "MCP Server 版本管理与向后兼容的最佳实践",
    excerptEn:
      "How do you handle breaking changes in your MCP server schemas without disrupting downstream agents? Sharing my approach using semantic versioning and capability negotiation patterns.",
    excerptZh:
      "如何在不影响下游 Agent 的前提下处理 MCP Server Schema 的破坏性变更？分享我使用语义化版本和能力协商模式的方法。",
    authorName: "Jun Li",
    authorInitials: "JL",
    authorColor: "bg-emerald-500",
    timeEn: "4h ago",
    timeZh: "4 小时前",
    replies: 34,
    views: 892,
    pinned: false,
  },
  {
    id: 4,
    category: "agent",
    categoryColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    titleEn: "Multi-Agent Orchestration Patterns with A2A Protocol",
    titleZh: "基于 A2A 协议的多 Agent 编排模式",
    excerptEn:
      "Sharing my experience building a pipeline of 5 agents that collaborate on document analysis tasks. Covers fan-out, fan-in, and consensus patterns with real benchmarks.",
    excerptZh:
      "分享我构建 5 个 Agent 协作完成文档分析流水线的经验。涵盖扇出、扇入和共识模式，附真实基准测试数据。",
    authorName: "Maya Patel",
    authorInitials: "MP",
    authorColor: "bg-amber-500",
    timeEn: "6h ago",
    timeZh: "6 小时前",
    replies: 28,
    views: 654,
    pinned: false,
  },
  {
    id: 5,
    category: "tools",
    categoryColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    titleEn: "Building a Custom MCP Server for Internal APIs — Lessons Learned",
    titleZh: "为内部 API 构建自定义 MCP Server — 经验总结",
    excerptEn:
      "A walkthrough of wrapping 12 REST endpoints into a single MCP server with auth and rate limiting. Includes code samples and the pitfalls I encountered along the way.",
    excerptZh:
      "将 12 个 REST 端点封装为带认证和限流的单个 MCP Server 的完整实践。包含代码示例和踩坑记录。",
    authorName: "Tomás Navarro",
    authorInitials: "TN",
    authorColor: "bg-rose-500",
    timeEn: "8h ago",
    timeZh: "8 小时前",
    replies: 19,
    views: 437,
    pinned: false,
  },
  {
    id: 6,
    category: "qa",
    categoryColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    titleEn: "Agent Identity Tokens vs API Keys — Which Should You Use?",
    titleZh: "Agent 身份令牌 vs API Key — 你该选哪个？",
    excerptEn:
      "Comparing security models for agent-to-tool authentication in production environments. Looking for real-world experience reports from teams running agents at scale.",
    excerptZh:
      "对比生产环境中 Agent 到工具认证的安全模型。希望收集在大规模运行 Agent 的团队的实际经验。",
    authorName: "Yuki Watanabe",
    authorInitials: "YW",
    authorColor: "bg-cyan-500",
    timeEn: "12h ago",
    timeZh: "12 小时前",
    replies: 42,
    views: 1105,
    pinned: false,
  },
  {
    id: 7,
    category: "mcp",
    categoryColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    titleEn: "RFC: Standardized Capability Manifest Format for Tool Discovery",
    titleZh: "RFC: 用于工具发现的标准化能力清单格式",
    excerptEn:
      "Proposing a unified manifest spec that works across MCP, A2A, and Function Calling protocols. Would love feedback from server authors and registry maintainers.",
    excerptZh:
      "提议一种跨 MCP、A2A 和 Function Calling 协议的统一清单规范。期待 Server 作者和注册表维护者的反馈。",
    authorName: "Omar Benali",
    authorInitials: "OB",
    authorColor: "bg-orange-500",
    timeEn: "1d ago",
    timeZh: "1 天前",
    replies: 56,
    views: 1342,
    pinned: false,
  },
  {
    id: 8,
    category: "tools",
    categoryColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    titleEn: "I Built a Slack MCP Server — Here Is the Source Code",
    titleZh: "我做了一个 Slack MCP Server — 附源码",
    excerptEn:
      "Open-source MCP server that lets agents read channels, send messages, and manage threads via Slack API. Fully tested with Imagent and ready for production use.",
    excerptZh:
      "开源 MCP Server，让 Agent 通过 Slack API 读取频道、发送消息和管理会话线程。已通过 Imagent 完整测试，可用于生产环境。",
    authorName: "Lena Chen",
    authorInitials: "LC",
    authorColor: "bg-pink-500",
    timeEn: "1d ago",
    timeZh: "1 天前",
    replies: 71,
    views: 2890,
    pinned: false,
  },
  {
    id: 9,
    category: "agent",
    categoryColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    titleEn: "How to Handle Long-Running Agent Tasks Without Timeout Failures",
    titleZh: "如何处理长时间运行的 Agent 任务而不超时失败",
    excerptEn:
      "Deep dive into checkpoint-based execution, heartbeat mechanisms, and graceful degradation strategies for agents that need to run tasks lasting more than 30 minutes.",
    excerptZh:
      "深入探讨检查点执行、心跳机制和优雅降级策略，适用于需要运行超过 30 分钟任务的 Agent。",
    authorName: "Alex Kim",
    authorInitials: "AK",
    authorColor: "bg-violet-500",
    timeEn: "2d ago",
    timeZh: "2 天前",
    replies: 23,
    views: 567,
    pinned: false,
  },
  {
    id: 10,
    category: "qa",
    categoryColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    titleEn: "Why Is My MCP Server Returning Stale Cached Responses?",
    titleZh: "为什么我的 MCP Server 返回过期的缓存响应？",
    excerptEn:
      "Running into an issue where my MCP server seems to cache tool call results even when the underlying data has changed. Has anyone dealt with cache invalidation in MCP?",
    excerptZh:
      "遇到一个问题，即使底层数据已更改，我的 MCP Server 似乎仍然缓存工具调用的结果。有人处理过 MCP 中的缓存失效问题吗？",
    authorName: "Priya Sharma",
    authorInitials: "PS",
    authorColor: "bg-teal-500",
    timeEn: "2d ago",
    timeZh: "2 天前",
    replies: 15,
    views: 324,
    pinned: false,
  },
  {
    id: 11,
    category: "mcp",
    categoryColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    titleEn: "Streaming Responses in MCP Servers — Implementation Guide",
    titleZh: "MCP Server 中的流式响应 — 实现指南",
    excerptEn:
      "A step-by-step guide to implementing server-sent events and streaming responses in your MCP server. Covers backpressure handling, chunking strategies, and client integration.",
    excerptZh:
      "在 MCP Server 中实现服务器推送事件和流式响应的分步指南。涵盖背压处理、分块策略和客户端集成。",
    authorName: "Marcus Johnson",
    authorInitials: "MJ",
    authorColor: "bg-indigo-500",
    timeEn: "3d ago",
    timeZh: "3 天前",
    replies: 38,
    views: 1456,
    pinned: false,
  },
  {
    id: 12,
    category: "agent",
    categoryColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    titleEn: "Comparing Agent Frameworks: Imagent vs LangGraph vs CrewAI in Production",
    titleZh: "Agent 框架对比：Imagent vs LangGraph vs CrewAI 生产环境实测",
    excerptEn:
      "Ran all three frameworks through the same 10-task benchmark over 2 weeks. Sharing latency numbers, error rates, token costs, and my honest take on where each shines.",
    excerptZh:
      "在 2 周内用相同的 10 项任务基准测试了三个框架。分享延迟数据、错误率、Token 成本，以及我对各自优势的客观评价。",
    authorName: "Sara Ramirez",
    authorInitials: "SR",
    authorColor: "bg-blue-500",
    timeEn: "4d ago",
    timeZh: "4 天前",
    replies: 89,
    views: 3567,
    pinned: false,
  },
];

const topContributors = [
  {
    name: "Alex Kim",
    initials: "AK",
    color: "bg-violet-500",
    posts: 142,
  },
  {
    name: "Sara Ramirez",
    initials: "SR",
    color: "bg-blue-500",
    posts: 118,
  },
  {
    name: "Jun Li",
    initials: "JL",
    color: "bg-emerald-500",
    posts: 95,
  },
  {
    name: "Maya Patel",
    initials: "MP",
    color: "bg-amber-500",
    posts: 83,
  },
  {
    name: "Lena Chen",
    initials: "LC",
    color: "bg-pink-500",
    posts: 71,
  },
];

/* ================================================================== */
/*  SVG ICONS                                                         */
/* ================================================================== */

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-3.5 h-3.5"}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zm-8-5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zm13 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 10zm-2.05-4.95a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm-7.78 7.78a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM5.05 5.05a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L5.05 6.11a.75.75 0 010-1.06zm7.78 7.78a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-5 h-5"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-5 h-5"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
}

function SignalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-5 h-5"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.98 0 13.789M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}

/* ================================================================== */
/*  HELPERS                                                           */
/* ================================================================== */

function getCategoryLabel(
  categoryKey: string,
  locale: Locale
): string {
  const cat = categories.find((c) => c.key === categoryKey);
  if (!cat) return categoryKey;
  return locale === "zh" ? cat.zh : cat.en;
}

/* ================================================================== */
/*  PAGE                                                              */
/* ================================================================== */

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const headersList = await headers();
  const host =
    headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);
  const zh = locale === "zh";

  const { category: activeCategory = "all" } = await searchParams;

  /* Filter posts */
  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  /* Sort: pinned first, then by id desc */
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.id - a.id;
  });

  return (
    <Layout
      locale={locale}
      nav={t.nav}
      footer={t.footer}
      searchPlaceholder={t.hero.searchPlaceholder}
    >
      <div className="bg-[#0a0a0a] min-h-screen">
        {/* ============================================================ */}
        {/*  HEADER                                                      */}
        {/* ============================================================ */}
        <section className="pt-28 pb-8 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                  {zh ? "社区" : "Community"}
                </h1>
                <p className="text-gray-400 text-base max-w-xl">
                  {zh
                    ? "与全球开发者交流 MCP 开发经验、分享 Agent 工具、解答技术难题。"
                    : "Discuss MCP development, share agent tools, and solve technical challenges with developers worldwide."}
                </p>
              </div>
              <a
                href="/community/new"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition shrink-0"
              >
                <PlusIcon className="w-4 h-4" />
                {zh ? "发帖" : "New Post"}
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SOCIAL CHANNELS                                              */}
        {/* ============================================================ */}
        <section className="px-4 md:px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/Agent1019/imagent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-gray-300 hover:border-white/20 hover:text-white transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-[#5865F2] hover:border-[#5865F2]/30 hover:bg-[#5865F2]/5 transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                </svg>
                Discord
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-gray-300 hover:border-white/20 hover:text-white transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter / X
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  CATEGORY TABS                                               */}
        {/* ============================================================ */}
        <section className="px-4 md:px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                const href =
                  cat.key === "all"
                    ? "/community"
                    : `/community?category=${cat.key}`;
                return (
                  <a
                    key={cat.key}
                    href={href}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition ${
                      isActive
                        ? "bg-white/10 text-white border-white/20"
                        : "text-gray-400 border-white/5 hover:text-white hover:border-white/10 hover:bg-white/5"
                    }`}
                  >
                    {zh ? cat.zh : cat.en}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  MAIN CONTENT + SIDEBAR                                      */}
        {/* ============================================================ */}
        <section className="px-4 md:px-6 pb-16">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* -------------------------------------------------------- */}
            {/*  POST LIST                                               */}
            {/* -------------------------------------------------------- */}
            <div className="flex-1 min-w-0">
              {sortedPosts.length === 0 ? (
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-12 text-center">
                  <p className="text-gray-500">
                    {zh
                      ? "该分类下暂无帖子。"
                      : "No posts in this category yet."}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedPosts.map((post) => (
                    <a
                      key={post.id}
                      href={`/community/${post.id}`}
                      className="block rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 hover:bg-white/[0.04] transition group"
                    >
                      {/* Top row: badge + pin */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <span
                          className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${post.categoryColor}`}
                        >
                          {getCategoryLabel(post.category, locale)}
                        </span>
                        {post.pinned && (
                          <span className="inline-flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                            <PinIcon className="w-3 h-3" />
                            {zh ? "置顶" : "Pinned"}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-white mb-1.5 leading-snug group-hover:underline">
                        {zh ? post.titleZh : post.titleEn}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
                        {zh ? post.excerptZh : post.excerptEn}
                      </p>

                      {/* Bottom row */}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {/* Author */}
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-full ${post.authorColor} flex items-center justify-center text-white text-[10px] font-bold`}
                          >
                            {post.authorInitials}
                          </div>
                          <span className="text-gray-400">
                            {post.authorName}
                          </span>
                        </div>

                        <span className="text-gray-700">&middot;</span>

                        {/* Time */}
                        <span>{zh ? post.timeZh : post.timeEn}</span>

                        <span className="text-gray-700">&middot;</span>

                        {/* Replies */}
                        <span className="flex items-center gap-1">
                          <ChatIcon className="w-3.5 h-3.5" />
                          {post.replies}
                        </span>

                        {/* Views */}
                        <span className="flex items-center gap-1">
                          <EyeIcon className="w-3.5 h-3.5" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* ------------------------------------------------------ */}
              {/*  PAGINATION                                            */}
              {/* ------------------------------------------------------ */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <span className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-600 border border-white/5 cursor-default">
                  <ChevronLeftIcon className="w-4 h-4" />
                  {zh ? "上一页" : "Previous"}
                </span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium bg-white/10 text-white border border-white/20">
                  1
                </span>
                <a
                  href={
                    activeCategory === "all"
                      ? "/community?page=2"
                      : `/community?category=${activeCategory}&page=2`
                  }
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm text-gray-400 border border-white/5 hover:border-white/10 hover:bg-white/5 transition"
                >
                  2
                </a>
                <a
                  href={
                    activeCategory === "all"
                      ? "/community?page=3"
                      : `/community?category=${activeCategory}&page=3`
                  }
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm text-gray-400 border border-white/5 hover:border-white/10 hover:bg-white/5 transition"
                >
                  3
                </a>
                <a
                  href={
                    activeCategory === "all"
                      ? "/community?page=2"
                      : `/community?category=${activeCategory}&page=2`
                  }
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-400 border border-white/5 hover:border-white/10 hover:bg-white/5 transition"
                >
                  {zh ? "下一页" : "Next"}
                  <ChevronRightIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/*  SIDEBAR                                                 */}
            {/* -------------------------------------------------------- */}
            <aside className="hidden lg:block lg:w-72 shrink-0 space-y-5">
              {/* Community Stats */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <h3 className="text-sm font-semibold text-white mb-4">
                  {zh ? "社区统计" : "Community Stats"}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                      <UsersIcon className="w-4 h-4" />
                      {zh ? "成员" : "Members"}
                    </span>
                    <span className="text-sm font-medium text-white">
                      5,247
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                      <DocumentIcon className="w-4 h-4" />
                      {zh ? "帖子" : "Posts"}
                    </span>
                    <span className="text-sm font-medium text-white">
                      1,834
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                      <SignalIcon className="w-4 h-4" />
                      {zh ? "在线" : "Online"}
                    </span>
                    <span className="text-sm font-medium text-emerald-400">
                      127
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Contributors */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <h3 className="text-sm font-semibold text-white mb-4">
                  {zh ? "活跃贡献者" : "Top Contributors"}
                </h3>
                <div className="space-y-3">
                  {topContributors.map((c, i) => (
                    <div
                      key={c.name}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xs text-gray-600 w-4 text-right">
                        {i + 1}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full ${c.color} flex items-center justify-center text-white text-[10px] font-bold`}
                      >
                        {c.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate">
                          {c.name}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {c.posts} {zh ? "帖" : "posts"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <h3 className="text-sm font-semibold text-white mb-4">
                  {zh ? "社区准则" : "Community Guidelines"}
                </h3>
                <ul className="space-y-2 text-xs text-gray-400 leading-relaxed">
                  <li className="flex gap-2">
                    <span className="text-gray-600 shrink-0">1.</span>
                    {zh
                      ? "尊重他人，保持友善和建设性的讨论氛围。"
                      : "Be respectful and maintain a constructive discussion atmosphere."}
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-600 shrink-0">2.</span>
                    {zh
                      ? "发帖前请搜索是否已有类似话题。"
                      : "Search for similar topics before creating a new post."}
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-600 shrink-0">3.</span>
                    {zh
                      ? "分享代码时请使用代码块格式化。"
                      : "Use code blocks when sharing code snippets."}
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-600 shrink-0">4.</span>
                    {zh
                      ? "禁止发布广告、垃圾信息和无关内容。"
                      : "No spam, advertisements, or off-topic content."}
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-600 shrink-0">5.</span>
                    {zh
                      ? "引用外部内容时请注明出处。"
                      : "Attribute external sources properly."}
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </Layout>
  );
}
