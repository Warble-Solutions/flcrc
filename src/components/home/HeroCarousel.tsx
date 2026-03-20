"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselProps {
  children: ReactNode[];
  autoPlayInterval?: number;
}

export default function HeroCarousel({
  children,
  autoPlayInterval = 6000,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = children.length;

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % total),
    [total]
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + total) % total),
    [total]
  );

  useEffect(() => {
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Slides */}
      {children.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            i === current
              ? "opacity-100 translate-x-0 z-10"
              : i < current
              ? "opacity-0 -translate-x-full z-0"
              : "opacity-0 translate-x-full z-0"
          }`}
        >
          {slide}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {children.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === current
                ? "w-10 h-3 bg-luminous-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                : "w-3 h-3 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
