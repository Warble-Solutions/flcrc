"use client";


import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Users,
  Clock,
  DollarSign,
  Wine,
  Shirt,
  Palette,
  MapPin,
  Phone,
  Mail,
  Send,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { createClient } from "@/lib/supabase/client";
import PageBanner from "@/components/layout/PageBanner";

// All 15 facility images
const facilityImages = Array.from({ length: 15 }, (_, i) => ({
  src: `/images/facility rental/${i + 1}.jpg`,
  alt: `FLCRC Facility - View ${i + 1}`,
}));

const pricingItems = [
  {
    icon: Users,
    title: "Base Package",
    price: "$700",
    details: [
      "Seats 128 guests",
      "16 round tables (8 seats each)",
      "4-hour minimum rental",
      "$150 refundable security deposit",
    ],
    highlight: true,
  },
  {
    icon: Clock,
    title: "Additional Hours",
    price: "$100",
    details: [
      "Per additional hour",
      "Beyond the 4-hour block",
      "1-hour setup window included",
      "1-hour breakdown window included",
    ],
    highlight: false,
  },
  {
    icon: Wine,
    title: "Alcohol Service",
    price: "$400",
    details: [
      "Two security officers required",
      "TABC certificate required",
      "Certificate provided by renter",
      "Copy given to owner",
    ],
    highlight: false,
  },
];

const addonItems = [
  {
    icon: Shirt,
    title: "Table Linens",
    price: "$150",
    desc: "Black or white table linens",
  },
  {
    icon: Shirt,
    title: "Chair Coverings",
    price: "$150",
    desc: "Black or white chair covers",
  },
  {
    icon: Shirt,
    title: "Linens + Chairs Combo",
    price: "$250",
    desc: "Both linens and chair coverings",
  },
  {
    icon: Palette,
    title: "Chair Sashes",
    price: "$100",
    desc: "Variety of colors available",
  },
];

