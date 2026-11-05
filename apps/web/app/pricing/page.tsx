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
    title: locale === "zh" ? "定价 - Imagent" : "Pricing - Imagent",
    description:
      locale === "zh"
        ? "简单透明的定价 — 按量付费，从免费到企业级方案。"
        : "Simple, transparent pricing — pay as you go, from free tier to enterprise plans.",
  };
}

const plans = [
  {
    nameEn: "Free",
    nameZh: "免费版",
    price: "$0",
    periodEn: "/mo",
    periodZh: "/月",
    descEn: "For developers getting started with agent tooling.",
    descZh: "适合刚开始使用 Agent 工具的开发者。",
    ctaEn: "Start Free",
    ctaZh: "免费开始",
    highlighted: false,
    featuresEn: [
      "1,000 API calls per month",
      "Community support",
      "Basic search & discovery",
      "Standard OAuth authentication",
      "Public server registry access",
    ],
    featuresZh: [
      "每月 1,000 次 API 调用",
      "社区支持",
      "基础搜索与发现",
      "标准 OAuth 认证",
      "公开 Server 注册表访问",
    ],
  },
  {
    nameEn: "Pro",
    nameZh: "专业版",
    price: "$49",
    periodEn: "/mo",
    periodZh: "/月",
    descEn: "For teams building production agent workflows.",
    descZh: "适合构建生产级 Agent 工作流的团队。",
    ctaEn: "Start Pro",
    ctaZh: "开始专业版",
    highlighted: true,
    featuresEn: [
      "50,000 API calls per month",
      "Priority support (< 4h response)",
      "Advanced search with vector embeddings",
      "Advanced auth with scoped permissions",
      "Usage analytics dashboard",
      "Custom webhooks & event streams",
    ],
    featuresZh: [
      "每月 50,000 次 API 调用",
      "优先支持（< 4 小时响应）",
      "基于向量嵌入的高级搜索",
      "支持作用域权限的高级认证",
      "用量分析仪表盘",
      "自定义 Webhook 与事件流",
    ],
  },
  {
    nameEn: "Enterprise",
    nameZh: "企业版",
    price: "Custom",
    priceZh: "定制",
    periodEn: "",
    periodZh: "",
    descEn: "For organizations with scale, compliance, and SLA needs.",
    descZh: "适合有规模、合规和 SLA 需求的组织。",
    ctaEn: "Contact Sales",
    ctaZh: "联系销售",
    highlighted: false,
    featuresEn: [
      "Unlimited API calls",
      "Dedicated support & SLA (99.99%)",
      "Private server registry",
      "SSO / SAML integration",
      "Custom contracts & invoicing",
      "On-premise deployment option",
    ],
    featuresZh: [
      "无限 API 调用",
      "专属支持与 SLA（99.99%）",
      "私有 Server 注册表",
      "SSO / SAML 集成",
      "自定义合同与发票",
      "可选私有化部署",
    ],
  },
];

