"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Heart, Star, Award, Crown, Check } from "lucide-react";
import { useDonate } from "@/components/layout/DonateProvider";
import PageBanner from "@/components/layout/PageBanner";

const tiers = [
  {
    name: "Tier 1",
    price: "$25",
    icon: Heart,
    color: "from-[#94cdff] to-[#8cb6ec]",
    features: ["Annual Membership Card", "Digital Membership Scroll"],
  },
  {
    name: "Tier 2",
    price: "$60",
    icon: Star,
    color: "from-[#beda5b] to-[#b2c84e]",
    features: [
      "Annual Membership Card and Certificate",
      "Digital Membership Scroll",
      "Recognition in Annual Banquet Booklet",
    ],
  },
  {
    name: "Tier 3",
    price: "$75",
    icon: Award,
    color: "from-[#ff9664] to-[#f08855]",
    features: [
      "Annual Membership Card and Certificate",
      "T-shirt included",
      "Digital Membership Scroll",
      "Recognition in Annual Banquet Booklet",
    ],
  },
  {
    name: "Tier 4 (Institutional)",
    price: "$1,000",
    icon: Crown,
    color: "from-[#ffe453] to-[#eed02e]",
    features: [
      "Institutional Annual Membership Card",
      "Digital Membership Scroll",
      "Half-page Ad in Annual Banquet Booklet",
      "Reserved Table for 8 at Banquet",
      "Table display at all FLCRC outreach events",
    ],
  },
];

export default function DonatePage() {
  const { openDonate } = useDonate();

  return (
    <>
      <PageBanner 
        title="Become a Member" 
        subtitle="By joining FLCRC as a valued member, you secure important funding for our programs and services while receiving special benefits. Through this philanthropic commitment, you have a direct impact on our community!" 
        imageSrc="https://images.unsplash.com/photo-1555866160-5a8222b4eb11?w=1600&q=80"
      />
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <ScrollReveal key={tier.name} delay={i * 100}>
                <div className="h-full bg-slate-50 flex flex-col relative overflow-hidden group border border-slate-200 rounded-3xl shadow-sm hover:shadow-2xl transition-all hover:border-blue-300">
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${tier.color}`} />
                  <div className="p-8 flex-grow flex flex-col mt-2">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">{tier.name}</h3>
                        <span className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br ${tier.color}`}>
                          {tier.price}
                        </span>
                      </div>
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${tier.color} text-white shadow-lg`}>
                        <Icon size={24} />
                      </div>
                    </div>
                    <ul className="space-y-4 mb-8 flex-grow">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                          <Check size={18} className="shrink-0 mt-0.5 text-[#94cdff]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-3.5 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all uppercase tracking-widest text-xs" onClick={openDonate}>
                      Select Tier
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
          </div>
        </div>
      </section>

      {/* ===== ONE-TIME DONATION — Dark Section ===== */}
      <section className="relative py-24 px-4 bg-luminous-bg z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center relative overflow-hidden">
            <div className="relative z-10">
              <Heart size={48} className="text-luminous-fuchsia mx-auto mb-6 drop-shadow-lg" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Make a General Donation</h2>
              <p className="text-luminous-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Not ready for a membership but still want to make an impact? Your general donation goes directly toward funding our youth and family programs.
              </p>
              <Button variant="primary" onClick={openDonate} className="px-12 py-4">Donate Now</Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