// ───── Venue Carousel Component ─────
function VenueCarousel({ onImageClick }: { onImageClick: (i: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const scrollPos = useRef(0);
  const animRef = useRef<number>(0);
  const speed = 0.5; // px per frame

  // Duplicate images for seamless loop
  const doubledImages = [...facilityImages, ...facilityImages];

  const animate = useCallback(() => {
    if (!trackRef.current) return;
    if (!paused) {
      scrollPos.current += speed;
      // Reset when first set has scrolled out
      const singleSetWidth = trackRef.current.scrollWidth / 2;
      if (scrollPos.current >= singleSetWidth) {
        scrollPos.current = 0;
      }
      trackRef.current.style.transform = `translateX(-${scrollPos.current}px)`;
    }
    animRef.current = requestAnimationFrame(animate);
  }, [paused]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div ref={trackRef} className="flex gap-4 will-change-transform">
        {doubledImages.map((img, i) => {
          const realIndex = i % facilityImages.length;
          return (
            <div
              key={i}
              className="shrink-0 w-[280px] md:w-[340px] h-[220px] md:h-[260px] rounded-2xl overflow-hidden cursor-pointer group relative shadow-lg"
              onClick={() => onImageClick(realIndex)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={300}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-[#1b2847]/0 group-hover:bg-[#1b2847]/30 transition-all flex items-center justify-center">
                <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                  View
                </span>
              </div>
            </div>
  );
        })}
      </div>
    </div>
  );
}

export default function FacilityRentalsPage() {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rentalForm, setRentalForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    guests: "",
    hours: "",
    alcohol: "No",
    addons: [] as string[],
    notes: "",
  });

  const toggleAddon = (addon: string) => {
    setRentalForm((prev) => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter((a) => a !== addon)
        : [...prev.addons, addon],
    }));
  };

  const handleRentalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(false);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("form_submissions").insert({
        type: "rental",
        name: rentalForm.name,
        email: rentalForm.email,
        phone: rentalForm.phone || null,
        message: rentalForm.notes || null,
        metadata: {
          event_date: rentalForm.eventDate,
          event_type: rentalForm.eventType,
          estimated_guests: rentalForm.guests,
          hours_needed: rentalForm.hours,
          alcohol: rentalForm.alcohol,
          addons: rentalForm.addons,
        },
      });
      if (error) throw error;
      setFormSubmitted(true);
    } catch (err) {
      console.error("Rental form error:", err);
      setFormError(true);
    }
    setSubmitting(false);
  };

  const openGallery = (i: number) => setGalleryIndex(i);
  const closeGallery = () => setGalleryIndex(null);
  const nextImage = () =>
    setGalleryIndex((p) =>
      p !== null ? (p + 1) % facilityImages.length : null
    );
  const prevImage = () =>
    setGalleryIndex((p) =>
      p !== null ? (p - 1 + facilityImages.length) % facilityImages.length : null
    );

  return (
    <>
      <PageBanner 
        title="Facility Rentals" 
        subtitle="Host your next event, banquet, or conference at our beautiful, modern venue." 
        imageSrc="/images/headers/rentals.jpg"
      />

        {/* ===== VENUE CAROUSEL — Light Section ===== */}
        <section className="bg-white py-20 z-10 relative">
          <div className="max-w-7xl mx-auto px-4 mb-12">
            <ScrollReveal>
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Our Space
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                  Explore the Venue
                </h2>
              </div>
            </ScrollReveal>
          </div>
          <VenueCarousel onImageClick={openGallery} />
        </section>

        {/* ===== PRICING — Light Section ===== */}
        <section className="relative py-24 px-4 bg-slate-50 z-10">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Transparent Pricing
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                  Rental Packages
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {pricingItems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div
                    className={`rounded-2xl p-8 border transition-all h-full flex flex-col ${
                      item.highlight
                        ? "bg-gradient-to-b from-[#6fa8dc]/10 to-white border-[#6fa8dc]/30 shadow-lg shadow-[#6fa8dc]/10"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    {item.highlight && (
                      <span className="inline-block self-start text-[10px] font-bold uppercase tracking-widest text-[#6fa8dc] bg-[#6fa8dc]/10 px-3 py-1 rounded-full mb-4">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          item.highlight
                            ? "bg-[#6fa8dc] text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="mb-6">
                      <span className="text-5xl font-black text-slate-900">
                        {item.price}
                      </span>
                    </div>
                    <ul className="space-y-3 flex-grow">
                      {item.details.map((detail, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-3 text-sm text-slate-600"
                        >
                          <Check
                            size={16}
                            className={
                              item.highlight
                                ? "text-[#6fa8dc]"
                                : "text-slate-400"
                            }
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Add-ons */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900">
                  Optional Add-Ons
                </h3>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {addonItems.map((addon, i) => (
                <ScrollReveal key={i} delay={i * 50}>
                  <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:border-[#e87d4a]/40 hover:shadow-md transition-all">
                    <addon.icon
                      size={24}
                      className="text-[#e87d4a] mx-auto mb-3"
                    />
                    <div className="font-bold text-slate-900 text-sm mb-1">
                      {addon.title}
                    </div>
                    <div className="text-2xl font-black text-[#e87d4a] mb-2">
                      {addon.price}
                    </div>
                    <p className="text-xs text-slate-500">{addon.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RENTAL FORM — Light Section ===== */}
        <section className="bg-white text-slate-900 py-24 px-4 z-10 relative">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Book Now
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                  Request a Rental
                </h2>
                <p className="text-slate-500 max-w-lg mx-auto">
                  Complete the form below, or email{" "}
                  <a
                    href="mailto:info@familylifecrc.org"
                    className="text-slate-500 font-bold hover:underline"
                  >
                    info@familylifecrc.org
                  </a>{" "}
                  or mail/deliver in-person to Family Life and Community Resource
                  Center, 821 E Hwy 90A, Richmond, TX 77406.
                </p>
              </div>
            </ScrollReveal>

            {formSubmitted ? (
              <ScrollReveal>
                <div className="text-center bg-emerald-50 border border-emerald-200 rounded-2xl p-12">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                    Request Submitted!
                  </h3>
                  <p className="text-emerald-600">
                    We&apos;ll review your request and get back to you within 24–48
                    hours.
                  </p>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal>
                <form
                  onSubmit={handleRentalSubmit}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rentalForm.name}
                        onChange={(e) => setRentalForm({ ...rentalForm, name: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#5b93c7] focus:ring-1 focus:ring-[#5b93c7] transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={rentalForm.email}
                        onChange={(e) => setRentalForm({ ...rentalForm, email: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#5b93c7] focus:ring-1 focus:ring-[#5b93c7] transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={rentalForm.phone}
                        onChange={(e) => setRentalForm({ ...rentalForm, phone: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#5b93c7] focus:ring-1 focus:ring-[#5b93c7] transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={rentalForm.eventDate}
                        onChange={(e) => setRentalForm({ ...rentalForm, eventDate: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#5b93c7] focus:ring-1 focus:ring-[#5b93c7] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Type of Event *
                      </label>
                      <select
                        required
                        value={rentalForm.eventType}
                        onChange={(e) => setRentalForm({ ...rentalForm, eventType: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#5b93c7] focus:ring-1 focus:ring-[#5b93c7] transition-all"
                      >
                        <option value="">Select event type</option>
                        <option>Wedding Reception</option>
                        <option>Birthday Party</option>
                        <option>Corporate Meeting</option>
                        <option>Conference</option>
                        <option>Banquet / Gala</option>
                        <option>Memorial / Celebration of Life</option>
                        <option>Baby Shower</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Estimated Guests *
                      </label>
                      <input
                        type="number"
                        required
                        max={128}
                        value={rentalForm.guests}
                        onChange={(e) => setRentalForm({ ...rentalForm, guests: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#5b93c7] focus:ring-1 focus:ring-[#5b93c7] transition-all"
                        placeholder="e.g. 100"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Hours Needed *
                      </label>
                      <select
                        required
                        value={rentalForm.hours}
                        onChange={(e) => setRentalForm({ ...rentalForm, hours: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#5b93c7] focus:ring-1 focus:ring-[#5b93c7] transition-all"
                      >
                        <option value="">Select duration</option>
                        <option>4 hours (minimum)</option>
                        <option>5 hours</option>
                        <option>6 hours</option>
                        <option>7 hours</option>
                        <option>8 hours</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Will alcohol be served?
                      </label>
                      <select
                        value={rentalForm.alcohol}
                        onChange={(e) => setRentalForm({ ...rentalForm, alcohol: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#5b93c7] focus:ring-1 focus:ring-[#5b93c7] transition-all"
                      >
                        <option>No</option>
                        <option>Yes</option>
                      </select>
                    </div>
                  </div>

                  {/* Add-on checkboxes */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Optional Add-Ons
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Table Linens ($150)",
                        "Chair Coverings ($150)",
                        "Linens + Chairs Combo ($250)",
                        "Chair Sashes ($100)",
                      ].map((addon, i) => (
                        <label
                          key={i}
                          className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-[#5b93c7] transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={rentalForm.addons.includes(addon)}
                            onChange={() => toggleAddon(addon)}
                            className="w-4 h-4 accent-[#5b93c7]"
                          />
                          <span className="text-sm text-slate-700">
                            {addon}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      rows={4}
                      value={rentalForm.notes}
                      onChange={(e) => setRentalForm({ ...rentalForm, notes: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#5b93c7] focus:ring-1 focus:ring-[#5b93c7] transition-all resize-none"
                      placeholder="Any specific requirements, setup preferences, or questions..."
                    />
                  </div>

                  {formError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm text-center">
                      Something went wrong. Please try again or email us at info@familylifecrc.org.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-slate-600 text-white font-bold py-4 rounded-xl hover:bg-slate-500 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-sm cursor-pointer disabled:opacity-50"
                  >
                    <Send size={16} />
                    {submitting ? "Submitting..." : "Submit Rental Request"}
                  </button>
                </form>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* ===== CONTACT STRIP — Light ===== */}
        <section className="relative py-16 px-4 bg-slate-100 z-10">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm border border-slate-200">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Have Questions?
                  </h3>
                  <p className="text-slate-500">
                    Our team is happy to help you plan your perfect event.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                  <a
                    href="tel:1-888-337-1411"
                    className="flex items-center gap-2 text-slate-700 font-bold hover:text-[#6fa8dc] transition-colors"
                  >
                    <Phone size={16} /> 1-888-337-1411
                  </a>
                  <a
                    href="mailto:info@familylifecrc.org"
                    className="flex items-center gap-2 text-slate-700 font-bold hover:text-[#6fa8dc] transition-colors"
                  >
                    <Mail size={16} /> info@familylifecrc.org
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
{/* ===== LIGHTBOX GALLERY ===== */}
      {galleryIndex !== null && (
        <div className="fixed inset-0 z-[70] bg-[#1b2847]/95 backdrop-blur-xl flex items-center justify-center">
          <button
            onClick={closeGallery}
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer z-10"
          >
            <X size={24} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer z-10"
          >
            <ChevronRight size={24} />
          </button>
          <div className="max-w-5xl max-h-[80vh] w-full px-4">
            <Image
              src={facilityImages[galleryIndex].src}
              alt={facilityImages[galleryIndex].alt}
              width={1200}
              height={800}
              className="w-full h-full object-contain rounded-xl"
              unoptimized
            />
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm font-bold tracking-widest">
            {galleryIndex + 1} / {facilityImages.length}
          </div>
        </div>
      )}
    </>
  );
}
