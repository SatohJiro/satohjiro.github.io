"use client";

import React from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  desc?: string;
}

/** Swiss section header: index + rule + massive title. */
export function SectionHeader({ index, label, title, desc }: SectionHeaderProps) {
  return (
    <div className="mb-12 sm:mb-16">
      <div className="flex items-center gap-4 border-b-2 border-[#0a0a0a] pb-4">
        <span className="swiss-index text-lg">{index}</span>
        <span className="swiss-label">{label}</span>
      </div>
      <h2 className="swiss-h-display mt-8 text-[clamp(2.4rem,6vw,4.5rem)]">{title}</h2>
      {desc && (
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[#6b6b6b]">{desc}</p>
      )}
    </div>
  );
}
