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
      <body className="antialiased"><a className="skip-link" href="#main">Skip to content</a><div className="disclosure">Non-attorney immigration consultant · Research & writing support · No legal advice or petition filing</div><header className="site-header wrap"><a className="brand" href="/" aria-label="Obotan Consult home"><img className="site-logo" src="/obotan-logo.jpg" alt="Obotan Consult" width="200" height="200" /></a><nav aria-label="Main navigation"><a href="/">Home</a><a href="/services/business-docs">Business Docs</a><a href="/services/eb1a">EB1A</a><a href="/services/eb1b">EB1B</a><a href="/services/eb2">EB2</a><a href="/about">About Us</a></nav><a className="header-book" href="/#services">Book a consultation ↗</a></header>{children}<footer className="footer"><div className="wrap"><div className="footer-top"><a className="brand" href="/" aria-label="Obotan Consult home"><img className="site-logo" src="/obotan-logo.jpg" alt="Obotan Consult" width="200" height="200" loading="lazy" /></a><div><p>Research with depth. Writing with purpose.</p><p className="location">Based in Cincinnati, Ohio, USA</p></div></div><p>Obotan Consult is a non-attorney immigration consultant. We are not a law firm or an accredited immigration representative. We do not provide legal advice, represent petitioners, or file petitions on their behalf. All immigration services provided by Obotan are non-attorney services. Anyone requiring legal advice must contact a qualified, licensed immigration attorney.</p><div className="footer-bottom"><span>© {new Date().getFullYear()} Obotan Consult</span><div><a href="/about">About Us & disclaimer</a><a href="/privacy">Privacy & service scope</a><a href="/admin">Admin</a></div></div></div></footer></body>
    </html>
  );
}



