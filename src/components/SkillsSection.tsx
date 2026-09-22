"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  ShieldCheck,
  TrendingUp,
  Award,
  Globe,
  Compass,
  BookOpen,
  Bike,
  Plane,
} from "lucide-react";

export default function SkillsSection() {
  const { data } = usePortfolio();
  const { skills, languages, hobbies } = data;

  const getHobbyIcon = (hobby: string) => {
    const lower = hobby.toLowerCase();
    if (lower.includes("travel")) return <Plane className="w-4 h-4 text-red-500" />;
    if (lower.includes("bike")) return <Bike className="w-4 h-4 text-red-500" />;
    if (lower.includes("read")) return <BookOpen className="w-4 h-4 text-red-500" />;
    return <Compass className="w-4 h-4 text-red-500" />;
  };

  return (
    <section id="skills" className="py-16 bg-[#0e0e0e] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-1.5 mb-10">
          <span className="text-xs font-bold text-[#E50914] uppercase tracking-widest">
            Core Competencies & Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Skill Matrix
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl">
            A balanced synthesis of analytical insurance acumen, strategic management, and high-stakes operational execution.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills && skills.length > 0 ? (
            skills.map((category, idx) => (
              <div
                key={idx}
                className="bg-[#141414] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-red-950/80 text-[#E50914] flex items-center justify-center font-bold">
                      {idx === 0 ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : idx === 1 ? (
                        <ShieldCheck className="w-5 h-5" />
                      ) : (
                        <Award className="w-5 h-5" />
                      )}
                    </div>
                    <h3 className="font-bold text-white text-base sm:text-lg">
                      {category.category}
                    </h3>
                  </div>

                  <ul className="space-y-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <li
                        key={sIdx}
                        className="flex items-center gap-2.5 text-sm text-zinc-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-zinc-500 font-medium">
                  Verified in Active Practice
                </div>
              </div>
            ))
          ) : null}
        </div>

        {/* Languages and Hobbies Sub-strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Languages */}
          <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 text-[#E50914] flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-base">Language Fluency</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {languages &&
                languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-zinc-900 border border-white/5"
                  >
                    <div className="font-bold text-white text-sm">
                      {lang.language}
                    </div>
                    <div className="text-xs text-red-500 font-semibold mt-0.5">
                      {lang.proficiency}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Hobbies / Personal Dimensions */}
          <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 text-[#E50914] flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-base">Interests & Hobbies</h4>
            </div>

            <div className="flex flex-wrap gap-3">
              {hobbies &&
                hobbies.map((hobby, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/5 text-sm text-zinc-200 font-medium"
                  >
                    {getHobbyIcon(hobby)}
                    <span>{hobby}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
