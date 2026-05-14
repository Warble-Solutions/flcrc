"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Tag, ArrowRight, Facebook, Instagram, Youtube, Twitter, Search, LayoutGrid, List } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageBanner from "@/components/layout/PageBanner";

import { newsArticles } from "@/lib/fallback-data";

export default function NewsPage() {
  const featured = newsArticles[0];
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["All", "Community", "Y.A.L.E.", "Education"];

  const filteredArticles = newsArticles.slice(1).filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || article.categories.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* ===== HERO ===== */}
      <PageBanner 
        title="News & Press" 
        subtitle="Stay updated with the latest announcements, newsletters, and media coverage from FLCRC." 
        imageSrc="/images/headers/news.jpg"
      />

      {/* ===== FEATURED ARTICLE — Brand Gradient Section ===== */}
      <section className="relative py-24 px-4 z-10 bg-gradient-to-br from-[#e87d4a] via-[#f1a66a] to-[#e6c830]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-sm font-bold uppercase tracking-widest text-white mb-6 text-center">
              Featured Story
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Link
              href={`/news/${featured.slug}`}
              className="block group"
            >
              <div className="flex flex-col lg:flex-row items-stretch bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500">
                <div className="w-full lg:w-1/2 overflow-hidden relative min-h-[300px] lg:min-h-[400px]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="w-full lg:w-1/2 p-8 lg:p-12 relative z-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm text-slate-500 font-bold uppercase tracking-widest mb-4">
                    <Calendar size={14} />
                    {featured.date}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 group-hover:text-[#e87d4a] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg mb-8">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featured.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#6fa8dc] uppercase tracking-wider group-hover:gap-3 transition-all mt-auto">
                    Read Full Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== ALL ARTICLES GRID — Light Section ===== */}
      <section className="bg-slate-50 text-slate-900 py-24 px-4 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">
                All Stories
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-10">
                Recent News & Updates
              </h2>
            </div>
            
            {/* Filters and Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                      categoryFilter === cat 
                        ? "bg-[#1b2847] text-white" 
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-grow md:w-64">
                  <input 
                    type="text" 
                    placeholder="Search news..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#6fa8dc] focus:ring-2 focus:ring-[#6fa8dc]/20 transition-all text-slate-900"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
                
                <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 shrink-0">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-[#1b2847]" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <LayoutGrid size={20} />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-[#1b2847]" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-500">Try adjusting your search query or category filter.</p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
              {filteredArticles.map((article, i) => (
                <ScrollReveal key={i} delay={i * 50}>
                  <Link
                    href={`/news/${article.slug}`}
                    className="block group h-full"
                  >
                    {viewMode === "grid" ? (
                      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#6fa8dc] transition-all h-full flex flex-col">
                        <div className="h-56 overflow-hidden relative">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-bold uppercase tracking-wider">
                            <Calendar size={12} />
                            {article.date}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#5b93c7] transition-colors leading-snug">
                            {article.title}
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                            {article.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                            {article.categories.slice(0, 2).map((cat) => (
                              <span
                                key={cat}
                                className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-full flex items-center gap-1"
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
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#6fa8dc] transition-all flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden relative shrink-0">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-bold uppercase tracking-wider">
                            <Calendar size={12} />
                            {article.date}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#5b93c7] transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-slate-500 leading-relaxed mb-6">
                            {article.excerpt}
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                            <div className="flex flex-wrap gap-2">
                              {article.categories.map((cat) => (
                                <span
                                  key={cat}
                                  className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-full flex items-center gap-1"
                                >
                                  <Tag size={10} />
                                  {cat}
                                </span>
                              ))}
                            </div>
                            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#5b93c7] uppercase tracking-wider group-hover:gap-3 transition-all shrink-0">
                              Read More <ArrowRight size={12} />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
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
