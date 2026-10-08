"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FileDown, Sun, Moon, Languages, Copy, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { contactData } from "@/data/portfolio-content";
import { editorialContent } from "@/data/editorial-content";
import { useLanguage } from "@/hooks/useLanguage";
import { telemetry } from "@/lib/telemetry";
import { resolveOsIcon } from "@/components/os/os-icons";
import type { PaletteCommand } from "@/components/editorial/CommandPalette";

/** Strip readonly from localized strings for command defs. */
function loc(v: { readonly en: string; readonly vi: string }): { en: string; vi: string } {
  return { en: v.en, vi: v.vi };
}

function scrollToHref(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function usePaletteCommands(onOpenResumeModal: () => void) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const { toggleLanguage, isVi } = useLanguage();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
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

  const dark = resolvedTheme === "dark";

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
      label: loc(editorialContent.palette.actionResume),
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
      label: loc(editorialContent.palette.actionTheme),
      keywords: ["dark", "light", "mode", "sang", "toi", "giao dien"],
      group: "action",
      icon: dark ? Sun : Moon,
      run: () => {
        setTheme(dark ? "light" : "dark");
        telemetry.track("theme_change", dark ? "light" : "dark");
      },
    },
    {
      id: "language",
      label: loc(editorialContent.palette.actionLanguage),
      keywords: ["en", "vi", "english", "vietnamese", "tieng viet", "ngon ngu"],
      group: "action",
      icon: Languages,
      run: () => toggleLanguage(),
    },
    {
      id: "copy-email",
      label: loc(editorialContent.palette.actionCopyEmail),
      keywords: ["contact", "mail", "email", "lien he"],
      group: "action",
      icon: Copy,
      run: async () => {
        try {
          await navigator.clipboard.writeText(contactData.email);
          setToast(isVi ? editorialContent.palette.copied.vi : editorialContent.palette.copied.en);
          telemetry.track("click", "palette_copy_email");
        } catch {
          // clipboard unavailable — no-op
        }
      },
    },
    {
      id: "hire",
      label: loc(editorialContent.palette.actionHire),
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

  const openPalette = useCallback(() => setOpen(true), []);

  return { paletteOpen: open, setPaletteOpen: setOpen, openPalette, commands, toast };
}
