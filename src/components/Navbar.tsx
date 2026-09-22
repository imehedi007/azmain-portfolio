"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { Settings, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const { data } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Background blur trigger
      setIsScrolled(window.scrollY > 40);

      // Scroll progress
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Active section spy
      const sections = ["work", "about", "skills", "experience", "testimonials"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#work", id: "work" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Testimonials", href: "#testimonials", id: "testimonials" },
  ];

  return (
    <>
      {/* Top red progress indicator line */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-[#E50914] z-[60] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - AZMAIN ADIL (Bold Wordmark) */}
          <Link
            href="#"
            className="group focus:outline-none inline-flex items-center py-1"
          >
            <span className="font-black text-xl sm:text-2xl tracking-wider text-white uppercase transition-all duration-300 group-hover:text-[#E50914] group-hover:drop-shadow-[0_0_16px_rgba(229,9,20,0.6)]">
              {data.profile.name}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E50914] rounded-full animate-in fade-in duration-200" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Admin CMS shortcut button */}
            <Link
              href="/admin"
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Content Management Dashboard (/admin)"
            >
              <Settings className="w-5 h-5" />
            </Link>

            {/* Red 'Let's Talk' Button */}
            <button
              id="nav-lets-talk-btn"
              onClick={onOpenContact}
              className="bg-[#E50914] hover:bg-[#ff1e27] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>Let&apos;s Talk</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#121212]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? "text-white bg-white/10 font-bold border-l-4 border-[#E50914]"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full bg-[#E50914] text-white font-bold py-2.5 rounded-full text-center hover:bg-[#ff1e27] transition-colors"
              >
                Let&apos;s Talk
              </button>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-zinc-300 hover:text-white text-center py-2 text-sm flex items-center justify-center gap-2 bg-white/5 rounded-full"
              >
                <Settings className="w-4 h-4" />
                <span>Admin CMS Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
