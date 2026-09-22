"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Briefcase, GraduationCap, Award, Check } from "lucide-react";

export default function ProfessionalCut() {
  const { data } = usePortfolio();
  const { experience, education, certifications } = data;

  // Selected top experiences
  const topExperiences = (experience || []).slice(0, 3);
  // Selected top educations
  const topEducations = (education || []).slice(0, 2);
  // Selected certifications
  const topCerts = (certifications || []).slice(0, 5);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
      {/* Eyebrow & Headline */}
      <div className="space-y-2 mb-10">
        <span className="text-xs font-bold text-[#E50914] uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
          The Professional Cut
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Experience backed by continuous learning.
        </h2>
      </div>

      {/* Grid: Left Column (Experience) + Right Column (Education & Certifications) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card: Experience Timeline */}
        <div className="lg:col-span-7 bg-[#121212]/90 border border-white/10 rounded-2xl p-6 sm:p-8 relative flex flex-col justify-between hover:border-red-600/30 transition-colors">
          <div>
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-800/40 text-[#E50914] flex items-center justify-center shrink-0 shadow-lg shadow-red-950/40">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Experience</h3>
            </div>

            {/* Timeline List */}
            <div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
              {topExperiences.map((exp) => (
                <div key={exp.id} className="relative pl-7 group">
                  {/* Glowing Timeline Dot */}
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-900 border-2 border-[#E50914] shadow-[0_0_8px_rgba(229,9,20,0.6)] group-hover:scale-125 transition-transform" />

                  {/* Period Badge */}
                  <div className="text-[11px] font-bold font-mono text-[#E50914] uppercase tracking-wider mb-1">
                    {exp.period}
                  </div>

                  {/* Role & Company */}
                  <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {exp.role}
                  </h4>
                  <div className="text-xs text-zinc-400 font-medium mb-2">
                    {exp.company} {exp.location && `· ${exp.location}`}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                    {exp.shortDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-medium">Total Career Experience</span>
            <span className="text-zinc-300 font-semibold font-mono">4+ Years in Insurance &amp; Operations</span>
          </div>
        </div>

        {/* Right Column: Education + Certifications Stack */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Top Card: Education */}
          <div className="bg-[#121212]/90 border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-red-600/30 transition-colors flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-800/40 text-[#E50914] flex items-center justify-center shrink-0 shadow-lg shadow-red-950/40">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Education</h3>
              </div>

              <div className="space-y-4">
                {topEducations.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <h4 className="text-base font-bold text-white">
                      {edu.degree} in {edu.field}
                    </h4>
                    <div className="text-xs font-semibold text-[#E50914]">
                      {edu.institution} {edu.period && `· ${edu.period}`}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Card: Certifications */}
          <div className="bg-[#121212]/90 border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-red-600/30 transition-colors flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-800/40 text-[#E50914] flex items-center justify-center shrink-0 shadow-lg shadow-red-950/40">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Certifications</h3>
              </div>

              <ul className="space-y-2.5">
                {topCerts.map((cert) => (
                  <li key={cert.id} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <Check className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-medium">{cert.title}</strong>
                      <span className="text-zinc-500 text-[11px] block">{cert.issuer} {cert.badge && `· ${cert.badge}`}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
