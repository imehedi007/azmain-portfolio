"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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
  pdfUrl?: string;
  credentialId?: string;
  aspectRatio?: "3/4" | "standard";
}

interface NetflixCardProps {
  item: CardItem;
  onClick: (item: CardItem) => void;
  aspectRatio?: "3/4" | "standard";
}

export default function NetflixCard({
  item,
  onClick,
  aspectRatio,
}: NetflixCardProps) {
  const isPortrait34 =
    aspectRatio === "3/4" || item.aspectRatio === "3/4";

  const isCert =
    item.imageUrl.includes("cert_") ||
    item.imageUrl.includes("certificate") ||
    item.imageUrl.includes("digital marketing") ||
    item.imageUrl.includes("CFI");

  const isLogo =
    item.imageUrl.toLowerCase().includes("logo") ||
    item.imageUrl.toLowerCase().includes("ndc") ||
    item.imageUrl.toLowerCase().includes("isc") ||
    item.imageUrl.toLowerCase().includes("idc") ||
    item.imageUrl.toLowerCase().includes("metlife") ||
    item.imageUrl.toLowerCase().includes("exim") ||
    item.imageUrl.toLowerCase().includes("mind-smith") ||
    item.imageUrl.toLowerCase().includes("mindsmith") ||
    item.imageUrl.toLowerCase().includes("scholar") ||
    item.imageUrl.toLowerCase().includes("abp");

  const isMindSmith =
    item.imageUrl.toLowerCase().includes("mind-smith") ||
    item.imageUrl.toLowerCase().includes("mindsmith");

  const isScholar =
    item.imageUrl.toLowerCase().includes("scholar");

  const isAbp =
    item.imageUrl.toLowerCase().includes("abp");

  const isPositiveYouth =
    item.imageUrl.toLowerCase().includes("positive-youth");

  return (
    <div
      onClick={() => onClick(item)}
      className={`group relative flex-shrink-0 ${
        isPortrait34
          ? "w-[270px] sm:w-[300px] md:w-[320px]"
          : "w-[300px] sm:w-[350px] md:w-[370px]"
      } bg-[#141414] hover:bg-[#181818] border border-white/10 hover:border-red-600/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.025] hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-red-950/25 flex flex-col justify-between`}
    >
      {/* Top Image Container - Supports 3:4 portrait or standard dynamic height */}
      <div
        className={`relative w-full overflow-hidden ${
          isMindSmith
            ? "bg-[#EFF8FD]"
            : isScholar
            ? "bg-[#115d2f]"
            : isLogo
            ? "bg-white"
            : "bg-zinc-950"
        } ${
          isPortrait34
            ? "aspect-[3/4] min-h-[340px]"
            : "h-64 sm:h-72 md:h-80 min-h-[256px] sm:min-h-[288px] md:min-h-[320px]"
        }`}
      >
        <Image
          src={item.imageUrl || "/images/card_insurance_ops.jpg"}
          alt={item.title}
          fill
          sizes={
            isPortrait34
              ? "(max-width: 768px) 270px, 320px"
              : "(max-width: 768px) 300px, 370px"
          }
          className={`${
            isLogo
              ? isMindSmith
                ? "object-contain p-2 sm:p-3"
                : isScholar
                ? "object-contain p-3.5 sm:p-4"
                : isAbp
                ? "object-contain p-2 sm:p-2.5"
                : "object-contain p-4 pb-5 sm:p-6 sm:pb-6"
              : `object-cover ${
                  isPositiveYouth
                    ? "object-[center_18%]"
                    : isCert
                    ? "object-center"
                    : isPortrait34
                    ? "object-[center_16%]"
                    : "object-[center_18%]"
                } brightness-95 group-hover:brightness-105`
          } group-hover:scale-105 transition-transform duration-500 ease-out`}
        />

        {/* Subtle bottom fade to gently transition photo/certificate image into card body */}
        {!isLogo && (
          <div
            className={`absolute bottom-0 inset-x-0 ${
              isCert ? "h-10" : "h-16"
            } bg-gradient-to-t from-[#141414] to-transparent pointer-events-none`}
          />
        )}

        {/* Refined Frosted Glass Category Badge */}
        {item.badge && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider text-zinc-100 uppercase shadow-lg group-hover:border-red-500/50 group-hover:text-white transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] shadow-sm shadow-red-500 shrink-0 animate-pulse" />
              {item.badge}
            </span>
          </div>
        )}

        {/* Period / Year Glass Chip */}
        {item.period && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="inline-block bg-black/75 backdrop-blur-md text-zinc-300 border border-white/15 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md">
              {item.period}
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body - Streamlined minimal text layout */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 bg-[#141414]">
        <div className="space-y-1">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>

          {/* Subtitle / Organization */}
          {item.subtitle && (
            <p className="text-xs text-zinc-400 font-medium truncate">
              {item.subtitle}
            </p>
          )}
        </div>

        {/* Bottom Metadata & Action Strip */}
        <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
          <span className="text-[11px] font-semibold text-[#E50914] truncate max-w-[70%]">
            {item.bottomText}
          </span>
          <span className="text-[11px] text-zinc-400 group-hover:text-white font-medium transition-colors flex items-center gap-0.5 shrink-0">
            Details
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}
