"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, GraduationCap } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { iconMap } from "@/lib/icons";
import { fallbackPrograms } from "@/lib/fallback-data";
import type { Program } from "@/lib/supabase/types";
import PageBanner from "@/components/layout/PageBanner";

const programImages: Record<string, string> = {
  Youth: "/images/headers/yale.jpg",
  Community: "/images/headers/grit.jpg",
  Family: "/images/headers/parent-chat.jpg",
  Education: "/images/headers/restorative.jpg",
};

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  const [appForm, setAppForm] = useState({ name: "", email: "", phone: "", reason: "" });
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [appSubmitting, setAppSubmitting] = useState(false);

  useEffect(() => {
    async function fetchProgram() {
      const supabase = createClient();
      const { data } = await supabase.from("programs").select("*").eq("slug", slug).single();
      
      if (data) {
        setProgram(data);
      } else {
        const fallback = fallbackPrograms.find(p => p.slug === slug);
        if (fallback) setProgram(fallback);
      }
      setLoading(false);
    }
    fetchProgram();
  }, [slug]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program) return;
    setAppSubmitting(true);
    try {
      const supabase = createClient();
      await supabase.from("form_submissions").insert({
        type: "program_application",
        name: appForm.name,
        email: appForm.email,
        phone: appForm.phone || null,
        message: appForm.reason || null,
        metadata: { program_title: program.title, program_tag: program.tag },
      });
    } catch (err) {
      console.error("Program application error:", err);
    }
    setAppSubmitting(false);
    setAppSubmitted(true);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p>Loading...</p></div>;
  }

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
        <h1 className="text-4xl font-black mb-4">Program Not Found</h1>
        <Link href="/programs">
          <Button variant="primary">Return to Programs</Button>
        </Link>
      </div>
    );
  }

  const imageSrc = programImages[program.tag || ""] || "/images/headers/programs.jpg";

  return (
    <>
      <PageBanner 
        title={program.title} 
        subtitle={program.description || ""} 
        imageSrc={imageSrc}
      />
      
      <section className="relative bg-white text-slate-900 py-16 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <Link href="/programs" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12 font-bold text-sm uppercase tracking-wider">
            <ArrowLeft size={16} /> Back to All Programs
          </Link>

          <div className="grid lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">About this Program</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {program.description}
                </p>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">What we provide:</h3>
                  <ul className="space-y-4 text-slate-700 font-medium">
                    {["Certified Curriculum", "Expert Mentors", "Community Networking", "Certificate of Completion"].map((item, i) => (
                      <li key={i} className="flex gap-4 items-center">
                        <div className="bg-[#6fa8dc]/20 p-2 rounded-xl text-[#5b93c7]">
                          <Check size={20} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 border-t-[8px] border-t-[#6fa8dc] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-slate-900 mb-2">Apply Now</h3>
                  <p className="text-slate-500 mb-8">Take the first step. Submit your application and our team will get in touch.</p>

                  {appSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200 shadow-lg shadow-emerald-500/10">
                        <Check size={40} className="text-emerald-500" />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900">Application Received!</h4>
                      <p className="text-slate-600">We&apos;ll review your application for <strong className="text-slate-900">{program.title}</strong> and reach out to you shortly.</p>
                      <button type="button" onClick={() => setAppSubmitted(false)} className="mt-4 px-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-xs hover:bg-slate-50 transition-colors">
                        Submit Another
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="space-y-5">
                      <input type="text" required placeholder="Full Name" value={appForm.name}
                        onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#6fa8dc] focus:ring-2 focus:ring-[#6fa8dc]/20 transition-all text-slate-900 placeholder:text-slate-400" />
                      <input type="email" required placeholder="Email Address" value={appForm.email}
                        onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#6fa8dc] focus:ring-2 focus:ring-[#6fa8dc]/20 transition-all text-slate-900 placeholder:text-slate-400" />
                      <input type="tel" placeholder="Phone Number (optional)" value={appForm.phone}
                        onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#6fa8dc] focus:ring-2 focus:ring-[#6fa8dc]/20 transition-all text-slate-900 placeholder:text-slate-400" />
                      <textarea rows={4} placeholder="Why are you interested in this program?" value={appForm.reason}
                        onChange={(e) => setAppForm({ ...appForm, reason: e.target.value })}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#6fa8dc] focus:ring-2 focus:ring-[#6fa8dc]/20 transition-all text-slate-900 resize-none placeholder:text-slate-400" />
                      <button type="submit" disabled={appSubmitting} className="w-full py-4 mt-4 bg-gradient-to-r from-[#5b93c7] to-[#6fa8dc] text-white font-bold rounded-xl hover:opacity-90 transition-opacity uppercase tracking-widest text-sm shadow-xl shadow-[#6fa8dc]/20 disabled:opacity-50">
                        {appSubmitting ? "Submitting..." : "Submit Application"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
