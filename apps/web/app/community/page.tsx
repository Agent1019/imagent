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
    title: locale === "zh" ? "社区 - Imagent" : "Community - Imagent",
    robots: { index: false, follow: false },
    description:
      locale === "zh"
        ? "加入 Imagent 社区 — 与全球开发者一起构建 Agent 生态。"
        : "Join the Imagent community — build the agent ecosystem with developers worldwide.",
  };
}

/* ------------------------------------------------------------------ */
/*  GitHub Icon                                                       */
/* ------------------------------------------------------------------ */
function GitHubIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Discord Icon                                                      */
/* ------------------------------------------------------------------ */
function DiscordIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  X / Twitter Icon                                                  */
/* ------------------------------------------------------------------ */
function XIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Forum / Message Icon                                              */
/* ------------------------------------------------------------------ */
function ForumIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Arrow Icon (reusable)                                             */
/* ------------------------------------------------------------------ */
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

/* ================================================================== */
/*  PAGE                                                              */
/* ================================================================== */

export default async function CommunityPage() {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);
  const zh = locale === "zh";

  /* ---------- data ---------- */

  const channels = [
    {
      icon: <GitHubIcon />,
      name: "GitHub",
      descEn: "Open source contributions — browse code, file issues, and submit pull requests.",
      descZh: "开源贡献 — 浏览代码、提交 Issue 和 Pull Request。",
      countEn: "2.4k Stars",
      countZh: "2.4k Stars",
      href: "https://github.com/sunyuqing1019/imagent",
      ctaEn: "Star & Contribute",
      ctaZh: "Star & 贡献",
    },
    {
      icon: <DiscordIcon />,
      name: "Discord",
      descEn: "Real-time chat with developers — get help, share ideas, and collaborate.",
      descZh: "与开发者实时交流 — 获取帮助、分享想法、协同合作。",
      countEn: "3,200+ Members",
      countZh: "3,200+ 成员",
      href: "https://discord.gg/imagent",
      ctaEn: "Join Server",
      ctaZh: "加入服务器",
    },
    {
      icon: <XIcon />,
      name: "Twitter / X",
      descEn: "Latest news, product updates, and community highlights.",
      descZh: "最新动态、产品更新与社区精选。",
      countEn: "8.5k Followers",
      countZh: "8.5k 关注者",
      href: "https://x.com/imaboratAI",
      ctaEn: "Follow",
      ctaZh: "关注",
    },
    {
      icon: <ForumIcon />,
      name: "Forum",
      descEn: "In-depth discussions, Q&A, and long-form knowledge sharing.",
      descZh: "深度讨论、问答交流与长文知识分享。",
      countEn: "1,800+ Topics",
      countZh: "1,800+ 话题",
      href: "https://forum.imagent.ai",
      ctaEn: "Browse Topics",
      ctaZh: "浏览话题",
    },
  ];

  const discussions = [
    {
      tag: "MCP",
      titleEn: "Best practices for MCP server versioning and backwards compatibility",
      titleZh: "MCP Server 版本管理与向后兼容的最佳实践",
      excerptEn: "How do you handle breaking changes in your MCP server schemas without disrupting downstream agents?",
      excerptZh: "如何在不影响下游 Agent 的前提下处理 MCP Server Schema 的破坏性变更？",
      replies: 34,
      timeEn: "2h ago",
      timeZh: "2 小时前",
    },
    {
      tag: "Agents",
      titleEn: "Multi-agent orchestration patterns with A2A protocol",
      titleZh: "基于 A2A 协议的多 Agent 编排模式",
      excerptEn: "Sharing my experience building a pipeline of 5 agents that collaborate on document analysis tasks.",
      excerptZh: "分享我构建 5 个 Agent 协作完成文档分析任务流水线的经验。",
      replies: 28,
      timeEn: "5h ago",
      timeZh: "5 小时前",
    },
    {
      tag: "Tools",
      titleEn: "Building a custom MCP server for internal APIs — lessons learned",
      titleZh: "为内部 API 构建自定义 MCP Server — 经验总结",
      excerptEn: "A walkthrough of wrapping 12 REST endpoints into a single MCP server with auth and rate limiting.",
      excerptZh: "将 12 个 REST 端点封装为带认证和限流的单个 MCP Server 的完整实践。",
      replies: 19,
      timeEn: "8h ago",
      timeZh: "8 小时前",
    },
    {
      tag: "Security",
      titleEn: "Agent identity tokens vs API keys — which should you use?",
      titleZh: "Agent 身份令牌 vs API Key — 你该选哪个？",
      excerptEn: "Comparing security models for agent-to-tool authentication in production environments.",
      excerptZh: "对比生产环境中 Agent 到工具认证的安全模型。",
      replies: 42,
      timeEn: "1d ago",
      timeZh: "1 天前",
    },
    {
      tag: "Ecosystem",
      titleEn: "RFC: Standardized capability manifest format for tool discovery",
      titleZh: "RFC: 用于工具发现的标准化能力清单格式",
      excerptEn: "Proposing a unified manifest spec that works across MCP, A2A, and Function Calling protocols.",
      excerptZh: "提议一种跨 MCP、A2A 和 Function Calling 协议的统一清单规范。",
      replies: 56,
      timeEn: "1d ago",
      timeZh: "1 天前",
    },
    {
      tag: "Show & Tell",
      titleEn: "I built a Slack MCP server — here is the source code",
      titleZh: "我做了一个 Slack MCP Server — 附源码",
      excerptEn: "Open-source MCP server that lets agents read channels, send messages, and manage threads via Slack API.",
      excerptZh: "开源 MCP Server，让 Agent 通过 Slack API 读取频道、发送消息和管理会话线程。",
      replies: 71,
      timeEn: "2d ago",
      timeZh: "2 天前",
    },
  ];

  const contributors = [
    { initials: "AK", name: "Alex Kim", contributions: 342, badge: "Core", color: "bg-violet-500" },
    { initials: "SR", name: "Sara Ramirez", contributions: 287, badge: "Core", color: "bg-blue-500" },
    { initials: "JL", name: "Jun Li", contributions: 213, badge: "Core", color: "bg-emerald-500" },
    { initials: "MP", name: "Maya Patel", contributions: 198, badge: "Active", color: "bg-amber-500" },
    { initials: "TN", name: "Tomás Navarro", contributions: 156, badge: "Active", color: "bg-rose-500" },
    { initials: "YW", name: "Yuki Watanabe", contributions: 134, badge: "Active", color: "bg-cyan-500" },
    { initials: "OB", name: "Omar Benali", contributions: 89, badge: "New", color: "bg-orange-500" },
    { initials: "LC", name: "Lena Chen", contributions: 67, badge: "New", color: "bg-pink-500" },
  ];

  const events = [
    {
      month: zh ? "4月" : "APR",
      day: "18",
      titleEn: "MCP Server Building Webinar",
      titleZh: "MCP Server 构建线上研讨会",
      descEn: "Learn to build and publish your first MCP server in 60 minutes. Live Q&A with the core team.",
      descZh: "60 分钟内学会构建并发布你的第一个 MCP Server。与核心团队在线问答。",
      type: "Webinar",
      typeZh: "线上研讨",
    },
    {
      month: zh ? "5月" : "MAY",
      day: "03",
      titleEn: "Agent Hackathon 2026",
      titleZh: "Agent Hackathon 2026",
      descEn: "48-hour virtual hackathon. Build agent tools, win prizes, and get featured on the registry.",
      descZh: "48 小时线上黑客松。构建 Agent 工具、赢取奖品，并获推荐至注册表。",
      type: "Hackathon",
      typeZh: "黑客松",
    },
    {
      month: zh ? "5月" : "MAY",
      day: "22",
      titleEn: "SF Agent Dev Meetup",
      titleZh: "旧金山 Agent 开发者聚会",
      descEn: "In-person meetup in San Francisco. Lightning talks, demos, and networking with the community.",
      descZh: "旧金山线下聚会。闪电演讲、Demo 展示与社区交流。",
      type: "Meetup",
      typeZh: "线下聚会",
    },
  ];

  const badgeStyles: Record<string, string> = {
    Core: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    New: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  const tagColors: Record<string, string> = {
    MCP: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Agents: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    Tools: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Security: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    Ecosystem: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Show & Tell": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <div className="bg-[#0a0a0a] min-h-screen">
        {/* ============================================================ */}
        {/*  HERO                                                        */}
        {/* ============================================================ */}
        <section className="pt-32 pb-16 px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {zh ? "社区" : "Community"}
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              {zh
                ? "与全球开发者一起，构建下一代 Agent 基础设施生态。分享知识、贡献代码、共同成长。"
                : "Build the next-generation agent infrastructure ecosystem with developers worldwide. Share knowledge, contribute code, and grow together."}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-14">
              <div>
                <div className="text-3xl font-bold text-white">5,000+</div>
                <div className="text-sm text-gray-500 mt-1">
                  {zh ? "社区成员" : "Members"}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-sm text-gray-500 mt-1">
                  {zh ? "贡献者" : "Contributors"}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-500 mt-1">
                  {zh ? "国家和地区" : "Countries"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  COMMUNITY CHANNELS                                          */}
        {/* ============================================================ */}
        <section className="py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-10">
              {zh ? "加入社区" : "Community Channels"}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {channels.map((ch) => (
                <div
                  key={ch.name}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-6 flex flex-col hover:border-white/10 hover:bg-white/[0.04] transition group"
                >
                  <div className="text-gray-400 mb-4 group-hover:text-white transition">
                    {ch.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{ch.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                    {zh ? ch.descZh : ch.descEn}
                  </p>
                  <div className="text-xs text-gray-600 mb-4">
                    {zh ? ch.countZh : ch.countEn}
                  </div>
                  <a
                    href={ch.href}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-sm font-medium border border-white/10 text-white hover:border-white/25 hover:bg-white/5 transition"
                  >
                    {zh ? ch.ctaZh : ch.ctaEn}
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FEATURED DISCUSSIONS                                        */}
        {/* ============================================================ */}
        <section className="py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-10">
              {zh ? "热门话题" : "Hot Topics"}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {discussions.map((d) => (
                <a
                  key={d.titleEn}
                  href="https://forum.imagent.ai"
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 hover:bg-white/[0.04] transition block"
                >
                  <span
                    className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border mb-3 ${tagColors[d.tag] ?? "bg-white/5 text-gray-400 border-white/10"}`}
                  >
                    {d.tag}
                  </span>
                  <h3 className="text-sm font-semibold text-white mb-2 leading-snug">
                    {zh ? d.titleZh : d.titleEn}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    {zh ? d.excerptZh : d.excerptEn}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                      </svg>
                      {d.replies} {zh ? "回复" : "replies"}
                    </span>
                    <span>{zh ? d.timeZh : d.timeEn}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  TOP CONTRIBUTORS                                            */}
        {/* ============================================================ */}
        <section className="py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-10">
              {zh ? "贡献者" : "Top Contributors"}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {contributors.map((c) => (
                <div
                  key={c.name}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-5 flex flex-col items-center text-center hover:border-white/10 hover:bg-white/[0.04] transition"
                >
                  {/* Avatar placeholder */}
                  <div className={`w-12 h-12 rounded-full ${c.color} flex items-center justify-center text-white text-sm font-bold mb-3`}>
                    {c.initials}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-0.5">{c.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {c.contributions} {zh ? "次贡献" : "contributions"}
                  </p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${badgeStyles[c.badge]}`}>
                    {c.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  EVENTS                                                      */}
        {/* ============================================================ */}
        <section className="py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-10">
              {zh ? "近期活动" : "Upcoming Events"}
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              {events.map((ev) => (
                <div
                  key={ev.titleEn}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition flex flex-col"
                >
                  {/* Date badge */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                      <span className="text-xs text-gray-500 font-medium leading-none">{ev.month}</span>
                      <span className="text-xl font-bold text-white leading-tight">{ev.day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10 mb-2">
                        {zh ? ev.typeZh : ev.type}
                      </span>
                      <h3 className="text-sm font-semibold text-white leading-snug">
                        {zh ? ev.titleZh : ev.titleEn}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-5 flex-1">
                    {zh ? ev.descZh : ev.descEn}
                  </p>

                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-full py-2.5 rounded-lg text-sm font-medium border border-white/10 text-white hover:border-white/25 hover:bg-white/5 transition"
                  >
                    RSVP
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  CTA                                                         */}
        {/* ============================================================ */}
        <section className="py-20 px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                {zh ? "开始贡献" : "Start Contributing"}
              </h2>
              <p className="text-gray-400 mb-6">
                {zh
                  ? "Imagent 是开源项目。无论是修复 Bug、编写文档还是提交新功能，每一份贡献都让生态变得更好。"
                  : "Imagent is open source. Whether it is fixing bugs, writing docs, or building new features — every contribution makes the ecosystem better."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://github.com/sunyuqing1019/imagent"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                >
                  <GitHubIcon />
                  GitHub
                </a>
                <a
                  href="/docs"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-white/15 rounded-lg text-sm font-medium text-white hover:border-white/30 hover:bg-white/5 transition"
                >
                  {zh ? "阅读文档" : "Read the Docs"}
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
