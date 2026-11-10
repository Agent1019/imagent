"use client";
import { useState } from "react";

export default function CopyButton({ isZh }: { isZh?: boolean } = {}) {
  const [toast, setToast] = useState(false);

  function handleCopy() {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  return (
    <>
      <button
        onClick={handleCopy}
        className="shrink-0 flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-500 hover:text-white hover:bg-white/5 transition"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Copy
      </button>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="px-4 py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-medium shadow-lg shadow-emerald-500/25 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {isZh ? "功能开发中，敬请期待" : "Coming soon, stay tuned!"}
          </div>
        </div>
      )}
    </>
  );
}
