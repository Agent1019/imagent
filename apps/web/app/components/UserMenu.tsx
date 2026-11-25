"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { AuthUser } from "@/lib/auth";

function Avatar({ user, className }: { user: AuthUser; className: string }) {
  if (user.avatar) {
    return <img src={user.avatar} alt="" className={`${className} object-cover`} />;
  }
  const letter = (user.name || user.email || "?").trim().charAt(0).toUpperCase() || "?";
  return (
    <span className={`${className} flex items-center justify-center bg-[#2B7FFF]/20 text-xs font-semibold text-[#8fbcff]`}>
      {letter}
    </span>
  );
}

export default function UserMenu({ user, signOutLabel }: { user: AuthUser; signOutLabel: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative hidden md:block shrink-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={user.name || user.email}
        onClick={() => setOpen(value => !value)}
        className="flex max-w-[11rem] items-center gap-2 rounded-lg px-2 py-1 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
      >
        <Avatar user={user} className="h-7 w-7 shrink-0 rounded-full" />
        <span className="truncate">{user.name || user.email}</span>
      </button>
      {open && (
        <div id={menuId} role="menu" className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-white/10 bg-[#1a1a1a] p-2 shadow-xl">
          <div className="px-2 py-1.5">
            <div className="truncate text-sm text-white">{user.name}</div>
            {user.email && user.email !== user.name && <div className="truncate text-xs text-gray-500">{user.email}</div>}
          </div>
          <form action="/auth/signout" method="post" className="mt-1">
            <button type="submit" role="menuitem" className="w-full rounded-md px-2 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5 hover:text-white">
              {signOutLabel}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
