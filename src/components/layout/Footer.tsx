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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-[3px] border-[#111] bg-[#111] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="max-w-md">
            <div className="font-display text-3xl font-black uppercase leading-none">
              Nguyen
              <br />
              Tran <span className="text-[#ff3d00]">Anh</span>
            </div>
            <p className="mt-4 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-white/50">
              {isVi ? "Kỹ sư phần mềm — TP.HCM" : "Software Engineer — HCMC"}
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="brut-eyebrow text-[#ff3d00]">{isVi ? "Điều hướng" : "Index"}</div>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => telemetry.track("click", `footer_nav_${item.id}`)}
                      className="font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-white/70 hover:text-[#ff3d00]"
                    >
                      {item.label[isVi ? "vi" : "en"]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="brut-eyebrow text-[#ff3d00]">{isVi ? "Kết nối" : "Elsewhere"}</div>
              <div className="mt-4 flex gap-3">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="border-2 border-white/30 p-2.5 hover:border-[#ff3d00] hover:text-[#ff3d00]"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="border-2 border-white/30 p-2.5 hover:border-[#ff3d00] hover:text-[#ff3d00]"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  aria-label="Back to top"
                  className="border-2 border-white/30 p-2.5 hover:border-[#ff3d00] hover:text-[#ff3d00] cursor-pointer"
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t-2 border-white/15 pt-6">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
            © {currentYear} Nguyen Tran Anh
          </span>
          <span className="brut-tag brut-tag-accent !text-[10px]">Built raw. No templates.</span>
        </div>
      </div>
    </footer>
  );
}
