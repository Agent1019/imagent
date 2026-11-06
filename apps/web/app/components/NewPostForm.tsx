"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { communityCategoryLabels, localizedLabel } from "@/lib/i18n/labels";

const categories = ["mcp", "agent", "tools", "qa", "announcements"] as const;

export default function NewPostForm({ zh }: { zh: boolean }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("qa");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError(zh ? "社区还没有连上数据库。" : "The community database is not configured.");
      return;
    }
    setPending(true);
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setPending(false);
      setError(zh ? "请先登录再发帖。" : "Sign in before posting.");
      return;
    }
    const email = userData.user.email ?? "member";
    const authorName = email.split("@")[0] || "member";
    const { data, error: insertError } = await supabase
      .from("community_posts")
      .insert({
        title: title.trim(),
        body: body.trim(),
        category,
        author_id: userData.user.id,
        author_name: authorName,
      })
      .select("id")
      .single();
    setPending(false);
    if (insertError || !data) {
      setError(insertError?.message ?? (zh ? "发布失败。" : "Could not publish the post."));
      return;
    }
    window.location.href = `/community/${data.id}`;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm text-gray-300">
        {zh ? "分类" : "Category"}
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as (typeof categories)[number])}
          className="mt-1 w-full rounded-lg border border-white/10 bg-[#111] px-3 py-2 text-white outline-none focus:border-white/30"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {localizedLabel(communityCategoryLabels, item, zh)}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-gray-300">
        {zh ? "标题" : "Title"}
        <input
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/30"
        />
      </label>
      <label className="block text-sm text-gray-300">
        {zh ? "正文" : "Body"}
        <textarea
          required
          rows={8}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/30"
        />
      </label>
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-gray-200 disabled:opacity-60"
      >
        {pending ? (zh ? "发布中…" : "Posting…") : zh ? "发布" : "Post"}
      </button>
    </form>
  );
}
