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
    robots: { index: false, follow: false },
    description:
      locale === "zh"
        ? "平台免费，按次扣费。无订阅、无套餐，充值即用，工具调用零加价。"
        : "Platform free, pay per call. No subscriptions, no plans. Recharge and use. Zero markup on tool prices.",
  };
}

const packages = [
  {
    nameEn: "Starter",
    nameZh: "入门包",
    price: "$10",
    calls: "1,000",
    perCallEn: "$0.010/call",
    perCallZh: "$0.010/次",
    discountEn: null,
    discountZh: null,
    highlighted: false,
    badgeEn: null,
    badgeZh: null,
  },
  {
    nameEn: "Standard",
    nameZh: "标准包",
    price: "$45",
    calls: "5,000",
    perCallEn: "$0.009/call",
    perCallZh: "$0.009/次",
    discountEn: "10% off",
    discountZh: "9折",
    highlighted: false,
    badgeEn: null,
    badgeZh: null,
  },
  {
    nameEn: "Popular",
    nameZh: "热门包",
    price: "$80",
    calls: "10,000",
    perCallEn: "$0.008/call",
    perCallZh: "$0.008/次",
    discountEn: "20% off",
    discountZh: "8折",
    highlighted: true,
    badgeEn: "Best Value",
    badgeZh: "超值",
  },
  {
    nameEn: "Bulk",
    nameZh: "批量包",
    price: "$350",
    calls: "50,000",
    perCallEn: "$0.007/call",
    perCallZh: "$0.007/次",
    discountEn: "30% off",
    discountZh: "7折",
    highlighted: false,
    badgeEn: null,
    badgeZh: null,
  },
];

const faqs = [
  {
    qEn: "How does credit deduction work?",
    qZh: "充值扣费怎么运作？",
    aEn: "Recharge your wallet with a credit package. Each time you call an MCP server tool through the Imagent API, credits are deducted from your balance at the per-call rate of your package. When your balance runs low, simply recharge again.",
    aZh: "充值后额度进入你的钱包余额。每次通过 Imagent API 调用 MCP Server 工具时，按你所选套餐的单价从余额中扣费。余额不足时，再次充值即可继续使用。",
  },
  {
    qEn: "Do credits expire?",
    qZh: "充值会过期吗？",
    aEn: "No, credits never expire. Once you recharge, the credits remain in your wallet until you use them. There is no time pressure — use them at your own pace.",
    aZh: "不会。充值后额度永久保留在你的钱包中，直到你使用完毕。没有时间压力，按你自己的节奏使用。",
  },
  {
    qEn: "What if I run out of credits?",
    qZh: "余额不足怎么办？",
    aEn: "When your credit balance reaches zero, API calls will pause until you recharge. You will not be charged unexpectedly — your calls simply stop working until you top up your wallet. You can set balance alerts in your dashboard to get notified before running out.",
    aZh: "余额归零后，API 调用会暂停，直到你再次充值。不会产生意外费用——调用只是停止工作，直到你充值。你可以在仪表盘中设置余额提醒，提前收到通知。",
  },
  {
    qEn: "Can I get a refund?",
    qZh: "可以退款吗？",
    aEn: "Unused credits can be refunded within 30 days of purchase. Once credits are partially used, the remaining balance is non-refundable but never expires. Contact our support team to initiate a refund request.",
    aZh: "购买后 30 天内未使用的额度可以退款。已部分使用的额度，剩余部分不可退款但永不过期。请联系我们的支持团队发起退款申请。",
  },
  {
    qEn: "How is this different from subscriptions?",
    qZh: "这和订阅制有什么区别？",
    aEn: "Unlike subscriptions, you pay once and use at your own pace — no monthly bills, no rollover waste, no plan lock-in. You only pay for what you actually use, and bulk recharge packages give you volume discounts without any recurring commitment.",
    aZh: "与订阅制不同，你只需一次付费，按自己的节奏使用——没有月费、没有浪费、没有套餐绑定。你只为实际使用的付费，批量充值还能享受折扣，无需任何周期性承诺。",
  },
];

function WalletIcon() {
  return (
    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12V7H5a2 2 0 010-4h14v4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5v14a2 2 0 002 2h16v-5" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 15h3" />
      <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth={1.5} />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5a1.97 1.97 0 011.4.56l7.04 7.04a2 2 0 010 2.83l-4.01 4.01a2 2 0 01-2.83 0L6.56 10.4A2 2 0 016 9V4a1 1 0 011-1z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-6 h-6 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg className="w-6 h-6 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h18l-2 7H5L3 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 21v-6h6v6" />
    </svg>
  );
}

