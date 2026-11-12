"use client";

import { useCallback, useState } from "react";
import { toolLogos } from "@/lib/tool-logos";

type ToolIconProps = {
  slug: string;
  name: string;
  src?: string | null;
  color?: string;
  className?: string;
  loading?: "eager" | "lazy";
};

/** Same-site brand images with a stable, accessible fallback on load failure. */
export default function ToolIcon({ slug, name, src, color = "#86b4d9", className = "w-10 h-10 rounded-lg", loading = "lazy" }: ToolIconProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const localSrc = src?.startsWith("/") && !src.startsWith("//") ? src : null;
  const logoSrc = toolLogos[slug] || localSrc;
  const failed = !logoSrc || failedSrc === logoSrc;
  const loaded = !failed && loadedSrc === logoSrc;
  const imageRef = useCallback((image: HTMLImageElement | null) => {
    // Cached SSR images can finish before hydration attaches onLoad.
    if (!image?.complete || !logoSrc) return;
    if (image.naturalWidth > 0) setLoadedSrc(logoSrc);
    else setFailedSrc(logoSrc);
  }, [logoSrc]);

  return (
    <span
      role="img"
      aria-label={name}
      data-tool-icon={slug}
      data-tool-logo-state={loaded ? "loaded" : failed ? "fallback" : "loading"}
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-full w-full items-center justify-center text-xs font-semibold ${loaded ? "invisible" : ""}`}
        style={{ backgroundColor: `${color}20`, color }}
      >
        {Array.from(name.trim())[0]?.toUpperCase() || "?"}
      </span>
      {logoSrc && !failed && (
        <img
          ref={imageRef}
          src={logoSrc}
          alt=""
          draggable={false}
          loading={loading}
          decoding="async"
          className={`absolute inset-0 block h-full w-full object-contain ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoadedSrc(logoSrc)}
          onError={() => setFailedSrc(logoSrc)}
        />
      )}
    </span>
  );
}
