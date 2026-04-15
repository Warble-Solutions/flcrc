"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, CreditCard, Lock, Check, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Modal from "@/components/ui/Modal";
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>(fallbackEvents);

  // Booking flow state
  const [bookStep, setBookStep] = useState<1 | 2 | 3>(1);
  const [bookForm, setBookForm] = useState({ name: "", email: "", phone: "", tickets: "1" });
  const [payForm, setPayForm] = useState({ card: "", expiry: "", cvv: "" });
  const [processing, setProcessing] = useState(false);
  const [orderNum, setOrderNum] = useState("");

  const closeBooking = () => {
    setSelectedEvent(null);
    setBookStep(1);
    setBookForm({ name: "", email: "", phone: "", tickets: "1" });
    setPayForm({ card: "", expiry: "", cvv: "" });
    setOrderNum("");
  };

  const [bookingError, setBookingError] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setProcessing(true);
    setBookingError(false);
    await new Promise((r) => setTimeout(r, 1500));
    try {
      const supabase = createClient();
      const fakeOrder = "FLCRC-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const { error } = await supabase.from("form_submissions").insert({
        type: "event_booking",
        name: bookForm.name,
        email: bookForm.email,
        phone: bookForm.phone || null,
        message: `Booking for ${selectedEvent.title}`,
        metadata: {
          event_title: selectedEvent.title,
          event_date: selectedEvent.date,
          event_time: selectedEvent.time,
          event_location: selectedEvent.location,
          tickets: bookForm.tickets,
          card_last4: payForm.card.slice(-4),
          order_number: fakeOrder,
        },
      });
      if (error) throw error;
      setOrderNum(fakeOrder);
      setBookStep(3);
    } catch (err) {
      console.error("Booking error:", err);
      setBookingError(true);
    }
    setProcessing(false);
  };

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
                      <Button variant="primary" onClick={() => setSelectedEvent(evt)}>
                        Register
                      </Button>
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

      {/* Event Registration Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={closeBooking}
        title={bookStep === 3 ? "Booking Confirmed!" : bookStep === 2 ? "Payment Details" : "Event Registration"}
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

            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`flex items-center ${s < 3 ? "gap-2" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    bookStep >= s ? "bg-luminous-cyan text-black" : "bg-white/10 text-gray-500"
                  }`}>{s}</div>
                  {s < 3 && <div className={`w-8 h-0.5 ${bookStep > s ? "bg-luminous-cyan" : "bg-white/10"}`} />}
                </div>
              ))}
            </div>

            {bookStep === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setBookStep(2); }} className="space-y-4">
                <input type="text" required placeholder="Full Name" value={bookForm.name}
                  onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-fuchsia transition-colors text-white placeholder:text-gray-500" />
                <input type="email" required placeholder="Email Address" value={bookForm.email}
                  onChange={(e) => setBookForm({ ...bookForm, email: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-fuchsia transition-colors text-white placeholder:text-gray-500" />
                <input type="tel" placeholder="Phone Number" value={bookForm.phone}
                  onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-fuchsia transition-colors text-white placeholder:text-gray-500" />
                <div>
                  <label className="block text-sm font-bold text-luminous-muted mb-2">Number of Tickets</label>
                  <select value={bookForm.tickets} onChange={(e) => setBookForm({ ...bookForm, tickets: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-fuchsia transition-colors text-white">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="bg-gray-900">{n} {n === 1 ? "ticket" : "tickets"}</option>
                    ))}
                  </select>
                </div>
                <Button variant="primary" type="submit" className="w-full">
                  Continue to Payment
                </Button>
              </form>
            )}

            {bookStep === 2 && (
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-luminous-muted mb-2">
                  <Lock size={14} className="text-emerald-400" />
                  <span>Secure Payment — Demo Mode</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-luminous-muted mb-1.5 uppercase tracking-wider">Card Number</label>
                  <div className="relative">
                    <input type="text" required placeholder="4242 4242 4242 4242" value={payForm.card}
                      maxLength={19}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                        setPayForm({ ...payForm, card: v });
                      }}
                      className="w-full p-3 pr-12 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-cyan transition-colors text-white font-mono placeholder:text-gray-500" />
                    <CreditCard size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-luminous-muted mb-1.5 uppercase tracking-wider">Expiry</label>
                    <input type="text" required placeholder="MM/YY" value={payForm.expiry}
                      maxLength={5}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "");
                        if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2);
                        setPayForm({ ...payForm, expiry: v });
                      }}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-cyan transition-colors text-white font-mono placeholder:text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-luminous-muted mb-1.5 uppercase tracking-wider">CVV</label>
                    <input type="text" required placeholder="123" value={payForm.cvv}
                      maxLength={4}
                      onChange={(e) => setPayForm({ ...payForm, cvv: e.target.value.replace(/\D/g, "") })}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-luminous-cyan transition-colors text-white font-mono placeholder:text-gray-500" />
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-sm space-y-1 border border-white/10">
                  <div className="flex justify-between text-luminous-muted">
                    <span>{bookForm.tickets}× Ticket</span>
                    <span className="text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-luminous-cyan">$0.00 (Demo)</span>
                  </div>
                </div>
                {bookingError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center">
                    Something went wrong. Please try again.
                  </div>
                )}
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setBookStep(1)} className="flex-1">Back</Button>
                  <Button variant="primary" type="submit" disabled={processing} className="flex-1">
                    {processing ? "Processing..." : "Pay & Confirm"}
                  </Button>
                </div>
              </form>
            )}

            {bookStep === 3 && (
              <div className="text-center py-4 space-y-4">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check size={40} className="text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white">You&apos;re All Set!</h4>
                <div className="bg-white/5 rounded-xl p-5 text-left space-y-3 border border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-luminous-muted">Order #</span>
                    <span className="text-luminous-cyan font-mono font-bold">{orderNum}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-luminous-muted">Event</span>
                    <span className="text-white">{selectedEvent.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-luminous-muted">Tickets</span>
                    <span className="text-white">{bookForm.tickets}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-luminous-muted">Confirmation sent to</span>
                    <span className="text-white">{bookForm.email}</span>
                  </div>
                </div>
                <p className="text-xs text-luminous-muted">A confirmation email has been sent to your inbox.</p>
                <Button variant="primary" onClick={closeBooking} className="w-full">Done</Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
