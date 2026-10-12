"use client";

/**
 * Footer (Your Name theme) — quiet sign-off under the stars.
 */

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { CordKnot } from "@/components/yourname/BraidedCord";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[#fdf6ec]/10 bg-[#060818]/55 px-4 py-10 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#e8dcc8]/60">
          <CordKnot />
          <span lang="ja">黄昏</span> · kataware-doki
          <CordKnot />
        </span>
        <div className="flex items-center gap-5">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#e8dcc8]/70 transition-colors hover:text-[#f7b267]"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#e8dcc8]/70 transition-colors hover:text-[#f7b267]"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
        </div>
        <p className="text-sm text-[#e8dcc8]/60">
          © {year} {siteConfig.name} ·{" "}
          {t({
            en: "Crafted under a twilight sky. All character art original.",
            vi: "Tạo nên dưới bầu trời hoàng hôn. Nhân vật đều là sáng tạo gốc.",
          })}
        </p>
      </div>
    </footer>
  );
}
