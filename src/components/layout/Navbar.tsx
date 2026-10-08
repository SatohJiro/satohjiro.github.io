"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageToggle } from "./LanguageToggle";
import { GlassButton } from "../glass/GlassButton";
import { FileDown, Menu, X } from "lucide-react";
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

  const navItems = siteConfig.navItems.filter((item) => item.id !== "terminal");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#fff6e9]/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Brand sticker */}
        <Link
          href="#home"
          onClick={() => handleNavClick("home")}
          className="play-wiggle group flex shrink-0 items-center gap-2.5"
        >
          <div className="play-sticker items-center justify-center rounded-2xl bg-[#ffb627] px-2.5 py-1.5 font-display text-sm font-extrabold text-[#1e1e2a]">
            NTA
          </div>
          <div className="hidden text-left sm:block">
            <div className="whitespace-nowrap font-display text-[15px] font-bold tracking-tight text-[#1e1e2a]">
              {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
            </div>
            <div className="font-mono text-[11px] leading-tight text-[#6e6e7e]">@SatohJiro</div>
          </div>
        </Link>

        {/* Desktop nav — chunky pills */}
        <nav className="hidden items-center gap-1.5 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`rounded-full border-2 px-3.5 py-1.5 text-[13px] font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "border-[#1e1e2a] bg-[#1e1e2a] text-white shadow-[3px_3px_0_0_rgba(30,30,42,0.2)]"
                    : "border-transparent text-[#6e6e7e] hover:border-[#1e1e2a]/15 hover:bg-white hover:text-[#1e1e2a]"
                }`}
              >
                {item.label[isVi ? "vi" : "en"]}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <GlassButton
            onClick={() => {
              telemetry.track("download_cv", "navbar_cta");
              onOpenResumeModal();
            }}
            variant="primary"
            size="sm"
            icon={<FileDown className="h-3.5 w-3.5" />}
            className="hidden whitespace-nowrap sm:inline-flex"
          >
            {isVi ? "Tải CV" : "Get Resume"}
          </GlassButton>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full border-2 border-[#1e1e2a]/15 bg-white p-2 text-[#1e1e2a] lg:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t-2 border-[#1e1e2a]/10 bg-[#fff6e9]/95 px-4 pt-3 pb-6 backdrop-blur-xl lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`rounded-2xl border-2 px-3 py-2.5 text-[13px] font-bold whitespace-nowrap ${
                    isActive
                      ? "border-[#1e1e2a] bg-[#1e1e2a] text-white"
                      : "border-[#1e1e2a]/10 bg-white text-[#6e6e7e]"
                  }`}
                >
                  {item.label[isVi ? "vi" : "en"]}
                </Link>
              );
            })}
          </div>
          <div className="mt-3 border-t-2 border-[#1e1e2a]/10 pt-3">
            <GlassButton
              onClick={() => {
                telemetry.track("download_cv", "mobile_nav_cta");
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              variant="primary"
              size="md"
              icon={<FileDown className="h-4 w-4" />}
              className="w-full"
            >
              {isVi ? "Xem & Tải CV (PDF)" : "View & Download CV (PDF)"}
            </GlassButton>
          </div>
        </div>
      )}
    </header>
  );
}
