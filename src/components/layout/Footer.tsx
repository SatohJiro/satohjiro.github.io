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
    <footer className="border-t border-[#e3ddd0]">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
        <div className="mono-rule-double mx-auto max-w-xs" />
        <p className="mono-title mt-8 text-2xl">N. Tran Anh</p>
        <p className="mono-caption mt-3">
          {isVi ? "Tập hồ sơ № 1 — In tại Thành phố Hồ Chí Minh" : "Monograph № 1 — Printed in Ho Chi Minh City"}
        </p>
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {siteConfig.navItems.map((item) => (
            <Link key={item.id} href={item.href}
              onClick={() => telemetry.track("click", `footer_nav_${item.id}`)}
              className="mono-caption hover:text-[#1e4d3b]">
              {item.label[isVi ? "vi" : "en"]}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex justify-center gap-5">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#1c1a16]/60 hover:text-[#1e4d3b]"><GithubIcon className="h-4 w-4" /></a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#1c1a16]/60 hover:text-[#1e4d3b]"><LinkedinIcon className="h-4 w-4" /></a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Top" className="text-[#1c1a16]/60 hover:text-[#1e4d3b] cursor-pointer"><ArrowUp className="h-4 w-4" /></button>
        </div>
        <p className="mono-caption mt-8">
          © {new Date().getFullYear()} · {isVi ? "Giấy ngà, mực đen, chữ Fraunces" : "Ivory paper, black ink, Fraunces type"}
        </p>
      </div>
    </footer>
  );
}
