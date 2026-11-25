import { headers } from "next/headers";
import type { Metadata } from "next";
import { getLocaleFromHost } from "@/lib/i18n/config";
import { getAuthCopy } from "@/lib/auth-copy";
import AuthScreen from "@/app/components/AuthScreen";

type PageProps = { searchParams: Promise<{ error?: string; next?: string }> };

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const copy = getAuthCopy(getLocaleFromHost(host));
  return { title: `${copy.loginTitle} | Imagent`, robots: { index: false, follow: false } };
}

export default async function LoginPage({ searchParams }: PageProps) {
  return <AuthScreen mode="login" searchParams={searchParams} />;
}
