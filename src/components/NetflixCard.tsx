"use client";

import React from "react";
import Image from "next/image";

export interface CardItem {
  id: string;
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  bottomText: string;
  imageUrl: string;
  tags?: string[];
  responsibilities?: string[];
  fullDescription?: string[];
  period?: string;
  location?: string;
}

interface NetflixCardProps {
  item: CardItem;
  onClick: (item: CardItem) => void;
}

export default function NetflixCard({ item, onClick }: NetflixCardProps) {
  return (
    <div
      onClick={() => onClick(item)}
      className="group relative flex-shrink-0 w-[300px] sm:w-[360px] md:w-[380px] bg-[#141414] hover:bg-[#1a1a1a] border border-white/10 hover:border-white/25 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.025] hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-black/70 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-900">
        <Image
          src={item.imageUrl || "/images/card_insurance_ops.jpg"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 300px, 380px"
          className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
        />

        {/* Netflix Card Dark Gradient Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />

        {/* Top-Left Red Category Badge Pill */}
        {item.badge && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-block bg-[#E50914] text-white text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded-sm shadow-md">
              {item.badge}
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors line-clamp-1">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Bottom Red Accent Line / Tag / Role */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#E50914] truncate">
            {item.bottomText}
          </span>
          <span className="text-[11px] text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1 shrink-0 font-medium">
            Details →
          </span>
        </div>
      </div>
    </div>
  );
}
