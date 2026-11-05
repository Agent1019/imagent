import { type Locale } from "./config";

type Content = {
  nav: { explore: string; docs: string; pricing: string; signIn: string; getStarted: string };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    subtitle1: string;
    subtitle2: string;
    mcpCopy: string;
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
  nav: { explore: "Explore", docs: "Docs", pricing: "Pricing", signIn: "Sign in", getStarted: "Get Started" },
  hero: {
    badge: "Now supporting MCP, A2A, and Function Calling protocols",
    headline1: "Imagent — Connect your Agent to a vast ecosystem",
    headline2: "Capability auth · Zero re-auth · Free or pay-per-use",
    subtitle1: "One platform to connect agents with the tools they need.",
    subtitle2: "Supports MCP, A2A, and Function Calling protocols.",
    mcpCopy: "npx @imagent/cli add",
    searchPlaceholder: "Search 10,000+ MCP servers...",
    exploreBtn: "Explore MCP Servers",
    publishBtn: "Publish Your Server",
  },
  stats: { servers: "MCP Servers", calls: "API Calls / Month", publishers: "Tool Publishers", uptime: "Uptime SLA" },
  features: {
    title: "Everything agents need, in one place",
    subtitle: "From discovery to payment — a complete infrastructure for the agent-native economy.",
    discover: {
      title: "Discover",
      desc: "Semantic search across thousands of MCP servers. Agents find the right tools by capability, not by name. Filter by protocol, trust score, and latency.",
    },
    auth: {
      title: "Authenticate",
      desc: "OAuth 2.0 built for agent-to-tool interactions. Agents authenticate autonomously — no human in the loop. Scoped permissions, token rotation, and audit logs.",
    },
    monetize: {
      title: "Monetize",
      desc: "Usage-based billing for every tool call. Publishers earn from their MCP servers. Agents pay per invocation with automatic metering and invoicing.",
    },
  },
  howItWorks: {
    title: "How it works",
    subtitle: "Three steps from zero to production",
    steps: [
      { title: "Register your MCP server", desc: "Publish your server with a structured capability manifest. Imagent auto-generates documentation, validates your schema, and makes it discoverable." },
      { title: "Agents discover and authenticate", desc: "Agents search by capability, evaluate trust scores, and authenticate via OAuth — all without human intervention. You define the permission scopes." },
      { title: "Get paid for every call", desc: "Set your pricing model — per-call, tiered, or freemium. Imagent meters usage, handles billing, and deposits earnings to your account." },
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
    subtitle: "Join thousands of publishers and agents building on imagent.",
    primary: "Start Building — Free",
    secondary: "Read the Docs",
  },
  footer: { tagline: "The infrastructure layer for AI agents. Discover, authenticate, and monetize.", product: "Product", developers: "Developers", company: "Company", copyright: "© 2026 imagent. All rights reserved." },
  seo: {
    title: "Imagent — Discover, Authenticate & Monetize MCP Servers",
    description: "The infrastructure layer for AI agents. Discover MCP servers, authenticate tool calls, and monetize usage — all in one platform.",
  },
};

const zh: Content = {
  nav: { explore: "探索", docs: "文档", pricing: "定价", signIn: "登录", getStarted: "免费开始" },
  hero: {
    badge: "现已支持 MCP、A2A 和 Function Calling 协议",
    headline1: "Imagent——为你的Agent，连接海量生态",
    headline2: "能力认证 · 免重复认证 · 免费/按量计费",
    subtitle1: "一个平台，连接 Agent 与海量工具生态",
    subtitle2: "支持 MCP、A2A、Function Calling 协议",
    mcpCopy: "npx @imagent/cli add",
    searchPlaceholder: "搜索 10,000+ MCP Server...",
    exploreBtn: "探索 MCP Server",
    publishBtn: "发布你的 Server",
  },
  stats: { servers: "MCP Server", calls: "月 API 调用量", publishers: "工具发布者", uptime: "可用性 SLA" },
  features: {
    title: "Agent 所需的一切，一站搞定",
    subtitle: "从发现到支付 — Agent 原生经济的完整基础设施。",
    discover: {
      title: "发现",
      desc: "跨数千个 MCP Server 的语义搜索。Agent 按能力查找工具，而非按名称。支持按协议、信任分数和延迟筛选。",
    },
    auth: {
      title: "认证",
      desc: "专为 Agent 间交互设计的 OAuth 2.0。Agent 自主认证 — 无需人工介入。支持作用域权限、令牌轮换和审计日志。",
    },
    monetize: {
      title: "变现",
      desc: "每次工具调用按用量计费。发布者通过 MCP Server 获得收益。Agent 按次付费，自动计量和出账。",
    },
  },
  howItWorks: {
    title: "工作原理",
    subtitle: "从零到上线，只需三步",
    steps: [
      { title: "注册你的 MCP Server", desc: "用结构化能力清单发布你的 Server。Imagent 自动生成文档、验证 Schema、使其可被发现。" },
      { title: "Agent 发现并认证", desc: "Agent 按能力搜索、评估信任分数、通过 OAuth 认证 — 全程无需人工介入。你定义权限范围。" },
      { title: "每次调用都有收益", desc: "设置定价模型 — 按次、阶梯或免费增值。Imagent 计量用量、处理账单、将收益存入你的账户。" },
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
    subtitle: "加入数千个发布者和 Agent，一起构建 imagent 生态。",
    primary: "免费开始构建",
    secondary: "阅读文档",
  },
  footer: { tagline: "AI Agent 的基础设施层。发现、认证、变现。", product: "产品", developers: "开发者", company: "公司", copyright: "© 2026 imagent. All rights reserved." },
  seo: {
    title: "Imagent — MCP Server 发现、认证与变现平台",
    description: "AI Agent 的基础设施层。发现 MCP Server、认证工具调用、按用量计费 — 一个平台全覆盖。",
  },
};

const contentMap: Record<Locale, Content> = { en, zh };

export function getContent(locale: Locale): Content {
  return contentMap[locale] ?? contentMap.en;
}
