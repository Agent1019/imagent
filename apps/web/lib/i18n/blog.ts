export type BlogPost = {
  slug: string;
  category: "Engineering" | "Product" | "Tutorials" | "Company";
  dateEn: string;
  dateZh: string;
  titleEn: string;
  titleZh: string;
  excerptEn: string;
  excerptZh: string;
  readEn: string;
  readZh: string;
  gradient: string;
};

export const blogCategoryLabels: Record<string, { en: string; zh: string }> = {
  All: { en: "All", zh: "全部" },
  Engineering: { en: "Engineering", zh: "工程" },
  Product: { en: "Product", zh: "产品" },
  Tutorials: { en: "Tutorials", zh: "教程" },
  Company: { en: "Company", zh: "公司" },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-mcp-protocol-architecture",
    category: "Engineering",
    dateEn: "Mar 12, 2026",
    dateZh: "2026年3月12日",
    titleEn: "Understanding MCP Protocol Architecture: A Deep Dive",
    titleZh: "理解 MCP 协议架构",
    excerptEn: "How the Model Context Protocol enables structured communication between AI agents and external tools, and why it matters for production systems.",
    excerptZh: "模型上下文协议如何让 AI Agent 与外部工具进行结构化通信，以及这对生产系统为什么重要。",
    readEn: "8 min read",
    readZh: "8 分钟阅读",
    gradient: "from-orange-500/20 via-rose-500/20 to-purple-500/20",
  },
  {
    slug: "agent-authentication-best-practices",
    category: "Engineering",
    dateEn: "Mar 8, 2026",
    dateZh: "2026年3月8日",
    titleEn: "Agent Authentication Best Practices for Production",
    titleZh: "生产环境中的 Agent 认证实践",
    excerptEn: "Scoped tokens, identity chains, and zero-trust patterns — a practical guide to securing autonomous agent-to-tool interactions at scale.",
    excerptZh: "作用域令牌、身份链和零信任：如何在规模化场景下保护 Agent 与工具之间的自主交互。",
    readEn: "6 min read",
    readZh: "6 分钟阅读",
    gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
  },
  {
    slug: "launching-tool-discovery-v2",
    category: "Product",
    dateEn: "Mar 3, 2026",
    dateZh: "2026年3月3日",
    titleEn: "Launching Tool Discovery v2: Semantic Search for Agents",
    titleZh: "工具发现 v2：面向 Agent 的语义搜索",
    excerptEn: "Our new vector-based search engine lets agents find tools by capability description, not just by name. Here is what changed and why.",
    excerptZh: "新的向量搜索让 Agent 按能力描述找工具，而不只是按名称。这里说明改了什么、为什么改。",
    readEn: "5 min read",
    readZh: "5 分钟阅读",
    gradient: "from-violet-500/20 via-fuchsia-500/20 to-pink-500/20",
  },
  {
    slug: "build-your-first-mcp-server",
    category: "Tutorials",
    dateEn: "Feb 26, 2026",
    dateZh: "2026年2月26日",
    titleEn: "Build Your First MCP Server in Under 30 Minutes",
    titleZh: "30 分钟搭建第一个 MCP Server",
    excerptEn: "A step-by-step tutorial covering server setup, capability manifests, schema validation, and publishing to the Imagent registry.",
    excerptZh: "从服务搭建、能力清单、schema 校验到发布到 Imagent 目录的分步教程。",
    readEn: "12 min read",
    readZh: "12 分钟阅读",
    gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
  },
  {
    slug: "why-agent-economy-needs-infrastructure",
    category: "Company",
    dateEn: "Feb 18, 2026",
    dateZh: "2026年2月18日",
    titleEn: "Why the Agent Economy Needs Dedicated Infrastructure",
    titleZh: "为什么 Agent 经济需要专门的基础设施",
    excerptEn: "Human-native APIs were built for browsers and mobile apps. Agent-native infrastructure requires a fundamentally different approach to auth, billing, and discovery.",
    excerptZh: "给人用的 API 是为浏览器和手机应用设计的。Agent 基础设施在认证、计费和发现上需要另一套做法。",
    readEn: "7 min read",
    readZh: "7 分钟阅读",
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
  },
  {
    slug: "usage-based-billing-for-mcp-servers",
    category: "Product",
    dateEn: "Feb 10, 2026",
    dateZh: "2026年2月10日",
    titleEn: "Usage-Based Billing for MCP Servers: How It Works",
    titleZh: "MCP Server 的按量计费是怎么工作的",
    excerptEn: "A technical breakdown of our metering pipeline, from invocation events to invoice generation. Includes webhook integration and real-time dashboards.",
    excerptZh: "从调用事件到账单生成的计量链路，包括 Webhook 和实时用量看板。",
    readEn: "9 min read",
    readZh: "9 分钟阅读",
    gradient: "from-rose-500/20 via-pink-500/20 to-fuchsia-500/20",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
