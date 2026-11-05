import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/explore",
          "/rankings",
          "/blog",
          "/docs",
          "/pricing",
          "/api/",
          "/login",
          "/signup",
          "/publish",
          "/dashboard",
          "/about",
          "/careers",
          "/privacy",
          "/terms",
        ],
      },
    ],
    sitemap: [
      "https://imagent.ai/sitemap.xml",
      "https://zh.imagent.ai/sitemap.xml",
    ],
    host: "https://imagent.ai",
  };
}
