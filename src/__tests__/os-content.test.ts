import { describe, it, expect } from "vitest";
import { osContent } from "../data/os-content";

type Localized = { en: string; vi: string };

function collectLocalized(obj: unknown, path: string, out: { path: string; value: Localized }[]) {
  if (obj && typeof obj === "object") {
    const rec = obj as Record<string, unknown>;
    if (typeof rec.en === "string" && typeof rec.vi === "string") {
      out.push({ path, value: rec as Localized });
      return;
    }
    for (const key of Object.keys(rec)) {
      collectLocalized(rec[key], path ? `${path}.${key}` : key, out);
    }
  }
}

describe("os-content bilingual parity", () => {
  it("every localized string has non-empty en and vi", () => {
    const found: { path: string; value: Localized }[] = [];
    collectLocalized(osContent, "", found);
    expect(found.length).toBeGreaterThan(0);
    for (const { path, value } of found) {
      expect(value.en.trim().length, `${path}.en`).toBeGreaterThan(0);
      expect(value.vi.trim().length, `${path}.vi`).toBeGreaterThan(0);
    }
  });

  it("boot lines are plain ASCII mono log lines (no emoji)", () => {
    expect(osContent.boot.lines.length).toBeGreaterThanOrEqual(4);
    for (const line of osContent.boot.lines) {
      expect(line.length).toBeGreaterThan(0);
      expect(/[^\x00-\x7F]/.test(line), line).toBe(false);
    }
  });

  it("hero description stays under 20 words per language (hero discipline)", () => {
    for (const lang of ["en", "vi"] as const) {
      const words = osContent.hero.description[lang].trim().split(/\s+/).length;
      expect(words, `hero.description.${lang}`).toBeLessThanOrEqual(20);
    }
  });
});
