"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { setLanguage, isEn, isVi } = useLanguage();
  const b = (on: boolean) =>
    `cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.1em] transition-all ${
      on ? "bg-[#b8f135] text-[#041c30]" : "text-white/60 hover:text-white"
    }`;
  return (
    <div className="flex items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-sm">
      <button onClick={() => setLanguage("vi")} className={b(isVi)} aria-label="VI">VI</button>
      <button onClick={() => setLanguage("en")} className={b(isEn)} aria-label="EN">EN</button>
    </div>
  );
}
