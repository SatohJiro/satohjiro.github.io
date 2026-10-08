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
          const isPast = window.scrollY > 24;
          setScrolled((prev) => (prev !== isPast ? isPast : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when the mobile menu is open (html is the viewport scroller).
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

  // Terminal nav item removed — section no longer exists on this branch.
  const navItems = siteConfig.navItems.filter((item) => item.id !== "terminal");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#08090a]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="#home"
          onClick={() => handleNavClick("home")}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5e6ad2] font-mono text-[11px] font-bold tracking-wider text-white shadow-[0_0_20px_rgba(94,106,210,0.45)] transition-transform group-hover:scale-105">
            NTA
          </div>
          <div className="hidden text-left sm:block">
            <div className="whitespace-nowrap text-sm font-semibold tracking-tight text-white">
              {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
            </div>
            <div className="font-mono text-[11px] leading-tight text-[#8a8f98]">@SatohJiro</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`rounded-lg px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-white/[0.07] text-white"
                    : "text-[#8a8f98] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {item.label[isVi ? "vi" : "en"]}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <GlassButton
            onClick={() => {
              telemetry.track("download_cv", "navbar_cta");
              onOpenResumeModal();
            }}
            variant="primary"
            size="sm"
            icon={<FileDown className="w-3.5 h-3.5" />}
            className="hidden whitespace-nowrap sm:inline-flex"
          >
            {isVi ? "Tải CV" : "Get Resume"}
          </GlassButton>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[#b6b9c0] transition-colors hover:bg-white/[0.06] hover:text-white lg:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.06] bg-[#08090a]/95 px-4 pt-2 pb-5 backdrop-blur-xl lg:hidden">
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`rounded-lg px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-white/[0.07] text-white"
                      : "text-[#8a8f98] hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {item.label[isVi ? "vi" : "en"]}
                </Link>
              );
            })}
          </div>
          <div className="mt-3 border-t border-white/[0.06] pt-3">
            <GlassButton
              onClick={() => {
                telemetry.track("download_cv", "mobile_nav_cta");
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              variant="primary"
              size="md"
              icon={<FileDown className="w-4 h-4" />}
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
