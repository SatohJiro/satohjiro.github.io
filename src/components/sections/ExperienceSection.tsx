"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { experienceData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { ChapterHeader } from "../editorial/ChapterHeader";
import { Reveal } from "../editorial/Reveal";
import { TrendingUp } from "lucide-react";

export function ExperienceSection() {
  const { isVi } = useLanguage();

  return (
    <section id="experience" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <ChapterHeader id="experience" />
        </Reveal>

        {/* Changelog */}
        <div className="mt-10 border-t border-[var(--ed-hairline)]">
          {experienceData.map((exp, i) => (
            <Reveal key={exp.id} delay={Math.min(i, 2) * 70}>
              <article className="grid gap-5 border-b border-[var(--ed-hairline)] py-9 md:grid-cols-12 md:gap-8">
                {/* Period rail */}
                <div className="md:col-span-3">
                  <div className="font-mono text-sm text-[var(--ed-ink)]">
                    {exp.period}
                  </div>
                  <div className="mt-1 font-mono text-xs text-[var(--ed-muted)]">
                    {resolveLocale(exp.duration, isVi)}
                  </div>
                  {exp.current && (
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      {isVi ? "Hiện tại" : "Current"}
                    </span>
                  )}
                </div>

                {/* Entry body */}
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ed-ink)]">
                    {resolveLocale(exp.title, isVi)}
                  </h3>
                  <div className="mt-1.5 font-mono text-sm text-blue-600 dark:text-blue-400">
                    {exp.company}
                    <span className="text-[var(--ed-muted)]">
                      {" "}
                      — {resolveLocale(exp.location, isVi)}
                    </span>
                  </div>

                  <div className="mt-7 space-y-7">
                    {exp.projectHighlights.map((proj, pIdx) => (
                      <div key={pIdx} className="border-l-2 border-[var(--ed-hairline)] pl-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="font-display text-lg font-bold text-[var(--ed-ink)]">
                            {proj.name}
                          </h4>
                          {proj.client && (
                            <span className="font-mono text-xs text-[var(--ed-muted)]">
                              {resolveLocale(proj.client, isVi)}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-[var(--ed-muted)]">
                          {resolveLocale(proj.description, isVi)}
                        </p>

                        <ul className="mt-3 max-w-3xl space-y-1.5">
                          {proj.responsibilities[isVi ? "vi" : "en"]
                            .slice(0, 3)
                            .map((r, rIdx) => (
                              <li
                                key={rIdx}
                                className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--ed-ink)]/85"
                              >
                                <span className="mt-0.5 font-mono text-xs text-blue-600 dark:text-blue-400">
                                  ▸
                                </span>
                                <span>{r}</span>
                              </li>
                            ))}
                        </ul>

                        {proj.impacts && proj.impacts[isVi ? "vi" : "en"].length > 0 && (
                          <div className="mt-3 flex items-start gap-2 text-sm text-[var(--ed-ink)]/85">
                            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                            <span className="leading-relaxed">
                              {proj.impacts[isVi ? "vi" : "en"][0]}
                            </span>
                          </div>
                        )}

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {proj.technologies.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-[var(--ed-hairline)] px-2 py-0.5 font-mono text-[11px] text-[var(--ed-muted)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
