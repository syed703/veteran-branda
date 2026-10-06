import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Veteran Solutions & Services | Your needs. Our mission.", template: "%s | Veteran Solutions & Services" },
  description: "Veteran-owned property services. Explore junk removal, painting, pool cleaning, power washing, renovation, property cleaning, tile installation, floor renovation and demolition. Request a quote or call (857) 345-5076.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700;750;800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
