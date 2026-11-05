import { type Locale } from "./config";

type Content = {
  nav: { explore: string; rankings: string; blog: string; docs: string; pricing: string; signIn: string; getStarted: string };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    subtitle1: string;
    subtitle2: string;
    mcpCopy: string;
    mcpGuide: string;
    searchPlaceholder: string;
    exploreBtn: string;
    publishBtn: string;
  };
  stats: { servers: string; calls: string; publishers: string; uptime: string };
  features: {
    title: string;
    subtitle: string;
    discover: { title: string; desc: string };
    auth: { title: string; desc: string };
    monetize: { title: string; desc: string };
  };
  howItWorks: { title: string; subtitle: string; steps: { title: string; desc: string }[] };
  apiSection: {
    headline1: string;
    headline2: string;
    desc: string;
    features: string[];
  };
  protocols: string;
  cta: { title: string; subtitle: string; primary: string; secondary: string };
  footer: { tagline: string; product: string; developers: string; company: string; copyright: string };
  seo: { title: string; description: string };
};

const en: Content = {
  nav: { explore: "Explore", rankings: "Rankings", blog: "Blog", docs: "Docs", pricing: "Pricing", signIn: "Sign in", getStarted: "Get Started" },
  hero: {
    badge: "Now supporting MCP, A2A, and Function Calling protocols",
    headline1: "Connect to Global Agent Services in One Go",
    headline2: "Capability auth · Zero re-auth · Free or pay-per-use",
    subtitle1: "One platform to connect agents with the tools they need.",
    subtitle2: "Supports MCP, A2A, and Function Calling protocols.",
    mcpCopy: "npx @imagent/cli add",
    mcpGuide: "Send this to your Agent",
    searchPlaceholder: "Search 10,000+ MCP servers...",
    exploreBtn: "Explore MCP Servers",
    publishBtn: "View Quick Start",
  },
  stats: { servers: "MCP Servers", calls: "API Calls / Month", publishers: "Integrations", uptime: "Uptime SLA" },
  features: {
    title: "Everything agents need, in one place",
    subtitle: "From discovery to payment — a complete infrastructure for the agent-native economy.",
    discover: {
      title: "Discover",
      desc: "Semantic search across thousands of MCP servers. Your agent finds the right tools by capability, not by name. Filter by protocol, trust score, and latency.",
    },
    auth: {
      title: "Authenticate",
      desc: "OAuth 2.0 built for agent-to-tool interactions. Your agent authenticates autonomously — no human in the loop. Scoped permissions, token rotation, and audit logs.",
    },
    monetize: {
      title: "Pay as you go",
      desc: "Only pay for what your agent uses. Every tool call is metered automatically — no subscriptions, no commitments. Transparent pricing with detailed usage dashboards.",
    },
  },
  howItWorks: {
    title: "How it works",
    subtitle: "Three steps to connect your agent to any tool",
    steps: [
      { title: "Find the tools you need", desc: "Search by capability — \"generate PDF\", \"scrape web\", \"send email\" — and Imagent surfaces the best MCP servers ranked by trust score, latency, and price." },
      { title: "Connect in one line", desc: "Add any tool to your agent with a single CLI command. Imagent handles authentication, protocol negotiation, and permission scoping automatically." },
      { title: "Call and pay per use", desc: "Your agent invokes tools through a unified API. Usage is metered in real time, billing is automatic, and you only pay for successful calls." },
    ],
  },
  apiSection: {
    headline1: "Agent-native APIs,",
    headline2: "not human-native ones",
    desc: "Every endpoint is designed for machine consumption. Structured responses, semantic errors, and built-in rate limiting. Your agent reads the spec, not a README.",
    features: [
      "Capability-based search with vector embeddings",
      "OAuth 2.0 + agent identity tokens (AIT)",
      "Automatic protocol adaptation (MCP ↔ A2A ↔ Function Calling)",
      "Real-time usage metering and webhooks",
    ],
  },
  protocols: "Protocol-agnostic infrastructure",
  cta: {
    title: "Build the next agent economy",
    subtitle: "Join thousands of developers connecting their agents to imagent.",
    primary: "Start Building — Free",
    secondary: "Read the Docs",
  },
  footer: { tagline: "The infrastructure layer for AI agents. Discover, authenticate, and pay per use.", product: "Product", developers: "Developers", company: "Company", copyright: "© 2026 imagent. All rights reserved." },
  seo: {
    title: "Imagent — Discover, Authenticate & Use MCP Servers",
    description: "The infrastructure layer for AI agents. Discover MCP servers, authenticate tool calls, and pay per use — all in one platform.",
  },
};

