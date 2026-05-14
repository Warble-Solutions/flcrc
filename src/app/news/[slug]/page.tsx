import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Tag, ArrowLeft, Share2 } from "lucide-react";
import PageBanner from "@/components/layout/PageBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { newsArticles } from "@/lib/fallback-data";

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = newsArticles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Add prose styles for the legacy WordPress HTML content
  return (
    <>
      {/* Hero Banner uses the article's featured image or fallback */}
      <PageBanner 
        title={article.title}
        subtitle=""
        imageSrc={article.image || "/images/headers/news.jpg"}
      />

      <section className="bg-slate-50 py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            {/* Meta Information */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 -mt-32 relative z-20 mb-12">
              <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-8">
                <ArrowLeft size={16} /> Back to News
              </Link>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-bold uppercase tracking-widest">
                  <Calendar size={16} className="text-[#6fa8dc]" />
                  {article.date}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
                <div className="flex flex-wrap gap-2">
                  {article.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      <Tag size={12} />
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                {article.title}
              </h1>

              {/* Share Buttons Placeholder */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mr-2">Share:</span>
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#5b93c7] hover:text-white transition-all">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Article Content Area */}
          <ScrollReveal delay={100}>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
              <div 
                className="article-content w-full overflow-hidden"
                dangerouslySetInnerHTML={{ __html: article.content || "<p>No content available for this article.</p>" }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
