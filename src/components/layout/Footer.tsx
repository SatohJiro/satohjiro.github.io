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
    <footer className="border-t border-[#c9a227]/25">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
        <div className="deco-divider"><span>◆ ◆ ◆</span></div>
        <p className="deco-title mt-8 text-2xl uppercase">Nguyen Tran Anh</p>
        <nav className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-2">
          {siteConfig.navItems.map((item) => (
            <Link key={item.id} href={item.href}
              onClick={() => telemetry.track("click", `footer_nav_${item.id}`)}
              className="text-[11px] uppercase tracking-[0.22em] text-[#f3ecdc]/55 hover:text-[#c9a227]">
              {item.label[isVi ? "vi" : "en"]}
            </Link>
          ))}
        </nav>
        <div className="mt-7 flex justify-center gap-6">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#f3ecdc]/50 hover:text-[#c9a227]"><GithubIcon className="h-4 w-4" /></a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#f3ecdc]/50 hover:text-[#c9a227]"><LinkedinIcon className="h-4 w-4" /></a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Top" className="text-[#f3ecdc]/50 hover:text-[#c9a227] cursor-pointer"><ArrowUp className="h-4 w-4" /></button>
        </div>
        <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#f3ecdc]/35">
          © {new Date().getFullYear()} · {isVi ? "Hết màn" : "Fin"}
        </p>
      </div>
    </footer>
  );
}
