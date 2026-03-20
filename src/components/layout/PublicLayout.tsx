"use client";

import { usePathname } from "next/navigation";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // Admin pages: no public nav/footer/background — just render children
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col relative text-luminous-text">
      <AnimatedBackground />
      <Navigation />
      <main className="flex-grow z-10">{children}</main>
      <Footer />
    </div>
  );
}
