"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { CardItem } from "./NetflixCard";
import { X, Calendar, MapPin, CheckCircle2, FileText, Send } from "lucide-react";

interface DetailModalProps {
  item: CardItem | null;
  onClose: () => void;
  onContactClick: () => void;
}

export default function DetailModal({
  item,
  onClose,
  onContactClick,
}: DetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#141414] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-10 my-auto text-white animate-in zoom-in-95 duration-200">
        {/* Modal Top Banner */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-zinc-950">
          <Image
            src={item.imageUrl || "/images/card_insurance_ops.jpg"}
            alt={item.title}
            fill
            className="object-cover object-[center_20%] brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Period on Banner */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {item.badge && (
                <span className="bg-[#E50914] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
                  {item.badge}
                </span>
              )}
              {item.period && (
                <span className="flex items-center gap-1.5 text-xs text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-red-500" />
                  {item.period}
                </span>
              )}
              {item.location && (
                <span className="flex items-center gap-1.5 text-xs text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  {item.location}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {item.title}
            </h2>
            {item.subtitle && (
              <p className="text-sm sm:text-base font-semibold text-[#E50914]">
                {item.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Main Description */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Overview & Context
            </h4>
            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
              {item.description}
            </p>

            {item.fullDescription && item.fullDescription.length > 0 && (
              <div className="space-y-2 pt-2">
                {item.fullDescription.map((p, idx) => (
                  <p key={idx} className="text-zinc-300 text-sm leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Key Responsibilities & Highlights from CV */}
          {item.responsibilities && item.responsibilities.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Key Responsibilities & Highlights (CV)
              </h4>
              <ul className="space-y-2.5">
                {item.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Associated Skills / Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Competencies & Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-zinc-800 text-zinc-200 border border-white/10 px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Modal Action CTA Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="bg-[#E50914] hover:bg-[#ff1e27] text-white text-sm font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Inquire About This</span>
              </button>

              <a
                href="/CV_of_Azmain_Adil.pdf"
                download
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-sm font-medium px-4 py-2.5 rounded-lg border border-white/10 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span>Download CV</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
