"use client";

import React, { useEffect } from "react";
import { BeatSyncProvider } from "@/components/yourname/BeatSyncProvider";
import { TwilightSky } from "@/components/yourname/TwilightSky";
import { MusicControl } from "@/components/yourname/MusicControl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { telemetry } from "@/lib/telemetry";

export default function HomePage() {
  useEffect(() => {
    telemetry.track("page_view", "homepage-yourname");
  }, []);

  return (
    <BeatSyncProvider>
      <div className="yn-grain relative min-h-screen">
        {/* Cinematic twilight sky canvas (fixed background) */}
        <TwilightSky />

        <Navbar />
        <MusicControl />

        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <AwardsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </BeatSyncProvider>
  );
}
