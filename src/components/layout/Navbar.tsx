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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/25 bg-[#0e3a8a]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="#home" className="flex items-center gap-3">
          <span className="bp-cross" />
          <span className="font-mono text-[13px] font-semibold tracking-[0.14em]">
            N.TRAN ANH <span className="text-[#ffb000]">— DWG.001</span>
          </span>
        </Link>
        <nav className="hidden gap-5 lg:flex">
          {siteConfig.navItems.map((item, i) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => telemetry.track("click", `nav_${item.id}`)}
              className={`bp-label hover:text-white ${active === item.id ? "text-[#ffb000]" : ""}`}
            >
              {String(i + 1).padStart(2, "0")}.{item.label[isVi ? "vi" : "en"]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button onClick={() => { telemetry.track("download_cv", "navbar"); onOpenResumeModal(); }} className="bp-btn hidden !py-2 sm:inline-flex">
            <FileDown className="h-3.5 w-3.5" /> {isVi ? "Bản vẽ CV" : "CV Sheet"}
          </button>
          <button onClick={() => setOpen(!open)} className="p-1.5 lg:hidden cursor-pointer" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/25 bg-[#0e3a8a] px-4 py-2 lg:hidden">
          {siteConfig.navItems.map((item, i) => (
            <Link key={item.id} href={item.href}
              onClick={() => { telemetry.track("click", `nav_${item.id}`); setOpen(false); }}
              className="bp-label block border-b border-white/10 py-3">
              {String(i + 1).padStart(2, "0")}.{item.label[isVi ? "vi" : "en"]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
