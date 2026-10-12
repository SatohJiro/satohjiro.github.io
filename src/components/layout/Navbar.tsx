"use client";

/**
 * Navbar (Your Name theme) — floating twilight nav with language toggle.
 */

import React, { useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";

const NAV = [
  { href: "#home", en: "Home", vi: "Trang chủ" },
  { href: "#about", en: "About", vi: "Giới thiệu" },
  { href: "#experience", en: "Experience", vi: "Kinh nghiệm" },
  { href: "#projects", en: "Projects", vi: "Dự án" },
  { href: "#skills", en: "Skills", vi: "Kỹ năng" },
  { href: "#awards", en: "Honors", vi: "Vinh danh" },
  { href: "#contact", en: "Contact", vi: "Liên hệ" },
];

export function Navbar() {
  const { t, toggleLanguage, isVi } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        aria-label={t({ en: "Main navigation", vi: "Điều hướng chính" })}
        className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-full border border-[#fdf6ec]/12 bg-[#0a0d24]/60 px-5 py-3 shadow-[0_10px_36px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      >
        <a href="#home" className="flex items-center gap-3">
          <span className="yn-jp-accent text-lg" lang="ja">黄昏</span>
          <span className="yn-display text-lg text-[#fdf6ec]">SatohJiro</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="yn-nav-link">
              {t({ en: n.en, vi: n.vi })}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t({ en: "Switch language", vi: "Đổi ngôn ngữ" })}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#fdf6ec]/20 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-[#e8dcc8]/80 transition-colors hover:border-[#f7b267]/60 hover:text-[#f7b267]"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            {isVi ? "EN" : "VI"}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={t({ en: "Toggle menu", vi: "Mở/đóng menu" })}
            className="cursor-pointer rounded-full border border-[#fdf6ec]/20 p-2 text-[#e8dcc8] lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-[#fdf6ec]/12 bg-[#0a0d24]/90 p-4 backdrop-blur-xl lg:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-[#e8dcc8] transition-colors hover:bg-white/5 hover:text-[#f7b267]"
            >
              {t({ en: n.en, vi: n.vi })}
            </a>
          ))}
          <p className="px-4 pt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#e8dcc8]/40">
            {siteConfig.name}
          </p>
        </div>
      )}
    </header>
  );
}
