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
  integration: {
    title: string;
    subtitle: string;
    skill: { title: string; desc: string };
    mcp: { title: string; desc: string };
    cli: { title: string; desc: string };
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  cta: { title: string; subtitle: string; primary: string; primaryHref: string; secondary: string };
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
    tabTools: string; tabComments: string; tabChangelog: string;
    availableTools: string; toolsDesc: string;
    install: string; refresh: string; share: string; copy: string; copied: string;
    installCli: string; installMcp: string; installJson: string; installSkill: string;
    recommended: string; httpLabel: string; manual: string; oneLiner: string;
    remoteService: string; remoteServiceDesc: string;
    tags: string; links: string;
    githubRepo: string; documentation: string; homepage: string; reportIssue: string;
    version: string; installs: string; category: string; protocol: string; license: string;
    latest: string;
    installConfig: string; viewDetails: string; tabInstall: string; tabPublish: string;
    iamAgent: string; iamHuman: string; agentPromptHint: string; agentPromptLabel: string; copyPrompt: string;
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
    searchPlaceholder: "Search servers you need...",
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
  integration: {
    title: "Three ways to connect",
    subtitle: "Same registry, same balance, whichever your agent speaks.",
    skill: { title: "Skill", desc: "One line into your agent's chat." },
    mcp: { title: "MCP", desc: "Add the remote MCP server. No install, no key." },
    cli: { title: "CLI", desc: "Install and run from your terminal." },
  },
  faq: {
    title: "Common questions",
    items: [
      { q: "Do I need API keys for each provider?", a: "No. Imagent handles authentication for you. One identity token covers every tool in the registry." },
      { q: "How is pricing structured?", a: "Pay per call. Each tool publishes its own per-call price, and you are billed exactly that amount from a single balance." },
      { q: "A provider failed. Do I get charged?", a: "No. Failed calls are not billed. You only pay for successful responses." },
      { q: "Which agent frameworks are supported?", a: "Any framework that supports MCP, A2A, or function calling. Works with LangChain, CrewAI, AutoGen, and custom agents." },
      { q: "What about rate limits?", a: "Each tool defines its own rate limits. Imagent enforces them transparently and queues overflow requests." },
    ],
  },
  cta: {
    title: "Publish your Agent & Tools",
    subtitle: "Imagent is open source. Contribute your tool or start building — let's build the Agent economy together.",
    primary: "Join GitHub Project",
    primaryHref: "https://github.com/Agent1019/imagent",
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
    tabTools: "Tools", tabComments: "Comments", tabChangelog: "Changelog",
    availableTools: "Available Tools", toolsDesc: "tools that your agent can invoke.",
    install: "Install", refresh: "Refresh", share: "Share", copy: "Copy", copied: "Copied!",
    installCli: "CLI", installMcp: "MCP Server", installJson: "JSON Config", installSkill: "Skill",
    recommended: "Recommended", httpLabel: "HTTP", manual: "Manual", oneLiner: "One-liner",
    remoteService: "Remote Service", remoteServiceDesc: "This tool runs remotely on the provider's infrastructure. No local installation or setup required.",
    tags: "Tags", links: "Links",
    githubRepo: "GitHub Repository", documentation: "Documentation", homepage: "Homepage", reportIssue: "Report Issue",
    version: "Version", installs: "Installs", category: "Category", protocol: "Protocol", license: "License",
    latest: "Latest",
    installConfig: "Installation", viewDetails: "View Details",
    tabInstall: "Install", tabPublish: "Publish",
    iamAgent: "I am Agent", iamHuman: "I am Human",
    agentPromptHint: "Send this prompt to your Agent to install this MCP Server",
    agentPromptLabel: "Agent prompt",
    copyPrompt: "Copy Prompt",
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
    searchPlaceholder: "搜索你需要的 Servers",
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
    headline2: "再为人服务",
    desc: "每个端点都为机器消费而设计。结构化响应、语义化错误、内置限流。你的 Agent 读的是 Spec，不是 README。",
    features: [
      "基于向量嵌入的能力搜索",
      "OAuth 2.0 + Agent 身份令牌 (AIT)",
      "自动协议适配 (MCP ↔ A2A ↔ Function Calling)",
      "实时用量计量与 Webhook",
    ],
  },
  protocols: "协议无关的基础设施",
  integration: {
    title: "三种接入方式",
    subtitle: "同一注册表、同一余额，你的 Agent 用哪种协议都行。",
    skill: { title: "Skill", desc: "一行命令接入 Agent 对话。" },
    mcp: { title: "MCP", desc: "添加远程 MCP Server，无需安装和密钥。" },
    cli: { title: "CLI", desc: "在终端中安装运行。" },
  },
  faq: {
    title: "常见问题",
    items: [
      { q: "每个服务商都需要单独的 API Key 吗？", a: "不需要。Imagent 统一处理认证，一个身份令牌覆盖注册表中的所有工具。" },
      { q: "定价模式是怎样的？", a: "按调用付费。每个工具公布自己的单价，从统一余额中精确扣费。" },
      { q: "服务商调用失败了会收费吗？", a: "不会。失败的调用不计费，只为成功的响应付费。" },
      { q: "支持哪些 Agent 框架？", a: "任何支持 MCP、A2A 或 Function Calling 的框架。兼容 LangChain、CrewAI、AutoGen 和自定义 Agent。" },
      { q: "速率限制怎么处理？", a: "每个工具自定义速率限制，Imagent 透明执行并自动排队溢出请求。" },
    ],
  },
  cta: {
    title: "发布你的 Agent & Tools",
    subtitle: "Imagent 社区开源开放，贡献你的工具或开始构建，让我们一起构建 Agent 经济。",
    primary: "参与 GitHub 项目",
    primaryHref: "https://github.com/Agent1019/imagent",
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
    tabTools: "工具", tabComments: "评论", tabChangelog: "更新日志",
    availableTools: "可用工具", toolsDesc: "个工具可供你的 Agent 调用。",
    install: "安装", refresh: "刷新", share: "分享", copy: "复制", copied: "已复制！",
    installCli: "CLI", installMcp: "MCP Server", installJson: "JSON 配置", installSkill: "Skill",
    recommended: "推荐", httpLabel: "HTTP", manual: "手动", oneLiner: "一行命令",
    remoteService: "远程服务", remoteServiceDesc: "该工具在提供商的基础设施上远程运行，无需本地安装或配置。",
    tags: "标签", links: "链接",
    githubRepo: "GitHub 仓库", documentation: "文档", homepage: "主页", reportIssue: "报告问题",
    version: "版本", installs: "安装量", category: "分类", protocol: "协议", license: "许可证",
    latest: "最新",
    installConfig: "安装配置", viewDetails: "查看详情",
    tabInstall: "安装", tabPublish: "发布",
    iamAgent: "我是 Agent", iamHuman: "我是 Human",
    agentPromptHint: "将此提示发送给您的 Agent 以安装该 MCP Server",
    agentPromptLabel: "Agent prompt",
    copyPrompt: "复制 Prompt",
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

const ko: Content = {
  nav: { explore: "탐색", rankings: "랭킹", blog: "블로그", community: "커뮤니티", docs: "문서", pricing: "요금제", signIn: "로그인", getStarted: "시작하기" },
  hero: {
    badge: "{users} 사용자 · {services} 서비스 온라인",
    headline1: "대화 한 번으로 글로벌 에이전트 서비스에 연결",
    headline2: "기능 검증 · 재등록 불필요 · 최대 50% 할인",
    subtitle1: "에이전트와 필요한 도구를 연결하는 하나의 플랫폼.",
    subtitle2: "MCP, A2A, Function Calling 프로토콜 지원.",
    mcpCopy: "npx @imagent/cli add",
    mcpGuide: "에이전트에게 전송하세요",
    searchPlaceholder: "필요한 서버를 검색하세요...",
    exploreBtn: "MCP 서버 탐색",
    publishBtn: "서버 게시",
    copyLabel: "복사",
    copiedLabel: "복사됨",
  },
  stats: { servers: "MCP 서버", calls: "월 API 호출 수", publishers: "연동 수", uptime: "가용성 SLA" },
  features: {
    title: "에이전트에 필요한 모든 것을 한 곳에서",
    subtitle: "발견부터 결제까지 — 에이전트 네이티브 경제를 위한 완전한 인프라.",
    discover: {
      title: "발견",
      desc: "수천 개의 MCP 서버를 의미 기반으로 검색합니다. 에이전트가 이름이 아닌 기능으로 적절한 도구를 찾습니다. 프로토콜, 신뢰 점수, 지연 시간으로 필터링하세요.",
    },
    auth: {
      title: "인증",
      desc: "에이전트-도구 간 상호작용을 위해 설계된 OAuth 2.0. 에이전트가 자율적으로 인증합니다 — 사람이 개입할 필요 없습니다. 범위 기반 권한, 토큰 로테이션, 감사 로그를 지원합니다.",
    },
    monetize: {
      title: "종량제",
      desc: "에이전트가 사용한 만큼만 결제하세요. 모든 도구 호출이 자동으로 측정됩니다 — 구독 없이, 약정 없이. 투명한 요금제와 상세 사용량 대시보드를 제공합니다.",
    },
  },
  howItWorks: {
    title: "이용 방법",
    subtitle: "에이전트를 모든 도구에 연결하는 세 단계",
    steps: [
      { title: "필요한 도구 찾기", desc: "기능으로 검색하세요 — \"PDF 생성\", \"웹 스크래핑\", \"이메일 전송\" — Imagent가 신뢰 점수, 지연 시간, 가격순으로 최적의 MCP 서버를 보여줍니다." },
      { title: "한 줄로 연결", desc: "단일 CLI 명령어로 에이전트에 도구를 추가하세요. Imagent가 인증, 프로토콜 협상, 권한 범위를 자동으로 처리합니다." },
      { title: "호출하고 사용량만큼 결제", desc: "에이전트가 통합 API를 통해 도구를 호출합니다. 사용량은 실시간으로 측정되며, 결제는 자동으로 이루어지고, 성공한 호출에 대해서만 요금이 부과됩니다." },
    ],
  },
  apiSection: {
    headline1: "에이전트 우선,",
    headline2: "사람에게도 편리하게",
    desc: "모든 엔드포인트는 머신 소비를 위해 설계되었습니다. 구조화된 응답, 의미적 오류, 내장된 속도 제한. 에이전트는 README가 아닌 스펙을 읽습니다.",
    features: [
      "벡터 임베딩 기반 기능 검색",
      "OAuth 2.0 + 에이전트 식별 토큰 (AIT)",
      "자동 프로토콜 변환 (MCP ↔ A2A ↔ Function Calling)",
      "실시간 사용량 측정 및 Webhook",
    ],
  },
  protocols: "프로토콜 무관 인프라",
  integration: {
    title: "세 가지 연결 방법",
    subtitle: "동일한 레지스트리, 동일한 잔액 — 에이전트가 사용하는 프로토콜에 관계없이.",
    skill: { title: "Skill", desc: "에이전트 채팅에 한 줄로 입력." },
    mcp: { title: "MCP", desc: "원격 MCP 서버를 추가하세요. 설치 없이, 키 없이." },
    cli: { title: "CLI", desc: "터미널에서 설치하고 실행하세요." },
  },
  faq: {
    title: "자주 묻는 질문",
    items: [
      { q: "각 제공업체별로 API 키가 필요한가요?", a: "아니요. Imagent가 인증을 대신 처리합니다. 하나의 식별 토큰으로 레지스트리의 모든 도구를 사용할 수 있습니다." },
      { q: "요금 체계는 어떻게 되나요?", a: "호출당 과금입니다. 각 도구가 호출당 요금을 공개하며, 단일 잔액에서 정확한 금액이 차감됩니다." },
      { q: "제공업체 호출이 실패하면 요금이 부과되나요?", a: "아니요. 실패한 호출은 요금이 부과되지 않습니다. 성공한 응답에 대해서만 결제합니다." },
      { q: "어떤 에이전트 프레임워크를 지원하나요?", a: "MCP, A2A 또는 Function Calling을 지원하는 모든 프레임워크. LangChain, CrewAI, AutoGen 및 커스텀 에이전트와 호환됩니다." },
      { q: "속도 제한은 어떻게 처리되나요?", a: "각 도구가 자체 속도 제한을 정의합니다. Imagent가 이를 투명하게 적용하고 초과 요청을 큐에 대기시킵니다." },
    ],
  },
  cta: {
    title: "에이전트 & 도구를 게시하세요",
    subtitle: "Imagent는 오픈소스입니다. 도구를 기여하거나 빌드를 시작하세요 — 함께 에이전트 경제를 만들어 갑시다.",
    primary: "GitHub 프로젝트 참여",
    primaryHref: "https://github.com/Agent1019/imagent",
    secondary: "문서 읽기",
  },
  footer: { tagline: "에이전트 경제를 위한 인프라 레이어. 발견, 인증, 호출당 결제를 한 곳에서.", product: "제품", developers: "개발자", company: "회사", copyright: "© 2026 imagent. All rights reserved.", explore: "탐색", rankings: "랭킹", pricing: "요금제", documentation: "문서", apiReference: "API 레퍼런스", blog: "블로그", about: "소개", careers: "채용", privacy: "개인정보처리방침", terms: "이용약관" },
  explore: {
    title: "MCP 서버 탐색", subtitle: "AI 에이전트를 위해 구축된 수백 개의 도구를 둘러보세요. 카테고리별로 필터링하여 필요한 기능을 찾아보세요.",
    categories: "카테고리", showing: "표시 중", inCategory: "내",
    noTools: "이 카테고리에서 도구를 찾을 수 없습니다.", viewAll: "모든 도구 보기",
    endpoints: "엔드포인트", installs: "설치", toolsCount: "도구",
    catLabels: { All: "전체", Search: "검색", Data: "데이터", Finance: "금융", Social: "소셜", Communication: "커뮤니케이션", DevTools: "개발 도구", "AI/ML": "AI/ML", Productivity: "생산성", Media: "미디어", "E-commerce": "전자상거래", Jobs: "채용", Travel: "여행", Weather: "날씨", News: "뉴스", Legal: "법률", Software: "소프트웨어", Maps: "지도", Marketing: "마케팅", Analytics: "분석", Trade: "무역", Agents: "에이전트", Other: "기타" },
  },
  toolDetail: {
    trustScore: "신뢰 점수", terminal: "터미널", copyCmd: "명령 복사",
    endpointsTitle: "엔드포인트", endpointsDesc: "이 MCP 서버에서 사용 가능한 API 엔드포인트입니다.",
    pricingTitle: "요금제", pricingDesc: "사용량에 맞는 요금제를 선택하세요. 모든 요금제에 핵심 기능이 포함되어 있습니다.",
    free: "무료", pro: "프로", enterprise: "엔터프라이즈", perMonth: "/월", custom: "맞춤",
    mostPopular: "가장 인기 있는", getStarted: "시작하기", contactSales: "영업팀 문의",
    relatedTitle: "관련 도구", relatedDesc: "다음과 보완되는 다른 MCP 서버",
    freeFeatures: ["월 1,000회 호출", "커뮤니티 지원", "표준 지연 시간", "기본 인증 범위"],
    proFeatures: ["월 100,000회 호출", "우선 지원", "저지연 라우팅", "모든 인증 범위", "Webhook 이벤트"],
    enterpriseFeatures: ["무제한 호출", "전담 지원", "SLA 보장", "맞춤 범위", "온프레미스 옵션", "감사 로그"],
    epList: "이 서버에서 사용 가능한 모든 기능 및 도구 함수를 나열합니다.",
    epInvoke: "구조화된 파라미터로 특정 도구 함수를 호출합니다.",
    epHealth: "서버 상태, 가동 시간, 평균 지연 시간을 확인합니다.",
    epAuth: "에이전트 식별 토큰(AIT)을 범위 지정 액세스 토큰으로 교환합니다.",
    tabTools: "도구", tabComments: "댓글", tabChangelog: "변경日志",
    availableTools: "사용 가능한 도구", toolsDesc: "개의 도구를 Agent가 호출할 수 있습니다.",
    install: "설치", refresh: "새로고침", share: "공유", copy: "복사", copied: "복사됨!",
    installCli: "CLI", installMcp: "MCP Server", installJson: "JSON 설정", installSkill: "Skill",
    recommended: "권장", httpLabel: "HTTP", manual: "수동", oneLiner: "한 줄 명령",
    remoteService: "원격 서비스", remoteServiceDesc: "이 도구는 제공자의 인프라에서 원격으로 실행됩니다. 로컬 설치나 설정이 필요 없습니다.",
    tags: "태그", links: "링크",
    githubRepo: "GitHub 저장소", documentation: "문서", homepage: "홈페이지", reportIssue: "문제 신고",
    version: "버전", installs: "설치 수", category: "카테고리", protocol: "프로토콜", license: "라이선스",
    latest: "최신",
    installConfig: "설치 구성", viewDetails: "세부 정보",
    tabInstall: "설치", tabPublish: "게시",
    iamAgent: "나는 Agent", iamHuman: "나는 Human",
    agentPromptHint: "이 프롬프트를 Agent에게 전송하여 MCP 서버를 설치하세요",
    agentPromptLabel: "Agent prompt",
    copyPrompt: "프롬프트 복사",
  },
  rankings: {
    title: "에이전트 랭킹", subtitle: "Imagent 플랫폼에서 가장 인기 있는 MCP 서버와 사용량 추이를 확인하세요.",
    mostUsed: "가장 많이 사용된", fastest: "가장 빠르게 성장하는", byCategory: "카테고리별",
    tool: "도구", category: "카테고리", calls: "호출 수", growth: "성장률", status: "상태",
    hot: "인기", rising: "상승", stable: "안정",
    hotDesc: "30일 성장률 50% 초과", risingDesc: "30일 성장률 20~50%", stableDesc: "30일 성장률 20% 미만",
    howWeCount: "집계 방법", dataSources: "데이터 소스", dataSourcesDesc: "랭킹은 Imagent 플랫폼의 실제 API 호출 기록을 기반으로 합니다.",
    callVolume: "호출량", callVolumeDesc: "성공한 호출 하나를 1회로 집계합니다. 실패한 호출과 재시도는 제외됩니다.",
    growthRate: "성장률", growthRateDesc: "성장률은 직전 동일 기간 대비 호출량의 백분율 변화입니다.",
    statusBadges: "상태 배지",
    descMostUsed: "최근 30일 API 호출 수 기준 랭킹",
    descFastest: "30일 성장률 기준 랭킹",
    descByCategory: "각 카테고리에서 사용량이 가장 높은 도구",
  },
  seo: {
    title: "Imagent — MCP 서버 발견, 인증 및 종량제 플랫폼",
    description: "AI 에이전트를 위한 인프라 레이어. MCP 서버를 발견하고, 도구 호출을 인증하고, 사용한 만큼만 결제하세요 — 하나의 플랫폼에서 모두 해결.",
  },
};

const pt: Content = {
  nav: { explore: "Explorar", rankings: "Rankings", blog: "Blog", community: "Comunidade", docs: "Docs", pricing: "Preços", signIn: "Entrar", getStarted: "Começar" },
  hero: {
    badge: "{users} usuários · {services} serviços online",
    headline1: "Uma Conversa, Conecte-se a Serviços de Agentes Globais",
    headline2: "Capacidade verificada · Sem recadastro · Até 50% de desconto",
    subtitle1: "Uma plataforma para conectar agentes às ferramentas que precisam.",
    subtitle2: "Suporta os protocolos MCP, A2A e Function Calling.",
    mcpCopy: "npx @imagent/cli add",
    mcpGuide: "Envie isso para o seu Agente",
    searchPlaceholder: "Busque os servers que você precisa...",
    exploreBtn: "Explorar MCP Servers",
    publishBtn: "Publicar Server",
    copyLabel: "Copiar",
    copiedLabel: "Copiado",
  },
  stats: { servers: "MCP Servers", calls: "Chamadas API / Mês", publishers: "Integrações", uptime: "SLA de Disponibilidade" },
  features: {
    title: "Tudo que os agentes precisam, em um só lugar",
    subtitle: "Da descoberta ao pagamento — uma infraestrutura completa para a economia nativa de agentes.",
    discover: {
      title: "Descobrir",
      desc: "Busca semântica em milhares de MCP Servers. Seu agente encontra as ferramentas certas por capacidade, não por nome. Filtre por protocolo, pontuação de confiança e latência.",
    },
    auth: {
      title: "Autenticar",
      desc: "OAuth 2.0 desenvolvido para interações agente-ferramenta. Seu agente se autentica de forma autônoma — sem intervenção humana. Permissões com escopo, rotação de tokens e logs de auditoria.",
    },
    monetize: {
      title: "Pague pelo uso",
      desc: "Pague apenas pelo que seu agente utiliza. Cada chamada de ferramenta é medida automaticamente — sem assinaturas, sem compromissos. Preços transparentes com painéis detalhados de uso.",
    },
  },
  howItWorks: {
    title: "Como funciona",
    subtitle: "Três passos para conectar seu agente a qualquer ferramenta",
    steps: [
      { title: "Encontre as ferramentas que você precisa", desc: "Busque por capacidade — \"gerar PDF\", \"raspar web\", \"enviar e-mail\" — e o Imagent apresenta os melhores MCP Servers classificados por pontuação de confiança, latência e preço." },
      { title: "Conecte em uma linha", desc: "Adicione qualquer ferramenta ao seu agente com um único comando CLI. O Imagent cuida da autenticação, negociação de protocolo e definição de permissões automaticamente." },
      { title: "Chame e pague por uso", desc: "Seu agente invoca ferramentas através de uma API unificada. O uso é medido em tempo real, a cobrança é automática e você paga apenas pelas chamadas bem-sucedidas." },
    ],
  },
  apiSection: {
    headline1: "Primeiro para agentes,",
    headline2: "amigável para humanos",
    desc: "Cada endpoint é projetado para consumo por máquinas. Respostas estruturadas, erros semânticos e limitação de taxa integrada. Seu agente lê a especificação, não um README.",
    features: [
      "Busca baseada em capacidades com embeddings vetoriais",
      "OAuth 2.0 + tokens de identidade de agente (AIT)",
      "Adaptação automática de protocolo (MCP ↔ A2A ↔ Function Calling)",
      "Medição de uso em tempo real e webhooks",
    ],
  },
  protocols: "Infraestrutura independente de protocolo",
  integration: {
    title: "Três formas de conectar",
    subtitle: "Mesmo registro, mesmo saldo, qualquer que seja o protocolo do seu agente.",
    skill: { title: "Skill", desc: "Uma linha no chat do seu agente." },
    mcp: { title: "MCP", desc: "Adicione o MCP Server remoto. Sem instalação, sem chave." },
    cli: { title: "CLI", desc: "Instale e execute pelo terminal." },
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      { q: "Preciso de API keys para cada provedor?", a: "Não. O Imagent cuida da autenticação para você. Um único token de identidade cobre todas as ferramentas do registro." },
      { q: "Como funciona a estrutura de preços?", a: "Pague por chamada. Cada ferramenta publica seu próprio preço por chamada, e você é cobrado exatamente esse valor de um único saldo." },
      { q: "Um provedor falhou. Serei cobrado?", a: "Não. Chamadas com falha não são cobradas. Você paga apenas pelas respostas bem-sucedidas." },
      { q: "Quais frameworks de agentes são suportados?", a: "Qualquer framework que suporte MCP, A2A ou function calling. Funciona com LangChain, CrewAI, AutoGen e agentes personalizados." },
      { q: "E quanto aos limites de taxa?", a: "Cada ferramenta define seus próprios limites de taxa. O Imagent os aplica de forma transparente e coloca as requisições excedentes em fila." },
    ],
  },
  cta: {
    title: "Publique seu Agente & Ferramentas",
    subtitle: "Imagent é open source. Contribua com sua ferramenta ou comece a construir — vamos construir a economia de Agentes juntos.",
    primary: "Participar no GitHub",
    primaryHref: "https://github.com/Agent1019/imagent",
    secondary: "Ler a Documentação",
  },
  footer: { tagline: "A camada de infraestrutura para a economia de Agentes. Descubra, autentique e pague por chamada.", product: "Produto", developers: "Desenvolvedores", company: "Empresa", copyright: "© 2026 imagent. All rights reserved.", explore: "Explorar", rankings: "Rankings", pricing: "Preços", documentation: "Documentação", apiReference: "Referência API", blog: "Blog", about: "Sobre", careers: "Carreiras", privacy: "Privacidade", terms: "Termos" },
  explore: {
    title: "Explorar MCP Servers", subtitle: "Navegue por centenas de ferramentas desenvolvidas para agentes de IA. Filtre por categoria para encontrar as capacidades que você precisa.",
    categories: "Categorias", showing: "Mostrando", inCategory: "em",
    noTools: "Nenhuma ferramenta encontrada nesta categoria.", viewAll: "Ver todas as ferramentas",
    endpoints: "endpoints", installs: "instalações", toolsCount: "ferramentas",
    catLabels: { All: "Todos", Search: "Busca", Data: "Dados", Finance: "Finanças", Social: "Social", Communication: "Comunicação", DevTools: "Ferramentas Dev", "AI/ML": "AI/ML", Productivity: "Produtividade", Media: "Mídia", "E-commerce": "E-commerce", Jobs: "Vagas", Travel: "Viagem", Weather: "Clima", News: "Notícias", Legal: "Jurídico", Software: "Software", Maps: "Mapas", Marketing: "Marketing", Analytics: "Análise", Trade: "Comércio", Agents: "Agentes", Other: "Outros" },
  },
  toolDetail: {
    trustScore: "Pontuação de Confiança", terminal: "terminal", copyCmd: "Copiar comando",
    endpointsTitle: "Endpoints", endpointsDesc: "Endpoints API disponíveis para este MCP Server.",
    pricingTitle: "Preços", pricingDesc: "Escolha o plano adequado ao seu uso. Todos os planos incluem a funcionalidade principal.",
    free: "Grátis", pro: "Pro", enterprise: "Empresarial", perMonth: "/mês", custom: "Personalizado",
    mostPopular: "Mais Popular", getStarted: "Começar", contactSales: "Falar com Vendas",
    relatedTitle: "Ferramentas Relacionadas", relatedDesc: "Outros MCP Servers que complementam",
    freeFeatures: ["1.000 chamadas/mês", "Suporte da comunidade", "Latência padrão", "Escopos de autenticação básicos"],
    proFeatures: ["100.000 chamadas/mês", "Suporte prioritário", "Roteamento de baixa latência", "Todos os escopos de autenticação", "Eventos Webhook"],
    enterpriseFeatures: ["Chamadas ilimitadas", "Suporte dedicado", "Garantia SLA", "Escopos personalizados", "Opção on-premise", "Logs de auditoria"],
    epList: "Liste todas as capacidades e funções de ferramentas disponíveis neste server.",
    epInvoke: "Invoque uma função de ferramenta específica com parâmetros estruturados.",
    epHealth: "Verifique o status de saúde do server, disponibilidade e latência média.",
    epAuth: "Troque um token de identidade de agente (AIT) por um token de acesso com escopo.",
    tabTools: "Tools", tabComments: "Comments", tabChangelog: "Changelog",
    availableTools: "Available Tools", toolsDesc: "tools that your agent can invoke.",
    install: "Install", refresh: "Refresh", share: "Share", copy: "Copy", copied: "Copied!",
    installCli: "CLI", installMcp: "MCP Server", installJson: "JSON Config", installSkill: "Skill",
    recommended: "Recommended", httpLabel: "HTTP", manual: "Manual", oneLiner: "One-liner",
    remoteService: "Remote Service", remoteServiceDesc: "This tool runs remotely on the provider's infrastructure. No local installation or setup required.",
    tags: "Tags", links: "Links",
    githubRepo: "GitHub Repository", documentation: "Documentation", homepage: "Homepage", reportIssue: "Report Issue",
    version: "Version", installs: "Installs", category: "Category", protocol: "Protocol", license: "License",
    latest: "Latest",
    installConfig: "Instalação", viewDetails: "Ver detalhes",
    tabInstall: "Instalar", tabPublish: "Publicar",
    iamAgent: "Sou Agent", iamHuman: "Sou Human",
    agentPromptHint: "Envie este prompt ao seu Agent para instalar este MCP Server",
    agentPromptLabel: "Agent prompt",
    copyPrompt: "Copiar Prompt",
  },
  rankings: {
    title: "Rankings de Agentes", subtitle: "Acompanhe os MCP Servers mais populares e suas tendências de uso na plataforma Imagent.",
    mostUsed: "Mais Usados", fastest: "Crescimento Mais Rápido", byCategory: "Por Categoria",
    tool: "Ferramenta", category: "Categoria", calls: "Chamadas", growth: "Crescimento", status: "Status",
    hot: "Em Alta", rising: "Em Ascensão", stable: "Estável",
    hotDesc: "Taxa de crescimento em 30 dias acima de 50%", risingDesc: "Taxa de crescimento em 30 dias entre 20-50%", stableDesc: "Taxa de crescimento em 30 dias abaixo de 20%",
    howWeCount: "Como Contamos", dataSources: "Fontes de Dados", dataSourcesDesc: "Os rankings são derivados dos registros reais de chamadas API na plataforma Imagent.",
    callVolume: "Volume de Chamadas", callVolumeDesc: "Cada invocação bem-sucedida conta como uma chamada. Chamadas com falha e retentativas são excluídas.",
    growthRate: "Taxa de Crescimento", growthRateDesc: "A taxa de crescimento é a variação percentual no volume de chamadas em relação ao período anterior de mesma duração.",
    statusBadges: "Selos de Status",
    descMostUsed: "Classificados por chamadas API nos últimos 30 dias",
    descFastest: "Classificados pela taxa de crescimento em 30 dias",
    descByCategory: "A principal ferramenta em cada categoria por uso",
  },
  seo: {
    title: "Imagent — Descubra, Autentique e Use MCP Servers",
    description: "A camada de infraestrutura para agentes de IA. Descubra MCP Servers, autentique chamadas de ferramentas e pague pelo uso — tudo em uma única plataforma.",
  },
};

const it: Content = {
  nav: { explore: "Esplora", rankings: "Classifiche", blog: "Blog", community: "Community", docs: "Docs", pricing: "Prezzi", signIn: "Accedi", getStarted: "Inizia" },
  hero: {
    badge: "{users} utenti · {services} servizi online",
    headline1: "Una Conversazione, Connettiti ai Servizi Agent Globali",
    headline2: "Capacità verificate · Nessuna ri-registrazione · Fino al 50% di sconto",
    subtitle1: "Un'unica piattaforma per connettere gli agent con gli strumenti di cui hanno bisogno.",
    subtitle2: "Supporta i protocolli MCP, A2A e Function Calling.",
    mcpCopy: "npx @imagent/cli add",
    mcpGuide: "Invialo al tuo Agent",
    searchPlaceholder: "Cerca i server di cui hai bisogno...",
    exploreBtn: "Esplora i Server MCP",
    publishBtn: "Pubblica Server",
    copyLabel: "Copia",
    copiedLabel: "Copiato",
  },
  stats: { servers: "Server MCP", calls: "Chiamate API / Mese", publishers: "Integrazioni", uptime: "SLA di Disponibilità" },
  features: {
    title: "Tutto ciò che serve agli agent, in un unico posto",
    subtitle: "Dalla scoperta al pagamento — un'infrastruttura completa per l'economia agent-native.",
    discover: {
      title: "Scopri",
      desc: "Ricerca semantica tra migliaia di server MCP. Il tuo agent trova gli strumenti giusti in base alle capacità, non al nome. Filtra per protocollo, punteggio di affidabilità e latenza.",
    },
    auth: {
      title: "Autenticazione",
      desc: "OAuth 2.0 progettato per le interazioni agent-to-tool. Il tuo agent si autentica in modo autonomo — senza intervento umano. Permessi con scope definiti, rotazione dei token e log di audit.",
    },
    monetize: {
      title: "Paga a consumo",
      desc: "Paga solo ciò che il tuo agent utilizza. Ogni chiamata a uno strumento viene misurata automaticamente — nessun abbonamento, nessun impegno. Prezzi trasparenti con dashboard di utilizzo dettagliati.",
    },
  },
  howItWorks: {
    title: "Come funziona",
    subtitle: "Tre passaggi per connettere il tuo agent a qualsiasi strumento",
    steps: [
      { title: "Trova gli strumenti di cui hai bisogno", desc: "Cerca per capacità — \"genera PDF\", \"scraping web\", \"invia email\" — e Imagent ti mostra i migliori server MCP classificati per punteggio di affidabilità, latenza e prezzo." },
      { title: "Connettiti con una riga", desc: "Aggiungi qualsiasi strumento al tuo agent con un singolo comando CLI. Imagent gestisce automaticamente autenticazione, negoziazione del protocollo e definizione dei permessi." },
      { title: "Chiama e paga a consumo", desc: "Il tuo agent invoca gli strumenti tramite un'API unificata. L'utilizzo viene misurato in tempo reale, la fatturazione è automatica e paghi solo per le chiamate andate a buon fine." },
    ],
  },
  apiSection: {
    headline1: "Agent-first,",
    headline2: "human-friendly",
    desc: "Ogni endpoint è progettato per il consumo da parte delle macchine. Risposte strutturate, errori semantici e rate limiting integrato. Il tuo agent legge le specifiche, non un README.",
    features: [
      "Ricerca basata sulle capacità con vector embedding",
      "OAuth 2.0 + agent identity token (AIT)",
      "Adattamento automatico del protocollo (MCP ↔ A2A ↔ Function Calling)",
      "Misurazione dell'utilizzo in tempo reale e Webhook",
    ],
  },
  protocols: "Infrastruttura agnostica rispetto al protocollo",
  integration: {
    title: "Tre modi per connettersi",
    subtitle: "Stesso registro, stesso saldo, qualunque sia il protocollo del tuo agent.",
    skill: { title: "Skill", desc: "Una riga nella chat del tuo agent." },
    mcp: { title: "MCP", desc: "Aggiungi il server MCP remoto. Nessuna installazione, nessuna chiave." },
    cli: { title: "CLI", desc: "Installa ed esegui dal tuo terminale." },
  },
  faq: {
    title: "Domande frequenti",
    items: [
      { q: "Ho bisogno di chiavi API per ogni provider?", a: "No. Imagent gestisce l'autenticazione al posto tuo. Un unico identity token copre tutti gli strumenti nel registro." },
      { q: "Come sono strutturati i prezzi?", a: "Paga per chiamata. Ogni strumento pubblica il proprio prezzo per chiamata e ti viene addebitato esattamente quell'importo da un unico saldo." },
      { q: "Un provider ha fallito. Mi viene addebitato?", a: "No. Le chiamate fallite non vengono fatturate. Paghi solo per le risposte andate a buon fine." },
      { q: "Quali framework per agent sono supportati?", a: "Qualsiasi framework che supporti MCP, A2A o Function Calling. Funziona con LangChain, CrewAI, AutoGen e agent personalizzati." },
      { q: "E i rate limit?", a: "Ogni strumento definisce i propri rate limit. Imagent li applica in modo trasparente e mette in coda le richieste in eccesso." },
    ],
  },
  cta: {
    title: "Pubblica il tuo Agent & Tools",
    subtitle: "Imagent è open source. Contribuisci con il tuo strumento o inizia a costruire — costruiamo insieme l'economia degli Agent.",
    primary: "Unisciti al progetto GitHub",
    primaryHref: "https://github.com/Agent1019/imagent",
    secondary: "Leggi la Documentazione",
  },
  footer: { tagline: "Il livello infrastrutturale per l'economia degli Agent. Scopri, autenticati e paga a chiamata.", product: "Prodotto", developers: "Sviluppatori", company: "Azienda", copyright: "© 2026 imagent. Tutti i diritti riservati.", explore: "Esplora", rankings: "Classifiche", pricing: "Prezzi", documentation: "Documentazione", apiReference: "Riferimento API", blog: "Blog", about: "Chi siamo", careers: "Lavora con noi", privacy: "Privacy", terms: "Termini" },
  explore: {
    title: "Esplora i Server MCP", subtitle: "Sfoglia centinaia di strumenti progettati per gli agent AI. Filtra per categoria per trovare le capacità di cui hai bisogno.",
    categories: "Categorie", showing: "Mostrati", inCategory: "in",
    noTools: "Nessuno strumento trovato in questa categoria.", viewAll: "Visualizza tutti gli strumenti",
    endpoints: "endpoint", installs: "installazioni", toolsCount: "strumenti",
    catLabels: { All: "Tutti", Search: "Ricerca", Data: "Dati", Finance: "Finanza", Social: "Social", Communication: "Comunicazione", DevTools: "Strumenti di Sviluppo", "AI/ML": "AI/ML", Productivity: "Produttività", Media: "Media", "E-commerce": "E-commerce", Jobs: "Lavoro", Travel: "Viaggi", Weather: "Meteo", News: "Notizie", Legal: "Legale", Software: "Software", Maps: "Mappe", Marketing: "Marketing", Analytics: "Analisi", Trade: "Commercio", Agents: "Agent", Other: "Altro" },
  },
  toolDetail: {
    trustScore: "Punteggio di Affidabilità", terminal: "terminale", copyCmd: "Copia comando",
    endpointsTitle: "Endpoint", endpointsDesc: "Endpoint API disponibili per questo server MCP.",
    pricingTitle: "Prezzi", pricingDesc: "Scegli il piano più adatto al tuo utilizzo. Tutti i piani includono le funzionalità principali.",
    free: "Gratuito", pro: "Pro", enterprise: "Enterprise", perMonth: "/mese", custom: "Personalizzato",
    mostPopular: "Più Popolare", getStarted: "Inizia", contactSales: "Contatta le Vendite",
    relatedTitle: "Strumenti Correlati", relatedDesc: "Altri server MCP che complementano",
    freeFeatures: ["1.000 chiamate/mese", "Supporto della community", "Latenza standard", "Scope di autenticazione di base"],
    proFeatures: ["100.000 chiamate/mese", "Supporto prioritario", "Routing a bassa latenza", "Tutti gli scope di autenticazione", "Eventi Webhook"],
    enterpriseFeatures: ["Chiamate illimitate", "Supporto dedicato", "Garanzia SLA", "Scope personalizzati", "Opzione on-premise", "Log di audit"],
    epList: "Elenca tutte le capacità e le funzioni degli strumenti disponibili su questo server.",
    epInvoke: "Invoca una funzione specifica di uno strumento con parametri strutturati.",
    epHealth: "Verifica lo stato di salute del server, la disponibilità e la latenza media.",
    epAuth: "Scambia un agent identity token (AIT) con un token di accesso con scope definito.",
    tabTools: "Tools", tabComments: "Comments", tabChangelog: "Changelog",
    availableTools: "Available Tools", toolsDesc: "tools that your agent can invoke.",
    install: "Install", refresh: "Refresh", share: "Share", copy: "Copy", copied: "Copied!",
    installCli: "CLI", installMcp: "MCP Server", installJson: "JSON Config", installSkill: "Skill",
    recommended: "Recommended", httpLabel: "HTTP", manual: "Manual", oneLiner: "One-liner",
    remoteService: "Remote Service", remoteServiceDesc: "This tool runs remotely on the provider's infrastructure. No local installation or setup required.",
    tags: "Tags", links: "Links",
    githubRepo: "GitHub Repository", documentation: "Documentation", homepage: "Homepage", reportIssue: "Report Issue",
    version: "Version", installs: "Installs", category: "Category", protocol: "Protocol", license: "License",
    latest: "Latest",
    installConfig: "Installazione", viewDetails: "Vedi dettagli",
    tabInstall: "Installa", tabPublish: "Pubblica",
    iamAgent: "Sono Agent", iamHuman: "Sono Human",
    agentPromptHint: "Invia questo prompt al tuo Agent per installare questo MCP Server",
    agentPromptLabel: "Agent prompt",
    copyPrompt: "Copia Prompt",
  },
  rankings: {
    title: "Classifiche Agent", subtitle: "Monitora i server MCP più popolari e le loro tendenze di utilizzo sulla piattaforma Imagent.",
    mostUsed: "Più Usati", fastest: "Crescita più Rapida", byCategory: "Per Categoria",
    tool: "Strumento", category: "Categoria", calls: "Chiamate", growth: "Crescita", status: "Stato",
    hot: "Hot", rising: "In ascesa", stable: "Stabile",
    hotDesc: "Tasso di crescita a 30 giorni superiore al 50%", risingDesc: "Tasso di crescita a 30 giorni tra il 20% e il 50%", stableDesc: "Tasso di crescita a 30 giorni inferiore al 20%",
    howWeCount: "Come Contiamo", dataSources: "Fonti dei Dati", dataSourcesDesc: "Le classifiche sono derivate dai registri effettivi delle chiamate API sulla piattaforma Imagent.",
    callVolume: "Volume delle Chiamate", callVolumeDesc: "Ogni invocazione andata a buon fine conta come una chiamata. Le chiamate fallite e i tentativi ripetuti sono esclusi.",
    growthRate: "Tasso di Crescita", growthRateDesc: "Il tasso di crescita è la variazione percentuale del volume delle chiamate rispetto al periodo precedente di pari durata.",
    statusBadges: "Badge di Stato",
    descMostUsed: "Classificati per chiamate API negli ultimi 30 giorni",
    descFastest: "Classificati per tasso di crescita a 30 giorni",
    descByCategory: "Lo strumento più utilizzato in ciascuna categoria",
  },
  seo: {
    title: "Imagent — Scopri, Autenticati e Utilizza Server MCP",
    description: "Il livello infrastrutturale per gli agent AI. Scopri server MCP, autenticati per le chiamate agli strumenti e paga a consumo — tutto in un'unica piattaforma.",
  },
};

const es: Content = {
  nav: { explore: "Explorar", rankings: "Rankings", blog: "Blog", community: "Comunidad", docs: "Docs", pricing: "Precios", signIn: "Iniciar sesión", getStarted: "Comenzar" },
  hero: {
    badge: "{users} usuarios · {services} servicios en línea",
    headline1: "Una conversación, conéctate a servicios globales de agentes",
    headline2: "Capacidad verificada · Sin re-registro · Hasta 50% de descuento",
    subtitle1: "Una plataforma para conectar agentes con las herramientas que necesitan.",
    subtitle2: "Compatible con los protocolos MCP, A2A y Function Calling.",
    mcpCopy: "npx @imagent/cli add",
    mcpGuide: "Envíalo a tu Agent",
    searchPlaceholder: "Busca los servidores que necesitas...",
    exploreBtn: "Explorar MCP Servers",
    publishBtn: "Publicar servidor",
    copyLabel: "Copiar",
    copiedLabel: "Copiado",
  },
  stats: { servers: "MCP Servers", calls: "API Calls / Mes", publishers: "Integraciones", uptime: "SLA de disponibilidad" },
  features: {
    title: "Todo lo que los agentes necesitan, en un solo lugar",
    subtitle: "Desde el descubrimiento hasta el pago — una infraestructura completa para la economía nativa de agentes.",
    discover: {
      title: "Descubrir",
      desc: "Búsqueda semántica entre miles de MCP Servers. Tu agente encuentra las herramientas adecuadas por capacidad, no por nombre. Filtra por protocolo, puntuación de confianza y latencia.",
    },
    auth: {
      title: "Autenticar",
      desc: "OAuth 2.0 diseñado para interacciones entre agente y herramienta. Tu agente se autentica de forma autónoma — sin intervención humana. Permisos con alcance, rotación de tokens y registros de auditoría.",
    },
    monetize: {
      title: "Pago por uso",
      desc: "Paga solo por lo que tu agente utiliza. Cada llamada a herramienta se mide automáticamente — sin suscripciones, sin compromisos. Precios transparentes con paneles detallados de uso.",
    },
  },
  howItWorks: {
    title: "Cómo funciona",
    subtitle: "Tres pasos para conectar tu agente a cualquier herramienta",
    steps: [
      { title: "Encuentra las herramientas que necesitas", desc: "Busca por capacidad — \"generar PDF\", \"extraer datos web\", \"enviar correo electrónico\" — e Imagent muestra los mejores MCP Servers ordenados por puntuación de confianza, latencia y precio." },
      { title: "Conéctate en una línea", desc: "Agrega cualquier herramienta a tu agente con un solo comando CLI. Imagent gestiona la autenticación, la negociación de protocolo y el alcance de permisos automáticamente." },
      { title: "Llama y paga por uso", desc: "Tu agente invoca herramientas a través de una API unificada. El uso se mide en tiempo real, la facturación es automática y solo pagas por las llamadas exitosas." },
    ],
  },
  apiSection: {
    headline1: "Agent-first,",
    headline2: "human-friendly",
    desc: "Cada endpoint está diseñado para consumo por máquina. Respuestas estructuradas, errores semánticos y límites de velocidad incorporados. Tu agente lee la especificación, no un README.",
    features: [
      "Búsqueda basada en capacidades con embeddings vectoriales",
      "OAuth 2.0 + tokens de identidad de agente (AIT)",
      "Adaptación automática de protocolo (MCP ↔ A2A ↔ Function Calling)",
      "Medición de uso en tiempo real y Webhooks",
    ],
  },
  protocols: "Infraestructura independiente del protocolo",
  integration: {
    title: "Tres formas de conectarse",
    subtitle: "Mismo registro, mismo saldo, sin importar el protocolo que use tu agente.",
    skill: { title: "Skill", desc: "Una línea en el chat de tu agente." },
    mcp: { title: "MCP", desc: "Agrega el MCP Server remoto. Sin instalación, sin clave." },
    cli: { title: "CLI", desc: "Instala y ejecuta desde tu terminal." },
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      { q: "¿Necesito API keys para cada proveedor?", a: "No. Imagent gestiona la autenticación por ti. Un solo token de identidad cubre todas las herramientas del registro." },
      { q: "¿Cómo está estructurada la tarifa?", a: "Paga por llamada. Cada herramienta publica su propio precio por llamada, y se te cobra exactamente esa cantidad desde un único saldo." },
      { q: "Un proveedor falló. ¿Se me cobra?", a: "No. Las llamadas fallidas no se facturan. Solo pagas por las respuestas exitosas." },
      { q: "¿Qué frameworks de agentes son compatibles?", a: "Cualquier framework que soporte MCP, A2A o Function Calling. Funciona con LangChain, CrewAI, AutoGen y agentes personalizados." },
      { q: "¿Qué pasa con los límites de velocidad?", a: "Cada herramienta define sus propios límites de velocidad. Imagent los aplica de forma transparente y encola las solicitudes que exceden el límite." },
    ],
  },
  cta: {
    title: "Publica tu Agent & Tools",
    subtitle: "Imagent es de código abierto. Contribuye con tu herramienta o empieza a construir — construyamos juntos la economía de Agentes.",
    primary: "Únete al proyecto en GitHub",
    primaryHref: "https://github.com/Agent1019/imagent",
    secondary: "Leer la documentación",
  },
  footer: { tagline: "La capa de infraestructura para la economía de Agentes. Descubre, autentica y paga por llamada.", product: "Producto", developers: "Desarrolladores", company: "Empresa", copyright: "© 2026 imagent. Todos los derechos reservados.", explore: "Explorar", rankings: "Rankings", pricing: "Precios", documentation: "Documentación", apiReference: "Referencia API", blog: "Blog", about: "Acerca de", careers: "Empleo", privacy: "Privacidad", terms: "Términos" },
  explore: {
    title: "Explorar MCP Servers", subtitle: "Navega entre cientos de herramientas creadas para agentes de IA. Filtra por categoría para encontrar las capacidades que necesitas.",
    categories: "Categorías", showing: "Mostrando", inCategory: "en",
    noTools: "No se encontraron herramientas en esta categoría.", viewAll: "Ver todas las herramientas",
    endpoints: "endpoints", installs: "instalaciones", toolsCount: "herramientas",
    catLabels: { All: "Todos", Search: "Búsqueda", Data: "Datos", Finance: "Finanzas", Social: "Social", Communication: "Comunicación", DevTools: "Herramientas de desarrollo", "AI/ML": "AI/ML", Productivity: "Productividad", Media: "Medios", "E-commerce": "Comercio electrónico", Jobs: "Empleo", Travel: "Viajes", Weather: "Clima", News: "Noticias", Legal: "Legal", Software: "Software", Maps: "Mapas", Marketing: "Marketing", Analytics: "Analítica", Trade: "Comercio", Agents: "Agentes", Other: "Otros" },
  },
  toolDetail: {
    trustScore: "Puntuación de confianza", terminal: "terminal", copyCmd: "Copiar comando",
    endpointsTitle: "Endpoints", endpointsDesc: "API endpoints disponibles para este MCP Server.",
    pricingTitle: "Precios", pricingDesc: "Elige el plan que se adapte a tu uso. Todos los planes incluyen la funcionalidad principal.",
    free: "Gratis", pro: "Pro", enterprise: "Empresa", perMonth: "/mes", custom: "Personalizado",
    mostPopular: "Más popular", getStarted: "Comenzar", contactSales: "Contactar ventas",
    relatedTitle: "Herramientas relacionadas", relatedDesc: "Otros MCP Servers que complementan a",
    freeFeatures: ["1,000 llamadas/mes", "Soporte de la comunidad", "Latencia estándar", "Alcances de autenticación básicos"],
    proFeatures: ["100,000 llamadas/mes", "Soporte prioritario", "Enrutamiento de baja latencia", "Todos los alcances de autenticación", "Eventos Webhook"],
    enterpriseFeatures: ["Llamadas ilimitadas", "Soporte dedicado", "Garantía SLA", "Alcances personalizados", "Opción on-premise", "Registros de auditoría"],
    epList: "Lista todas las capacidades y funciones de herramientas disponibles en este servidor.",
    epInvoke: "Invoca una función de herramienta específica con parámetros estructurados.",
    epHealth: "Verifica el estado de salud del servidor, tiempo de actividad y latencia promedio.",
    epAuth: "Intercambia un token de identidad de agente (AIT) por un token de acceso con alcance.",
    tabTools: "Tools", tabComments: "Comments", tabChangelog: "Changelog",
    availableTools: "Available Tools", toolsDesc: "tools that your agent can invoke.",
    install: "Install", refresh: "Refresh", share: "Share", copy: "Copy", copied: "Copied!",
    installCli: "CLI", installMcp: "MCP Server", installJson: "JSON Config", installSkill: "Skill",
    recommended: "Recommended", httpLabel: "HTTP", manual: "Manual", oneLiner: "One-liner",
    remoteService: "Remote Service", remoteServiceDesc: "This tool runs remotely on the provider's infrastructure. No local installation or setup required.",
    tags: "Tags", links: "Links",
    githubRepo: "GitHub Repository", documentation: "Documentation", homepage: "Homepage", reportIssue: "Report Issue",
    version: "Version", installs: "Installs", category: "Category", protocol: "Protocol", license: "License",
    latest: "Latest",
    installConfig: "Instalación", viewDetails: "Ver detalles",
    tabInstall: "Instalar", tabPublish: "Publicar",
    iamAgent: "Soy Agent", iamHuman: "Soy Human",
    agentPromptHint: "Envía este prompt a tu Agent para instalar este MCP Server",
    agentPromptLabel: "Agent prompt",
    copyPrompt: "Copiar Prompt",
  },
  rankings: {
    title: "Rankings de Agentes", subtitle: "Sigue los MCP Servers más populares y sus tendencias de uso en la plataforma Imagent.",
    mostUsed: "Más utilizados", fastest: "Crecimiento más rápido", byCategory: "Por categoría",
    tool: "Herramienta", category: "Categoría", calls: "Llamadas", growth: "Crecimiento", status: "Estado",
    hot: "Destacado", rising: "En ascenso", stable: "Estable",
    hotDesc: "Tasa de crecimiento a 30 días superior al 50%", risingDesc: "Tasa de crecimiento a 30 días entre 20-50%", stableDesc: "Tasa de crecimiento a 30 días inferior al 20%",
    howWeCount: "Cómo contamos", dataSources: "Fuentes de datos", dataSourcesDesc: "Los rankings se derivan de registros reales de API calls en la plataforma Imagent.",
    callVolume: "Volumen de llamadas", callVolumeDesc: "Cada invocación exitosa cuenta como una llamada. Las llamadas fallidas y los reintentos se excluyen.",
    growthRate: "Tasa de crecimiento", growthRateDesc: "La tasa de crecimiento es el cambio porcentual en el volumen de llamadas comparado con el período anterior de igual duración.",
    statusBadges: "Insignias de estado",
    descMostUsed: "Ordenados por API calls en los últimos 30 días",
    descFastest: "Ordenados por tasa de crecimiento a 30 días",
    descByCategory: "Herramienta principal en cada categoría por uso",
  },
  seo: {
    title: "Imagent — Descubre, autentica y usa MCP Servers",
    description: "La capa de infraestructura para agentes de IA. Descubre MCP Servers, autentica llamadas a herramientas y paga por uso — todo en una sola plataforma.",
  },
};

