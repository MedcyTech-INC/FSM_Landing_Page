/**
 * FIELDCRUX Hero Section Configuration
 * Centralized content, palette, durations, travel distances, and animation switches.
 * Edit values here without touching component or animation logic.
 */

export const HERO_CONFIG = {
  // Content
  badge: "UNIFIED HEALTHCARE OPERATIONS PLATFORM",
  headlinePrefix: "One Platform to Manage Your",
  rollingPhrases: [
    "Healthcare Workforce",
    "Field Operations"
  ] as const,
  ctaText: "Request a Demo",
  ctaHref: "#demo",
  scrollCueText: "Scroll to explore",

  // Idle Animation Settings
  enableWordRoll: true,         // Trivial toggle to switch off phrase loop
  wordRollInterval: 3000,       // 3 seconds between rolls
  wordRollDuration: 0.55,       // 0.55s (0.5 to 0.6s) crossfade duration

  // Color Palette
  colors: {
    nearBlackScreen: "#0A0A0A", // Defect 1: Near-black initial screen
    bgNavyTop: "#0D193A",
    bgNavyDeep: "#101931",
    darkFacets: "#112557",
    royalBlueStart: "#2958D1",
    royalBlueEnd: "#2A5EE0",
    brightBlue: "#5883EB",
    lightHighlights: "#88A1E4",
    lightHighlightsAlt: "#678DEC",
    silverSlateTop: "#8A7E73",
    silverWhiteBottom: "#F3F2EC",
    headlineText: "#FFFFFF",
    badgeText: "rgba(255, 255, 255, 0.85)", // Defect 4: Raised to 85% white opacity
    scrollCueText: "rgba(255, 255, 255, 0.85)",
    // Defect 4: Pure white accent phrase passing WCAG AA on blue gradient
    accentPhraseColor: "#FFFFFF",
    nextSectionBg: "#DCEEFD", // Matches the top gradient color of ProblemSection
    navBlackPill: "#09090B",     // Pass 2: Solid near-black pill at top
    navWhitePill: "#FDFDFD",     // Pass 2: Solid white pill after scroll
    navDarkText: "#1C1B1A",      // Pass 2: Dark text for light pill
    navWhiteText: "#FFFFFF",
  },

  // Load Choreography Settings (Staged load: 1st text -> 2nd two blocks from sides -> 3rd nav)
  entrance: {
    nearBlackDuration: 0.35,          // 0. Initial ambient curtain
    gradientFadeDuration: 0.55,       // Background gradient fades in
    
    // Stage 1: 1st TEXT (starts at 0.70s, text elements fade & drift up)
    badgeStart: 0.70,                 // Badge at 0.70s
    headlineFirstLineStart: 0.85,     // Headline first line at 0.85s
    accentPhraseStart: 1.15,          // Accent phrase at 1.15s
    buttonStart: 1.45,                // CTA button at 1.45s
    scrollCueStart: 1.70,             // Scroll cue at 1.70s
    textDriftDuration: 0.70,          // Soft upward drift over 0.70s
    textDriftY: 18,                   // Soft upward drift 18px

    // Stage 2: 2nd TWO BLOCKS FROM SIDES (glide in slowly and smoothly from opposite sides)
    blocksEntranceStart: 2.15,        // After text is established
    blocksEntranceDuration: 0.95,     // Glide over ~0.95s
    leftBlocksOffsetX: -140,          // Left blocks from left (-140px)
    rightBlocksOffsetX: 140,          // Right block from right (+140px)

    // Stage 3: 3rd NAV (nav pill drops down from top)
    navDropStart: 3.35,               // After side blocks settle
    navDropDuration: 0.80,            // Drop over 0.8s
    navDropY: 75,                     // From -75px
  },

  // Scroll Behavior & Parallax Travel Distances (Spec 2 & Spec 3)
  travelDistances: {
    desktop: {
      pinHeightMultiplier: 1.0,      // Pinned for exactly one viewport height (1 scroll)
      scrubSmoothingLag: 0.85,        // 0.8 to 1.0 second smoothing lag
      clusterPerspective: 1200,       // 3D perspective ~1200px
      clusterPivot: "14% 52%",        // Prism pivot origin
      oversizeBoardRatio: 1.70,       // 160% to 180% oversized board centered on hero
      // Clockwise cluster rotation checkpoint angles:
      rot0PctDeg: 0,
      rot25PctDeg: 28.5,              // ~25%: tip pushes right/down, bright diagonal edge roughly level
      rot50PctDeg: 43.0,              // ~50%: turned 40 to 45 deg, edge descends to the right
      rot75PctDeg: 55.0,
      rot100PctDeg: 65.0,             // 100%: turned 60 to 70 deg total
      // Gentle cluster scale-up: 1.0 to about 1.2
      scale0Pct: 1.0,
      scale25Pct: 1.06,
      scale50Pct: 1.12,
      scale75Pct: 1.16,
      scale100Pct: 1.20,
      // Cluster translational drift:
      driftX25Ratio: 0.035,
      driftY25Ratio: 0.025,
      driftX50Ratio: 0.070,
      driftY50Ratio: 0.050,
      driftX100Ratio: 0.095,
      driftY100Ratio: 0.075,
      // Spec 3: Headline drift and fade (SHARP text, 0 blur)
      headlineFadeExit: 0.45,         // Fade smoothly to zero opacity by about 45%
      scrollCueFadeExit: 0.18,        // Scroll cue fades first
      ctaFadeExit: 0.28,              // Button fades second
      headlineDriftY: 70,             // Upward drift of 60 to 80px (70px)
      headlineMaxBlur: 0,             // Spec 3: text stays SHARP the whole time, NO BLUR AT ALL
      // Spec 3: Next section off-white curtain rise
      curtainStartProgress: 0.04,     // Starts rising as soon as scrolling begins
      curtainFullProgress: 1.00,      // Covers hero while blocks are turning
      curtainEndPercent: 22,          // Rises to cover bottom 78%, keeping top right silver triangle visible
      // Spec 2: Silver facet top-right anchor drifts (turns clockwise with cluster, point straight down)
      silverX25Ratio: -0.149,
      silverY25Ratio: -0.585,
      silverX50Ratio: -0.444,
      silverY50Ratio: -1.015,
      silverX75Ratio: -0.725,
      silverY75Ratio: -1.083,
      silverX100Ratio: -0.826,
      silverY100Ratio: -0.822,
    },
    mobile: {
      pinHeightMultiplier: 1.0,
      scrubSmoothingLag: 0.70,
      clusterPerspective: 1000,
      clusterPivot: "20% 50%",
      oversizeBoardRatio: 1.50,
      rot0PctDeg: 0,
      rot25PctDeg: 18.0,
      rot50PctDeg: 28.0,
      rot75PctDeg: 36.0,
      rot100PctDeg: 44.0,
      scale0Pct: 1.0,
      scale25Pct: 1.04,
      scale50Pct: 1.08,
      scale75Pct: 1.11,
      scale100Pct: 1.14,
      driftX25Ratio: 0.02,
      driftY25Ratio: 0.015,
      driftX50Ratio: 0.04,
      driftY50Ratio: 0.03,
      driftX100Ratio: 0.06,
      driftY100Ratio: 0.045,
      headlineFadeExit: 0.42,
      scrollCueFadeExit: 0.15,
      ctaFadeExit: 0.25,
      headlineDriftY: 45,
      headlineMaxBlur: 0,             // Sharp text, no blur
      curtainStartProgress: 0.04,
      curtainFullProgress: 1.00,
      curtainEndPercent: 22,
      silverX25Ratio: -0.10,
      silverY25Ratio: -0.40,
      silverX50Ratio: -0.30,
      silverY50Ratio: -0.70,
      silverX75Ratio: -0.50,
      silverY75Ratio: -0.75,
      silverX100Ratio: -0.60,
      silverY100Ratio: -0.60,
    },
  },

  // Navigation Dimensions & Transitions (Spec 4: Unchanged)
  nav: {
    logoWidthDesktop: 245,            // 230 to 260px wide on desktop
    logoWidthMobile: 175,
    pillHeightDesktop: 80,            // 76 to 84px pill height
    pillHeightMobile: 64,
    scrollThresholdPx: 50,            // 40 to 60px of scroll
    transitionDurationMs: 350,        // 300 to 400ms transition
  },
};
