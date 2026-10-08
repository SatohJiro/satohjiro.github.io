"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/editorial/SiteHeader";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { CommandPalette } from "@/components/editorial/CommandPalette";
import { usePaletteCommands } from "@/hooks/usePaletteCommands";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
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

  const { paletteOpen, setPaletteOpen, openPalette, commands, toast } =
    usePaletteCommands(() => setIsResumeModalOpen(true));

  useEffect(() => {
    // Initial page view telemetry
    telemetry.track("page_view", "homepage");
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--ed-paper)] text-[var(--ed-ink)] selection:bg-blue-600 selection:text-white">
      <div className="ed-grain" aria-hidden="true" />

      <SiteHeader onOpenPalette={openPalette} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <EditorialHero onOpenResume={() => setIsResumeModalOpen(true)} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AwardsSection />
        <ContactSection />
      </main>

      <Footer
        onOpenPrivacyDrawer={() => setIsPrivacyDrawerOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Command palette */}
      <CommandPalette
        key={paletteOpen ? "palette-open" : "palette-closed"}
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full border border-[var(--ed-hairline)] bg-[var(--ed-ink)] px-5 py-2.5 font-mono text-xs text-[var(--ed-paper)] shadow-xl">
          {toast}
        </div>
      )}

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
