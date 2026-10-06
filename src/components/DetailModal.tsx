"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { CardItem } from "./NetflixCard";
import {
  X,
  Calendar,
  MapPin,
  CheckCircle2,
  FileText,
  Send,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container: Mobile single-scroll sheet, Desktop 2-column side-by-side layout */}
      <div className="relative w-full max-w-5xl lg:max-w-6xl bg-[#141414] border border-white/15 rounded-2xl shadow-2xl z-10 my-auto text-white animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh] sm:max-h-[92vh] overflow-y-auto md:overflow-hidden">
        {/* Close Button: Fixed on mobile for instant thumb reach, Absolute on desktop */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 md:absolute md:top-4 md:right-4 z-50 w-9 h-9 rounded-full bg-black/85 hover:bg-[#E50914] text-zinc-300 hover:text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl backdrop-blur-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Authentic Full Image Showcase */}
        <div className="relative w-full md:w-1/2 lg:w-5/12 bg-zinc-950 flex flex-col items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/10 shrink-0 h-56 sm:h-64 md:h-auto md:min-h-[520px]">
          {/* Ambient blurred glow matching photo colors */}
          <Image
            src={item.imageUrl || "/images/card_insurance_ops.jpg"}
            alt=""
            fill
            className="object-cover blur-3xl opacity-35 pointer-events-none scale-125"
            aria-hidden="true"
          />

          {/* Foreground Uncropped Image Container */}
          <div className="relative w-full h-full p-3 sm:p-4 md:p-6 flex items-center justify-center z-10">
            <div className="relative w-full h-full max-h-[200px] sm:max-h-[230px] md:max-h-[85vh]">
              <Image
                src={item.imageUrl || "/images/card_insurance_ops.jpg"}
                alt={item.title}
                fill
                className="object-contain drop-shadow-2xl rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Bottom Left Image Overlay: Open Full Image / View Certificate link */}
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-20 flex items-center gap-2">
            <a
              href={item.pdfUrl || item.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 rounded-full bg-black/80 hover:bg-black text-[10px] sm:text-[11px] font-medium text-zinc-300 hover:text-white backdrop-blur-md border border-white/20 transition-all shadow-md cursor-pointer group"
            >
              <span>{item.pdfUrl ? "View Official PDF" : "View Full Media"}</span>
              <ExternalLink className="w-3 h-3 text-[#E50914] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Top Left Image Overlay: Category/Badge */}
          {item.badge && (
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20">
              <span className="inline-flex items-center gap-1.5 bg-black/85 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 sm:px-3 rounded-full shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] shadow-sm shadow-red-500 shrink-0 animate-pulse" />
                {item.badge}
              </span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Executive Content & Details */}
        <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col md:justify-between md:overflow-hidden">
          {/* Content Body: Naturally expands and scrolls on mobile, independently scrollable on desktop */}
          <div className="p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 md:overflow-y-auto md:flex-1 md:max-h-[calc(92vh-78px)] pr-5 sm:pr-8 md:pr-10">
            {/* Header: Badges & Metadata */}
            <div className="space-y-2.5 sm:space-y-3 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                {item.period && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-900/90 px-2.5 py-1 sm:px-3 rounded-md border border-white/10 font-medium shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-[#E50914]" />
                    {item.period}
                  </span>
                )}
                {item.location && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-900/90 px-2.5 py-1 sm:px-3 rounded-md border border-white/10 font-medium shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
                    {item.location}
                  </span>
                )}
                {item.credentialId && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-900/90 px-2.5 py-1 sm:px-3 rounded-md border border-white/10 font-mono shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E50914]" />
                    ID: {item.credentialId}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {item.title}
              </h2>

              {item.subtitle && (
                <p className="text-xs sm:text-sm md:text-base font-semibold text-[#E50914]">
                  {item.subtitle}
                </p>
              )}
            </div>

            {/* Overview & Context */}
            <div className="space-y-2.5 sm:space-y-3 border-t border-white/10 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Overview & Context
              </h4>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>

              {item.fullDescription && item.fullDescription.length > 0 && (
                <div className="space-y-2 pt-1">
                  {item.fullDescription.map((p, idx) => (
                    <p key={idx} className="text-zinc-300 text-sm leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Key Responsibilities & Highlights (CV) */}
            {item.responsibilities && item.responsibilities.length > 0 && (
              <div className="space-y-2.5 sm:space-y-3 pt-2 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Key Responsibilities & Highlights (CV)
                </h4>
                <ul className="space-y-2">
                  {item.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                      <span className="leading-snug">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Associated Competencies & Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="space-y-2.5 sm:space-y-3 pt-2 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Competencies & Tags
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] sm:text-xs bg-zinc-900 text-zinc-200 border border-white/10 px-2.5 py-1 sm:px-3 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky CTA Footer */}
          <div className="p-4 sm:px-6 md:px-8 md:py-4 border-t border-white/10 bg-[#171717] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="bg-[#E50914] hover:bg-[#ff1e27] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Inquire About This</span>
              </button>

              {item.pdfUrl && (
                <a
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2.5 rounded-lg border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>View Certificate (PDF)</span>
                </a>
              )}

              <a
                href="/CV_of_Azmain_Adil.pdf"
                download
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2.5 rounded-lg border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto"
              >
                <FileText className="w-3.5 h-3.5 text-red-500" />
                <span>Download CV</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer text-center sm:text-right py-1 sm:py-0"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