function AdIcon() {
  return (
    <svg className="w-6 h-6 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-semibold text-white">
      {n}
    </span>
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
      <div className="pt-32 pb-20 px-4 md:px-6 bg-[#0a0a0a] min-h-screen">

        {/* ── Hero ── */}
        <section className="max-w-7xl mx-auto text-center mb-20 px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {zh ? "平台免费，按次扣费" : "Platform Free, Pay Per Call"}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {zh
              ? "无订阅、无套餐。充值即用，工具调用零加价。"
              : "No subscriptions. No plans. Recharge and use. We never mark up tool prices."}
          </p>
        </section>

        {/* ── How It Works ── */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            {zh ? "如何使用" : "How It Works"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
              <div className="flex justify-center mb-4">
                <WalletIcon />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <StepNumber n={1} />
                <h3 className="text-lg font-semibold text-white">
                  {zh ? "充值" : "Recharge"}
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {zh
                  ? "选择充值套餐，额度进入你的钱包余额。"
                  : "Pick a credit package and top up your wallet balance."}
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
              <div className="flex justify-center mb-4">
                <ApiIcon />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <StepNumber n={2} />
                <h3 className="text-lg font-semibold text-white">
                  {zh ? "调用" : "Call"}
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {zh
                  ? "使用任意 MCP Server，每次调用按单价从余额扣费。"
                  : "Use any MCP server. Each call deducts credits at your per-call rate."}
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
              <div className="flex justify-center mb-4">
                <TagIcon />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <StepNumber n={3} />
                <h3 className="text-lg font-semibold text-white">
                  {zh ? "省钱" : "Save"}
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {zh
                  ? "批量充值最高可享 30% 折扣，用得越多越划算。"
                  : "Bulk recharge gets up to 30% discount — the more you recharge, the more you save."}
              </p>
            </div>
          </div>
        </section>

        {/* ── Recharge Packages ── */}
        <section className="max-w-7xl mx-auto mb-24">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            {zh ? "充值套餐" : "Recharge Packages"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => {
              const name = zh ? pkg.nameZh : pkg.nameEn;
              const perCall = zh ? pkg.perCallZh : pkg.perCallEn;
              const discount = zh ? pkg.discountZh : pkg.discountEn;
              const badge = zh ? pkg.badgeZh : pkg.badgeEn;

              return (
                <div
                  key={pkg.nameEn}
                  className={`relative rounded-2xl border p-8 flex flex-col ${
                    pkg.highlighted
                      ? "border-white/20 bg-white/[0.04] shadow-lg shadow-white/[0.02]"
                      : "border-white/5 bg-white/[0.02]"
                  }`}
                >
                  {badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-black text-xs font-semibold">
                      {badge}
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
                  </div>

                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">{pkg.price}</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-1">
                    {pkg.calls} {zh ? "次调用" : "calls"}
                  </p>
                  <p className="text-sm font-medium text-emerald-400 mb-1">
                    {perCall}
                  </p>
                  {discount && (
                    <p className="text-xs text-amber-400 font-medium mb-4">
                      {discount}
                    </p>
                  )}
                  {!discount && <div className="mb-4" />}

                  <div className="mt-auto pt-4">
                    <a
                      href="/signup"
                      className={`block text-center py-3 rounded-lg text-sm font-medium transition ${
                        pkg.highlighted
                          ? "bg-white text-black hover:bg-gray-200"
                          : "border border-white/10 text-white hover:border-white/25 hover:bg-white/5"
                      }`}
                    >
                      {zh ? "充值" : "Recharge"}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Why Is the Platform Free? ── */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            {zh ? "为什么免费？" : "Why Free?"}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            {zh
              ? "我们不从你的调用中赚钱。平台的收入来自以下途径："
              : "We earn nothing from your calls. Our revenue comes from:"}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Zero Markup */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <ShieldIcon />
              <h3 className="text-lg font-semibold text-white mt-4 mb-2">
                {zh ? "零加价" : "Zero Markup"}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {zh
                  ? "我们从不在工具提供方定价之上加收任何费用。你支付的就是工具的实际成本。"
                  : "We never add fees on top of tool provider prices. You pay exactly what the tool costs."}
              </p>
            </div>

            {/* Provider-Funded */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <StoreIcon />
              <h3 className="text-lg font-semibold text-white mt-4 mb-2">
                {zh ? "服务方付费" : "Provider-Funded"}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {zh
                  ? "工具提供方支付分销佣金给我们。就像应用商店模式一样。"
                  : "Tool providers pay us a commission for distribution. Like an app store model."}
              </p>
            </div>

            {/* Ad-Supported */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <AdIcon />
              <h3 className="text-lg font-semibold text-white mt-4 mb-2">
                {zh ? "广告支持" : "Ad-Supported"}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {zh
                  ? "可选的推广展示帮助提供方获得曝光。非侵入性，明确标注。"
                  : "Optional promoted listings help providers get discovered. Non-intrusive and clearly labeled."}
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
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

        {/* ── Bottom CTA ── */}
        <section className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-10">
            <h2 className="text-2xl font-bold text-white mb-3">
              {zh ? "赠送 $10 免费额度，立即开始" : "Start with $10 free credits"}
            </h2>
            <p className="text-gray-400 mb-6">
              {zh
                ? "注册即送 $10 免费额度，无需绑定信用卡，立即体验平台全部功能。"
                : "Sign up and get $10 in free credits. No credit card required. Experience the full platform instantly."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/signup"
                className="px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                {zh ? "立即充值" : "Recharge Now"}
              </a>
              <a
                href="/docs"
                className="px-6 py-3 border border-white/15 rounded-lg text-sm font-medium hover:border-white/30 hover:bg-white/5 transition"
              >
                {zh ? "阅读文档" : "Read Docs"}
              </a>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
