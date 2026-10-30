"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { HERO_CONFIG } from "./heroConfig";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("");

  const navLinks = [
    { name: "Solutions", href: "#solutions" },
    { name: "How It Works", href: "#workflow" },
    { name: "Enterprise", href: "#enterprise" },
    { name: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash && window.scrollY > 0) {
      window.scrollTo(0, 0);
    }

    const handleScroll = () => {
      // Scrolled state triggers after 40 to 60px of scroll (calibrated to 50px)
      const scrolled = window.scrollY > HERO_CONFIG.nav.scrollThresholdPx;
      setIsScrolled(scrolled);

      // Section scroll spy
      const sections = ["solutions", "workflow", "enterprise", "faq"];
      const firstSection = document.getElementById("solutions") || document.getElementById("problem");

      if (!firstSection || window.scrollY < firstSection.offsetTop - 300) {
        setActiveNav("");
        return;
      }

      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (window.scrollY >= top && window.scrollY < top + height) {
            current = `#${id}`;
            break;
          }
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        current = "#faq";
      }

      setActiveNav(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveNav(href);
    if (mobileMenuOpen) setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      {/* Floating Pill Container (Change 4: Solid near-black #09090B at top -> Solid white #FDFDFD when scrolled) */}
      <div
        id="navbar-floating-pill"
        className={`pointer-events-auto w-full max-w-6xl h-[70px] sm:h-[80px] rounded-full px-5 sm:px-8 flex items-center justify-between transition-[background-color,border-color,box-shadow] duration-350 ease-in-out ${
          isScrolled
            ? "bg-[#FDFDFD] border border-black/8 shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
            : "bg-[#09090B] border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.40)]"
        }`}
        style={{
          opacity: 0,
          transform: "translateY(-75px)",
          willChange: "transform, opacity, background-color, border-color, box-shadow",
        }}
      >
        {/* Logo: Sized to 245px wide on desktop (inside 230 to 260px range), 80px pill height.
            Dual-image absolute stack enables instantaneous crossfade with 0 layout shift and 0 flash. */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-11 sm:h-[62px] w-48 sm:w-[245px] flex items-center">
            {/* White logo for dark background (Top state) */}
            <img
              src="/logo-dark.png"
              alt="FIELDCRUX Logo"
              width={245}
              height={82}
              className="absolute inset-0 w-full h-full object-contain object-left pointer-events-none transition-opacity duration-350 ease-in-out"
              style={{
                opacity: isScrolled ? 0 : 1,
              }}
            />
            {/* Dark logo for light background (Scrolled state) */}
            <img
              src="/logo.png"
              alt="FIELDCRUX Logo"
              width={245}
              height={82}
              className="absolute inset-0 w-full h-full object-contain object-left pointer-events-none transition-opacity duration-350 ease-in-out"
              style={{
                opacity: isScrolled ? 1 : 0,
              }}
            />
          </div>
        </Link>

        {/* Desktop Nav Links: Removed grey inner pill. Link text white at top, turns dark #1C1B1A when scrolled. */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = activeNav === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-nohemi font-semibold transition-colors duration-350 ${
                  isScrolled
                    ? isActive
                      ? "text-[#1C1B1A] bg-black/5"
                      : "text-[#1C1B1A]/80 hover:text-[#1C1B1A] hover:bg-black/5"
                    : isActive
                    ? "text-white bg-white/15"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Primary CTA:
            Top state: White pill with dark text.
            Scrolled state: Dark pill (#1C1B1A) with white text. */}
        <div className="hidden md:block">
          <Link
            href={HERO_CONFIG.ctaHref}
            className={`px-6 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-nohemi font-bold transition-all duration-350 active:scale-95 ${
              isScrolled
                ? "bg-[#1C1B1A] hover:bg-black text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
                : "bg-white hover:bg-white/90 text-[#09090B] shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
            }`}
          >
            {HERO_CONFIG.ctaText}
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          suppressHydrationWarning
          className={`md:hidden p-2 rounded-full transition-colors duration-350 ${
            isScrolled
              ? "text-[#1C1B1A] hover:bg-black/5"
              : "text-white hover:bg-white/10"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`pointer-events-auto md:hidden absolute top-full mt-2 left-4 right-4 backdrop-blur-xl border shadow-xl rounded-2xl py-5 px-6 flex flex-col gap-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
            isScrolled
              ? "bg-white/95 border-slate-200 text-slate-800"
              : "bg-[#09090B]/95 border-white/10 text-white"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-base font-semibold font-nohemi py-2.5 border-b ${
                isScrolled ? "border-slate-100 text-slate-800" : "border-white/10 text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={HERO_CONFIG.ctaHref}
            className={`px-5 py-3 rounded-full text-center font-bold font-nohemi mt-2 transition-all ${
              isScrolled
                ? "bg-[#1C1B1A] text-white"
                : "bg-white text-[#09090B]"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {HERO_CONFIG.ctaText}
          </Link>
        </div>
      )}
    </header>
  );
}
