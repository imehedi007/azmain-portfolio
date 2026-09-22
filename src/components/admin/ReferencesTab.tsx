"use client";

import React from "react";
import { ReferenceItem } from "@/types/portfolio";
import { Plus, Trash2 } from "lucide-react";

interface ReferencesTabProps {
  references: ReferenceItem[];
  onChange: (references: ReferenceItem[]) => void;
}

export default function ReferencesTab({ references, onChange }: ReferencesTabProps) {
  const updateRef = (index: number, key: keyof ReferenceItem, val: string) => {
    const updated = [...references];
    updated[index] = { ...updated[index], [key]: val };
    onChange(updated);
  };

  const addRef = () => {
    onChange([
      ...references,
      {
        id: `ref-${Date.now()}`,
        name: "Reference Name",
        title: "Executive Title",
        organization: "Company / Institution",
        email: "contact@organization.com",
        relation: "Professional Reference",
      },
    ]);
  };

  const removeRef = (index: number) => {
    if (confirm("Are you sure you want to delete this reference?")) {
      onChange(references.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Institutional References</h3>
          <p className="text-xs text-zinc-400">
            Professional and academic contacts verifying your credentials.
          </p>
        </div>

        <button
          onClick={addRef}
          className="bg-[#E50914] hover:bg-[#ff1e27] text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reference</span>
        </button>
      </div>

      <div className="space-y-4">
        {references.map((ref, idx) => (
          <div
            key={ref.id || idx}
            className="p-5 rounded-xl bg-[#141414] border border-white/10 space-y-4 relative group"
          >
            <button
              onClick={() => removeRef(idx)}
              className="absolute top-4 right-4 p-1.5 text-zinc-500 hover:text-red-500 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                  Referee Name
                </label>
                <input
                  type="text"
                  value={ref.name}
                  onChange={(e) => updateRef(idx, "name", e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={ref.title}
                  onChange={(e) => updateRef(idx, "title", e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  value={ref.organization}
                  onChange={(e) => updateRef(idx, "organization", e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={ref.email}
                  onChange={(e) => updateRef(idx, "email", e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                  Relationship / Endorsement Context
                </label>
                <input
                  type="text"
                  value={ref.relation}
                  onChange={(e) => updateRef(idx, "relation", e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
