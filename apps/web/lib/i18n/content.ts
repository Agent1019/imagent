import { type Locale } from "./config";

type Content = {
  nav: { explore: string; rankings: string; blog: string; community: string; docs: string; pricing: string; signIn: string; getStarted: string };
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
    copyLabel: string;
    copiedLabel: string;
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
  footer: { tagline: string; product: string; developers: string; company: string; copyright: string; explore: string; rankings: string; pricing: string; documentation: string; apiReference: string; blog: string; about: string; careers: string; privacy: string; terms: string };
  explore: {
    title: string; subtitle: string; categories: string; showing: string; inCategory: string;
    noTools: string; viewAll: string; endpoints: string; installs: string; toolsCount: string;
    catLabels: Record<string, string>;
  };
  toolDetail: {
    trustScore: string; terminal: string; copyCmd: string; endpointsTitle: string;
    endpointsDesc: string; pricingTitle: string; pricingDesc: string;
    free: string; pro: string; enterprise: string; perMonth: string; custom: string;
    mostPopular: string; getStarted: string; contactSales: string;
    relatedTitle: string; relatedDesc: string;
    freeFeatures: string[]; proFeatures: string[]; enterpriseFeatures: string[];
    epList: string; epInvoke: string; epHealth: string; epAuth: string;
  };
  rankings: {
    title: string; subtitle: string; mostUsed: string; fastest: string; byCategory: string;
    tool: string; category: string; calls: string; growth: string; status: string;
    hot: string; rising: string; stable: string;
    hotDesc: string; risingDesc: string; stableDesc: string;
    howWeCount: string; dataSources: string; dataSourcesDesc: string;
    callVolume: string; callVolumeDesc: string;
    growthRate: string; growthRateDesc: string;
    statusBadges: string;
    descMostUsed: string; descFastest: string; descByCategory: string;
  };
  seo: { title: string; description: string };
};

