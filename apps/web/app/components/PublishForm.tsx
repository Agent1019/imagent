"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PublishForm({ zh }: { zh: boolean }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("0.1.0");
  const [error, setError] = useState("");
  const [created, setCreated] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setCreated("");
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError(zh ? "发布服务还没有配置。" : "Publishing is not configured yet.");
      return;
    }
    setPending(true);
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setPending(false);
      setError(zh ? "请先登录再发布。" : "Sign in before publishing.");
      return;
    }
    const { error: insertError } = await supabase.from("packages").insert({
      name: name.trim(),
      description: description.trim(),
      version: version.trim() || "0.1.0",
      author_id: userData.user.id,
      status: "published",
    });
    setPending(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setCreated(name.trim());
    setName("");
    setDescription("");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm text-gray-300">
        {zh ? "名称" : "Name"}
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/30"
        />
      </label>
      <label className="block text-sm text-gray-300">
        {zh ? "说明" : "Description"}
        <textarea
          required
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/30"
        />
      </label>
      <label className="block text-sm text-gray-300">
        {zh ? "版本" : "Version"}
        <input
          required
          value={version}
          onChange={(event) => setVersion(event.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/30"
        />
      </label>
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      {created ? (
        <p className="text-sm text-emerald-400">
          {zh ? `已发布 ${created}。` : `Published ${created}.`}{" "}
          <a href="/explore" className="underline">
            {zh ? "去探索" : "View explore"}
          </a>
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-gray-200 disabled:opacity-60"
      >
        {pending ? (zh ? "发布中…" : "Publishing…") : zh ? "发布" : "Publish"}
      </button>
    </form>
  );
}
