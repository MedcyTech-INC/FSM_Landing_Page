"use client";

import React, { useState, useEffect } from "react";
import { HERO_CONFIG } from "./heroConfig";

interface HeroWordRotatorProps {
  reduceMotion?: boolean;
}

export default function HeroWordRotator({ reduceMotion = false }: HeroWordRotatorProps) {
  const phrases = HERO_CONFIG.rollingPhrases;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatingState, setAnimatingState] = useState<"idle" | "rolling">("idle");
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!HERO_CONFIG.enableWordRoll || reduceMotion || phrases.length <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      setOutgoingIndex(currentIndex);
      setAnimatingState("rolling");
      setCurrentIndex((prev) => (prev + 1) % phrases.length);

      const endTimer = setTimeout(() => {
        setAnimatingState("idle");
        setOutgoingIndex(null);
      }, HERO_CONFIG.wordRollDuration * 1000);

      return () => clearTimeout(endTimer);
    }, HERO_CONFIG.wordRollInterval);

    return () => clearInterval(intervalId);
  }, [currentIndex, reduceMotion, phrases.length]);

  const currentPhrase = phrases[currentIndex];
  const outgoingPhrase = outgoingIndex !== null ? phrases[outgoingIndex] : null;

  return (
    <span
      id="hero-accent-phrase-wrapper"
      className="inline-block relative align-middle select-none px-1 will-change-transform"
      style={{
        height: "1.25em",
        lineHeight: "1.25em",
        verticalAlign: "-0.16em",
        opacity: 0,
      }}
    >
      {/* Outgoing phrase: drifts up, blurs out, fades to 0 */}
      {animatingState === "rolling" && outgoingPhrase && (
        <span
          key={`out-${outgoingPhrase}`}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            animation: `wordRollExit ${HERO_CONFIG.wordRollDuration}s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
          }}
        >
          <span
            className="font-flaviotte font-medium italic text-white text-[1.09em] whitespace-nowrap"
            style={{
              color: "#FFFFFF",
              textShadow: "none",
              filter: "none",
            }}
          >
            {outgoingPhrase}
          </span>
        </span>
      )}

      {/* Incoming / Static phrase: rises from below, blur-to-sharp crossfade */}
      <span
        key={`in-${currentPhrase}`}
        className="flex items-center justify-center"
        style={{
          animation:
            animatingState === "rolling" && !reduceMotion
              ? `wordRollEnter ${HERO_CONFIG.wordRollDuration}s cubic-bezier(0.22, 1, 0.36, 1) forwards`
              : "none",
        }}
      >
        <span
          className="font-flaviotte font-medium italic text-white text-[1.09em] whitespace-nowrap"
          style={{
            color: "#FFFFFF",
            textShadow: "none",
            filter: "none",
          }}
        >
          {currentPhrase}
        </span>
      </span>

      <style jsx global>{`
        @keyframes wordRollExit {
          0% {
            transform: translateY(0%);
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
            filter: blur(8px);
          }
        }

        @keyframes wordRollEnter {
          0% {
            transform: translateY(100%);
            opacity: 0;
            filter: blur(8px);
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
            filter: blur(0px);
          }
        }
      `}</style>
    </span>
  );
}
