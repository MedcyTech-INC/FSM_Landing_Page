import React from "react";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import ProblemSection from "@/components/ui/ProblemSection";
import PlatformSection from "@/components/ui/PlatformSection";
import WorkflowSection from "@/components/ui/WorkflowSection";
import EnterpriseSection from "@/components/ui/EnterpriseSection";
import FAQSection from "@/components/ui/FAQSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProblemSection />
      <PlatformSection />
      <WorkflowSection />
      <EnterpriseSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
