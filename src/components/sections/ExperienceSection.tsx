"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { experienceData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { WorkExperience } from "@/types";
import { GlassCard } from "../glass/GlassCard";
import { GlassBadge } from "../glass/GlassBadge";
import { TrendingUp } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function ExperienceSection() {
  const { isVi } = useLanguage();
  const [activeExpId, setActiveExpId] = useState<string>(experienceData[0].id);

  const activeExp =
    experienceData.find((exp) => exp.id === activeExpId) || experienceData[0];

  const handleSelectExp = (exp: WorkExperience) => {
    setActiveExpId(exp.id);
    telemetry.track("click", `select_experience_${exp.id}`, { company: exp.company });
  };

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? (
              <>
                Kinh Nghiệm & <span className="text-gradient">Dấu Ấn Kỹ Thuật</span>
              </>
            ) : (
              <>
                Work Experience & <span className="text-gradient">Engineering Track Record</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {isVi
              ? "Hơn 3 năm kinh nghiệm lập trình thực tế qua các môi trường doanh nghiệp Nhật Bản, SaaS CRM và dự án AI."
              : "Over 3 years of software development experience across enterprise Japanese clients, SaaS platforms, and AI tools."}
          </p>
        </div>

        {/* Layout: Sidebar Tabs (Company list) + Active Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Company Tabs */}
          <div className="lg:col-span-4 space-y-3">
            {experienceData.map((exp) => {
              const isSelected = exp.id === activeExpId;
              const locationStr = resolveLocale(exp.location, isVi);
              return (
                <button
                  key={exp.id}
                  onClick={() => handleSelectExp(exp)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-white dark:bg-slate-900/90 border-blue-500/50 shadow-md ring-1 ring-blue-500/20"
                      : "bg-slate-50/70 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 hover:bg-white/80 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      {exp.company}
                    </div>
                    {exp.current && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30 font-mono">
                        {isVi ? "Hiện tại" : "Current"}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                    {resolveLocale(exp.title, isVi)}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2.5 pt-2 border-t border-slate-200/60 dark:border-white/5">
                    <span>{resolveLocale(exp.duration, isVi)}</span>
                    <span>·</span>
                    <span>{locationStr.split(",")[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Experience View */}
          <div className="lg:col-span-8">
            <GlassCard className="p-6 sm:p-8 space-y-6 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70" glowColor="none">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {resolveLocale(activeExp.title, isVi)}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                    {activeExp.company} • {resolveLocale(activeExp.location, isVi)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-mono">
                    {resolveLocale(activeExp.duration, isVi)}
                  </span>
                </div>
              </div>

              {/* Project Highlights inside this Experience */}
              <div className="space-y-5">
                {activeExp.projectHighlights.map((proj, pIdx) => (
                  <div key={pIdx} className="space-y-3.5 p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {proj.name}
                      </h4>
                      {proj.client && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {resolveLocale(proj.client, isVi)}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {resolveLocale(proj.description, isVi)}
                    </p>

                    {/* Key Responsibilities */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {isVi ? "Trách nhiệm chính:" : "Responsibilities:"}
                      </div>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        {proj.responsibilities[isVi ? "vi" : "en"].map((r, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Measurable Impacts */}
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/15 space-y-1">
                      <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3" />
                        <span>{isVi ? "Kết quả đạt được:" : "Impact & Result:"}</span>
                      </div>
                      <ul className="text-xs text-slate-700 dark:text-slate-200 space-y-0.5 pl-4 list-disc">
                        {proj.impacts[isVi ? "vi" : "en"].map((imp, impIdx) => (
                          <li key={impIdx}>{imp}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {proj.technologies.map((t, tIdx) => (
                        <GlassBadge key={tIdx} variant="blue" size="sm">
                          {t}
                        </GlassBadge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
