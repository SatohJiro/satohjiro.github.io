"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Gamepad2, Sparkles, ExternalLink } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function PixelVersionFloatButton() {
  const { isVi } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const pixelUrl = "https://pixel-portfolio-swart.vercel.app/";

  const handleClick = () => {
    telemetry.track("click", "switch_to_pixel_version");
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 pointer-events-auto">
      <a
        href={pixelUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-2 p-2.5 sm:p-2 rounded-full bg-slate-900/90 dark:bg-slate-950/90 text-white backdrop-blur-md border border-indigo-500/30 hover:border-indigo-400/80 shadow-[0_8px_30px_rgb(0,0,0,0.35)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 active:scale-95 select-none"
        aria-label={isVi ? "Trải nghiệm phiên bản Pixel Game RPG" : "Switch to Pixel Game RPG Version"}
      >
        {/* Floating circular icon */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-inner">
          <Gamepad2 className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:rotate-6" />
          
          {/* Subtle live indicator dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        </div>

        {/* Expandable Label on Desktop or Hover */}
        <div className="overflow-hidden transition-all duration-300 max-w-0 group-hover:max-w-xs opacity-0 group-hover:opacity-100 whitespace-nowrap pr-2">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-100">
            <span>{isVi ? "Pixel Game Mode" : "Pixel Game Version"}</span>
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
          </div>
          <div className="text-[10px] text-indigo-300 font-sans">
            {isVi ? "Giao diện 8-Bit Retro RPG" : "8-Bit Retro RPG & Audio"}
          </div>
        </div>
      </a>
    </div>
  );
}
