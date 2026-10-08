"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { setLanguage, isEn, isVi } = useLanguage();
  const b = (on: boolean) =>
    `cursor-pointer text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${on ? "text-[#c9a227]" : "text-[#f3ecdc]/50 hover:text-[#c9a227]"}`;
  return (
    <div className="flex items-center gap-1.5">
      <button onClick={() => setLanguage("vi")} className={b(isVi)} aria-label="VI">VI</button>
      <span className="text-[#c9a227]/50 text-[10px]">◆</span>
      <button onClick={() => setLanguage("en")} className={b(isEn)} aria-label="EN">EN</button>
    </div>
  );
}
