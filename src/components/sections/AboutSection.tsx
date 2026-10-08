"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { summaryData, educationData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";

export function AboutSection() {
  const { isVi } = useLanguage();

  const pillars = [
    {
      title: { en: "Frontend Engineering", vi: "Kỹ thuật Frontend" },
      desc: {
        en: "Modular architecture with React, Next.js, Vue.",
        vi: "Kiến trúc module với React, Next.js, Vue.",
      },
    },
    {
      title: { en: "State & Performance", vi: "State & Hiệu năng" },
      desc: {
        en: "Redux Toolkit, Zustand. +30% measured gains.",
        vi: "Redux Toolkit, Zustand. +30% đo được.",
      },
    },
    {
      title: { en: "Micro-Frontend", vi: "Micro-Frontend" },
      desc: {
        en: "Production MFEs — ahamo / NTT Docomo.",
        vi: "MFE production — ahamo / NTT Docomo.",
      },
    },
    {
      title: { en: "AI Integration", vi: "Tích hợp AI" },
      desc: {
        en: "GPT-4 + FastAPI + RabbitMQ in prod.",
        vi: "GPT-4 + FastAPI + RabbitMQ production.",
      },
    },
  ];

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeader
        index="01"
        label={isVi ? "Về tôi" : "About"}
        title={isVi ? "Nền tảng" : "Background"}
        desc={
          isVi
            ? "Thủ khoa CNTT ĐH Nông Lâm TP.HCM. Hơn 3 năm xây web app production."
            : "IT valedictorian, Nong Lam University. 3+ years shipping production web apps."
        }
      />

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="swiss-label mb-4">{isVi ? "Hồ sơ" : "Profile"}</div>
          <div className="space-y-5 text-[17px] leading-relaxed tracking-tight">
            {(isVi ? summaryData.vi : summaryData.en).map((para, i) => (
              <p key={i} className={i === 0 ? "text-[22px] font-semibold leading-snug" : ""}>
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border-t-2 border-[#0a0a0a] pt-6">
            <div className="swiss-label swiss-label-red mb-3">{isVi ? "Học vấn" : "Education"}</div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              {resolveLocale(educationData.school, isVi)}
            </h3>
            <p className="mt-2 font-mono text-[13px] text-[#6b6b6b]">
              {resolveLocale(educationData.major, isVi)} · {resolveLocale(educationData.duration, isVi)}
            </p>
            <p className="mt-3 inline-block bg-[#0a0a0a] px-3 py-1.5 font-mono text-[13px] font-semibold text-white">
              GPA 3.6/4.0 — {resolveLocale(educationData.honors, isVi)}
            </p>
            <ul className="mt-5 space-y-2.5">
              {(isVi ? educationData.highlights.vi : educationData.highlights.en).map((h, i) => (
                <li key={i} className="flex gap-3 border-t border-[#e2e2e2] pt-2.5 text-[14px] font-medium">
                  <span className="swiss-index text-sm">{String(i + 1).padStart(2, "0")}</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t-2 border-[#0a0a0a] pt-6">
            <div className="swiss-label mb-4">{isVi ? "Nguyên tắc" : "Principles"}</div>
            <ul className="space-y-3 text-[15px] font-semibold tracking-tight">
              <li>{isVi ? "Performance & clean code trước tiên." : "Performance & clean code first."}</li>
              <li className="text-[#6b6b6b]">{isVi ? "Tự học nhanh, thích ứng nhanh." : "Learn fast, adapt faster."}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 grid border-t-2 border-[#0a0a0a] sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <div key={i} className="border-b border-r border-[#e2e2e2] p-6 last:border-r-0 max-sm:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r">
            <div className="swiss-index">{String(i + 1).padStart(2, "0")}</div>
            <h4 className="mt-3 text-[17px] font-extrabold tracking-tight">{resolveLocale(p.title, isVi)}</h4>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6b6b6b]">{resolveLocale(p.desc, isVi)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
