"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";

type InstallTab = "install" | "publish";
type Role = "agent" | "human";

interface Props {
  slug: string;
  t: {
    installConfig: string;
    viewDetails: string;
    tabInstall: string;
    tabPublish: string;
    iamAgent: string;
    iamHuman: string;
    agentPromptHint: string;
    agentPromptLabel: string;
    copyPrompt: string;
    installCli: string;
    installMcp: string;
    installJson: string;
    installSkill: string;
    recommended: string;
    httpLabel: string;
    manual: string;
    oneLiner: string;
  };
}

export default function InstallConfig({ slug, t }: Props) {
  const [tab, setTab] = useState<InstallTab>("install");
  const [role, setRole] = useState<Role>("agent");
  const [copied, setCopied] = useState(false);

  const promptText = `Read https://imagent.ai/tools/${slug}/skill.md and follow the instructions to set up the Imagent MCP Marketplace and install the MCP server.`;

  function handleCopyPrompt() {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <h3 className="text-sm font-semibold text-white">{t.installConfig}</h3>
        <a href={`/tools/${slug}`} className="text-xs text-gray-500 hover:text-gray-300 transition">
          {t.viewDetails} &gt;
        </a>
      </div>

      {/* Install / Publish tabs */}
      <div className="flex border-b border-white/5">
        <button
          onClick={() => setTab("install")}
          className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === "install"
              ? "border-white text-white"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {t.tabInstall}
        </button>
        <button
          onClick={() => setTab("publish")}
          className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === "publish"
              ? "border-white text-white"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {t.tabPublish}
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {tab === "install" ? (
          <>
            {/* Agent / Human toggle */}
            <div className="flex rounded-lg bg-white/5 p-0.5 mb-5">
              <button
                onClick={() => setRole("agent")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-md transition ${
                  role === "agent"
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
                {t.iamAgent}
              </button>
              <button
                onClick={() => setRole("human")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-md transition ${
                  role === "human"
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                {t.iamHuman}
              </button>
            </div>

            {role === "agent" ? (
              <>
                {/* Agent prompt */}
                <p className="text-xs text-gray-400 text-center mb-4">{t.agentPromptHint}</p>
                <div className="code-block rounded-lg border border-white/10 bg-[#111] overflow-hidden mb-4">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="text-[10px] text-gray-500">{t.agentPromptLabel}</span>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <code className="text-xs text-gray-300 font-mono leading-relaxed">
                      <span className="text-blue-400">Read</span>{" "}
                      https://imagent.ai/tools/{slug}/skill.md and follow the instructions to set up the Imagent MCP Marketplace and install the MCP server.
                    </code>
                  </div>
                </div>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  {copied ? "Copied!" : t.copyPrompt}
                </button>
              </>
            ) : (
              <>
                {/* Human install blocks */}
                <div className="space-y-3">
                  <div className="code-block rounded-lg border border-white/10 bg-[#111] overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{t.installCli}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">{t.recommended}</span>
                      </div>
                      <CopyButton />
                    </div>
                    <div className="px-4 py-3 flex items-center gap-3">
                      <span className="text-emerald-400 font-mono text-sm select-none">$</span>
                      <code className="text-xs font-mono text-gray-200 select-all">npx @imagent/cli add {slug}</code>
                    </div>
                  </div>

                  <div className="code-block rounded-lg border border-white/10 bg-[#111] overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{t.installMcp}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">{t.httpLabel}</span>
                      </div>
                      <CopyButton />
                    </div>
                    <div className="px-4 py-3">
                      <code className="text-xs font-mono text-gray-200 select-all">https://mcp.imagent.ai/{slug}</code>
                    </div>
                  </div>

                  <div className="code-block rounded-lg border border-white/10 bg-[#111] overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{t.installJson}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400">{t.manual}</span>
                      </div>
                      <CopyButton />
                    </div>
                    <pre className="px-4 py-3 text-xs text-gray-300 font-mono overflow-x-auto leading-relaxed">{`{
  "mcpServers": {
    "${slug}": {
      "type": "http",
      "url": "https://mcp.imagent.ai/${slug}"
    }
  }
}`}</pre>
                  </div>

                  <div className="code-block rounded-lg border border-white/10 bg-[#111] overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{t.installSkill}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400">{t.oneLiner}</span>
                      </div>
                      <CopyButton />
                    </div>
                    <div className="px-4 py-3 flex items-center gap-3">
                      <span className="text-emerald-400 font-mono text-sm select-none">$</span>
                      <code className="text-xs font-mono text-gray-200 select-all">npx @imagent/cli skill add {slug}</code>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          /* Publish tab — placeholder */
          <div className="text-center py-8">
            <svg className="w-10 h-10 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            <p className="text-sm text-gray-500 mb-1">Coming soon</p>
            <p className="text-xs text-gray-600">Publish your own MCP server to the registry</p>
          </div>
        )}
      </div>
    </div>
  );
}
