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
      <div className="relative group">
        {/* Ambient glow — always on, stronger on hover */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500/20 via-rose-500/20 to-purple-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-500/40 via-rose-500/30 to-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Terminal container */}
        <div className="relative rounded-2xl border border-white/15 bg-[#111111] overflow-hidden shadow-2xl shadow-black/50">
          {/* macOS title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-[11px] text-gray-600 ml-2 font-mono">terminal</span>
          </div>

          {/* Command area */}
          <div className="flex items-center px-5 py-4">
            <span className="text-emerald-400 text-sm font-mono mr-3 select-none shrink-0">❯</span>
            <code className="flex-1 text-sm md:text-base text-gray-200 font-mono tracking-wide select-all">
              {text}
            </code>
            <button
              onClick={handleCopy}
              className={`ml-4 shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                copied
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "bg-gradient-to-r from-orange-500/15 to-purple-500/15 text-white border border-white/10 hover:border-white/25 hover:from-orange-500/25 hover:to-purple-500/25"
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
    </div>
  );
}
