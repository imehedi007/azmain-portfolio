"use client";

import React, { useRef } from "react";
import NetflixCard, { CardItem } from "./NetflixCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RowCarouselProps {
  id?: string;
  title: string;
  subtitle: string;
  items: CardItem[];
  onCardClick: (item: CardItem) => void;
}

export default function RowCarousel({
  id,
  title,
  subtitle,
  items,
  onCardClick,
}: RowCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section id={id} className="py-8 sm:py-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row Header with Title & Arrow Navigation */}
        <div className="flex items-end justify-between mb-5">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal">
              {subtitle}
            </p>
          </div>

          {/* Carousel Arrows (< >) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label={`Scroll ${title} left`}
              className="w-9 h-9 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-white/25 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label={`Scroll ${title} right`}
              className="w-9 h-9 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-white/25 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 -mx-1"
        >
          {items.map((item) => (
            <NetflixCard key={item.id} item={item} onClick={onCardClick} />
          ))}
        </div>
      </div>
    </section>
  );
}
