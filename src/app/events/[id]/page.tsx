"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Clock, Calendar, ArrowLeft, CreditCard, Lock, Check } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { fallbackEvents } from "@/lib/fallback-data";
import type { Event } from "@/lib/supabase/types";
import PageBanner from "@/components/layout/PageBanner";

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking flow state
  const [bookStep, setBookStep] = useState<1 | 2 | 3>(1);
  const [bookForm, setBookForm] = useState({ name: "", email: "", phone: "", tickets: "1" });
  const [payForm, setPayForm] = useState({ card: "", expiry: "", cvv: "" });
  const [processing, setProcessing] = useState(false);
  const [orderNum, setOrderNum] = useState("");
  const [bookingError, setBookingError] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      const supabase = createClient();
      const { data } = await supabase.from("events").select("*").eq("id", id).single();
      
      if (data) {
        setEvent(data);
      } else {
        const fallback = fallbackEvents.find(e => e.id === id);
        if (fallback) setEvent(fallback);
      }
      setLoading(false);
    }
    fetchEvent();
  }, [id]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    setProcessing(true);
    setBookingError(false);

    // Simulate payment & DB save
    setTimeout(async () => {
      try {
        const supabase = createClient();
        const fakeOrder = "FLCRC-" + Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const { error } = await supabase.from("form_submissions").insert({
          type: "event_registration",
          name: bookForm.name,
          email: bookForm.email,
          phone: bookForm.phone || null,
          metadata: {
            event_id: event.id,
            event_title: event.title,
            tickets: parseInt(bookForm.tickets),
            order_number: fakeOrder
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
    }, 1500);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p>Loading...</p></div>;
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
        <h1 className="text-4xl font-black mb-4">Event Not Found</h1>
        <Link href="/events">
          <Button variant="primary">Return to Events</Button>
        </Link>
      </div>
    );
  }

  const d = new Date(event.date + "T00:00:00");
  const formattedDate = d.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <PageBanner 
        title={event.title} 
        subtitle={event.description || "Join us at this FLCRC event to connect, learn, and grow with our community."} 
        imageSrc="/images/headers/events.jpg"
      />
      
      <section className="relative bg-white text-slate-900 py-16 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <Link href="/events" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12 font-bold text-sm uppercase tracking-wider">
            <ArrowLeft size={16} /> Back to All Events
          </Link>

          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Column: Event Details & Gallery */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-10">
                  <h2 className="text-2xl font-black text-slate-900 mb-6 border-b border-slate-200 pb-4">Event Details</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Date</h4>
                        <p className="text-slate-600">{formattedDate}</p>
                      </div>
                    </div>
                    
                    {event.time && (
                      <div className="flex items-start gap-4">
                        <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600 shrink-0">
                          <Clock size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">Time</h4>
                          <p className="text-slate-600">{event.time}</p>
                        </div>
                      </div>
                    )}
                    
                    {event.location && (
                      <div className="flex items-start gap-4">
                        <div className="bg-rose-100 p-3 rounded-xl text-rose-600 shrink-0">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">Location</h4>
                          <p className="text-slate-600">{event.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6">Past Event Highlights</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-200 aspect-[4/3] rounded-2xl overflow-hidden relative">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80')] bg-cover bg-center" />
                    </div>
                    <div className="bg-slate-200 aspect-[4/3] rounded-2xl overflow-hidden relative">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80')] bg-cover bg-center" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Registration/Booking */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={200}>
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-2xl sticky top-24 relative overflow-hidden">
                  <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">
                    {bookStep === 3 ? "Booking Confirmed!" : bookStep === 2 ? "Payment Details" : "Register Now"}
                  </h3>

                  {bookStep < 3 && (
                    <div className="flex items-center justify-center gap-2 mb-8">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className={`flex items-center ${s < 3 ? "gap-2" : ""}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            bookStep >= s ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "bg-slate-100 text-slate-400"
                          }`}>{s}</div>
                          {s < 3 && <div className={`w-8 h-1 rounded-full ${bookStep > s ? "bg-blue-600" : "bg-slate-100"}`} />}
                        </div>
                      ))}
                    </div>
                  )}

                  {bookStep === 1 && (
                    <form onSubmit={(e) => { e.preventDefault(); setBookStep(2); }} className="space-y-4">
                      {event.is_sold_out ? (
                        <div className="bg-red-500/20 border border-red-500/30 p-4 rounded-xl text-center">
                          <p className="text-red-400 font-bold">This event is currently sold out.</p>
                        </div>
                      ) : (
                        <>
                          <input type="text" required placeholder="Full Name" value={bookForm.name}
                            onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                          <input type="email" required placeholder="Email Address" value={bookForm.email}
                            onChange={(e) => setBookForm({ ...bookForm, email: e.target.value })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                          <input type="tel" placeholder="Phone Number (optional)" value={bookForm.phone}
                            onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                          <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2">Number of Tickets</label>
                            <select value={bookForm.tickets} onChange={(e) => setBookForm({ ...bookForm, tickets: e.target.value })}
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900">
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                <option key={n} value={n}>{n} {n === 1 ? "ticket" : "tickets"}</option>
                              ))}
                            </select>
                          </div>
                          <button type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-[#e87d4a] to-[#e6c830] text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity uppercase tracking-widest text-sm shadow-xl shadow-[#e87d4a]/20">
                            Continue to Payment
                          </button>
                        </>
                      )}
                    </form>
                  )}

                  {bookStep === 2 && (
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div className="flex items-center justify-center gap-2 text-sm text-emerald-600 bg-emerald-50 py-3 rounded-xl border border-emerald-100 mb-6">
                        <Lock size={14} />
                        <span className="font-bold">Secure Payment — Demo Mode</span>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Card Number</label>
                        <div className="relative">
                          <input type="text" required placeholder="4242 4242 4242 4242" value={payForm.card}
                            maxLength={19}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                              setPayForm({ ...payForm, card: v });
                            }}
                            className="w-full p-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 font-mono placeholder:text-slate-400" />
                          <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Expiry</label>
                          <input type="text" required placeholder="MM/YY" value={payForm.expiry}
                            maxLength={5}
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, "");
                              if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2);
                              setPayForm({ ...payForm, expiry: v });
                            }}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 font-mono placeholder:text-slate-400 text-center" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">CVV</label>
                          <input type="text" required placeholder="123" value={payForm.cvv}
                            maxLength={4}
                            onChange={(e) => setPayForm({ ...payForm, cvv: e.target.value.replace(/\D/g, "") })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 font-mono placeholder:text-slate-400 text-center" />
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-5 text-sm space-y-2 border border-slate-200 mt-6">
                        <div className="flex justify-between text-slate-500 font-medium">
                          <span>{bookForm.tickets}× Ticket</span>
                          <span className="text-slate-900">$0.00</span>
                        </div>
                        <div className="flex justify-between font-black text-slate-900 pt-3 border-t border-slate-200">
                          <span>Total</span>
                          <span className="text-blue-600">$0.00 (Demo)</span>
                        </div>
                      </div>
                      {bookingError && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm font-bold text-center">
                          Something went wrong. Please try again.
                        </div>
                      )}
                      <div className="flex gap-3 mt-6">
                        <button type="button" onClick={() => setBookStep(1)} disabled={processing} className="flex-1 px-4 py-4 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 font-bold uppercase tracking-wider text-xs hover:bg-slate-50 transition-colors disabled:opacity-50">
                          Back
                        </button>
                        <button type="submit" disabled={processing} className="flex-[2] py-4 bg-gradient-to-r from-[#e87d4a] to-[#e6c830] text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity uppercase tracking-widest text-xs shadow-xl shadow-[#e87d4a]/20 disabled:opacity-50">
                          {processing ? "Processing..." : "Pay & Confirm"}
                        </button>
                      </div>
                    </form>
                  )}

                  {bookStep === 3 && (
                    <div className="text-center py-4 space-y-6">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-lg shadow-emerald-500/10">
                        <Check size={40} className="text-emerald-500" />
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-4 border border-slate-200">
                        <div className="flex justify-between text-sm items-center border-b border-slate-200 pb-4">
                          <span className="text-slate-500 font-bold">Order #</span>
                          <span className="text-blue-600 font-mono font-black text-lg">{orderNum}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500 font-bold">Tickets</span>
                          <span className="text-slate-900 font-black">{bookForm.tickets}</span>
                        </div>
                        <div className="flex flex-col gap-1 text-sm pt-2">
                          <span className="text-slate-500 font-bold">Confirmation sent to:</span>
                          <span className="text-slate-900 font-medium break-all">{bookForm.email}</span>
                        </div>
                      </div>
                      <Link href="/events" className="block w-full text-center px-4 py-4 rounded-xl border border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-xs hover:bg-slate-50 transition-colors">
                        Back to Events
                      </Link>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
