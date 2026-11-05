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
    <div className="mt-10 max-w-xl mx-auto">
      <p className="text-sm text-gray-500 mb-3">{guide}</p>
      <div className="relative">
        <div className="flex items-center rounded-xl border border-white/15 bg-white/[0.03] overflow-hidden hover:border-white/25 transition">
          <span className="text-emerald-400 text-sm font-mono pl-5 pr-3 select-none shrink-0">❯</span>
          <code className="flex-1 py-4 text-sm md:text-base text-gray-200 font-mono tracking-wide select-all">
            {text}
          </code>
          <button
            onClick={handleCopy}
            className={`ml-4 shrink-0 flex items-center gap-2 px-5 py-4 text-sm font-medium transition-all duration-200 border-l border-white/10 ${
              copied
                ? "text-emerald-400 bg-emerald-500/10"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
