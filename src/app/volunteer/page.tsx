"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { HeartHandshake, Check } from "lucide-react";
import PageBanner from "@/components/layout/PageBanner";

const opportunities = [
  "Annual Banquet",
  "Back-2-School Parent Chat",
  "Black History Month Celebration",
  "Bullying Awareness Conference",
  "Hat and Tea Soirée",
  "Summer Enrichment Camp",
  "Youth Ambassador Leadership Education (Y.A.L.E.) Program",
];

export default function VolunteerPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interests: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(false);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("form_submissions").insert({
        type: "volunteer",
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.interests || null,
      });
      if (error) throw error;
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", interests: "" });
    } catch (err) {
      console.error("Volunteer form error:", err);
      setFormError(true);
    }
    setSubmitting(false);
  };

  return (
    <>
      <PageBanner 
        title="Become a Volunteer" 
        subtitle="Join the mission of FLCRC and help us build leaders, strengthen families, and transform communities. Your time, talent, and passion can make a lasting impact." 
        imageSrc="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&q=80"
      />
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal delay={100}>
            <div>
              <h3 className="text-3xl font-black text-slate-900 mb-6">Opportunities to Serve</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                FLCRC relies on dedicated volunteers to help coordinate and run our various programs and community outreach events throughout the year. Areas where you can assist include:
              </p>
              <div className="space-y-4">
                {opportunities.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <div className="bg-blue-100 p-2 rounded-xl text-blue-600 shrink-0">
                      <Check size={20} />
                    </div>
                    <span className="text-slate-800 font-bold">{item}</span>
                  </div>
                ))}
                <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="bg-blue-100 p-2 rounded-xl text-blue-600 shrink-0">
                    <Check size={20} />
                  </div>
                  <span className="text-slate-800 font-bold">...and much more!</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 mb-2 relative z-10">Interested in Volunteering?</h3>
              <p className="text-slate-500 text-sm mb-8 relative z-10">Please complete the form below to let us know how you&apos;d like to help!</p>

              {submitted ? (
                <div className="text-center py-10 relative z-10 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-800 mb-2">Thank You!</h4>
                  <p className="text-emerald-600">Your volunteer application has been received. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <input type="text" required placeholder="Full Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                  <div className="grid md:grid-cols-2 gap-5">
                    <input type="email" required placeholder="Email Address" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                    <input type="tel" placeholder="Phone Number" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                  </div>
                  <textarea rows={4} required placeholder="Which events or areas are you interested in?" value={form.interests}
                    onChange={(e) => setForm({ ...form, interests: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400 resize-none" />
                  {formError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm text-center">
                      Something went wrong. Please try again or contact us directly.
                    </div>
                  )}
                  <button type="submit" disabled={submitting} className="w-full py-4 bg-slate-600 text-white font-bold rounded-xl text-lg hover:bg-slate-500 transition-colors uppercase tracking-widest text-sm">
                    {submitting ? "Sending..." : "Submit Volunteer Form"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SUPPORT CTA — Dark Section ===== */}
      <section className="relative py-24 px-4 bg-luminous-bg z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Another Way to Help
            </h2>
            <p className="text-luminous-muted text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              If volunteering isn&apos;t the right fit for you right now, you can still make a huge impact by becoming a member or making a donation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" onClick={() => window.location.href = '/donate'}>
                Donate / Become a Member
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
