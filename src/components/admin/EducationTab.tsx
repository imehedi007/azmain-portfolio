"use client";

import React, { useState } from "react";
import { EducationItem } from "@/types/portfolio";
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from "lucide-react";

interface EducationTabProps {
  education: EducationItem[];
  onChange: (education: EducationItem[]) => void;
}

export default function EducationTab({ education, onChange }: EducationTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= education.length) return;
    const newItems = [...education];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    onChange(newItems);
  };

  const addItem = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: "Institution Name",
      degree: "Degree / Certification Title",
      field: "Discipline / Major",
      period: "2024 – 2026",
      location: "Dhaka, Bangladesh",
      badge: "UNIVERSITY",
      description: "Comprehensive curriculum overview and institutional achievements.",
      highlights: ["Academic distinction or focus 1", "Core module 2"],
      imageUrl: "/images/card_academic_du.jpg",
    };
    onChange([newItem, ...education]);
    setExpandedId(newItem.id);
  };

  const removeItem = (id: string) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      onChange(education.filter((e) => e.id !== id));
    }
  };

  const updateItem = (id: string, updates: Partial<EducationItem>) => {
    onChange(education.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const handleHighlightChange = (id: string, hIdx: number, val: string) => {
    const item = education.find((e) => e.id === id);
    if (!item) return;
    const updatedH = [...item.highlights];
    updatedH[hIdx] = val;
    updateItem(id, { highlights: updatedH });
  };

  const addHighlight = (id: string) => {
    const item = education.find((e) => e.id === id);
    if (!item) return;
    updateItem(id, { highlights: [...item.highlights, "New academic highlight"] });
  };

  const removeHighlight = (id: string, hIdx: number) => {
    const item = education.find((e) => e.id === id);
    if (!item) return;
    updateItem(id, { highlights: item.highlights.filter((_, i) => i !== hIdx) });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Academic Qualifications & Training</h3>
          <p className="text-xs text-zinc-400">
            Manage degrees, colleges, schools, and executive development credentials.
          </p>
        </div>

        <button
          onClick={addItem}
          className="bg-[#E50914] hover:bg-[#ff1e27] text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#141414] border border-white/10 rounded-xl overflow-hidden transition-colors"
            >
              <div className="p-4 flex items-center justify-between bg-zinc-900/80">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="bg-[#E50914] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-sm">
                    {item.badge}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">
                      {item.institution}
                    </h4>
                    <p className="text-xs text-zinc-400 truncate">
                      {item.degree} ({item.field}) · {item.period}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => moveItem(index, "up")}
                    className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 rounded hover:bg-white/5"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={index === education.length - 1}
                    onClick={() => moveItem(index, "down")}
                    className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 rounded hover:bg-white/5"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-500 rounded hover:bg-white/5"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-white/5 ml-1"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="p-6 space-y-4 border-t border-white/10 bg-[#121212]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={item.institution}
                        onChange={(e) => updateItem(item.id, { institution: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Degree / Award
                      </label>
                      <input
                        type="text"
                        value={item.degree}
                        onChange={(e) => updateItem(item.id, { degree: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Field / Major
                      </label>
                      <input
                        type="text"
                        value={item.field}
                        onChange={(e) => updateItem(item.id, { field: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Period
                      </label>
                      <input
                        type="text"
                        value={item.period}
                        onChange={(e) => updateItem(item.id, { period: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => updateItem(item.id, { location: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Badge (e.g. UNIVERSITY, COLLEGE)
                      </label>
                      <input
                        type="text"
                        value={item.badge}
                        onChange={(e) => updateItem(item.id, { badge: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      Card Image URL
                    </label>
                    <input
                      type="text"
                      value={item.imageUrl}
                      onChange={(e) => updateItem(item.id, { imageUrl: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white resize-none"
                    />
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-zinc-400 uppercase">
                        Key Highlights / Core Focus
                      </label>
                      <button
                        onClick={() => addHighlight(item.id)}
                        className="text-[11px] text-[#E50914] hover:underline font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Highlight
                      </button>
                    </div>

                    <div className="space-y-2">
                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={h}
                            onChange={(e) => handleHighlightChange(item.id, hIdx, e.target.value)}
                            className="flex-1 bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                          />
                          <button
                            onClick={() => removeHighlight(item.id, hIdx)}
                            className="p-1.5 text-zinc-500 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
