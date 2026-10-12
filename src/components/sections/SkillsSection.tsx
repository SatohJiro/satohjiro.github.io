"use client";

/**
 * SkillsSection (Your Name theme) — 技 skill.
 * Category cards with twilight skill chips.
 */

import React from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeading } from "@/components/yourname/SectionHeading";
import { Reveal } from "@/components/yourname/Reveal";
import { BraidedCord } from "@/components/yourname/BraidedCord";

export function SkillsSection() {
  const { isVi, t } = useLanguage();

  return (
    <section id="skills" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            accent="技"
            accentReading="waza — skill"
            eyebrow={t({ en: "chapter four", vi: "chương bốn" })}
            title={t({ en: "Skills", vi: "Kỹ năng" })}
            description={t({
              en: "The tools I reach for when the sky calls for something new.",
              vi: "Những công cụ tôi dùng mỗi khi bầu trời gọi một điều mới mẻ.",
            })}
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {skillsData.map((cat, ci) => (
            <Reveal key={cat.id} delay={(ci % 2) * 90}>
              <div className="yn-card h-full p-6 sm:p-7">
                <h3 className="yn-display text-xl text-[#fdf6ec]">
                  {resolveLocale(cat.label, isVi)}
                </h3>
                {cat.description && (
                  <p className="mt-1 text-sm text-[#e8dcc8]/70">
                    {resolveLocale(cat.description, isVi)}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      title={s.description ? resolveLocale(s.description, isVi) : s.name}
                      className={`yn-tag inline-flex items-center gap-1.5 ${
                        s.highlight ? "!border-[#f7b267]/70 !bg-[#f7b267]/15 !text-[#ffd9a0]" : ""
                      }`}
                    >
                      {s.highlight && <Sparkles className="h-3 w-3" aria-hidden="true" />}
                      {s.name}
                      {s.tag && (
                        <span className="opacity-70">· {resolveLocale(s.tag, isVi)}</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <BraidedCord className="mt-16" />
      </div>
    </section>
  );
}
