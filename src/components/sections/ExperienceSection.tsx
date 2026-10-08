"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { experienceData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";
import { TrendingUp } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function ExperienceSection() {
  const { isVi } = useLanguage();
  const [activeExpId, setActiveExpId] = useState<string>(experienceData[0].id);

  const activeExp =
    experienceData.find((exp) => exp.id === activeExpId) || experienceData[0];

  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader
        num="02"
        eyebrow={isVi ? "Kinh nghiệm" : "Experience"}
        title={isVi ? "Quá trình làm việc" : "Work History"}
        desc={
          isVi
            ? "Hơn 3 năm qua các môi trường: doanh nghiệp Nhật, SaaS CRM, sản phẩm AI."
            : "3+ years across Japanese enterprise, SaaS CRM, and AI products."
        }
      />

      {/* Company selector: brutalist tabs */}
      <div className="mb-6 flex flex-wrap gap-3">
        {experienceData.map((exp) => {
          const isActive = exp.id === activeExpId;
          return (
            <button
              key={exp.id}
              onClick={() => {
                setActiveExpId(exp.id);
                telemetry.track("click", `select_experience_${exp.id}`);
              }}
              className={`border-[3px] border-[#111] px-5 py-3 text-left font-mono text-xs font-bold uppercase tracking-[0.08em] cursor-pointer transition-all ${
                isActive
                  ? "bg-[#111] text-white shadow-[5px_5px_0_#ff3d00]"
                  : "bg-white shadow-[5px_5px_0_#111] hover:-translate-y-0.5"
              }`}
            >
              {exp.company}
              {exp.current && (
                <span className={`ml-2 ${isActive ? "text-[#ff3d00]" : "text-[#ff3d00]"}`}>
                  ●
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Detail: brutalist dossier */}
      <div className="brut-card">
        <div className="flex flex-col justify-between gap-4 border-b-[3px] border-[#111] bg-[#111] p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="font-display text-2xl font-black uppercase sm:text-3xl">
              {resolveLocale(activeExp.title, isVi)}
            </h3>
            <div className="mt-2 font-mono text-[13px] font-bold uppercase tracking-[0.1em] text-[#ff3d00]">
              {activeExp.company} — {resolveLocale(activeExp.location, isVi)}
            </div>
          </div>
          <span className="brut-tag brut-tag-accent shrink-0">
            {resolveLocale(activeExp.duration, isVi)}
          </span>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          {activeExp.projectHighlights.map((proj, pIdx) => (
            <article key={pIdx} className={pIdx > 0 ? "border-t-[3px] border-[#111] pt-8" : ""}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-xl font-black uppercase">{proj.name}</h4>
                {proj.client && (
                  <span className="font-mono text-xs font-bold text-[#111]/55">
                    {resolveLocale(proj.client, isVi)}
                  </span>
                )}
              </div>
              <p className="mt-3 max-w-3xl text-[15px] font-medium leading-relaxed text-[#111]/80">
                {resolveLocale(proj.description, isVi)}
              </p>

              <div className="mt-5 grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="brut-eyebrow mb-3">
                    {isVi ? "Trách nhiệm" : "Responsibilities"}
                  </div>
                  <ul className="space-y-2 text-sm font-medium">
                    {proj.responsibilities[isVi ? "vi" : "en"].map((r, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="font-black">—</span>
                        <span className="leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-[3px] border-[#111] bg-[#fff8f0] p-5">
                  <div className="brut-eyebrow mb-3 flex items-center gap-2 text-[#ff3d00]">
                    <TrendingUp className="h-4 w-4" />
                    {isVi ? "Kết quả" : "Impact"}
                  </div>
                  <ul className="space-y-2 text-sm font-bold">
                    {proj.impacts[isVi ? "vi" : "en"].map((imp, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-[#ff3d00]">▸</span>
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {proj.technologies.map((t, i) => (
                  <span key={i} className="brut-tag">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
