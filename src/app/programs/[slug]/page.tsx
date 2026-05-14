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

const parentChatImages = [
  "514403337_1200373605457785_1157903760941069125_n-1.jpg", "526577616_1200374225457723_4295886510577328840_n.jpg",
  "526612593_1200373328791146_4638714178699624818_n.jpg", "526696044_1200392422122570_167487168700356621_n.jpg",
  "526709788_1200374075457738_7205141175497837580_n.jpg", "526739205_1200373675457778_4811890752196188205_n.jpg",
  "526741829_1200374112124401_1297602152159410407_n.jpg", "526760532_1200373302124482_2102041839852538779_n-1.jpg",
  "526772829_1200374578791021_6785633568907895398_n.jpg", "526788815_1200373982124414_7979286622468577359_n.jpg",
  "526812775_1200373722124440_6794774026522947117_n.jpg", "526847782_1200374545457691_4762209345913616490_n.jpg",
  "526858003_1200373242124488_6883872553187371204_n.jpg", "526869068_1200373432124469_1011003182516172029_n.jpg",
  "527004454_1200373408791138_777445281471387704_n.jpg", "527106064_1200374195457726_4872638805501363168_n.jpg",
  "527144381_1200373812124431_8103347771559600599_n.jpg", "527384897_1200373635457782_4147013871951140615_n.jpg",
  "527787667_1200373272124485_1669206118049515177_n.jpg", "527787823_1200373205457825_1217654821351922274_n.jpg",
  "528036368_1200374018791077_2610935486816669744_n.jpg", "528151681_1200374045457741_8385072351358353770_n.jpg",
  "528296932_1200373455457800_2733892915577136560_n.jpg", "chat-3.jpg"
];

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
  const isParentChat = program.slug === "parent-chat";
  const isGrit = program.slug === "grit-program";
  const pageTitle = isParentChat ? "Back-to-School Parent Chat" : program.title;

  return (
    <>
      <PageBanner 
        title={pageTitle} 
        subtitle={program.description || ""} 
        imageSrc={imageSrc}
      />
      
      <section className="relative bg-white text-slate-900 py-16 px-4 z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Link href="/programs" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12 font-bold text-sm uppercase tracking-wider">
            <ArrowLeft size={16} /> Back to All Programs
          </Link>

          <div className={`grid ${isParentChat ? "" : "lg:grid-cols-2"} gap-16`}>
            {isParentChat ? (
              <div className="max-w-4xl mx-auto w-full">
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Kick-start your school year with us!</h2>
                    <h3 className="text-xl md:text-2xl text-rose-600 font-bold mb-8">SAVE THE DATES for the 21st Annual Back-to-School Parent Chat!</h3>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                      Each year, FLCRC partners with local businesses and organizations to host this high energy, interactive community event for parents and students! The Back-2-School Parent Chat highlights important educational information and links participants with resources throughout Fort Bend County to provide a quality education to all students.
                    </p>
                    <p className="text-lg text-slate-600 font-medium">
                      CEU credit is available to educators. Each participant will receive a ticket for curbside pickup of their <strong className="text-emerald-600">FREE backpack</strong> with school supplies.
                    </p>
                  </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  <ScrollReveal delay={100}>
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 h-full">
                      <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                        <GraduationCap size={28} />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 mb-6">2026 Sessions</h4>
                      <p className="text-slate-600 mb-6">Register for one of the sessions below and attend it to receive your FREE backpack with school supplies:</p>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <strong className="block text-slate-900">Virtual Session 1</strong>
                          <span className="text-slate-600 text-sm">Wednesday, July 29, 2026 (5-6 p.m.)</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <strong className="block text-slate-900">Virtual Session 2</strong>
                          <span className="text-slate-600 text-sm">Thursday, July 30, 2026 (5-6 p.m.)</span>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 mt-6">
                          <strong className="block text-emerald-800">Backpack Pickup</strong>
                          <span className="text-emerald-700 text-sm">Saturday, August 1, 2026 (10 a.m.-12 p.m.)<br/>at the Family Life and Community Resource Center.</span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={200}>
                    <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white h-full relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
                      <h4 className="text-2xl font-black mb-6 relative z-10">Important Details</h4>
                      
                      <ul className="space-y-6 text-slate-300 relative z-10">
                        <li className="flex gap-4">
                          <Check className="text-rose-400 shrink-0 mt-1" size={20} />
                          <span>Parents may reserve up to two parent tickets.</span>
                        </li>
                        <li className="flex gap-4">
                          <Check className="text-rose-400 shrink-0 mt-1" size={20} />
                          <span>Registration by July 29th is required to attend a session.</span>
                        </li>
                        <li className="flex gap-4">
                          <Check className="text-rose-400 shrink-0 mt-1" size={20} />
                          <span>After completing the session, each participant will receive a ticket for pickup of their FREE backpack with school supplies.</span>
                        </li>
                        <li className="flex gap-4">
                          <Check className="text-rose-400 shrink-0 mt-1" size={20} />
                          <strong className="text-white">You must attend a session in order to receive your free backpack(s).</strong>
                        </li>
                      </ul>

                      <div className="mt-10 relative z-10">
                        <Button variant="primary" className="w-full justify-center opacity-70 cursor-not-allowed">
                          Registration Coming Soon
                        </Button>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            ) : (
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
            )}

            {isParentChat ? (
              <div className="w-full mt-10 overflow-hidden relative col-span-full">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                
                <div className="flex w-[200%] md:w-[300%] animate-marquee">
                  {[...parentChatImages, ...parentChatImages].map((img, i) => (
                    <div key={i} className="flex-none w-64 md:w-80 h-48 md:h-64 mx-3 rounded-2xl overflow-hidden relative group shadow-md border border-slate-200">
                      <Image
                        src={`/images/parent chat/${img}`}
                        alt={`Parent chat photo ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 256px, 320px"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ScrollReveal delay={100}>
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 border-t-[8px] border-t-[#6fa8dc] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black text-slate-900 mb-2">
                      {isGrit ? "Speak with FLCRC Staff" : "Apply Now"}
                    </h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                      {isGrit 
                        ? "Interested in the GRIT Program? Please complete the form below or call us at 1-888-337-1411, and we will contact you within 24-48 hours."
                        : "Take the first step. Submit your application and our team will get in touch."}
                    </p>

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
                          {appSubmitting ? "Submitting..." : (isGrit ? "Contact Us" : "Submit Application")}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
