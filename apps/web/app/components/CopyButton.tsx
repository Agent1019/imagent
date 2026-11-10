"use client";
import { useState } from "react";

export default function CopyButton() {
  const [copied, setCopied] = useState(false);

  function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
    const container = e.currentTarget.closest(".code-block");
    const el = container?.querySelector("code, pre");
    if (el) {
      navigator.clipboard.writeText(el.textContent || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-500 hover:text-white hover:bg-white/5 transition"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
