import type { Metadata } from "next";
import PageShell from "@/app/components/PageShell";
import { getRequestContext } from "@/lib/i18n/request";

export async function generateMetadata(): Promise<Metadata> {
  const { zh } = await getRequestContext();
  return { title: zh ? "隐私 - Imagent" : "Privacy - Imagent" };
}

export default async function PrivacyPage() {
  const { zh } = await getRequestContext();
  return (
    <PageShell title={zh ? "隐私说明" : "Privacy"}>
      <p>
        {zh
          ? "账号邮箱和密码由 Supabase Auth 保存。密码不会出现在这个网站的数据库表里。发布的工具名称、说明，以及社区帖子的标题和正文，对所有访问者可见。"
          : "Account email and password are stored by Supabase Auth. Passwords are not written to this site's tables. Published tool names, descriptions, and community post titles and bodies are visible to every visitor."}
      </p>
      <p>
        {zh
          ? "调用记录表不对匿名访客开放。站点日志由 Vercel 和 Cloudflare 按它们自己的保留策略保存。"
          : "Call records are not readable by anonymous visitors. Site logs are kept by Vercel and Cloudflare under their own retention policies."}
      </p>
    </PageShell>
  );
}
