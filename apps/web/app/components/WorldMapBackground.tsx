"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const RIPPLE_DURATION_MS = 5000;

type Ripple = { id: number; x: number; y: number; radius: number };
type RippleStyle = CSSProperties & {
  "--ripple-x": string;
  "--ripple-y": string;
  "--world-wave-end": string;
  "--world-wave-duration": string;
};

/** Decorative only: interactions are observed on the hero, never intercepted. */
export default function WorldMapBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const hero = root?.closest("section");
    if (!root || !hero) return;

    const title = hero.querySelector("h1");
    function positionAtmosphere() {
      if (!title) return;
      const titleBounds = title.getBoundingClientRect();
      const rootBounds = root!.getBoundingClientRect();
      root!.style.setProperty("--world-title-y", `${titleBounds.top + titleBounds.height / 2 - rootBounds.top}px`);
    }
    // Anchor the background to the actual headline across languages and breakpoints.
    const titleObserver = new ResizeObserver(positionAtmosphere);
    titleObserver.observe(hero);
    if (title) titleObserver.observe(title);
    positionAtmosphere();

    const finePointer = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers = new Map<number, ReturnType<typeof setTimeout>>();
    let active: Ripple[] = [];
    let nextId = 0;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    function resetPointer() {
      cancelAnimationFrame(frame);
      frame = 0;
      root!.style.setProperty("--pointer-opacity", "0");
    }

    function clearRipples() {
      timers.forEach(clearTimeout);
      timers.clear();
      active = [];
    }

    function stopEffects() {
      resetPointer();
      clearRipples();
      setRipples([]);
    }

    function move(event: PointerEvent) {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;
      // One DOM update per frame, with no React rerenders or idle animation loop.
      frame = requestAnimationFrame(() => {
        const bounds = root!.getBoundingClientRect();
        root!.style.setProperty("--pointer-x", `${pointerX - bounds.left}px`);
        root!.style.setProperty("--pointer-y", `${pointerY - bounds.top}px`);
        root!.style.setProperty("--pointer-opacity", "1");
        frame = 0;
      });
    }

    function click(event: MouseEvent) {
      if (reducedMotion.matches || event.button !== 0 || event.detail === 0) return;
      const target = event.target;
      if (!(target instanceof Element) || target.closest("a, button, input, textarea, select, summary, [role='button'], [role='link'], [contenteditable]")) return;
      const map = root!.querySelector(".world-map-frame");
      if (!map) return;
      const bounds = map.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return;

      const rootBounds = root!.getBoundingClientRect();
      const farthestCorner = Math.max(
        Math.hypot(event.clientX - bounds.left, event.clientY - bounds.top),
        Math.hypot(event.clientX - bounds.right, event.clientY - bounds.top),
        Math.hypot(event.clientX - bounds.left, event.clientY - bounds.bottom),
        Math.hypot(event.clientX - bounds.right, event.clientY - bounds.bottom),
      );
      const ripple = {
        id: ++nextId,
        x: event.clientX - rootBounds.left,
        y: event.clientY - rootBounds.top,
        // Expand all the way to the farthest corner so the wave reaches every edge.
        radius: Math.ceil(farthestCorner),
      };
      // Rapid clicks cannot create an unbounded number of layers or timers.
      if (active.length === 4) {
        const oldest = active[0];
        clearTimeout(timers.get(oldest.id));
        timers.delete(oldest.id);
        active = active.slice(1);
      }
      active = [...active, ripple];
      setRipples(active);
      timers.set(ripple.id, setTimeout(() => {
        timers.delete(ripple.id);
        active = active.filter(item => item.id !== ripple.id);
        setRipples(active);
      }, RIPPLE_DURATION_MS + 100));
    }

    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);
    hero.addEventListener("click", click);
    window.addEventListener("blur", stopEffects);
    window.addEventListener("scroll", stopEffects, { passive: true });
    finePointer.addEventListener("change", stopEffects);
    reducedMotion.addEventListener("change", stopEffects);
    return () => {
      titleObserver.disconnect();
      resetPointer();
      clearRipples();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", resetPointer);
      hero.removeEventListener("click", click);
      window.removeEventListener("blur", stopEffects);
      window.removeEventListener("scroll", stopEffects);
      finePointer.removeEventListener("change", stopEffects);
      reducedMotion.removeEventListener("change", stopEffects);
    };
  }, []);

  return (
    <div ref={rootRef} className="world-background" aria-hidden="true" data-world-map>
      <div className="world-atmosphere" />
      <div className="world-map-frame">
        <div className="world-land" />
        <svg className="world-connections" viewBox="0 0 1440 576" fill="none">
          <g className="world-routes" strokeWidth="1" strokeDasharray="3 8">
            <path d="M232 184 Q484 6 760 128" />
            <path d="M760 128 Q1020 54 1276 196" />
            <path d="M760 128 Q1020 164 1136 332" />
            <path d="M232 184 Q478 178 536 428" />
            <path d="M1136 332 Q1280 338 1324 472" />
          </g>
          <g className="world-nodes">
            <circle cx="232" cy="184" r="3" />
            <circle cx="760" cy="128" r="3" />
            <circle cx="1276" cy="196" r="3" />
            <circle cx="1136" cy="332" r="3" />
            <circle cx="536" cy="428" r="3" />
            <circle cx="1324" cy="472" r="3" />
          </g>
          <g className="world-node-rings">
            <circle cx="232" cy="184" r="9" />
            <circle cx="1136" cy="332" r="9" />
            <circle cx="1324" cy="472" r="9" />
          </g>
        </svg>
      </div>
      <div className="world-pointer">
        <div className="world-map-frame">
          <div className="world-land world-land-highlight" />
        </div>
      </div>
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="world-ripple"
          data-world-ripple
          style={{
            "--ripple-x": `${ripple.x}px`,
            "--ripple-y": `${ripple.y}px`,
            "--world-wave-end": `${ripple.radius}px`,
            "--world-wave-duration": `${RIPPLE_DURATION_MS}ms`,
          } as RippleStyle}
        >
          <div className="world-ripple-dots">
            <div className="world-map-frame"><div className="world-land world-land-highlight" /></div>
          </div>
        </div>
      ))}
      <div className="world-reading-shade" />
      <div className="world-edge-fade" />
    </div>
  );
}