const en: Content = {
  nav: { explore: "Explore", rankings: "Rankings", blog: "Blog", community: "Community", docs: "Docs", pricing: "Pricing", signIn: "Sign in", getStarted: "Get Started" },
  hero: {
    badge: "{users} users · {services} services online",
    headline1: "One Conversation, Connect to Global Agent Services",
    headline2: "Capability verified · No re-registration · Up to 50% off",
    subtitle1: "One platform to connect agents with the tools they need.",
    subtitle2: "Supports MCP, A2A, and Function Calling protocols.",
    mcpCopy: "npx @imagent/cli add",
    mcpGuide: "Send this to your Agent",
    searchPlaceholder: "Search 10,000+ MCP servers...",
    exploreBtn: "Explore MCP Servers",
    publishBtn: "Publish Server",
    copyLabel: "Copy",
    copiedLabel: "Copied",
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
    headline1: "Agent-first,",
    headline2: "human-friendly",
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
    title: "Start connecting agent services today",
    subtitle: "Join thousands of developers connecting their agents to imagent.",
    primary: "Start Building — Free",
    secondary: "Read the Docs",
  },
  footer: { tagline: "The infrastructure layer for Agent economy. Discover, authenticate, and pay per call.", product: "Product", developers: "Developers", company: "Company", copyright: "© 2026 imagent. All rights reserved.", explore: "Explore", rankings: "Rankings", pricing: "Pricing", documentation: "Documentation", apiReference: "API Reference", blog: "Blog", about: "About", careers: "Careers", privacy: "Privacy", terms: "Terms" },
  explore: {
    title: "Explore MCP Servers", subtitle: "Browse hundreds of tools built for AI agents. Filter by category to find the capabilities you need.",
    categories: "Categories", showing: "Showing", inCategory: "in",
    noTools: "No tools found in this category.", viewAll: "View all tools",
    endpoints: "endpoints", installs: "installs", toolsCount: "tools",
    catLabels: { All: "All", Search: "Search", Data: "Data", Finance: "Finance", Social: "Social", Communication: "Communication", DevTools: "DevTools", "AI/ML": "AI/ML", Productivity: "Productivity", Media: "Media", "E-commerce": "E-commerce", Jobs: "Jobs", Travel: "Travel", Weather: "Weather", News: "News", Legal: "Legal", Software: "Software", Maps: "Maps", Marketing: "Marketing", Analytics: "Analytics", Trade: "Trade", Agents: "Agents", Other: "Other" },
  },
  toolDetail: {
    trustScore: "Trust Score", terminal: "terminal", copyCmd: "Copy command",
    endpointsTitle: "Endpoints", endpointsDesc: "Available API endpoints for this MCP server.",
    pricingTitle: "Pricing", pricingDesc: "Choose the plan that fits your usage. All plans include core functionality.",
    free: "Free", pro: "Pro", enterprise: "Enterprise", perMonth: "/month", custom: "Custom",
    mostPopular: "Most Popular", getStarted: "Get Started", contactSales: "Contact Sales",
    relatedTitle: "Related Tools", relatedDesc: "Other MCP servers that complement",
    freeFeatures: ["1,000 calls/month", "Community support", "Standard latency", "Basic auth scopes"],
    proFeatures: ["100,000 calls/month", "Priority support", "Low latency routing", "All auth scopes", "Webhook events"],
    enterpriseFeatures: ["Unlimited calls", "Dedicated support", "SLA guarantee", "Custom scopes", "On-premise option", "Audit logs"],
    epList: "List all capabilities and tool functions available on this server.",
    epInvoke: "Invoke a specific tool function with structured parameters.",
    epHealth: "Check server health status, uptime, average latency.",
    epAuth: "Exchange an agent identity token (AIT) for a scoped access token.",
  },
  rankings: {
    title: "Agent Rankings", subtitle: "Track the most popular MCP servers and their usage trends across the Imagent platform.",
    mostUsed: "Most Used", fastest: "Fastest Growing", byCategory: "By Category",
    tool: "Tool", category: "Category", calls: "Calls", growth: "Growth", status: "Status",
    hot: "Hot", rising: "Rising", stable: "Stable",
    hotDesc: "30-day growth rate exceeds 50%", risingDesc: "30-day growth rate between 20-50%", stableDesc: "30-day growth rate below 20%",
    howWeCount: "How We Count", dataSources: "Data Sources", dataSourcesDesc: "Rankings are derived from actual API call records on the Imagent platform.",
    callVolume: "Call Volume", callVolumeDesc: "Each successful invocation counts as one call. Failed calls and retries are excluded.",
    growthRate: "Growth Rate", growthRateDesc: "Growth rate is the percentage change in call volume compared to the previous period of equal length.",
    statusBadges: "Status Badges",
    descMostUsed: "Ranked by API calls in the last 30 days",
    descFastest: "Ranked by 30-day growth rate",
    descByCategory: "Top tool in each category by usage",
  },
  seo: {
    title: "Imagent — Discover, Authenticate & Use MCP Servers",
    description: "The infrastructure layer for AI agents. Discover MCP servers, authenticate tool calls, and pay per use — all in one platform.",
  },
};

