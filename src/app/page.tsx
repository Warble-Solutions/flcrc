"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Network,
  Zap,
  HeartHandshake,
  ArrowRight,
  Users,
  Calendar,
  Trophy,
  Heart,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  HandHeart,
  Megaphone,
  Briefcase,
  GraduationCap,
  Shield,
  BookOpen,
} from "lucide-react";
import HeroCarousel from "@/components/home/HeroCarousel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { HERO_IMAGES } from "@/lib/images";
import { createClient } from "@/lib/supabase/client";
import { iconMap } from "@/lib/icons";
import { fallbackEvents, fallbackFeaturedPrograms } from "@/lib/fallback-data";
import { useDonate } from "@/components/layout/DonateProvider";
import type { Event, Program } from "@/lib/supabase/types";

// ───── FAQ Data ─────
const faqs = [
  {
    q: "What does FLCRC stand for?",
    a: "Family Life and Community Resource Center — a 501(c)(3) non-profit dedicated to building stronger families and communities in Fort Bend County, Texas.",
  },
  {
    q: "What programs do you offer?",
    a: "We offer Youth Ambassador Leadership Education (Y.A.L.E.), Growth Rewarding Insight Tools (GRIT), Restorative Practices & Youth Leadership (RPYL), Victim Intervention Program (VIP), Back-2-School Parent Chat, Summer Enrichment Camp, Scholarships & Awards, and the Bullying Awareness Conference.",
  },
  {
    q: "How can I get involved?",
    a: "You can volunteer, become a sponsor, donate, or become a member. We're also hiring — visit our Get Involved page for current opportunities.",
  },
  {
    q: "Are the programs free?",
    a: "Our Victim Intervention Program (VIP) services are free and confidential. The Y.A.L.E. program has an annual membership fee of $75 (renewals $30). Many other programs and events are offered free of charge.",
  },
  {
    q: "Where is FLCRC located?",
    a: "We're located at 821 E Highway 90A, Richmond, TX 77406, serving the greater Fort Bend County area.",
  },
];

