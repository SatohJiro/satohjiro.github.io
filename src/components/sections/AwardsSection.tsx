"use client";

/**
 * AwardsSection (Your Name theme) — 輝 brilliance.
 *
 * An editorial honors ledger: numbered rows with hairline dividers,
 * generous whitespace, no icon badges or pill tags. It reads like a
 * printed record, not a template.
 */

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { awardsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeading } from "@/components/yourname/SectionHeading";
import { Reveal } from "@/components/yourname/Reveal";
import { BraidedCord } from "@/components/yourname/BraidedCord";

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

        <ol className="mt-6">
          {awardsData.map((a, i) => (
            <Reveal key={a.id} delay={i * 80}>
              <li className="grid gap-3 border-t border-[#e8dcc8]/15 py-7 sm:grid-cols-[88px_1fr] sm:gap-8">
                <div className="flex items-baseline gap-4 sm:block">
                  <p className="font-mono text-base text-[#f7b267]">{a.year}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#e8dcc8]/40 sm:mt-2">
                    {t({ en: "No.", vi: "Số" })} {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="min-w-0">
                  <h3 className="yn-display text-2xl leading-snug text-[#fdf6ec]">
                    {resolveLocale(a.title, isVi)}
                  </h3>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.16em] text-[#e8dcc8]/55">
                    {resolveLocale(a.organization, isVi)}
                  </p>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#e8dcc8]/80">
                    {resolveLocale(a.description, isVi)}
                  </p>
                  <p className="mt-3 font-mono text-xs text-[#f7b267]/70">
                    {resolveLocale(a.badgeText, isVi)}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="border-t border-[#e8dcc8]/15" />

        <BraidedCord className="mt-16" />
      </div>
    </section>
  );
}
