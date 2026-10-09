import React from "react";
import HeroCanvas from "./HeroCanvas";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen min-h-[100dvh] py-16 sm:py-20 lg:py-24 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-[#E4F0FD] to-[#DCEEFD]">
      {/* Ambient luminous glow circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[460px] bg-gradient-to-tr from-brand-blue/15 to-electric-cyan/20 rounded-full blur-[130px] pointer-events-none -z-0"></div>
      <div className="absolute top-12 left-12 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-12 right-12 w-96 h-96 bg-electric-cyan/15 rounded-full blur-[120px] pointer-events-none"></div>

      <HeroCanvas />

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-blue-200/90 mb-6 shadow-[0_2px_12px_rgba(22,119,255,0.08)]">
          <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
          <span className="font-escucha uppercase tracking-widest text-xs sm:text-sm font-bold text-brand-blue">
            Unified Healthcare Operations Platform
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-normal font-nohemi tracking-tight leading-[1.18] text-slate-900 mb-5 sm:mb-6 max-w-4xl mx-auto">
          One Platform to Manage Your{" "}
          <br className="hidden sm:inline" />
          <span className="sm:whitespace-nowrap">
            <span className="font-flaviotte font-normal italic bg-gradient-to-r from-brand-blue via-blue-600 to-electric-cyan bg-clip-text text-transparent pr-1">
              Healthcare Workforce
            </span>{" "}
            <span className="font-nohemi font-normal">& Field Operations</span>
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl font-nohemi font-medium text-slate-800 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10">
          Connect internal hospital staff management, geofenced selfie attendance, and regional field force tracking into a single enterprise system. Eliminate operational blind spots with real-time visibility across branches and field territories.
        </p>

        <div className="flex justify-center w-full">
          <Link
            href="#demo"
            className="group inline-flex items-center gap-3 bg-brand-blue hover:bg-blue-600 active:scale-[0.98] text-white pl-8 pr-5 py-3.5 sm:pl-9 sm:pr-6 sm:py-4 text-base sm:text-lg rounded-full font-nohemi font-bold transition-all duration-300 shadow-[0_10px_30px_rgba(22,119,255,0.28)] hover:shadow-[0_14px_38px_rgba(22,119,255,0.38)] hover:-translate-y-0.5"
          >
            <span>Request a Demo</span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 group-hover:translate-x-1 transition-all duration-300">
              <ArrowRight size={18} className="text-white" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
