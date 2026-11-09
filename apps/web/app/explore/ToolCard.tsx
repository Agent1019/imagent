"use client";

import { useState } from "react";

interface ToolCardProps {
  tool: {
    slug: string;
    name: string;
    description: string | null;
    category: string;
    tags: string[];
    endpoints: number;
    installCmd: string | null;
    installCount: number;
    trustScore: number;
    color: string;
  };
  isZh: boolean;
}

export function ToolCard({ tool, isZh }: ToolCardProps) {
  const [toast, setToast] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (tool.installCmd) {
      navigator.clipboard.writeText(tool.installCmd);
    }
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  function formatInstalls(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    return n.toString();
  }

  return (
    <div className="relative group rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 hover:bg-white/[0.04] transition">
      <a href={`/explore/${tool.slug}`} className="block">
        {/* Icon + Name */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm"
            style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
          >
            {tool.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm group-hover:text-white transition truncate">
              {tool.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
              {tool.description}
            </p>
          </div>
        </div>

        {/* Tags + Endpoints */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-gray-400 border border-white/5">
              {tag}
            </span>
          ))}
          {tool.endpoints > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {tool.endpoints} endpoints
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{formatInstalls(tool.installCount)}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span>{tool.trustScore}</span>
          </div>
        </div>
      </a>

      {/* Copy command button */}
      {tool.installCmd && (
        <button
          onClick={handleCopy}
          className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition text-left"
          title={isZh ? "复制安装命令" : "Copy install command"}
        >
          <code className="flex-1 text-[11px] text-gray-400 font-mono truncate">
            {tool.installCmd}
          </code>
          <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      )}

      {/* Toast */}
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
    </div>
  );
}
