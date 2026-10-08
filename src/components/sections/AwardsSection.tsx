"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { awardsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";

export function AwardsSection() {
  const { isVi } = useLanguage();

  return (
    <section id="awards" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeader
        index="05"
        label={isVi ? "Vinh danh" : "Honors"}
        title={isVi ? "Ghi nhận" : "Recognition"}
      />

      <table className="swiss-table">
        <thead>
          <tr>
            <th className="w-16">#</th>
            <th>{isVi ? "Giải thưởng" : "Award"}</th>
            <th>{isVi ? "Tổ chức" : "By"}</th>
            <th className="w-24 text-right">{isVi ? "Năm" : "Year"}</th>
          </tr>
        </thead>
        <tbody>
          {awardsData.map((a, i) => (
            <tr key={a.id}>
              <td className="swiss-index text-lg">{String(i + 1).padStart(2, "0")}</td>
              <td>
                <div className="text-[16px] font-extrabold tracking-tight">
                  {resolveLocale(a.title, isVi)}
                </div>
                <div className="mt-1 max-w-xl text-[13px] text-[#6b6b6b]">
                  {resolveLocale(a.description, isVi)}
                </div>
              </td>
              <td className="font-mono text-[13px]">{resolveLocale(a.organization, isVi)}</td>
              <td className="text-right text-[16px] font-extrabold">{a.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
