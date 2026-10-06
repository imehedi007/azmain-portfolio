"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStrip from "@/components/BrandStrip";
import AboutSection from "@/components/AboutSection";
import RowCarousel from "@/components/RowCarousel";
import SkillsSection from "@/components/SkillsSection";
import ReferencesSection from "@/components/ReferencesSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import DetailModal from "@/components/DetailModal";
import ContactModal from "@/components/ContactModal";
import VideoModal from "@/components/VideoModal";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProfessionalCut from "@/components/ProfessionalCut";
import ConversationCta from "@/components/ConversationCta";
import { CardItem } from "@/components/NetflixCard";
import { usePortfolio } from "@/context/PortfolioContext";

export default function HomePage() {
  const { data, isLoading } = usePortfolio();

  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Map Experience items to CardItems
  const experienceCardItems = useMemo<CardItem[]>(() => {
    return (data.experience || []).map((exp) => ({
      id: exp.id,
      badge: exp.badge || "FEATURED",
      title: exp.company,
      subtitle: exp.role + (exp.subRole ? ` | ${exp.subRole}` : ""),
      description: exp.shortDescription,
      bottomText: exp.role + (exp.subRole ? ` | ${exp.subRole}` : ""),
      imageUrl: exp.imageUrl,
      tags: exp.skills,
      responsibilities: exp.responsibilities,
      fullDescription: exp.fullDescription,
      period: exp.period,
      location: exp.location,
    }));
  }, [data.experience]);

  // Map Education items to CardItems
  const educationCardItems = useMemo<CardItem[]>(() => {
    return (data.education || []).map((edu) => ({
      id: edu.id,
      badge: edu.badge || "UNIVERSITY",
      title: edu.institution,
      subtitle: `${edu.degree} (${edu.field})`,
      description: edu.description,
      bottomText: `${edu.degree} - ${edu.field}`,
      imageUrl: edu.imageUrl,
      tags: edu.highlights,
      responsibilities: edu.highlights,
      fullDescription: [edu.description],
      period: edu.period,
      location: edu.location,
    }));
  }, [data.education]);

  // Map Certifications to CardItems
  const certificationCardItems = useMemo<CardItem[]>(() => {
    return (data.certifications || []).map((cert) => ({
      id: cert.id,
      badge: cert.badge || "ACCREDITED",
      title: cert.title,
      subtitle: cert.issuer,
      description: cert.description,
      bottomText: (cert.tags || []).slice(0, 3).join(" · "),
      imageUrl: cert.imageUrl,
      tags: cert.tags,
      pdfUrl: cert.pdfUrl,
      credentialId: cert.credentialId,
      responsibilities: [
        `Issued by: ${cert.issuer}`,
        ...(cert.credentialId ? [`Credential ID: ${cert.credentialId}`] : []),
        ...(cert.issueDate ? [`Issue Date: ${cert.issueDate}`] : []),
        cert.description,
        "Comprehensive industry evaluation and verified institutional credential",
      ],
      fullDescription: [cert.description],
      period: cert.issueDate || "Verified Credential",
      location: cert.issuer,
    }));
  }, [data.certifications]);

  // Map Featured Projects to CardItems
  const featuredProjectCardItems = useMemo<CardItem[]>(() => {
    return (data.featuredProjects || []).map((proj) => ({
      id: proj.id,
      badge: proj.badge || "STRATEGY",
      title: proj.title,
      subtitle: proj.subtitle,
      description: proj.shortDescription,
      bottomText: (proj.tags || []).slice(0, 3).join(" · "),
      imageUrl: proj.imageUrl,
      tags: proj.tags,
      responsibilities: proj.responsibilities,
      fullDescription: proj.fullDescription,
      period: proj.period,
      location: proj.subtitle,
    }));
  }, [data.featuredProjects]);

  // Map Upcoming Projects to CardItems
  const upcomingProjectCardItems = useMemo<CardItem[]>(() => {
    return (data.upcomingProjects || []).map((proj) => ({
      id: proj.id,
      badge: proj.badge || "COMMUNITY",
      title: proj.title,
      subtitle: proj.subtitle,
      description: proj.shortDescription,
      bottomText: (proj.tags || []).slice(0, 3).join(" · "),
      imageUrl: proj.imageUrl,
      tags: proj.tags,
      responsibilities: proj.responsibilities,
      fullDescription: proj.fullDescription,
      period: proj.period,
      location: proj.subtitle,
    }));
  }, [data.upcomingProjects]);

  // Hero More Info handler
  const handleHeroMoreInfo = () => {
    if (experienceCardItems.length > 0) {
      setSelectedCard(experienceCardItems[0]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-[#E50914] flex items-center justify-center font-black text-xl animate-pulse">
            A
          </div>
          <div className="text-xs tracking-widest text-zinc-400 uppercase font-semibold">
            Loading Portfolio...
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#E50914] selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Featured Presentation */}
      <Hero
        onOpenVideo={() => setIsVideoOpen(true)}
        onOpenMoreInfo={handleHeroMoreInfo}
      />

      {/* Brand strip */}
      <BrandStrip />

      {/* About & Bio Showcase */}
      <AboutSection onOpenContact={() => setIsContactOpen(true)} />

      {/* Capabilities / Core Competencies Matrix (Reference 3) */}
      <CapabilitiesSection />

      {/* Row 1: Work Experience */}
      <RowCarousel
        id="experience"
        title="Work Experience"
        subtitle="High-impact work selected from across disciplines"
        items={experienceCardItems}
        onCardClick={(item) => setSelectedCard(item)}
      />

      {/* Row 2: Education */}
      <RowCarousel
        id="education"
        title="Education"
        subtitle="Scalable platforms and polished web experiences"
        items={educationCardItems}
        onCardClick={(item) => setSelectedCard(item)}
      />

      {/* Row 3: Awards & Certifications */}
      <RowCarousel
        id="certifications"
        title="Awards & Certifications"
        subtitle="Human-centered systems with a distinctive visual point of view"
        items={certificationCardItems}
        onCardClick={(item) => setSelectedCard(item)}
      />

      {/* Row 4: Feature Projects */}
      <RowCarousel
        id="work"
        title="Feature Projects"
        subtitle="Useful products designed for life in motion"
        items={featuredProjectCardItems}
        onCardClick={(item) => setSelectedCard(item)}
      />

      {/* Row 5: Upcoming Projects */}
      <RowCarousel
        id="upcoming"
        title="Upcoming Projects"
        subtitle="Social leadership, philanthropic initiatives, and emerging InsurTech frontiers"
        items={upcomingProjectCardItems}
        onCardClick={(item) => setSelectedCard(item)}
      />

      {/* The Professional Cut: High-Impact Timeline & Credentials (Reference 2) */}
      <ProfessionalCut />

      {/* Skills Matrix & Languages */}
      <SkillsSection />

      {/* References & Endorsements */}
      <ReferencesSection />

      {/* Start a Conversation CTA Banner (Reference 1) */}
      <ConversationCta onOpenContact={() => setIsContactOpen(true)} />

      {/* Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Floating Scroll To Top */}
      <ScrollToTop />

      {/* Interactive Modals */}
      <DetailModal
        item={selectedCard}
        onClose={() => setSelectedCard(null)}
        onContactClick={() => setIsContactOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </main>
  );
}
