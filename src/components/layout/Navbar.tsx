"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageToggle } from "./LanguageToggle";
import { FileDown, Menu, X } from "lucide-react";
import { telemetry } from "@/lib/telemetry";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export function Navbar({ onOpenResumeModal }: { onOpenResumeModal: () => void }) {
  const { isVi } = useLanguage();
  const [open, setOpen] = useState(false);
  const ids = React.useMemo(() => siteConfig.navItems.map((i) => i.id), []);
  const active = useScrollSpy(ids, "home");
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open ]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#c9a227]/25 bg-[#0e0d0b]/92 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#home" className="deco-title text-lg tracking-[0.2em] uppercase">
          <span className="text-[#c9a227]">◆</span> NTA
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {siteConfig.navItems.map((item) => (
            <Link key={item.id} href={item.href}
              onClick={() => telemetry.track("click", `nav_${item.id}`)}
              className={`text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors hover:text-[#c9a227] ${active === item.id ? "text-[#c9a227]" : "text-[#f3ecdc]/70"}`}>
              {item.label[isVi ? "vi" : "en"]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <button onClick={() => { telemetry.track("download_cv", "navbar"); onOpenResumeModal(); }}
            className="deco-btn hidden !py-2.5 sm:inline-flex">
            <FileDown className="h-3.5 w-3.5" /> {isVi ? "Hồ sơ" : "Dossier"}
          </button>
          <button onClick={() => setOpen(!open)} className="p-1 text-[#c9a227] lg:hidden cursor-pointer" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-[#c9a227]/25 bg-[#0e0d0b] px-6 py-3 lg:hidden">
          {siteConfig.navItems.map((item) => (
            <Link key={item.id} href={item.href}
              onClick={() => { telemetry.track("click", `nav_${item.id}`); setOpen(false); }}
              className="block border-b border-[#c9a227]/15 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f3ecdc]/80 last:border-0">
              {item.label[isVi ? "vi" : "en"]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
