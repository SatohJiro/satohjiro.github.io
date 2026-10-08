"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { setLanguage, isEn, isVi } = useLanguage();
  const b = (on: boolean) => `bp-label cursor-pointer px-1.5 py-1 ${on ? "text-[#ffb000]" : "hover:text-white"}`;
  return (
    <div className="flex items-center">
      <button onClick={() => setLanguage("vi")} className={b(isVi)} aria-label="VI">VI</button>
      <span className="bp-spec mx-0.5">/</span>
      <button onClick={() => setLanguage("en")} className={b(isEn)} aria-label="EN">EN</button>
    </div>
  );
}
