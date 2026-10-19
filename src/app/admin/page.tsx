"use client";

import React, { useState, useRef, useSyncExternalStore, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { PortfolioData } from "@/types/portfolio";
import ProfileTab from "@/components/admin/ProfileTab";
import ExperienceTab from "@/components/admin/ExperienceTab";
import EducationTab from "@/components/admin/EducationTab";
import CertificationsTab from "@/components/admin/CertificationsTab";
import ProjectsTab from "@/components/admin/ProjectsTab";
import SkillsTab from "@/components/admin/SkillsTab";
import ReferencesTab from "@/components/admin/ReferencesTab";
import JsonTab from "@/components/admin/JsonTab";
import AdminPinLock from "@/components/admin/AdminPinLock";
import ChangePinModal from "@/components/admin/ChangePinModal";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Sparkles,
  Users,
  Code2,
  Star,
  ExternalLink,
  Download,
  Upload,
  RotateCcw,
  Eye,
  CheckCircle,
  Lock,
  KeyRound,
  Check,
  UploadCloud,
  Loader2,
} from "lucide-react";

const emptySubscribe = () => () => {};

function subscribeSession(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("session-auth-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("session-auth-change", callback);
  };
}

function getSessionSnapshot() {
  return sessionStorage.getItem("azmain_admin_session_auth") === "true";
}

function getServerSnapshot() {
  return false;
}

