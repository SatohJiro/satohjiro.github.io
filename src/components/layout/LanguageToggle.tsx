"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { setLanguage, isEn, isVi } = useLanguage();

  const btn = (active: boolean) =>
    `swiss-label cursor-pointer px-2 py-1 transition-colors ${
      active ? "text-[#e30613]" : "hover:text-[#0a0a0a]"
    }`;

  return (
    <div className="flex items-center border-l border-[#e2e2e2] pl-3">
      <button onClick={() => setLanguage("vi")} className={btn(isVi)} aria-label="Tiếng Việt">
        VI
      </button>
      <span className="mx-1 text-[#e2e2e2]">/</span>
      <button onClick={() => setLanguage("en")} className={btn(isEn)} aria-label="English">
        EN
      </button>
    </div>
  );
}
