"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type NavContent = {
  explore: string;
  rankings: string;
  blog: string;
  community: string;
  docs: string;
  pricing: string;
  signIn: string;
  getStarted: string;
};

type MobileNavProps = {
  nav: NavContent;
  locale: string;
  locales: readonly string[];
  domainMap: Record<string, string>;
  localeNames: Record<string, string>;
  localeFlags: Record<string, string>;
  pathname: string;
};

export default function MobileNav({ nav, locale, locales, domainMap, localeNames, localeFlags, pathname }: MobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);

  // Lock page scrolling only while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeMenu = () => {
      setMenuOpen(false);
      setShowLang(false);
    };
    const onBreakpointChange = () => {
      if (desktop.matches) closeMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep the usable header and drawer in one keyboard loop, excluding the dimmed page.
      const focusable = Array.from(document.querySelectorAll<HTMLElement>(
        "#main-nav a[href], #main-nav button, #main-nav input, #mobile-nav-panel a[href], #mobile-nav-panel button"
      )).filter((element) => !element.closest("[inert]") &&
        !element.hasAttribute("disabled") && element.getClientRects().length > 0);
      if (focusable.length === 0) return;
      const index = focusable.indexOf(document.activeElement as HTMLElement);
      const nextIndex = index < 0 ? (event.shiftKey ? focusable.length - 1 : 0) :
        (index + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length;
      event.preventDefault();
      focusable[nextIndex].focus({ preventScroll: true });
    };

    desktop.addEventListener("change", onBreakpointChange);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onBreakpointChange);
      window.removeEventListener("keydown", onKeyDown);
      if (!desktop.matches && previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    document.querySelector<HTMLElement>("#mobile-nav-panel > div > div:not([inert]) a[href], #mobile-nav-panel > div > div:not([inert]) button")
      ?.focus({ preventScroll: true });
  }, [menuOpen, showLang]);

  const navLinks = [
    { href: "/explore", label: nav.explore },
    { href: "/rankings", label: nav.rankings },
    { href: "/blog", label: nav.blog },
    { href: "/community", label: nav.community },
    { href: "/docs", label: nav.docs },
    { href: "/pricing", label: nav.pricing },
  ];

  return (
    <div className="md:hidden -ml-2.5">
      {/* Compensate for the hit-area padding so the icon aligns with page content. */}
      <button
        type="button"
        onClick={() => {
          setMenuOpen(!menuOpen);
          setShowLang(false);
        }}
        className="flex h-11 w-11 items-center justify-center text-gray-400 hover:text-white transition"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-panel"
      >
        {menuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Portal escapes the header's backdrop-filter fixed-position containing block. */}
      {menuOpen && createPortal(
        <>
          {/* Keep the header above the backdrop, and all page content below it. */}
          <div
            data-mobile-nav-backdrop
            className="fixed inset-x-0 bottom-0 z-[45] bg-black/60 backdrop-blur-sm md:hidden"
            style={{ top: "4rem" }}
            onClick={() => { setMenuOpen(false); setShowLang(false); }}
            aria-hidden="true"
          />

          {/* A bounded viewport lets each sliding panel scroll independently. */}
          <div
            id="mobile-nav-panel"
            className="fixed inset-x-0 z-[46] bg-[#1a1a1a] border-b border-white/10 shadow-xl overflow-hidden md:hidden"
            style={{ top: "4rem", height: "min(36rem, calc(100dvh - 4rem))" }}
          >
            {/* Sliding wrapper: translate-x to switch panels */}
            <div
              className="flex transition-transform duration-300 ease-in-out motion-reduce:transition-none h-full"
              style={{ width: "200%", transform: showLang ? "translateX(-50%)" : "translateX(0)" }}
            >
              {/* ===== Main menu panel ===== */}
              <div className="w-1/2 h-full shrink-0 overflow-y-auto overscroll-contain" inert={showLang}>
                <div className="px-4 py-4 space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-3 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                      onClick={() => { setMenuOpen(false); setShowLang(false); }}
                    >
                      {link.label}
                    </a>
                  ))}

                  <div className="border-t border-white/10 my-3" />

                  {/* Language trigger */}
                  <button
                    onClick={() => setShowLang(true)}
                    className="flex items-center gap-2 w-full px-3 py-3 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    <span>{localeNames[locale]}</span>
                    <svg className="w-4 h-4 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div className="border-t border-white/10 my-3" />

                  <a
                    href="/login"
                    className="block px-3 py-3 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                    onClick={() => { setMenuOpen(false); setShowLang(false); }}
                  >
                    {nav.signIn}
                  </a>

                  <a
                    href="/signup"
                    className="block mx-3 mt-1 mb-2 text-center bg-white text-black py-3 rounded-lg font-medium text-base hover:bg-gray-200 transition"
                    onClick={() => { setMenuOpen(false); setShowLang(false); }}
                  >
                    {nav.getStarted}
                  </a>
                </div>
              </div>

              {/* ===== Language panel ===== */}
              <div className="w-1/2 h-full shrink-0 overflow-y-auto overscroll-contain" inert={!showLang}>
                <div className="px-4 py-4">
                  {/* Keep Back visible while the language list scrolls. */}
                  <button
                    onClick={() => setShowLang(false)}
                    className="sticky top-0 z-10 bg-[#1a1a1a] flex items-center gap-2 px-3 py-3 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition w-full mb-1"
                  >
                    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>{nav.explore === "探索" ? "返回" : "Back"}</span>
                  </button>

                  <div className="border-t border-white/10 my-2" />

                  {/* Language list — scrollable */}
                  {locales.map((l) => (
                    <a
                      key={l}
                      href={`https://${domainMap[l]}${pathname}`}
                      className={`flex items-center gap-3 px-3 py-3 text-base rounded-lg transition ${
                        locale === l
                          ? "text-white bg-white/10"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => { setMenuOpen(false); setShowLang(false); }}
                    >
                      <span className="text-lg">{localeFlags[l]}</span>
                      {localeNames[l]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
