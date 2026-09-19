"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { GlassCard } from "../glass/GlassCard";
import { Search } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

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
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? (
              <>
                Kỹ Năng Kỹ Thuật & <span className="text-gradient">Kinh Nghiệm Thực Tế</span>
              </>
            ) : (
              <>
                Technical Stack & <span className="text-gradient">Applied Experience</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {isVi
              ? "Thế mạnh nòng cốt về Frontend & tối ưu hiệu năng, kết hợp kinh nghiệm thực tế với các kiến trúc Micro-frontend, Backend APIs và tích hợp AI."
              : "Core expertise in frontend engineering and performance optimization, supported by applied experience in micro-frontends, backend APIs, and AI integrations."}
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs (Clean Text Pills, Anti-Slop) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCategorySelect("all")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-xs border border-blue-500/40"
                  : "glass-button text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              {isVi ? "Tất Cả" : "All Categories"}
            </button>
            {skillsData.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-xs border border-blue-500/40"
                      : "glass-button text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  <span>{resolveLocale(cat.label, isVi).split("(")[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isVi ? "Tìm kiếm kỹ năng..." : "Search skills..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500/50 backdrop-blur-md"
            />
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCategories.map((category) => (
            <GlassCard key={category.id} className="p-6 space-y-5 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70" glowColor="none">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div className="space-y-1">
                  <div className="font-bold text-base text-slate-900 dark:text-white">
                    <span>{resolveLocale(category.label, isVi)}</span>
                  </div>
                  {category.description && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {resolveLocale(category.description, isVi)}
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Items in Category */}
              <div className="grid grid-cols-1 gap-3">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 space-y-1.5 hover:border-slate-300 dark:hover:border-white/15 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">
                        {skill.name}
                      </span>
                      {skill.tag && (
                        <span
                          className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border ${
                            skill.highlight
                              ? "bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30"
                              : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10"
                          }`}
                        >
                          {resolveLocale(skill.tag, isVi)}
                        </span>
                      )}
                    </div>

                    {skill.description && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {resolveLocale(skill.description, isVi)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}


