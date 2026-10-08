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
      n: "01",
      title: { en: "Frontend Engineering", vi: "Kỹ thuật Frontend" },
      desc: {
        en: "Modular component architecture with React, Next.js, Vue.",
        vi: "Kiến trúc component module hóa với React, Next.js, Vue.",
      },
    },
    {
      n: "02",
      title: { en: "State & Performance", vi: "State & Hiệu năng" },
      desc: {
        en: "Redux Toolkit, Zustand. Measured +30% speed gains.",
        vi: "Redux Toolkit, Zustand. Đo được +30% tốc độ.",
      },
    },
    {
      n: "03",
      title: { en: "Micro-Frontend & APIs", vi: "Micro-Frontend & API" },
      desc: {
        en: "Production micro-frontends (ahamo / NTT Docomo).",
        vi: "Micro-frontend production (ahamo / NTT Docomo).",
      },
    },
    {
      n: "04",
      title: { en: "AI Integration", vi: "Tích hợp AI" },
      desc: {
        en: "GPT-4 + FastAPI + RabbitMQ in real products.",
        vi: "GPT-4 + FastAPI + RabbitMQ trong sản phẩm thật.",
      },
    },
  ];

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader
        num="01"
        eyebrow={isVi ? "Về tôi" : "About"}
        title={isVi ? "Nền tảng" : "Background"}
        desc={
          isVi
            ? "Thủ khoa CNTT ĐH Nông Lâm TP.HCM. Hơn 3 năm xây web app production."
            : "IT valedictorian, Nong Lam University. 3+ years shipping production web apps."
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Story */}
        <div className="brut-card p-7 sm:p-9">
          <div className="brut-eyebrow text-[#ff3d00]">
            {isVi ? "Hồ sơ" : "Profile"}
          </div>
          <div className="mt-4 space-y-4 text-[15px] font-medium leading-relaxed">
            {(isVi ? summaryData.vi : summaryData.en).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="mt-6 border-t-[3px] border-[#111] pt-5">
            <div className="brut-eyebrow mb-3">{isVi ? "Nguyên tắc" : "Principles"}</div>
            <ul className="space-y-2 font-mono text-[13px] font-bold">
              <li className="flex gap-3">
                <span className="text-[#ff3d00]">■</span>
                {isVi ? "Performance & clean code trước tiên" : "Performance & clean code first"}
              </li>
              <li className="flex gap-3">
                <span className="text-[#ff3d00]">■</span>
                {isVi ? "Tự học nhanh, thích ứng nhanh" : "Learn fast, adapt faster"}
              </li>
            </ul>
          </div>
        </div>

        {/* Education */}
        <div className="flex flex-col gap-6">
          <div className="brut-card bg-[#111] !text-white p-7 sm:p-9">
            <div className="brut-eyebrow text-[#ff3d00]">
              {isVi ? "Học vấn" : "Education"}
            </div>
            <h3 className="mt-3 font-display text-2xl font-black uppercase leading-tight">
              {resolveLocale(educationData.school, isVi)}
            </h3>
            <div className="mt-3 font-mono text-[13px] font-bold">
              {resolveLocale(educationData.major, isVi)} · {resolveLocale(educationData.duration, isVi)}
            </div>
            <div className="mt-4 inline-block border-[3px] border-[#ff3d00] px-4 py-2">
              <span className="font-mono text-sm font-bold text-[#ff3d00]">
                GPA 3.6/4.0 — {resolveLocale(educationData.honors, isVi)}
              </span>
            </div>
            <ul className="mt-5 space-y-2 text-sm font-medium text-white/85">
              {(isVi ? educationData.highlights.vi : educationData.highlights.en).map((h, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-black text-[#ff3d00]">→</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p) => (
          <div key={p.n} className="brut-card brut-card-hover p-6">
            <div className="font-display text-4xl font-black text-[#ff3d00]">{p.n}</div>
            <h4 className="mt-3 font-display text-base font-black uppercase leading-tight">
              {resolveLocale(p.title, isVi)}
            </h4>
            <p className="mt-2 text-sm font-medium leading-relaxed text-[#111]/70">
              {resolveLocale(p.desc, isVi)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
