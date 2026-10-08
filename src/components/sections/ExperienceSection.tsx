"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { experienceData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";
import { telemetry } from "@/lib/telemetry";

export function ExperienceSection() {
  const { isVi } = useLanguage();
  const [activeExpId, setActiveExpId] = useState<string>(experienceData[0].id);
  const activeExp = experienceData.find((e) => e.id === activeExpId) || experienceData[0];

  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeader
        index="02"
        label={isVi ? "Kinh nghiệm" : "Experience"}
        title={isVi ? "Quá trình" : "Track Record"}
        desc={
          isVi
            ? "Hơn 3 năm qua doanh nghiệp Nhật, SaaS CRM và sản phẩm AI."
            : "3+ years across Japanese enterprise, SaaS CRM, and AI products."
        }
      />

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Index */}
        <div className="lg:col-span-4">
          <div className="swiss-label mb-4">{isVi ? "Chọn đơn vị" : "Select"}</div>
          <div className="border-t-2 border-[#0a0a0a]">
            {experienceData.map((exp, i) => {
              const isActive = exp.id === activeExpId;
              return (
                <button
                  key={exp.id}
                  onClick={() => {
                    setActiveExpId(exp.id);
                    telemetry.track("click", `select_experience_${exp.id}`);
                  }}
                  className={`flex w-full items-baseline gap-4 border-b border-[#e2e2e2] py-4 text-left cursor-pointer transition-colors ${
                    isActive ? "bg-white" : "hover:bg-white/60"
                  }`}
                >
                  <span className={`swiss-index text-sm ${isActive ? "" : "opacity-30"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className={`block text-[16px] font-extrabold tracking-tight ${isActive ? "" : "text-[#6b6b6b]"}`}>
                      {exp.company}
                    </span>
                    <span className="swiss-label mt-1 block">
                      {resolveLocale(exp.title, isVi)} · {resolveLocale(exp.duration, isVi)}
                    </span>
                  </span>
                  {exp.current && <span className="ml-auto h-2 w-2 shrink-0 bg-[#e30613]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dossier */}
        <div className="lg:col-span-8">
          <div className="swiss-card p-7 sm:p-10">
            <div className="swiss-label swiss-label-red">{resolveLocale(activeExp.duration, isVi)}</div>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {resolveLocale(activeExp.title, isVi)}
            </h3>
            <p className="mt-2 font-mono text-[13px] text-[#6b6b6b]">
              {activeExp.company} — {resolveLocale(activeExp.location, isVi)}
            </p>

            <div className="mt-8 space-y-10">
              {activeExp.projectHighlights.map((proj, pi) => (
                <article key={pi} className="border-t-2 border-[#0a0a0a] pt-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-xl font-extrabold tracking-tight">{proj.name}</h4>
                    {proj.client && (
                      <span className="swiss-label">{resolveLocale(proj.client, isVi)}</span>
                    )}
                  </div>
                  <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#3d3d3d]">
                    {resolveLocale(proj.description, isVi)}
                  </p>
                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    <div>
                      <div className="swiss-label mb-3">{isVi ? "Trách nhiệm" : "Responsibilities"}</div>
                      <ul className="space-y-2 text-[14px] font-medium">
                        {proj.responsibilities[isVi ? "vi" : "en"].map((r, i) => (
                          <li key={i} className="border-l-2 border-[#e2e2e2] pl-3 leading-relaxed">{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="swiss-label swiss-label-red mb-3">{isVi ? "Kết quả" : "Impact"}</div>
                      <ul className="space-y-2 text-[14px] font-semibold">
                        {proj.impacts[isVi ? "vi" : "en"].map((imp, i) => (
                          <li key={i} className="border-l-2 border-[#e30613] pl-3 leading-relaxed">{imp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="swiss-tag">{t}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
