"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { useDonate } from "@/components/layout/DonateProvider";
import PageBanner from "@/components/layout/PageBanner";

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
        imageSrc="https://images.unsplash.com/photo-1517048676732-d68078c807eb?w=1600&q=80"
      />
      <div className="pb-20 px-4 pt-16">
        <div className="max-w-5xl mx-auto">

        {/* Progress Section */}
        <ScrollReveal delay={100}>
          <div className="glass p-12 rounded-3xl border border-white/10 text-center mb-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-luminous-cyan/5 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-8">Campaign Progress</h3>
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-between text-sm font-bold uppercase tracking-wider mb-3">
                  <span className="text-luminous-cyan">Raised: ${raised.toLocaleString()}</span>
                  <span className="text-white">Goal: ${goal.toLocaleString()}</span>
                </div>
                <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-luminous-cyan to-blue-500 transition-all duration-1000 ease-out relative"
                    style={{ width: `${percent}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
                <p className="text-luminous-muted mb-8">
                  {percent}% funded towards our $200,000 target. Every contribution brings us closer!
                </p>
                <Button variant="primary" onClick={openDonate}>Donate to the Campaign</Button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Information Sections */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal>
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Creating a New Summer Enrichment Experience</h3>
              <p className="text-luminous-muted leading-relaxed mb-6">
                The Youth Ambassador Leadership Education (Y.A.L.E.) program provides students 5th grade through college the opportunity to participate in activities related to character building, leadership, service learning, and college and career preparation.
              </p>
              <p className="text-luminous-muted leading-relaxed">
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

        <ScrollReveal delay={200}>
          <div className="text-center glass p-10 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">You Can Make a Difference</h3>
            <p className="text-luminous-muted max-w-2xl mx-auto mb-8">
              By making a tax-deductible donation to our capital campaign, you will allow us to expand a highly engaging and impactful summer program for our youth, with the ultimate goal of building a bold and confident generation of leaders.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/sponsorship">
                <Button variant="outline">Become a Sponsor</Button>
              </Link>
              <Button variant="primary" onClick={openDonate}>Make a Donation</Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
    </>
  );
}
