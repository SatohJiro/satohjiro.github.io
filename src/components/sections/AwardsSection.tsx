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
      <SectionHeader index="05" label={isVi ? "Vinh danh" : "Honors"} title={isVi ? "Chứng nhận" : "Certified"} />
      <table className="bp-table">
        <thead><tr><th className="w-16">No.</th><th>{isVi ? "Chứng nhận" : "Award"}</th><th>{isVi ? "Cấp bởi" : "By"}</th><th className="text-right">{isVi ? "Năm" : "Year"}</th></tr></thead>
        <tbody>
          {awardsData.map((a, i) => (
            <tr key={a.id}>
              <td className="font-mono text-[#ffb000]">{String(i+1).padStart(2,"0")}</td>
              <td><div className="font-bold">{resolveLocale(a.title, isVi)}</div>
                <div className="bp-spec text-white/55">{resolveLocale(a.description, isVi)}</div></td>
              <td className="bp-spec">{resolveLocale(a.organization, isVi)}</td>
              <td className="text-right font-extrabold">{a.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