const ja: Content = {
  nav: { explore: "探索", rankings: "ランキング", blog: "ブログ", community: "コミュニティ", docs: "ドキュメント", pricing: "料金", signIn: "ログイン", getStarted: "無料で始める" },
  hero: {
    badge: "{users} ユーザー · {services} サービスがオンライン",
    headline1: "ひとつの会話で、世界のAgentサービスとつながる",
    headline2: "能力検証済み · 再登録不要 · 最大50%オフ",
    subtitle1: "Agentと必要なツールをつなぐ、ひとつのプラットフォーム。",
    subtitle2: "MCP、A2A、Function Callingプロトコルに対応。",
    mcpCopy: "npx @imagent/cli add",
    mcpGuide: "Agentに送信してください",
    searchPlaceholder: "必要なサーバーを検索...",
    exploreBtn: "MCPサーバーを探索",
    publishBtn: "サーバーを公開",
    copyLabel: "コピー",
    copiedLabel: "コピー済み",
  },
  stats: { servers: "MCPサーバー", calls: "月間APIコール数", publishers: "インテグレーション", uptime: "稼働率SLA" },
  features: {
    title: "Agentに必要なすべてを、一箇所に",
    subtitle: "発見から支払いまで — Agentネイティブ経済のための完全なインフラ。",
    discover: {
      title: "発見",
      desc: "数千のMCPサーバーをセマンティック検索。Agentが名前でなく能力でツールを見つけます。プロトコル、信頼スコア、レイテンシでフィルタリング。",
    },
    auth: {
      title: "認証",
      desc: "Agentとツールのやり取りのために構築されたOAuth 2.0。Agentが自律的に認証 — 人間の介入は不要。スコープ付き権限、トークンローテーション、監査ログ。",
    },
    monetize: {
      title: "従量課金",
      desc: "Agentが実際に使った分だけ支払い。すべてのツール呼び出しは自動的に計測 — サブスクリプションなし、契約なし。透明な料金体系と詳細な利用ダッシュボード。",
    },
  },
  howItWorks: {
    title: "使い方",
    subtitle: "3ステップでAgentを任意のツールに接続",
    steps: [
      { title: "必要なツールを見つける", desc: "能力で検索 — 「PDF生成」「Webスクレイピング」「メール送信」 — Imagentが信頼スコア、レイテンシ、価格でランク付けされた最適なMCPサーバーを表示します。" },
      { title: "一行で接続", desc: "CLIコマンド一行で任意のツールをAgentに追加。Imagentが認証、プロトコルネゴシエーション、権限スコープを自動的に処理します。" },
      { title: "呼び出して使った分だけ支払い", desc: "Agentは統一APIを通じてツールを呼び出します。利用量はリアルタイムで計測され、課金は自動、成功した呼び出しに対してのみ支払いが発生します。" },
    ],
  },
  apiSection: {
    headline1: "Agentファースト、",
    headline2: "人間にやさしく",
    desc: "すべてのエンドポイントはマシンによる利用を前提に設計。構造化レスポンス、セマンティックエラー、レートリミット内蔵。Agentが読むのは仕様書であり、READMEではありません。",
    features: [
      "ベクター埋め込みによる能力ベース検索",
      "OAuth 2.0 + Agent IDトークン（AIT）",
      "自動プロトコル適応（MCP ↔ A2A ↔ Function Calling）",
      "リアルタイム利用計測とWebhook",
    ],
  },
  protocols: "プロトコルに依存しないインフラ",
  integration: {
    title: "3つの接続方法",
    subtitle: "同じレジストリ、同じ残高、Agentが対応するプロトコルで接続。",
    skill: { title: "Skill", desc: "Agentのチャットに一行追加。" },
    mcp: { title: "MCP", desc: "リモートMCPサーバーを追加。インストール不要、キー不要。" },
    cli: { title: "CLI", desc: "ターミナルからインストールして実行。" },
  },
  faq: {
    title: "よくある質問",
    items: [
      { q: "各プロバイダーごとにAPIキーが必要ですか？", a: "いいえ。Imagentが認証を代行します。ひとつのIDトークンでレジストリ内のすべてのツールにアクセスできます。" },
      { q: "料金体系はどうなっていますか？", a: "呼び出しごとの課金です。各ツールが独自の呼び出し単価を公開しており、単一の残高から正確に課金されます。" },
      { q: "プロバイダーの呼び出しに失敗した場合、課金されますか？", a: "いいえ。失敗した呼び出しには課金されません。成功したレスポンスに対してのみ支払いが発生します。" },
      { q: "どのAgentフレームワークに対応していますか？", a: "MCP、A2A、Function Callingに対応するフレームワークであれば何でも。LangChain、CrewAI、AutoGen、カスタムAgentで動作します。" },
      { q: "レートリミットはどうなっていますか？", a: "各ツールが独自のレートリミットを定義します。Imagentはそれを透過的に適用し、超過リクエストをキューイングします。" },
    ],
  },
  cta: {
    title: "Agent＆ツールを公開しよう",
    subtitle: "Imagentはオープンソースです。ツールをコントリビュートするか、構築を始めましょう — Agent経済を一緒に作り上げましょう。",
    primary: "GitHubプロジェクトに参加",
    primaryHref: "https://github.com/Agent1019/imagent",
    secondary: "ドキュメントを読む",
  },
  footer: { tagline: "Agent経済のインフラ層。発見、認証、呼び出しごとの支払いを一箇所で。", product: "プロダクト", developers: "開発者", company: "会社情報", copyright: "© 2026 imagent. All rights reserved.", explore: "探索", rankings: "ランキング", pricing: "料金", documentation: "ドキュメント", apiReference: "APIリファレンス", blog: "ブログ", about: "会社概要", careers: "採用情報", privacy: "プライバシーポリシー", terms: "利用規約" },
  explore: {
    title: "MCPサーバーを探索", subtitle: "AI Agentのために構築された数百のツールを閲覧。カテゴリでフィルタリングして、必要な機能を見つけましょう。",
    categories: "カテゴリ", showing: "表示中", inCategory: "カテゴリ：",
    noTools: "このカテゴリにツールが見つかりません。", viewAll: "すべてのツールを表示",
    endpoints: "エンドポイント", installs: "インストール", toolsCount: "ツール",
    catLabels: { All: "すべて", Search: "検索", Data: "データ", Finance: "金融", Social: "ソーシャル", Communication: "コミュニケーション", DevTools: "開発ツール", "AI/ML": "AI/ML", Productivity: "生産性", Media: "メディア", "E-commerce": "Eコマース", Jobs: "求人", Travel: "旅行", Weather: "天気", News: "ニュース", Legal: "法律", Software: "ソフトウェア", Maps: "地図", Marketing: "マーケティング", Analytics: "アナリティクス", Trade: "貿易", Agents: "Agent", Other: "その他" },
  },
  toolDetail: {
    trustScore: "信頼スコア", terminal: "ターミナル", copyCmd: "コマンドをコピー",
    endpointsTitle: "エンドポイント", endpointsDesc: "このMCPサーバーで利用可能なAPIエンドポイント。",
    pricingTitle: "料金プラン", pricingDesc: "利用量に合ったプランを選択してください。すべてのプランにコア機能が含まれます。",
    free: "無料", pro: "プロ", enterprise: "エンタープライズ", perMonth: "/月", custom: "カスタム",
    mostPopular: "最も人気", getStarted: "無料で始める", contactSales: "営業に問い合わせ",
    relatedTitle: "関連ツール", relatedDesc: "と相性の良い他のMCPサーバー",
    freeFeatures: ["1,000回/月", "コミュニティサポート", "標準レイテンシ", "基本認証スコープ"],
    proFeatures: ["100,000回/月", "優先サポート", "低レイテンシルーティング", "すべての認証スコープ", "Webhookイベント"],
    enterpriseFeatures: ["無制限呼び出し", "専任サポート", "SLA保証", "カスタムスコープ", "オンプレミス対応", "監査ログ"],
    epList: "このサーバーで利用可能なすべての能力とツール機能を一覧表示します。",
    epInvoke: "構造化パラメータで特定のツール機能を呼び出します。",
    epHealth: "サーバーの稼働状況、稼働率、平均レイテンシを確認します。",
    epAuth: "Agent IDトークン（AIT）をスコープ付きアクセストークンに交換します。",
    tabTools: "Tools", tabComments: "Comments", tabChangelog: "Changelog",
    availableTools: "Available Tools", toolsDesc: "tools that your agent can invoke.",
    install: "Install", refresh: "Refresh", share: "Share", copy: "Copy", copied: "Copied!",
    installCli: "CLI", installMcp: "MCP Server", installJson: "JSON Config", installSkill: "Skill",
    recommended: "Recommended", httpLabel: "HTTP", manual: "Manual", oneLiner: "One-liner",
    remoteService: "Remote Service", remoteServiceDesc: "This tool runs remotely on the provider's infrastructure. No local installation or setup required.",
    tags: "Tags", links: "Links",
    githubRepo: "GitHub Repository", documentation: "Documentation", homepage: "Homepage", reportIssue: "Report Issue",
    version: "Version", installs: "Installs", category: "Category", protocol: "Protocol", license: "License",
    latest: "Latest",
    installConfig: "インストール設定", viewDetails: "詳細を見る",
    tabInstall: "インストール", tabPublish: "公開",
    iamAgent: "私は Agent", iamHuman: "私は Human",
    agentPromptHint: "このプロンプトをAgentに送信してMCPサーバーをインストール",
    agentPromptLabel: "Agent prompt",
    copyPrompt: "プロンプトをコピー",
  },
  rankings: {
    title: "Agentランキング", subtitle: "Imagentプラットフォーム上で最も人気のあるMCPサーバーとその利用トレンドを追跡。",
    mostUsed: "最も利用されている", fastest: "急成長", byCategory: "カテゴリ別",
    tool: "ツール", category: "カテゴリ", calls: "呼び出し数", growth: "成長率", status: "ステータス",
    hot: "ホット", rising: "上昇中", stable: "安定",
    hotDesc: "30日間の成長率が50%超", risingDesc: "30日間の成長率が20〜50%", stableDesc: "30日間の成長率が20%未満",
    howWeCount: "集計方法", dataSources: "データソース", dataSourcesDesc: "ランキングはImagentプラットフォーム上の実際のAPIコール記録から算出されています。",
    callVolume: "呼び出し量", callVolumeDesc: "各成功呼び出しが1回としてカウントされます。失敗した呼び出しとリトライは除外されます。",
    growthRate: "成長率", growthRateDesc: "成長率は、前の同等期間に対する呼び出し量のパーセンテージ変化です。",
    statusBadges: "ステータスバッジ",
    descMostUsed: "過去30日間のAPI呼び出し数でランク付け",
    descFastest: "30日間の成長率でランク付け",
    descByCategory: "各カテゴリで最も利用されているツール",
  },
  seo: {
    title: "Imagent — MCPサーバーの発見・認証・利用プラットフォーム",
    description: "AI Agentのインフラ層。MCPサーバーの発見、ツール呼び出しの認証、従量課金 — すべてをひとつのプラットフォームで。",
  },
};

