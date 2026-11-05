import type { Metadata } from "next";
import AuthForm from "@/app/components/AuthForm";
import PageShell from "@/app/components/PageShell";
import { getRequestContext } from "@/lib/i18n/request";

export async function generateMetadata(): Promise<Metadata> {
  const { zh } = await getRequestContext();
  return { title: zh ? "登录 - Imagent" : "Sign in - Imagent", robots: { index: false, follow: false } };
}

export default async function LoginPage() {
  const { zh } = await getRequestContext();
  return (
    <PageShell title={zh ? "登录" : "Sign in"} lede={zh ? "使用你的 Imagent 账号。" : "Use your Imagent account."}>
      <AuthForm mode="login" zh={zh} />
      <p>
        {zh ? "还没有账号？" : "No account yet?"}{" "}
        <a href="/signup" className="text-white underline">
          {zh ? "注册" : "Create one"}
        </a>
      </p>
    </PageShell>
  );
}
