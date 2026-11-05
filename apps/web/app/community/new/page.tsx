import type { Metadata } from "next";
import NewPostForm from "@/app/components/NewPostForm";
import PageShell from "@/app/components/PageShell";
import { getRequestContext } from "@/lib/i18n/request";

export async function generateMetadata(): Promise<Metadata> {
  const { zh } = await getRequestContext();
  return { title: zh ? "发帖 - Imagent" : "New post - Imagent", robots: { index: false, follow: false } };
}

export default async function NewCommunityPostPage() {
  const { zh } = await getRequestContext();
  return (
    <PageShell title={zh ? "发帖" : "New post"} lede={zh ? "帖子保存在 Supabase，登录后即可发布。" : "Posts are stored in Supabase. Sign in to publish one."}>
      <NewPostForm zh={zh} />
      <p>
        <a href="/login" className="text-white underline">
          {zh ? "去登录" : "Sign in"}
        </a>
      </p>
    </PageShell>
  );
}
