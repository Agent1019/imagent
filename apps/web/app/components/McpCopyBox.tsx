"use client";

import { useState } from "react";

export default function McpCopyBox({ text, guide }: { text: string; guide: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-10 max-w-lg mx-auto">
      <p className="text-sm text-gray-500 mb-2">{guide}</p>
      <div className="relative group">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/10 via-rose-500/10 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition" />
        <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition">
          <span className="pl-4 pr-2 text-gray-600 text-sm select-none">$</span>
          <code className="flex-1 py-3.5 bg-transparent text-gray-300 text-sm select-all">{text}</code>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-3.5 text-sm text-gray-500 hover:text-white transition border-l border-white/10 hover:bg-white/5"
            title="Copy"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-400 text-xs">Copied</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-xs">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