const zh: Content = {
  nav: { explore: "探索", rankings: "排行", blog: "博客", community: "社区", docs: "文档", pricing: "定价", signIn: "登录", getStarted: "免费开始" },
  hero: {
    badge: "{users} 用户 · {services} 个服务在线",
    headline1: "一次对话 连接全球 Agent 服务",
    headline2: "能力验证 · 免重复注册 · 最高优惠50%",
    subtitle1: "一个平台，连接 Agent 与海量工具生态",
    subtitle2: "支持 MCP、A2A、Function Calling 协议",
    mcpCopy: "npx @imagent/cli add",
    mcpGuide: "发送给你的 Agent",
    searchPlaceholder: "搜索 10,000+ MCP Server...",
    exploreBtn: "探索 MCP Server",
    publishBtn: "发布 Server",
    copyLabel: "复制",
    copiedLabel: "已复制",
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
    headline1: "先为 Agent 而生，",
    headline2: "再为人",
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
    title: "立即开始连接 Agent 服务",
    subtitle: "加入数千名开发者，将 Agent 接入 imagent 生态。",
    primary: "免费开始构建",
    secondary: "阅读文档",
  },
  footer: { tagline: "Agent 经济的基础设施层，一站式实现 agent 发现、认证、调用付费。", product: "产品", developers: "开发者", company: "公司", copyright: "© 2026 imagent. All rights reserved.", explore: "探索", rankings: "排名", pricing: "定价", documentation: "文档", apiReference: "API 参考", blog: "博客", about: "关于", careers: "招聘", privacy: "隐私政策", terms: "服务条款" },
  explore: {
    title: "探索 MCP Server", subtitle: "浏览数百个为 AI Agent 构建的工具。按类别筛选，找到你需要的能力。",
    categories: "分类", showing: "显示", inCategory: "分类：",
    noTools: "该分类下暂无工具", viewAll: "查看全部工具",
    endpoints: "个端点", installs: "安装", toolsCount: "个工具",
    catLabels: { All: "全部", Search: "搜索", Data: "数据", Finance: "金融", Social: "社交", Communication: "通讯", DevTools: "开发工具", "AI/ML": "AI/ML", Productivity: "生产力", Media: "媒体", "E-commerce": "电商", Jobs: "招聘", Travel: "出行", Weather: "天气", News: "新闻", Legal: "法律", Software: "软件", Maps: "地图", Marketing: "营销", Analytics: "分析", Trade: "贸易", Agents: "Agent", Other: "其他" },
  },
  toolDetail: {
    trustScore: "信任分", terminal: "终端", copyCmd: "复制命令",
    endpointsTitle: "端点", endpointsDesc: "该 MCP Server 可用的 API 端点。",
    pricingTitle: "定价", pricingDesc: "选择适合你使用量的方案，所有方案均包含核心功能。",
    free: "免费", pro: "专业版", enterprise: "企业版", perMonth: "/月", custom: "定制",
    mostPopular: "最受欢迎", getStarted: "免费开始", contactSales: "联系销售",
    relatedTitle: "相关工具", relatedDesc: "与之互补的其他 MCP Server",
    freeFeatures: ["1,000 次调用/月", "社区支持", "标准延迟", "基础认证范围"],
    proFeatures: ["100,000 次调用/月", "优先支持", "低延迟路由", "全部认证范围", "Webhook 事件"],
    enterpriseFeatures: ["无限调用", "专属支持", "SLA 保障", "自定义范围", "私有化部署", "审计日志"],
    epList: "列出该服务器上所有可用的能力和工具函数。",
    epInvoke: "使用结构化参数调用特定的工具函数。",
    epHealth: "检查服务器健康状态、正常运行时间和平均延迟。",
    epAuth: "将 Agent 身份令牌（AIT）换取有限范围的访问令牌。",
  },
  rankings: {
    title: "Agent 工具排行榜", subtitle: "追踪 Imagent 平台上最热门的 MCP Server 及其使用趋势。",
    mostUsed: "最多使用", fastest: "增长最快", byCategory: "分类排行",
    tool: "工具", category: "分类", calls: "调用量", growth: "增长率", status: "状态",
    hot: "热门", rising: "上升", stable: "稳定",
    hotDesc: "30 天增长率 > 50%", risingDesc: "30 天增长率 20%-50%", stableDesc: "30 天增长率 < 20%",
    howWeCount: "计数方法", dataSources: "数据来源", dataSourcesDesc: "排名数据来自 Imagent 平台的实际 API 调用记录。",
    callVolume: "调用量统计", callVolumeDesc: "每次成功调用计数为一次，失败调用和重试不计入。",
    growthRate: "增长率计算", growthRateDesc: "增长率为当前周期调用量相对上一个同等长度周期的百分比变化。",
    statusBadges: "状态标签",
    descMostUsed: "按 30 天内 API 调用量排名",
    descFastest: "按 30 天增长率排名",
    descByCategory: "各分类下使用量最高的工具",
  },
  seo: {
    title: "Imagent — MCP Server 发现、认证与按量付费平台",
    description: "AI Agent 的基础设施层。发现 MCP Server、认证工具调用、按用量付费 — 一个平台全覆盖。",
  },
};

const contentMap: Record<Locale, Content> = { en, zh };

export function getContent(locale: Locale): Content {
  return contentMap[locale] ?? contentMap.en;
}
