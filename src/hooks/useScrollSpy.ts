"use client";

import { useEffect, useState, useRef } from "react";
import { telemetry } from "@/lib/telemetry";

export function useScrollSpy(sectionIds: string[], defaultSection: string = "home"): string {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);
  const lastActiveRef = useRef<string>(defaultSection);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section with highest intersection ratio
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio or pick the top one
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const currentId = visibleEntries[0].target.id;
          if (currentId && currentId !== lastActiveRef.current) {
            lastActiveRef.current = currentId;
            setActiveSection(currentId);
            telemetry.track("section_view", currentId);
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.2, 0.5, 0.8],
      }
    );

    const elements: HTMLElement[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        elements.push(el);
        observer.observe(el);
      }
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}

