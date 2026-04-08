"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Shield, Hexagon, CircleDot, Triangle } from "lucide-react";
import { useDonate } from "@/components/layout/DonateProvider";
import PageBanner from "@/components/layout/PageBanner";

function CrownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  );
}

const sponsors = [
  { name: "Elite Sponsor", price: "$25,000+", icon: CrownIcon, color: "text-luminous-cyan", bg: "from-cyan-500/20 to-blue-500/20" },
  { name: "Platinum Sponsor", price: "$20,000", icon: Hexagon, color: "text-gray-300", bg: "from-gray-300/20 to-gray-500/20" },
  { name: "Gold Sponsor", price: "$10,000", icon: CircleDot, color: "text-yellow-400", bg: "from-yellow-400/20 to-yellow-600/20" },
  { name: "Silver Sponsor", price: "$5,000", icon: Shield, color: "text-gray-400", bg: "from-gray-400/20 to-gray-600/20" },
  { name: "Bronze Sponsor", price: "$2,500", icon: Triangle, color: "text-amber-600", bg: "from-amber-600/20 to-amber-800/20" },
];

export default function SponsorshipPage() {
  const { openDonate } = useDonate();

  return (
    <>
      <PageBanner 
        title="Capital Campaign Sponsorship" 
        subtitle="Your sponsorship will support FLCRC's new building. As a Campaign Sponsor, you will be recognized on our website and in our quarterly newsletter." 
        imageSrc="https://images.unsplash.com/photo-1556761175-5973e0f9b69b?w=1600&q=80"
      />
      <div className="pb-20 px-4 pt-16">
        <div className="max-w-6xl mx-auto">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {sponsors.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <ScrollReveal key={tier.name} delay={i * 100}>
                <GlassCard className={`h-full text-center p-8 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all ${i === 0 ? "lg:col-span-3" : ""}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <Icon size={48} className={`mx-auto mb-6 ${tier.color}`} />
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <p className={`text-4xl font-black mb-8 ${tier.color}`}>{tier.price}</p>
                    <Button variant="outline" onClick={openDonate}>Become a Sponsor</Button>
                  </div>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Donate Online</h3>
              <p className="text-luminous-muted mb-6">
                Complete your sponsorship donation securely online. After donating, please email us your details so we can properly recognize your contribution.
              </p>
              <Button variant="primary" onClick={openDonate}>Sponsor Online Now</Button>
            </div>
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Donate by Check</h3>
              <p className="text-luminous-muted mb-6">
                Mail your check (payable to Family Life and Community Resource Center) to:<br /><br />
                <strong className="text-white">Family Life and Community Resource Center</strong><br />
                821 E Highway 90A<br />
                Richmond, TX 77406<br />
                ATTN: Ilene Harper
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
    </>
  );
}