// ───── FAQ Accordion Item ─────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-blue-400 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center p-6">
        <h3 className="font-bold text-lg text-slate-900 pr-4">{q}</h3>
        {open ? (
          <ChevronUp size={20} className="text-blue-600 shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-slate-400 shrink-0" />
        )}
      </div>
      <div
        className={`px-6 overflow-hidden transition-all duration-500 ${
          open ? "max-h-40 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-slate-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { openDonate } = useDonate();

  // Dynamic events from Supabase
  const [dbEvents, setDbEvents] = useState<Event[] | null>(null);
  // Dynamic featured programs from Supabase
  const [dbPrograms, setDbPrograms] = useState<Program[] | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterError, setNewsletterError] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitting(true);
    setNewsletterError(false);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("form_submissions").insert({
        type: "newsletter",
        name: "Newsletter Subscriber",
        email: newsletterEmail,
        message: "Newsletter signup from homepage",
      });
      if (error) throw error;
      setNewsletterSubmitted(true);
    } catch (err) {
      console.error("Newsletter signup error:", err);
      setNewsletterError(true);
    }
    setNewsletterSubmitting(false);
  };

  useEffect(() => {
    const supabase = createClient();
    // Fetch upcoming events
    supabase
      .from("events")
      .select("*")
      .gte("date", new Date().toISOString().split("T")[0])
      .order("date", { ascending: true })
      .limit(4)
      .then(({ data }: { data: Event[] | null }) => {
        if (data && data.length > 0) setDbEvents(data);
      })
      .catch((err: unknown) => console.error("Events fetch error:", err));
    // Fetch featured programs
    supabase
      .from("programs")
      .select("*")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .limit(3)
      .then(({ data }: { data: Program[] | null }) => {
        if (data && data.length > 0) setDbPrograms(data);
      })
      .catch((err: unknown) => console.error("Programs fetch error:", err));
  }, []);

  // Format Supabase date to day/month
  const fmtDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return {
      d: d.getDate().toString().padStart(2, "0"),
      m: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    };
  };

  return (
    <>
      {/* ╔═══════════════════════════════════════════════════╗
         ║  HERO CAROUSEL — 3 Scroll Banners                ║
         ╚═══════════════════════════════════════════════════╝ */}
      <HeroCarousel autoPlayInterval={7000}>
        {/* ── Slide 1: Main Hero ── */}
        <div className="relative w-full min-h-screen flex items-center justify-center">
          <Image src={HERO_IMAGES[1]} alt="Community gathering" fill className="object-cover" quality={90} priority />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-900/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(148,205,255,0.08)_0%,transparent_60%)]" />
          <div className="relative z-20 max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-luminous-cyan/20 bg-slate-900/50 text-luminous-cyan text-xs font-bold uppercase tracking-widest mb-10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-luminous-cyan animate-pulse" />
              Building Better Communities
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
              Igniting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9664] to-[#ffe453]">Hope</span>,<br />
              One Family at a Time
            </h1>
            <p className="text-xl md:text-2xl text-white drop-shadow-md max-w-3xl mx-auto leading-relaxed font-light mb-14">
              For over a decade, FLCRC has been the catalyst for change in Fort Bend County — providing tools, resources, and support families need to thrive.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link href="/programs">
                <Button variant="primary" className="px-12 py-5 text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Discover Our Programs <ArrowRight size={18} />
                </Button>
              </Link>
              <Button variant="glow" className="px-12 py-5 text-sm bg-slate-900/60 backdrop-blur-md" onClick={openDonate}>
                <HandHeart size={18} /> Make a Donation
              </Button>
            </div>
          </div>
        </div>

        {/* ── Slide 2: Programs & Youth ── */}
        <div className="relative w-full min-h-screen flex items-center justify-center">
          <Image src={HERO_IMAGES[2]} alt="Youth programs" fill className="object-cover" quality={90} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-900/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.1)_0%,transparent_60%)]" />
          <div className="relative z-20 max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-luminous-violet/30 bg-slate-900/50 text-luminous-violet text-xs font-bold uppercase tracking-widest mb-10 backdrop-blur-md">
              <GraduationCap size={14} />
              Youth Ambassador Program
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
              Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#beda5b] to-[#94cdff]">Next Generation</span>
            </h1>
            <p className="text-xl md:text-2xl text-white drop-shadow-md max-w-3xl mx-auto leading-relaxed font-light mb-14">
              Through Y.A.L.E., GRIT, and Summer Enrichment — we equip young leaders with the confidence, skills, and vision to transform their communities.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link href="/programs">
                <Button variant="primary" className="px-12 py-5 text-sm shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  Explore Programs <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/volunteer">
                <Button variant="glow" className="px-12 py-5 text-sm bg-slate-900/60 backdrop-blur-md">
                  <HeartHandshake size={18} /> Volunteer With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Slide 3: Capital Campaign ── */}
        <div className="relative w-full min-h-screen flex items-center justify-center">
          <Image src={HERO_IMAGES[3]} alt="Community support" fill className="object-cover" quality={90} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-900/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(52,211,153,0.08)_0%,transparent_60%)]" />
          <div className="relative z-20 max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-400/30 bg-slate-900/50 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-10 backdrop-blur-md">
              <Heart size={14} />
              2025–2026 Capital Campaign
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
              Building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#beda5b] to-[#94cdff]">New Generation</span><br />
              of Leaders
            </h1>
            <p className="text-xl md:text-2xl text-white drop-shadow-md max-w-3xl mx-auto leading-relaxed font-light mb-14">
              Help us raise $200,000 to expand our Y.A.L.E. Summer Enrichment Experience — immersing students in STEM, entrepreneurship, and leadership.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link href="/campaign">
                <Button variant="primary" className="px-12 py-5 text-sm shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  Learn About the Campaign <ArrowRight size={18} />
                </Button>
              </Link>
              <Button variant="glow" className="px-12 py-5 text-sm bg-slate-900/60 backdrop-blur-md" onClick={openDonate}>
                <HandHeart size={18} /> Donate Now
              </Button>
            </div>
          </div>
        </div>
      </HeroCarousel>

      {/* ╔═══════════════════════════════════╗
         ║  IMPACT NUMBERS — Light Section    ║
         ╚═══════════════════════════════════╝ */}
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">
                Our Impact
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                Numbers That Tell Our Story
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, num: "150+", label: "Years Combined Experience", color: "text-blue-600" },
              { icon: Calendar, num: "8", label: "Programs & Services", color: "text-purple-600" },
              { icon: Trophy, num: "5", label: "Core Competencies", color: "text-emerald-600" },
              { icon: Heart, num: "10+", label: "Years of Service", color: "text-rose-600" },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center group">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon size={28} />
                  </div>
                  <div className="text-4xl md:text-5xl font-black mb-2">
                    {stat.num}
                  </div>
                  <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════╗
         ║  CORE COMPETENCIES — Dark Section  ║
         ╚═══════════════════════════════════╝ */}
      <section className="relative py-24 px-4 bg-luminous-bg z-10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="What We Do" />
          <p className="text-center text-luminous-muted max-w-2xl mx-auto mb-12 -mt-4">
            Ongoing assistance for crime victims, youth, families, and communities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                title: "Community Support",
                desc: "Linking families with resources and building a culture of respect at all times.",
                icon: Network,
                gradient: "from-[#94cdff] to-[#8cb6ec]",
              },
              {
                title: "Crime Victim Services",
                desc: "Providing direct services, advocacy, and support for crime victims and their families.",
                icon: Shield,
                gradient: "from-[#ff9664] to-[#ffe453]",
              },
              {
                title: "Stronger Families",
                desc: "Equipping individuals and families with resources to build a thriving community.",
                icon: HeartHandshake,
                gradient: "from-[#ffe453] to-[#beda5b]",
              },
              {
                title: "Trainings",
                desc: "Education and professional development driving positive change through knowledge.",
                icon: BookOpen,
                gradient: "from-[#beda5b] to-[#94cdff]",
              },
              {
                title: "Youth Services",
                desc: "Empowering the next generation through leadership, mentorship, and civic engagement.",
                icon: GraduationCap,
                gradient: "from-[#ffe453] to-[#eed02e]",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <GlassCard className="h-full group text-center">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform mx-auto`}
                  >
                    <item.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-luminous-muted leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════╗
         ║  FEATURED PROGRAMS — Light Section     ║
         ╚═══════════════════════════════════════╝ */}
      <section className="relative bg-slate-50 text-slate-900 py-24 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-[#eed02e] mb-3">
                What We Do
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                Featured Programs
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {(dbPrograms ? dbPrograms : fallbackFeaturedPrograms).map((prog, i) => {
              const IconComp = iconMap[prog.icon || ""] || GraduationCap;
              return (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 group h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`w-14 h-14 ${prog.color || "bg-blue-600"} rounded-xl flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform`}
                    >
                      <IconComp size={28} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      {prog.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-6 flex-grow">
                    {prog.description}
                  </p>
                  <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider group-hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>
            );
            })}
          </div>
          <ScrollReveal>
            <div className="text-center mt-12">
              <Link href="/programs">
                <Button variant="primary" className="!bg-slate-900 !text-white hover:!bg-slate-800">
                  View All Programs <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* ╔═══════════════════════════════════════════╗
         ║  UPCOMING EVENTS — Light Section           ║
         ╚═══════════════════════════════════════════╝ */}
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-3">
                Mark Your Calendar
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                Upcoming Events
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {(dbEvents ? dbEvents.map(evt => {
              const { d: day, m: month } = fmtDate(evt.date);
              return { d: day, m: month, title: evt.title, loc: evt.location || "TBA", time: evt.time || "TBA", color: evt.color || "from-[#94cdff] to-[#8cb6ec]" };
            }) : fallbackEvents.map(evt => {
              const { d: day, m: month } = fmtDate(evt.date);
              return { d: day, m: month, title: evt.title, loc: evt.location || "TBA", time: evt.time || "TBA", color: evt.color || "from-[#94cdff] to-[#8cb6ec]" };
            })).map((evt, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all group">
                  <div
                    className={`w-20 h-20 rounded-xl bg-gradient-to-br ${evt.color} flex flex-col items-center justify-center shrink-0 shadow-lg text-white group-hover:scale-105 transition-transform`}
                  >
                    <span className="text-2xl font-bold">{evt.d}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                      {evt.m}
                    </span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {evt.title}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {evt.loc}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {evt.time}
                      </span>
                    </div>
                  </div>
                  <Link href="/events">
                    <button className="px-6 py-2.5 rounded-full border-2 border-slate-900 text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all cursor-pointer">
                      Register
                    </button>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Link href="/events">
                <button className="px-8 py-3 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-700 transition-all cursor-pointer inline-flex items-center gap-2">
                  View All Events <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* ╔══════════════════════════════════════════╗
         ║  HOW TO GET INVOLVED — Light Section      ║
         ╚══════════════════════════════════════════╝ */}
      <section className="relative bg-slate-50 text-slate-900 py-24 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-rose-600 mb-3">
                Make a Difference
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                How to Get Involved
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: HandHeart,
                title: "Volunteer",
                desc: "Donate your time and talent. Mentor youth, assist at events, or support our administrative team.",
                color: "bg-emerald-600",
                cta: "Apply to Volunteer",
                href: "/volunteer",
              },
              {
                icon: Megaphone,
                title: "Sponsor",
                desc: "Partner with us as a corporate or community sponsor. Your brand helps families and builds trust.",
                color: "bg-purple-600",
                cta: "Become a Sponsor",
                href: "/sponsorship",
              },
              {
                icon: Briefcase,
                title: "Donate",
                desc: "Every dollar directly funds programs for at-risk youth and families in crisis. 85% goes to services.",
                color: "bg-rose-600",
                cta: "Make a Donation",
                href: null,
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center group hover:shadow-xl transition-all h-full flex flex-col">
                  <div
                    className={`w-16 h-16 ${card.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <card.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                  <p className="text-slate-500 leading-relaxed flex-grow mb-6">
                    {card.desc}
                  </p>
                  {card.href ? (
                    <Link href={card.href}>
                      <button className="w-full py-3 rounded-full border-2 border-slate-900 text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all cursor-pointer">
                        {card.cta}
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={openDonate}
                      className="w-full py-3 rounded-full border-2 border-slate-900 text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
                    >
                      {card.cta}
                    </button>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════╗
         ║  SPONSORSHIP — Dark Section                ║
         ╚══════════════════════════════════════════╝ */}
      <section className="relative py-24 px-4 bg-luminous-bg z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-bold uppercase tracking-widest text-luminous-cyan mb-3">
                Support Our Mission
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Become a Sponsor
              </h2>
              <p className="text-luminous-muted max-w-2xl mx-auto text-sm leading-relaxed">
                Your sponsorship directly fuels our mission to impact thousands of children and
                families in this community. All sponsors are recognized on our website and in our
                quarterly newsletter.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                { tier: "Elite", amount: "$25,000+", color: "from-[#ff9664] to-[#ffe453]", textColor: "text-[#ff9664]" },
                { tier: "Platinum", amount: "$20,000", color: "from-slate-300 to-slate-400", textColor: "text-slate-300" },
                { tier: "Gold", amount: "$10,000", color: "from-[#ffe453] to-[#eed02e]", textColor: "text-[#ffe453]" },
                { tier: "Silver", amount: "$5,000", color: "from-slate-400 to-slate-500", textColor: "text-slate-400" },
                { tier: "Bronze", amount: "$2,500", color: "from-[#f08855] to-[#ff9664]", textColor: "text-[#f08855]" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-6 text-center min-w-[140px] border border-white/10 hover:border-luminous-cyan/40 transition-all group cursor-default"
                >
                  <div className={`w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br ${s.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <div className={`text-lg font-bold ${s.textColor} mb-1`}>{s.tier}</div>
                  <div className="text-sm text-luminous-muted font-mono">{s.amount}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="text-center mt-10">
              <Link href="/contact">
                <Button variant="glow" className="px-8 py-4">
                  Become a Sponsor
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════╗
         ║  FAQ — Light Section                      ║
         ╚══════════════════════════════════════════╝ */}
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">
                Questions?
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                Frequently Asked
              </h2>
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                  <FAQItem q={faq.q} a={faq.a} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════╗
         ║  CTA / NEWSLETTER — Dark Section          ║
         ╚══════════════════════════════════════════╝ */}
      <section className="relative py-24 px-4 bg-luminous-bg z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <GlassCard className="p-12 md:p-16 !border-luminous-fuchsia/30 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-luminous-violet/10 to-luminous-fuchsia/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white relative z-10">
                Join the Signal
              </h2>
              <p className="text-luminous-muted text-lg mb-10 max-w-xl mx-auto relative z-10">
                Be the first to know about upcoming workshops, volunteer
                opportunities, and community success stories.
              </p>

              {newsletterSubmitted ? (
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-white font-bold text-lg">You&apos;re Subscribed!</p>
                  <p className="text-luminous-muted text-sm">Thank you for joining the FLCRC community.</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-black/50 border border-white/20 rounded-full px-6 py-4 text-white focus:outline-none focus:border-luminous-cyan focus:shadow-[0_0_15px_rgba(148,205,255,0.3)] transition-all"
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    className="py-4 shadow-lg shadow-luminous-violet/20"
                    disabled={newsletterSubmitting}
                  >
                    {newsletterSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              )}
              {newsletterError && (
                <p className="text-red-400 text-sm text-center mt-4 relative z-10">Something went wrong. Please try again later.</p>
              )}
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
