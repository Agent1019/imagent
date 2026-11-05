import type { Metadata } from "next";
import PageShell from "@/app/components/PageShell";
import PublishForm from "@/app/components/PublishForm";
import { getRequestContext } from "@/lib/i18n/request";

export async function generateMetadata(): Promise<Metadata> {
  const { zh } = await getRequestContext();
  return {
    title: zh ? "发布 - Imagent" : "Publish - Imagent",
    description: zh ? "把一个 Agent 工具发布到 Imagent。" : "Publish an agent tool on Imagent.",
  };
}

export default async function PublishPage() {
  const { zh } = await getRequestContext();
  return (
    <PageShell
      title={zh ? "发布工具" : "Publish a tool"}
      lede={zh ? "登录后的发布会写入 Supabase，并出现在搜索接口里。" : "Signed-in publishes are stored in Supabase and show up in the search API."}
    >
      <PublishForm zh={zh} />
      <p>
        <a href="/login" className="text-white underline">
          {zh ? "去登录" : "Sign in"}
        </a>
      </p>
    </PageShell>
  );
}
