"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { useDonate } from "@/components/layout/DonateProvider";
import PageBanner from "@/components/layout/PageBanner";

import { Shield, Hexagon, CircleDot, Triangle } from "lucide-react";

function CrownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  );
}

const sponsors = [
  { name: "Elite Sponsor", price: "$25,000+", icon: CrownIcon, color: "text-[#6fa8dc]", bg: "from-[#6fa8dc]/20 to-[#5b93c7]/20" },
  { name: "Platinum Sponsor", price: "$20,000", icon: Hexagon, color: "text-slate-400", bg: "from-slate-300/20 to-slate-500/20" },
  { name: "Gold Sponsor", price: "$10,000", icon: CircleDot, color: "text-[#d4b828]", bg: "from-[#e6c830]/20 to-[#d4b828]/20" },
  { name: "Silver Sponsor", price: "$5,000", icon: Shield, color: "text-slate-500", bg: "from-slate-400/20 to-slate-600/20" },
  { name: "Bronze Sponsor", price: "$2,500", icon: Triangle, color: "text-[#d4703f]", bg: "from-[#e87d4a]/20 to-[#d4703f]/20" },
];

const goal = 200000;
const raised = 15000;
const percent = Math.min(100, Math.round((raised / goal) * 100));

export default function CampaignPage() {
  const { openDonate } = useDonate();

  return (
    <>
      <PageBanner 
        title="Building a New Generation of Leaders" 
        subtitle="Our FY2025-26 Capital Campaign is a key component of our strategic growth plan for the next five years. Our goal is to raise $200,000 to support the expansion of our Youth Ambassador Leadership Education (Y.A.L.E.) program." 
        imageSrc="/images/headers/yale.jpg"
      />
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">

        {/* Progress Section */}
        <ScrollReveal delay={100}>
          <div className="bg-slate-50 p-12 md:p-16 rounded-3xl border border-slate-200 shadow-xl text-center mb-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#6fa8dc]/10 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-slate-900 mb-8">Campaign Progress</h3>
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-between text-sm font-bold uppercase tracking-wider mb-3">
                  <span className="text-[#5b93c7]">Raised: ${raised.toLocaleString()}</span>
                  <span className="text-slate-500">Goal: ${goal.toLocaleString()}</span>
                </div>
                <div className="h-6 w-full bg-white rounded-full overflow-hidden border border-slate-200 mb-6 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-[#e87d4a] to-[#e6c830] transition-all duration-1000 ease-out relative"
                    style={{ width: `${percent}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
                <p className="text-slate-600 font-medium mb-8 text-lg">
                  {percent}% funded towards our $200,000 target. Every contribution brings us closer!
                </p>
                <button className="px-10 py-4 bg-slate-900 text-white font-bold rounded-xl text-sm uppercase tracking-widest hover:bg-slate-800 transition-colors" onClick={openDonate}>
                  Donate to the Campaign
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Information Sections */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-12">
          <ScrollReveal>
            <div>
              <h3 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Creating a New Summer Enrichment Experience</h3>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                The Youth Ambassador Leadership Education (Y.A.L.E.) program provides students 5th grade through college the opportunity to participate in activities related to character building, leadership, service learning, and college and career preparation.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                These funds will transform our one-week Summer Enrichment Camp into a <strong>six-weeks Summer Enrichment Experience</strong>! Immersing students in highly engaging, fun and interactive activities focused on STEM, entrepreneurship, technology &amp; AI, communications &amp; social media, college &amp; career preparation, language and culture.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="aspect-square md:aspect-video rounded-3xl overflow-hidden glass border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80"
                alt="Students engaged in activities"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
        {/* Sponsorship Tiers */}
        <div className="mt-24 border-t border-slate-200 pt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Capital Campaign Sponsorship</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Your sponsorship will support FLCRC's new building. As a Campaign Sponsor, you will be recognized on our website and in our quarterly newsletter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsors.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <ScrollReveal key={tier.name} delay={i * 100}>
                  <div className={`h-full text-center p-10 bg-slate-50 border border-slate-200 rounded-3xl shadow-sm hover:shadow-2xl transition-all relative overflow-hidden group hover:border-blue-300 ${i === 0 ? "lg:col-span-3" : ""}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${tier.bg.replace('/20', '/10').replace('/20', '/10')} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10">
                      <Icon size={56} className={`mx-auto mb-6 ${tier.color}`} />
                      <h3 className="text-2xl font-black text-slate-900 mb-2">{tier.name}</h3>
                      <p className={`text-4xl font-black mb-8 ${tier.color}`}>{tier.price}</p>
                      <button className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all uppercase tracking-widest text-xs" onClick={openDonate}>
                        Become a Sponsor
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
      </section>

      {/* ===== DONATION OPTIONS — Dark Section ===== */}
      <section className="relative py-24 px-4 bg-luminous-bg z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass p-10 rounded-3xl border border-white/10 hover:border-luminous-cyan/30 transition-all text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Donate Online</h3>
                <p className="text-luminous-muted mb-8 leading-relaxed">
                  By making a tax-deductible donation to our capital campaign, you will allow us to expand a highly engaging and impactful summer program for our youth. Complete your donation securely online.
                </p>
                <Button variant="primary" onClick={openDonate} className="w-full md:w-auto px-10">Make a Donation</Button>
              </div>
              <div className="glass p-10 rounded-3xl border border-white/10 hover:border-luminous-fuchsia/30 transition-all text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Donate by Check</h3>
                <p className="text-luminous-muted leading-relaxed">
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
      </section>
    </>
  );
}
