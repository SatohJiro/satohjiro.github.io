"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FileDown, Sun, Moon, Languages, Copy, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { contactData } from "@/data/portfolio-content";
import { osContent } from "@/data/os-content";
import { useLanguage } from "@/hooks/useLanguage";
import { telemetry } from "@/lib/telemetry";
import { BootSequence } from "./BootSequence";
import { MenuBar } from "./MenuBar";
import { DesktopDock } from "./DesktopDock";
import { HeroWindow } from "./HeroWindow";
import { CommandPalette, type PaletteCommand } from "./CommandPalette";
import { resolveOsIcon } from "./os-icons";

/** Strip readonly from os-content localized strings for command defs. */
function loc(v: { readonly en: string; readonly vi: string }): { en: string; vi: string } {
  return { en: v.en, vi: v.vi };
}

function scrollToHref(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function DesktopShell({ onOpenResumeModal }: { onOpenResumeModal: () => void }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { toggleLanguage, isVi } = useLanguage();

  const openPalette = useCallback(() => setPaletteOpen(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback(
    (message: string) => setToast(message),
    [],
  );

  const commands: PaletteCommand[] = [
    ...siteConfig.navItems.map((item) => ({
      id: `go-${item.id}`,
      label: item.label,
      keywords: [item.id, item.href.replace("#", "")],
      group: "jump" as const,
      icon: resolveOsIcon(item.icon),
      run: () => scrollToHref(item.href),
    })),
    {
      id: "resume",
      label: loc(osContent.palette.actionResume),
      hint: "CV",
      keywords: ["cv", "download", "pdf", "resume"],
      group: "action",
      icon: FileDown,
      run: () => {
        telemetry.track("download_cv", "palette");
        onOpenResumeModal();
      },
    },
    {
      id: "theme",
      label: loc(osContent.palette.actionTheme),
      keywords: ["dark", "light", "mode", "sang", "toi", "giao dien"],
      group: "action",
      icon: theme === "dark" ? Sun : Moon,
      run: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        telemetry.track("theme_change", theme === "dark" ? "light" : "dark");
      },
    },
    {
      id: "language",
      label: loc(osContent.palette.actionLanguage),
      keywords: ["en", "vi", "english", "vietnamese", "tieng viet", "ngon ngu"],
      group: "action",
      icon: Languages,
      run: () => toggleLanguage(),
    },
    {
      id: "copy-email",
      label: loc(osContent.palette.actionCopyEmail),
      keywords: ["contact", "mail", "email", "lien he"],
      group: "action",
      icon: Copy,
      run: async () => {
        try {
          await navigator.clipboard.writeText(contactData.email);
          showToast(isVi ? osContent.palette.copied.vi : osContent.palette.copied.en);
          telemetry.track("click", "palette_copy_email");
        } catch {
          // clipboard unavailable — no-op
        }
      },
    },
    {
      id: "hire",
      label: loc(osContent.palette.actionHire),
      hint: "!",
      keywords: ["recruit", "interview", "job", "tuyen dung", "phong van"],
      group: "action",
      icon: Zap,
      run: () => {
        telemetry.track("click", "palette_hire");
        scrollToHref("#contact");
      },
    },
  ];

  return (
    <section
      id="home"
      className="os-desktop relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 pb-28 pt-20 lg:px-8 lg:pt-16"
    >
      {!booted && <BootSequence onDone={() => setBooted(true)} />}

      <MenuBar onOpenPalette={openPalette} />

      {/* Hero app window */}
      <div className="os-rise relative z-10 w-full max-w-3xl">
        <HeroWindow onOpenResumeModal={onOpenResumeModal} />
      </div>

      <DesktopDock onOpenPalette={openPalette} />

      <CommandPalette
        key={paletteOpen ? "palette-open" : "palette-closed"}
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
      />

      {toast && (
        <div
          role="status"
          className="os-toast fixed bottom-20 left-1/2 z-[95] -translate-x-1/2"
        >
          {toast}
        </div>
      )}
    </section>
  );
}
