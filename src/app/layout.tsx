import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist_Mono } from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rudraksh Ramekar — React Native & Software Developer",
  description:
    "Portfolio of Rudraksh Ramekar (rudrx75), a React Native and software developer building cross-platform mobile and web applications with practical, user-focused design.",
  keywords: [
    "Rudraksh Ramekar",
    "rudrx75",
    "React Native Developer",
    "Mobile Developer",
    "Expo",
    "TypeScript",
    "Next.js",
    "Software Engineer",
  ],
  authors: [{ name: "Rudraksh Ramekar", url: "https://github.com/roxton75" }],
  openGraph: {
    title: "Rudraksh Ramekar — React Native & Software Developer",
    description:
      "Cross-platform mobile apps, React Native, Expo, TypeScript & web development.",
    url: "https://rudrx-devport.netlify.app/",
    siteName: "Rudrx Devport",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} bg-[#08090A] text-[#F5F5F5] antialiased selection:bg-[#00D9F5]/20 selection:text-[#00D9F5]`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
