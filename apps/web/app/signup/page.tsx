import type { Metadata } from "next";
import AuthForm from "@/app/components/AuthForm";
import PageShell from "@/app/components/PageShell";
import { getRequestContext } from "@/lib/i18n/request";

export async function generateMetadata(): Promise<Metadata> {
  const { zh } = await getRequestContext();
  return { title: zh ? "注册 - Imagent" : "Sign up - Imagent", robots: { index: false, follow: false } };
}

export default async function SignupPage() {
  const { zh } = await getRequestContext();
  return (
    <PageShell title={zh ? "创建账号" : "Create an account"} lede={zh ? "注册后可以发布工具和发帖。" : "Sign up to publish tools and post in the community."}>
      <AuthForm mode="signup" zh={zh} />
      <p>
        {zh ? "已经有账号？" : "Already have an account?"}{" "}
        <a href="/login" className="text-white underline">
          {zh ? "登录" : "Sign in"}
        </a>
      </p>
    </PageShell>
  );
}
