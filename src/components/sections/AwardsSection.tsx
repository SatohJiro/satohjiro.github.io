"use client";

/**
 * AwardsSection (Your Name theme) — 輝 brilliance.
 * Honors ledger under the twilight sky.
 */

import React from "react";
import { Trophy, Sparkles, Medal, Award } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { awardsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeading } from "@/components/yourname/SectionHeading";
import { Reveal } from "@/components/yourname/Reveal";
import { BraidedCord } from "@/components/yourname/BraidedCord";

const ICONS: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="h-6 w-6" aria-hidden="true" />,
  Sparkles: <Sparkles className="h-6 w-6" aria-hidden="true" />,
  Medal: <Medal className="h-6 w-6" aria-hidden="true" />,
};

export function AwardsSection() {
  const { isVi, t } = useLanguage();

  return (
    <section id="awards" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHeading
            accent="輝"
            accentReading="kagayaki — brilliance"
            eyebrow={t({ en: "chapter five", vi: "chương năm" })}
            title={t({ en: "Honors", vi: "Vinh danh" })}
          />
        </Reveal>

        <div className="space-y-5">
          {awardsData.map((a, i) => (
            <Reveal key={a.id} delay={i * 80}>
              <article className="yn-card yn-card-interactive flex gap-5 p-6 sm:p-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d8364f] to-[#e0705a] text-white shadow-[0_8px_24px_-6px_rgba(216,54,79,0.7)]">
                  {ICONS[a.iconName] ?? <Award className="h-6 w-6" aria-hidden="true" />}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="yn-display text-xl text-[#fdf6ec]">
                      {resolveLocale(a.title, isVi)}
                    </h3>
                    <span className="font-mono text-xs text-[#f7b267]/80">{a.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#e8dcc8]/75">
                    {resolveLocale(a.organization, isVi)}
                  </p>
                  <p className="yn-tag mt-3 inline-block">{resolveLocale(a.badgeText, isVi)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#e8dcc8]/85">
                    {resolveLocale(a.description, isVi)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <BraidedCord className="mt-16" />
      </div>
    </section>
  );
}
