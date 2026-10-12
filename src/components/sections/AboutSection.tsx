"use client";

/**
 * AboutSection (Your Name theme) — 時間 time.
 * Summary, engineering pillars and education, wrapped in twilight cards.
 */

import React from "react";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { summaryData, educationData, statsData } from "@/data/portfolio-content";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { SectionHeading } from "@/components/yourname/SectionHeading";
import { Reveal } from "@/components/yourname/Reveal";
import { BraidedCord } from "@/components/yourname/BraidedCord";

export function AboutSection() {
  const { isVi, t } = useLanguage();

  const pillars = [
    {
      index: "01",
      title: { en: "Frontend Engineering", vi: "Kỹ Thuật Frontend" },
      desc: {
        en: "Modular component architecture with ReactJS, Next.js, and Vue.js.",
        vi: "Kiến trúc component module hóa với ReactJS, Next.js và Vue.js.",
      },
    },
    {
      index: "02",
      title: { en: "State & Performance", vi: "Quản Lý State & Hiệu Năng" },
      desc: {
        en: "Measured optimization — profiling, memoization, zero-regression releases.",
        vi: "Tối ưu có đo lường — profiling, memoization, release không lỗi hồi quy.",
      },
    },
    {
      index: "03",
      title: { en: "Backend & AI", vi: "Backend & AI" },
      desc: {
        en: "Spring Boot, FastAPI services and applied GPT-4 integrations.",
        vi: "Spring Boot, FastAPI và ứng dụng tích hợp GPT-4 thực tiễn.",
      },
    },
  ];

  const stats = [
    { value: statsData.yearsExperience, label: { en: "Years experience", vi: "Năm kinh nghiệm" } },
    { value: statsData.gpa, label: { en: "GPA — Excellent", vi: "GPA — Xuất sắc" } },
    { value: statsData.valedictorianRank, label: { en: "Class valedictorian", vi: "Thủ khoa toàn khóa" } },
    { value: statsData.performanceGain, label: { en: "Perf. improvement", vi: "Cải thiện hiệu năng" } },
  ];

  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            accent="時間"
            accentReading="jikan — time"
            eyebrow={t({ en: "chapter one", vi: "chương một" })}
            title={t({ en: "About", vi: "Giới thiệu" })}
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2" delay={80}>
            <div className="yn-card h-full p-8">
              <h3 className="yn-display mb-5 text-2xl text-[#fdf6ec]">
                {t({ en: "The story so far", vi: "Câu chuyện đến hiện tại" })}
              </h3>
              <div className="space-y-4 text-[15px] leading-relaxed text-[#e8dcc8]/90">
                {resolveLocaleArray(summaryData, isVi).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.value} className="text-center">
                    <div className="yn-display text-2xl text-[#f7b267]">{s.value}</div>
                    <div className="mt-1 text-xs text-[#e8dcc8]/70">{t(s.label)}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="yn-card h-full p-8">
              <div className="mb-4 flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-[#f7b267]" aria-hidden="true" />
                <h3 className="yn-display text-2xl text-[#fdf6ec]">
                  {t({ en: "Education", vi: "Học vấn" })}
                </h3>
              </div>
              <p className="font-medium text-[#fdf6ec]">{resolveLocale(educationData.school, isVi)}</p>
              <p className="mt-1 text-sm text-[#e8dcc8]/80">{resolveLocale(educationData.degree, isVi)}</p>
              <p className="mt-1 text-sm text-[#e8dcc8]/80">
                {resolveLocale(educationData.major, isVi)} · {resolveLocale(educationData.duration, isVi)}
              </p>
              <p className="yn-tag mt-4 inline-block">{resolveLocale(educationData.gpa, isVi)}</p>
              <p className="mt-3 text-sm font-medium text-[#f7b267]">
                {resolveLocale(educationData.honors, isVi)}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.index} delay={i * 90}>
              <div className="yn-card yn-card-interactive h-full p-6">
                <div className="yn-display text-3xl text-[#d8364f]/90">{p.index}</div>
                <h4 className="mt-3 text-lg font-semibold text-[#fdf6ec]">{t(p.title)}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#e8dcc8]/80">{t(p.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <BraidedCord className="mt-16" />
      </div>
    </section>
  );
}
