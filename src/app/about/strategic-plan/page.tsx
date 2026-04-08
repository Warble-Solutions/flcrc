"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Compass, Users, Link as LinkIcon, Handshake, Shield, Globe } from "lucide-react";
import PageBanner from "@/components/layout/PageBanner";

const fiveCs = [
  { name: "Community Outreach", icon: Globe, color: "text-blue-400" },
  { name: "Connecting Families with Resources", icon: LinkIcon, color: "text-emerald-400" },
  { name: "Collaborative Partnerships", icon: Handshake, color: "text-purple-400" },
  { name: "Community Safety and Wellness", icon: Shield, color: "text-rose-400" },
  { name: "Cultural Awareness", icon: Users, color: "text-amber-400" },
];

export default function StrategicPlanPage() {
  return (
    <>
      <PageBanner 
        title="Strategic Planning" 
        subtitle="FLCRC board members and staff regularly engage in planning sessions to assess our current programs, services, and community data to identify the present and future needs of our organization." 
        imageSrc="https://images.unsplash.com/photo-1507567087642-7efc9213fb46?w=1600&q=80"
      />
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={100}>
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">The Five C&apos;s</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {fiveCs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="text-center p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-400 transition-all">
                    <Icon size={32} className={`mx-auto mb-4 ${item.color.replace('text-white', 'text-slate-600')}`} />
                    <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
      </section>

      <section className="relative bg-luminous-bg text-white py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">

        <div className="grid md:grid-cols-2 gap-8 items-stretch mb-16">
          <ScrollReveal delay={200}>
            <div className="glass h-full p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-luminous-cyan/10 to-transparent pointer-events-none" />
              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Looking Ahead</h3>
                <p className="text-luminous-muted">
                  We will be sharing our 2025-2030 Strategic Plan soon. Stay tuned for our future community roadmap.
                </p>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4">Capital Campaign</h3>
                <p className="text-luminous-muted mb-6">
                  Learn about our current 2025-2026 Capital Campaign aimed at building a new generation of leaders.
                </p>
                <Link href="/campaign" className="w-full block">
                  <Button variant="primary" className="w-full">View Campaign</Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="glass h-full p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex-grow">
                <h3 className="text-2xl font-bold text-white mb-6">Past Strategic Plans</h3>
                <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/10 hover:bg-white/10 transition-colors mb-4">
                  <span className="text-white font-medium">2020-2024 Strategic Plan</span>
                  <Button variant="outline" onClick={() => alert("This document is currently unavailable due to hosting issues. Please contact info@familylifecrc.org for a copy.")}>Download PDF</Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        </div>
      </section>
    </>
  );
}
