"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Mail, Quote } from "lucide-react";

export default function ReferencesSection() {
  const { data } = usePortfolio();
  const { references } = data;

  if (!references || references.length === 0) return null;

  return (
    <section id="testimonials" className="py-16 bg-[#0a0a0a] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-1.5 mb-10">
          <span className="text-xs font-bold text-[#E50914] uppercase tracking-widest">
            Endorsements & Verification
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Institutional References
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl">
            Verified corporate leadership and academic faculty endorsements from Green Delta Insurance PLC and University of Dhaka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {references.map((ref, idx) => (
            <div
              key={ref.id || idx}
              className="bg-[#141414] hover:bg-[#181818] border border-white/10 hover:border-white/20 rounded-xl p-6 sm:p-8 transition-all duration-300 relative group"
            >
              <Quote className="w-10 h-10 text-red-600/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 border border-red-600/30 flex items-center justify-center text-white font-extrabold text-lg">
                    {ref.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-red-400 transition-colors">
                      {ref.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E50914] font-semibold">
                      {ref.organization}
                    </p>
                  </div>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed italic">
                  &ldquo;Azmain demonstrated exemplary analytical rigor, strategic leadership across branch networks, and exceptional command of underwriting protocols.&rdquo;
                </p>

                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-zinc-400 font-medium">
                    {ref.relation}
                  </span>
                  <a
                    href={`mailto:${ref.email}`}
                    className="flex items-center gap-1.5 text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-md border border-white/5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-red-500" />
                    <span>{ref.email}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