export default function AdminPage() {
  const {
    data,
    updateData,
    resetToDefault,
    isCustomized,
  } = usePortfolio();

  // Local draft data so typing/editing does not trigger file saves or fast refresh on every keystroke
  const [draftData, setDraftData] = useState<PortfolioData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Active working data: uses draftData if modifications were made, otherwise falls back to data
  const currentData = draftData ?? data;

  const [activeTab, setActiveTab] = useState<
    | "profile"
    | "experience"
    | "highlights"
    | "certifications"
    | "education"
    | "extracurricular"
    | "projects"
    | "skills"
    | "references"
    | "json"
  >("profile");

  const [showLivePreview, setShowLivePreview] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isAuthenticated = useSyncExternalStore(subscribeSession, getSessionSnapshot, getServerSnapshot);

  // Check if there are unsaved modifications compared to published context data
  const isDirty = useMemo(() => {
    if (!draftData) return false;
    return JSON.stringify(draftData) !== JSON.stringify(data);
  }, [draftData, data]);

  // Prevent accidental navigation if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLock = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("azmain_admin_session_auth");
      window.dispatchEvent(new Event("session-auth-change"));
    }
    showToast("Profile locked. Enter PIN to re-enter.");
  };

  // Save & Publish Action: commits current working changes to localStorage and writes to portfolio.json via API
  const handleSaveAndPublish = async () => {
    if (!isDirty || isSaving) return;
    setIsSaving(true);
    try {
      const success = await updateData(currentData);
      if (success) {
        setDraftData(null);
        showToast("All changes saved & published successfully!");
      } else {
        showToast("Changes saved locally.");
      }
    } catch (err) {
      console.error("Save & publish error:", err);
      showToast("Error saving changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Discard all working edits and revert back to published state
  const handleDiscardChanges = () => {
    if (confirm("Discard all unsaved edits and restore the published version?")) {
      setDraftData(null);
      showToast("Unsaved changes discarded.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        try {
          const parsed = JSON.parse(content) as PortfolioData;
          if (parsed && parsed.profile && parsed.experience) {
            setDraftData(parsed);
            showToast("JSON imported into draft. Click 'Save & Publish' when ready!");
          } else {
            alert("Invalid schema: portfolio must include 'profile' and 'experience' sections.");
          }
        } catch {
          alert("Failed to parse JSON file. Please ensure it adheres to the portfolio schema.");
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `azmain_portfolio_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Exported portfolio.json successfully.");
  };

  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to restore the default CV data? Any custom edits will be replaced with Azmain Adil's authentic CV information."
      )
    ) {
      resetToDefault();
      setDraftData(null);
      showToast("Reset to authentic CV data.");
    }
  };

  const tabs = [
    { id: "profile", label: "Profile & Hero", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "highlights", label: "Career Highlights", icon: Star },
    { id: "certifications", label: "Awards & Certifications", icon: Award },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "extracurricular", label: "Extra Curricular", icon: Layers },
    { id: "skills", label: "Skills & Matrix", icon: Sparkles },
    { id: "references", label: "References", icon: Users },
    { id: "json", label: "Raw JSON", icon: Code2 },
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 rounded-lg bg-[#E50914] flex items-center justify-center font-black text-white text-2xl animate-pulse shadow-2xl shadow-red-600/50">
          A
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminPinLock
        onUnlock={() => {
          showToast("Profile unlocked. Welcome to CMS Dashboard.");
        }}
        avatarUrl={currentData.profile.avatarUrl}
        profileName={currentData.profile.name}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Hidden File Input for JSON import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json"
        className="hidden"
      />

      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 rounded-sm bg-[#E50914] flex items-center justify-center font-black text-white text-base hover:scale-105 transition-transform"
            title="Return to Main Portfolio"
          >
            A
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-wide text-white">
                CMS Content Dashboard
              </span>
              <span className="text-[10px] bg-red-950 text-[#E50914] font-bold px-2 py-0.5 rounded border border-red-800/40">
                ADMIN
              </span>
              {isDirty ? (
                <span className="text-[10px] bg-amber-950 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-600/40 flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Unsaved Changes
                </span>
              ) : isCustomized ? (
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-800/40">
                  Custom Edits Active
                </span>
              ) : null}
            </div>
            <p className="text-[11px] text-zinc-400">
              Manage portfolio records, reorder items, validate JSON, and preview changes
            </p>
          </div>
        </div>

        {/* Global CMS Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* PRIMARY: Save & Publish Button (disabled while unchanged) */}
          <button
            onClick={handleSaveAndPublish}
            disabled={!isDirty || isSaving}
            className={`text-xs px-3.5 py-1.5 rounded-md font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
              isDirty
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-700/40 hover:scale-105 active:scale-95 ring-2 ring-emerald-400/50"
                : "bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed opacity-60"
            }`}
            title={isDirty ? "Save & Publish all unsaved changes to live site" : "No unsaved changes"}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                <span>Publishing...</span>
              </>
            ) : isDirty ? (
              <>
                <UploadCloud className="w-3.5 h-3.5 text-white" />
                <span>Save &amp; Publish</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>All Changes Saved</span>
              </>
            )}
          </button>

          {/* Discard Changes Button (only when dirty) */}
          {isDirty && (
            <button
              onClick={handleDiscardChanges}
              className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-md font-medium border border-white/10 transition-colors cursor-pointer"
              title="Discard all unsaved edits"
            >
              Discard
            </button>
          )}

          {/* Live Preview Toggle */}
          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`text-xs px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              showLivePreview
                ? "bg-white text-black border-white"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-white/10"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showLivePreview ? "Close Preview" : "Split Preview"}</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
            title="Download portfolio.json to commit to Git repository"
          >
            <Download className="w-3.5 h-3.5 text-red-500" />
            <span>Export JSON</span>
          </button>

          {/* Import JSON */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span>Import JSON</span>
          </button>

          {/* Reset to Default */}
          <button
            onClick={handleReset}
            className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 border border-white/5 transition-colors cursor-pointer"
            title="Reset to authentic CV information"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset CV</span>
          </button>

          {/* Change PIN */}
          <button
            onClick={() => setIsChangePinOpen(true)}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
            title="Change 4-Digit Profile Lock PIN"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>Change PIN</span>
          </button>

          {/* Lock Dashboard */}
          <button
            onClick={handleLock}
            className="text-xs bg-zinc-900 hover:bg-red-950/60 text-zinc-300 hover:text-red-300 px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 border border-white/10 hover:border-red-800/40 transition-colors cursor-pointer"
            title="Lock Dashboard Session"
          >
            <Lock className="w-3.5 h-3.5 text-red-500" />
            <span>Lock</span>
          </button>

          {/* View Live Portfolio */}
          <Link
            href="/"
            className="text-xs bg-[#E50914] hover:bg-[#ff1e27] text-white font-bold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-md shadow-red-600/30 transition-all hover:scale-105 cursor-pointer ml-1"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 right-6 z-50 bg-[#1e1e1e] border border-green-500/40 text-green-300 text-xs px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Admin Workspace (with optional Split Screen) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: CMS Tabs & Form Controls */}
        <div
          className={`flex-1 flex flex-col overflow-y-auto transition-all duration-300 ${
            showLivePreview ? "w-1/2 border-r border-white/10" : "w-full"
          }`}
        >
          {/* Horizontal Tab Navigation Strip */}
          <div className="bg-[#101010] border-b border-white/10 px-4 sm:px-8 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#E50914] text-white shadow-md shadow-red-950/40"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel - edits mutate draftData without reloading */}
          <div className="p-4 sm:p-8 flex-1">
            {activeTab === "profile" && (
              <ProfileTab
                profile={currentData.profile}
                onChange={(p) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    profile: { ...(prev ?? data).profile, ...p },
                  }));
                }}
              />
            )}

            {activeTab === "experience" && (
              <ExperienceTab
                experience={currentData.experience}
                onChange={(exp) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    experience: exp,
                  }));
                }}
              />
            )}

            {(activeTab === "highlights" || activeTab === "projects") && (
              <ProjectsTab
                mode={activeTab === "projects" ? "all" : "highlights"}
                featuredProjects={currentData.featuredProjects}
                upcomingProjects={currentData.upcomingProjects}
                onChangeFeatured={(proj) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    featuredProjects: proj,
                  }));
                }}
                onChangeUpcoming={(proj) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    upcomingProjects: proj,
                  }));
                }}
              />
            )}

            {activeTab === "certifications" && (
              <CertificationsTab
                certifications={currentData.certifications}
                onChange={(certs) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    certifications: certs,
                  }));
                }}
              />
            )}

            {activeTab === "education" && (
              <EducationTab
                education={currentData.education}
                onChange={(edu) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    education: edu,
                  }));
                }}
              />
            )}

            {activeTab === "extracurricular" && (
              <ProjectsTab
                mode="extracurricular"
                featuredProjects={currentData.featuredProjects}
                upcomingProjects={currentData.upcomingProjects}
                onChangeFeatured={(proj) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    featuredProjects: proj,
                  }));
                }}
                onChangeUpcoming={(proj) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    upcomingProjects: proj,
                  }));
                }}
              />
            )}

            {activeTab === "skills" && (
              <SkillsTab
                skills={currentData.skills}
                languages={currentData.languages}
                hobbies={currentData.hobbies}
                brands={currentData.brands}
                onChangeSkills={(s) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    skills: s,
                  }));
                }}
                onChangeLanguages={(l) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    languages: l,
                  }));
                }}
                onChangeHobbies={(h) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    hobbies: h,
                  }));
                }}
                onChangeBrands={(b) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    brands: b,
                  }));
                }}
              />
            )}

            {activeTab === "references" && (
              <ReferencesTab
                references={currentData.references}
                onChange={(r) => {
                  setDraftData((prev) => ({
                    ...(prev ?? data),
                    references: r,
                  }));
                }}
              />
            )}

            {activeTab === "json" && (
              <JsonTab
                data={currentData}
                onApply={(newData) => {
                  setDraftData(newData);
                  showToast("JSON draft updated. Click 'Save & Publish' when ready!");
                }}
                onExport={handleExportJSON}
              />
            )}
          </div>
        </div>

        {/* Right Side: Split Screen Live Preview */}
        {showLivePreview && (
          <div className="w-1/2 flex flex-col bg-[#050505] border-l border-white/10 overflow-hidden">
            <div className="p-3 bg-zinc-900 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live In-App Preview
              </span>
              <button
                onClick={() => setShowLivePreview(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>
            <iframe
              src="/"
              title="Portfolio Live Preview"
              className="w-full flex-1 border-0"
            />
          </div>
        )}
      </div>

      {/* Floating Bottom Bar: Quick Save & Publish Notification when dirty */}
      {isDirty && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161616]/95 border border-amber-500/60 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-amber-200">Unsaved Changes Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDiscardChanges}
              className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Discard
            </button>
            <button
              onClick={handleSaveAndPublish}
              disabled={isSaving}
              className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <UploadCloud className="w-3.5 h-3.5" />
              )}
              <span>{isSaving ? "Publishing..." : "Save & Publish"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Change PIN Modal Dialog */}
      <ChangePinModal
        isOpen={isChangePinOpen}
        onClose={() => setIsChangePinOpen(false)}
        onSuccess={(msg) => showToast(msg)}
      />
    </div>
  );
}
