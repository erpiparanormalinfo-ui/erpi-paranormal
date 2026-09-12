import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import "./editorial-theme.css";
import { SiteProvider } from "@/lib/erpi/site";

export const metadata: Metadata = {
  title: "ERPI Paranormal",
  description: "Enquêtes, phénomènes inexpliqués, événements et ressources ERPI Paranormal.",
  robots: { index: false, follow: false },
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
    <html lang="fr">
      <body className="antialiased"><SiteProvider>{children}</SiteProvider></body>
    </html>
  );
}