const faqs = [
  {
    qEn: "What counts as an API call?",
    qZh: "什么算一次 API 调用？",
    aEn: "Each invocation of an MCP server through the Imagent API counts as one call. This includes search queries, tool invocations, and billing meter events. Authentication handshakes and metadata lookups do not count.",
    aZh: "通过 Imagent API 每次调用 MCP Server 算作一次调用。包括搜索查询、工具调用和计费计量事件。认证握手和元数据查找不计入。",
  },
  {
    qEn: "Can I upgrade or downgrade at any time?",
    qZh: "可以随时升级或降级吗？",
    aEn: "Yes. Plan changes take effect immediately. When upgrading, you get a prorated credit for the remaining time on your current plan. Downgrades apply at the end of your current billing cycle.",
    aZh: "可以。方案变更立即生效。升级时，你会获得当前方案剩余时间的按比例抵扣。降级在当前计费周期结束时生效。",
  },
  {
    qEn: "What happens if I exceed my API call limit?",
    qZh: "超出 API 调用限额怎么办？",
    aEn: "On the Free plan, calls are rate-limited once you hit the cap. On Pro, overage calls are billed at $0.002 per call. You can set hard spend limits in your dashboard to prevent unexpected charges.",
    aZh: "免费版达到上限后会被限流。专业版的超额调用按每次 $0.002 计费。你可以在仪表盘中设置硬性消费上限，防止意外费用。",
  },
  {
    qEn: "Do you offer discounts for startups or open-source projects?",
    qZh: "对初创公司或开源项目有折扣吗？",
    aEn: "Yes. We offer a 50% discount for verified startups (under Series A) and free Pro plans for qualifying open-source projects. Contact us with your project details to apply.",
    aZh: "有。我们为经过验证的初创公司（A 轮之前）提供 50% 折扣，为符合条件的开源项目提供免费专业版。请与我们联系并提供项目详情以申请。",
  },
  {
    qEn: "How does Enterprise pricing work?",
    qZh: "企业版定价是怎样的？",
    aEn: "Enterprise pricing is custom and based on your expected call volume, SLA requirements, and deployment model. Our sales team will work with you to build a plan that fits. Volume discounts start at 100K+ calls/month.",
    aZh: "企业版定价是定制的，基于你的预期调用量、SLA 要求和部署模式。我们的销售团队会与你一起制定合适的方案。10 万+ 调用/月起享受批量折扣。",
  },
];

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default async function PricingPage() {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale: Locale = getLocaleFromHost(host);
  const t = getContent(locale);
  const zh = locale === "zh";

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <div className="pt-24 pb-20 px-6 bg-[#0a0a0a] min-h-screen">
        {/* Hero */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {zh ? "简单透明的定价" : "Simple, transparent pricing"}
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            {zh
              ? "从免费开始，按量扩展。无隐藏费用，随时可升降级。"
              : "Start free, scale as you grow. No hidden fees, upgrade or downgrade anytime."}
          </p>
        </section>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.02] p-1">
            <span className="px-5 py-2 text-sm font-medium rounded-md bg-white/10 text-white">
              {zh ? "按量付费" : "Pay as you go"}
            </span>
            <span className="px-5 py-2 text-sm text-gray-500">
              {zh ? "企业方案" : "Enterprise"}
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-24">
          {plans.map((plan) => {
            const price = zh && plan.priceZh ? plan.priceZh : plan.price;
            const period = zh ? plan.periodZh : plan.periodEn;
            const features = zh ? plan.featuresZh : plan.featuresEn;
            const name = zh ? plan.nameZh : plan.nameEn;
            const desc = zh ? plan.descZh : plan.descEn;
            const cta = zh ? plan.ctaZh : plan.ctaEn;

            return (
              <div
                key={plan.nameEn}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  plan.highlighted
                    ? "border-white/20 bg-white/[0.04] shadow-lg shadow-white/[0.02]"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-black text-xs font-semibold">
                    {zh ? "推荐" : "Recommended"}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">{price}</span>
                  <span className="text-gray-500 text-sm">{period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.nameEn === "Enterprise" ? "/contact" : "/signup"}
                  className={`block text-center py-3 rounded-lg text-sm font-medium transition ${
                    plan.highlighted
                      ? "bg-white text-black hover:bg-gray-200"
                      : "border border-white/10 text-white hover:border-white/25 hover:bg-white/5"
                  }`}
                >
                  {cta}
                </a>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            {zh ? "常见问题" : "FAQ"}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.qEn}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
              >
                <h3 className="text-base font-semibold text-white mb-2">
                  {zh ? faq.qZh : faq.qEn}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {zh ? faq.aZh : faq.aEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-10">
            <h2 className="text-2xl font-bold text-white mb-3">
              {zh ? "不确定选哪个方案？" : "Need help choosing?"}
            </h2>
            <p className="text-gray-400 mb-6">
              {zh
                ? "我们的团队可以帮你找到最适合你用例的方案。"
                : "Our team can help you find the right plan for your use case."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                {zh ? "联系销售" : "Talk to Sales"}
              </a>
              <a
                href="/docs"
                className="px-6 py-3 border border-white/15 rounded-lg text-sm font-medium hover:border-white/30 hover:bg-white/5 transition"
              >
                {zh ? "阅读文档" : "Read the Docs"}
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
