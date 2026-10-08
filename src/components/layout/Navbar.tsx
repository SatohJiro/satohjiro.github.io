"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageToggle } from "./LanguageToggle";
import { FileDown, Menu, X } from "lucide-react";
import { telemetry } from "@/lib/telemetry";
import { useScrollSpy } from "@/hooks/useScrollSpy";

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export function Navbar({ onOpenResumeModal }: NavbarProps) {
  const { isVi } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navSectionIds = React.useMemo(() => siteConfig.navItems.map((item) => item.id), []);
  const activeSection = useScrollSpy(navSectionIds, "home");

  useEffect(() => {
    document.documentElement.style.overflowY = mobileMenuOpen ? "hidden" : "";
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflowY = "";
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    telemetry.track("click", `nav_${id}`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b-[3px] border-[#111] bg-[#f4f1ea]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="#home" onClick={() => handleNavClick("home")} className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border-[3px] border-[#111] bg-[#ff3d00] font-display text-lg font-black text-white shadow-[3px_3px_0_#111]">
            N
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-sm font-black tracking-tight uppercase">
              Nguyen Tran Anh
            </div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#111]/60">
              @SatohJiro
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`border-2 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                  isActive
                    ? "border-[#111] bg-[#111] text-white"
                    : "border-transparent text-[#111] hover:border-[#111] hover:bg-white"
                }`}
              >
                {item.label[isVi ? "vi" : "en"]}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <button
            onClick={() => {
              telemetry.track("download_cv", "navbar_cta");
              onOpenResumeModal();
            }}
            className="brut-btn hidden !px-4 !py-2 !text-xs sm:inline-flex"
          >
            <FileDown className="h-3.5 w-3.5" />
            {isVi ? "CV" : "Resume"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="border-[3px] border-[#111] bg-white p-2 shadow-[3px_3px_0_#111] lg:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t-[3px] border-[#111] bg-[#f4f1ea] px-4 py-4 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`border-2 border-[#111] px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] ${
                  activeSection === item.id ? "bg-[#111] text-white" : "bg-white"
                }`}
              >
                {item.label[isVi ? "vi" : "en"]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
