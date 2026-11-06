import { headers } from "next/headers";
import { getLocaleFromHost, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import { communityCategoryLabels, localizedLabel } from "@/lib/i18n/labels";
import Layout from "@/app/layouts/Layout";
import { getCommunityPost } from "@/lib/community";
import type { Metadata } from "next";

/* ================================================================== */
/*  METADATA                                                          */
/* ================================================================== */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const headersList = await headers();
  const host =
    headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);
  const { id } = await params;

  const post = getPostById(id, locale);

  return {
    title: post
      ? `${post.title} - Imagent Community`
      : locale === "zh"
        ? "帖子 - Imagent 社区"
        : "Post - Imagent Community",
    robots: { index: false, follow: false },
  };
}

/* ================================================================== */
/*  TYPES & DATA                                                      */
/* ================================================================== */

type PostData = {
  id: string;
  category: string;
  categoryKey: string;
  categoryColor: string;
  title: string;
  authorName: string;
  authorInitials: string;
  authorColor: string;
  authorJoinEn: string;
  authorJoinZh: string;
  postDateEn: string;
  postDateZh: string;
  bodyEn: string[];
  bodyZh: string[];
  codeBlock: string;
  tags: { en: string; zh: string }[];
  likes: number;
  bookmarks: number;
  shares: number;
};

type Comment = {
  id: number;
  authorName: string;
  authorInitials: string;
  authorColor: string;
  timeEn: string;
  timeZh: string;
  textEn: string;
  textZh: string;
  likes: number;
  replies: number;
  nested?: {
    authorName: string;
    authorInitials: string;
    authorColor: string;
    timeEn: string;
    timeZh: string;
    textEn: string;
    textZh: string;
    likes: number;
  };
};

function getPostById(id: string, locale: Locale): { title: string } | null {
  const numericId = parseInt(id, 10);
  const zh = locale === "zh";

  const titles: Record<number, { en: string; zh: string }> = {
    1: {
      en: "Imagent v2.0 Released — New Plugin Architecture & MCP 2025 Support",
      zh: "Imagent v2.0 发布 — 全新插件架构与 MCP 2025 支持",
    },
    2: {
      en: "Community Guidelines Update — Please Read Before Posting",
      zh: "社区准则更新 — 发帖前请阅读",
    },
    3: {
      en: "Best Practices for MCP Server Versioning and Backwards Compatibility",
      zh: "MCP Server 版本管理与向后兼容的最佳实践",
    },
    4: {
      en: "Multi-Agent Orchestration Patterns with A2A Protocol",
      zh: "基于 A2A 协议的多 Agent 编排模式",
    },
    5: {
      en: "Building a Custom MCP Server for Internal APIs — Lessons Learned",
      zh: "为内部 API 构建自定义 MCP Server — 经验总结",
    },
    6: {
      en: "Agent Identity Tokens vs API Keys — Which Should You Use?",
      zh: "Agent 身份令牌 vs API Key — 你该选哪个？",
    },
    7: {
      en: "RFC: Standardized Capability Manifest Format for Tool Discovery",
      zh: "RFC: 用于工具发现的标准化能力清单格式",
    },
    8: {
      en: "I Built a Slack MCP Server — Here Is the Source Code",
      zh: "我做了一个 Slack MCP Server — 附源码",
    },
    9: {
      en: "How to Handle Long-Running Agent Tasks Without Timeout Failures",
      zh: "如何处理长时间运行的 Agent 任务而不超时失败",
    },
    10: {
      en: "Why Is My MCP Server Returning Stale Cached Responses?",
      zh: "为什么我的 MCP Server 返回过期的缓存响应？",
    },
    11: {
      en: "Streaming Responses in MCP Servers — Implementation Guide",
      zh: "MCP Server 中的流式响应 — 实现指南",
    },
    12: {
      en: "Comparing Agent Frameworks: Imagent vs LangGraph vs CrewAI in Production",
      zh: "Agent 框架对比：Imagent vs LangGraph vs CrewAI 生产环境实测",
    },
  };

  const entry = titles[numericId];
  if (!entry) return null;
  return { title: zh ? entry.zh : entry.en };
}

