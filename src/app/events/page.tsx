"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock } from "lucide-react";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { Event } from "@/lib/supabase/types";

// Color palette for event cards
const colorPalette = [
  "from-luminous-cyan to-blue-500",
  "from-luminous-violet to-purple-500",
  "from-luminous-fuchsia to-pink-500",
  "from-yellow-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-red-500",
];

// Hardcoded fallback events (used if Supabase is unavailable)
const fallbackEvents = [
  {
    id: "1",
    title: "Back-to-School Parent Chat",
    date: "2025-08-02",
    time: "TBA",
    location: "FLCRC Main Hall",
    color: "from-cyan-500 to-blue-500",
    description: null,
    is_sold_out: false,
    created_at: "",
  },
  {
    id: "2",
    title: "Senior Social Mixer",
    date: "2025-09-27",
    time: "TBA",
    location: "FLCRC Main Hall",
    color: "from-violet-500 to-purple-500",
    description: null,
    is_sold_out: false,
    created_at: "",
  },
  {
    id: "3",
    title: "Dakota Merriweather 5K Walk/Run",
    date: "2025-11-15",
    time: "8:00 AM",
    location: "Community Park",
    color: "from-amber-400 to-rose-500",
    description: null,
    is_sold_out: false,
    created_at: "",
  },
  {
    id: "4",
    title: "9th Annual Banquet",
    date: "2025-12-06",
    time: "6:00 PM",
    location: "FLCRC Grand Hall",
    color: "from-emerald-500 to-teal-500",
    description: null,
    is_sold_out: false,
    created_at: "",
  },
];

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return { d: day, m: month };
}

export default function EventsPage() {
  const [showDonate, setShowDonate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
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
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative text-luminous-text">
      <AnimatedBackground />
      <Navigation onDonate={() => setShowDonate(true)} />

      <main className="flex-grow z-10 pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
              <h1 className="text-5xl font-bold">Event Horizon</h1>
              <p className="text-luminous-cyan font-bold uppercase tracking-widest text-sm animate-pulse">
                2025 Schedule Active
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {events.map((evt, i) => {
              const { d, m } = formatEventDate(evt.date);
              const color = evt.color || colorPalette[i % colorPalette.length];
              return (
                <ScrollReveal key={evt.id} delay={i * 100}>
                  <div className="group glass rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 hover:bg-white/5 transition-all border border-white/5 hover:border-luminous-cyan/30">
                    {/* Date Block */}
                    <div
                      className={`w-24 h-24 rounded-xl bg-gradient-to-br ${color} flex flex-col items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform`}
                    >
                      <span className="text-3xl font-bold text-white">
                        {d}
                      </span>
                      <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
                        {m}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {evt.title}
                      </h3>
                      <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-luminous-muted">
                        {evt.location && (
                          <span className="flex items-center gap-2">
                            <MapPin size={14} /> {evt.location}
                          </span>
                        )}
                        {evt.time && (
                          <span className="flex items-center gap-2">
                            <Clock size={14} /> {evt.time}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Register / Sold Out */}
                    {evt.is_sold_out ? (
                      <span className="px-6 py-2.5 rounded-full bg-red-600/20 text-red-400 font-bold text-xs uppercase tracking-wider border border-red-500/30">
                        Sold Out
                      </span>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setSelectedEvent(evt)}
                      >
                        Register
                      </Button>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />

      {/* Event Registration Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title="Event Registration"
      >
        {selectedEvent && (
          <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-luminous-fuchsia">
              <h4 className="font-bold text-white">{selectedEvent.title}</h4>
              {selectedEvent.location && (
                <p className="text-sm text-luminous-muted mt-1 flex items-center gap-2">
                  <MapPin size={16} /> {selectedEvent.location}
                </p>
              )}
              {selectedEvent.time && (
                <p className="text-sm text-luminous-muted mt-1 flex items-center gap-2">
                  <Clock size={16} /> {selectedEvent.time}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-fuchsia transition-colors text-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-fuchsia transition-colors text-white"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-fuchsia transition-colors text-white"
              />
            </div>
            <Button variant="primary" className="w-full">
              Confirm Registration
            </Button>
          </div>
        )}
      </Modal>

      {/* Donate Modal */}
      <Modal isOpen={showDonate} onClose={() => setShowDonate(false)} title="Support Our Mission">
        <div className="space-y-6">
          <p className="text-luminous-muted text-center">Your generous donation supports programs for at-risk youth and families in crisis.</p>
          <div className="grid grid-cols-3 gap-4">
            {[50, 100, 250].map((amt) => (
              <button key={amt} className="py-3 border border-white/20 rounded-xl font-bold hover:bg-luminous-cyan hover:text-black transition-colors cursor-pointer">${amt}</button>
            ))}
          </div>
          <Button variant="primary" className="w-full">Process Secure Donation</Button>
        </div>
      </Modal>
    </div>
  );
}
