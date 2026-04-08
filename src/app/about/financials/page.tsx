"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { FileText, ExternalLink, LineChart } from "lucide-react";
import PageBanner from "@/components/layout/PageBanner";

const forms = ["2018-19", "2017-18", "2016-17", "2015-16", "2014-15"];

export default function FinancialsPage() {
  return (
    <>
      <PageBanner 
        title="Our Financials" 
        subtitle="The Family Life and Community Resource Center is a 501(c)(3) non-profit. Transparency is a fundamental value of our organization." 
        imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80"
      />
      <div className="pb-20 px-4 pt-16">
        <div className="max-w-4xl mx-auto">

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <ScrollReveal delay={100}>
            <GlassCard className="h-full p-8 text-center flex flex-col justify-center items-center border border-white/10 hover:border-emerald-500/50 transition-colors">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 text-emerald-400">
                <ExternalLink size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Guidestar Profile</h3>
              <p className="text-luminous-muted mb-8">
                View our Guidestar profile for independent financial verification and organizational details.
              </p>
              <Button variant="primary" onClick={() => alert("This link is currently unavailable.")}>
                View Profile on Guidestar
              </Button>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <GlassCard className="h-full p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="text-white" size={24} />
                <h3 className="text-2xl font-bold text-white">Form 990s</h3>
              </div>
              <p className="text-luminous-muted mb-6 text-sm">
                Publicly available IRS Form 990 documentation from past fiscal years.
              </p>
              <div className="space-y-3">
                {forms.map((year) => (
                  <div
                    key={year}
                    onClick={() => alert("This document is currently unavailable due to hosting issues. Please contact info@familylifecrc.org for a copy.")}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                  >
                    <span className="text-white font-medium">{year} Tax Return</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 px-3 py-1 bg-emerald-400/10 rounded-full">
                      PDF
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </div>
    </>
  );
}
