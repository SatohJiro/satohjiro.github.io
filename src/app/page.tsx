"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GlowSpotlight } from "@/components/glass/GlowSpotlight";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { InteractiveTerminal } from "@/components/sections/InteractiveTerminal";
import { ContactSection } from "@/components/sections/ContactSection";
import { PixelVersionFloatButton } from "@/components/layout/PixelVersionFloatButton";
import { telemetry } from "@/lib/telemetry";

// Code-split heavy modals and drawers to reduce initial bundle and TBT
const PrivacyTelemetryDrawer = dynamic(
  () => import("@/components/analytics/PrivacyTelemetryDrawer").then((mod) => mod.PrivacyTelemetryDrawer),
  { ssr: false }
);

const ResumeModal = dynamic(
  () => import("@/components/resume/ResumeModal").then((mod) => mod.ResumeModal),
  { ssr: false }
);

export default function HomePage() {
  const [isPrivacyDrawerOpen, setIsPrivacyDrawerOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    // Initial page view telemetry
    telemetry.track("page_view", "homepage");
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glow Spotlight & Mesh */}
      <GlowSpotlight />

      {/* Floating Navbar */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-8">
        <HeroSection onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AwardsSection />
        <InteractiveTerminal onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        <ContactSection />
      </main>

      {/* Glass Footer */}
      <Footer
        onOpenPrivacyDrawer={() => setIsPrivacyDrawerOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Modals & Slide-over Drawers */}
      <PrivacyTelemetryDrawer
        isOpen={isPrivacyDrawerOpen}
        onClose={() => setIsPrivacyDrawerOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Floating Launcher to Switch to Pixel RPG Version */}
      <PixelVersionFloatButton />
    </div>
  );
}
