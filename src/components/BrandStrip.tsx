"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function BrandStrip() {
  const { data } = usePortfolio();
  const { brands } = data;

  if (!brands || brands.length === 0) return null;

  // Duplicate brands array to create a seamless infinite marquee loop
  const marqueeBrands = [...brands, ...brands];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 py-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        {/* Red label header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
            <p className="text-xs font-bold tracking-widest text-[#E50914] uppercase">
              BRANDS I HAVE WORKED WITH / FOR
            </p>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
            {brands.length} Institutional Partners
          </span>
        </div>
      </div>

      {/* Marquee viewport with gradient edge fades */}
      <div className="relative w-full overflow-hidden group">
        {/* Left edge gradient fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />

        {/* Right edge gradient fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />

        {/* Marquee Track */}
        <div className="flex items-center gap-3.5 sm:gap-4 w-max animate-marquee group-hover:[animation-play-state:paused] py-1">
          {marqueeBrands.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex-shrink-0 w-40 sm:w-48 h-20 bg-zinc-900/90 hover:bg-zinc-800/95 border border-white/10 hover:border-red-600/50 rounded-xl flex flex-col items-center justify-center p-3 text-center transition-all duration-300 group/card cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-red-950/40"
            >
              <span className="font-extrabold text-sm sm:text-base text-zinc-200 group-hover/card:text-white tracking-wider uppercase transition-colors line-clamp-1">
                {brand.logoText || brand.name}
              </span>
              <span className="text-[10px] sm:text-[11px] text-zinc-400 group-hover/card:text-red-400 font-medium truncate max-w-full mt-1 transition-colors">
                {brand.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
