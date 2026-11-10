"use client";

import { useState } from "react";

export default function McpCopyBox({ text, guide, copyLabel, copiedLabel }: { text: string; guide: string; copyLabel: string; copiedLabel: string }) {
  const [toast, setToast] = useState(false);

  const handleCopy = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto">
      <p className="text-sm text-gray-500 mb-2">{guide}</p>
      <div className="flex items-center rounded-xl border border-white/10 bg-neutral-800 p-2 shadow-lg shadow-black/30">
        <span className="text-emerald-400/80 text-sm font-mono px-2 select-none shrink-0">$</span>
        <code className="flex-1 text-sm md:text-base text-gray-300 font-mono select-all truncate min-w-0 text-left">
          {text}
        </code>
        <button
          onClick={handleCopy}
          className="shrink-0 w-[90px] flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-white text-black hover:bg-gray-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copyLabel}
        </button>
      </div>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="px-4 py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-medium shadow-lg shadow-emerald-500/25 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Coming soon, stay tuned!
          </div>
        </div>
      )}
    </div>
  );
}
