"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/facility-rentals", label: "Rentals" },
  { href: "/contact", label: "Contact" },
];

interface NavigationProps {
  onDonate: () => void;
}

export default function Navigation({ onDonate }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/50 backdrop-blur-xl border-b border-white/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo/logo.png"
                alt="FLCRC Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <span className="font-bold text-2xl tracking-wide text-white">
              FLCRC
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-luminous-cyan ${
                  pathname === link.href
                    ? "text-luminous-cyan"
                    : "text-luminous-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="glow" onClick={onDonate}>
              Donate
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8">
          <button
            className="absolute top-6 right-6 p-2 rounded-full border border-white/20 text-white cursor-pointer"
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-4xl font-bold text-gradient uppercase"
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="primary"
            onClick={() => {
              onDonate();
              setMobileOpen(false);
            }}
            className="mt-8"
          >
            Donate Now
          </Button>
        </div>
      )}
    </>
  );
}
