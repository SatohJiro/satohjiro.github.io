"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { awardsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";

export function AwardsSection() {
  const { isVi } = useLanguage();

  return (
    <section id="awards" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader
        num="05"
        eyebrow={isVi ? "Vinh danh" : "Honors"}
        title={isVi ? "Bằng chứng" : "Receipts"}
        desc={
          isVi
            ? "Ghi nhận từ nhà trường và công ty."
            : "Recognized by university and companies."
        }
      />

      <div className="overflow-x-auto">
        <table className="brut-table">
          <thead>
            <tr>
              <th className="w-16">#</th>
              <th>{isVi ? "Giải thưởng" : "Award"}</th>
              <th>{isVi ? "Tổ chức" : "Organization"}</th>
              <th className="w-28">{isVi ? "Năm" : "Year"}</th>
            </tr>
          </thead>
          <tbody>
            {awardsData.map((award, i) => (
              <tr key={award.id}>
                <td className="font-display text-2xl font-black text-[#ff3d00]">
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td>
                  <div className="font-display text-base font-black uppercase">
                    {resolveLocale(award.title, isVi)}
                  </div>
                  <div className="mt-1 text-[13px] font-medium text-[#111]/65">
                    {resolveLocale(award.description, isVi)}
                  </div>
                  {award.badgeText && (
                    <div className="mt-2">
                      <span className="brut-tag brut-tag-accent !text-[10px]">
                        {resolveLocale(award.badgeText, isVi)}
                      </span>
                    </div>
                  )}
                </td>
                <td className="font-mono text-[13px] font-bold">
                  {resolveLocale(award.organization, isVi)}
                </td>
                <td className="font-display text-xl font-black">{award.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
