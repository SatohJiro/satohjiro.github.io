"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { awardsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { ChapterHeader } from "../editorial/ChapterHeader";
import { Reveal } from "../editorial/Reveal";
import { telemetry } from "@/lib/telemetry";

export function AwardsSection() {
  const { isVi } = useLanguage();

  const handleRowClick = (awardId: string) => {
    telemetry.track("click", `award_row_${awardId}`);
  };

  return (
    <section id="awards" className="relative scroll-mt-20 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[92rem]">
        <Reveal>
          <ChapterHeader id="awards" />
        </Reveal>

        {/* Honors ledger */}
        <div className="mt-10">
          {/* Ledger column labels */}
          <div
            aria-hidden="true"
            className="hidden border-b border-[var(--ed-hairline)] pb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ed-muted)] md:grid md:grid-cols-[110px_1fr_auto] md:gap-8"
          >
            <span>{isVi ? "Năm" : "Year"}</span>
            <span>{isVi ? "Vinh danh" : "Honor"}</span>
            <span className="text-right">{isVi ? "Đơn vị" : "Organization"}</span>
          </div>

          <ol>
            {awardsData.map((award, i) => {
              const isTop = award.id === "valedictorian";
              return (
                <Reveal as="li" key={award.id} delay={Math.min(i, 2) * 70}>
                  <article
                    onClick={() => handleRowClick(award.id)}
                    className={`group grid cursor-default gap-3 border-b border-[var(--ed-hairline)] py-7 transition-colors hover:bg-blue-500/[0.04] md:grid-cols-[110px_1fr_auto] md:gap-8 md:py-8 ${
                      isTop ? "border-l-2 border-l-blue-600 pl-4 md:pl-6" : ""
                    }`}
                  >
                    {/* Year + index */}
                    <div className="flex items-baseline gap-3 md:block">
                      <div className="font-display text-2xl font-bold tracking-tight text-[var(--ed-ink)] md:text-3xl">
                        {award.year}
                      </div>
                      <div className="font-mono text-xs text-[var(--ed-muted)]">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Honor */}
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <h3 className="font-display text-xl font-bold tracking-tight text-[var(--ed-ink)] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 md:text-2xl">
                          {resolveLocale(award.title, isVi)}
                        </h3>
                        {isTop && (
                          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
                            {isVi ? "Vinh dự cao nhất" : "Highest distinction"}
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 font-mono text-xs text-blue-600 dark:text-blue-400">
                        {resolveLocale(award.badgeText, isVi)}
                      </div>
                      <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-[var(--ed-muted)]">
                        {resolveLocale(award.description, isVi)}
                      </p>
                    </div>

                    {/* Organization */}
                    <div className="flex items-start justify-between gap-4 md:flex-col md:items-end md:justify-start md:text-right">
                      <span className="max-w-[220px] font-mono text-xs leading-relaxed text-[var(--ed-muted)]">
                        {resolveLocale(award.organization, isVi)}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--ed-muted)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600 group-hover:opacity-100" />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