function getFullPostData(id: string, locale: Locale): PostData {
  const numericId = parseInt(id, 10);
  const zh = locale === "zh";

  /* Map of category assignments by id */
  const categoryMap: Record<
    number,
    { key: string; en: string; zh: string; color: string }
  > = {
    1: {
      key: "announcements",
      en: "Announcements",
      zh: "公告",
      color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    2: {
      key: "announcements",
      en: "Announcements",
      zh: "公告",
      color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    3: {
      key: "mcp",
      en: "MCP Development",
      zh: "MCP 开发",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    4: {
      key: "agent",
      en: "Agent Framework",
      zh: "Agent 框架",
      color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    },
    5: {
      key: "tools",
      en: "Tool Sharing",
      zh: "工具分享",
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    6: {
      key: "qa",
      en: "Q&A",
      zh: "问答",
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    },
    7: {
      key: "mcp",
      en: "MCP Development",
      zh: "MCP 开发",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    8: {
      key: "tools",
      en: "Tool Sharing",
      zh: "工具分享",
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    9: {
      key: "agent",
      en: "Agent Framework",
      zh: "Agent 框架",
      color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    },
    10: {
      key: "qa",
      en: "Q&A",
      zh: "问答",
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    },
    11: {
      key: "mcp",
      en: "MCP Development",
      zh: "MCP 开发",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    12: {
      key: "agent",
      en: "Agent Framework",
      zh: "Agent 框架",
      color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    },
  };

  const authors: Record<
    number,
    {
      name: string;
      initials: string;
      color: string;
      joinEn: string;
      joinZh: string;
    }
  > = {
    1: { name: "Alex Kim", initials: "AK", color: "bg-violet-500", joinEn: "Joined Jan 2024", joinZh: "2024年1月加入" },
    2: { name: "Sara Ramirez", initials: "SR", color: "bg-blue-500", joinEn: "Joined Mar 2024", joinZh: "2024年3月加入" },
    3: { name: "Jun Li", initials: "JL", color: "bg-emerald-500", joinEn: "Joined Feb 2024", joinZh: "2024年2月加入" },
    4: { name: "Maya Patel", initials: "MP", color: "bg-amber-500", joinEn: "Joined May 2024", joinZh: "2024年5月加入" },
    5: { name: "Tomás Navarro", initials: "TN", color: "bg-rose-500", joinEn: "Joined Apr 2024", joinZh: "2024年4月加入" },
    6: { name: "Yuki Watanabe", initials: "YW", color: "bg-cyan-500", joinEn: "Joined Jun 2024", joinZh: "2024年6月加入" },
    7: { name: "Omar Benali", initials: "OB", color: "bg-orange-500", joinEn: "Joined Jul 2024", joinZh: "2024年7月加入" },
    8: { name: "Lena Chen", initials: "LC", color: "bg-pink-500", joinEn: "Joined Aug 2024", joinZh: "2024年8月加入" },
    9: { name: "Alex Kim", initials: "AK", color: "bg-violet-500", joinEn: "Joined Jan 2024", joinZh: "2024年1月加入" },
    10: { name: "Priya Sharma", initials: "PS", color: "bg-teal-500", joinEn: "Joined Sep 2024", joinZh: "2024年9月加入" },
    11: { name: "Marcus Johnson", initials: "MJ", color: "bg-indigo-500", joinEn: "Joined Oct 2024", joinZh: "2024年10月加入" },
    12: { name: "Sara Ramirez", initials: "SR", color: "bg-blue-500", joinEn: "Joined Mar 2024", joinZh: "2024年3月加入" },
  };

  const postDates: Record<number, { en: string; zh: string }> = {
    1: { en: "December 15, 2025", zh: "2025年12月15日" },
    2: { en: "December 12, 2025", zh: "2025年12月12日" },
    3: { en: "December 15, 2025", zh: "2025年12月15日" },
    4: { en: "December 15, 2025", zh: "2025年12月15日" },
    5: { en: "December 14, 2025", zh: "2025年12月14日" },
    6: { en: "December 14, 2025", zh: "2025年12月14日" },
    7: { en: "December 13, 2025", zh: "2025年12月13日" },
    8: { en: "December 13, 2025", zh: "2025年12月13日" },
    9: { en: "December 12, 2025", zh: "2025年12月12日" },
    10: { en: "December 12, 2025", zh: "2025年12月12日" },
    11: { en: "December 11, 2025", zh: "2025年12月11日" },
    12: { en: "December 10, 2025", zh: "2025年12月10日" },
  };

  const cat = categoryMap[numericId] ?? categoryMap[3];
  const author = authors[numericId] ?? authors[1];
  const postDate = postDates[numericId] ?? postDates[1];
  const titleInfo = getPostById(id, locale);

  /* Body paragraphs vary by id to feel realistic */
  const bodyEn = [
    `This topic has been coming up frequently in our community discussions, and I wanted to share a comprehensive overview based on my experience working with these patterns in production over the past several months.`,
    `The key insight is that there is no one-size-fits-all approach. The right choice depends heavily on your specific use case, scale requirements, and the constraints of your deployment environment. Below I will walk through the main considerations and trade-offs.`,
    `Here is a simplified example that demonstrates the core pattern. Note how we handle error propagation and ensure graceful degradation when downstream services are unavailable:`,
    `After running this in production for about three months, we have seen a 40% reduction in timeout errors and a significant improvement in overall system reliability. The key was implementing proper checkpoint-based recovery rather than relying on simple retry logic. I would love to hear how others in the community have approached similar challenges.`,
  ];

  const bodyZh = [
    `这个话题在社区讨论中频繁出现，我想基于过去几个月在生产环境中使用这些模式的经验，分享一个全面的概述。`,
    `核心洞察是没有放之四海而皆准的方案。正确的选择很大程度上取决于你的具体用例、规模要求和部署环境的约束。下面我将详细介绍主要的考量因素和权衡取舍。`,
    `这是一个简化的示例，展示了核心模式。注意我们如何处理错误传播，并在下游服务不可用时确保优雅降级：`,
    `在生产环境运行约三个月后，我们的超时错误减少了 40%，系统整体可靠性显著提升。关键在于实现了基于检查点的恢复机制，而非依赖简单的重试逻辑。很期待听到社区中其他人如何应对类似挑战的经验。`,
  ];

  const codeBlock = `import { MCPServer } from "@imagent/mcp";

const server = new MCPServer({
  name: "my-tool-server",
  version: "1.2.0",
});

server.tool("search", {
  description: "Search the knowledge base",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string" },
      limit: { type: "number", default: 10 },
    },
    required: ["query"],
  },
  handler: async ({ query, limit }) => {
    const results = await db.search(query, { limit });
    return { content: results.map(formatResult) };
  },
});

server.start({ transport: "stdio" });`;

  const tagsMap: Record<number, { en: string; zh: string }[]> = {
    1: [{ en: "Release Notes", zh: "发版说明" }, { en: "MCP 2025", zh: "MCP 2025" }, { en: "Plugins", zh: "插件" }],
    2: [{ en: "Guidelines", zh: "社区准则" }, { en: "Meta", zh: "站务" }],
    3: [{ en: "Versioning", zh: "版本管理" }, { en: "Best Practices", zh: "最佳实践" }, { en: "MCP Server", zh: "MCP Server" }],
    4: [{ en: "Multi-Agent", zh: "多 Agent" }, { en: "A2A Protocol", zh: "A2A 协议" }, { en: "Orchestration", zh: "编排" }],
    5: [{ en: "Tutorial", zh: "教程" }, { en: "REST API", zh: "REST API" }, { en: "MCP Server", zh: "MCP Server" }],
    6: [{ en: "Security", zh: "安全" }, { en: "Authentication", zh: "认证" }, { en: "Production", zh: "生产环境" }],
    7: [{ en: "RFC", zh: "RFC" }, { en: "Standards", zh: "标准" }, { en: "Tool Discovery", zh: "工具发现" }],
    8: [{ en: "Open Source", zh: "开源" }, { en: "Slack", zh: "Slack" }, { en: "MCP Server", zh: "MCP Server" }],
    9: [{ en: "Long-Running", zh: "长任务" }, { en: "Resilience", zh: "容错" }, { en: "Patterns", zh: "模式" }],
    10: [{ en: "Caching", zh: "缓存" }, { en: "Bug", zh: "Bug" }, { en: "MCP Server", zh: "MCP Server" }],
    11: [{ en: "Streaming", zh: "流式" }, { en: "SSE", zh: "SSE" }, { en: "Guide", zh: "指南" }],
    12: [{ en: "Comparison", zh: "对比" }, { en: "LangGraph", zh: "LangGraph" }, { en: "Benchmarks", zh: "基准测试" }],
  };

  const likesMap: Record<number, number> = { 1: 89, 2: 24, 3: 67, 4: 52, 5: 41, 6: 78, 7: 93, 8: 124, 9: 35, 10: 18, 11: 56, 12: 147 };
  const bookmarksMap: Record<number, number> = { 1: 34, 2: 12, 3: 28, 4: 19, 5: 22, 6: 31, 7: 45, 8: 67, 9: 15, 10: 8, 11: 24, 12: 58 };
  const sharesMap: Record<number, number> = { 1: 15, 2: 5, 3: 12, 4: 8, 5: 7, 6: 14, 7: 21, 8: 32, 9: 6, 10: 3, 11: 11, 12: 28 };

  return {
    id,
    category: zh ? cat.zh : cat.en,
    categoryKey: cat.key,
    categoryColor: cat.color,
    title: titleInfo?.title ?? (zh ? "未知帖子" : "Unknown Post"),
    authorName: author.name,
    authorInitials: author.initials,
    authorColor: author.color,
    authorJoinEn: author.joinEn,
    authorJoinZh: author.joinZh,
    postDateEn: postDate.en,
    postDateZh: postDate.zh,
    bodyEn,
    bodyZh,
    codeBlock,
    tags: tagsMap[numericId] ?? tagsMap[3],
    likes: likesMap[numericId] ?? 50,
    bookmarks: bookmarksMap[numericId] ?? 20,
    shares: sharesMap[numericId] ?? 10,
  };
}

function getComments(locale: Locale): Comment[] {
  const zh = locale === "zh";
  return [
    {
      id: 1,
      authorName: "David Park",
      authorInitials: "DP",
      authorColor: "bg-sky-500",
      timeEn: "3 hours ago",
      timeZh: "3 小时前",
      textEn:
        "Great write-up! We ran into the exact same issue at our company last month. The checkpoint-based recovery approach you described is definitely the way to go. We also added a dead-letter queue for tasks that fail more than 3 times, which helped us identify systemic issues.",
      textZh:
        "写得太好了！我们公司上个月也遇到了完全相同的问题。你描述的基于检查点的恢复方案确实是正确的方向。我们还为失败超过 3 次的任务添加了死信队列，帮助我们识别系统性问题。",
      likes: 12,
      replies: 1,
      nested: {
        authorName: "Jun Li",
        authorInitials: "JL",
        authorColor: "bg-emerald-500",
        timeEn: "2 hours ago",
        timeZh: "2 小时前",
        textEn:
          "Thanks David! The dead-letter queue idea is excellent. Have you found a good threshold for the retry count? We have been debating between 3 and 5 attempts.",
        textZh:
          "谢谢 David！死信队列的想法很棒。你觉得重试次数的合理阈值是多少？我们一直在 3 次和 5 次之间纠结。",
        likes: 4,
      },
    },
    {
      id: 2,
      authorName: "Emma Wilson",
      authorInitials: "EW",
      authorColor: "bg-fuchsia-500",
      timeEn: "5 hours ago",
      timeZh: "5 小时前",
      textEn:
        "I appreciate the code example. One thing I would add is error boundary handling at the agent level. We found that wrapping each tool call in a try-catch with structured error responses made our agents much more resilient to intermittent failures.",
      textZh:
        "感谢代码示例。我想补充一点，在 Agent 层面添加错误边界处理很有用。我们发现用 try-catch 包裹每个工具调用并返回结构化错误响应，让 Agent 对间歇性故障的容错能力大幅提升。",
      likes: 8,
      replies: 0,
    },
    {
      id: 3,
      authorName: "Raj Krishnan",
      authorInitials: "RK",
      authorColor: "bg-lime-500",
      timeEn: "8 hours ago",
      timeZh: "8 小时前",
      textEn:
        "Has anyone tested this pattern with the latest MCP 2025 spec? I am curious whether the new streaming capabilities change the recommended approach for long-running tasks. The spec mentions native support for progress events.",
      textZh:
        "有人用最新的 MCP 2025 规范测试过这个模式吗？我很好奇新的流式能力是否会改变长任务处理的推荐方案。规范中提到了对进度事件的原生支持。",
      likes: 5,
      replies: 0,
    },
    {
      id: 4,
      authorName: "Sophie Zhang",
      authorInitials: "SZ",
      authorColor: "bg-orange-500",
      timeEn: "12 hours ago",
      timeZh: "12 小时前",
      textEn:
        "This is exactly what I needed for my current project. We are building a document processing pipeline with 4 agents and were struggling with timeout issues. Going to implement this pattern this week and will report back with results.",
      textZh:
        "这正是我当前项目所需要的。我们正在构建一个包含 4 个 Agent 的文档处理流水线，一直被超时问题困扰。打算这周实现这个模式，之后回来汇报结果。",
      likes: 3,
      replies: 0,
    },
    {
      id: 5,
      authorName: "Carlos Mendez",
      authorInitials: "CM",
      authorColor: "bg-red-500",
      timeEn: "1 day ago",
      timeZh: "1 天前",
      textEn:
        "Solid post. One consideration for teams running this at scale: make sure your checkpoint storage can handle the write throughput. We initially used a simple database table but had to switch to Redis for checkpoint state once we hit around 500 concurrent agent tasks.",
      textZh:
        "好文章。对于大规模运行的团队有一个注意事项：确保检查点存储能处理写入吞吐量。我们最初使用简单的数据库表，但在并发 Agent 任务达到约 500 个时不得不切换到 Redis 来存储检查点状态。",
      likes: 15,
      replies: 0,
    },
  ];
}

/* ================================================================== */
/*  SVG ICONS                                                         */
/* ================================================================== */

function HeartIcon({ className }: { className?: string }) {
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
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
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
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
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
        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
      />
    </svg>
  );
}

function ChatBubbleIcon({ className }: { className?: string }) {
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

function ChevronRightSmall({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-3.5 h-3.5"}
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

/* ================================================================== */
/*  PAGE                                                              */
/* ================================================================== */

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const headersList = await headers();
  const host =
    headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);
  const zh = locale === "zh";

  const { id } = await params;
  if (!getPostById(id, locale)) {
    const live = await getCommunityPost(id);
    return (
      <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
        <div className="bg-[#0a0a0a] min-h-screen">
          <div className="max-w-3xl mx-auto px-4 md:px-6 pt-28 pb-16">
            <a href="/community" className="text-sm text-gray-500 hover:text-white">
              {zh ? "返回社区" : "Back to community"}
            </a>
            {live ? (
              <article className="mt-6">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  {localizedLabel(communityCategoryLabels, live.category, zh)}
                </p>
                <h1 className="mt-2 text-3xl font-bold text-white">{live.title}</h1>
                <p className="mt-2 text-sm text-gray-500">
                  {live.authorName} · {live.createdAt.slice(0, 10)}
                </p>
                <div className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{live.body}</div>
              </article>
            ) : (
              <h1 className="mt-6 text-3xl font-bold text-white">{zh ? "找不到这篇帖子" : "Post not found"}</h1>
            )}
          </div>
        </div>
      </Layout>
    );
  }
  const post = getFullPostData(id, locale);
  const comments = getComments(locale);
  const commentCount = comments.length + 1; /* +1 for the nested reply */

  return (
    <Layout
      locale={locale}
      nav={t.nav}
      footer={t.footer}
      searchPlaceholder={t.hero.searchPlaceholder}
    >
      <div className="bg-[#0a0a0a] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          {/* ========================================================== */}
          {/*  BREADCRUMB                                                */}
          {/* ========================================================== */}
          <nav className="pt-28 pb-4 flex items-center gap-1.5 text-sm text-gray-500 overflow-hidden">
            <a
              href="/community"
              className="hover:text-white transition shrink-0"
            >
              {zh ? "社区" : "Community"}
            </a>
            <ChevronRightSmall className="w-3.5 h-3.5 shrink-0 text-gray-700" />
            <a
              href={`/community?category=${post.categoryKey}`}
              className="hover:text-white transition shrink-0"
            >
              {post.category}
            </a>
            <ChevronRightSmall className="w-3.5 h-3.5 shrink-0 text-gray-700" />
            <span className="text-gray-400 truncate">{post.title}</span>
          </nav>

          {/* ========================================================== */}
          {/*  POST HEADER                                               */}
          {/* ========================================================== */}
          <header className="pb-6 border-b border-white/5">
            <span
              className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border mb-4 ${post.categoryColor}`}
            >
              {post.category}
            </span>

            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-5">
              {post.title}
            </h1>

            {/* Author info */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full ${post.authorColor} flex items-center justify-center text-white text-sm font-bold`}
              >
                {post.authorInitials}
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  {post.authorName}
                </div>
                <div className="text-xs text-gray-500">
                  {zh ? post.authorJoinZh : post.authorJoinEn} &middot;{" "}
                  {zh ? post.postDateZh : post.postDateEn}
                </div>
              </div>
            </div>
          </header>

          {/* ========================================================== */}
          {/*  POST BODY                                                 */}
          {/* ========================================================== */}
          <article className="py-8 space-y-5">
            {(zh ? post.bodyZh : post.bodyEn).map((paragraph, i) => (
              <p
                key={i}
                className="text-base text-gray-300 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            {/* Code block */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                <span className="text-xs text-gray-500 font-mono">
                  TypeScript
                </span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                <code className="text-gray-300 font-mono text-[13px]">
                  {post.codeBlock}
                </code>
              </pre>
            </div>

            {/* Final paragraph */}
            <p className="text-base text-gray-300 leading-relaxed">
              {zh
                ? "如果你对这篇帖子有任何想法或问题，欢迎在下方评论区分享。也可以通过标签筛选相关话题的更多讨论。"
                : "If you have any thoughts or questions about this post, feel free to share in the comments below. You can also browse related discussions by filtering with the tags."}
            </p>
          </article>

          {/* ========================================================== */}
          {/*  TAGS                                                      */}
          {/* ========================================================== */}
          <div className="flex flex-wrap gap-2 pb-6">
            {post.tags.map((tag) => (
              <span
                key={tag.en}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400 border border-white/5"
              >
                {zh ? tag.zh : tag.en}
              </span>
            ))}
          </div>

          {/* ========================================================== */}
          {/*  INTERACTION BAR                                           */}
          {/* ========================================================== */}
          <div className="flex items-center gap-6 py-5 border-y border-white/5">
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <HeartIcon className="w-5 h-5" />
              {post.likes}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <BookmarkIcon className="w-5 h-5" />
              {post.bookmarks}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <ShareIcon className="w-5 h-5" />
              {post.shares}
            </span>
          </div>

          {/* ========================================================== */}
          {/*  COMMENTS SECTION                                          */}
          {/* ========================================================== */}
          <section className="py-8">
            <h2 className="text-lg font-semibold text-white mb-6">
              {commentCount} {zh ? "条评论" : "Comments"}
            </h2>

            {/* Comment input placeholder */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 text-xs font-bold">
                  ?
                </div>
                <span className="text-sm text-gray-500">
                  {zh
                    ? "登录后参与讨论..."
                    : "Sign in to join the discussion..."}
                </span>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 min-h-[60px]">
                <span className="text-sm text-gray-600">
                  {zh
                    ? "写下你的想法..."
                    : "Write your thoughts..."}
                </span>
              </div>
            </div>

            {/* Comments list */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id}>
                  {/* Main comment */}
                  <div className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${comment.authorColor} flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5`}
                    >
                      {comment.authorInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">
                          {comment.authorName}
                        </span>
                        <span className="text-xs text-gray-600">
                          &middot;
                        </span>
                        <span className="text-xs text-gray-500">
                          {zh ? comment.timeZh : comment.timeEn}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed mb-2">
                        {zh ? comment.textZh : comment.textEn}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <HeartIcon className="w-3.5 h-3.5" />
                          {comment.likes}
                        </span>
                        {comment.replies > 0 && (
                          <span className="flex items-center gap-1">
                            <ChatBubbleIcon className="w-3.5 h-3.5" />
                            {comment.replies}{" "}
                            {zh ? "回复" : "reply"}
                          </span>
                        )}
                      </div>

                      {/* Nested reply */}
                      {comment.nested && (
                        <div className="mt-4 ml-2 pl-4 border-l-2 border-white/5">
                          <div className="flex gap-3">
                            <div
                              className={`w-7 h-7 rounded-full ${comment.nested.authorColor} flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5`}
                            >
                              {comment.nested.authorInitials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-white">
                                  {comment.nested.authorName}
                                </span>
                                <span className="text-xs text-gray-600">
                                  &middot;
                                </span>
                                <span className="text-xs text-gray-500">
                                  {zh
                                    ? comment.nested.timeZh
                                    : comment.nested.timeEn}
                                </span>
                              </div>
                              <p className="text-sm text-gray-300 leading-relaxed mb-2">
                                {zh
                                  ? comment.nested.textZh
                                  : comment.nested.textEn}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <HeartIcon className="w-3.5 h-3.5" />
                                  {comment.nested.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
