import { headers } from "next/headers";
import { getLocaleFromHost } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import Layout from "@/app/layouts/Layout";
import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import { getAuthCopy } from "@/lib/auth-copy";
import { getAuthUser, isAuthConfigured, safeNext } from "@/lib/auth";

type AuthScreenProps = {
  mode: "login" | "signup";
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function AuthScreen({ mode, searchParams }: AuthScreenProps) {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);
  const t = getContent(locale);
  const copy = getAuthCopy(locale);
  const params = await searchParams;
  const nextPath = safeNext(params.next);
  const user = await getAuthUser();
  const title = mode === "signup" ? copy.signupTitle : copy.loginTitle;

  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <section className="flex min-h-[70vh] items-center justify-center px-4 pb-16 pt-28">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center sm:px-8">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="mt-3 text-balance text-sm leading-relaxed text-gray-400">{copy.subtitle}</p>

          <div className="mt-8">
            {user ? (
              <div>
                <p className="text-sm text-gray-400">{copy.signedIn}</p>
                <p className="mt-1 truncate text-sm font-medium text-white">{user.email || user.name}</p>
                <a href={nextPath} className="mt-6 flex items-center justify-center rounded-lg bg-[#2B7FFF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5A9FFF]">
                  {copy.continueLabel}
                </a>
                <form action="/auth/signout" method="post" className="mt-3">
                  <button type="submit" className="text-sm text-gray-400 underline-offset-2 transition hover:text-white hover:underline">
                    {copy.signOut}
                  </button>
                </form>
              </div>
            ) : isAuthConfigured() ? (
              <GoogleSignInButton
                label={mode === "signup" ? copy.googleSignUp : copy.googleSignIn}
                pendingLabel={copy.pending}
                nextPath={nextPath}
                errorFallback={copy.error}
              />
            ) : (
              <p role="status" className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300">
                {copy.unavailable}
              </p>
            )}
            {params.error && !user && (
              <p role="alert" className="mt-3 text-sm text-red-400">{copy.error}</p>
            )}
          </div>

          <p className="mt-6 text-xs leading-relaxed text-gray-500">
            {copy.termsLead}{" "}
            <a href="/terms" className="text-gray-400 underline-offset-2 hover:text-white hover:underline">{copy.terms}</a>
            {" "}{copy.and}{" "}
            <a href="/privacy" className="text-gray-400 underline-offset-2 hover:text-white hover:underline">{copy.privacy}</a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
