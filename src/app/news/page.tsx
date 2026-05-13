"use client";

import Link from "next/link";
import { Calendar, Tag, ArrowRight, Newspaper, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageBanner from "@/components/layout/PageBanner";

import { newsArticles } from "@/lib/fallback-data";

export default function NewsPage() {
  const featured = newsArticles[0];
  const rest = newsArticles.slice(1);

  return (
    <>
      {/* ===== HERO ===== */}
      <PageBanner 
        title="News & Press" 
        subtitle="Stay updated with the latest announcements, newsletters, and media coverage from FLCRC." 
        imageSrc="/images/headers/news.jpg"
      />

      {/* ===== FEATURED ARTICLE — Brand Gradient Section ===== */}
      <section className="relative py-24 px-4 z-10" style={{background: "linear-gradient(135deg, #e87d4a 0%, #e6c830 100%)"}}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-sm font-bold uppercase tracking-widest text-white mb-3 text-center">
              Featured Story
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <a
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="grid lg:grid-cols-2 gap-0 items-center bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-black/40 transition-all">
                <div className="h-72 lg:h-full overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 lg:p-12 relative z-10">
                  <div className="flex items-center gap-3 text-sm text-slate-500 font-bold uppercase tracking-widest mb-4">
                    <Calendar size={14} />
                    {featured.date}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#6fa8dc] uppercase tracking-wider group-hover:gap-3 transition-all">
                    Read Full Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== ALL ARTICLES GRID — Light Section ===== */}
      <section className="bg-slate-50 text-slate-900 py-24 px-4 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
                All Stories
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                Recent News & Updates
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                        <Calendar size={12} />
                        {article.date}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#5b93c7] transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {article.categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full flex items-center gap-1"
                          >
                            <Tag size={10} />
                            {cat}
                          </span>
                        ))}
                        {article.categories.length > 2 && (
                          <span className="text-[10px] font-bold text-slate-400 px-2 py-1">
                            +{article.categories.length - 2}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-[#5b93c7] uppercase tracking-wider group-hover:gap-3 transition-all">
                        Read More <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA — Dark Section ===== */}
      <section className="relative py-20 px-4 bg-luminous-bg z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Stay <span className="text-gradient">Connected</span>
            </h2>
            <p className="text-luminous-muted text-lg mb-10 max-w-2xl mx-auto">
              Subscribe to our newsletter or follow us on social media to never
              miss an update from FLCRC.
            </p>
            <div className="flex flex-col items-center gap-8">
              <Link href="/contact">
                <button className="px-10 py-4 rounded-full bg-white text-slate-900 font-bold text-sm uppercase tracking-wider hover:bg-slate-100 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Contact Us
                </button>
              </Link>
              
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/FLCRCRichmond/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#6fa8dc] hover:-translate-y-1 transition-all">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/flcrc.richmond/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#e87d4a] hover:-translate-y-1 transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://www.youtube.com/channel/UC1lc1ZAp8HyQys_oL-5Vajg" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#e6c830] hover:-translate-y-1 transition-all">
                  <Youtube size={20} />
                </a>
                <a href="https://x.com/flcrc" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#5b93c7] hover:-translate-y-1 transition-all">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
