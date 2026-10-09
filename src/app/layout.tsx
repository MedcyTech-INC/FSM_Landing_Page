import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const nohemi = localFont({
  src: [
    {
      path: "../../public/fonts/Nohemi-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi-ExtraLight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
  display: "swap",
});

const culture = localFont({
  src: [
    {
      path: "../../public/fonts/Culture.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-culture",
  display: "swap",
});

const escucha = localFont({
  src: [
    {
      path: "../../public/fonts/Escucha.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-escucha",
  display: "swap",
});

const flaviotte = localFont({
  src: [
    {
      path: "../../public/fonts/Flaviotte.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-flaviotte",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FIELDCRUX | Enterprise Healthcare Operations Platform",
  description: "One Platform to Manage Your Healthcare Workforce & Field Operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${nohemi.variable} ${culture.variable} ${escucha.variable} ${flaviotte.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
