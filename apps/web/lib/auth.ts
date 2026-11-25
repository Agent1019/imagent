import { createClient } from "@/lib/supabase/server";

export type AuthUser = {
  email: string;
  name: string;
  avatar: string | null;
};

export function isAuthConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/** Only same-site relative paths. Blocks protocol-relative and backslash open redirects. */
export function safeNext(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || value.includes("\n")) {
    return "/";
  }
  return value;
}

export function publicOrigin(request: Request): string {
  const url = new URL(request.url);
  const forwarded = request.headers.get("x-forwarded-host") || request.headers.get("host") || url.host;
  const host = forwarded.split(",")[0].trim();
  const hostname = host.split(":")[0];
  const allowed = hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "127.0.0.1" || hostname === "imagent.ai" || hostname.endsWith(".imagent.ai");
  if (!allowed) return url.origin;
  const local = hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "127.0.0.1";
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
  const proto = local ? (forwardedProto || url.protocol.replace(":", "")) : "https";
  return `${proto}://${host}`;
}

function safeAvatar(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

export async function getAuthUser(): Promise<AuthUser | null> {
  if (!isAuthConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    const meta = data.user.user_metadata ?? {};
    const email = data.user.email || "";
    const name = String(meta.full_name || meta.name || email);
    return { email, name, avatar: safeAvatar(meta.avatar_url) };
  } catch {
    return null;
  }
}
