"use client";

import React, { useState } from "react";
import { ExperienceItem } from "@/types/portfolio";
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceTabProps {
  experience: ExperienceItem[];
  onChange: (experience: ExperienceItem[]) => void;
}

export default function ExperienceTab({ experience, onChange }: ExperienceTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experience.length) return;
    const newItems = [...experience];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    onChange(newItems);
  };

  const addItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: "Company Name",
      role: "Position / Role",
      subRole: "Department / Specialization",
      period: "01/2026 – Present",
      location: "Dhaka, Bangladesh",
      badge: "FEATURED",
      shortDescription: "Concise summary of key operational achievements and domain impact.",
      fullDescription: ["Full contextual paragraph describing role responsibilities."],
      responsibilities: ["Key responsibility or achievement 1", "Key responsibility or achievement 2"],
      skills: ["Leadership", "Operations", "Strategy"],
      imageUrl: "/images/card_insurance_ops.jpg",
      featured: true,
    };
    onChange([newItem, ...experience]);
    setExpandedId(newItem.id);
  };

  const removeItem = (id: string) => {
    if (confirm("Are you sure you want to delete this experience entry?")) {
      onChange(experience.filter((e) => e.id !== id));
    }
  };

  const updateItem = (id: string, updates: Partial<ExperienceItem>) => {
    onChange(experience.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const handleRespChange = (id: string, respIdx: number, val: string) => {
    const item = experience.find((e) => e.id === id);
    if (!item) return;
    const updatedResp = [...item.responsibilities];
    updatedResp[respIdx] = val;
    updateItem(id, { responsibilities: updatedResp });
  };

  const addResp = (id: string) => {
    const item = experience.find((e) => e.id === id);
    if (!item) return;
    updateItem(id, { responsibilities: [...item.responsibilities, "New bullet point achievement"] });
  };

  const removeResp = (id: string, respIdx: number) => {
    const item = experience.find((e) => e.id === id);
    if (!item) return;
    updateItem(id, { responsibilities: item.responsibilities.filter((_, i) => i !== respIdx) });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Work Experience Management</h3>
          <p className="text-xs text-zinc-400">
            Reorder, add, or customize executive roles and career milestones.
          </p>
        </div>

        <button
          onClick={addItem}
          className="bg-[#E50914] hover:bg-[#ff1e27] text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Role</span>
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#141414] border border-white/10 rounded-xl overflow-hidden transition-colors"
            >
              {/* Header / Summary Bar */}
              <div className="p-4 flex items-center justify-between bg-zinc-900/80">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="bg-[#E50914] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-sm">
                    {item.badge}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">
                      {item.company}
                    </h4>
                    <p className="text-xs text-zinc-400 truncate">
                      {item.role} · {item.period}
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
                    disabled={index === experience.length - 1}
                    onClick={() => moveItem(index, "down")}
                    className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 rounded hover:bg-white/5"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-500 rounded hover:bg-white/5"
                    title="Delete Role"
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

              {/* Collapsible Edit Form */}
              {isExpanded && (
                <div className="p-6 space-y-4 border-t border-white/10 bg-[#121212]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={item.company}
                        onChange={(e) => updateItem(item.id, { company: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Role Title
                      </label>
                      <input
                        type="text"
                        value={item.role}
                        onChange={(e) => updateItem(item.id, { role: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Sub-Role / Focus
                      </label>
                      <input
                        type="text"
                        value={item.subRole || ""}
                        onChange={(e) => updateItem(item.id, { subRole: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Period / Dates
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
                        Pill Badge Label
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
                      Short Description (Card Front)
                    </label>
                    <textarea
                      rows={2}
                      value={item.shortDescription}
                      onChange={(e) => updateItem(item.id, { shortDescription: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white resize-none"
                    />
                  </div>

                  {/* Bullet Points / Responsibilities */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-zinc-400 uppercase">
                        Key Responsibilities & Bullet Points
                      </label>
                      <button
                        onClick={() => addResp(item.id)}
                        className="text-[11px] text-[#E50914] hover:underline font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Bullet
                      </button>
                    </div>

                    <div className="space-y-2">
                      {item.responsibilities.map((resp, rIdx) => (
                        <div key={rIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={resp}
                            onChange={(e) => handleRespChange(item.id, rIdx, e.target.value)}
                            className="flex-1 bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                          />
                          <button
                            onClick={() => removeResp(item.id, rIdx)}
                            className="p-1.5 text-zinc-500 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="pt-2 border-t border-white/10">
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      Skills & Tags (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={item.skills.join(", ")}
                      onChange={(e) =>
                        updateItem(item.id, {
                          skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                    />
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
