"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
 const { setLanguage, isEn, isVi } = useLanguage();

 return (
 <div className="inline-flex items-center rounded-xl p-0.5 border border-[#1e1e2a]/10 bg-white backdrop-blur-md shadow-xs">
 <button
 onClick={() => setLanguage("vi")}
 className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
 isVi
 ? "bg-blue-600 text-white shadow-xs"
 : "text-[#55555f] hover:text-[#1e1e2a]"
 }`}
 aria-label="Chuyển sang Tiếng Việt"
 >
 VI
 </button>
 <button
 onClick={() => setLanguage("en")}
 className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
 isEn
 ? "bg-blue-600 text-white shadow-xs"
 : "text-[#55555f] hover:text-[#1e1e2a]"
 }`}
 aria-label="Switch to English"
 >
 EN
 </button>
 </div>
 );
}
