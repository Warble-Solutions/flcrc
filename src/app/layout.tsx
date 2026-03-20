import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FLCRC — Family Life and Community Resource Center",
  description:
    "Building Better Communities by Building Stronger Families. FLCRC provides resources, education, and support for families in Fort Bend County.",
  keywords: [
    "FLCRC",
    "Family Life",
    "Community Resource Center",
    "Fort Bend County",
    "non-profit",
    "youth programs",
    "family support",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
