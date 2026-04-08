"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  GraduationCap,
  ArrowRight,
  Check,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { iconMap } from "@/lib/icons";
import { fallbackPrograms } from "@/lib/fallback-data";
import type { Program } from "@/lib/supabase/types";
import PageBanner from "@/components/layout/PageBanner";

// Color mapping for the icon color in the card
const colorMap: Record<string, string> = {
  "bg-blue-600": "text-luminous-cyan",
  "bg-purple-600": "text-luminous-violet",
  "bg-emerald-600": "text-emerald-400",
  "bg-rose-600": "text-luminous-fuchsia",
  "bg-yellow-400": "text-yellow-400",
  "bg-red-400": "text-red-400",
};

const programImages: Record<string, string> = {
  Youth: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
  Community: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
  Family: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
};

export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [filter, setFilter] = useState("All");
  const [programs, setPrograms] = useState<Program[]>(fallbackPrograms);
  const [appForm, setAppForm] = useState({ name: "", email: "", phone: "", reason: "" });
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [appSubmitting, setAppSubmitting] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;
    setAppSubmitting(true);
    try {
      const supabase = createClient();
      await supabase.from("form_submissions").insert({
        type: "program_application",
        name: appForm.name,
        email: appForm.email,
        phone: appForm.phone || null,
        message: appForm.reason || null,
        metadata: { program_title: selectedProgram.title, program_tag: selectedProgram.tag },
      });
    } catch (err) {
      console.error("Program application error:", err);
    }
    setAppSubmitting(false);
    setAppSubmitted(true);
  };

  const closeProgram = () => {
    setSelectedProgram(null);
    setAppSubmitted(false);
    setAppForm({ name: "", email: "", phone: "", reason: "" });
  };

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("programs")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }: { data: Program[] | null }) => {
        if (data && data.length > 0) setPrograms(data);
      })
      .catch((err: unknown) => console.error("Programs fetch error:", err));
  }, []);

  const allTags = ["All", ...Array.from(new Set(programs.map((p) => p.tag).filter(Boolean)))];
  const filtered = filter === "All" ? programs : programs.filter((p) => p.tag === filter);

  return (
    <>
      <PageBanner 
        title="Our Programs" 
        subtitle="Targeted initiatives designed for community health and family stability. Free, effective, and proven." 
        imageSrc="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80"
      />
      <div className="pb-20 px-4 pt-16">
        <div className="max-w-7xl mx-auto">

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
      </div>

      {/* Program Detail Modal */}
      <Modal
        isOpen={!!selectedProgram}
        onClose={closeProgram}
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

            {appSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check size={32} className="text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white">Application Submitted!</h4>
                <p className="text-luminous-muted text-sm">We&apos;ll review your application for <strong className="text-white">{selectedProgram.title}</strong> and reach out soon.</p>
                <Button variant="outline" onClick={closeProgram} className="mt-4">Close</Button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider">Apply for this Program</h4>
                <input type="text" required placeholder="Full Name" value={appForm.name}
                  onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-cyan transition-colors text-white placeholder:text-gray-500" />
                <input type="email" required placeholder="Email Address" value={appForm.email}
                  onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-cyan transition-colors text-white placeholder:text-gray-500" />
                <input type="tel" placeholder="Phone Number (optional)" value={appForm.phone}
                  onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-cyan transition-colors text-white placeholder:text-gray-500" />
                <textarea rows={3} placeholder="Why are you interested in this program?" value={appForm.reason}
                  onChange={(e) => setAppForm({ ...appForm, reason: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-cyan transition-colors text-white resize-none placeholder:text-gray-500" />
                <Button variant="primary" type="submit" className="w-full" disabled={appSubmitting}>
                  {appSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
