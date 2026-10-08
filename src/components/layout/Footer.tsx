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
    <footer className="border-t border-white/25 bg-[#0a2a66]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="font-mono text-[13px] font-semibold tracking-[0.14em]">
              N.TRAN ANH <span className="text-[#ffb000]">— DWG.001</span>
            </div>
            <p className="bp-label mt-3">{isVi ? "Kỹ sư phần mềm — TP.HCM" : "Software Engineer — HCMC"}</p>
          </div>
          <div className="md:col-span-3">
            <div className="bp-label mb-3">{isVi ? "Mục lục" : "Index"}</div>
            <ul className="space-y-2">
              {siteConfig.navItems.map((item, i) => (
                <li key={item.id}>
                  <Link href={item.href} onClick={() => telemetry.track("click", `footer_nav_${item.id}`)} className="bp-label hover:text-[#ffb000]">
                    {String(i+1).padStart(2,"0")}.{item.label[isVi ? "vi" : "en"]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="bp-label mb-3">{isVi ? "Khác" : "Elsewhere"}</div>
            <div className="flex gap-4">
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/60 hover:text-[#ffb000]"><GithubIcon className="h-5 w-5" /></a>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-[#ffb000]"><LinkedinIcon className="h-5 w-5" /></a>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Top" className="text-white/60 hover:text-[#ffb000] cursor-pointer"><ArrowUp className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
        <div className="bp-rule my-8" />
        <div className="flex flex-wrap justify-between gap-3">
          <span className="bp-spec">© {new Date().getFullYear()} NGUYEN TRAN ANH</span>
          <span className="bp-spec">DRAWN TO SPEC · REV C</span>
        </div>
      </div>
    </footer>
  );
}