const de: Content = {
  nav: { explore: "Entdecken", rankings: "Rankings", blog: "Blog", community: "Community", docs: "Docs", pricing: "Preise", signIn: "Anmelden", getStarted: "Kostenlos starten" },
  hero: {
    badge: "{users} Nutzer · {services} Dienste online",
    headline1: "Ein Gespräch, verbunden mit globalen Agent-Services",
    headline2: "Fähigkeiten verifiziert · Keine erneute Registrierung · Bis zu 50 % günstiger",
    subtitle1: "Eine Plattform, um Agenten mit den Tools zu verbinden, die sie brauchen.",
    subtitle2: "Unterstützt MCP, A2A und Function Calling Protokolle.",
    mcpCopy: "npx @imagent/cli add",
    mcpGuide: "Sende dies an deinen Agent",
    searchPlaceholder: "Server suchen, die du brauchst …",
    exploreBtn: "MCP-Server entdecken",
    publishBtn: "Server veröffentlichen",
    copyLabel: "Kopieren",
    copiedLabel: "Kopiert",
  },
  stats: { servers: "MCP-Server", calls: "API-Aufrufe / Monat", publishers: "Integrationen", uptime: "Uptime-SLA" },
  features: {
    title: "Alles, was Agenten brauchen, an einem Ort",
    subtitle: "Von der Entdeckung bis zur Zahlung — eine vollständige Infrastruktur für die agentenbasierte Wirtschaft.",
    discover: {
      title: "Entdecken",
      desc: "Semantische Suche über Tausende von MCP-Servern. Dein Agent findet die richtigen Tools nach Fähigkeit, nicht nach Name. Filtere nach Protokoll, Vertrauenswert und Latenz.",
    },
    auth: {
      title: "Authentifizieren",
      desc: "OAuth 2.0 für Agent-zu-Tool-Interaktionen. Dein Agent authentifiziert sich autonom — ohne menschliches Zutun. Bereichsbezogene Berechtigungen, Token-Rotation und Audit-Logs.",
    },
    monetize: {
      title: "Nach Nutzung zahlen",
      desc: "Zahle nur für das, was dein Agent tatsächlich nutzt. Jeder Tool-Aufruf wird automatisch erfasst — keine Abos, keine Verpflichtungen. Transparente Preise mit detaillierten Nutzungs-Dashboards.",
    },
  },
  howItWorks: {
    title: "So funktioniert's",
    subtitle: "Drei Schritte, um deinen Agent mit jedem Tool zu verbinden",
    steps: [
      { title: "Finde die Tools, die du brauchst", desc: "Suche nach Fähigkeiten — \\\"PDF generieren\\\", \\\"Web scrapen\\\", \\\"E-Mail senden\\\" — und Imagent zeigt dir die besten MCP-Server, sortiert nach Vertrauenswert, Latenz und Preis." },
      { title: "Mit einer Zeile verbinden", desc: "Füge jedes Tool mit einem einzigen CLI-Befehl zu deinem Agent hinzu. Imagent übernimmt Authentifizierung, Protokollabstimmung und Berechtigungsverwaltung automatisch." },
      { title: "Aufrufen und pro Nutzung zahlen", desc: "Dein Agent ruft Tools über eine einheitliche API auf. Die Nutzung wird in Echtzeit erfasst, die Abrechnung erfolgt automatisch und du zahlst nur für erfolgreiche Aufrufe." },
    ],
  },
  apiSection: {
    headline1: "Agent-first,",
    headline2: "human-friendly",
    desc: "Jeder Endpunkt ist für die maschinelle Verarbeitung konzipiert. Strukturierte Antworten, semantische Fehler und integrierte Rate-Limiting. Dein Agent liest die Spezifikation, nicht ein README.",
    features: [
      "Fähigkeitsbasierte Suche mit Vector Embeddings",
      "OAuth 2.0 + Agent Identity Tokens (AIT)",
      "Automatische Protokollanpassung (MCP ↔ A2A ↔ Function Calling)",
      "Echtzeit-Nutzungserfassung und Webhooks",
    ],
  },
  protocols: "Protokollunabhängige Infrastruktur",
  integration: {
    title: "Drei Verbindungswege",
    subtitle: "Gleiche Registry, gleiches Guthaben — welches Protokoll dein Agent auch spricht.",
    skill: { title: "Skill", desc: "Eine Zeile in den Chat deines Agents." },
    mcp: { title: "MCP", desc: "Füge den Remote-MCP-Server hinzu. Keine Installation, kein Key." },
    cli: { title: "CLI", desc: "Installieren und aus dem Terminal ausführen." },
  },
  faq: {
    title: "Häufig gestellte Fragen",
    items: [
      { q: "Brauche ich API-Keys für jeden Anbieter?", a: "Nein. Imagent übernimmt die Authentifizierung für dich. Ein einziger Identity Token deckt jedes Tool in der Registry ab." },
      { q: "Wie funktioniert die Preisgestaltung?", a: "Zahle pro Aufruf. Jedes Tool veröffentlicht seinen eigenen Preis pro Aufruf, und du wirst exakt mit diesem Betrag von einem einzigen Guthaben belastet." },
      { q: "Ein Anbieter ist ausgefallen. Wird mir das berechnet?", a: "Nein. Fehlgeschlagene Aufrufe werden nicht abgerechnet. Du zahlst nur für erfolgreiche Antworten." },
      { q: "Welche Agent-Frameworks werden unterstützt?", a: "Jedes Framework, das MCP, A2A oder Function Calling unterstützt. Funktioniert mit LangChain, CrewAI, AutoGen und eigenen Agenten." },
      { q: "Was ist mit Rate-Limits?", a: "Jedes Tool definiert eigene Rate-Limits. Imagent setzt diese transparent durch und reiht überzählige Anfragen automatisch ein." },
    ],
  },
  cta: {
    title: "Veröffentliche deine Agenten & Tools",
    subtitle: "Imagent ist Open Source. Bringe dein Tool ein oder starte mit der Entwicklung — lass uns gemeinsam die Agent-Economy aufbauen.",
    primary: "GitHub-Projekt beitreten",
    primaryHref: "https://github.com/Agent1019/imagent",
    secondary: "Dokumentation lesen",
  },
  footer: { tagline: "Die Infrastrukturschicht für die Agent-Economy. Entdecken, authentifizieren und pro Aufruf zahlen.", product: "Produkt", developers: "Entwickler", company: "Unternehmen", copyright: "© 2026 imagent. Alle Rechte vorbehalten.", explore: "Entdecken", rankings: "Rankings", pricing: "Preise", documentation: "Dokumentation", apiReference: "API-Referenz", blog: "Blog", about: "Über uns", careers: "Karriere", privacy: "Datenschutz", terms: "Nutzungsbedingungen" },
  explore: {
    title: "MCP-Server entdecken", subtitle: "Durchsuche Hunderte von Tools, die für KI-Agenten entwickelt wurden. Filtere nach Kategorie, um die Fähigkeiten zu finden, die du brauchst.",
    categories: "Kategorien", showing: "Anzeige", inCategory: "in",
    noTools: "Keine Tools in dieser Kategorie gefunden.", viewAll: "Alle Tools anzeigen",
    endpoints: "Endpunkte", installs: "Installationen", toolsCount: "Tools",
    catLabels: { All: "Alle", Search: "Suche", Data: "Daten", Finance: "Finanzen", Social: "Social", Communication: "Kommunikation", DevTools: "DevTools", "AI/ML": "AI/ML", Productivity: "Produktivität", Media: "Medien", "E-commerce": "E-Commerce", Jobs: "Jobs", Travel: "Reisen", Weather: "Wetter", News: "Nachrichten", Legal: "Recht", Software: "Software", Maps: "Karten", Marketing: "Marketing", Analytics: "Analyse", Trade: "Handel", Agents: "Agenten", Other: "Sonstige" },
  },
  toolDetail: {
    trustScore: "Vertrauenswert", terminal: "Terminal", copyCmd: "Befehl kopieren",
    endpointsTitle: "Endpunkte", endpointsDesc: "Verfügbare API-Endpunkte für diesen MCP-Server.",
    pricingTitle: "Preise", pricingDesc: "Wähle den Tarif, der zu deiner Nutzung passt. Alle Tarife umfassen die Kernfunktionen.",
    free: "Kostenlos", pro: "Pro", enterprise: "Enterprise", perMonth: "/Monat", custom: "Individuell",
    mostPopular: "Am beliebtesten", getStarted: "Kostenlos starten", contactSales: "Vertrieb kontaktieren",
    relatedTitle: "Verwandte Tools", relatedDesc: "Weitere MCP-Server, die ergänzen:",
    freeFeatures: ["1.000 Aufrufe/Monat", "Community-Support", "Standard-Latenz", "Basis-Authentifizierungsbereiche"],
    proFeatures: ["100.000 Aufrufe/Monat", "Priorisierter Support", "Niedrige Latenz-Routen", "Alle Authentifizierungsbereiche", "Webhook-Events"],
    enterpriseFeatures: ["Unbegrenzte Aufrufe", "Dedizierter Support", "SLA-Garantie", "Individuelle Berechtigungsbereiche", "On-Premise-Option", "Audit-Logs"],
    epList: "Alle Fähigkeiten und Tool-Funktionen auflisten, die auf diesem Server verfügbar sind.",
    epInvoke: "Rufe eine bestimmte Tool-Funktion mit strukturierten Parametern auf.",
    epHealth: "Prüfe den Server-Status, die Uptime und die durchschnittliche Latenz.",
    epAuth: "Tausche einen Agent Identity Token (AIT) gegen einen bereichsbezogenen Access Token ein.",
    tabTools: "Tools", tabComments: "Comments", tabChangelog: "Changelog",
    availableTools: "Available Tools", toolsDesc: "tools that your agent can invoke.",
    install: "Install", refresh: "Refresh", share: "Share", copy: "Copy", copied: "Copied!",
    installCli: "CLI", installMcp: "MCP Server", installJson: "JSON Config", installSkill: "Skill",
    recommended: "Recommended", httpLabel: "HTTP", manual: "Manual", oneLiner: "One-liner",
    remoteService: "Remote Service", remoteServiceDesc: "This tool runs remotely on the provider's infrastructure. No local installation or setup required.",
    tags: "Tags", links: "Links",
    githubRepo: "GitHub Repository", documentation: "Documentation", homepage: "Homepage", reportIssue: "Report Issue",
    version: "Version", installs: "Installs", category: "Category", protocol: "Protocol", license: "License",
    latest: "Latest",
    installConfig: "Installation", viewDetails: "Details anzeigen",
    tabInstall: "Installieren", tabPublish: "Veröffentlichen",
    iamAgent: "Ich bin Agent", iamHuman: "Ich bin Human",
    agentPromptHint: "Senden Sie diesen Prompt an Ihren Agent, um diesen MCP-Server zu installieren",
    agentPromptLabel: "Agent prompt",
    copyPrompt: "Prompt kopieren",
  },
  rankings: {
    title: "Agent-Rankings", subtitle: "Verfolge die beliebtesten MCP-Server und ihre Nutzungstrends auf der Imagent-Plattform.",
    mostUsed: "Am meisten genutzt", fastest: "Am schnellsten wachsend", byCategory: "Nach Kategorie",
    tool: "Tool", category: "Kategorie", calls: "Aufrufe", growth: "Wachstum", status: "Status",
    hot: "Angesagt", rising: "Aufsteigend", stable: "Stabil",
    hotDesc: "30-Tage-Wachstumsrate über 50 %", risingDesc: "30-Tage-Wachstumsrate zwischen 20–50 %", stableDesc: "30-Tage-Wachstumsrate unter 20 %",
    howWeCount: "So zählen wir", dataSources: "Datenquellen", dataSourcesDesc: "Die Rankings basieren auf tatsächlichen API-Aufruf-Datensätzen der Imagent-Plattform.",
    callVolume: "Aufrufvolumen", callVolumeDesc: "Jeder erfolgreiche Aufruf zählt als ein Aufruf. Fehlgeschlagene Aufrufe und Wiederholungen werden nicht berücksichtigt.",
    growthRate: "Wachstumsrate", growthRateDesc: "Die Wachstumsrate ist die prozentuale Veränderung des Aufrufvolumens im Vergleich zum vorherigen Zeitraum gleicher Länge.",
    statusBadges: "Status-Badges",
    descMostUsed: "Rangfolge nach API-Aufrufen in den letzten 30 Tagen",
    descFastest: "Rangfolge nach 30-Tage-Wachstumsrate",
    descByCategory: "Top-Tool in jeder Kategorie nach Nutzung",
  },
  seo: {
    title: "Imagent — MCP-Server entdecken, authentifizieren und nutzen",
    description: "Die Infrastrukturschicht für KI-Agenten. MCP-Server entdecken, Tool-Aufrufe authentifizieren und nach Nutzung zahlen — alles auf einer Plattform.",
  },
};


