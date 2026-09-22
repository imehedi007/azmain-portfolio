"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Send, Check, Copy, FileText } from "lucide-react";
import { LinkedInIcon, FacebookIcon } from "@/components/Icons";

interface ConversationCtaProps {
  onOpenContact: () => void;
}

export default function ConversationCta({ onOpenContact }: ConversationCtaProps) {
  const { data } = usePortfolio();
  const { profile } = data;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const linkedinUrl =
    profile.socialLinks?.find((s) => s.platform.toLowerCase() === "linkedin")?.url ||
    "https://www.linkedin.com/in/azmain-adil-rifat";
  const facebookUrl =
    profile.socialLinks?.find((s) => s.platform.toLowerCase() === "facebook")?.url ||
    "https://www.facebook.com/azmain.adil.rifat";

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#180a0c] via-[#120507] to-[#0c0c0c] border border-red-900/40 p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl shadow-red-950/30">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#E50914]/15 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-red-800/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Left Column: Heading & Pitch */}
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold text-[#E50914] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
              Start a Conversation
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Have a bold vision? Let&apos;s make it feel inevitable.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
              I&apos;m available for underwriting advisory, branch restructuring leadership, reinsurance operations, and select corporate partnerships.
            </p>

            {/* Red Action Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenContact}
                className="w-12 h-12 rounded-xl bg-[#E50914] hover:bg-[#ff1e27] text-white flex items-center justify-center shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Start a conversation"
                aria-label="Open contact modal"
              >
                <Send className="w-5 h-5 -translate-x-0.5 translate-y-0.5" />
              </button>

              <button
                onClick={onOpenContact}
                className="text-sm font-bold text-white hover:text-red-400 transition-colors cursor-pointer"
              >
                Get in touch directly →
              </button>
            </div>
          </div>

          {/* Right Column: Contact Details & Socials */}
          <div className="lg:text-right space-y-6 shrink-0 w-full lg:w-auto">
            {/* Email */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block">
                Email
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="text-lg sm:text-xl font-bold text-white hover:text-red-400 transition-colors inline-flex items-center gap-2 group"
              >
                <span>{profile.email}</span>
              </a>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block">
                Based In
              </span>
              <p className="text-sm font-medium text-zinc-300">
                Dhaka · Working nationwide &amp; worldwide
              </p>
            </div>

            {/* Circular Social Buttons */}
            <div className="flex items-center lg:justify-end gap-2.5 pt-2">
              {/* Copy Email */}
              <button
                onClick={handleCopyEmail}
                className="w-10 h-10 rounded-full bg-zinc-900/90 border border-white/10 hover:border-red-600/50 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                title={copied ? "Email copied!" : "Copy email"}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900/90 border border-white/10 hover:border-red-600/50 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4 text-blue-400" />
              </a>

              {/* Facebook */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900/90 border border-white/10 hover:border-red-600/50 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                title="Facebook Profile"
              >
                <FacebookIcon className="w-4 h-4 text-blue-500" />
              </a>

              {/* Download CV */}
              <a
                href="/CV_of_Azmain_Adil.pdf"
                download
                className="w-10 h-10 rounded-full bg-zinc-900/90 border border-white/10 hover:border-red-600/50 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                title="Download CV (PDF)"
              >
                <FileText className="w-4 h-4 text-[#E50914]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
