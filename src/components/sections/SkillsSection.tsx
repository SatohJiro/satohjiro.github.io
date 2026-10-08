"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";
import { telemetry } from "@/lib/telemetry";

export function SkillsSection() {
  const { isVi } = useLanguage();
  const [cat, setCat] = useState("all");
  const shown = skillsData.filter((c) => cat === "all" || c.id === cat);

  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeader
        index="04"
        label={isVi ? "Kỹ năng" : "Skills"}
        title={isVi ? "Công cụ" : "Toolkit"}
        desc={
          isVi
            ? "Frontend là sở trường. Đủ backend và AI để ship độc lập."
            : "Frontend is the specialty. Enough backend and AI to ship solo."
        }
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {[{ id: "all", en: "All", vi: "Tất cả" }, ...skillsData.map((c) => ({ id: c.id, en: c.label.en, vi: c.label.vi }))].map(
          (c) => (
            <button
              key={c.id}
              onClick={() => {
                setCat(c.id);
                telemetry.track("click", `filter_skills_${c.id}`);
              }}
              className={`swiss-tag cursor-pointer transition-colors ${
                cat === c.id ? "!border-[#0a0a0a] !bg-[#0a0a0a] !text-white" : "hover:!border-[#0a0a0a]"
              }`}
            >
              {isVi ? c.vi : c.en}
            </button>
          )
        )}
      </div>

      <table className="swiss-table">
        <thead>
          <tr>
            <th>{isVi ? "Kỹ năng" : "Skill"}</th>
            <th>{isVi ? "Nhóm" : "Category"}</th>
            <th>{isVi ? "Mức độ" : "Level"}</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((category) =>
            category.skills.map((skill, si) => (
              <tr key={`${category.id}-${si}`}>
                <td>
                  <span className="text-[15px] font-extrabold tracking-tight">{skill.name}</span>
                  {skill.description && (
                    <span className="mt-0.5 block text-[13px] text-[#6b6b6b]">
                      {resolveLocale(skill.description, isVi)}
                    </span>
                  )}
                </td>
                <td className="swiss-label whitespace-nowrap">{resolveLocale(category.label, isVi).split("(")[0].trim()}</td>
                <td>
                  {skill.tag ? (
                    <span className={`swiss-tag ${skill.highlight ? "!border-[#e30613] !text-[#e30613]" : ""}`}>
                      {resolveLocale(skill.tag, isVi)}
                    </span>
                  ) : (
                    <span className="swiss-label">—</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
