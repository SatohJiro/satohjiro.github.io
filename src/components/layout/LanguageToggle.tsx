"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { setLanguage, isEn, isVi } = useLanguage();

  return (
    <div className="inline-flex items-center border-[3px] border-[#111] bg-white">
      <button
        onClick={() => setLanguage("vi")}
        className={`px-2.5 py-1.5 font-mono text-[11px] font-bold cursor-pointer ${
          isVi ? "bg-[#111] text-white" : "text-[#111] hover:bg-[#ff3d00] hover:text-white"
        }`}
        aria-label="Chuyển sang Tiếng Việt"
      >
        VI
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`border-l-[3px] border-[#111] px-2.5 py-1.5 font-mono text-[11px] font-bold cursor-pointer ${
          isEn ? "bg-[#111] text-white" : "text-[#111] hover:bg-[#ff3d00] hover:text-white"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
