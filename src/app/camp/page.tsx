"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import PageBanner from "@/components/layout/PageBanner";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import Image from "next/image";

// Pre-define the array of summer camp images for the gallery
const campImages = [
  "camp.jpg", "camp2.jpg", "camp3.jpg", "camp4.jpg", "camp5.jpg", 
  "camp6.jpg", "camp7.jpg", "camp8.jpg", "camp9.jpg", "camp10.jpg",
  "camp11.jpg", "camp12.jpg", "camp13.jpg", "camp14.jpg", "camp15.jpg",
  "camp16.jpg", "camp17.jpg", "camp18.jpg", "camp19.jpg", "camp20.jpg",
  "camp21.jpg", "camp22.jpg", "camp23.jpg", "camp24.jpg", "feat-image.jpg"
];

export default function CampPage() {
  return (
    <>
      <PageBanner
        title="FLCRC Summer Enrichment Camp"
        subtitle="Each year, the FLCRC Summer Enrichment Camp offers students a week-long experience of learning, exploration and empowerment."
        imageSrc="/images/headers/summer-camp.jpg"
      />

      {/* ===== CAMP DETAILS ===== */}
      <section className="relative bg-white text-slate-900 py-24 px-4 z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                A Week of Fun and Learning
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Each year, the FLCRC Summer Enrichment Camp offers students a week-long experience of learning, exploration and empowerment. Our fun and interactive sessions cover a wide range of topics including:
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {["STEM", "Leadership", "Fitness & Sports", "College & Career", "Technology", "Entrepreneurship"].map((topic, i) => (
                  <span key={i} className="px-5 py-2.5 bg-blue-50 text-blue-700 font-bold rounded-full border border-blue-100 shadow-sm">
                    {topic}
                  </span>
                ))}
                <span className="px-5 py-2.5 bg-slate-50 text-slate-600 font-bold rounded-full border border-slate-200">
                  ...and much more!
                </span>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 text-left mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 shrink-0">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xl">For Grades 2nd through 12th</h4>
                    <p className="text-slate-600">This five-day camp is designed for a wide range of students.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-2xl text-purple-600 shrink-0">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xl">Field Trips & College Tours</h4>
                    <p className="text-slate-600">The program also includes fun and interactive field trips and college tours.</p>
                  </div>
                </div>
              </div>

              <Link href="/events" className="inline-block">
                <Button variant="primary" className="px-10 py-5 text-lg font-bold shadow-xl shadow-blue-900/20">
                  Learn more and register for the 2026 Summer Enrichment Camp
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Endless Scrolling Photo Gallery */}
        <div className="w-full mt-24 mb-10 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-[200%] md:w-[300%] animate-marquee">
            {/* Double the array for seamless endless scrolling */}
            {[...campImages, ...campImages].map((img, i) => (
              <div key={i} className="flex-none w-64 md:w-80 h-48 md:h-64 mx-3 rounded-2xl overflow-hidden relative group shadow-md border border-slate-200">
                <Image
                  src={`/images/summer camp/${img}`}
                  alt={`Summer camp photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEW BUILDING GENERATION SECTION ===== */}
      <section className="relative bg-slate-50 text-slate-900 py-24 px-4 z-10 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              Building a New Generation of Leaders
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Exciting plans are in the works to transform our five-day camp into a six-week summer enrichment experience!
            </p>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              With the help of funds raised from our FY2025-26 Capital Campaign, this enhanced and expanded program will immerse students in highly engaging, fun and interactive activities focused on STEM, entrepreneurship, technology & AI, communications & social media, college & career preparation, language and culture. 
              <strong> We invite you to support the campaign and help us build a new generation of leaders!</strong>
            </p>
            
            <Link href="/campaign">
              <Button variant="primary" className="px-10 py-5 text-lg font-bold shadow-xl shadow-blue-900/20 inline-flex items-center gap-3">
                Learn More and Donate <ArrowRight size={20} />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
