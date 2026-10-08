"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { summaryData, educationData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { ChapterHeader } from "../editorial/ChapterHeader";
import { Reveal } from "../editorial/Reveal";

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

  const principles = [
    isVi ? "Ưu tiên Performance & Clean Code" : "Performance & Clean Code first",
    isVi ? "Khả năng tự học & thích ứng nhanh" : "Rapid self-learning & adaptation",
  ];

  return (
    <section id="about" className="relative scroll-mt-20 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[92rem]">
        <Reveal>
          <ChapterHeader id="about" />
        </Reveal>

        {/* Story & Education */}
        <div className="mt-10 grid grid-cols-1 gap-px border border-[var(--ed-hairline)] bg-[var(--ed-hairline)] lg:grid-cols-12">
          {/* Main story */}
          <Reveal className="bg-[var(--ed-paper)] p-6 sm:p-10 lg:col-span-7">
            <div className="border-b border-[var(--ed-hairline)] pb-5">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                {isVi ? "Hồ Sơ Năng Lực" : "Engineering Profile"}
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--ed-ink)]">
                {isVi ? "Tổng Quan Bản Thân" : "Professional Background"}
              </h3>
            </div>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--ed-muted)]">
              {(isVi ? summaryData.vi : summaryData.en).map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>

            <ul className="mt-7 space-y-2 border-t border-[var(--ed-hairline)] pt-5">
              {principles.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 text-sm font-medium text-[var(--ed-ink)]"
                >
                  <span className="mt-0.5 font-mono text-xs text-blue-600 dark:text-blue-400">▸</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Education */}
          <Reveal delay={80} className="bg-[var(--ed-paper)] p-6 sm:p-10 lg:col-span-5">
            <div className="border-b border-[var(--ed-hairline)] pb-5">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                {isVi ? "Học Vấn Chính Quy" : "Academic Background"}
              </div>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-[var(--ed-ink)]">
                {resolveLocale(educationData.school, isVi)}
              </h3>
            </div>

            <div className="mt-6 border-y border-[var(--ed-hairline)] py-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-base font-bold text-[var(--ed-ink)]">
                  {isVi ? "Bằng Kỹ Sư Công Nghệ Thông Tin" : "Degree of Engineer in IT"}
                </span>
                <span className="shrink-0 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                  GPA 3.6/4.0
                </span>
              </div>
              <div className="mt-2 font-mono text-xs text-[var(--ed-muted)]">
                {resolveLocale(educationData.major, isVi)} · {resolveLocale(educationData.duration, isVi)}
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                {resolveLocale(educationData.honors, isVi)}
              </div>
            </div>

            <div className="mt-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                {isVi ? "Dấu Ấn Nổi Bật" : "Academic Highlights"}
              </div>
              <ul className="mt-3 space-y-2">
                {(isVi ? educationData.highlights.vi : educationData.highlights.en).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[var(--ed-muted)]">
                    <span className="mt-0.5 font-mono text-xs text-blue-600 dark:text-blue-400">▸</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* 4 pillars — hairline index grid */}
        <Reveal delay={120}>
          <div className="mt-px grid grid-cols-1 border border-[var(--ed-hairline)] bg-[var(--ed-hairline)] gap-px sm:grid-cols-2 lg:grid-cols-4">
            {engineeringPillars.map((pillar) => (
              <div
                key={pillar.index}
                className="group bg-[var(--ed-paper)] p-6 transition-colors hover:bg-blue-500/[0.04]"
              >
                <div className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {pillar.index}
                </div>
                <h4 className="mt-3 font-display text-base font-bold tracking-tight text-[var(--ed-ink)]">
                  {resolveLocale(pillar.title, isVi)}
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--ed-muted)]">
                  {resolveLocale(pillar.desc, isVi)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
