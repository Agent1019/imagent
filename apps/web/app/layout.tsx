import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imagent - The Package Registry for AI Agents",
  description:
    "Discover, install, and publish tools autonomously. The agent-native code and tool registry.",
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
