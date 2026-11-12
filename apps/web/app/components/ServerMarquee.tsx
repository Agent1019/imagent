"use client";

import { useState, useCallback, useEffect } from "react";
import ToolIcon from "@/app/components/ToolIcon";

type ServerItem = { name: string; domain: string; slug: string };

const row1: ServerItem[] = [
  { name: "Firecrawl", domain: "firecrawl.dev", slug: "firecrawl" },
  { name: "Brave Search", domain: "brave.com", slug: "brave-search" },
  { name: "Tavily", domain: "tavily.com", slug: "tavily" },
  { name: "Slack", domain: "slack.com", slug: "slack" },
  { name: "GitHub", domain: "github.com", slug: "github" },
  { name: "Notion", domain: "notion.so", slug: "notion" },
  { name: "Stripe", domain: "stripe.com", slug: "stripe" },
  { name: "Resend", domain: "resend.com", slug: "resend" },
  { name: "OpenAI", domain: "openai.com", slug: "openai" },
  { name: "YouTube", domain: "youtube.com", slug: "youtube" },
];

const row2: ServerItem[] = [
  { name: "Maps & Places", domain: "google.com", slug: "maps-places" },
  { name: "E2B", domain: "e2b.dev", slug: "e2b" },
  { name: "Composio", domain: "composio.dev", slug: "composio" },
  { name: "Browserbase", domain: "browserbase.com", slug: "browserbase" },
  { name: "Apollo", domain: "apollo.io", slug: "apollo" },
  { name: "LinkedIn", domain: "linkedin.com", slug: "linkedin" },
  { name: "Spotify", domain: "spotify.com", slug: "spotify" },
  { name: "Reddit", domain: "reddit.com", slug: "reddit" },
  { name: "Instagram", domain: "instagram.com", slug: "instagram" },
  { name: "Telegram", domain: "telegram.org", slug: "telegram" },
];

export default function ServerMarquee() {
  const [paused, setPaused] = useState(false);
  const [clickedSlug, setClickedSlug] = useState<string | null>(null);

  const handleClick = useCallback((e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    setPaused(true);
    setClickedSlug(slug);
    // Navigate after showing click state
    setTimeout(() => {
      window.location.href = `/tools/${slug}`;
    }, 400);
  }, []);

  // Reset state when navigating back to this page
  useEffect(() => {
    function reset() { setPaused(false); setClickedSlug(null); }
    window.addEventListener("pageshow", reset);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") reset();
    });
    return () => {
      window.removeEventListener("pageshow", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  const playState = paused ? "paused" : "running";

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div className="mt-10 max-w-5xl mx-auto space-y-2 overflow-hidden">
        {/* Row 1 — scrolls left */}
        <div className="flex overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
          <div className="flex gap-2 shrink-0" style={{ animation: "scroll-left 30s linear infinite", animationPlayState: playState }}>
            {row1.concat(row1).map((s, i) => (
              <a
                key={`${s.name}-${i}`}
                href={`/tools/${s.slug}`}
                onClick={(e) => handleClick(e, s.slug)}
                className={`shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-lg border transition ${
                  clickedSlug === s.slug
                    ? "border-white/30 bg-white/10 scale-95"
                    : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]"
                }`}
              >
                <ToolIcon slug={s.slug} name={s.name} className="w-5 h-5 rounded" loading="eager" />
                <span className={`text-sm font-medium whitespace-nowrap ${clickedSlug === s.slug ? "text-white" : "text-gray-400"}`}>{s.name}</span>
              </a>
            ))}
          </div>
        </div>
        {/* Row 2 — scrolls right */}
        <div className="flex overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
          <div className="flex gap-2 shrink-0" style={{ animation: "scroll-right 30s linear infinite", animationPlayState: playState }}>
            {row2.concat(row2).map((s, i) => (
              <a
                key={`${s.name}-${i}`}
                href={`/tools/${s.slug}`}
                onClick={(e) => handleClick(e, s.slug)}
                className={`shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-lg border transition ${
                  clickedSlug === s.slug
                    ? "border-white/30 bg-white/10 scale-95"
                    : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]"
                }`}
              >
                <ToolIcon slug={s.slug} name={s.name} className="w-5 h-5 rounded" loading="eager" />
                <span className={`text-sm font-medium whitespace-nowrap ${clickedSlug === s.slug ? "text-white" : "text-gray-400"}`}>{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
