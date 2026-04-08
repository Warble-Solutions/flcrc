"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Briefcase, CheckCircle2, Link as LinkIcon, Download } from "lucide-react";
import PageBanner from "@/components/layout/PageBanner";

export default function ProgramCoordinatorPage() {
  return (
    <>
      <PageBanner 
        title="Program Coordinator" 
        subtitle="Now Hiring Full-Time Position • Richmond, TX" 
        imageSrc="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80"
      />
      <div className="pb-20 px-4 pt-16">
        <div className="max-w-4xl mx-auto">

        <ScrollReveal delay={100}>
          <GlassCard className="p-8 md:p-12 mb-12 border border-emerald-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Job Description</h2>
            <p className="text-luminous-muted leading-relaxed mb-6">
              Reporting directly to the Executive Director, the Program Coordinator will plan and coordinate programs for the Family Life and Community Resource Center (FLCRC). This individual is responsible for overseeing the functioning of programs service delivery, ensuring compliance, and maintaining positive working relationships with clients, community organizations, schools, churches, and business partners.
            </p>
            <p className="text-luminous-muted leading-relaxed">
              In addition, this individual is responsible for case management supervision, direct services, training, and monitoring program outputs and outcomes. The Program Coordinator also works with clients/families to establish and accomplish goals, provide advocacy support, and promote empowerment to crime survivors.
            </p>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 px-4">Qualifications &amp; Requirements</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Bachelor's degree from an accredited College or University is required.",
                "Master's degree in social work, psychology, counseling or related field is preferred.",
                "Minimum of five years experience in social work, case management, counseling, and community outreach.",
                "Experience with Crime Survivors and Trauma-related mental health case management preferred.",
                "Excellent interpersonal, written, verbal, and multidisciplinary project skills.",
                "Proficient in MS Office and data management systems.",
                "Action-oriented, adaptable, and innovative approach.",
                "Passion, integrity, positive attitude, mission-driven, and self-directed.",
                "Bilingual preferred (ability to understand and communicate with Spanish-speaking individuals).",
              ].map((req, i) => (
                <div key={i} className="glass p-5 rounded-2xl flex items-start gap-4 border border-white/5">
                  <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
                  <span className="text-luminous-muted text-sm leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="glass p-10 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">Interested in Applying?</h3>
              <p className="text-luminous-muted mb-8 max-w-2xl mx-auto">
                Please submit your completed FLCRC employment application, cover letter, and resume to{" "}
                <a href="mailto:info@familylifecrc.org" className="text-emerald-400 hover:underline">
                  info@familylifecrc.org
                </a>.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => alert("This document is currently unavailable. Please contact info@familylifecrc.org for a copy.")}
                >
                  <Download size={18} /> Download Application PDF
                </Button>
                <a
                  href="mailto:info@familylifecrc.org"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-colors cursor-pointer"
                >
                  <LinkIcon size={18} /> Email Application
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
    </>
  );
}
