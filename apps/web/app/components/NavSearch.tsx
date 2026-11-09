"use client";

import { useState, useRef, useEffect } from "react";

export default function NavSearch({ placeholder }: { placeholder: string }) {
  const [value, setValue] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mobileOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setMobileOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const searchInput = (
    <div className="flex items-center w-full bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-white/25 transition">
      <svg className="w-4 h-4 ml-2.5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 px-2 py-1.5 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
      />
      {value && (
        <button
          onClick={() => { setValue(""); inputRef.current?.focus(); }}
          className="px-2 py-1.5 text-gray-500 hover:text-white transition shrink-0 flex items-center"
          title="Clear"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile/pad: click icon to open full-width overlay */}
      <div className="md:hidden relative flex items-center">
        {mobileOpen ? (
          <div className="fixed inset-x-0 top-0 z-[61] h-16 flex items-center px-4 bg-[#0a0a0a]">
            {searchInput}
            <button
              onClick={() => setMobileOpen(false)}
              className="ml-3 px-2 py-1.5 text-gray-500 hover:text-white transition shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-400 hover:text-white transition rounded-lg hover:bg-white/5"
            title="Search (⌘K)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* Desktop: always visible */}
      <div className="hidden md:block flex-1 min-w-0 max-w-72">
        {searchInput}
      </div>
    </>
  );
}
