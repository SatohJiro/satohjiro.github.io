"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { summaryData, educationData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";

export function AboutSection() {
  const { isVi } = useLanguage();
  const pillars = [
    { t: { en: "Frontend Engineering", vi: "Kỹ thuật Frontend" }, d: { en: "React / Next.js / Vue, modular.", vi: "React / Next.js / Vue, module hóa." } },
    { t: { en: "State & Performance", vi: "State & Hiệu năng" }, d: { en: "Redux Toolkit, Zustand. +30%.", vi: "Redux Toolkit, Zustand. +30%." } },
    { t: { en: "Micro-Frontend", vi: "Micro-Frontend" }, d: { en: "ahamo / NTT Docomo, production.", vi: "ahamo / NTT Docomo, production." } },
    { t: { en: "AI Integration", vi: "Tích hợp AI" }, d: { en: "GPT-4 + FastAPI + RabbitMQ.", vi: "GPT-4 + FastAPI + RabbitMQ." } },
  ];

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader index="01" label={isVi ? "Về tôi" : "About"}
        title={isVi ? "Lý lịch kỹ thuật" : "Technical Profile"}
        desc={isVi ? "Thủ khoa CNTT ĐH Nông Lâm TP.HCM. 3+ năm production." : "IT valedictorian, Nong Lam University. 3+ years production."} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bp-panel bp-corners p-7">
          <div className="bp-label bp-label-accent mb-4">FIG.02 — {isVi ? "Hồ sơ" : "Profile"}</div>
          <div className="space-y-4 leading-relaxed text-white/85">
            {(isVi ? summaryData.vi : summaryData.en).map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
        <div className="bp-panel bp-corners p-7">
          <div className="bp-label bp-label-accent mb-4">FIG.03 — {isVi ? "Học vấn" : "Education"}</div>
          <h3 className="text-xl font-extrabold">{resolveLocale(educationData.school, isVi)}</h3>
          <p className="bp-spec mt-2">{resolveLocale(educationData.major, isVi)} · {resolveLocale(educationData.duration, isVi)}</p>
          <p className="mt-3 inline-block bg-[#ffb000] px-3 py-1 font-mono text-[12px] font-bold text-[#0a2a66]">
            GPA 3.6/4.0 — {resolveLocale(educationData.honors, isVi)}
          </p>
          <ul className="mt-4 space-y-2">
            {(isVi ? educationData.highlights.vi : educationData.highlights.en).map((h, i) => (
              <li key={i} className="bp-spec border-t border-white/10 pt-2 text-white/75">[{String(i+1).padStart(2,"0")}] {h}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <div key={i} className="bp-panel p-6">
            <div className="bp-label bp-label-accent">MOD.{String(i+1).padStart(2,"0")}</div>
            <h4 className="mt-2 font-extrabold">{resolveLocale(p.t, isVi)}</h4>
            <p className="bp-spec mt-2 text-white/70">{resolveLocale(p.d, isVi)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
