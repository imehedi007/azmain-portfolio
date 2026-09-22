"use client";

import React from "react";

interface CapabilityItem {
  number: string;
  title: string;
  description: string;
  tags?: string[];
}

const capabilities: CapabilityItem[] = [
  {
    number: "01",
    title: "Underwriting & Risk Analysis",
    description:
      "Marine Cargo, Fire, Engineering, Motor, and Industrial all-risks policy structuring and hazard assessment.",
  },
  {
    number: "02",
    title: "Branch Restructuring & Operations",
    description:
      "Operational leadership across 20 branches, workflow automation, audit governance, and revenue optimization.",
  },
  {
    number: "03",
    title: "Reinsurance & Claims Governance",
    description:
      "Treaty & facultative reinsurance execution, prompt dispute resolution, and regulatory compliance.",
  },
  {
    number: "04",
    title: "Financial & Trade Advisory",
    description:
      "Trade finance, Letters of Credit (LCs), bank guarantees, and institutional risk management.",
  },
  {
    number: "05",
    title: "Corporate Client Development",
    description:
      "High-value institutional account management, cross-selling corporate covers, and relationship building.",
  },
  {
    number: "06",
    title: "Executive Leadership & Coaching",
    description:
      "Managing Partner at Mind Smiths Academy, admission coaching direction, and youth development presidency.",
  },
];

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-16 sm:py-24 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold text-[#E50914] uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Built for high-stakes risk &amp; operational scale.
          </h2>
        </div>

        <p className="text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
          From 20-branch operational turnaround to underwriting governance, I bridge corporate strategy, risk mitigation, and executive execution.
        </p>
      </div>

      {/* 2x3 Grid of Numbered Capability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-8">
        {capabilities.map((cap) => (
          <div
            key={cap.number}
            className="group relative p-6 sm:p-7 rounded-2xl bg-[#121212]/90 border border-white/10 hover:border-red-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20 hover:-translate-y-1 flex flex-col justify-between"
          >
            {/* Top Row: Number */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-3xl sm:text-4xl font-black text-zinc-700 group-hover:text-red-500/80 transition-colors">
                {cap.number}
              </span>
              <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-[#E50914] transition-colors" />
            </div>

            {/* Middle: Title & Description */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-100 transition-colors">
                {cap.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                {cap.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
