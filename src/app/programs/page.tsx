"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  GraduationCap,
  RefreshCw,
  MessageCircle,
  Zap,
  Shield,
  BookOpen,
  ArrowRight,
  Check,
  Network,
  HeartHandshake,
  Users,
  Heart,
} from "lucide-react";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { Program } from "@/lib/supabase/types";

// Icon mapping for programs stored in Supabase
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GraduationCap,
  RefreshCw,
  MessageCircle,
  Zap,
  Shield,
  BookOpen,
  Network,
  HeartHandshake,
  Users,
  Heart,
};

// Color mapping for the icon color in the card
const colorMap: Record<string, string> = {
  "bg-blue-600": "text-luminous-cyan",
  "bg-purple-600": "text-luminous-violet",
  "bg-emerald-600": "text-emerald-400",
  "bg-rose-600": "text-luminous-fuchsia",
  "bg-yellow-400": "text-yellow-400",
  "bg-red-400": "text-red-400",
};

// Fallback programs if Supabase is unavailable
const fallbackPrograms: Program[] = [
  { id: "1", title: "YALE Leadership", description: "Youth Ambassador Leadership Education — civic engagement & mentorship for tomorrow's leaders.", tag: "Youth", icon: "GraduationCap", color: "bg-blue-600", is_featured: true, sort_order: 0, created_at: "" },
  { id: "2", title: "Restorative Practices", description: "Conflict resolution training that heals rather than punishes. For schools, workplaces, and homes.", tag: "Community", icon: "RefreshCw", color: "bg-purple-600", is_featured: true, sort_order: 1, created_at: "" },
  { id: "3", title: "Parent Chat", description: "Support circles where parents connect, share experiences, and learn together.", tag: "Family", icon: "MessageCircle", color: "bg-emerald-600", is_featured: false, sort_order: 2, created_at: "" },
  { id: "4", title: "GRIT Program", description: "Growth Rewarding Insight Tools — building resilience in at-risk youth.", tag: "Youth", icon: "Zap", color: "bg-yellow-400", is_featured: true, sort_order: 3, created_at: "" },
  { id: "5", title: "Victim Services", description: "Confidential crisis intervention, counseling, and legal advocacy for crime victims.", tag: "Community", icon: "Shield", color: "bg-rose-600", is_featured: false, sort_order: 4, created_at: "" },
  { id: "6", title: "Scholarships", description: "Financial aid and awards to support students pursuing higher education.", tag: "Family", icon: "BookOpen", color: "bg-emerald-600", is_featured: false, sort_order: 5, created_at: "" },
];

const programImages: Record<string, string> = {
  Youth: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
  Community: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
  Family: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
};

export default function ProgramsPage() {
  const [showDonate, setShowDonate] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [filter, setFilter] = useState("All");
  const [programs, setPrograms] = useState<Program[]>(fallbackPrograms);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("programs")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }: { data: Program[] | null }) => {
        if (data && data.length > 0) setPrograms(data);
      });
  }, []);

  const allTags = ["All", ...Array.from(new Set(programs.map((p) => p.tag).filter(Boolean)))];
  const filtered = filter === "All" ? programs : programs.filter((p) => p.tag === filter);

  return (
    <div className="min-h-screen flex flex-col relative text-luminous-text">
      <AnimatedBackground />
      <Navigation onDonate={() => setShowDonate(true)} />

      <main className="flex-grow z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
                Our Programs
              </h1>
              <p className="text-luminous-muted max-w-2xl mx-auto text-lg">
                Targeted initiatives designed for community health and family stability.
                Free, effective, and proven.
              </p>
            </div>
          </ScrollReveal>

          {/* Filter Chips */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {allTags.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat!)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    filter === cat
                      ? "bg-white text-black shadow-lg scale-105"
                      : "glass text-luminous-muted hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((prog, i) => {
              const IconComp = iconMap[prog.icon || ""] || GraduationCap;
              const iconColor = colorMap[prog.color || ""] || "text-luminous-cyan";
              return (
                <ScrollReveal key={prog.id} delay={i * 50}>
                  <GlassCard
                    className="cursor-pointer group relative overflow-hidden h-full"
                    hoverEffect={true}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-luminous-cyan to-luminous-fuchsia" />
                    <div
                      onClick={() => setSelectedProgram(prog)}
                      className="relative z-10"
                    >
                      <div className="flex justify-between items-start mb-8">
                        <IconComp size={32} className={iconColor} />
                        {prog.tag && (
                          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 bg-white/5 text-luminous-muted">
                            {prog.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-luminous-cyan transition-colors">
                        {prog.title}
                      </h3>
                      <p className="text-luminous-muted mb-8">{prog.description}</p>
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/70 group-hover:text-white group-hover:gap-4 transition-all">
                        Explore <ArrowRight size={16} />
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />

      {/* Program Detail Modal */}
      <Modal
        isOpen={!!selectedProgram}
        onClose={() => setSelectedProgram(null)}
        title={selectedProgram?.title || ""}
      >
        {selectedProgram && (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden h-48 border border-white/10">
              <Image
                src={programImages[selectedProgram.tag || ""] || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"}
                className="w-full h-full object-cover"
                alt={selectedProgram.title}
                width={800}
                height={400}
                unoptimized
              />
            </div>
            <p className="text-lg text-luminous-muted leading-relaxed">
              {selectedProgram.description}
            </p>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-white mb-3">What we provide:</h4>
              <ul className="space-y-2 text-luminous-muted text-sm">
                {["Certified Curriculum", "Expert Mentors", "Community Networking", "Certificate of Completion"].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center">
                    <Check size={16} className="text-luminous-cyan" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="primary" className="w-full">
              Apply for Program
            </Button>
          </div>
        )}
      </Modal>

      {/* Donate Modal */}
      <Modal isOpen={showDonate} onClose={() => setShowDonate(false)} title="Support Our Mission">
        <div className="space-y-6">
          <p className="text-luminous-muted text-center">Your generous donation supports programs for at-risk youth and families in crisis.</p>
          <div className="grid grid-cols-3 gap-4">
            {[50, 100, 250].map((amt) => (
              <button key={amt} className="py-3 border border-white/20 rounded-xl font-bold hover:bg-luminous-cyan hover:text-black transition-colors cursor-pointer">${amt}</button>
            ))}
          </div>
          <Button variant="primary" className="w-full">Process Secure Donation</Button>
        </div>
      </Modal>
    </div>
  );
}
