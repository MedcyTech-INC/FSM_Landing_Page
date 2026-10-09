"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const [activeNav, setActiveNav] = useState<string>("");

  const navLinks = [
    { name: "Solutions", href: "#solutions", color: "bg-brand-blue text-white shadow-xs" },
    { name: "How It Works", href: "#workflow", color: "bg-cyan-500 text-slate-950 shadow-xs" },
    { name: "Enterprise", href: "#enterprise", color: "bg-[#0B1526] text-white shadow-xs border border-blue-900/40" },
    { name: "FAQ", href: "#faq", color: "bg-brand-blue text-white shadow-xs" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section scroll spy
      const sections = ["solutions", "workflow", "enterprise", "faq"];
      const firstSection = document.getElementById("solutions");

      // When at top of page (hero), no tab should be active
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

      // If near bottom of the page, activate FAQ
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md border-b border-blue-100/80 shadow-[0_4px_20px_rgba(22,119,255,0.05)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-16 w-72 flex items-center">
            {logoError ? (
              <span className="flex items-center font-bold text-xl text-slate-900">
                FIELD<span className="text-electric-cyan">CRUX</span>
              </span>
            ) : (
              <img 
                src="/logo.png" 
                alt="FIELDCRUX Logo" 
                className="object-contain h-full w-auto" 
                onError={() => setLogoError(true)}
              />
            )}
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-white/70 backdrop-blur-md rounded-full border border-blue-100/80 shadow-2xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-4 py-1.5 rounded-full text-sm font-nohemi font-semibold transition-all duration-300 ${
                activeNav === link.href
                  ? link.color
                  : "text-slate-700 hover:text-brand-blue hover:bg-slate-100/60"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="#demo"
            className="bg-brand-blue hover:bg-blue-600 active:scale-95 text-white px-6 py-2.5 rounded-full text-sm font-nohemi font-bold transition-all shadow-[0_4px_14px_rgba(22,119,255,0.25)] hover:shadow-[0_6px_20px_rgba(22,119,255,0.35)] hover:-translate-y-0.5"
          >
            Request a Demo
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          suppressHydrationWarning
          className="md:hidden text-primary-text"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-primary-text py-2 border-b border-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#demo"
            className="bg-brand-blue text-white px-5 py-3 rounded-md text-center font-medium mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Request a Demo
          </Link>
        </div>
      )}
    </header>
  );
}
