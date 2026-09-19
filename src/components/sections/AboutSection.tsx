"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { summaryData, educationData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { GlassCard } from "../glass/GlassCard";
import { GlassBadge } from "../glass/GlassBadge";

export function AboutSection() {
  const { isVi } = useLanguage();

  const engineeringPillars = [
    {
      index: "01",
      title: {
        en: "Frontend Engineering",
        vi: "Kỹ Thuật Frontend",
      },
      desc: {
        en: "Modular component architecture with ReactJS, Next.js, and Vue.js.",
        vi: "Kiến trúc component module hóa với ReactJS, Next.js và Vue.js.",
      },
    },
    {
      index: "02",
      title: {
        en: "State & Performance",
        vi: "Quản Lý State & Hiệu Năng",
      },
      desc: {
        en: "Scalable store management with Redux Toolkit and Zustand, +30% boost.",
        vi: "Tối ưu hóa state với Redux Toolkit và Zustand, tăng hơn 30% tốc độ.",
      },
    },
    {
      index: "03",
      title: {
        en: "Micro-Frontend & APIs",
        vi: "Micro-Frontend & APIs",
      },
      desc: {
        en: "Experience with micro-frontends (ahamo NTT Docomo) and backend APIs.",
        vi: "Kinh nghiệm thực tế với Micro-frontend (ahamo NTT Docomo) và API backend.",
      },
    },
    {
      index: "04",
      title: {
        en: "AI & Modern Tools",
        vi: "Ứng Dụng AI & Tự Động Hóa",
      },
      desc: {
        en: "Integrated OpenAI GPT-4 with Python FastAPI and RabbitMQ queues.",
        vi: "Tích hợp OpenAI GPT-4 với FastAPI và hàng đợi RabbitMQ.",
      },
    },
  ];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? (
              <>
                Hành Trình Kỹ Thuật & <span className="text-gradient-amber">Nền Tảng Vững Chắc</span>
              </>
            ) : (
              <>
                Engineering Journey & <span className="text-gradient-amber">Core Background</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {isVi
              ? "Tốt nghiệp Thủ khoa ngành CNTT ĐH Nông Lâm TP.HCM kết hợp hơn 3 năm kinh nghiệm thực chiến phát triển ứng dụng Web."
              : "Nong Lam University IT Valedictorian combined with 3+ years of hands-on web software engineering experience."}
          </p>
        </div>

        {/* Story & Education Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Story Narrative */}
          <GlassCard className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70" glowColor="none">
            <div className="border-b border-slate-200/80 dark:border-white/10 pb-4">
              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                {isVi ? "Hồ Sơ Năng Lực" : "Engineering Profile"}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {isVi ? "Tổng Quan Bản Thân" : "Professional Background"}
              </h3>
            </div>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {(isVi ? summaryData.vi : summaryData.en).map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>

            {/* Quick Principles */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">—</span>
                <span>{isVi ? "Ưu tiên Performance & Clean Code" : "Performance & Clean Code first"}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">—</span>
                <span>{isVi ? "Khả năng tự học & thích ứng nhanh" : "Rapid self-learning & adaptation"}</span>
              </div>
            </div>
          </GlassCard>

          {/* Education Highlight Card */}
          <GlassCard className="lg:col-span-5 p-6 sm:p-8 space-y-6 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70" glowColor="none">
            <div className="border-b border-slate-200/80 dark:border-white/10 pb-4">
              <div className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold tracking-wider">
                {isVi ? "Học Vấn Chính Quy" : "Academic Background"}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {resolveLocale(educationData.school, isVi)}
              </h3>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  {isVi ? "Bằng Kỹ Sư Công Nghệ Thông Tin" : "Degree of Engineer in IT"}
                </span>
                <GlassBadge variant="amber" size="sm">GPA 3.6 / 4.0</GlassBadge>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                {resolveLocale(educationData.major, isVi)} • {resolveLocale(educationData.duration, isVi)}
              </div>
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 pt-1">
                {resolveLocale(educationData.honors, isVi)}
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                {isVi ? "Dấu Ấn Nổi Bật" : "Academic Highlights"}
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {(isVi ? educationData.highlights.vi : educationData.highlights.en).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-amber-600 dark:text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </div>

        {/* 4 Pillars (Minimalist Technical Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {engineeringPillars.map((pillar, idx) => (
            <GlassCard
              key={idx}
              className="p-5 space-y-3 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70 relative overflow-hidden group"
              glowColor="none"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                  {pillar.index}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {resolveLocale(pillar.title, isVi)}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {resolveLocale(pillar.desc, isVi)}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