const fr: Content = {
  nav: { explore: "Explorer", rankings: "Classements", blog: "Blog", community: "Communauté", docs: "Docs", pricing: "Tarifs", signIn: "Se connecter", getStarted: "Commencer" },
  hero: {
    badge: "{users} utilisateurs · {services} services en ligne",
    headline1: "Une seule conversation, connectez-vous aux services d'agents mondiaux",
    headline2: "Capacités vérifiées · Pas de réinscription · Jusqu'à 50 % de réduction",
    subtitle1: "Une plateforme pour connecter les agents aux outils dont ils ont besoin.",
    subtitle2: "Prend en charge les protocoles MCP, A2A et Function Calling.",
    mcpCopy: "npx @imagent/cli add",
    mcpGuide: "Envoyez ceci à votre Agent",
    searchPlaceholder: "Recherchez les serveurs dont vous avez besoin...",
    exploreBtn: "Explorer les serveurs MCP",
    publishBtn: "Publier un serveur",
    copyLabel: "Copier",
    copiedLabel: "Copié",
  },
  stats: { servers: "Serveurs MCP", calls: "Appels API / Mois", publishers: "Intégrations", uptime: "SLA de disponibilité" },
  features: {
    title: "Tout ce dont les agents ont besoin, en un seul endroit",
    subtitle: "De la découverte au paiement — une infrastructure complète pour l'économie native des agents.",
    discover: {
      title: "Découvrir",
      desc: "Recherche sémantique parmi des milliers de serveurs MCP. Votre agent trouve les bons outils par capacité, pas par nom. Filtrez par protocole, score de confiance et latence.",
    },
    auth: {
      title: "S'authentifier",
      desc: "OAuth 2.0 conçu pour les interactions agent-à-outil. Votre agent s'authentifie de manière autonome — sans intervention humaine. Permissions granulaires, rotation des jetons et journaux d'audit.",
    },
    monetize: {
      title: "Paiement à l'usage",
      desc: "Ne payez que ce que votre agent utilise. Chaque appel d'outil est mesuré automatiquement — pas d'abonnement, pas d'engagement. Tarification transparente avec des tableaux de bord d'utilisation détaillés.",
    },
  },
  howItWorks: {
    title: "Comment ça marche",
    subtitle: "Trois étapes pour connecter votre agent à n'importe quel outil",
    steps: [
      { title: "Trouvez les outils dont vous avez besoin", desc: "Recherchez par capacité — « générer un PDF », « extraire du web », « envoyer un e-mail » — et Imagent fait remonter les meilleurs serveurs MCP classés par score de confiance, latence et prix." },
      { title: "Connectez en une ligne", desc: "Ajoutez n'importe quel outil à votre agent avec une seule commande CLI. Imagent gère l'authentification, la négociation de protocole et le dimensionnement des permissions automatiquement." },
      { title: "Appelez et payez à l'usage", desc: "Votre agent invoque les outils via une API unifiée. L'utilisation est mesurée en temps réel, la facturation est automatique, et vous ne payez que les appels réussis." },
    ],
  },
  apiSection: {
    headline1: "Pensé pour les agents,",
    headline2: "adapté aux humains",
    desc: "Chaque point d'accès est conçu pour la consommation machine. Réponses structurées, erreurs sémantiques et limitation de débit intégrée. Votre agent lit la spécification, pas un README.",
    features: [
      "Recherche par capacités avec embeddings vectoriels",
      "OAuth 2.0 + jetons d'identité agent (AIT)",
      "Adaptation automatique de protocole (MCP ↔ A2A ↔ Function Calling)",
      "Mesure d'utilisation en temps réel et webhooks",
    ],
  },
  protocols: "Infrastructure agnostique en matière de protocoles",
  integration: {
    title: "Trois façons de se connecter",
    subtitle: "Même registre, même solde, quel que soit le protocole de votre agent.",
    skill: { title: "Skill", desc: "Une ligne dans le chat de votre agent." },
    mcp: { title: "MCP", desc: "Ajoutez le serveur MCP distant. Pas d'installation, pas de clé." },
    cli: { title: "CLI", desc: "Installez et exécutez depuis votre terminal." },
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      { q: "Ai-je besoin de clés API pour chaque fournisseur ?", a: "Non. Imagent gère l'authentification pour vous. Un seul jeton d'identité couvre tous les outils du registre." },
      { q: "Comment fonctionne la tarification ?", a: "Paiement par appel. Chaque outil publie son propre tarif par appel, et vous êtes facturé exactement ce montant depuis un solde unique." },
      { q: "Un fournisseur a échoué. Suis-je facturé ?", a: "Non. Les appels échoués ne sont pas facturés. Vous ne payez que pour les réponses réussies." },
      { q: "Quels frameworks d'agents sont pris en charge ?", a: "Tout framework prenant en charge MCP, A2A ou Function Calling. Fonctionne avec LangChain, CrewAI, AutoGen et les agents personnalisés." },
      { q: "Qu'en est-il des limites de débit ?", a: "Chaque outil définit ses propres limites de débit. Imagent les applique de manière transparente et met en file d'attente les requêtes excédentaires." },
    ],
  },
  cta: {
    title: "Publiez vos agents et outils",
    subtitle: "Imagent est open source. Contribuez avec votre outil ou commencez à construire — bâtissons ensemble l'économie des agents.",
    primary: "Rejoindre le projet GitHub",
    primaryHref: "https://github.com/Agent1019/imagent",
    secondary: "Lire la documentation",
  },
  footer: { tagline: "La couche d'infrastructure de l'économie des agents. Découvrez, authentifiez et payez par appel.", product: "Produit", developers: "Développeurs", company: "Entreprise", copyright: "© 2026 imagent. Tous droits réservés.", explore: "Explorer", rankings: "Classements", pricing: "Tarifs", documentation: "Documentation", apiReference: "Référence API", blog: "Blog", about: "À propos", careers: "Carrières", privacy: "Confidentialité", terms: "Conditions" },
  explore: {
    title: "Explorer les serveurs MCP", subtitle: "Parcourez des centaines d'outils conçus pour les agents IA. Filtrez par catégorie pour trouver les capacités dont vous avez besoin.",
    categories: "Catégories", showing: "Affichage", inCategory: "dans",
    noTools: "Aucun outil trouvé dans cette catégorie.", viewAll: "Voir tous les outils",
    endpoints: "points d'accès", installs: "installations", toolsCount: "outils",
    catLabels: { All: "Tous", Search: "Recherche", Data: "Données", Finance: "Finance", Social: "Social", Communication: "Communication", DevTools: "Outils de dev", "AI/ML": "IA/ML", Productivity: "Productivité", Media: "Médias", "E-commerce": "E-commerce", Jobs: "Emploi", Travel: "Voyage", Weather: "Météo", News: "Actualités", Legal: "Juridique", Software: "Logiciels", Maps: "Cartes", Marketing: "Marketing", Analytics: "Analytique", Trade: "Commerce", Agents: "Agents", Other: "Autre" },
  },
  toolDetail: {
    trustScore: "Score de confiance", terminal: "terminal", copyCmd: "Copier la commande",
    endpointsTitle: "Points d'accès", endpointsDesc: "Points d'accès API disponibles pour ce serveur MCP.",
    pricingTitle: "Tarifs", pricingDesc: "Choisissez le forfait adapté à votre utilisation. Tous les forfaits incluent les fonctionnalités essentielles.",
    free: "Gratuit", pro: "Pro", enterprise: "Entreprise", perMonth: "/mois", custom: "Sur mesure",
    mostPopular: "Le plus populaire", getStarted: "Commencer", contactSales: "Contacter les ventes",
    relatedTitle: "Outils associés", relatedDesc: "Autres serveurs MCP qui complètent",
    freeFeatures: ["1 000 appels/mois", "Support communautaire", "Latence standard", "Portées d'authentification de base"],
    proFeatures: ["100 000 appels/mois", "Support prioritaire", "Routage à faible latence", "Toutes les portées d'authentification", "Événements Webhook"],
    enterpriseFeatures: ["Appels illimités", "Support dédié", "Garantie SLA", "Portées personnalisées", "Option sur site", "Journaux d'audit"],
    epList: "Liste de toutes les capacités et fonctions d'outil disponibles sur ce serveur.",
    epInvoke: "Invoquer une fonction d'outil spécifique avec des paramètres structurés.",
    epHealth: "Vérifier l'état de santé du serveur, la disponibilité et la latence moyenne.",
    epAuth: "Échanger un jeton d'identité agent (AIT) contre un jeton d'accès à portée limitée.",
    tabTools: "Tools", tabComments: "Comments", tabChangelog: "Changelog",
    availableTools: "Available Tools", toolsDesc: "tools that your agent can invoke.",
    install: "Install", refresh: "Refresh", share: "Share", copy: "Copy", copied: "Copied!",
    installCli: "CLI", installMcp: "MCP Server", installJson: "JSON Config", installSkill: "Skill",
    recommended: "Recommended", httpLabel: "HTTP", manual: "Manual", oneLiner: "One-liner",
    remoteService: "Remote Service", remoteServiceDesc: "This tool runs remotely on the provider's infrastructure. No local installation or setup required.",
    tags: "Tags", links: "Links",
    githubRepo: "GitHub Repository", documentation: "Documentation", homepage: "Homepage", reportIssue: "Report Issue",
    version: "Version", installs: "Installs", category: "Category", protocol: "Protocol", license: "License",
    latest: "Latest",
    installConfig: "Installation", viewDetails: "Voir les détails",
    tabInstall: "Installer", tabPublish: "Publier",
    iamAgent: "Je suis Agent", iamHuman: "Je suis Human",
    agentPromptHint: "Envoyez ce prompt à votre Agent pour installer ce serveur MCP",
    agentPromptLabel: "Agent prompt",
    copyPrompt: "Copier le Prompt",
  },
  rankings: {
    title: "Classements des agents", subtitle: "Suivez les serveurs MCP les plus populaires et leurs tendances d'utilisation sur la plateforme Imagent.",
    mostUsed: "Les plus utilisés", fastest: "Croissance la plus rapide", byCategory: "Par catégorie",
    tool: "Outil", category: "Catégorie", calls: "Appels", growth: "Croissance", status: "Statut",
    hot: "En vogue", rising: "En hausse", stable: "Stable",
    hotDesc: "Taux de croissance sur 30 jours supérieur à 50 %", risingDesc: "Taux de croissance sur 30 jours entre 20 et 50 %", stableDesc: "Taux de croissance sur 30 jours inférieur à 20 %",
    howWeCount: "Comment nous comptons", dataSources: "Sources de données", dataSourcesDesc: "Les classements sont dérivés des enregistrements d'appels API réels sur la plateforme Imagent.",
    callVolume: "Volume d'appels", callVolumeDesc: "Chaque invocation réussie compte comme un appel. Les appels échoués et les tentatives sont exclus.",
    growthRate: "Taux de croissance", growthRateDesc: "Le taux de croissance est le pourcentage de variation du volume d'appels par rapport à la période précédente de même durée.",
    statusBadges: "Badges de statut",
    descMostUsed: "Classés par appels API au cours des 30 derniers jours",
    descFastest: "Classés par taux de croissance sur 30 jours",
    descByCategory: "Meilleur outil de chaque catégorie par utilisation",
  },
  seo: {
    title: "Imagent — Découvrez, authentifiez et utilisez des serveurs MCP",
    description: "La couche d'infrastructure pour les agents IA. Découvrez des serveurs MCP, authentifiez les appels d'outils et payez à l'usage — le tout sur une seule plateforme.",
  },
};

const contentMap: Partial<Record<Locale, Content>> = { en, zh, ko, pt, it, es, ja, de, fr };

export function getContent(locale: Locale): Content {
  return contentMap[locale] ?? contentMap.en;
}
