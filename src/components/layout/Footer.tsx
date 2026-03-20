import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-xl pt-20 pb-10 px-6 z-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6 text-white">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <Image
                src="/images/logo/logo.png"
                alt="FLCRC Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <span className="font-bold text-2xl">FLCRC</span>
          </div>
          <p className="text-luminous-muted max-w-sm leading-relaxed text-sm">
            Promoting positive change in the community through education, training, partnerships, and support.
            <br />A registered 501(c)(3) non-profit organization.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
            About Us
          </h4>
          <ul className="space-y-3 text-luminous-muted text-sm">
            <li><Link href="/about/mission-vision" className="hover:text-luminous-cyan transition-colors">Mission & Vision</Link></li>
            <li><Link href="/about/team" className="hover:text-luminous-cyan transition-colors">Our Team</Link></li>
            <li><Link href="/about/financials" className="hover:text-luminous-cyan transition-colors">Our Financials</Link></li>
            <li><Link href="/about/strategic-plan" className="hover:text-luminous-cyan transition-colors">Strategic Plan</Link></li>
            <li><Link href="/facility-rentals" className="hover:text-luminous-cyan transition-colors">Facility Rentals</Link></li>
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
            Get Involved
          </h4>
          <ul className="space-y-3 text-luminous-muted text-sm">
            <li><Link href="/donate" className="hover:text-luminous-fuchsia transition-colors">Donate Now</Link></li>
            <li><Link href="/sponsorship" className="hover:text-luminous-fuchsia transition-colors">Sponsorship</Link></li>
            <li><Link href="/volunteer" className="hover:text-luminous-fuchsia transition-colors">Volunteer</Link></li>
            <li><Link href="/campaign" className="hover:text-luminous-fuchsia transition-colors">Capital Campaign</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
            Contact
          </h4>
          <ul className="space-y-4 text-luminous-muted text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="shrink-0 mt-0.5" />
              <span>821 E Highway 90A<br />Richmond, TX 77406</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} /> 1-888-337-1411
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} /> info@familylifecrc.org
            </li>
          </ul>
          
          <div className="flex gap-4 mt-6">
            {[
              { icon: Facebook, href: "https://www.facebook.com/FLCRCRichmond/" },
              { icon: Twitter, href: "https://twitter.com/flcrc" },
              { icon: Instagram, href: "https://www.instagram.com/flcrc.richmond/" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-luminous-cyan hover:text-black transition-all cursor-pointer"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-luminous-muted text-xs font-bold tracking-widest border-t border-white/5 pt-8">
        © {new Date().getFullYear()} Family Life and Community Resource Center
      </div>
    </footer>
  );
}
