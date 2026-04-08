"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Check,
  Facebook,
  Twitter,
  Instagram,
  Printer,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useDonate } from "@/components/layout/DonateProvider";
import PageBanner from "@/components/layout/PageBanner";

export default function ContactPage() {
  const { openDonate } = useDonate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const supabase = createClient();
      await supabase.from("form_submissions").insert({
        type: "contact",
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || null,
        message: contactForm.message,
        metadata: { subject: contactForm.subject },
      });
    } catch (err) {
      console.error("Contact form error:", err);
    }
    setSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <>
      <PageBanner 
        title="Contact Us" 
        subtitle="We'd love to hear from you. Whether you have a question about our programs, events, or anything else — our team is ready to help." 
        imageSrc="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80"
      />

      {/* ===== CONTACT INFO CARDS — Light Section ===== */}
      <section className="bg-white text-slate-900 py-24 px-4 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                icon: MapPin,
                title: "Visit Us",
                lines: [
                  "Family Life and Community",
                  "Resource Center",
                  "821 E Highway 90A",
                  "Richmond, TX 77406",
                ],
                color: "bg-blue-600",
                href: "https://maps.google.com/?q=821+E+Highway+90A+Richmond+TX+77406",
              },
              {
                icon: Phone,
                title: "Call Us",
                lines: ["1-888-337-1411"],
                color: "bg-emerald-600",
                href: "tel:1-888-337-1411",
              },
              {
                icon: Printer,
                title: "Fax",
                lines: ["1-888-977-1171"],
                color: "bg-purple-600",
                href: null,
              },
              {
                icon: Mail,
                title: "Email Us",
                lines: ["info@familylifecrc.org"],
                color: "bg-rose-600",
                href: "mailto:info@familylifecrc.org",
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-all h-full group text-center">
                  <div
                    className={`w-14 h-14 ${card.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <card.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {card.title}
                  </h3>
                  <div className="space-y-1">
                    {card.lines.map((line, j) =>
                      card.href && j === 0 ? (
                        <a
                          key={j}
                          href={card.href}
                          className="block text-sm text-blue-600 font-medium hover:underline"
                          target={card.href.startsWith("http") ? "_blank" : undefined}
                          rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={j} className="text-sm text-slate-500">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* ===== FORM + MAP SIDE BY SIDE ===== */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-slate-500 mb-8">
                  Fill out the form and we&apos;ll get back to you as soon as
                  possible.
                </p>
              </ScrollReveal>

              {formSubmitted ? (
                <ScrollReveal>
                  <div className="text-center bg-emerald-50 border border-emerald-200 rounded-2xl p-12">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={32} className="text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-emerald-600">
                      Thank you for reaching out. We&apos;ll respond within
                      24–48 hours.
                    </p>
                  </div>
                </ScrollReveal>
              ) : (
                <ScrollReveal>
                  <form
                    onSubmit={handleContactSubmit}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-5"
                  >
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Subject *
                        </label>
                        <select
                          required
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        >
                          <option value="">Select a topic</option>
                          <option>General Inquiry</option>
                          <option>Programs Information</option>
                          <option>Event Details</option>
                          <option>Facility Rental</option>
                          <option>Volunteering</option>
                          <option>Donation / Sponsorship</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-sm cursor-pointer disabled:opacity-50"
                    >
                      <Send size={16} />
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </ScrollReveal>
              )}
            </div>

            {/* Map & Social */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal delay={200}>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.0!2d-95.76!3d29.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z821+E+Highway+90A+Richmond+TX+77406!5e0!3m2!1sen!2sus!4v1!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="FLCRC Location"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/FLCRCRichmond/" },
                      { icon: Twitter, label: "Twitter", href: "https://twitter.com/flcrc" },
                      { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/flcrc.richmond/" },
                    ].map(({ icon: Icon, label, href }, i) => (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-all"
                      >
                        <Icon size={16} />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 mb-3">
                    Quick Contact
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="tel:1-888-337-1411"
                      className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <Phone size={14} className="text-emerald-600" />
                      1-888-337-1411
                    </a>
                    <a
                      href="mailto:info@familylifecrc.org"
                      className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <Mail size={14} className="text-rose-600" />
                      info@familylifecrc.org
                    </a>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Printer size={14} className="text-purple-600" />
                      Fax: 1-888-977-1171
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA — Dark Section ===== */}
      <section className="relative py-20 px-4 bg-luminous-bg z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Ready to Make a <span className="text-gradient">Difference</span>?
            </h2>
            <p className="text-luminous-muted text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of families and volunteers who are already
              building stronger communities with FLCRC.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                className="px-10 py-4"
                onClick={openDonate}
              >
                Donate Now
              </Button>
              <a href="/volunteer">
                <Button variant="glow" className="px-10 py-4">
                  Volunteer With Us
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
