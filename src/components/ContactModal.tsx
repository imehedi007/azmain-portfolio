"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  X,
  Mail,
  Phone,
  FileText,
  ExternalLink,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { LinkedInIcon, FacebookIcon } from "@/components/Icons";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { data } = usePortfolio();
  const { profile } = data;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(profile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  // Clean phone number for WhatsApp link (remove '+' and spaces)
  const whatsappNumber = profile.phone.replace(/[^0-9]/g, "");

  const linkedinUrl =
    profile.socialLinks?.find((s) => s.platform.toLowerCase() === "linkedin")?.url ||
    "https://www.linkedin.com/in/azmain-adil-rifat";
  const facebookUrl =
    profile.socialLinks?.find((s) => s.platform.toLowerCase() === "facebook")?.url ||
    "https://www.facebook.com/azmain.adil.rifat";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Blurry Red Ambient Backdrop */}
      <div
        className="fixed inset-0 bg-[#120103]/80 backdrop-blur-2xl transition-all"
        onClick={onClose}
      />
      {/* Atmospheric Red Radial Glow */}
      <div
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(229,9,20,0.38)_0%,_rgba(130,0,12,0.45)_35%,_rgba(10,5,6,0.92)_100%)] pointer-events-none"
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-lg bg-[#0e0e0e]/95 border border-red-500/40 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(229,9,20,0.35)] z-10 my-auto text-white animate-in zoom-in-95 duration-200">
        {/* Decorative Red Accent Line at Top */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#E50914] via-[#ff3842] to-[#990008]" />

        {/* Ambient Corner Blur inside card */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-red-950/30 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-900/90 hover:bg-red-950 hover:text-white text-zinc-400 flex items-center justify-center border border-white/10 hover:border-red-600/50 transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
          aria-label="Close contact modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Profile Avatar and Availability */}
        <div className="p-6 sm:p-8 pb-4 relative z-10">
          <div className="flex items-center gap-4">
            {/* Avatar with Red Ring */}
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-red-600/60 shadow-lg shadow-red-950/50 shrink-0 bg-zinc-900">
              <Image
                src={profile.avatarUrl || "/images/azmain-adil-2.jpeg"}
                alt={profile.name}
                fill
                sizes="72px"
                className="object-cover object-[center_16%]"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-700/50 text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                <span>Direct Contact</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">
                {profile.name}
              </h2>
              <p className="text-xs text-red-400 font-semibold truncate">
                {profile.title}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed">
            Available for executive opportunities, strategic underwriting advisory, branch restructuring leadership, and speaking engagements.
          </p>
        </div>

        {/* Direct Channels List */}
        <div className="px-6 sm:px-8 py-2 space-y-3 relative z-10">
          {/* Email Direct Channel */}
          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-red-600/40 transition-all group">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-red-950/80 border border-red-800/40 text-[#E50914] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                    Email Address
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white truncate">
                    {profile.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/5"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href={`mailto:${profile.email}?subject=Executive%20Consultation%20with%20Azmain%20Adil`}
                  className="px-3 py-1.5 rounded-lg bg-[#E50914] hover:bg-[#ff1e27] text-white text-xs font-bold transition-all shadow-md shadow-red-950/60 cursor-pointer flex items-center gap-1"
                >
                  <span>Send</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Phone & WhatsApp Channel */}
          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-red-600/40 transition-all group">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-red-950/80 border border-red-800/40 text-[#E50914] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                    Phone &amp; WhatsApp
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white truncate">
                    {profile.phone}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/5"
                  title="Copy phone number"
                >
                  {copiedPhone ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/60 cursor-pointer flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
                >
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>


        </div>

        {/* Footer Actions: Download CV + Social Profiles */}
        <div className="p-6 sm:p-8 pt-4 space-y-4 relative z-10">
          {/* Primary CV Download Button */}
          <a
            href="/CV_of_Azmain_Adil.pdf"
            download
            className="w-full bg-[#E50914] hover:bg-[#ff1e27] text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Download Official CV (PDF)</span>
            <Sparkles className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Social Profiles */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">
              Verified Executive Profiles:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold border border-white/10"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold border border-white/10"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-blue-500" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
