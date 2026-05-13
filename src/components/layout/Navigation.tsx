"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { useDonate } from "@/components/layout/DonateProvider";

const navLinks = [
  { 
    label: "About", 
    subLinks: [
      { href: "/about/mission-vision", label: "Mission & Vision" },
      { href: "/about/team", label: "Our Team" },
      { href: "/about/financials", label: "Financials" },
      { href: "/about/strategic-plan", label: "Strategic Plan" },
    ]
  },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/facility-rentals", label: "Rentals" },
  { 
    label: "Get Involved", 
    subLinks: [
      { href: "/volunteer", label: "Volunteer" },
      { href: "/donate", label: "Donate" },
      { href: "/become-a-member", label: "Become a Member" },
      { href: "/campaign", label: "Support Our Capital Campaign" },
    ]
  },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openDonate } = useDonate();

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
            ? "bg-[#1b2847]/95 backdrop-blur-xl border-b border-white/10 py-3"
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
              />
            </div>
            <span className="font-bold text-2xl tracking-wide text-white">
              FLCRC
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <div key={idx} className="relative group">
                {link.href ? (
                  <Link
                    href={link.href}
                    className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:text-luminous-cyan ${
                      pathname === link.href ? "text-luminous-cyan" : "text-luminous-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <div className="cursor-pointer flex items-center gap-1 text-sm font-bold tracking-widest uppercase text-luminous-muted hover:text-luminous-cyan transition-all duration-300 py-4">
                    {link.label} <ChevronDown size={14} />
                    <div className="absolute top-full left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl flex flex-col gap-2 relative">
                        {/* Invisible bridge to prevent hover loss */}
                        <div className="absolute -top-4 left-0 w-full h-4" />
                        {link.subLinks?.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-white/10 ${
                              pathname === sub.href ? "text-luminous-cyan bg-white/5" : "text-white"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link href="/donate">
              <Button variant="glow">
                Donate
              </Button>
            </Link>
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
        <div className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-xl flex flex-col pt-24 pb-12 px-8 overflow-y-auto">
          <button
            className="absolute top-6 right-6 p-2 rounded-full border border-white/20 text-white cursor-pointer"
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
            {navLinks.map((link, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                {link.href ? (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-bold text-white uppercase"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <div className="flex flex-col gap-3">
                    <span className="text-2xl font-bold text-luminous-cyan uppercase">{link.label}</span>
                    <div className="flex flex-col gap-3 pl-4 border-l border-white/10">
                      {link.subLinks?.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-lg text-luminous-muted hover:text-white transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link href="/donate" className="mt-6 w-full block" onClick={() => setMobileOpen(false)}>
              <Button variant="primary" className="w-full">
                Make a Donation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
