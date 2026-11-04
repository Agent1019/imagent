import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imagent — Discover, Authenticate & Monetize MCP Servers",
  description:
    "The infrastructure layer for AI agents. Discover MCP servers, authenticate tool calls, and monetize usage — all in one platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
