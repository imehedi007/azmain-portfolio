"use client";

import React, { useState } from "react";
import { ProjectItem } from "@/types/portfolio";
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from "lucide-react";

interface ProjectsTabProps {
  featuredProjects: ProjectItem[];
  upcomingProjects: ProjectItem[];
  onChangeFeatured: (projects: ProjectItem[]) => void;
  onChangeUpcoming: (projects: ProjectItem[]) => void;
  mode?: "highlights" | "extracurricular" | "all";
}

export default function ProjectsTab({
  featuredProjects,
  upcomingProjects,
  onChangeFeatured,
  onChangeUpcoming,
  mode = "all",
}: ProjectsTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<"featured" | "upcoming">("featured");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isHighlightsOnly = mode === "highlights";
  const isExtraCurricularOnly = mode === "extracurricular";

  const effectiveSubTab = isHighlightsOnly
    ? "featured"
    : isExtraCurricularOnly
    ? "upcoming"
    : activeSubTab;

  const currentList = effectiveSubTab === "featured" ? featuredProjects : upcomingProjects;
  const currentSetter = effectiveSubTab === "featured" ? onChangeFeatured : onChangeUpcoming;

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;
    const newItems = [...currentList];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    currentSetter(newItems);
  };

  const addItem = () => {
    const isUpcoming = effectiveSubTab === "upcoming";
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: isUpcoming ? "New Extra Curricular Venture" : "New Career Highlight",
      subtitle: isUpcoming ? "Leadership / Operations" : "Corporate Honor / Key Milestone",
      category: isUpcoming ? "Academic Enterprise" : "Corporate Honors",
      badge: isUpcoming ? "LEADERSHIP" : "AWARD 2026",
      period: "2026 – Present",
      tags: isUpcoming ? ["Leadership", "Community"] : ["Milestone", "Recognition"],
      shortDescription: isUpcoming
        ? "Summary of organizational leadership, mission, and achievements."
        : "Summary of milestone, institutional significance, and professional impact.",
      fullDescription: ["Detailed contextual breakdown of operations."],
      responsibilities: ["Key operational responsibility 1", "Key achievement 2"],
      imageUrl: isUpcoming ? "/images/mind-smith-academy.jpg" : "/images/card_insurance_ops.jpg",
      isUpcoming,
    };
    currentSetter([newItem, ...currentList]);
    setExpandedId(newItem.id);
  };

  const removeItem = (id: string) => {
    if (confirm("Are you sure you want to delete this project entry?")) {
      currentSetter(currentList.filter((p) => p.id !== id));
    }
  };

  const updateItem = (id: string, updates: Partial<ProjectItem>) => {
    currentSetter(currentList.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const handleRespChange = (id: string, rIdx: number, val: string) => {
    const item = currentList.find((p) => p.id === id);
    if (!item || !item.responsibilities) return;
    const updated = [...item.responsibilities];
    updated[rIdx] = val;
    updateItem(id, { responsibilities: updated });
  };

  const addResp = (id: string) => {
    const item = currentList.find((p) => p.id === id);
    if (!item) return;
    updateItem(id, {
      responsibilities: [...(item.responsibilities || []), "New operational milestone"],
    });
  };

  const removeResp = (id: string, rIdx: number) => {
    const item = currentList.find((p) => p.id === id);
    if (!item || !item.responsibilities) return;
    updateItem(id, {
      responsibilities: item.responsibilities.filter((_, i) => i !== rIdx),
    });
  };

  const headerTitle = isHighlightsOnly
    ? "Career Highlights"
    : isExtraCurricularOnly
    ? "Extra Curricular"
    : "Career Highlights & Extra Curricular";

  const headerDescription = isHighlightsOnly
    ? "Manage high-impact corporate honors, keynote speeches, institutional awards, and enterprise milestones."
    : isExtraCurricularOnly
    ? "Manage leadership ventures, social initiatives, youth society presidencies, and community programs."
    : "Manage both Career Highlights and Extra Curricular programs.";

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">
            {headerTitle}
          </h3>
          <p className="text-xs text-zinc-400">
            {headerDescription}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isHighlightsOnly && !isExtraCurricularOnly && (
            <div className="bg-zinc-900 border border-white/10 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveSubTab("featured")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeSubTab === "featured"
                    ? "bg-[#E50914] text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Career Highlights ({featuredProjects.length})
              </button>
              <button
                onClick={() => setActiveSubTab("upcoming")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeSubTab === "upcoming"
                    ? "bg-[#E50914] text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Extra Curricular ({upcomingProjects.length})
              </button>
            </div>
          )}

          <button
            onClick={addItem}
            className="bg-[#E50914] hover:bg-[#ff1e27] text-white text-xs font-bold px-3.5 py-2 rounded-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>
              {isHighlightsOnly
                ? "Add Highlight"
                : isExtraCurricularOnly
                ? "Add Extra Curricular"
                : "Add Item"}
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {currentList.map((item, index) => {
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
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 truncate">
                      {item.subtitle} · {item.period}
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
                    disabled={index === currentList.length - 1}
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
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Title / Name
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(item.id, { title: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Badge Label
                      </label>
                      <input
                        type="text"
                        value={item.badge}
                        onChange={(e) => updateItem(item.id, { badge: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Subtitle / Role
                      </label>
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) => updateItem(item.id, { subtitle: e.target.value })}
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
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={item.imageUrl}
                        onChange={(e) => updateItem(item.id, { imageUrl: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      Short Summary (Card Front)
                    </label>
                    <textarea
                      rows={2}
                      value={item.shortDescription}
                      onChange={(e) => updateItem(item.id, { shortDescription: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white resize-none"
                    />
                  </div>

                  {/* Responsibilities / Highlights */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-zinc-400 uppercase">
                        Key Responsibilities & Deliverables
                      </label>
                      <button
                        onClick={() => addResp(item.id)}
                        className="text-[11px] text-[#E50914] hover:underline font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Item
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(item.responsibilities || []).map((resp, rIdx) => (
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

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      Tags (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={item.tags.join(", ")}
                      onChange={(e) =>
                        updateItem(item.id, {
                          tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
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
