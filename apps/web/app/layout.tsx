import { headers } from "next/headers";
import { getLocaleFromHost } from "@/lib/i18n/config";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "imagent.ai";
  const locale = getLocaleFromHost(host);

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <body>{children}</body>
    </html>
  );
}
