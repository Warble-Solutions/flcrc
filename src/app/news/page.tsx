"use client";

import Link from "next/link";
import { Calendar, Tag, ArrowRight, Newspaper } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageBanner from "@/components/layout/PageBanner";

const newsArticles = [
  {
    title: "FLCRC Insights Winter 2025-26",
    date: "March 4, 2026",
    categories: ["Annual Banquet", "Bullying Awareness", "Insights Newsletter", "Y.A.L.E."],
    excerpt:
      "In this issue: Annual Banquet, 2025 Community Survey feedback, and more!",
    image: "https://familylifecrc.org/wp-content/uploads/2026/03/12035-FLCRC.Winter.2026.Newsletter-BlogThumb.jpg",
    link: "https://familylifecrc.org/flcrc-insights-winter-2025-26/",
    featured: true,
  },
  {
    title: "2025 Community Survey",
    date: "March 4, 2026",
    categories: ["Community"],
    excerpt:
      "We conducted our annual community survey this winter. 45 respondents shared helpful insights into 2025 programs and services.",
    image: "https://familylifecrc.org/wp-content/uploads/2026/03/community-survey-2.jpg",
    link: "https://familylifecrc.org/2025survey/",
  },
  {
    title: "An Evening of Celebration and Gratitude",
    date: "December 18, 2025",
    categories: ["Annual Banquet", "FLCRC", "Y.A.L.E."],
    excerpt:
      "On Saturday, December 6, 2025, 140 staff, volunteers, supporters and friends of FLCRC gathered to celebrate another year of growth and impact in Fort Bend County.",
    image: "https://familylifecrc.org/wp-content/uploads/2025/12/9th-banquet-feat-img.jpg",
    link: "https://familylifecrc.org/an-evening-of-celebration-and-gratitude/",
  },
  {
    title: "2025 Volunteer of the Year: Loretta Butler",
    date: "December 6, 2025",
    categories: ["FLCRC"],
    excerpt:
      "We are pleased to announce the FLCRC 2025 Volunteer of the Year, Mrs. Loretta Butler. This award honors a very service-oriented volunteer.",
    image: "https://familylifecrc.org/wp-content/uploads/2025/12/loretta-butler-feat-img.jpg",
    link: "https://familylifecrc.org/2025-volunteer-of-the-year/",
  },
  {
    title: "FLCRC Insights Fall 2025",
    date: "November 24, 2025",
    categories: ["Back-2-School Parent Chat", "Insights Newsletter", "Y.A.L.E."],
    excerpt:
      "In this issue: Back-to-School Parent Chat, Y.A.L.E. Volunteerism and more!",
    image: "https://familylifecrc.org/wp-content/uploads/2025/11/12013-FLCRC.Fall_.2025.Newsletter-FeatImg.jpg",
    link: "https://familylifecrc.org/flcrc-insights-fall-2025/",
  },
  {
    title: "Back-to-School Parent Chat 2025",
    date: "August 3, 2025",
    categories: ["Back-2-School Parent Chat", "Community Resources", "Education"],
    excerpt:
      "We hosted our 21st Annual Back-to-School Parent Chat July 30-August 2, 2025, offering both in-person and virtual sessions and distributing over 150 backpacks with essential school supplies to students.",
    image: "https://familylifecrc.org/wp-content/uploads/2025/10/chat-3.jpg",
    link: "https://familylifecrc.org/back-to-school-parent-chat-2025/",
  },
  {
    title: "FLCRC Insights Summer 2025",
    date: "July 23, 2025",
    categories: ["Insights Newsletter", "Y.A.L.E."],
    excerpt:
      "In this issue: Hat & Tea Soirée, Summer Enrichment Camp and more!",
    image: "https://familylifecrc.org/wp-content/uploads/2025/07/1980-FLCRC.Summer.2025.Newsletter-Feat-Img.jpg",
    link: "https://familylifecrc.org/flcrc-insights-summer-2025/",
  },
  {
    title: "Camp with FLCRC – A Week of Fun and Learning",
    date: "June 21, 2025",
    categories: ["Education", "Summer Enrichment Camp", "Y.A.L.E."],
    excerpt:
      "Twenty-five students enjoyed a fun and interactive week at our Summer Enrichment Camp, 'Camp with FLCRC,' June 16-20.",
    image: "https://familylifecrc.org/wp-content/uploads/2025/06/feat-image.jpg",
    link: "https://familylifecrc.org/camp-with-y-a-l-e-2025-a-week-of-fun-and-learning/",
  },
  {
    title: "FLCRC Insights Spring 2025",
    date: "May 24, 2025",
    categories: ["Insights Newsletter", "Y.A.L.E."],
    excerpt:
      "In this issue: Y.A.L.E. Members Leading and Shining in 2025, Black History Month Celebration, and more!",
    image: "https://familylifecrc.org/wp-content/uploads/2025/05/1952-FLCRC.Spring.2025.Newsletter-FeatImg.jpg",
    link: "https://familylifecrc.org/flcrc-insights-spring-2025/",
  },
  {
    title: "Girls with Pearls: Women Leading & Soaring",
    date: "May 4, 2025",
    categories: ["Entrepreneurship"],
    excerpt:
      "On May 3rd, 2025, we hosted the 2nd annual FLCRC Hat & Tea Soirée, Girls with Pearls: Women Leading & Soaring. Guests were inspired by a panel discussion with four 'women in business.'",
    image: "https://familylifecrc.org/wp-content/uploads/2026/03/soiree6-900x550.jpg",
    link: "https://familylifecrc.org/girls-with-pearls-women-leading-soaring/",
  },
];

export default function NewsPage() {
  const featured = newsArticles[0];
  const rest = newsArticles.slice(1);

  return (
    <>
      {/* ===== HERO ===== */}
      <PageBanner 
        title="FLCRC News" 
        subtitle="Stay up to date with our latest programs, events, community initiatives, and quarterly Insights newsletters." 
        imageSrc="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80"
      />

      {/* ===== FEATURED ARTICLE — Light Section ===== */}
      <section className="bg-white text-slate-900 py-24 px-4 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">
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
              <div className="grid lg:grid-cols-2 gap-10 items-center bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
                <div className="h-72 lg:h-full overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                    <Calendar size={14} />
                    {featured.date}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-wider group-hover:gap-3 transition-all">
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
              <p className="text-sm font-bold uppercase tracking-widest text-purple-600 mb-3">
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
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">
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
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider group-hover:gap-3 transition-all">
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
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <button className="px-10 py-4 rounded-full bg-white text-slate-900 font-bold text-sm uppercase tracking-wider hover:bg-slate-100 transition-all cursor-pointer">
                  Contact Us
                </button>
              </Link>
              <a
                href="https://www.facebook.com/FLCRCRichmond/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-10 py-4 rounded-full border-2 border-white/30 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer">
                  Follow on Facebook
                </button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
