"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import defaultData from "@/data/portfolio.json";
import {
  PortfolioData,
  Profile,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  ProjectItem,
  SkillCategory,
  BrandItem,
  ReferenceItem,
  KeyAchievement,
} from "@/types/portfolio";

const STORAGE_KEY = "azmain_portfolio_cms_data_v7";
const LEGACY_STORAGE_KEY = "azmain_portfolio_cms_data_v6";

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  isCustomized: boolean;
  updateData: (newData: PortfolioData) => Promise<boolean>;
  updateProfile: (profile: Partial<Profile>) => void;
  updateKeyAchievements: (items: KeyAchievement[]) => void;
  updateExperience: (items: ExperienceItem[]) => void;
  updateEducation: (items: EducationItem[]) => void;
  updateCertifications: (items: CertificationItem[]) => void;
  updateFeaturedProjects: (items: ProjectItem[]) => void;
  updateUpcomingProjects: (items: ProjectItem[]) => void;
  updateSkills: (items: SkillCategory[]) => void;
  updateBrands: (items: BrandItem[]) => void;
  updateReferences: (items: ReferenceItem[]) => void;
  resetToDefault: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  // Always initialize with defaultData so Server HTML and Client Initial Hydration match 100% identically
  const [data, setData] = useState<PortfolioData>(() => defaultData as unknown as PortfolioData);
  const [isLoading] = useState(false);
  const [isCustomized, setIsCustomized] = useState(false);

  // Sync client-side localStorage asynchronously after hydration completes
  useEffect(() => {
    const syncFromStorage = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.profile && parsed.experience) {
            // Auto-heal education logo paths if pointing to old placeholder
            if (Array.isArray(parsed.education)) {
              parsed.education = parsed.education.map((edu: EducationItem) => {
                if (edu.id === "edu-4" && (!edu.imageUrl || edu.imageUrl === "/images/card_academic_du.jpg")) {
                  return { ...edu, imageUrl: "/images/ndc-logo.png" };
                }
                if (edu.id === "edu-5" && (!edu.imageUrl || edu.imageUrl === "/images/card_academic_du.jpg")) {
                  return { ...edu, imageUrl: "/images/isc-logo.png" };
                }
                return edu;
              });
            }

            // Migrate proj-2 and proj-3 from featured to upcomingProjects if previously cached in localStorage
            const movedIds = ["proj-2", "proj-3"];
            if (Array.isArray(parsed.featuredProjects)) {
              parsed.featuredProjects = parsed.featuredProjects.filter(
                (p: ProjectItem) => !movedIds.includes(p.id)
              );
              const defaultFeatured = (defaultData as unknown as PortfolioData).featuredProjects || [];
              for (const df of defaultFeatured) {
                if (!parsed.featuredProjects.some((p: ProjectItem) => p.id === df.id)) {
                  const idx = defaultFeatured.findIndex((p: ProjectItem) => p.id === df.id);
                  parsed.featuredProjects.splice(idx, 0, df);
                }
              }
            }

            if (Array.isArray(parsed.upcomingProjects)) {
              const defaultUpcoming = (defaultData as unknown as PortfolioData).upcomingProjects || [];
              for (const du of defaultUpcoming) {
                if (!parsed.upcomingProjects.some((p: ProjectItem) => p.id === du.id)) {
                  const idx = defaultUpcoming.findIndex((p: ProjectItem) => p.id === du.id);
                  parsed.upcomingProjects.splice(idx, 0, du);
                }
              }
            }

            setData(parsed);
            setIsCustomized(true);
          }
        }
      } catch {
        // Fallback to default
      }
    };

    window.addEventListener("portfolio-sync", syncFromStorage);
    window.addEventListener("storage", syncFromStorage);

    const timer = setTimeout(() => {
      syncFromStorage();
    }, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("portfolio-sync", syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  const saveToStorageAndState = async (newData: PortfolioData): Promise<boolean> => {
    try {
      setData(newData);
      setIsCustomized(true);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData, null, 2));
      }

      // Also call local API if available
      try {
        await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData),
        });
      } catch {
        // Ignored in offline / static context
      }

      return true;
    } catch (err) {
      console.error("Error saving data:", err);
      return false;
    }
  };

  const updateProfile = (profileUpdate: Partial<Profile>) => {
    const updated = {
      ...data,
      profile: { ...data.profile, ...profileUpdate },
    };
    saveToStorageAndState(updated);
  };

  const updateKeyAchievements = (keyAchievements: KeyAchievement[]) => {
    saveToStorageAndState({ ...data, keyAchievements });
  };

  const updateExperience = (experience: ExperienceItem[]) => {
    saveToStorageAndState({ ...data, experience });
  };

  const updateEducation = (education: EducationItem[]) => {
    saveToStorageAndState({ ...data, education });
  };

  const updateCertifications = (certifications: CertificationItem[]) => {
    saveToStorageAndState({ ...data, certifications });
  };

  const updateFeaturedProjects = (featuredProjects: ProjectItem[]) => {
    saveToStorageAndState({ ...data, featuredProjects });
  };

  const updateUpcomingProjects = (upcomingProjects: ProjectItem[]) => {
    saveToStorageAndState({ ...data, upcomingProjects });
  };

  const updateSkills = (skills: SkillCategory[]) => {
    saveToStorageAndState({ ...data, skills });
  };

  const updateBrands = (brands: BrandItem[]) => {
    saveToStorageAndState({ ...data, brands });
  };

  const updateReferences = (references: ReferenceItem[]) => {
    saveToStorageAndState({ ...data, references });
  };

  const resetToDefault = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
      setData(defaultData as unknown as PortfolioData);
      setIsCustomized(false);
    } catch (e) {
      console.error("Failed to reset portfolio data", e);
    }
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString) as PortfolioData;
      if (parsed && parsed.profile && parsed.experience) {
        saveToStorageAndState(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Invalid JSON provided", e);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        isCustomized,
        updateData: saveToStorageAndState,
        updateProfile,
        updateKeyAchievements,
        updateExperience,
        updateEducation,
        updateCertifications,
        updateFeaturedProjects,
        updateUpcomingProjects,
        updateSkills,
        updateBrands,
        updateReferences,
        resetToDefault,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
