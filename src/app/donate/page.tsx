"use client";

import { useState } from "react";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Heart, Star, Award, Crown, Check } from "lucide-react";

const tiers = [
  {
    name: "Tier 1",
    price: "$25",
    icon: Heart,
    color: "from-blue-400 to-blue-600",
    features: [
      "Annual Membership Card",
      "Digital Membership Scroll"
    ]
  },
  {
    name: "Tier 2",
    price: "$60",
    icon: Star,
    color: "from-purple-400 to-purple-600",
    features: [
      "Annual Membership Card and Certificate",
      "Digital Membership Scroll",
      "Recognition in Annual Banquet Booklet"
    ]
  },
  {
    name: "Tier 3",
    price: "$75",
    icon: Award,
    color: "from-pink-400 to-rose-600",
    features: [
      "Annual Membership Card and Certificate",
      "T-shirt included",
      "Digital Membership Scroll",
      "Recognition in Annual Banquet Booklet"
    ]
  },
  {
    name: "Tier 4 (Institutional)",
    price: "$1,000",
    icon: Crown,
    color: "from-yellow-400 to-amber-600",
    features: [
      "Institutional Annual Membership Card",
      "Digital Membership Scroll",
      "Half-page Ad in Annual Banquet Booklet",
      "Reserved Table for 8 at Banquet",
      "Table display at all FLCRC outreach events"
    ]
  }
];

export default function DonatePage() {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative text-luminous-text">
      <AnimatedBackground />
      <Navigation onDonate={() => setShowDonate(true)} />

      <main className="flex-grow z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
                Become a Member
              </h1>
              <p className="text-luminous-muted max-w-2xl mx-auto text-lg leading-relaxed">
                By joining FLCRC as a valued member, you secure important funding for our programs and services while receiving special benefits. Through this philanthropic commitment, you have a direct impact on our community!
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {tiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <ScrollReveal key={tier.name} delay={i * 100}>
                  <GlassCard className="h-full flex flex-col relative overflow-hidden group border border-white/10 hover:border-luminous-cyan/50 transition-all">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tier.color}`} />
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                          <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${tier.color}">
                            <span className={`bg-clip-text text-transparent bg-gradient-to-br ${tier.color}`}>{tier.price}</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-xl bg-white/5`}>
                          <Icon size={24} className="text-white" />
                        </div>
                      </div>
                      <ul className="space-y-3 mb-8 flex-grow">
                        {tier.features.map((feat, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-luminous-muted">
                            <Check size={16} className="text-luminous-cyan shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full group-hover:bg-white group-hover:text-black transition-all">
                        Select Tier
                      </Button>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <div className="max-w-3xl mx-auto glass rounded-3xl p-8 md:p-12 text-center border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-luminous-cyan/10 to-luminous-fuchsia/10 opacity-50" />
              <div className="relative z-10">
                <Heart size={48} className="text-luminous-fuchsia mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Make a General Donation</h2>
                <p className="text-luminous-muted mb-8 max-w-xl mx-auto">
                  Not ready for a membership but still want to make an impact? Your general donation goes directly toward funding our youth and family programs.
                </p>
                <Button variant="primary" onClick={() => setShowDonate(true)} className="px-12">
                  Donate Now
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
