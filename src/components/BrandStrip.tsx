"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function BrandStrip() {
  const { data } = usePortfolio();
  const { brands } = data;

  if (!brands || brands.length === 0) return null;

  return (
    <section className="relative z-20 -mt-8 py-6 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Red label header */}
        <p className="text-xs font-bold tracking-widest text-[#E50914] uppercase mb-4">
          BRANDS I HAVE WORKED WITH / FOR
        </p>

        {/* Brand cards row */}
        <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar pb-2 scroll-smooth">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex-shrink-0 w-36 sm:w-44 h-20 bg-zinc-900/90 hover:bg-zinc-800 border border-white/5 hover:border-white/20 rounded-lg flex flex-col items-center justify-center p-3 text-center transition-all duration-300 group cursor-default hover:scale-105"
            >
              <span className="font-extrabold text-sm sm:text-base text-zinc-300 group-hover:text-white tracking-wider uppercase transition-colors">
                {brand.logoText || brand.name}
              </span>
              <span className="text-[10px] text-zinc-400 group-hover:text-zinc-300 font-medium truncate max-w-full mt-0.5">
                {brand.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
