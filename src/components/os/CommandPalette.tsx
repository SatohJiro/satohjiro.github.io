"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { osContent } from "@/data/os-content";
import { filterOsCommands, type OsCommandDef } from "@/lib/os-commands";
import type { LucideIcon } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export interface PaletteCommand extends OsCommandDef {
  run: () => void;
  group: "jump" | "action";
  icon: LucideIcon;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands: PaletteCommand[];
}

export function CommandPalette({ open, onClose, commands }: CommandPaletteProps) {
  const { language, isVi } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const defs = filterOsCommands(commands, query);
    const byId = new Map(commands.map((c) => [c.id, c]));
    return defs.map((d) => byId.get(d.id)).filter((c): c is PaletteCommand => Boolean(c));
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [open ]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setActiveIndex(0);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) =>
          filtered.length ? (i - 1 + filtered.length) % filtered.length : 0,
        );
      } else if (e.key === "Enter") {
        const cmd = filtered[activeIndex];
        if (cmd) {
          telemetry.track("click", `palette_${cmd.id}`);
          cmd.run();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, activeIndex, onClose]);

  if (!open) return null;

  const renderGroup = (group: "jump" | "action") => {
    const items = filtered.filter((c) => c.group === group);
    if (items.length === 0) return null;
    const title =
      group === "jump"
        ? isVi
          ? osContent.palette.groupJump.vi
          : osContent.palette.groupJump.en
        : isVi
          ? osContent.palette.groupAction.vi
          : osContent.palette.groupAction.en;
    return (
      <div key={group}>
        <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
          {title}
        </div>
        {items.map((cmd) => {
          const globalIdx = filtered.indexOf(cmd);
          const isActive = globalIdx === activeIndex;
          const Icon = cmd.icon;
          return (
            <button
              key={cmd.id}
              onMouseEnter={() => setActiveIndex(globalIdx)}
              onClick={() => {
                telemetry.track("click", `palette_${cmd.id}`);
                cmd.run();
                onClose();
              }}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-sm font-medium">
                {language === "vi" ? cmd.label.vi : cmd.label.en}
              </span>
              {cmd.hint && (
                <kbd
                  className={`rounded border px-1.5 font-mono text-[10px] ${
                    isActive
                      ? "border-white/30 text-white/80"
                      : "border-slate-300/60 text-slate-400 dark:border-white/15 dark:text-slate-500"
                  }`}
                >
                  {cmd.hint}
                </kbd>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-slate-950/40 px-4 pt-[14vh] backdrop-blur-sm dark:bg-black/60"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={isVi ? osContent.palette.placeholder.vi : osContent.palette.placeholder.en}
    >
      <div
        className="os-palette os-pop w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-slate-200/70 px-4 dark:border-white/10">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={isVi ? osContent.palette.placeholder.vi : osContent.palette.placeholder.en}
            className="h-12 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
            aria-label={isVi ? osContent.palette.placeholder.vi : osContent.palette.placeholder.en}
          />
          <kbd className="shrink-0 rounded border border-slate-300/60 px-1.5 font-mono text-[10px] text-slate-400 dark:border-white/15 dark:text-slate-500">
            esc
          </kbd>
        </div>
        <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-slate-400 dark:text-slate-500">
              {isVi ? osContent.palette.empty.vi : osContent.palette.empty.en}
            </div>
          ) : (
            <>
              {renderGroup("jump")}
              {renderGroup("action")}
            </>
          )}
        </div>
        <div className="flex items-center gap-4 border-t border-slate-200/70 px-4 py-2.5 font-mono text-[10px] text-slate-400 dark:border-white/10 dark:text-slate-500">
          <span className="flex items-center gap-1">
            <CornerDownLeft className="h-3 w-3" /> select
          </span>
          <span>↑↓ navigate</span>
          <span className="ml-auto">satohos ⌘K</span>
        </div>
      </div>
    </div>
  );
}
