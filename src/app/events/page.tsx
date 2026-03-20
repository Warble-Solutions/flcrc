"use client";

import { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const events = [
  {
    d: "15",
    m: "OCT",
    title: "Dakota Merriweather 5K Walk/Run",
    loc: "Community Park",
    time: "8:00 AM",
    type: "Fundraiser",
    color: "from-luminous-cyan to-blue-500",
  },
  {
    d: "02",
    m: "NOV",
    title: "College & Career Seminar",
    loc: "FLCRC Main Hall",
    time: "10:00 AM",
    type: "Education",
    color: "from-luminous-violet to-purple-500",
  },
  {
    d: "10",
    m: "NOV",
    title: "Bullying Awareness Conference",
    loc: "Virtual",
    time: "9:00 AM",
    type: "Conference",
    color: "from-luminous-fuchsia to-pink-500",
  },
  {
    d: "05",
    m: "DEC",
    title: "9th Annual Banquet & Charity Gala",
    loc: "Grand Ballroom",
    time: "6:00 PM",
    type: "Social",
    color: "from-yellow-400 to-orange-500",
  },
  {
    d: "15",
    m: "JAN",
    title: "Summer Enrichment Camp Registration",
    loc: "FLCRC Campus",
    time: "9:00 AM",
    type: "Youth",
    color: "from-emerald-400 to-teal-500",
  },
  {
    d: "20",
    m: "FEB",
    title: "Black History Month Celebration",
    loc: "Community Center",
    time: "11:00 AM",
    type: "Cultural",
    color: "from-amber-400 to-red-500",
  },
];

export default function EventsPage() {
  const [showDonate, setShowDonate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null);

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
            {events.map((evt, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group glass rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 hover:bg-white/5 transition-all border border-white/5 hover:border-luminous-cyan/30">
                  {/* Date Block */}
                  <div
                    className={`w-24 h-24 rounded-xl bg-gradient-to-br ${evt.color} flex flex-col items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    <span className="text-3xl font-bold text-white">
                      {evt.d}
                    </span>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
                      {evt.m}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-xs font-bold text-luminous-fuchsia uppercase tracking-widest mb-1 block">
                      {evt.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {evt.title}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-luminous-muted">
                      <span className="flex items-center gap-2">
                        <MapPin size={14} /> {evt.loc}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={14} /> {evt.time}
                      </span>
                    </div>
                  </div>

                  {/* Register Button */}
                  <Button
                    variant="outline"
                    onClick={() => setSelectedEvent(evt)}
                  >
                    Register
                  </Button>
                </div>
              </ScrollReveal>
            ))}
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
              <p className="text-sm text-luminous-muted mt-1 flex items-center gap-2">
                <MapPin size={16} /> {selectedEvent.loc}
              </p>
              <p className="text-sm text-luminous-muted mt-1 flex items-center gap-2">
                <Clock size={16} /> {selectedEvent.time}
              </p>
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
