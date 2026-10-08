"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { ArrowUp } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function Footer() {
  const { isVi } = useLanguage();
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
      <div className="y2k-glass px-8 py-10 text-center">
        <p className="text-lg font-extrabold">SatohJiro <span className="text-[#7ce7f4]">◍</span></p>
        <nav className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {siteConfig.navItems.map((item) => (
            <Link key={item.id} href={item.href}
              onClick={() => telemetry.track("click", `footer_nav_${item.id}`)}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55 hover:text-[#7ce7f4]">
              {item.label[isVi ? "vi" : "en"]}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex justify-center gap-4">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/55 hover:text-[#b8f135]"><GithubIcon className="h-4 w-4" /></a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/55 hover:text-[#b8f135]"><LinkedinIcon className="h-4 w-4" /></a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Top" className="text-white/55 hover:text-[#b8f135] cursor-pointer"><ArrowUp className="h-4 w-4" /></button>
        </div>
        <p className="y2k-label mt-7 !text-[10px]">
          © {new Date().getFullYear()} · {isVi ? "Làm với ánh hào quang 2006" : "Made with 2006 glow"}
        </p>
      </div>
    </footer>
  );
}
