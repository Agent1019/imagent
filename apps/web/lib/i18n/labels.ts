export const categoryLabels: Record<string, { en: string; zh: string }> = {
  All: { en: "All", zh: "全部" },
  Search: { en: "Search", zh: "搜索" },
  Data: { en: "Data", zh: "数据" },
  Finance: { en: "Finance", zh: "金融" },
  Social: { en: "Social", zh: "社交" },
  Communication: { en: "Communication", zh: "通讯" },
  DevTools: { en: "DevTools", zh: "开发工具" },
  "Developer Tools": { en: "Developer Tools", zh: "开发工具" },
  "AI/ML": { en: "AI/ML", zh: "AI/ML" },
  Productivity: { en: "Productivity", zh: "生产力" },
  Media: { en: "Media", zh: "媒体" },
  Documents: { en: "Documents", zh: "文档" },
};

export const communityCategoryLabels: Record<string, { en: string; zh: string }> = {
  mcp: { en: "MCP Development", zh: "MCP 开发" },
  agent: { en: "Agent Framework", zh: "Agent 框架" },
  tools: { en: "Tool Sharing", zh: "工具分享" },
  qa: { en: "Q&A", zh: "问答" },
  announcements: { en: "Announcements", zh: "公告" },
};

export const statusLabels: Record<"hot" | "rising" | "stable", { en: string; zh: string }> = {
  hot: { en: "Hot", zh: "热门" },
  rising: { en: "Rising", zh: "上升" },
  stable: { en: "Stable", zh: "稳定" },
};

export function localizedLabel(
  map: Record<string, { en: string; zh: string }>,
  key: string,
  zh: boolean
) {
  const item = map[key];
  if (!item) return key;
  return zh ? item.zh : item.en;
}

export const toolBlurbs: Record<string, { en: string; zh: string; category: string }> = {
  firecrawl: {
    category: "Data",
    en: "Web scraping and crawling API for AI agents. Extract structured data from any URL.",
    zh: "AI Agent 网页抓取 API。从任意 URL 提取结构化数据。",
  },
  apollo: {
    category: "Search",
    en: "B2B contact and company data API. Find decision-makers and enrich lead data.",
    zh: "B2B 联系人与公司数据 API。发现决策者并丰富线索数据。",
  },
  tavily: {
    category: "Search",
    en: "AI-optimized search engine for LLM agents. Real-time, accurate search results.",
    zh: "为 LLM Agent 优化的搜索引擎。实时、准确的搜索结果。",
  },
  "brave-search": {
    category: "Search",
    en: "Privacy-preserving search API. Independent web index with no tracking.",
    zh: "隐私保护搜索 API。独立网页索引，无追踪。",
  },
  e2b: {
    category: "DevTools",
    en: "Code interpreter sandbox for AI agents. Run Python and JS in secure sandboxes.",
    zh: "AI Agent 代码解释器沙箱。在安全沙箱中运行 Python 和 JS。",
  },
  composio: {
    category: "Productivity",
    en: "Unified tool integration platform. Connect 150+ apps to your AI agents.",
    zh: "统一工具集成平台。将 150+ 应用连接到 AI Agent。",
  },
  browserbase: {
    category: "DevTools",
    en: "Cloud browser infrastructure for AI agents. Headless Chrome with full control.",
    zh: "AI Agent 云端浏览器基础设施。完全可控的无头 Chrome。",
  },
  resend: {
    category: "Communication",
    en: "Email API for developers and agents. Send transactional emails at scale.",
    zh: "面向开发者和 Agent 的邮件 API。大规模发送事务邮件。",
  },
  stripe: {
    category: "Finance",
    en: "Payment processing and financial infrastructure. Accept payments and manage subscriptions.",
    zh: "支付处理与金融基础设施。接受支付并管理订阅。",
  },
  slack: {
    category: "Communication",
    en: "Team messaging and collaboration. Send messages, manage channels, and automate workflows.",
    zh: "团队消息与协作。发送消息、管理频道并自动化工作流。",
  },
  notion: {
    category: "Productivity",
    en: "Workspace and knowledge management. Read, write, and organize team knowledge.",
    zh: "工作空间与知识管理。读取、写入并组织团队知识。",
  },
  github: {
    category: "DevTools",
    en: "Code hosting and collaboration. Manage repos, issues, pull requests, and CI/CD.",
    zh: "代码托管与协作。管理仓库、Issue、PR 和 CI/CD。",
  },
};
