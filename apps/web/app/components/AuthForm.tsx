"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm({ mode, zh }: { mode: "login" | "signup"; zh: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError(zh ? "登录服务还没有配置。" : "Sign-in is not configured yet.");
      return;
    }
    setPending(true);
    const supabase = createClient();
    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    setPending(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    if (mode === "signup" && !result.data.session) {
      setMessage(zh ? "注册成功。请查收确认邮件后再登录。" : "Account created. Confirm the email, then sign in.");
      return;
    }
    window.location.href = "/publish";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm text-gray-300">
        {zh ? "邮箱" : "Email"}
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/30"
        />
      </label>
      <label className="block text-sm text-gray-300">
        {zh ? "密码" : "Password"}
        <input
          type="password"
          required
          minLength={8}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/30"
        />
      </label>
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-gray-200 disabled:opacity-60"
      >
        {pending ? (zh ? "请稍候…" : "Please wait…") : mode === "login" ? (zh ? "登录" : "Sign in") : zh ? "创建账号" : "Create account"}
      </button>
    </form>
  );
}
