"use client";

import React from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { Play, Info } from "lucide-react";

interface HeroProps {
  onOpenVideo: () => void;
  onOpenMoreInfo: () => void;
}

export default function Hero({ onOpenVideo, onOpenMoreInfo }: HeroProps) {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <section className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-[#0a0a0a]">
      {/* Background Cinematic Banner */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <Image
          src={profile.heroImageUrl || "/images/banner.jpg"}
          alt={`${profile.name} - Executive Hero`}
          fill
          priority
          sizes="100vw"
          style={{ top: "5%" }}
          className="object-cover object-[80%_top] sm:object-[82%_top] md:object-[84%_top] lg:object-[84%_top] scale-[1.04] translate-y-3 sm:translate-y-4 md:translate-y-6 opacity-90 brightness-95"
        />

        {/* Netflix gradient overlays */}
        {/* Left-to-right gradient for text legibility, keeping Azmain visible on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 md:via-[#0a0a0a]/80 to-transparent w-full md:w-3/5 lg:w-1/2 z-10" />

        {/* Bottom vignette to seamlessly transition to content rows */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />

        {/* Top vignette to blend with navbar */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#0a0a0a]/90 to-transparent z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-5">
          {/* Badge: Red Dot + ABOUT THE MAN HIMSELF */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-xs font-semibold tracking-wider text-zinc-200">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
            <span className="uppercase">{profile.heroBadge || "ABOUT THE MAN HIMSELF"}</span>
          </div>

          {/* Subheader: — PORTFOLIO · 2026 */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest text-[#E50914] uppercase">
            <span className="w-6 h-[2px] bg-[#E50914]" />
            <span>{profile.portfolioYear || "PORTFOLIO · 2026"}</span>
          </div>

          {/* Giant Display Title: HELLO, I AM AZMAIN */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] uppercase">
            HELLO, I AM <br />
            <span className="text-white drop-shadow-md">
              {profile.shortName || profile.name}
            </span>
          </h1>

          {/* Role Subtitle */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-100">
            {profile.title}
          </h2>

          {/* Summary / Hook */}
          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
            {profile.summary}
          </p>

          {/* Action Buttons: Play (Red) & Info (Translucent) */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            {/* Play Button */}
            <button
              id="hero-play-button"
              onClick={onOpenVideo}
              className="group flex items-center justify-center gap-3 bg-[#E50914] hover:bg-[#ff1e27] text-white px-7 py-3.5 rounded-md font-bold text-base shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Play Career Showcase"
            >
              <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
              <span>Watch Career Reel</span>
            </button>

            {/* Info Button */}
            <button
              id="hero-info-button"
              onClick={onOpenMoreInfo}
              className="group flex items-center justify-center gap-2.5 bg-zinc-800/80 hover:bg-zinc-700/90 text-white px-6 py-3.5 rounded-md font-bold text-base backdrop-blur-md border border-white/10 hover:border-white/25 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="View Detailed Profile"
            >
              <Info className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>More Info</span>
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 max-w-2xl">
            {profile.stats && profile.stats.length > 0 ? (
              profile.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="text-2xl font-extrabold text-white">5+</div>
                  <div className="text-xs text-zinc-400">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">20</div>
                  <div className="text-xs text-zinc-400">Branches Transformed</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">MBA</div>
                  <div className="text-xs text-zinc-400">Dhaka University</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">8+</div>
                  <div className="text-xs text-zinc-400">Certifications</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
