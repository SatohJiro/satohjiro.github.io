import { describe, it, expect } from "vitest";
import { editorialContent, chapters } from "../data/editorial-content";

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

describe("editorial-content bilingual parity", () => {
  it("every localized string has non-empty en and vi", () => {
    const found: { path: string; value: Localized }[] = [];
    collectLocalized(editorialContent, "", found);
    expect(found.length).toBeGreaterThan(0);
    for (const { path, value } of found) {
      expect(value.en.trim().length, `${path}.en`).toBeGreaterThan(0);
      expect(value.vi.trim().length, `${path}.vi`).toBeGreaterThan(0);
    }
  });

  it("hero description stays under 20 words per language (hero discipline)", () => {
    for (const lang of ["en", "vi"] as const) {
      const words = editorialContent.hero.description[lang].trim().split(/\s+/).length;
      expect(words, `hero.description.${lang}`).toBeLessThanOrEqual(20);
    }
  });

  it("chapter index is sequential 01..07 and matches chapters record", () => {
    expect(chapters.map((c) => c.index)).toEqual(["01", "02", "03", "04", "05", "06", "07"]);
    for (const c of chapters) {
      expect(editorialContent.chapters[c.id], `chapter ${c.id}`).toBeDefined();
    }
  });

  it("marquee lists at least 6 capabilities", () => {
    expect(editorialContent.hero.marquee.length).toBeGreaterThanOrEqual(6);
  });
});
