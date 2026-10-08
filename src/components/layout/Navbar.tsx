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
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-3 max-w-6xl px-4 sm:px-6">
        <div className="y2k-glass flex h-14 items-center justify-between !rounded-full px-5">
          <Link href="#home" className="flex items-center gap-2 text-[15px] font-extrabold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-[#d8f9ff] to-[#3fd2ec] text-[13px] text-[#041c30] shadow-inner">◍</span>
            SatohJiro
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {siteConfig.navItems.map((item) => (
              <Link key={item.id} href={item.href}
                onClick={() => telemetry.track("click", `nav_${item.id}`)}
                className={`text-[12px] font-bold uppercase tracking-[0.14em] transition-colors hover:text-[#7ce7f4] ${active === item.id ? "text-[#7ce7f4]" : "text-white/75"}`}>
                {item.label[isVi ? "vi" : "en"]}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button onClick={() => { telemetry.track("download_cv", "navbar"); onOpenResumeModal(); }}
              className="y2k-btn hidden !px-5 !py-2.5 !text-[11px] sm:inline-flex">
              <FileDown className="h-3.5 w-3.5" /> {isVi ? "CV" : "Résumé"}
            </button>
            <button onClick={() => setOpen(!open)} className="p-1.5 lg:hidden cursor-pointer" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="y2k-glass mt-2 px-5 py-3 lg:hidden">
            {siteConfig.navItems.map((item) => (
              <Link key={item.id} href={item.href}
                onClick={() => { telemetry.track("click", `nav_${item.id}`); setOpen(false); }}
                className="block border-b border-white/10 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white/80 last:border-0">
                {item.label[isVi ? "vi" : "en"]}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
