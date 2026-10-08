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

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#e2e2e2] bg-[#fafafa]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="#home" className="flex items-baseline gap-2">
          <span className="text-[15px] font-extrabold tracking-tight">N.Tran Anh</span>
          <span className="swiss-label hidden sm:inline">@SatohJiro</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {siteConfig.navItems.map((item, i) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => telemetry.track("click", `nav_${item.id}`)}
              className={`swiss-label transition-colors hover:text-[#e30613] ${
                activeSection === item.id ? "text-[#e30613]" : ""
              }`}
            >
              <span className="mr-1 text-[#e30613]">{String(i + 1).padStart(2, "0")}</span>
              {item.label[isVi ? "vi" : "en"]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            onClick={() => {
              telemetry.track("download_cv", "navbar_cta");
              onOpenResumeModal();
            }}
            className="swiss-btn hidden !px-4 !py-2 !text-[13px] sm:inline-flex"
          >
            <FileDown className="h-3.5 w-3.5" />
            {isVi ? "CV" : "Résumé"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 lg:hidden cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="border-t border-[#e2e2e2] bg-[#fafafa] px-4 py-3 lg:hidden">
          {siteConfig.navItems.map((item, i) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => {
                telemetry.track("click", `nav_${item.id}`);
                setMobileMenuOpen(false);
              }}
              className="swiss-label flex items-center gap-3 border-b border-[#e2e2e2] py-3 last:border-0"
            >
              <span className="text-[#e30613]">{String(i + 1).padStart(2, "0")}</span>
              {item.label[isVi ? "vi" : "en"]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
