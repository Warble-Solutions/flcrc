"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, CreditCard, Lock, Check, Calendar } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { fallbackEvents } from "@/lib/fallback-data";
import type { Event } from "@/lib/supabase/types";
import PageBanner from "@/components/layout/PageBanner";

// Color palette for event cards — brand gradients only
const colorPalette = [
  "from-[#94cdff] to-[#8cb6ec]",
  "from-[#beda5b] to-[#94cdff]",
  "from-[#ff9664] to-[#ffe453]",
  "from-[#ffe453] to-[#beda5b]",
  "from-[#ffe453] to-[#eed02e]",
  "from-[#f08855] to-[#ff9664]",
];

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return { d: day, m: month };
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(fallbackEvents);


  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("events")
      .select("*")
      .gte("date", new Date().toISOString().split("T")[0])
      .order("date", { ascending: true })
      .then(({ data }: { data: Event[] | null }) => {
        if (data && data.length > 0) setEvents(data);
      })
      .catch((err: unknown) => console.error("Events fetch error:", err));
  }, []);

  return (
    <>
      <PageBanner 
        title="Events & Conferences" 
        subtitle="Join us at our upcoming banquets, townhalls, and community gatherings. Connect, learn, and grow with FLCRC." 
        imageSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80"
      />
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-5xl mx-auto">

          <div className="space-y-4">
            {events.map((evt, i) => {
              const { d, m } = formatEventDate(evt.date);
              const color = evt.color || colorPalette[i % colorPalette.length];
              return (
                <ScrollReveal key={evt.id} delay={i * 100}>
                  <div className="group bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 hover:shadow-xl hover:border-blue-400 transition-all">
                    <div
                      className={`w-24 h-24 rounded-xl bg-gradient-to-br ${color} flex flex-col items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform`}
                    >
                      <span className="text-3xl font-black text-white">{d}</span>
                      <span className="text-xs font-bold text-white/90 uppercase tracking-widest">{m}</span>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{evt.title}</h3>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500 font-medium tracking-tight">
                        {evt.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-blue-500" /> {evt.location}
                          </span>
                        )}
                        {evt.time && (
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-blue-500" /> {evt.time}
                          </span>
                        )}
                      </div>
                    </div>
                    {evt.is_sold_out ? (
                      <span className="px-6 py-2.5 rounded-full bg-red-50 text-red-600 font-bold text-xs uppercase tracking-wider border border-red-200">
                        Sold Out
                      </span>
                    ) : (
                      <Link
                        href={`/events/${evt.id}`}
                        className="px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 relative overflow-hidden group cursor-pointer text-[#1b2847] bg-white border border-slate-200 hover:text-white hover:bg-slate-900 inline-block text-center"
                      >
                        Register
                      </Link>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 bg-luminous-bg text-white z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <Calendar className="w-12 h-12 text-luminous-cyan mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Full Calendar View
            </h2>
            <p className="text-luminous-muted text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Want to see all of our upcoming events for the entire year? Connect with us on social media for real-time announcements.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                Contact Us
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
