"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroGeometricBlocks from "./HeroGeometricBlocks";
import HeroWordRotator from "./HeroWordRotator";
import { HERO_CONFIG } from "./heroConfig";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const headlineGroupRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const blackCurtainRef = useRef<HTMLDivElement>(null);
  const entranceTlRef = useRef<gsap.core.Timeline | null>(null);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect reduced-motion and responsive breakpoint
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    motionQuery.addEventListener("change", handleMotion);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      motionQuery.removeEventListener("change", handleMotion);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Ensure scroll is reset to top on mount if page reload
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (!window.location.hash && window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  // UNIFIED STAGED LOAD SEQUENCE & DEFERRED SCROLLTRIGGER CONTROLLER
  // Sequence: 1st Text -> 2nd Two Blocks from Sides -> 3rd Nav Pill -> ScrollTrigger activated
  useEffect(() => {
    if (typeof window === "undefined" || !heroWrapperRef.current) return;

    const e = HERO_CONFIG.entrance;
    const navPill = document.getElementById("navbar-floating-pill");
    const isMobileDevice = window.innerWidth < 768;
    const travel = isMobileDevice
      ? HERO_CONFIG.travelDistances.mobile
      : HERO_CONFIG.travelDistances.desktop;

    let scrollTriggerInitialized = false;
    let scrollTl: gsap.core.Timeline | null = null;
    let entranceCtx: gsap.Context | null = null;
    let scrollCtx: gsap.Context | null = null;

    const restoreHeadlineRestState = () => {
      gsap.set("#hero-badge", { opacity: 0.85, y: 0, filter: "none" });
      gsap.set(["#hero-headline-line", "#hero-accent-phrase-wrapper", "#hero-cta-btn"], {
        opacity: 1,
        y: 0,
        filter: "none",
      });
      if (scrollCueRef.current) {
        gsap.set(scrollCueRef.current, { opacity: 0.85, y: 0, filter: "none" });
      }
      gsap.set(["#hero-left-side-blocks", "#hero-right-side-blocks"], { x: 0, opacity: 1 });
      gsap.set("#layer-silver-facet", { x: 0, y: 0 });
    };

    const initScrollTrigger = () => {
      if (scrollTriggerInitialized || !heroWrapperRef.current) return;
      scrollTriggerInitialized = true;

      // Ensure elements are in their exact resting poses
      restoreHeadlineRestState();

      scrollCtx = gsap.context(() => {
        const pinDistance = Math.round(window.innerHeight * travel.pinHeightMultiplier);

        scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            start: "top top",
            end: `+=${pinDistance}`,
            pin: pinTargetRef.current ? pinTargetRef.current : false,
            pinSpacing: false,
            scrub: travel.scrubSmoothingLag,
            onUpdate: (self) => {
              if (self.progress === 0) {
                restoreHeadlineRestState();
              }
            },
            onLeaveBack: () => {
              restoreHeadlineRestState();
              gsap.set("#hero-blocks-cluster", { rotation: 0, scale: 1.0, x: 0, y: 0 });
            },
          },
        });

        const clusterPivot = travel.clusterPivot || "14% 52%";
        gsap.set("#hero-blocks-cluster", {
          transformOrigin: clusterPivot,
        });

        // Segment 1: progress 0.0 -> 0.25 (bright edge passes level)
        scrollTl.fromTo(
          "#hero-blocks-cluster",
          {
            rotation: travel.rot0PctDeg,
            scale: travel.scale0Pct,
            x: 0,
            y: 0,
          },
          {
            rotation: travel.rot25PctDeg,
            scale: travel.scale25Pct,
            x: () => window.innerWidth * travel.driftX25Ratio,
            y: () => window.innerHeight * travel.driftY25Ratio,
            ease: "sine.inOut",
            duration: 0.25,
            immediateRender: false,
          },
          0
        );

        // Segment 2: progress 0.25 -> 0.50 (edge descends to the right)
        scrollTl.to(
          "#hero-blocks-cluster",
          {
            rotation: travel.rot50PctDeg,
            scale: travel.scale50Pct,
            x: () => window.innerWidth * travel.driftX50Ratio,
            y: () => window.innerHeight * travel.driftY50Ratio,
            ease: "sine.inOut",
            duration: 0.25,
            immediateRender: false,
          },
          0.25
        );

        // Segment 3: progress 0.50 -> 1.00 (settles into final clockwise pose)
        scrollTl.to(
          "#hero-blocks-cluster",
          {
            rotation: travel.rot100PctDeg,
            scale: travel.scale100Pct,
            x: () => window.innerWidth * travel.driftX100Ratio,
            y: () => window.innerHeight * travel.driftY100Ratio,
            ease: "sine.out",
            duration: 0.50,
            immediateRender: false,
          },
          0.50
        );

        // Silver top-right facet turns clockwise and stays visible
        scrollTl.fromTo(
          "#layer-silver-facet",
          { x: 0, y: 0 },
          {
            x: () => window.innerWidth * travel.silverX25Ratio,
            y: () => window.innerHeight * travel.silverY25Ratio,
            ease: "sine.inOut",
            duration: 0.25,
            immediateRender: false,
          },
          0
        );
        scrollTl.to(
          "#layer-silver-facet",
          {
            x: () => window.innerWidth * travel.silverX50Ratio,
            y: () => window.innerHeight * travel.silverY50Ratio,
            ease: "sine.inOut",
            duration: 0.25,
            immediateRender: false,
          },
          0.25
        );
        scrollTl.to(
          "#layer-silver-facet",
          {
            x: () => window.innerWidth * travel.silverX75Ratio,
            y: () => window.innerHeight * travel.silverY75Ratio,
            ease: "sine.inOut",
            duration: 0.25,
            immediateRender: false,
          },
          0.50
        );
        scrollTl.to(
          "#layer-silver-facet",
          {
            x: () => window.innerWidth * travel.silverX100Ratio,
            y: () => window.innerHeight * travel.silverY100Ratio,
            ease: "sine.out",
            duration: 0.25,
            immediateRender: false,
          },
          0.75
        );

        // Staggered headline upward drift & fade (sharp, zero blur)
        if (scrollCueRef.current) {
          scrollTl.fromTo(
            scrollCueRef.current,
            { opacity: 0.85, y: 0, filter: "none" },
            {
              opacity: 0,
              y: -35,
              filter: "none",
              ease: "none",
              duration: travel.scrollCueFadeExit,
              immediateRender: false,
            },
            0
          );
        }

        scrollTl.fromTo(
          "#hero-cta-btn",
          { opacity: 1, y: 0, filter: "none" },
          {
            opacity: 0,
            y: -50,
            filter: "none",
            ease: "none",
            duration: travel.ctaFadeExit - 0.08,
            immediateRender: false,
          },
          0.08
        );

        scrollTl.fromTo(
          "#hero-badge",
          { opacity: 0.85, y: 0, filter: "none" },
          {
            opacity: 0,
            y: -travel.headlineDriftY,
            filter: "none",
            ease: "none",
            duration: travel.headlineFadeExit - 0.12,
            immediateRender: false,
          },
          0.12
        );

        scrollTl.fromTo(
          ["#hero-headline-line", "#hero-accent-phrase-wrapper"],
          { opacity: 1, y: 0, filter: "none" },
          {
            opacity: 0,
            y: -travel.headlineDriftY,
            filter: "none",
            ease: "none",
            duration: travel.headlineFadeExit - 0.12,
            immediateRender: false,
          },
          0.12
        );
      }, heroWrapperRef);
    };

    // If deep-linked directly to a lower section with a hash anchor, jump to settled state immediately
    if (window.location.hash && window.scrollY > 10) {
      if (blackCurtainRef.current) gsap.set(blackCurtainRef.current, { opacity: 0, display: "none" });
      gsap.set("#hero-bg-gradient", { opacity: 1 });
      if (navPill) gsap.set(navPill, { y: 0, opacity: 1 });
      gsap.set("#hero-blocks-cluster", { rotation: 0, scale: 1.0, x: 0, y: 0 });
      initScrollTrigger();
      return;
    }

    // Set initial un-revealed states
    entranceCtx = gsap.context(() => {
      if (blackCurtainRef.current) gsap.set(blackCurtainRef.current, { opacity: 1, display: "block" });
      gsap.set("#hero-bg-gradient", { opacity: 0 });
      gsap.set("#hero-badge", { y: e.textDriftY, opacity: 0, filter: "none" });
      gsap.set("#hero-headline-line", { y: e.textDriftY, opacity: 0, filter: "none" });
      gsap.set("#hero-accent-phrase-wrapper", { y: e.textDriftY, opacity: 0, filter: "none" });
      gsap.set("#hero-cta-btn", { y: e.textDriftY, opacity: 0, filter: "none" });
      if (scrollCueRef.current) gsap.set(scrollCueRef.current, { y: e.textDriftY, opacity: 0, filter: "none" });
      if (navPill) gsap.set(navPill, { y: -e.navDropY, opacity: 0 });
      gsap.set("#hero-left-side-blocks", { x: e.leftBlocksOffsetX, opacity: 0 });
      gsap.set("#hero-right-side-blocks", { x: e.rightBlocksOffsetX, opacity: 0 });
      gsap.set("#hero-blocks-cluster", { rotation: 0, scale: 1.0, x: 0, y: 0 });

      const entranceTl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          entranceTlRef.current = null;
          initScrollTrigger();
        },
      });
      entranceTlRef.current = entranceTl;
      if (typeof window !== "undefined") {
        (window as any).__heroEntranceTl = entranceTl;
      }

      // 0. Ambient: near-black curtain fades out and deep blue gradient fades in
      entranceTl.to(
        blackCurtainRef.current,
        {
          opacity: 0,
          duration: e.gradientFadeDuration,
          ease: "power1.inOut",
          onComplete: () => {
            if (blackCurtainRef.current) blackCurtainRef.current.style.display = "none";
          },
        },
        e.nearBlackDuration
      );

      entranceTl.to(
        "#hero-bg-gradient",
        {
          opacity: 1,
          duration: e.gradientFadeDuration,
          ease: "power1.inOut",
        },
        e.nearBlackDuration
      );

      // STAGE 1: 1st TEXT (Badge, Headline line, Accent phrase, CTA button, Scroll cue)
      entranceTl.to(
        "#hero-badge",
        {
          y: 0,
          opacity: 0.85,
          duration: e.textDriftDuration,
          ease: "power2.out",
        },
        e.badgeStart
      );

      entranceTl.to(
        "#hero-headline-line",
        {
          y: 0,
          opacity: 1,
          duration: e.textDriftDuration,
          ease: "power2.out",
        },
        e.headlineFirstLineStart
      );

      entranceTl.to(
        "#hero-accent-phrase-wrapper",
        {
          y: 0,
          opacity: 1,
          duration: e.textDriftDuration,
          ease: "power2.out",
        },
        e.accentPhraseStart
      );

      entranceTl.to(
        "#hero-cta-btn",
        {
          y: 0,
          opacity: 1,
          duration: e.textDriftDuration,
          ease: "power2.out",
        },
        e.buttonStart
      );

      if (scrollCueRef.current) {
        entranceTl.to(
          scrollCueRef.current,
          {
            y: 0,
            opacity: 0.85,
            duration: e.textDriftDuration,
            ease: "power2.out",
          },
          e.scrollCueStart
        );
      }

      // STAGE 2: 2nd TWO BLOCKS FROM SIDES
      // Left blocks sweep in from the left side
      entranceTl.to(
        "#hero-left-side-blocks",
        {
          x: 0,
          opacity: 1,
          duration: e.blocksEntranceDuration,
          ease: "power3.out",
        },
        e.blocksEntranceStart
      );

      // Right block sweeps in from the right side
      entranceTl.to(
        "#hero-right-side-blocks",
        {
          x: 0,
          opacity: 1,
          duration: e.blocksEntranceDuration,
          ease: "power3.out",
        },
        e.blocksEntranceStart
      );

      // STAGE 3: 3rd NAV
      // Nav pill drops down from top after the two side blocks settle
      if (navPill) {
        entranceTl.to(
          navPill,
          {
            y: 0,
            opacity: 1,
            duration: e.navDropDuration,
            ease: "power2.out",
          },
          e.navDropStart
        );
      }
    }, heroWrapperRef);

    // If user starts scrolling early, finish entrance immediately and initialize ScrollTrigger
    const handleEarlyScroll = () => {
      if (!scrollTriggerInitialized) {
        if (entranceTlRef.current && entranceTlRef.current.isActive()) {
          entranceTlRef.current.progress(1);
        }
        initScrollTrigger();
      }
    };

    const handleWindowScroll = () => {
      if (window.scrollY === 0) {
        restoreHeadlineRestState();
        gsap.set("#hero-blocks-cluster", { rotation: 0, scale: 1.0, x: 0, y: 0 });
        gsap.set("#layer-silver-facet", { x: 0, y: 0 });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Home") {
        setTimeout(handleWindowScroll, 50);
      }
    };

    window.addEventListener("scroll", handleEarlyScroll, { passive: true });
    window.addEventListener("wheel", handleEarlyScroll, { passive: true });
    window.addEventListener("touchmove", handleEarlyScroll, { passive: true });
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleEarlyScroll);
      window.removeEventListener("wheel", handleEarlyScroll);
      window.removeEventListener("touchmove", handleEarlyScroll);
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("keydown", handleKeyDown);
      if (entranceTlRef.current) {
        entranceTlRef.current.kill();
        entranceTlRef.current = null;
      }
      if (entranceCtx) entranceCtx.revert();
      if (scrollCtx) scrollCtx.revert();
    };
  }, []);

  return (
    <div
      ref={heroWrapperRef}
      className="relative w-full h-screen h-[100dvh] overflow-hidden select-none"
      style={{
        backgroundColor: HERO_CONFIG.colors.bgNavyTop,
      }}
    >
      <div
        ref={pinTargetRef}
        className="relative w-full h-full overflow-hidden select-none flex flex-col justify-between"
      >
      {/* 0. DEFECT 1: Near-black overlay screen (#0A0A0A) for the staged entrance */}
      <div
        ref={blackCurtainRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-40 pointer-events-none"
        style={{
          backgroundColor: HERO_CONFIG.colors.nearBlackScreen,
        }}
      />

      {/* 1. Full-bleed Geometric Block Parallax Layer (3 independent depth layers) */}
      <HeroGeometricBlocks reduceMotion={reduceMotion} />

      {/* 2. Top Spacer for floating navbar balance */}
      <div className="w-full pt-24 sm:pt-28" />

      {/* 3. Headline Group (Badge, Headline with rolling accent phrase, Primary CTA) */}
      <div
        ref={headlineGroupRef}
        className="container mx-auto px-6 max-w-5xl relative z-10 text-center flex flex-col items-center select-none my-auto"
      >
        {/* Badge: 85% white opacity, with a barely visible lighter pill border */}
        <div
          id="hero-badge"
          className="inline-block font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-white/85 mb-5 sm:mb-6 font-medium px-4 py-1.5 rounded-full border border-white/20 bg-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.15)] will-change-transform"
          style={{ opacity: 0 }}
        >
          {HERO_CONFIG.badge}
        </div>

        {/* Headline: Main line pure white #FFFFFF */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.65rem] xl:text-[4rem] font-normal font-nohemi tracking-tight leading-[1.12] text-white mb-8 sm:mb-10 max-w-4xl mx-auto">
          <span
            id="hero-headline-line"
            className="inline-block will-change-transform"
            style={{ opacity: 0 }}
          >
            {HERO_CONFIG.headlinePrefix}{" "}
          </span>{" "}
          <br className="hidden sm:inline" />
          <HeroWordRotator reduceMotion={reduceMotion} />
        </h1>

        {/* Primary CTA Button */}
        <div
          id="hero-cta-btn"
          className="flex justify-center w-full will-change-transform"
          style={{ opacity: 0 }}
        >
          <Link
            href={HERO_CONFIG.ctaHref}
            className="group inline-flex items-center gap-3 bg-brand-blue hover:bg-blue-600 active:scale-[0.98] text-white pl-8 pr-5 py-3.5 sm:pl-9 sm:pr-6 sm:py-4 text-base sm:text-lg rounded-full font-nohemi font-bold transition-all duration-300 shadow-[0_10px_30px_rgba(22,119,255,0.32)] hover:shadow-[0_14px_40px_rgba(22,119,255,0.48)] hover:-translate-y-0.5"
          >
            <span>{HERO_CONFIG.ctaText}</span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 group-hover:translate-x-1 transition-all duration-300">
              <ArrowRight size={18} className="text-white" />
            </div>
          </Link>
        </div>
      </div>

      {/* 4. Mouse Scroll Cue (85% opacity label, fades out first on scroll) */}
      <div
        id="hero-scroll-cue"
        ref={scrollCueRef}
        className="pb-7 sm:pb-9 relative z-10 flex flex-col items-center gap-2 pointer-events-none will-change-transform"
        style={{ opacity: 0 }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border-2 border-white/60 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white/90 animate-bounce" />
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/85 font-medium">
          {HERO_CONFIG.scrollCueText}
        </span>
      </div>
      </div>
    </div>
  );
}
