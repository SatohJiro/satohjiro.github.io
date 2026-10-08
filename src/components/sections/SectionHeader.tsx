"use client";

import React from "react";

interface SectionHeaderProps {
  num: string;
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
}

/** Numbered brutalist section header: giant outline number + black title. */
export function SectionHeader({ num, eyebrow, title, desc }: SectionHeaderProps) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="brut-eyebrow text-[#ff3d00]">{eyebrow}</div>
          <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">
            {title}
          </h2>
        </div>
        <div className="brut-section-num hidden shrink-0 sm:block" aria-hidden="true">
          {num}
        </div>
      </div>
      {desc && (
        <p className="mt-5 max-w-2xl border-l-[4px] border-[#111] pl-5 text-base font-medium leading-relaxed text-[#111]/75">
          {desc}
        </p>
      )}
      <div className="mt-8 h-[3px] bg-[#111]" />
    </div>
  );
}
