"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";
import { telemetry } from "@/lib/telemetry";

export function SkillsSection() {
  const { isVi } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const displayed = skillsData.filter(
    (cat) => selectedCategory === "all" || cat.id === selectedCategory
  );

  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader
        num="04"
        eyebrow={isVi ? "Kỹ năng" : "Skills"}
        title={isVi ? "Vũ khí" : "Arsenal"}
        desc={
          isVi
            ? "Frontend là sở trường. Đủ backend và AI để ship sản phẩm độc lập."
            : "Frontend is the specialty. Enough backend and AI to ship solo."
        }
      />

      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => {
            setSelectedCategory("all");
            telemetry.track("click", "filter_skills_all");
          }}
          className={`border-[3px] border-[#111] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.1em] cursor-pointer ${
            selectedCategory === "all" ? "bg-[#111] text-white" : "bg-white hover:bg-[#ff3d00] hover:text-white"
          }`}
        >
          {isVi ? "Tất cả" : "All"}
        </button>
        {skillsData.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              telemetry.track("click", `filter_skills_${cat.id}`);
            }}
            className={`border-[3px] border-[#111] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.1em] cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-[#111] text-white"
                : "bg-white hover:bg-[#ff3d00] hover:text-white"
            }`}
          >
            {resolveLocale(cat.label, isVi).split("(")[0].trim()}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {displayed.map((cat, ci) => (
          <div key={cat.id} className="brut-card">
            <div
              className={`border-b-[3px] border-[#111] px-6 py-4 ${
                ci % 2 === 0 ? "bg-[#111] text-white" : "bg-[#ff3d00] text-white"
              }`}
            >
              <h3 className="font-display text-lg font-black uppercase">
                {resolveLocale(cat.label, isVi)}
              </h3>
              {cat.description && (
                <p className="mt-1 text-[13px] font-medium opacity-85">
                  {resolveLocale(cat.description, isVi)}
                </p>
              )}
            </div>
            <ul>
              {cat.skills.map((skill, si) => (
                <li
                  key={si}
                  className="flex items-start justify-between gap-4 border-b-2 border-[#111]/15 px-6 py-3.5 last:border-b-0 hover:bg-[#fff8f0]"
                >
                  <div>
                    <div className="font-bold">{skill.name}</div>
                    {skill.description && (
                      <div className="mt-0.5 text-[13px] font-medium text-[#111]/60">
                        {resolveLocale(skill.description, isVi)}
                      </div>
                    )}
                  </div>
                  {skill.tag && (
                    <span
                      className={`brut-tag shrink-0 !text-[10px] ${
                        skill.highlight ? "brut-tag-accent" : ""
                      }`}
                    >
                      {resolveLocale(skill.tag, isVi)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
