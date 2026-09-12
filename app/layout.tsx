import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import "./editorial-theme.css";
import "./cinema.css";
import "./newsroom.css";
import "./motion-scenes.css";
import "./home-scene.css";

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
      <body className="antialiased"><script dangerouslySetInnerHTML={{__html:"try{if(location.pathname==='/'&&!sessionStorage.getItem('erpi-entered')&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&localStorage.getItem('erpi-motion')!=='off')document.documentElement.dataset.room='dark'}catch(e){}"}}/><SiteProvider>{children}</SiteProvider></body>
    </html>
  );
}
