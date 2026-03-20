"use client";

import AnimatedBackground from "@/components/layout/AnimatedBackground";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import { Check, Target, Heart, Shield, Users, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

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
    <div className="min-h-screen flex flex-col relative text-luminous-text">
      <AnimatedBackground />
      <Navigation onDonate={() => {}} />

      <main className="flex-grow z-10 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-luminous-fuchsia font-bold uppercase tracking-widest text-sm mb-4 block">
                Who We Are
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
                Our Mission & Vision
              </h1>
              <p className="text-luminous-muted max-w-3xl mx-auto text-lg leading-relaxed">
                The Family Life and Community Resource Center (FLCRC) is a 501(c)(3) non-profit with the mission to promote positive change in the community through education, training, partnerships, collaboration, support, health and wellness. Equipping individuals, families, and schools with resources to build a thriving community is FLCRC’s goal.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
            <ScrollReveal delay={100}>
              <GlassCard className="h-full p-8 border border-white/10 relative overflow-hidden group hover:border-luminous-cyan/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-luminous-cyan/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-6">Core Competencies</h3>
                  <div className="space-y-4">
                    {competencies.map((comp, i) => {
                      const Icon = comp.icon;
                      return (
                        <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                          <div className="bg-luminous-cyan/10 p-2 rounded-lg text-luminous-cyan">
                            <Icon size={20} />
                          </div>
                          <span className="text-white font-medium">{comp.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <GlassCard className="h-full p-8 border border-white/10 relative overflow-hidden group hover:border-luminous-fuchsia/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-luminous-fuchsia/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-6">Strategic Community Plan</h3>
                  <div className="space-y-4">
                    {strategicPlan.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-2">
                        <div className="text-luminous-fuchsia shrink-0 mt-1">
                          <Check size={20} />
                        </div>
                        <span className="text-luminous-muted">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>

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
                    <Button variant="outline">
                      Meet Our Team
                    </Button>
                  </Link>
                  <Link href="/programs">
                    <Button variant="primary">
                      Explore Programs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
