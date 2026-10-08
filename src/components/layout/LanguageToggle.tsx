"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { setLanguage, isEn, isVi } = useLanguage();
  const b = (on: boolean) =>
    `mono-caption cursor-pointer transition-colors ${on ? "!text-[#1e4d3b]" : "hover:text-[#1e4d3b]"}`;
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => setLanguage("vi")} className={b(isVi)} aria-label="VI">VI</button>
      <span className="mono-caption">·</span>
      <button onClick={() => setLanguage("en")} className={b(isEn)} aria-label="EN">EN</button>
    </div>
  );
}
