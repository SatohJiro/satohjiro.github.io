"use client";

/**
 * ExperienceSection (Your Name theme) — 軌跡 trajectory.
 * Vertical twilight timeline of work experience.
 */

import React from "react";
import { MapPin, Briefcase } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { experienceData } from "@/data/portfolio-content";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { SectionHeading } from "@/components/yourname/SectionHeading";
import { Reveal } from "@/components/yourname/Reveal";
import { BraidedCord, CordKnot } from "@/components/yourname/BraidedCord";

export function ExperienceSection() {
  const { isVi, t } = useLanguage();

  return (
    <section id="experience" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHeading
            accent="軌跡"
            accentReading="kiseki — trajectory"
            eyebrow={t({ en: "chapter two", vi: "chương hai" })}
            title={t({ en: "Experience", vi: "Kinh nghiệm" })}
            description={t({
              en: "Every project a station passed; every release a sky crossed.",
              vi: "Mỗi dự án là một ga đã qua; mỗi lần release là một bầu trời đã vượt.",
            })}
          />
        </Reveal>

        <div className="relative space-y-8 before:absolute before:bottom-4 before:left-[7px] before:top-4 before:w-px before:bg-gradient-to-b before:from-[#f7b267]/60 before:via-[#d8364f]/50 before:to-transparent">
          {experienceData.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 80}>
              <article className="relative pl-10">
                <span className="absolute left-0 top-2">
                  <CordKnot />
                </span>
                <div className="yn-card yn-card-interactive p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <Briefcase className="h-5 w-5 text-[#f7b267]" aria-hidden="true" />
                    <h3 className="yn-display text-xl text-[#fdf6ec] sm:text-2xl">
                      {resolveLocale(exp.title, isVi)}
                    </h3>
                    {exp.current && (
                      <span className="yn-tag">{t({ en: "Current", vi: "Hiện tại" })}</span>
                    )}
                  </div>
                  <p className="mt-2 font-medium text-[#f7b267]">{exp.company}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#e8dcc8]/70">
                    <span>{resolveLocale(exp.duration, isVi)}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {resolveLocale(exp.location, isVi)}
                    </span>
                  </p>
                  <div className="mt-5 space-y-5">
                    {exp.projectHighlights.map((ph) => (
                      <div key={ph.name} className="border-l-2 border-[#d8364f]/40 pl-4">
                        <p className="font-semibold text-[#fdf6ec]">{ph.name}</p>
                        <p className="mt-0.5 text-sm text-[#e8dcc8]/75">
                          {resolveLocale(ph.client, isVi)} · {resolveLocale(ph.role, isVi)}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[#e8dcc8]/85">
                          {resolveLocale(ph.description, isVi)}
                        </p>
                        <ul className="mt-3 space-y-1.5">
                          {resolveLocaleArray(ph.responsibilities, isVi).map((r, ri) => (
                            <li key={ri} className="flex gap-2 text-sm text-[#e8dcc8]/80">
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f7b267]/80" aria-hidden="true" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
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
