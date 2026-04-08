"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import { Check, Target, Heart, Shield, Users, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import PageBanner from "@/components/layout/PageBanner";

const competencies = [
  { name: "Community Support", icon: Users },
  { name: "Crime Victim Services", icon: Shield },
  { name: "Stronger Families", icon: Heart },
  { name: "Trainings", icon: BookOpen },
  { name: "Youth Services", icon: Target },
];

const strategicPlan = [
  "Assessing and meeting the needs of the community",
  "Collaborating partnerships committed to creating a positive change",
  "Linking youth and families with resources",
  "Maintaining a culture of respect at all times",
  "Promoting a safe and healthy community",
  "Providing direct services to crime victims",
];

export default function MissionVisionPage() {
  return (
    <>
      <PageBanner 
        title="Our Mission & Vision" 
        subtitle="The Family Life and Community Resource Center (FLCRC) is a 501(c)(3) non-profit with the mission to promote positive change in the community." 
        imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
      />
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-4 block">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">Core Focus</h2>
              <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed mb-4">
                Our organization is guided by a strong commitment to uplifting the community through targeted competencies and strategic frameworks.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <ScrollReveal delay={100}>
              <div className="h-full p-8 border border-slate-200 rounded-2xl bg-slate-50 relative overflow-hidden group hover:border-luminous-cyan/40 hover:shadow-xl transition-all">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Core Competencies</h3>
                <div className="space-y-4">
                  {competencies.map((comp, i) => {
                    const Icon = comp.icon;
                    return (
                      <div key={i} className="flex items-center gap-4 bg-white border border-slate-100 shadow-sm p-4 rounded-xl">
                        <div className="bg-luminous-cyan/10 p-2 rounded-lg text-blue-600">
                          <Icon size={20} />
                        </div>
                        <span className="text-slate-800 font-medium">{comp.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="h-full p-8 border border-slate-200 rounded-2xl bg-slate-50 relative overflow-hidden group hover:border-purple-400 hover:shadow-xl transition-all">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Strategic Community Plan</h3>
                <div className="space-y-4">
                  {strategicPlan.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-2">
                      <div className="text-purple-500 shrink-0 mt-1">
                        <Check size={20} />
                      </div>
                      <span className="text-slate-600 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      </section>

      <section className="relative bg-luminous-bg text-white py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">

        <ScrollReveal delay={300}>
          <div className="glass p-10 rounded-3xl border border-white/10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-luminous-cyan/10 to-blue-500/10" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Driving Powerful Outcomes</h3>
              <p className="text-luminous-muted leading-relaxed mb-8">
                The diversity of backgrounds and experience among the FLCRC team provides leadership that impacts the entire community. The talents and over 150 years combined experience of our mental health professionals and educators strengthen our services, generating very powerful outcomes. We are a positive change agent in the community.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link href="/about/team">
                  <Button variant="outline">Meet Our Team</Button>
                </Link>
                <Link href="/programs">
                  <Button variant="primary">Explore Programs</Button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
        </div>
      </section>
    </>
  );
}
