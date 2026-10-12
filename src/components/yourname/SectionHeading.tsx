"use client";

/**
 * SectionHeading — cinematic section title for the Your Name theme.
 * Single-word Japanese accents only (common words, never lyric lines).
 */

import React from "react";
import { CordKnot } from "./BraidedCord";

interface SectionHeadingProps {
  /** e.g. "星空" */
  accent: string;
  /** romanized reading, e.g. "hoshizora — starry sky" */
  accentReading: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  accent,
  accentReading,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="yn-section-head mx-auto mb-12 max-w-3xl text-center">
      <div className="mb-3 flex items-center justify-center gap-3">
        <span className="yn-jp-accent text-2xl" lang="ja" aria-label={accentReading}>
          {accent}
        </span>
        <span className="yn-eyebrow">{eyebrow}</span>
      </div>
      <h2 className="yn-display text-4xl text-[#fdf6ec] md:text-5xl">
        <CordKnot className="mr-3 align-middle" />
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#e8dcc8]/85">
          {description}
        </p>
      )}
    </div>
  );
}
