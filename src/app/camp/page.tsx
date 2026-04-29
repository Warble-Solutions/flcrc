"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import PageBanner from "@/components/layout/PageBanner";
import Button from "@/components/ui/Button";
import { Compass, GraduationCap, Laptop, Sparkles, Check } from "lucide-react";

export default function CampPage() {
  const submitCampRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Camp Registration functionality will be connected to your database shortly!");
  };

  return (
    <>
      <PageBanner
        title="Summer Camp Registration"
        subtitle="Transform your summer into a six-week adventure. The Youth Ambassador Leadership Education (Y.A.L.E.) program provides students from 5th grade through college a highly engaging environment to build confidence and skills."
        imageSrc="https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1600&q=80"
      />

      {/* ===== CAMP DETAILS — Light Section ===== */}
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">A New Summer Enrichment Experience</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Immersing students in fun and interactive activities focused on STEM, entrepreneurship, technology, college preparation, and culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Compass, title: "Character Building", desc: "Develop strong leadership fundamentals and social skills." },
              { icon: Laptop, title: "STEM & Tech", desc: "Hands-on projects with AI, robotics, and coding." },
              { icon: Sparkles, title: "Entrepreneurship", desc: "Learn financial literacy and build your own business plan." },
              { icon: GraduationCap, title: "College Prep", desc: "Readiness workshops for high school and college careers." }
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 h-full flex flex-col hover:shadow-xl transition-all hover:border-blue-300">
                  <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-6">Register Today</h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Spaces are limited for our specialized six-week summer camp. Secure your spot today to guarantee a summer of growth and exploration.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="bg-rose-100 p-2 rounded-xl text-rose-600 shrink-0">
                      <Check size={20} />
                    </div>
                    <span className="text-slate-800 font-bold">Grades 5th - College Level</span>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="bg-purple-100 p-2 rounded-xl text-purple-600 shrink-0">
                      <Check size={20} />
                    </div>
                    <span className="text-slate-800 font-bold">6-Week Immersive Duration</span>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600 shrink-0">
                      <Check size={20} />
                    </div>
                    <span className="text-slate-800 font-bold">Financial Assistance Available</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-2xl relative overflow-hidden">
                <h3 className="text-2xl font-black text-slate-900 mb-2 relative z-10">Application Form</h3>
                <p className="text-slate-500 text-sm mb-8 relative z-10">Start your primary registration below.</p>
                
                <form onSubmit={submitCampRegistration} className="space-y-5 relative z-10">
                  <input type="text" required placeholder="Parent / Guardian Name"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                  <div className="grid md:grid-cols-2 gap-5">
                    <input type="email" required placeholder="Email Address"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                    <input type="tel" placeholder="Phone Number"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                  </div>
                  <input type="text" required placeholder="Student Name(s) & Grade(s)"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#e87d4a] to-[#e6c830] text-slate-900 font-bold rounded-xl text-lg hover:opacity-90 transition-opacity uppercase tracking-widest text-sm shadow-xl shadow-[#e87d4a]/20">
                    Apply for Camp
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECONDARY CTA — Dark Section ===== */}
      <section className="relative py-24 px-4 bg-slate-900 z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Need More Information?
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              If you have any questions regarding the Y.A.L.E. Summer Enrichment Experience schedule or logistics, our team is here to help!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" onClick={() => window.location.href = '/contact'}>
                Contact Us
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
