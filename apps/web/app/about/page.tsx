import type { Metadata } from "next";
import PageShell from "@/app/components/PageShell";
import { getRequestContext } from "@/lib/i18n/request";

export async function generateMetadata(): Promise<Metadata> {
  const { zh } = await getRequestContext();
  return {
    title: zh ? "关于 - Imagent" : "About - Imagent",
    description: zh ? "Imagent 是 Agent 的工具发现与调用层。" : "Imagent is the discovery and invocation layer for agent tools.",
  };
}

export default async function AboutPage() {
  const { zh } = await getRequestContext();
  return (
    <PageShell title={zh ? "关于 Imagent" : "About Imagent"}>
      <p>
        {zh
          ? "Imagent 让 Agent 发现工具、完成认证，并按次付费调用。网站按域名区分语言：imagent.ai 是英文，zh.imagent.ai 是中文。"
          : "Imagent lets agents discover tools, authenticate, and pay per call. Language follows the host: imagent.ai is English and zh.imagent.ai is Chinese."}
      </p>
      <p>
        {zh
          ? "工具目录存在 Supabase。生产站点由 Vercel 提供，imagent.ai 经 Cloudflare 接入。"
          : "The tool catalog lives in Supabase. Production is served by Vercel, with imagent.ai proxied through Cloudflare."}
      </p>
    </PageShell>
  );
}
