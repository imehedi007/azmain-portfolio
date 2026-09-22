"use client";

import React, { useState } from "react";
import { CertificationItem } from "@/types/portfolio";
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from "lucide-react";

interface CertificationsTabProps {
  certifications: CertificationItem[];
  onChange: (certifications: CertificationItem[]) => void;
}

export default function CertificationsTab({
  certifications,
  onChange,
}: CertificationsTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    certifications[0]?.id || null
  );

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= certifications.length) return;
    const newItems = [...certifications];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    onChange(newItems);
  };

  const addItem = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: "Certification Title",
      issuer: "Issuing Organization / Academy",
      badge: "ACCREDITED",
      tags: ["Certification", "Professional"],
      description: "Comprehensive scope of certification, criteria, and competencies.",
      imageUrl: "/images/card_insurance_ops.jpg",
    };
    onChange([newItem, ...certifications]);
    setExpandedId(newItem.id);
  };

  const removeItem = (id: string) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      onChange(certifications.filter((c) => c.id !== id));
    }
  };

  const updateItem = (id: string, updates: Partial<CertificationItem>) => {
    onChange(certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">
            Awards & Certifications Management
          </h3>
          <p className="text-xs text-zinc-400">
            Manage professional accreditations, statutory licenses, and certified skills.
          </p>
        </div>

        <button
          onClick={addItem}
          className="bg-[#E50914] hover:bg-[#ff1e27] text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="space-y-4">
        {certifications.map((item, index) => {
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
                      {item.issuer}
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
                    disabled={index === certifications.length - 1}
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
                        Certification Title
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
                        Pill Badge Label
                      </label>
                      <input
                        type="text"
                        value={item.badge}
                        onChange={(e) => updateItem(item.id, { badge: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Issuing Organization
                      </label>
                      <input
                        type="text"
                        value={item.issuer}
                        onChange={(e) => updateItem(item.id, { issuer: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                      />
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
