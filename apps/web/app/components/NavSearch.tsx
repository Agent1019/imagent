"use client";

import { useState, useRef, useEffect } from "react";

export default function NavSearch({ placeholder }: { placeholder: string }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="relative flex items-center">
      {open ? (
        <div className="fixed inset-x-0 top-0 z-[61] h-16 flex items-center px-4 bg-[#0a0a0a] md:static md:inset-auto md:z-auto md:h-auto md:bg-transparent md:px-0 md:flex-1 md:min-w-0 md:max-w-72">
          <div className="flex items-center w-full bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-white/25 transition">
            <svg className="w-4 h-4 ml-2 md:ml-2.5 text-gray-500 shrink-0 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              className="flex-1 min-w-0 px-2 py-2 md:py-1.5 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            />
            <button
              onClick={() => setOpen(false)}
              className="px-2 py-2 md:py-1.5 text-gray-500 hover:text-white transition shrink-0 flex items-center"
            >
              <kbd className="text-[10px] border border-white/10 rounded px-1.5 py-0.5 leading-none">Esc</kbd>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="p-2 text-gray-400 hover:text-white transition rounded-lg hover:bg-white/5"
          title="Search (⌘K)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      )}
    </div>
  );
}
