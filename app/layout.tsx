import {SiteShell} from "@/components/site-shell";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Obotan Consult | Research & Writing Support",
  description: "Research, business documents, CV review and petition writing support. Obotan Consult is a non-attorney immigration consultant and does not file petitions or provide legal advice.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><a className="skip-link" href="#main">Skip to content</a><SiteShell>{children}</SiteShell></body>
    </html>
  );
}





