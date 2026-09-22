"use client";

import React, { createContext, useContext, useState } from "react";
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
} from "@/types/portfolio";

const STORAGE_KEY = "azmain_portfolio_cms_data_v4";

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  isCustomized: boolean;
  updateData: (newData: PortfolioData) => Promise<boolean>;
  updateProfile: (profile: Partial<Profile>) => void;
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
  const [data, setData] = useState<PortfolioData>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.profile && parsed.experience) {
            return parsed;
          }
        }
      } catch {
        // Fallback to default
      }
    }
    return defaultData as unknown as PortfolioData;
  });

  const [isLoading] = useState(false);
  const [isCustomized, setIsCustomized] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return !!localStorage.getItem(STORAGE_KEY);
      } catch {
        return false;
      }
    }
    return false;
  });

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
