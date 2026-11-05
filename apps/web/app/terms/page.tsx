import type { Metadata } from "next";
import PageShell from "@/app/components/PageShell";
import { getRequestContext } from "@/lib/i18n/request";

export async function generateMetadata(): Promise<Metadata> {
  const { zh } = await getRequestContext();
  return { title: zh ? "条款 - Imagent" : "Terms - Imagent" };
}

export default async function TermsPage() {
  const { zh } = await getRequestContext();
  return (
    <PageShell title={zh ? "使用条款" : "Terms"}>
      <p>
        {zh
          ? "你可以浏览已发布的工具和社区帖子。发布工具或发帖需要注册账号，并且只能修改或删除自己的内容。"
          : "You can browse published tools and community posts. Publishing a tool or a post requires an account, and you can change or delete only your own records."}
      </p>
      <p>
        {zh
          ? "不要发布你没有权利公开的密钥、个人数据或他人内容。我们会删除明显违法或破坏服务的内容。"
          : "Do not publish secrets, personal data, or other people's content that you have no right to share. We remove content that is plainly illegal or that disrupts the service."}
      </p>
    </PageShell>
  );
}
