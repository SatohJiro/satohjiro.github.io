"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageToggle } from "./LanguageToggle";
import { FileDown, Menu, X, Rocket } from "lucide-react";
import { telemetry } from "@/lib/telemetry";
import { useScrollSpy } from "@/hooks/useScrollSpy";

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export function Navbar({ onOpenResumeModal }: NavbarProps) {
  const { isVi } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navSectionIds = React.useMemo(() => siteConfig.navItems.map((item) => item.id), []);
  const activeSection = useScrollSpy(navSectionIds, "home");

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "journey-card !rounded-none !border-x-0 !border-t-0" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="#home" onClick={() => handleNavClick("home")} className="group flex shrink-0 items-center gap-2.5">
          <div className="journey-card flex h-9 w-9 items-center justify-center !rounded-xl">
            <Rocket className="h-4 w-4 journey-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <div className="hidden text-left sm:block">
            <div className="journey-text whitespace-nowrap text-sm font-bold tracking-tight">
              {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
            </div>
            <div className="journey-faint font-mono text-[11px] leading-tight">@SatohJiro</div>
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
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold whitespace-nowrap transition-all ${
                  isActive ? "journey-card !rounded-full" : "journey-muted hover:journey-text journey-chip !border-0"
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
            className="journey-btn-primary hidden !py-2 !px-4 !text-[13px] sm:inline-flex"
          >
            <FileDown className="h-3.5 w-3.5" />
            {isVi ? "Tải CV" : "Resume"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="journey-chip rounded-xl p-2 lg:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="journey-card !rounded-none !border-x-0 px-4 pt-2 pb-5 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`rounded-xl px-3 py-2.5 text-[13px] font-semibold ${
                  activeSection === item.id ? "journey-btn-primary !rounded-xl w-full" : "journey-chip"
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
