"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  "bg-blue-600": "text-[#6fa8dc]",
  "bg-purple-600": "text-[#9fbf45]",
  "bg-emerald-600": "text-[#9fbf45]",
  "bg-rose-600": "text-[#e87d4a]",
  "bg-[#d4b828]": "text-[#d4b828]",
  "bg-red-400": "text-[#e87d4a]",
};

const programImages: Record<string, string> = {
  Youth: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
  Community: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
  Family: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
};

export default function ProgramsPage() {
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
      })
      .catch((err: unknown) => console.error("Programs fetch error:", err));
  }, []);

  const allTags = ["All", ...Array.from(new Set(programs.map((p) => p.tag).filter(Boolean)))];
  const filtered = filter === "All" ? programs : programs.filter((p) => p.tag === filter);

  return (
    <>
      <PageBanner 
        title="Our Programs" 
        subtitle="Empowering youth and families through comprehensive educational, leadership, and wellness programs designed to build a thriving community." 
        imageSrc="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600&q=80"
      />
      <section className="relative bg-slate-50 text-slate-900 py-24 px-4 z-10">
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
                      ? "bg-[#1b2847] text-white shadow-lg scale-105"
                      : "bg-white border border-slate-200 text-slate-500 hover:text-[#5b93c7] hover:border-[#5b93c7]"
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
                <ScrollReveal key={prog.id} delay={i * 50} className="h-full">
                  <Link
                    href={`/programs/${prog.slug || "yale-leadership"}`}
                    className="h-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#5b93c7] transition-all cursor-pointer group flex flex-col relative overflow-hidden block"
                  >
                    <div className="relative z-10 flex-grow">
                      <div className="flex justify-between items-start mb-8">
                        <IconComp size={32} className={`text-opacity-80 ${iconColor.replace('text-', 'text-')}`} />
                        {prog.tag && (
                          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#5b93c7]/30 bg-[#6fa8dc]/10 text-[#5b93c7]">
                            {prog.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-[#5b93c7] transition-colors">
                        {prog.title}
                      </h3>
                      <p className="text-slate-600 mb-8 leading-relaxed flex-grow">{prog.description}</p>
                    </div>
                    <div className="relative z-10 mt-auto">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#5b93c7] group-hover:gap-4 transition-all w-max py-2">
                        Explore <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 bg-luminous-bg z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Empower the Future
            </h2>
            <p className="text-luminous-muted text-lg mb-10 leading-relaxed text-center">
              Our programs thrive on the support of volunteers, donors, and community leaders. If you are passionate about changing lives, consider getting involved today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" onClick={() => window.location.href = '/volunteer'}>
                Volunteer Now
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/donate'}>
                Make a Donation
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
