"use client";

import React, { useEffect, useState } from "react";
import isoDesktopData from "@/data/isoSave.json";
import isoMobileData from "@/data/isoSaveVertical.json";
import { renderIsoLayers, IsoAnimData, IsoLayerSvgs } from "@/lib/isoRenderer";
import { HERO_CONFIG } from "./heroConfig";

interface HeroGeometricBlocksProps {
  reduceMotion?: boolean;
}

export default function HeroGeometricBlocks({
  reduceMotion = false,
}: HeroGeometricBlocksProps) {
  const [layers, setLayers] = useState<IsoLayerSvgs | null>(null);

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      const animData = (mobile ? isoMobileData : isoDesktopData) as unknown as IsoAnimData;
      const startFrame = Math.floor(0.15 * (animData.totalFrames - 1)); // Frame 9
      const w = window.innerWidth || 1400;
      const h = window.innerHeight || 800;

      const oversizeRatio = mobile
        ? HERO_CONFIG.travelDistances.mobile.oversizeBoardRatio
        : HERO_CONFIG.travelDistances.desktop.oversizeBoardRatio;

      const rendered = renderIsoLayers(animData, startFrame, w, h, "fc_blk_", oversizeRatio);
      setLayers(rendered);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      style={{
        backgroundColor: HERO_CONFIG.colors.bgNavyTop,
      }}
    >
      {/* 1. Underlying vertical gradient wash: deep navy at top to saturated royal blue at bottom */}
      <div
        id="hero-bg-gradient"
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          opacity: 0, // Master entrance timeline fades it in from 0.3s -> 0.8s
        }}
      >
        <img
          src="/gradient-save.svg"
          alt=""
          className="w-full h-full object-cover select-none"
          loading="eager"
        />
      </div>

      {/* 2. Vector Geometric Block Master 3D Scene (~1200px perspective):
          - hero-blocks-scene provides ~1200px 3D perspective.
          - hero-blocks-entrance-wrap sweeps in on staged load from left.
          - hero-blocks-cluster is the ONE rigid cluster group rotated clockwise scrubbed to scroll.
          - hero-blocks-board is the oversized board (170% width & height) centered on the hero,
            ensuring all facet outlines remain completely whole at every scroll pose without clipping.
          - Facet layers have Z-depth offsets (+60px, 0px, -40px) so nearer facets appear to move faster. */}
      <div
        id="hero-blocks-scene"
        className="absolute inset-0 w-full h-full pointer-events-none z-1"
        style={{
          perspective: `${HERO_CONFIG.travelDistances.desktop.clusterPerspective}px`,
          perspectiveOrigin: "30% 50%",
        }}
      >
        <div
          id="hero-blocks-entrance-wrap"
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
          style={{
            opacity: 1,
            transformStyle: "preserve-3d",
            transition: "none",
          }}
        >
          {/* Rigid 3D Cluster Group: Rotates clockwise as one rigid crystal scrubbed to scroll */}
          <div
            id="hero-blocks-cluster"
            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: HERO_CONFIG.travelDistances.desktop.clusterPivot,
              transition: "none",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Spec 2: Oversized board (~160 to 180% of viewport width and height, centered on hero)
                Desktop: 170% width & height (-35vw, -35vh)
                Mobile: 150% width & height (-25vw, -25vh) */}
            <div
              id="hero-blocks-board"
              className="absolute pointer-events-none w-[150vw] h-[150vh] -left-[25vw] -top-[25vh] md:w-[170vw] md:h-[170vh] md:-left-[35vw] md:-top-[35vh]"
              style={{
                transformStyle: "preserve-3d",
                overflow: "visible",
              }}
            >
              {/* Left Side Blocks: large dark left prism & small cluster, glides in from left */}
              <div
                id="hero-left-side-blocks"
                className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  opacity: 0,
                  transform: "translateX(-140px)",
                }}
              >
                {/* Layer C: Small bottom-left triangle cluster (Z: -40px background) */}
                <div
                  id="layer-bottom-cluster"
                  className="absolute inset-0 w-full h-full pointer-events-none will-change-transform z-[1]"
                  style={{
                    transform: "translateZ(-40px)",
                    transformStyle: "preserve-3d",
                    transition: "none",
                    overflow: "visible",
                  }}
                  dangerouslySetInnerHTML={layers ? { __html: layers.clusterSvg } : undefined}
                />

                {/* Layer A: Large dark left prism (Z: +60px foreground, nearer facet moves faster) */}
                <div
                  id="layer-left-prism"
                  className="absolute inset-0 w-full h-full pointer-events-none will-change-transform z-[3]"
                  style={{
                    transform: "translateZ(60px)",
                    transformStyle: "preserve-3d",
                    transition: "none",
                    overflow: "visible",
                  }}
                  dangerouslySetInnerHTML={layers ? { __html: layers.leftPrismSvg } : undefined}
                />
              </div>

              {/* Right Side Block: silver-grey top-right facet, glides in from right */}
              <div
                id="hero-right-side-blocks"
                className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  opacity: 0,
                  transform: "translateX(140px)",
                }}
              >
                {/* Layer B: Silver-grey top-right facet (Z: 0px midground) */}
                <div
                  id="layer-silver-facet"
                  className="absolute inset-0 w-full h-full pointer-events-none will-change-transform z-[2]"
                  style={{
                    transform: "translateZ(0px)",
                    transformStyle: "preserve-3d",
                    transition: "none",
                    overflow: "visible",
                  }}
                  dangerouslySetInnerHTML={layers ? { __html: layers.silverSvg } : undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deep navy multiply wash at the top for navbar contrast and velvety depth */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13, 25, 58, 0.96) 0%, rgba(16, 25, 49, 0.85) 20%, rgba(17, 37, 87, 0.3) 48%, transparent 70%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* 4. Subtle luminous bottom glow so center and bottom of hero glow rich royal blue */}
      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[90vw] h-[45vh] rounded-full blur-[110px] pointer-events-none z-1 opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(41, 88, 209, 0.55) 0%, rgba(37, 99, 235, 0.25) 50%, transparent 80%)",
        }}
      />
    </div>
  );
}
