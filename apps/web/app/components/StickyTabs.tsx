"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Tab = { label: string; href: string };

export default function StickyTabs({ tabs }: { tabs: Tab[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const lastSectionRef = useRef<HTMLElement | null>(null);

  // Track which section is in view
  useEffect(() => {
    const sectionIds = tabs.map((t) => t.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    lastSectionRef.current = sections[sections.length - 1];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActiveIdx(idx);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [tabs]);

  // Detect stuck state (used only for click scroll offset; sticky handles visuals)
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting);
      },
      // Top of sticky point = 64px header, so "stuck" once sentinel passes 64px
      { rootMargin: "-64px 0px 0px 0px", threshold: 1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Share the rendered tab height with the desktop sidebar so both reach their
  // sticky offsets together, including after resizing or changing text size.
  useEffect(() => {
    const strip = scrollRef.current;
    const layout = strip?.closest<HTMLElement>("[data-tool-detail-layout]");
    if (!strip || !layout) return;

    const updateHeight = () => {
      layout.style.setProperty("--tool-tabs-height", `${strip.getBoundingClientRect().height}px`);
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(strip);
    return () => {
      observer.disconnect();
      layout.style.removeProperty("--tool-tabs-height");
    };
  }, []);

  // Detect when last section scrolls past (hide tabs) — scroll listener
  // is more reliable than IntersectionObserver for jumps between
  // above-viewport and below-viewport states (both are "not intersecting").
  useEffect(() => {
    const last = lastSectionRef.current;
    if (!last) return;

    let raf = 0;
    const update = () => {
      const rect = last.getBoundingClientRect();
      setHidden(rect.bottom < 120);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Auto-scroll the tab strip so the active tab stays visible (centered)
  // Only when the active tab is outside the visible area — prevents
  // repeated smooth-scrolls from jittering during vertical page scrolling.
  useEffect(() => {
    const container = scrollRef.current;
    const active = activeRef.current;
    if (!container || !active) return;

    const containerWidth = container.clientWidth;
    const tabLeft = active.offsetLeft;
    const tabWidth = active.offsetWidth;
    const tabRight = tabLeft + tabWidth;
    const visibleLeft = container.scrollLeft;
    const visibleRight = container.scrollLeft + containerWidth;

    // Skip if the active tab is already fully visible
    if (tabLeft >= visibleLeft && tabRight <= visibleRight) return;

    const target = tabLeft - containerWidth / 2 + tabWidth / 2;
    const maxScroll = container.scrollWidth - containerWidth;
    const clamped = Math.max(0, Math.min(target, maxScroll));

    container.scrollTo({ left: clamped, behavior: "smooth" });
  }, [activeIdx]);

  const handleClick = useCallback((e: React.MouseEvent, idx: number, href: string) => {
    e.preventDefault();
    setActiveIdx(idx);
    const el = document.querySelector(href);
    if (el) {
      const offset = stuck ? 120 : 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [stuck]);

  return (
    <>
      {/* Sentinel to detect scroll position */}
      <div ref={sentinelRef} className="h-0 w-full" data-tool-tabs-sentinel />

      {/* Tab bar — sticky right below the 64px header; slide up when hidden.
          transition only on transform/opacity (transition-all on a sticky
          element animates position and causes jitter while scrolling). */}
      <div
        data-tool-tabs
        data-stuck={stuck}
        data-hidden={hidden}
        className={`sticky z-40 transition-[opacity,transform] duration-300 will-change-transform ${
          hidden
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
        }`}
        style={{ top: "var(--tool-tabs-top, calc(4rem - 1px))" }}
      >
        {/* Match #main-nav .nav-scrolled: rgba(10,10,10,0.85) + blur(16px)
            + identical hairline shadow, so the stuck bar is seamless with
            the frosted header above it. */}
        <div className="bg-[#0a0a0a]/85 backdrop-blur-[16px] shadow-[0_1px_0_rgba(255,255,255,0.03)]">
          <div
            ref={scrollRef}
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide pr-4 md:pr-6"
          >
            {tabs.map((tab, i) => (
              <a
                key={tab.label}
                ref={i === activeIdx ? activeRef : undefined}
                href={tab.href}
                onClick={(e) => handleClick(e, i, tab.href)}
                className={`flex items-center py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  i === 0 ? "pl-0 pr-4" : "px-4"
                } ${
                  i === activeIdx
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {/* Underline hugs the label width (pb-3 + -mb-3 keeps the
                    border at the same offset as a border-b on the anchor),
                    so it overhangs symmetrically on both sides of the text
                    even when the first tab is flush-left (pl-0). */}
                <span
                  className={`flex items-center gap-1.5 border-b-2 pb-3 -mb-3 transition-colors ${
                    i === activeIdx
                      ? "border-white"
                      : "border-transparent hover:border-white/20"
                  }`}
                >
                  {tab.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
