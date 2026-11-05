import type { Metadata } from "next";
import PageShell from "@/app/components/PageShell";
import { getRequestContext } from "@/lib/i18n/request";

const pages: Record<string, { en: string; zh: string; bodyEn: string; bodyZh: string }> = {
  api: {
    en: "API reference",
    zh: "API 参考",
    bodyEn: "The public registry endpoint is GET /api/v1/search?q=pdf. It returns published packages from Supabase.",
    bodyZh: "公开目录接口是 GET /api/v1/search?q=pdf。它返回 Supabase 里已发布的工具。",
  },
  "api/search": {
    en: "GET /api/v1/search",
    zh: "GET /api/v1/search",
    bodyEn: "Pass q to filter by name or description. The response is { query, results }. Unpublished rows are hidden by row-level security.",
    bodyZh: "用 q 按名称或说明过滤。响应是 { query, results }。未发布的行会被行级安全策略挡住。",
  },
  "api/invoke": {
    en: "Invoke",
    zh: "调用",
    bodyEn: "Invocation is metered per call. Install records are not readable with the public key.",
    bodyZh: "调用按次计量。使用公开密钥读不到调用记录。",
  },
  "api/billing": {
    en: "Billing",
    zh: "计费",
    bodyEn: "There is no subscription. Successful tool calls are the unit of billing.",
    bodyZh: "没有订阅。成功的工具调用是计费单位。",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { zh } = await getRequestContext();
  const { slug } = await params;
  const key = slug.join("/");
  const page = pages[key];
  const title = page ? (zh ? page.zh : page.en) : key;
  return { title: `${title} - Imagent`, robots: { index: false, follow: false } };
}

export default async function DocsSlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { zh } = await getRequestContext();
  const { slug } = await params;
  const key = slug.join("/");
  const page = pages[key];
  const title = page ? (zh ? page.zh : page.en) : key;
  const body = page
    ? zh
      ? page.bodyZh
      : page.bodyEn
    : zh
      ? "这一节的详细说明还在整理。命令行用法可以从仓库里的 packages/cli 看起。"
      : "The long-form writeup for this section is still being written. CLI behavior starts in packages/cli.";
  return (
    <PageShell title={title}>
      <p>{body}</p>
      <p>
        <a href="/docs" className="text-white underline">
          {zh ? "返回文档" : "Back to docs"}
        </a>
      </p>
    </PageShell>
  );
}
