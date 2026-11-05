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
        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-white/25 transition animate-in">
          <svg className="w-4 h-4 ml-3 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className="w-48 md:w-64 px-3 py-1.5 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
          />
          <button
            onClick={() => setOpen(false)}
            className="px-2 py-1.5 text-gray-500 hover:text-white transition"
          >
            <kbd className="text-[10px] border border-white/10 rounded px-1 py-0.5">Esc</kbd>
          </button>
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
