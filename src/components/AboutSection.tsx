"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Award,
  GraduationCap,
  Building2,
  FileText,
  TrendingUp,
  Zap,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

interface AboutSectionProps {
  onOpenContact: () => void;
}

export default function AboutSection({ onOpenContact }: AboutSectionProps) {
  const { data } = usePortfolio();
  const { profile } = data;

  const availablePhotos = [
    {
      id: "crimson-tie",
      url: "/images/azmain-crimson-tie-portrait.jpeg",
      label: "Crimson Tie",
    },
    {
      id: "du-convocation",
      url: "/images/du-convocation-azmain-adil.jpeg",
      label: "DU Convocation",
    },
    {
      id: "idlc-signing",
      url: "/images/idlc-finance-agreement-signing-green-delta.jpeg",
      label: "IDLC Signing",
    },
    {
      id: "du-career-talk",
      url: "/images/du-career-talk-keynote-green-delta.jpeg",
      label: "DU Career Talk",
    },
    {
      id: "gdi-distribution",
      url: "/images/branches-distribution-gdi-highlights-2025.jpg",
      label: "GDI Distribution",
    },
    {
      id: "executive-atrium",
      url: "/images/azmain-executive-atrium.jpeg",
      label: "Executive Atrium",
    },
    {
      id: "half-yearly-2023",
      url: "/images/half-yearly-business-conference-2023-speech.jpeg",
      label: "Conference 2023",
    },
    {
      id: "office-olympics",
      url: "/images/green-delta-office-olympics-2023.jpg",
      label: "Office Olympics",
    },
    {
      id: "pitch-coaching",
      url: "/images/art-of-the-pitch-knowledge-sharing.jpeg",
      label: "Pitch Coaching",
    },
    {
      id: "gala-night",
      url: "/images/azmain-plaid-blazer-gala.jpeg",
      label: "Gala Night",
    },
    {
      id: "editorial-full",
      url: "/images/azmain-executive-editorial-full.jpeg",
      label: "Modern Exec",
    },
    {
      id: "annual-conference-2024",
      url: "/images/annual-business-conference-2024-award.jpeg",
      label: "Award 2024",
    },
    {
      id: "award-2023",
      url: "/images/green-delta-business-contribution-2023-award.jpeg",
      label: "Award 2023",
    },
    {
      id: "crdf-maritime",
      url: "/images/crdf-global-maritime-security-sanctions-conference.jpeg",
      label: "Maritime Security",
    },
    {
      id: "skill-bank-ethics",
      url: "/images/bangladesh-skill-bank-communication-ethics-certificate.jpeg",
      label: "Business Ethics",
    },
    {
      id: "bimtech-india",
      url: "/images/bimtech-certificate-valedictory.jpeg",
      label: "BIMTECH India",
    },
    {
      id: "selling-honors",
      url: "/images/excellence-insurance-selling.jpeg",
      label: "Selling Honors",
    },
    {
      id: "keynote-speech",
      url: "/images/azmain-adil.jpeg",
      label: "Keynote 2026",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Desktop detection & main-scroll lock references
  const [isDesktop, setIsDesktop] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  const maxTravelRef = useRef(0);
  const targetYRef = useRef(0);
  const currentYRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const isDesktopRef = useRef(false);

  // Auto Slider interval
  useEffect(() => {
    if (isPaused || availablePhotos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % availablePhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, availablePhotos.length]);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % availablePhotos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + availablePhotos.length) % availablePhotos.length);
  };

  const currentPhoto = availablePhotos[currentIndex] || availablePhotos[0];

  // Check desktop view on mount & resize
  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      isDesktopRef.current = desktop;
      if (!desktop && rightContentRef.current) {
        rightContentRef.current.style.transform = "none";
      }
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Measure scroll travel inside the right container
  useEffect(() => {
    if (!isDesktop) return;

    const calculateTravel = () => {
      if (rightContainerRef.current && rightContentRef.current) {
        const containerH = rightContainerRef.current.clientHeight;
        const contentH = rightContentRef.current.scrollHeight;
        const travel = Math.max(0, contentH - containerH);
        maxTravelRef.current = travel;
      }
    };

    const ro = new ResizeObserver(() => {
      calculateTravel();
    });

    if (rightContainerRef.current) ro.observe(rightContainerRef.current);
    if (rightContentRef.current) ro.observe(rightContentRef.current);

    calculateTravel();

    return () => ro.disconnect();
  }, [isDesktop]);

  // Main window scroll event driving the smooth scroll lock
  useEffect(() => {
    if (!isDesktop) return;

    // Smooth lerp render loop for 60-120fps hardware-accelerated motion
    const updateTransform = () => {
      const diff = targetYRef.current - currentYRef.current;
      if (Math.abs(diff) < 0.1) {
        currentYRef.current = targetYRef.current;
        if (rightContentRef.current && isDesktopRef.current) {
          rightContentRef.current.style.transform = `translate3d(0, -${currentYRef.current.toFixed(2)}px, 0)`;
        }
        animFrameRef.current = null;
        return;
      }

      currentYRef.current += diff * 0.18;
      if (rightContentRef.current && isDesktopRef.current) {
        rightContentRef.current.style.transform = `translate3d(0, -${currentYRef.current.toFixed(2)}px, 0)`;
      }
      animFrameRef.current = requestAnimationFrame(updateTransform);
    };

    const handleScroll = () => {
      if (!sectionRef.current || !stickyRef.current || !isDesktopRef.current) return;

      const sectionEl = sectionRef.current;
      const stickyEl = stickyRef.current;
      const sectionRect = sectionEl.getBoundingClientRect();

      // Sticky top offset in px (corresponds to lg:top-20 = 80px)
      const stickyTop = 80;

      // The section top position at which stickyEl reaches stickyTop
      const pinStartSectionTop = stickyTop - stickyEl.offsetTop;
      const scrolledPastPin = pinStartSectionTop - sectionRect.top;

      if (scrolledPastPin <= 0) {
        targetYRef.current = 0;
      } else {
        // Total scrollable distance while the container is pinned
        const totalPinDistance =
          sectionRect.height - stickyEl.offsetHeight - stickyEl.offsetTop;

        if (totalPinDistance <= 0) {
          targetYRef.current = 0;
        } else {
          // Responsive travel track with an exit buffer so achievements/CTAs stay comfortably in view
          const exitBuffer = 50;
          const activeTrack = Math.max(1, totalPinDistance - exitBuffer);
          const progress = Math.min(1, Math.max(0, scrolledPastPin / activeTrack));
          targetYRef.current = progress * maxTravelRef.current;
        }
      }

      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(updateTransform);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Direct initial placement
    currentYRef.current = targetYRef.current;
    if (rightContentRef.current) {
      rightContentRef.current.style.transform = `translate3d(0, -${currentYRef.current.toFixed(2)}px, 0)`;
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isDesktop]);

  const fallbackAchievements = [
    {
      id: "achieve-1",
      title: "Network Turnaround",
      category: "Operational Turnaround",
      metric: "-67% → +20% YoY",
      description:
        "Moved a branch network from growth of about -67% to +20% year-on-year within eight months; closed five underperforming branches and reduced operating overhead by about 20%.",
      tag: "20-Branch Network · 8 Months",
      icon: "TrendingUp",
    },
    {
      id: "achieve-2",
      title: "Digital Distribution",
      category: "InsurTech Innovation",
      metric: "First in Market",
      description:
        "Helped launch MotoAssurance, a first-in-market digital motor insurance channel in Bangladesh, shifting acquisition toward aggregator-led and direct digital models.",
      tag: "MotoAssurance · Direct Digital",
      icon: "Zap",
    },
    {
      id: "achieve-3",
      title: "Portfolio and Risk Strategy",
      category: "Institutional Underwriting",
      metric: "BDT 60–70 Crore",
      description:
        "Restructured a major Tier-1 financial institution portfolio (BDT 60–70 crore, about 15% of company revenue) from concentrated, high-frequency risk toward a diversified 7,000+ policy structure, with a reported improvement of more than 1,000% in loss-ratio performance.",
      tag: "Tier-1 FI · 7,000+ Policies",
      icon: "ShieldCheck",
    },
    {
      id: "achieve-4",
      title: "Reinsurance Continuity",
      category: "Treaty & Regulatory",
      metric: "7 Business Days",
      description:
        "Led negotiations to restore a terminated mandatory travel reinsurance treaty within seven business days, protecting portfolio continuity and regulatory compliance.",
      tag: "Treaty Restored · Compliance",
      icon: "RefreshCw",
    },
  ];

  const achievements =
    data.keyAchievements && data.keyAchievements.length > 0
      ? data.keyAchievements
      : fallbackAchievements;

  const getAchievementIcon = (iconName?: string) => {
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp className="w-4 h-4" />;
      case "Zap":
        return <Zap className="w-4 h-4" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4" />;
      case "RefreshCw":
        return <RefreshCw className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] scroll-mt-20 py-12 lg:py-16 lg:min-h-[140vh]"
    >
      <div
        ref={stickyRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:sticky lg:top-20"
      >
        {/* Section Heading */}
        <div className="space-y-1.5 mb-6 sm:mb-8">
          <span className="text-xs font-bold text-[#E50914] uppercase tracking-widest">
            Executive Profile
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Know More About Me
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl">
            A comprehensive perspective on leadership, risk governance, and institutional distribution.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8 relative shadow-2xl">
          {/* Authentic Portrait Image Column - Auto Slider (Pinned Alongside) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center w-full self-start">
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-red-950/40 group bg-zinc-950 select-none"
            >
              {/* Photo Image */}
              <Image
                key={currentPhoto.id}
                src={currentPhoto.url}
                alt={`${profile.name} - ${currentPhoto.label}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 340px"
                priority={currentIndex === 0}
                className="object-cover object-[center_16%] group-hover:scale-105 transition-transform duration-700 animate-in fade-in duration-500"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

              {/* Top Controls Overlay */}
              <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
                {/* Counter Pill */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-300 shadow-md">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isPaused ? "bg-amber-400" : "bg-[#E50914] animate-pulse"
                    }`}
                  />
                  <span>
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(availablePhotos.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Auto / Pause Toggle */}
                <button
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 text-[9px] font-bold text-zinc-300 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
                  title={isPaused ? "Resume auto slide" : "Pause auto slide"}
                  aria-label={isPaused ? "Resume auto slide" : "Pause auto slide"}
                >
                  {isPaused ? (
                    <>
                      <Play className="w-2.5 h-2.5 text-[#E50914]" />
                      <span>PAUSED</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-2.5 h-2.5 text-[#E50914]" />
                      <span>AUTO</span>
                    </>
                  )}
                </button>
              </div>

              {/* Prev / Next Chevrons on Hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-[#E50914] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/20 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-[#E50914] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/20 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 z-20 text-center space-y-1 pointer-events-none">
                <span className="inline-block bg-[#E50914] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-sm shadow-md">
                  VERIFIED EXECUTIVE PROFILE
                </span>
                <div className="text-xs font-bold text-white tracking-wide drop-shadow-md truncate">
                  {currentPhoto.label}
                </div>
              </div>

              {/* Scrubber Progress Bar at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15 z-30">
                <div
                  className="h-full bg-[#E50914] transition-all duration-300 ease-linear"
                  style={{
                    width: `${
                      ((currentIndex + 1) / availablePhotos.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Profile Identity Details */}
            <div className="mt-3.5 text-center">
              <h3 className="text-xl font-bold text-white tracking-tight">{profile.name}</h3>
              <p className="text-xs text-[#E50914] font-semibold mt-0.5">{profile.title}</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">{profile.location}</p>
            </div>
          </div>

          {/* Scroll-Locked Executive Content Column */}
          <div
            ref={rightContainerRef}
            className="lg:col-span-7 xl:col-span-8 overflow-hidden relative lg:h-[492px] xl:h-[505px] w-full"
          >
            {/* Content Translating with Main Scroll */}
            <div
              ref={rightContentRef}
              className="space-y-6 will-change-transform"
            >
              {/* Header & Strategic Scope */}
              <div className="space-y-1.5 border-b border-white/5 pb-3 pt-1 sm:pt-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E50914]" />
                  <span className="text-xs font-bold text-[#E50914] uppercase tracking-widest">
                    Executive Governance & Operations
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Institutional Risk Leadership & Quantified Impact
                </h3>
              </div>

              {/* Strategic Pillars Pill Strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-medium shadow-sm">
                  <Building2 className="w-3.5 h-3.5 text-[#E50914]" />
                  20-Branch Regional Transformation
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-medium shadow-sm">
                  <Award className="w-3.5 h-3.5 text-[#E50914]" />
                  Treaty & Reinsurance Underwriting
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-medium shadow-sm">
                  <GraduationCap className="w-3.5 h-3.5 text-[#E50914]" />
                  DU MBA & BIMTECH India
                </span>
              </div>

              {/* Key Achievements Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">
                      Key Achievements
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#E50914] bg-red-950/60 border border-red-900/40 px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
                      Quantified Impact
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {achievements.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-900 border border-white/10 hover:border-[#E50914]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/40 hover:shadow-red-950/20"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-red-950/60 border border-red-900/40 text-[#E50914] group-hover:scale-110 transition-transform">
                              {getAchievementIcon(item.icon)}
                            </div>
                            <div>
                              <h5 className="font-bold text-white text-xs sm:text-sm tracking-tight leading-snug">
                                {item.title}
                              </h5>
                              <span className="text-[10px] text-zinc-400 font-medium">
                                {item.category}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/30 px-2 py-0.5 rounded whitespace-nowrap shadow-sm">
                            {item.metric}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>

                      {item.tag && (
                        <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] text-zinc-400 font-medium tracking-wide">
                            {item.tag}
                          </span>
                          <span className="text-[10px] text-red-500/80 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                            Verified
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/CV_of_Azmain_Adil.pdf"
                  download
                  className="bg-[#E50914] hover:bg-[#ff1e27] text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Official CV (PDF)</span>
                </a>

                <button
                  onClick={onOpenContact}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-sm font-medium px-5 py-2.5 rounded-lg border border-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Initiate Executive Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

