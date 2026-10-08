"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { editorialContent } from "@/data/editorial-content";
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

  const t = editorialContent.palette;

  const filtered = useMemo(() => {
    const defs = filterOsCommands(commands, query);
    const byId = new Map(commands.map((c) => [c.id, c]));
    return defs.map((d) => byId.get(d.id)).filter((c): c is PaletteCommand => Boolean(c));
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [open]);

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
    const title = isVi
      ? group === "jump" ? t.groupJump.vi : t.groupAction.vi
      : group === "jump" ? t.groupJump.en : t.groupAction.en;
    return (
      <div key={group}>
        <div className="px-4 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ed-muted)]">
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
              className={`flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-[var(--ed-ink)] hover:bg-blue-500/10"
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
                      : "border-[var(--ed-hairline)] text-[var(--ed-muted)]"
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
      className="fixed inset-0 z-[90] flex items-start justify-center bg-black/45 px-4 pt-[14vh] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={isVi ? t.placeholder.vi : t.placeholder.en}
    >
      <div
        className="ed-palette-pop w-full max-w-lg overflow-hidden border border-[var(--ed-hairline)] bg-[var(--ed-paper)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-[var(--ed-hairline)] px-4">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={isVi ? t.placeholder.vi : t.placeholder.en}
            className="h-12 w-full bg-transparent font-mono text-sm text-[var(--ed-ink)] outline-none placeholder:text-[var(--ed-muted)]"
            aria-label={isVi ? t.placeholder.vi : t.placeholder.en}
          />
          <kbd className="shrink-0 rounded border border-[var(--ed-hairline)] px-1.5 font-mono text-[10px] text-[var(--ed-muted)]">
            esc
          </kbd>
        </div>
        <div className="max-h-[46vh] overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center font-mono text-sm text-[var(--ed-muted)]">
              {isVi ? t.empty.vi : t.empty.en}
            </div>
          ) : (
            <>
              {renderGroup("jump")}
              {renderGroup("action")}
            </>
          )}
        </div>
        <div className="flex items-center gap-4 border-t border-[var(--ed-hairline)] px-4 py-2.5 font-mono text-[10px] text-[var(--ed-muted)]">
          <span className="flex items-center gap-1">
            <CornerDownLeft className="h-3 w-3" /> select
          </span>
          <span>↑↓ navigate</span>
          <span className="ml-auto">⌘K</span>
        </div>
      </div>
    </div>
  );
}
