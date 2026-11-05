"use client";

import { useState, useRef, useEffect } from "react";

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
};

export default function MobileNav({ nav, locale, locales, domainMap, localeNames }: MobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "/explore", label: nav.explore },
    { href: "/rankings", label: nav.rankings },
    { href: "/blog", label: nav.blog },
    { href: "/community", label: nav.community },
    { href: "/docs", label: nav.docs },
    { href: "/pricing", label: nav.pricing },
  ];

  return (
    <div className="md:hidden">
      {/* Hamburger / X button */}
      <button
        onClick={() => {
          setMenuOpen(!menuOpen);
          setLangOpen(false);
        }}
        className="p-2 text-gray-400 hover:text-white transition"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          // X icon
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger icon
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Slide-down panel */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 bg-[#1a1a1a] border-b border-white/10 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {/* Nav links */}
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-3 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* Divider */}
            <div className="border-t border-white/10 my-3" />

            {/* Language selector (click-based) */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 w-full px-3 py-3 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                aria-expanded={langOpen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span>{localeNames[locale]}</span>
                <svg
                  className={`w-4 h-4 ml-auto opacity-50 transition-transform ${langOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="ml-3 mt-1 mb-2 rounded-lg border border-white/10 bg-[#111] overflow-hidden">
                  {locales.map((l) => (
                    <a
                      key={l}
                      href={`https://${domainMap[l]}`}
                      className={`flex items-center gap-2 px-4 py-3 text-sm transition ${
                        locale === l
                          ? "text-white bg-white/10"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="text-xs">{l === "en" ? "\u{1F1FA}\u{1F1F8}" : "\u{1F1E8}\u{1F1F3}"}</span>
                      {localeNames[l]}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 my-3" />

            {/* Sign in */}
            <a
              href="/login"
              className="block px-3 py-3 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
              onClick={() => setMenuOpen(false)}
            >
              {nav.signIn}
            </a>

            {/* Get Started */}
            <a
              href="/signup"
              className="block mx-3 mt-1 mb-2 text-center bg-white text-black py-3 rounded-lg font-medium text-base hover:bg-gray-200 transition"
              onClick={() => setMenuOpen(false)}
            >
              {nav.getStarted}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
