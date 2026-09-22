"use client";

import React from "react";
import { SkillCategory, LanguageItem, BrandItem } from "@/types/portfolio";
import { Plus, Trash2 } from "lucide-react";

interface SkillsTabProps {
  skills: SkillCategory[];
  languages: LanguageItem[];
  hobbies: string[];
  brands: BrandItem[];
  onChangeSkills: (skills: SkillCategory[]) => void;
  onChangeLanguages: (languages: LanguageItem[]) => void;
  onChangeHobbies: (hobbies: string[]) => void;
  onChangeBrands: (brands: BrandItem[]) => void;
}

export default function SkillsTab({
  skills,
  languages,
  hobbies,
  brands,
  onChangeSkills,
  onChangeLanguages,
  onChangeHobbies,
  onChangeBrands,
}: SkillsTabProps) {
  // Skill Category management
  const updateCategoryName = (catIdx: number, newName: string) => {
    const updated = [...skills];
    updated[catIdx] = { ...updated[catIdx], category: newName };
    onChangeSkills(updated);
  };

  const updateCategorySkills = (catIdx: number, skillsStr: string) => {
    const updated = [...skills];
    updated[catIdx] = {
      ...updated[catIdx],
      skills: skillsStr.split(",").map((s) => s.trim()).filter(Boolean),
    };
    onChangeSkills(updated);
  };

  const addCategory = () => {
    onChangeSkills([
      ...skills,
      { category: "New Competency Domain", skills: ["Skill 1", "Skill 2"] },
    ]);
  };

  const removeCategory = (catIdx: number) => {
    onChangeSkills(skills.filter((_, i) => i !== catIdx));
  };

  // Language management
  const updateLanguage = (idx: number, key: keyof LanguageItem, val: string) => {
    const updated = [...languages];
    updated[idx] = { ...updated[idx], [key]: val };
    onChangeLanguages(updated);
  };

  const addLanguage = () => {
    onChangeLanguages([
      ...languages,
      { language: "Language", proficiency: "Professional Proficiency" },
    ]);
  };

  const removeLanguage = (idx: number) => {
    onChangeLanguages(languages.filter((_, i) => i !== idx));
  };

  // Hobbies management
  const updateHobbiesStr = (str: string) => {
    onChangeHobbies(str.split(",").map((s) => s.trim()).filter(Boolean));
  };

  // Brand management
  const updateBrand = (bIdx: number, key: keyof BrandItem, val: string) => {
    const updated = [...brands];
    updated[bIdx] = { ...updated[bIdx], [key]: val };
    onChangeBrands(updated);
  };

  const addBrand = () => {
    onChangeBrands([
      ...brands,
      {
        id: `brand-${Date.now()}`,
        name: "Organization Name",
        subtitle: "Role / Affiliation",
        logoText: "LOGO",
        category: "Corporate",
      },
    ]);
  };

  const removeBrand = (bIdx: number) => {
    onChangeBrands(brands.filter((_, i) => i !== bIdx));
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Skill Categories */}
      <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">Skill Matrix Domains</h3>
            <p className="text-xs text-zinc-400">
              Categorized competencies displayed on the portfolio homepage.
            </p>
          </div>
          <button
            onClick={addCategory}
            className="text-xs bg-zinc-800 hover:bg-[#E50914] text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category</span>
          </button>
        </div>

        <div className="space-y-4">
          {skills.map((cat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-zinc-900 border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={cat.category}
                  onChange={(e) => updateCategoryName(idx, e.target.value)}
                  className="flex-1 bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white font-bold"
                />
                <button
                  onClick={() => removeCategory(idx)}
                  className="p-1.5 text-zinc-500 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 uppercase font-semibold mb-1">
                  Skills (Comma Separated)
                </label>
                <textarea
                  rows={2}
                  value={cat.skills.join(", ")}
                  onChange={(e) => updateCategorySkills(idx, e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-zinc-200 resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages & Hobbies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Languages */}
        <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-lg font-bold text-white">Languages</h3>
            <button
              onClick={addLanguage}
              className="text-xs bg-zinc-800 hover:bg-[#E50914] text-white px-2.5 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-3">
            {languages.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) => updateLanguage(idx, "language", e.target.value)}
                  className="w-32 bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  value={lang.proficiency}
                  onChange={(e) => updateLanguage(idx, "proficiency", e.target.value)}
                  className="flex-1 bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                />
                <button
                  onClick={() => removeLanguage(idx)}
                  className="p-1.5 text-zinc-500 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">
            Hobbies & Interests
          </h3>
          <div>
            <label className="block text-[11px] text-zinc-400 uppercase font-semibold mb-2">
              Comma-Separated Hobbies
            </label>
            <textarea
              rows={4}
              value={hobbies.join(", ")}
              onChange={(e) => updateHobbiesStr(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-xs text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Brand Strip Cards */}
      <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">
              Brands I Have Worked With / For
            </h3>
            <p className="text-xs text-zinc-400">
              Corporate logos and badges featured right below the Hero section.
            </p>
          </div>
          <button
            onClick={addBrand}
            className="text-xs bg-zinc-800 hover:bg-[#E50914] text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Brand</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {brands.map((b, idx) => (
            <div
              key={b.id}
              className="p-3 rounded-lg bg-zinc-900 border border-white/5 space-y-2 relative group"
            >
              <button
                onClick={() => removeBrand(idx)}
                className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-red-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase">Logo Display Text</label>
                  <input
                    type="text"
                    value={b.logoText || ""}
                    onChange={(e) => updateBrand(idx, "logoText", e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded px-2 py-1 text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase">Category</label>
                  <input
                    type="text"
                    value={b.category}
                    onChange={(e) => updateBrand(idx, "category", e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 uppercase">Subtitle / Role</label>
                <input
                  type="text"
                  value={b.subtitle}
                  onChange={(e) => updateBrand(idx, "subtitle", e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded px-2 py-1 text-xs text-zinc-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
