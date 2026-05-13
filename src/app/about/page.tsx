"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Network,
  Shield,
  HeartHandshake,
  BookOpen,
  GraduationCap,
  Target,
  Handshake,
  Link2,
  Heart,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { fallbackTeam } from "@/lib/fallback-data";
import { useDonate } from "@/components/layout/DonateProvider";
import type { TeamMember } from "@/lib/supabase/types";

const coreCompetencies = [
  { title: "Community Support", icon: Network, gradient: "from-[#6fa8dc] to-[#5b93c7]" },
  { title: "Crime Victim Services", icon: Shield, gradient: "from-[#e87d4a] to-[#e6c830]" },
  { title: "Stronger Families", icon: HeartHandshake, gradient: "from-[#e6c830] to-[#9fbf45]" },
  { title: "Trainings", icon: BookOpen, gradient: "from-[#9fbf45] to-[#6fa8dc]" },
  { title: "Youth Services", icon: GraduationCap, gradient: "from-[#e6c830] to-[#d4b828]" },
];

const strategicPlan = [
  { text: "Assessing and meeting the needs of the community", icon: Target },
  { text: "Collaborating partnerships committed to creating positive change", icon: Handshake },
  { text: "Linking youth and families with resources", icon: Link2 },
  { text: "Maintaining a culture of respect at all times", icon: Heart },
  { text: "Promoting a safe and healthy community", icon: ShieldCheck },
  { text: "Providing direct services to crime victims", icon: Stethoscope },
];

export default function AboutPage() {
  const { openDonate } = useDonate();
  const [leadershipTeam, setLeadershipTeam] = useState<TeamMember[]>(fallbackTeam);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }: { data: TeamMember[] | null }) => {
        if (data && data.length > 0) setLeadershipTeam(data);
      })
      .catch((err: unknown) => console.error("Team fetch error:", err));
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 px-4 min-h-[55vh] flex items-center bg-gradient-to-b from-luminous-bg via-luminous-bg to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(148,205,255,0.06)_0%,transparent_60%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Our <span className="text-gradient">Mission</span> & Vision
          </h1>
          <p className="text-lg md:text-xl text-luminous-muted max-w-3xl mx-auto leading-relaxed">
            The Family Life and Community Resource Center (FLCRC) is a 501(c)(3) non-profit
            with the mission to promote positive change in the community through education,
            training, partnerships, collaboration, support, health and wellness.
          </p>
        </div>
      </section>

      {/* ===== MISSION STATEMENT — Light Section ===== */}
      <section className="bg-white text-slate-900 py-24 px-4 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Our Goal
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                  Equipping Communities to Thrive
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Equipping individuals, families, and schools with resources to build
                  a thriving community is FLCRC&apos;s goal. We provide ongoing assistance
                  for crime victims, youth, families, and communities.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  The diversity of backgrounds and experience among the FLCRC team
                  provides leadership that impacts the entire community. The talents
                  and over <span className="font-bold text-slate-900">150 years combined experience</span> of
                  our mental health professionals and educators strengthen our services,
                  generating very powerful outcomes.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-15" />
                <div className="bg-slate-100 p-3 rounded-3xl border border-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000"
                    className="w-full rounded-2xl"
                    alt="FLCRC Team"
                    width={1000}
                    height={700}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== CORE COMPETENCIES — Dark Section ===== */}
      <section className="relative py-24 px-4 bg-luminous-bg z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionTitle title="Core Competencies" />
            <p className="text-center text-luminous-muted max-w-2xl mx-auto mb-12 -mt-4">
              Five pillars of service that define everything we do.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {coreCompetencies.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <GlassCard className="h-full group text-center p-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform mx-auto`}
                  >
                    <item.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STRATEGIC PLAN — Light Section ===== */}
      <section className="bg-slate-50 text-slate-900 py-24 px-4 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
                Our Approach
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                Strategic Community Plan
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {strategicPlan.map((item, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon size={20} />
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed pt-1.5">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POSITIVE CHANGE AGENT — Dark CTA ===== */}
      <section className="relative py-20 px-4 bg-luminous-bg z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="glass rounded-3xl p-12 md:p-16 text-center border border-white/10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                We Are a <span className="text-gradient">Positive Change Agent</span>
              </h2>
              <p className="text-luminous-muted text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                The diversity of backgrounds and experience among the FLCRC team provides
                leadership that impacts the entire community. Our mental health professionals
                and educators bring over 150 years of combined experience.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="glass p-5 rounded-2xl text-center min-w-[120px]">
                  <span className="block text-3xl font-bold text-luminous-cyan mb-1">150+</span>
                  <span className="text-[10px] text-luminous-muted uppercase tracking-widest">Years Combined Experience</span>
                </div>
                <div className="glass p-5 rounded-2xl text-center min-w-[120px]">
                  <span className="block text-3xl font-bold text-luminous-fuchsia mb-1">8</span>
                  <span className="text-[10px] text-luminous-muted uppercase tracking-widest">Programs & Services</span>
                </div>
                <div className="glass p-5 rounded-2xl text-center min-w-[120px]">
                  <span className="block text-3xl font-bold text-luminous-violet mb-1">10+</span>
                  <span className="text-[10px] text-luminous-muted uppercase tracking-widest">Years of Service</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== LEADERSHIP TEAM — Light Section ===== */}
      <section className="bg-white text-slate-900 py-24 px-4 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
                Our People
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                Leadership Team
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {leadershipTeam.map((person, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      {person.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{person.name}</h3>
                      <p className="text-sm text-slate-500 font-medium">{person.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{person.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
