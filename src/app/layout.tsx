import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PublicLayout from "@/components/layout/PublicLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "FLCRC — Family Life and Community Resource Center",
    template: "%s | FLCRC",
  },
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
  openGraph: {
    title: "FLCRC — Family Life and Community Resource Center",
    description:
      "Building Better Communities by Building Stronger Families. FLCRC provides resources, education, and support for families in Fort Bend County.",
    url: "https://flcrc.netlify.app",
    siteName: "FLCRC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLCRC — Family Life and Community Resource Center",
    description:
      "Building Better Communities by Building Stronger Families.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
