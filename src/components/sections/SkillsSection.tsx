"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";

export function SkillsSection() {
  const { isVi } = useLanguage();
  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader index="04" label={isVi ? "Kỹ năng" : "Skills"}
        title={isVi ? "Vật liệu" : "Materials"}
        desc={isVi ? "Frontend chính. Đủ backend & AI để thi công độc lập." : "Frontend first. Enough backend & AI to build solo."} />
      <table className="bp-table">
        <thead><tr>
          <th>{isVi ? "Vật liệu" : "Material"}</th>
          <th>{isVi ? "Nhóm" : "Group"}</th>
          <th className="text-right">{isVi ? "Cấp" : "Grade"}</th>
        </tr></thead>
        <tbody>
          {skillsData.map((c) => c.skills.map((s, si) => (
            <tr key={`${c.id}-${si}`}>
              <td><span className="font-bold">{s.name}</span>
                {s.description && <span className="bp-spec block text-white/55">{resolveLocale(s.description, isVi)}</span>}
              </td>
              <td className="bp-spec whitespace-nowrap">{resolveLocale(c.label, isVi).split("(")[0].trim()}</td>
              <td className="text-right">{s.tag
                ? <span className={`bp-tag ${s.highlight ? "!border-[#ffb000] !text-[#ffb000]" : ""}`}>{resolveLocale(s.tag, isVi)}</span>
                : <span className="bp-spec">—</span>}</td>
            </tr>
          )))}
        </tbody>
      </table>
    </section>
  );
}