const zh: Content = {
  nav: { explore: "探索", rankings: "排行", blog: "博客", docs: "文档", pricing: "定价", signIn: "登录", getStarted: "免费开始" },
  hero: {
    badge: "现已支持 MCP、A2A 和 Function Calling 协议",
    headline1: "一次连接全球 Agent 服务",
    headline2: "能力认证 · 免重复认证 · 免费/按量计费",
    subtitle1: "一个平台，连接 Agent 与海量工具生态",
    subtitle2: "支持 MCP、A2A、Function Calling 协议",
    mcpCopy: "npx @imagent/cli add",
    mcpGuide: "发送给你的 Agent",
    searchPlaceholder: "搜索 10,000+ MCP Server...",
    exploreBtn: "探索 MCP Server",
    publishBtn: "查看快速开始",
  },
  stats: { servers: "MCP Server", calls: "月 API 调用量", publishers: "可用集成", uptime: "可用性 SLA" },
  features: {
    title: "Agent 所需的一切，一站搞定",
    subtitle: "从发现到支付 — Agent 原生经济的完整基础设施。",
    discover: {
      title: "发现",
      desc: "跨数千个 MCP Server 的语义搜索。你的 Agent 按能力查找工具，而非按名称。支持按协议、信任分数和延迟筛选。",
    },
    auth: {
      title: "认证",
      desc: "专为 Agent 交互设计的 OAuth 2.0。Agent 自主认证 — 无需人工介入。支持作用域权限、令牌轮换和审计日志。",
    },
    monetize: {
      title: "按量付费",
      desc: "只为 Agent 实际使用的工具调用付费。每次调用自动计量 — 无需订阅、无需预付。透明定价，详细用量看板。",
    },
  },
  howItWorks: {
    title: "工作原理",
    subtitle: "三步接入任意工具，从零到上线",
    steps: [
      { title: "找到你需要的工具", desc: "按能力搜索 — \"生成 PDF\"、\"抓取网页\"、\"发送邮件\" — Imagent 按信任分数、延迟和价格为你排序最佳 MCP Server。" },
      { title: "一行命令接入", desc: "一条 CLI 命令即可将任意工具添加到你的 Agent。Imagent 自动处理认证、协议协商和权限配置。" },
      { title: "调用并按次付费", desc: "你的 Agent 通过统一 API 调用工具。用量实时计量，账单自动处理，只为成功调用付费。" },
    ],
  },
  apiSection: {
    headline1: "Agent 原生 API，",
    headline2: "而非人类原生",
    desc: "每个端点都为机器消费而设计。结构化响应、语义化错误、内置限流。你的 Agent 读的是 Spec，不是 README。",
    features: [
      "基于向量嵌入的能力搜索",
      "OAuth 2.0 + Agent 身份令牌 (AIT)",
      "自动协议适配 (MCP ↔ A2A ↔ Function Calling)",
      "实时用量计量与 Webhook",
    ],
  },
  protocols: "协议无关的基础设施",
  cta: {
    title: "构建下一代 Agent 经济",
    subtitle: "加入数千名开发者，将 Agent 接入 imagent 生态。",
    primary: "免费开始构建",
    secondary: "阅读文档",
  },
  footer: { tagline: "AI Agent 的基础设施层。发现、认证、按量付费。", product: "产品", developers: "开发者", company: "公司", copyright: "© 2026 imagent. All rights reserved." },
  seo: {
    title: "Imagent — MCP Server 发现、认证与按量付费平台",
    description: "AI Agent 的基础设施层。发现 MCP Server、认证工具调用、按用量付费 — 一个平台全覆盖。",
  },
};

const contentMap: Record<Locale, Content> = { en, zh };

export function getContent(locale: Locale): Content {
  return contentMap[locale] ?? contentMap.en;
}
