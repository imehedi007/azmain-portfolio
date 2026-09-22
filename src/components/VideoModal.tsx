"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(15);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      title: "Strategic Operations & Branch Restructuring",
      organization: "Green Delta Insurance PLC",
      period: "2024 – Present",
      description:
        "Keynote presentation and operations supervision across 20 regional branches at the Green Delta Business Conference.",
      image: "/images/azmain-adil.jpeg",
    },
    {
      title: "Annual Business Conference 2024 Award",
      organization: "Green Delta Millionaire Club",
      period: "2024",
      description:
        "Honored on stage with the Business Contribution Award under the Millionaire Club at the Annual Business Conference 2024.",
      image: "/images/annual-business-conference-2024-award.jpeg",
    },
    {
      title: "Business Contribution Award 2023",
      organization: "Green Delta Insurance PLC",
      period: "2023",
      description:
        "Executive boardroom ceremony presented by Managing Director & CEO Farzanah Chowdhury and the Board of Directors.",
      image: "/images/green-delta-business-contribution-2023-award.jpeg",
    },
    {
      title: "Valedictory Ceremony · BIMTECH India",
      organization: "Birla Institute of Management Technology",
      period: "Executive MDP",
      description:
        "Conferred certification for Refresher Course on Non-Life Insurance at BIMTECH campus in Greater Noida, India.",
      image: "/images/bimtech-certificate-valedictory.jpeg",
    },
    {
      title: "Maritime Security & Sanctions Enforcement",
      organization: "CRDF Global International Conference",
      period: "Executive Conference",
      description:
        "Conferred certification at the Bangladesh Maritime Security & Sanctions Enforcement Conference arranged by CRDF Global with international delegates.",
      image: "/images/crdf-global-maritime-security-sanctions-conference.jpeg",
    },
    {
      title: "Effective Communication & Business Ethics",
      organization: "Bangladesh Skill Bank",
      period: "Executive Workshop",
      description:
        "Certified in corporate diplomacy, business ethics, and stakeholder negotiations arranged by Bangladesh Skill Bank.",
      image: "/images/bangladesh-skill-bank-communication-ethics-certificate.jpeg",
    },
    {
      title: "Excellence in Insurance Selling Honors",
      organization: "Green Delta Insurance PLC",
      period: "Executive Milestone",
      description:
        "Awarded Certificate of Training for Excellence in Insurance Selling, demonstrating high-volume institutional client growth.",
      image: "/images/excellence-insurance-selling.jpeg",
    },
    {
      title: "Executive Leadership & Strategic Management",
      organization: "High-Rise Headquarters & Strategy",
      period: "2024 – Present",
      description:
        "Directing high-stakes corporate planning, distribution frameworks, and strategic institutional partnerships.",
      image: "/images/azmain-adil-3.jpeg",
    },
    {
      title: "Youth Empowerment & Educational Leadership",
      organization: "Mind Smiths Academy & PYDSB",
      period: "2013 – Present",
      description:
        "Directing nationwide youth development programs, academic coaching, and social impact initiatives.",
      image: "/images/azmain-adil-2.jpeg",
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveChapter((c) => (c + 1) % chapters.length);
            return 0;
          }
          return prev + 2;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, chapters.length]);

  if (!isOpen) return null;

  const current = chapters[activeChapter];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#141414] border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-10 my-auto text-white">
        {/* Top Video Frame */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-cover object-center brightness-75 transition-all duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>

          {/* On-screen Chapter Overlay */}
          <div className="absolute top-6 left-6 z-20 space-y-1">
            <span className="bg-[#E50914] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-sm">
              EXECUTIVE SHOWCASE REEL
            </span>
            <div className="text-xs text-zinc-300 font-medium">
              Chapter {activeChapter + 1} of {chapters.length}
            </div>
          </div>

          <div className="absolute bottom-16 left-6 right-6 z-20 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-200 max-w-xl font-medium drop-shadow">
              {current.description}
            </p>
          </div>

          {/* Video Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-20 space-y-2">
            {/* Scrubber / Progress Bar */}
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#E50914] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-red-500 transition-colors cursor-pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-red-500 transition-colors cursor-pointer"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                <span className="text-zinc-300 font-mono text-[11px]">
                  0{activeChapter + 1}:00 / 0{chapters.length}:00
                </span>
              </div>

              <div className="text-[11px] font-semibold text-zinc-300">
                {current.organization} ({current.period})
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Selector */}
        <div className="p-5 sm:p-6 bg-[#181818] border-t border-white/10">
          <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
            Milestone Chapters
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveChapter(idx);
                  setProgress(0);
                  setIsPlaying(true);
                }}
                className={`p-3 rounded-lg text-left transition-all border text-xs flex flex-col justify-between cursor-pointer ${
                  activeChapter === idx
                    ? "bg-zinc-800 border-[#E50914] text-white shadow-md shadow-red-950/30"
                    : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                <div className="font-bold text-white line-clamp-1 mb-1">
                  {idx + 1}. {ch.title}
                </div>
                <div className="text-[10px] text-zinc-400">{ch.organization}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
