"use client";

import React from "react";
import { Profile, CareerStat, SocialLink } from "@/types/portfolio";
import { Plus, Trash2 } from "lucide-react";

interface ProfileTabProps {
  profile: Profile;
  onChange: (profile: Profile) => void;
}

export default function ProfileTab({ profile, onChange }: ProfileTabProps) {
  const updateField = <K extends keyof Profile>(field: K, value: Profile[K]) => {
    onChange({ ...profile, [field]: value });
  };

  const handleStatChange = (index: number, key: keyof CareerStat, value: string) => {
    const newStats = [...profile.stats];
    newStats[index] = { ...newStats[index], [key]: value };
    updateField("stats", newStats);
  };

  const addStat = () => {
    updateField("stats", [
      ...profile.stats,
      { label: "New Metric", value: "10+", description: "Description" },
    ]);
  };

  const removeStat = (index: number) => {
    updateField(
      "stats",
      profile.stats.filter((_, i) => i !== index)
    );
  };

  const handleSocialChange = (index: number, key: keyof SocialLink, value: string) => {
    const newLinks = [...profile.socialLinks];
    newLinks[index] = { ...newLinks[index], [key]: value };
    updateField("socialLinks", newLinks);
  };

  const addSocial = () => {
    updateField("socialLinks", [
      ...profile.socialLinks,
      { platform: "Platform", label: "Username / Link", url: "https://", icon: "Link" },
    ]);
  };

  const removeSocial = (index: number) => {
    updateField(
      "socialLinks",
      profile.socialLinks.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Identity & Hero Texts */}
      <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-5">
        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">
          Hero & Primary Identity
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Short / Display Name
            </label>
            <input
              type="text"
              value={profile.shortName}
              onChange={(e) => updateField("shortName", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Professional Title / Role
            </label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Hero Top Pill Badge
            </label>
            <input
              type="text"
              value={profile.heroBadge}
              onChange={(e) => updateField("heroBadge", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Portfolio Year Subtitle
            </label>
            <input
              type="text"
              value={profile.portfolioYear}
              onChange={(e) => updateField("portfolioYear", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => updateField("tagline", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
            Executive Summary / Elevator Pitch
          </label>
          <textarea
            rows={3}
            value={profile.summary}
            onChange={(e) => updateField("summary", e.target.value)}
            className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914] resize-none"
          />
        </div>
      </div>

      {/* Contact & Demographics */}
      <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-5">
        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">
          Contact Details & Demographics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Location / Address
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => updateField("location", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Date of Birth
            </label>
            <input
              type="text"
              value={profile.dateOfBirth}
              onChange={(e) => updateField("dateOfBirth", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>
        </div>
      </div>

      {/* Asset Paths & Images */}
      <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-5">
        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">
          Media Assets & Document References
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Avatar Image URL
            </label>
            <input
              type="text"
              value={profile.avatarUrl}
              onChange={(e) => updateField("avatarUrl", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Hero Banner Image URL
            </label>
            <input
              type="text"
              value={profile.heroImageUrl}
              onChange={(e) => updateField("heroImageUrl", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              CV / Resume PDF URL
            </label>
            <input
              type="text"
              value={profile.resumeUrl}
              onChange={(e) => updateField("resumeUrl", e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
            />
          </div>
        </div>
      </div>

      {/* Career Metrics */}
      <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-lg font-bold text-white">Career Metric Highlights</h3>
          <button
            onClick={addStat}
            className="text-xs bg-zinc-800 hover:bg-[#E50914] text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Metric</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-zinc-900 border border-white/5 space-y-2 relative group"
            >
              <button
                onClick={() => removeStat(idx)}
                className="absolute top-2 right-2 p-1.5 text-zinc-500 hover:text-red-500 rounded transition-colors"
                title="Remove Metric"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-semibold">Value</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-sm text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-semibold">Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-semibold">Description</label>
                <input
                  type="text"
                  value={stat.description || ""}
                  onChange={(e) => handleStatChange(idx, "description", e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-xs text-zinc-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-lg font-bold text-white">Social & Profile Links</h3>
          <button
            onClick={addSocial}
            className="text-xs bg-zinc-800 hover:bg-[#E50914] text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Link</span>
          </button>
        </div>

        <div className="space-y-3">
          {profile.socialLinks.map((link, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-white/5"
            >
              <input
                type="text"
                placeholder="Platform"
                value={link.platform}
                onChange={(e) => handleSocialChange(idx, "platform", e.target.value)}
                className="w-32 bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Label"
                value={link.label}
                onChange={(e) => handleSocialChange(idx, "label", e.target.value)}
                className="w-44 bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleSocialChange(idx, "url", e.target.value)}
                className="flex-1 bg-zinc-950 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
              />
              <button
                onClick={() => removeSocial(idx)}
                className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
