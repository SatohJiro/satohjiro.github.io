"use client";
import React from "react";

export function SectionHeader({ index, label, title, desc }: {
  index: string; label: string; title: string; desc?: string;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4">
        <span className="bp-cross" />
        <span className="bp-label bp-label-accent">SEC.{index}</span>
        <span className="bp-label">{label}</span>
        <div className="bp-rule flex-1" />
      </div>
      <h2 className="bp-title mt-6 text-[clamp(2rem,5vw,3.8rem)] uppercase">{title}</h2>
      {desc && <p className="mt-4 max-w-2xl leading-relaxed text-white/65">{desc}</p>}
    </div>
  );
}
