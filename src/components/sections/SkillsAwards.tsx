"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData, awardsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { Y2kHeading } from "./Y2k";
import { Trophy } from "lucide-react";

export function SkillsSection() {
  const { isVi } = useLanguage();
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Y2kHeading kicker={isVi ? "Chương 04" : "Level 04"} title={isVi ? "Kỹ năng" : "Skill tree"}
        sub={isVi ? "Cây kỹ năng đã mở khóa — frontend là nhánh chính." : "Unlocked skill tree — frontend is the main branch."} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillsData.map((c, ci) => (
          <div key={c.id} className="y2k-glass p-7">
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-2xl text-lg font-extrabold text-[#041c30] ${
                ["bg-gradient-to-br from-[#d8f9ff] to-[#3fd2ec]", "bg-gradient-to-br from-[#b8f135] to-[#7ce7f4]", "bg-gradient-to-br from-[#ffd6f4] to-[#3fd2ec]"][ci % 3]
              }`}>
                {ci + 1}
              </span>
              <h3 className="font-extrabold">{resolveLocale(c.label, isVi)}</h3>
            </div>
            <div className="mt-5 space-y-2.5">
              {c.skills.map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-2 rounded-2xl bg-white/5 px-4 py-2.5 text-[14px]">
                  <span className="font-bold text-white/85">{s.name}</span>
                  {s.tag && (
                    <span className={`y2k-chip !text-[10px] !py-1 ${s.highlight ? "!bg-[#b8f135] !text-[#041c30] !border-transparent" : ""}`}>
                      {resolveLocale(s.tag, isVi)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AwardsSection() {
  const { isVi } = useLanguage();
  return (
    <section id="awards" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <Y2kHeading kicker={isVi ? "Phòng truyền thống" : "Hall of fame"} title={isVi ? "Vinh danh" : "Trophies"} />
      <div className="space-y-4">
        {awardsData.map((a, i) => (
          <div key={a.id} className="y2k-glass flex items-start gap-5 p-6 sm:p-7">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              i === 0
                ? "bg-gradient-to-br from-[#ffe97c] to-[#f5a623] text-[#041c30]"
                : "bg-white/10 text-[#7ce7f4]"
            }`}>
              <Trophy className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <h3 className="text-lg font-extrabold">{resolveLocale(a.title, isVi)}</h3>
              <p className="mt-1 text-[14px] text-white/60">{resolveLocale(a.description, isVi)}</p>
              <p className="y2k-label mt-3 !text-[10px]">{resolveLocale(a.organization, isVi)} · {a.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
