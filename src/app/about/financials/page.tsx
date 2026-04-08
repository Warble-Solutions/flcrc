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
        imageSrc="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80"
      />

      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">
                Independent Verification
              </h1>
              <p className="text-slate-600 text-lg">
                We believe in providing full visibility into how your contributions impact the community.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative bg-luminous-bg text-white py-24 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
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
      </section>
    </>
  );
}
