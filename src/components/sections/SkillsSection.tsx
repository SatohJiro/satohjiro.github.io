"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { Search } from "lucide-react";
import { telemetry } from "@/lib/telemetry";
import { ChapterHeader } from "../editorial/ChapterHeader";
import { Reveal } from "../editorial/Reveal";

export function SkillsSection() {
  const { isVi } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    telemetry.track("click", `filter_skills_${id}`);
  };

  const displayedCategories = skillsData
    .filter((cat) => {
      if (selectedCategory === "all") return true;
      return cat.id === selectedCategory;
    })
    .map((cat) => {
      if (!searchQuery.trim()) return cat;
      const q = searchQuery.toLowerCase();
      const filteredSkills = cat.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          resolveLocale(s.description, isVi).toLowerCase().includes(q)
      );
      return { ...cat, skills: filteredSkills };
    })
    .filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="relative scroll-mt-20 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[92rem]">
        <Reveal>
          <ChapterHeader id="skills" />
        </Reveal>

        {/* Filter index + search */}
        <Reveal delay={60}>
          <div className="mt-8 flex flex-col gap-4 border-b border-[var(--ed-hairline)] pb-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <button
                onClick={() => handleCategorySelect("all")}
                className={`font-mono text-sm transition-colors cursor-pointer ${
                  selectedCategory === "all"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-[var(--ed-muted)] hover:text-[var(--ed-ink)]"
                }`}
                aria-pressed={selectedCategory === "all"}
              >
                <span className={selectedCategory === "all" ? "underline decoration-2 underline-offset-8" : ""}>
                  {isVi ? "Tất cả" : "All"}
                </span>
              </button>
              {skillsData.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`font-mono text-sm transition-colors cursor-pointer ${
                      isSelected
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-[var(--ed-muted)] hover:text-[var(--ed-ink)]"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className={isSelected ? "underline decoration-2 underline-offset-8" : ""}>
                      {resolveLocale(cat.label, isVi).split("(")[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ed-muted)]" />
              <input
                type="text"
                placeholder={isVi ? "Tìm kiếm kỹ năng…" : "Search skills…"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-[var(--ed-hairline)] bg-transparent py-2 pl-9 pr-3 font-mono text-xs text-[var(--ed-ink)] outline-none placeholder:text-[var(--ed-muted)] focus:border-blue-500/60"
                aria-label={isVi ? "Tìm kiếm kỹ năng" : "Search skills"}
              />
            </div>
          </div>
        </Reveal>

        {/* Skill index */}
        <div className="mt-10 grid grid-cols-1 gap-px border border-[var(--ed-hairline)] bg-[var(--ed-hairline)] md:grid-cols-2">
          {displayedCategories.map((category, ci) => (
            <Reveal key={category.id} delay={Math.min(ci, 3) * 60} className="bg-[var(--ed-paper)]">
              <div className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--ed-hairline)] pb-4">
                  <h3 className="font-display text-lg font-bold tracking-tight text-[var(--ed-ink)]">
                    {resolveLocale(category.label, isVi)}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-[var(--ed-muted)]">
                    {category.skills.length} {isVi ? "mục" : "items"}
                  </span>
                </div>
                {category.description && (
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--ed-muted)]">
                    {resolveLocale(category.description, isVi)}
                  </p>
                )}

                <ol className="mt-5 flex-1 space-y-0 border-t border-[var(--ed-hairline)]">
                  {category.skills.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      className="border-b border-[var(--ed-hairline)] py-3.5 transition-colors hover:bg-blue-500/[0.04]"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold text-[var(--ed-ink)]">
                          {skill.name}
                        </span>
                        {skill.tag && (
                          <span
                            className={`shrink-0 font-mono text-[11px] ${
                              skill.highlight
                                ? "font-semibold text-blue-600 dark:text-blue-400"
                                : "text-[var(--ed-muted)]"
                            }`}
                          >
                            {resolveLocale(skill.tag, isVi)}
                          </span>
                        )}
                      </div>
                      {skill.description && (
                        <p className="mt-1 text-[13px] leading-relaxed text-[var(--ed-muted)]">
                          {resolveLocale(skill.description, isVi)}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
