import React from "react";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import ProblemSection from "@/components/ui/ProblemSection";
import PlatformSection from "@/components/ui/PlatformSection";
import WorkflowSection from "@/components/ui/WorkflowSection";
import EnterpriseSection from "@/components/ui/EnterpriseSection";
import FAQSection from "@/components/ui/FAQSection";
import Footer from "@/components/ui/Footer";
import LuminousBackground from "@/components/ui/LuminousBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* Wrapper holding all sections below the hero */}
      <div id="sections-below-hero" className="relative z-20 w-full">
        {/* Screen-anchored luminous background */}
        <LuminousBackground />

        {/* Content sections */}
        <div className="relative z-10">
          <ProblemSection />
          <PlatformSection />
          <WorkflowSection />
          <EnterpriseSection />
          <FAQSection />
        </div>
      </div>
      <Footer />
    </main>
  );
}
