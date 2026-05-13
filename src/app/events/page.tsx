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
  const [timeFilter, setTimeFilter] = useState<"upcoming" | "past">("upcoming");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const supabase = createClient();
    const today = new Date().toISOString().split("T")[0];
    
    let query = supabase.from("events").select("*");
    
    if (timeFilter === "upcoming") {
      query = query.gte("date", today).order("date", { ascending: true });
    } else {
      query = query.lt("date", today).order("date", { ascending: false });
    }

    query
      .then(({ data }: { data: Event[] | null }) => {
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(timeFilter === "upcoming" ? fallbackEvents : []);
        }
      })
      .catch((err: unknown) => console.error("Events fetch error:", err))
      .finally(() => setIsLoading(false));
  }, [timeFilter]);

  return (
    <>
      <PageBanner 
        title="Upcoming Events" 
        subtitle="Join us at our upcoming banquets, townhalls, and community gatherings. Connect, learn, and grow with FLCRC." 
        imageSrc="/images/headers/events.jpg"
      />
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10 min-h-[50vh]">
        <div className="max-w-6xl mx-auto">

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
            <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setTimeFilter("upcoming")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  timeFilter === "upcoming" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setTimeFilter("past")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  timeFilter === "past" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Past Events
              </button>
            </div>
            
            <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode("list")}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Grid View
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-24 bg-slate-50 rounded-3xl border border-slate-200">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-bold text-lg">No {timeFilter} events found.</p>
              <p className="text-slate-400 mt-2">Please check back later or contact us for more information.</p>
            </div>
          ) : viewMode === "list" ? (
            <div className="space-y-4 max-w-5xl mx-auto">
              {events.map((evt, i) => {
                const { d, m } = formatEventDate(evt.date);
                const color = evt.color || colorPalette[i % colorPalette.length];
                return (
                  <ScrollReveal key={evt.id} delay={i * 50}>
                    <div className="group bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 hover:shadow-xl hover:border-blue-400 transition-all">
                      <div
                        className={`w-24 h-24 rounded-xl bg-gradient-to-br ${color} flex flex-col items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform`}
                      >
                        <span className="text-3xl font-black text-white">{d}</span>
                        <span className="text-xs font-bold text-white/90 uppercase tracking-widest">{m}</span>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-600 transition-colors">{evt.title}</h3>
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
                          className="px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 relative overflow-hidden group cursor-pointer text-[#1b2847] bg-white border border-slate-200 hover:text-white hover:bg-slate-900 inline-block text-center whitespace-nowrap"
                        >
                          {timeFilter === "upcoming" ? "Register" : "View Details"}
                        </Link>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((evt, i) => {
                const { d, m } = formatEventDate(evt.date);
                const color = evt.color || colorPalette[i % colorPalette.length];
                return (
                  <ScrollReveal key={evt.id} delay={i * 50}>
                    <div className="h-full bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col hover:shadow-xl hover:border-blue-400 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                        <div
                          className={`w-20 h-20 rounded-xl bg-gradient-to-br ${color} flex flex-col items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform`}
                        >
                          <span className="text-2xl font-black text-white">{d}</span>
                          <span className="text-xs font-bold text-white/90 uppercase tracking-widest">{m}</span>
                        </div>
                        {evt.is_sold_out && (
                          <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-wider border border-red-200">
                            Sold Out
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-slate-600 transition-colors flex-grow">
                        {evt.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-slate-500 font-medium tracking-tight mb-8">
                        {evt.location && (
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-blue-500 shrink-0" /> <span className="truncate">{evt.location}</span>
                          </div>
                        )}
                        {evt.time && (
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-blue-500 shrink-0" /> <span>{evt.time}</span>
                          </div>
                        )}
                      </div>

                      {!evt.is_sold_out && (
                        <Link
                          href={`/events/${evt.id}`}
                          className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 text-center text-[#1b2847] bg-white border border-slate-200 hover:text-white hover:bg-slate-900"
                        >
                          {timeFilter === "upcoming" ? "Register" : "View Details"}
                        </Link>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
