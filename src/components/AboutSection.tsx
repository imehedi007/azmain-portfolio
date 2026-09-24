"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { Award, GraduationCap, Building2, FileText } from "lucide-react";

interface AboutSectionProps {
  onOpenContact: () => void;
}

export default function AboutSection({ onOpenContact }: AboutSectionProps) {
  const { data } = usePortfolio();
  const { profile } = data;

  const availablePhotos = [
    {
      id: "crimson-tie",
      url: "/images/azmain-crimson-tie-portrait.jpeg",
      label: "Crimson Tie",
    },
    {
      id: "du-convocation",
      url: "/images/du-convocation-azmain-adil.jpeg",
      label: "DU Convocation",
    },
    {
      id: "idlc-signing",
      url: "/images/idlc-finance-agreement-signing-green-delta.jpeg",
      label: "IDLC Signing",
    },
    {
      id: "du-career-talk",
      url: "/images/du-career-talk-keynote-green-delta.jpeg",
      label: "DU Career Talk",
    },
    {
      id: "gdi-distribution",
      url: "/images/branches-distribution-gdi-highlights-2025.jpg",
      label: "GDI Distribution",
    },
    {
      id: "executive-atrium",
      url: "/images/azmain-executive-atrium.jpeg",
      label: "Executive Atrium",
    },
    {
      id: "half-yearly-2023",
      url: "/images/half-yearly-business-conference-2023-speech.jpeg",
      label: "Conference 2023",
    },
    {
      id: "office-olympics",
      url: "/images/green-delta-office-olympics-2023.jpg",
      label: "Office Olympics",
    },
    {
      id: "pitch-coaching",
      url: "/images/art-of-the-pitch-knowledge-sharing.jpeg",
      label: "Pitch Coaching",
    },
    {
      id: "gala-night",
      url: "/images/azmain-plaid-blazer-gala.jpeg",
      label: "Gala Night",
    },
    {
      id: "editorial-full",
      url: "/images/azmain-executive-editorial-full.jpeg",
      label: "Modern Exec",
    },
    {
      id: "annual-conference-2024",
      url: "/images/annual-business-conference-2024-award.jpeg",
      label: "Award 2024",
    },
    {
      id: "award-2023",
      url: "/images/green-delta-business-contribution-2023-award.jpeg",
      label: "Award 2023",
    },
    {
      id: "crdf-maritime",
      url: "/images/crdf-global-maritime-security-sanctions-conference.jpeg",
      label: "Maritime Security",
    },
    {
      id: "skill-bank-ethics",
      url: "/images/bangladesh-skill-bank-communication-ethics-certificate.jpeg",
      label: "Business Ethics",
    },
    {
      id: "bimtech-india",
      url: "/images/bimtech-certificate-valedictory.jpeg",
      label: "BIMTECH India",
    },
    {
      id: "selling-honors",
      url: "/images/excellence-insurance-selling.jpeg",
      label: "Selling Honors",
    },
    {
      id: "keynote-speech",
      url: "/images/azmain-adil.jpeg",
      label: "Keynote 2026",
    },
  ];

  const [activePhotoUrl, setActivePhotoUrl] = useState<string>(
    profile.avatarUrl || "/images/azmain-adil-2.jpeg"
  );

  return (
    <section id="about" className="py-16 bg-[#0a0a0a] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="space-y-1.5 mb-10">
          <span className="text-xs font-bold text-[#E50914] uppercase tracking-widest">
            Executive Profile
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Know More About Me
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl">
            A comprehensive perspective on leadership, risk governance, and institutional distribution.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-10">
          {/* Authentic Portrait Image Column */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-[270px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-red-950/40 group bg-zinc-950">
              <Image
                src={activePhotoUrl}
                alt={profile.name}
                fill
                sizes="270px"
                className="object-cover object-[center_16%] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="bg-[#E50914] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-sm shadow-md">
                  VERIFIED EXECUTIVE PROFILE
                </span>
              </div>
            </div>

            {/* Interactive Photo Switcher Chips */}
            <div className="mt-3.5 flex items-center justify-center gap-1.5 flex-wrap max-w-[360px]">
              {availablePhotos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setActivePhotoUrl(photo.url)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activePhotoUrl === photo.url
                      ? "bg-[#E50914] text-white shadow-md shadow-red-900/50 scale-105"
                      : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5"
                  }`}
                >
                  {photo.label}
                </button>
              ))}
            </div>

            <div className="mt-3 text-center">
              <h3 className="text-xl font-bold text-white">{profile.name}</h3>
              <p className="text-xs text-[#E50914] font-semibold">{profile.title}</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">{profile.location}</p>
            </div>
          </div>

          {/* Detailed Narrative Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Global Perspective & Rigorous Execution
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {profile.summary}
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Over the past half decade at Green Delta Insurance PLC, MetLife, and EXIM Bank, I have concentrated on operational restructuring, portfolio underwriting integrity, distant branch transformations across 20 regional centers, and high-stakes client relationship retention.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-1.5">
                <Building2 className="w-5 h-5 text-[#E50914]" />
                <h4 className="font-bold text-white text-sm">20-Branch Network</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Supervised strategic restructuring & performance targets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-1.5">
                <Award className="w-5 h-5 text-[#E50914]" />
                <h4 className="font-bold text-white text-sm">Treaty & Underwriting</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Specialized in Reinsurance, Marine Cargo & Non-Life risks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-1.5">
                <GraduationCap className="w-5 h-5 text-[#E50914]" />
                <h4 className="font-bold text-white text-sm">DU MBA & BIMTECH</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Advanced executive foundations in risk and management.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="/CV_of_Azmain_Adil.pdf"
                download
                className="bg-[#E50914] hover:bg-[#ff1e27] text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Download Official CV (PDF)</span>
              </a>

              <button
                onClick={onOpenContact}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-sm font-medium px-5 py-2.5 rounded-lg border border-white/10 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Initiate Executive Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
