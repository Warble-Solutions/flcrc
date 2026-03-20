"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { HeartHandshake, Check } from "lucide-react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const supabase = createClient();
      await supabase.from("form_submissions").insert({
        type: "volunteer",
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.interests || null,
      });
    } catch (err) {
      console.error("Volunteer form error:", err);
    }
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", interests: "" });
  };

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <HeartHandshake size={48} className="text-luminous-cyan mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
              Become a Volunteer
            </h1>
            <p className="text-luminous-muted max-w-2xl mx-auto text-lg leading-relaxed">
              Join the mission of FLCRC and help us build leaders, strengthen families, and transform communities. Your time, talent, and passion can make a lasting impact.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal delay={100}>
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Opportunities to Serve</h3>
              <p className="text-luminous-muted mb-8 leading-relaxed">
                FLCRC relies on dedicated volunteers to help coordinate and run our various programs and community outreach events throughout the year. Areas where you can assist include:
              </p>
              <div className="space-y-4">
                {opportunities.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 glass p-4 rounded-xl border border-white/5">
                    <div className="bg-luminous-cyan/10 p-2 rounded-lg text-luminous-cyan">
                      <Check size={20} />
                    </div>
                    <span className="text-white font-medium">{item}</span>
                  </div>
                ))}
                <div className="flex items-center gap-4 glass p-4 rounded-xl border border-white/5">
                  <div className="bg-luminous-cyan/10 p-2 rounded-lg text-luminous-cyan">
                    <Check size={20} />
                  </div>
                  <span className="text-white font-medium">...and much more!</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-luminous-cyan/5 to-transparent pointer-events-none" />
              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Interested in Volunteering?</h3>
              <p className="text-luminous-muted text-sm mb-8 relative z-10">Please complete the form below to let us know how you&apos;d like to help!</p>

              {submitted ? (
                <div className="text-center py-10 relative z-10">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                  <p className="text-luminous-muted">Your volunteer application has been received. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <input type="text" required placeholder="Full Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-cyan transition-colors text-white placeholder:text-gray-500" />
                  <div className="grid md:grid-cols-2 gap-5">
                    <input type="email" required placeholder="Email Address" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-cyan transition-colors text-white placeholder:text-gray-500" />
                    <input type="tel" placeholder="Phone Number" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-cyan transition-colors text-white placeholder:text-gray-500" />
                  </div>
                  <textarea rows={4} required placeholder="Which events or areas are you interested in?" value={form.interests}
                    onChange={(e) => setForm({ ...form, interests: e.target.value })}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-cyan transition-colors text-white placeholder:text-gray-500 resize-none" />
                  <Button variant="primary" type="submit" disabled={submitting} className="w-full py-4 text-lg">
                    {submitting ? "Sending..." : "Submit Volunteer Form"}
                  </Button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
