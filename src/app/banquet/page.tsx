"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import PageBanner from "@/components/layout/PageBanner";
import Button from "@/components/ui/Button";
import { Calendar, MapPin, Users, Ticket, Award, Star, Check } from "lucide-react";
import { useState } from "react";

export default function BanquetPage() {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedTier, setSelectedTier] = useState("individual");
  const [submitted, setSubmitted] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageBanner
        title="2026 FLCRC Annual Banquet"
        subtitle="Join us for an evening of celebration, community, and commitment to building stronger families in Fort Bend County."
        imageSrc="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80"
      />

      {/* ===== BANQUET DETAILS — Light Section ===== */}
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <ScrollReveal delay={0}>
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center hover:shadow-xl transition-all">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 mb-6">
                  <Calendar size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">When</h3>
                <p className="text-slate-600 font-medium">Saturday, December 5, 2026<br/>6:00 PM - 10:00 PM</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center hover:shadow-xl transition-all">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center text-purple-600 mb-6">
                  <MapPin size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Where</h3>
                <p className="text-slate-600 font-medium">Safari Texas Ranch<br/>Richmond, TX 77406</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center hover:shadow-xl transition-all">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Attire</h3>
                <p className="text-slate-600 font-medium">Formal / Black Tie Optional<br/>Dress to Impress</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
              Registration
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Reserve Your Seat</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Select your ticket or sponsorship tier below. All proceeds directly fund our Y.A.L.E. and community intervention programs.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Tiers / Info */}
            <ScrollReveal>
              <div className="space-y-6">
                <div 
                  className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${selectedTier === 'individual' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-300'}`}
                  onClick={() => setSelectedTier('individual')}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <Ticket size={24} className="text-blue-600" />
                      <h3 className="text-xl font-black text-slate-900">Individual Ticket</h3>
                    </div>
                    <span className="text-2xl font-black text-slate-900">$100</span>
                  </div>
                  <p className="text-slate-600">General admission seating for one guest, includes dinner and program access.</p>
                </div>

                <div 
                  className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${selectedTier === 'table' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}`}
                  onClick={() => setSelectedTier('table')}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <Users size={24} className="text-purple-600" />
                      <h3 className="text-xl font-black text-slate-900">Reserved Table (8 Guests)</h3>
                    </div>
                    <span className="text-2xl font-black text-slate-900">$800</span>
                  </div>
                  <p className="text-slate-600">A dedicated table for you and 7 guests, acknowledged during the event.</p>
                </div>

                <div 
                  className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${selectedTier === 'vip' ? 'border-[#d4b828] bg-[#e6c830]/10' : 'border-slate-200 bg-white hover:border-[#d4b828]/50'}`}
                  onClick={() => setSelectedTier('vip')}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <Star size={24} className="text-[#d4b828]" />
                      <h3 className="text-xl font-black text-slate-900">VIP / Sponsor Table</h3>
                    </div>
                    <span className="text-2xl font-black text-slate-900">$1,500</span>
                  </div>
                  <p className="text-slate-600">Premium table location for 8 guests, half-page ad in the program booklet, and special recognition.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Application / Checkout Form */}
            <ScrollReveal delay={100}>
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-2xl relative overflow-hidden">
                <h3 className="text-2xl font-black text-slate-900 mb-2 relative z-10">Guest Registration</h3>
                <p className="text-slate-500 text-sm mb-8 relative z-10">Securely register and pay online.</p>
                
                <form onSubmit={handleCheckout} className="space-y-5 relative z-10">
                  <input type="text" required placeholder="Primary Guest / Company Name"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                  <div className="grid md:grid-cols-2 gap-5">
                    <input type="email" required placeholder="Email Address"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                    <input type="tel" placeholder="Phone Number"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400" />
                  </div>
                  
                  {selectedTier === 'individual' && (
                    <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <label className="text-slate-600 font-bold">Quantity:</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="10" 
                        value={ticketQuantity} 
                        onChange={(e) => setTicketQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 p-2 border border-slate-200 rounded-lg outline-none text-slate-900 text-center"
                      />
                    </div>
                  )}

                  <textarea 
                    placeholder="Dietary Restrictions or Special Accommodations?"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400 min-h-[100px]"
                  ></textarea>

                  {submitted ? (
                    <div className="text-center py-8 bg-emerald-50 border border-emerald-200 rounded-2xl mt-4">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={32} className="text-emerald-600" />
                      </div>
                      <h4 className="text-xl font-bold text-emerald-800 mb-2">Registration Received!</h4>
                      <p className="text-emerald-600 text-sm max-w-sm mx-auto">Thank you for your interest. Our team will contact you with payment details and event confirmation shortly.</p>
                    </div>
                  ) : (
                    <>
                      <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#e87d4a] to-[#e6c830] text-slate-900 font-bold rounded-xl text-lg hover:opacity-90 transition-opacity uppercase tracking-widest text-sm shadow-xl shadow-[#e87d4a]/20 mt-4">
                        Register {"->"}
                      </button>
                      <p className="text-center text-xs text-slate-400 mt-4">Online payment is coming soon. Upon registering, our team will reach out to confirm your reservation and arrange payment.</p>
                    </>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
