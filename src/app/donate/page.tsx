"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageBanner from "@/components/layout/PageBanner";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Star, Heart, GraduationCap, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<string>("50");
  const [otherAmount, setOtherAmount] = useState<string>("");
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [designation, setDesignation] = useState<string>("General Fund");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const presetAmounts = ["25", "50", "100", "250"];

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    const finalAmount = selectedAmount === "Other" ? otherAmount : selectedAmount;
    if (!finalAmount || isNaN(Number(finalAmount)) || Number(finalAmount) <= 0) {
      setErrorMsg("Please enter a valid amount.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("form_submissions").insert({
        type: "donation_intent",
        name: "Anonymous Web Donor",
        email: "N/A",
        message: `Intent: $${finalAmount} | ${isRecurring ? "Monthly" : "One-time"} | Fund: ${designation}`,
        metadata: { amount: finalAmount, isRecurring, designation },
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Donation error:", err);
      setErrorMsg("There was an error processing your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageBanner
        title="Support Our Mission"
        subtitle="Your gift in any amount will help support our programs and make a tangible difference in the lives of youth and families in Fort Bend County."
        imageSrc="/images/headers/slider-3.jpg"
        imagePosition="object-[center_15%]"
      />

      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Form */}
          <ScrollReveal>
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Make a Donation</h2>
                <p className="text-slate-600 leading-relaxed">
                  Family Life and Community Resource Center (FLCRC) is a 501(c)(3) non-profit organization. All donations are tax-deductible to the fullest extent permitted by law.
                </p>
              </div>

              {submitted ? (
                <div className="bg-white border border-emerald-200 rounded-2xl p-8 text-center shadow-sm">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                  <p className="text-slate-600 mb-6">
                    Your generous donation intent has been recorded. You will be redirected to our secure payment processor...
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Make another gift</Button>
                </div>
              ) : (
                <form onSubmit={handleDonateSubmit} className="space-y-8">
                  {/* Frequency Toggle */}
                  <div className="flex bg-white rounded-xl border border-slate-200 p-1">
                    <button
                      type="button"
                      onClick={() => setIsRecurring(false)}
                      className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                        !isRecurring ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Give Once
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsRecurring(true)}
                      className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                        isRecurring ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Give Monthly
                    </button>
                  </div>

                  {/* Amounts */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Select Amount</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {presetAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setSelectedAmount(amt)}
                          className={`py-4 rounded-xl border-2 font-black text-lg transition-all ${
                            selectedAmount === amt
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-3 relative">
                      <button
                        type="button"
                        onClick={() => setSelectedAmount("Other")}
                        className={`w-full py-4 px-6 rounded-xl border-2 text-left transition-all ${
                          selectedAmount === "Other"
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <span className={`font-bold ${selectedAmount === "Other" ? "text-blue-700" : "text-slate-600"}`}>
                          Other Amount
                        </span>
                      </button>
                      
                      {selectedAmount === "Other" && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center">
                          <span className="text-slate-500 font-bold mr-1">$</span>
                          <input
                            type="number"
                            min="1"
                            value={otherAmount}
                            onChange={(e) => setOtherAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-24 bg-transparent border-b-2 border-blue-600 focus:outline-none text-right font-bold text-lg text-slate-900"
                            autoFocus
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Gift Designation</label>
                    <select 
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
                    >
                      <option value="General Fund">Area of Greatest Need</option>
                      <option value="Placeholder 1">Program Designation Placeholder 1</option>
                      <option value="Placeholder 2">Program Designation Placeholder 2</option>
                      <option value="Placeholder 3">Program Designation Placeholder 3</option>
                    </select>
                  </div>

                  {errorMsg && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-full py-4 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : `Donate ${selectedAmount === "Other" ? (otherAmount ? `$${otherAmount}` : "") : `$${selectedAmount}`}`}
                  </Button>
                  
                  <p className="text-xs text-slate-500 text-center uppercase tracking-widest font-bold pt-2">
                    Secure Payment Processing
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Right Column: Alternative Support Options */}
          <div className="space-y-6">
            <ScrollReveal delay={100}>
              <div className="p-8 border border-slate-200 rounded-3xl bg-white group hover:border-slate-300 transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <Star size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Become a Member</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Join FLCRC as a valued member to secure important funding for our programs while receiving special benefits like banquet recognition and outreach materials.
                </p>
                <Link href="/become-a-member" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="p-8 border border-slate-200 rounded-3xl bg-white group hover:border-slate-300 transition-all">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Support Our Capital Campaign</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Help us expand our reach and build a stronger foundation for the future by contributing to our ongoing capital initiatives.
                </p>
                <Link href="/campaign" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="p-8 border border-slate-200 rounded-3xl bg-white group hover:border-slate-300 transition-all">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Support Our Scholarship Program</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Provide financial aid and awards to support deserving students in Fort Bend County pursuing higher education.
                </p>
                <Link href="/programs/scholarships" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Corporate Matching Section */}
      <section className="relative bg-luminous-bg text-white py-24 px-4 z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-12 h-12 text-luminous-fuchsia mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black mb-6">Corporate Matching Gift Program</h2>
            <div className="text-luminous-muted text-lg leading-relaxed space-y-4 mb-8">
              <p>
                Many employers sponsor matching gift programs and will match any charitable contributions or volunteer hours made by their employees. To find out if your company has a matching gift policy, please check with your Human Resources department.
              </p>
              <p className="p-6 bg-white/5 border border-white/10 rounded-2xl italic">
                (Placeholder for mailing instructions or specific matching gift directions. Please provide the physical mailing address or procedures you would like listed here.)
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
