import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sumathi Textiles | Heritage Silk Sarees Since 1985",
  description: "Experience the finest handloom silk sarees, wedding trousseaus, and ethnic wear curated for royalty.",
};

import GlobalProviders from "@/components/GlobalProviders";
import { PageTransition } from "@/components/AnimationWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@400;500;600&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body id="outstatic" className="min-h-full flex flex-col">
        <GlobalProviders>
          <PageTransition>
            {children}
          </PageTransition>
        </GlobalProviders>
      </body>
    </html>
  );
}
