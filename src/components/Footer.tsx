"use client";

import React from "react";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { Mail, Phone, MapPin, FileText, Settings } from "lucide-react";
import { LinkedInIcon, FacebookIcon } from "@/components/Icons";

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <footer className="bg-[#070707] border-t border-white/10 text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#E50914] flex items-center justify-center font-black text-white text-base">
                A
              </div>
              <span className="font-extrabold text-lg tracking-wider text-white uppercase">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {profile.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/azmain-adil-rifat"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-[#E50914] hover:text-white flex items-center justify-center transition-colors text-zinc-400"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/azmain.adil.rifat"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-[#E50914] hover:text-white flex items-center justify-center transition-colors text-zinc-400"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-[#E50914] hover:text-white flex items-center justify-center transition-colors text-zinc-400"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About &amp; Background
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Work Experience
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors">
                  Academic Qualifications
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-white transition-colors">
                  Awards &amp; Certifications
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Career Highlights
                </a>
              </li>
              <li>
                <a href="#extracurricular" className="hover:text-white transition-colors">
                  Extra Curricular
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Skills &amp; Matrix
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Institutional References
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <a
                  href={`tel:${profile.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>{profile.location}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Actions & CMS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Portfolio Actions
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenContact}
                className="w-full bg-[#E50914] hover:bg-[#ff1e27] text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Let&apos;s Talk</span>
              </button>

              <a
                href="/CV_of_Azmain_Adil.pdf"
                download
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium py-2.5 px-4 rounded-lg border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-red-500" />
                <span>Download CV (PDF)</span>
              </a>

              <Link
                href="/admin"
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-medium py-2.5 px-4 rounded-lg border border-white/5 flex items-center justify-center gap-2 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>CMS Content Manager</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <a
            href="https://www.linkedin.com/in/ali-imranmehedi"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 group transition-all"
            title="Developed by Imran Mehedi"
          >
            <span className="w-6 h-6 rounded-md bg-[#160d0f] border border-red-950/80 group-hover:border-[#E50914]/50 flex items-center justify-center text-[10.5px] font-mono font-bold tracking-tighter select-none transition-all shadow-sm shadow-red-950/30">
              <span className="text-red-400">&lt;</span>
              <span className="text-[#E50914]">/</span>
              <span className="text-red-400">&gt;</span>
            </span>
            <span className="text-[13px] font-medium text-zinc-300 group-hover:text-red-400 transition-colors tracking-tight">
              Imran Mehedi
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
