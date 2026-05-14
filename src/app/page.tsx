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
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import HeroCarousel from "@/components/home/HeroCarousel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { HERO_IMAGES } from "@/lib/images";
import { createClient } from "@/lib/supabase/client";
import { iconMap } from "@/lib/icons";
import { fallbackEvents, fallbackFeaturedPrograms, newsArticles } from "@/lib/fallback-data";
import type { Event, Program } from "@/lib/supabase/types";



export default function HomePage() {

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
        <div className="relative w-full min-h-[80vh] flex items-center justify-center">
          <Image src={HERO_IMAGES[1]} alt="Community gathering" fill className="object-cover" quality={90} priority />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-900/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(148,205,255,0.08)_0%,transparent_60%)]" />
          <div className="relative z-20 max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
              Igniting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e87d4a] to-[#e6c830]">Hope</span>,<br />
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
              <Link href="/donate">
                <Button variant="glow" className="px-12 py-5 text-sm bg-slate-900/60 backdrop-blur-md">
                  <HandHeart size={18} /> Make a Donation
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Slide 2: Programs & Youth ── */}
        <div className="relative w-full min-h-[80vh] flex items-center justify-center">
          <Image src={HERO_IMAGES[2]} alt="Youth programs" fill className="object-cover" quality={90} priority />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-900/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.1)_0%,transparent_60%)]" />
          <div className="relative z-20 max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
              Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9fbf45] to-[#6fa8dc]">Next Generation</span>
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
        <div className="relative w-full min-h-[80vh] flex items-center justify-center">
          <Image src={HERO_IMAGES[3]} alt="Community support" fill className="object-cover" quality={90} priority />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-900/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(52,211,153,0.08)_0%,transparent_60%)]" />
          <div className="relative z-20 max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
              Building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94cdff] to-[#ffe453]">New Generation</span><br />
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
              <Link href="/donate">
                <Button variant="glow" className="px-12 py-5 text-sm bg-slate-900/60 backdrop-blur-md">
                  <HandHeart size={18} /> Donate Now
                </Button>
              </Link>
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
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
                Our Impact
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                Numbers That Tell Our Story
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, num: "150+", label: "Years Combined Experience", gradient: "from-[#6fa8dc] to-[#5b93c7]" },
              { icon: Calendar, num: "8", label: "Programs & Services", gradient: "from-[#9fbf45] to-[#8aad3a]" },
              { icon: Trophy, num: "5", label: "Core Competencies", gradient: "from-[#e6c830] to-[#d4b828]" },
              { icon: Heart, num: "10+", label: "Years of Service", gradient: "from-[#e87d4a] to-[#d4703f]" },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center group">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
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
                gradient: "from-[#6fa8dc] to-[#5b93c7]",
              },
              {
                title: "Crime Victim Services",
                desc: "Providing direct services, advocacy, and support for crime victims and their families.",
                icon: Shield,
                gradient: "from-[#e87d4a] to-[#e6c830]",
              },
              {
                title: "Stronger Families",
                desc: "Equipping individuals and families with resources to build a thriving community.",
                icon: HeartHandshake,
                gradient: "from-[#e6c830] to-[#9fbf45]",
              },
              {
                title: "Trainings",
                desc: "Education and professional development driving positive change through knowledge.",
                icon: BookOpen,
                gradient: "from-[#9fbf45] to-[#6fa8dc]",
              },
              {
                title: "Youth Services",
                desc: "Empowering the next generation through leadership, mentorship, and civic engagement.",
                icon: GraduationCap,
                gradient: "from-[#e6c830] to-[#d4b828]",
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
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
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
                    <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-slate-600 transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-6 flex-grow">
                      {prog.description}
                    </p>
                    <Link
                      href={prog.slug ? `/programs/${prog.slug}` : "/programs"}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#6fa8dc] hover:text-[#5b93c7] uppercase tracking-wider group-hover:gap-3 transition-all"
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
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
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
              return { d: day, m: month, title: evt.title, loc: evt.location || "TBA", time: evt.time || "TBA", color: evt.color || "from-[#6fa8dc] to-[#5b93c7]" };
            }) : fallbackEvents.map(evt => {
              const { d: day, m: month } = fmtDate(evt.date);
              return { d: day, m: month, title: evt.title, loc: evt.location || "TBA", time: evt.time || "TBA", color: evt.color || "from-[#6fa8dc] to-[#5b93c7]" };
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
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
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
                href: "/campaign",
              },
              {
                icon: Briefcase,
                title: "Donate",
                desc: "Every dollar directly funds programs for at-risk youth and families in crisis. 85% goes to services.",
                color: "bg-rose-600",
                cta: "Make a Donation",
                href: "/donate",
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
                  <Link href={card.href}>
                    <button className="w-full py-3 rounded-full border-2 border-slate-900 text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all cursor-pointer">
                      {card.cta}
                    </button>
                  </Link>
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
                { tier: "Elite", amount: "$25,000+", color: "from-[#e87d4a] to-[#e6c830]", textColor: "text-[#e87d4a]" },
                { tier: "Platinum", amount: "$20,000", color: "from-slate-300 to-slate-400", textColor: "text-slate-300" },
                { tier: "Gold", amount: "$10,000", color: "from-[#e6c830] to-[#d4b828]", textColor: "text-[#e6c830]" },
                { tier: "Silver", amount: "$5,000", color: "from-slate-400 to-slate-500", textColor: "text-slate-400" },
                { tier: "Bronze", amount: "$2,500", color: "from-[#d4703f] to-[#e87d4a]", textColor: "text-[#d4703f]" },
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
         ║  RECENT NEWS — Light Section              ║
         ╚══════════════════════════════════════════╝ */}
      <section className="relative bg-slate-50 text-slate-900 py-24 px-4 z-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-3 block">
                Latest Updates
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                Recent News
              </h2>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {newsArticles.slice(0, 3).map((article, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <Link href={`/news/${article.slug}`} className="block h-full group">
                  <div className="h-full border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm group-hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden border-b border-slate-100">
                      <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">
                        <Calendar size={14} /> {article.date}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed mb-6 flex-grow line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="text-sm font-bold text-slate-500 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal>
            <div className="text-center mt-12">
              <Link href="/news">
                <Button variant="outline" className="px-8 py-4">
                  View All News
                </Button>
              </Link>
            </div>
          </ScrollReveal>
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
                Stay Connected
              </h2>
              <p className="text-luminous-muted text-lg mb-10 max-w-xl mx-auto relative z-10">
                Sign up to receive email updates about the latest happenings and upcoming events at FLCRC!
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
                    className="flex-1 bg-[#1b2847]/50 border border-white/20 rounded-full px-6 py-4 text-white focus:outline-none focus:border-luminous-cyan focus:shadow-[0_0_15px_rgba(148,205,255,0.3)] transition-all"
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

              {/* Follow Us Section */}
              <div className="mt-16 pt-10 border-t border-white/10 relative z-10">
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Follow Us</h3>
                <div className="flex items-center justify-center gap-6">
                  <a href="https://www.facebook.com/FLCRCRichmond/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-14 h-14 rounded-full bg-[#1b2847]/50 border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300">
                    <Facebook size={24} />
                  </a>
                  <a href="https://www.instagram.com/flcrc.richmond/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-14 h-14 rounded-full bg-[#1b2847]/50 border border-white/10 flex items-center justify-center text-white hover:bg-pink-600 hover:border-pink-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(219,39,119,0.4)] transition-all duration-300">
                    <Instagram size={24} />
                  </a>
                  <a href="https://www.youtube.com/channel/UC1lc1ZAp8HyQys_oL-5Vajg" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-14 h-14 rounded-full bg-[#1b2847]/50 border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300">
                    <Youtube size={24} />
                  </a>
                  <a href="https://x.com/flcrc" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-14 h-14 rounded-full bg-[#1b2847]/50 border border-white/10 flex items-center justify-center text-white hover:bg-slate-800 hover:border-slate-700 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300">
                    <Twitter size={24} />
                  </a>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
