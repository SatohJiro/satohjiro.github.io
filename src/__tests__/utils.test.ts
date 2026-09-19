import { describe, it, expect } from "vitest";
import { cn, formatDate } from "../lib/utils";
import { resolveLocale, resolveLocaleArray } from "../lib/locale";

describe("utils cn & formatDate", () => {
  it("merges class names correctly without conflicts", () => {
    const result = cn("p-4 text-red-500", "p-6", { "bg-blue-500": true, "bg-green-500": false });
    expect(result).toContain("p-6");
    expect(result).not.toContain("p-4");
    expect(result).toContain("bg-blue-500");
    expect(result).not.toContain("bg-green-500");
  });

  it("formats timestamps into time string", () => {
    const ts = new Date("2026-01-01T12:00:00Z").getTime();
    const formatted = formatDate(ts);
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe("string");
  });

  it("resolves localized values correctly based on language flag", () => {
    const bilingual = { en: "English text", vi: "Văn bản tiếng Việt" };
    expect(resolveLocale(bilingual, true)).toBe("Văn bản tiếng Việt");
    expect(resolveLocale(bilingual, false)).toBe("English text");

    const plainString = "Universal Location";
    expect(resolveLocale(plainString, true)).toBe("Universal Location");
    expect(resolveLocale(plainString, false)).toBe("Universal Location");

    expect(resolveLocale(undefined, true, "default")).toBe("default");
  });

  it("resolves localized arrays safely", () => {
    const bilingualArr = { en: ["Item A", "Item B"], vi: ["Mục A", "Mục B"] };
    expect(resolveLocaleArray(bilingualArr, true)).toEqual(["Mục A", "Mục B"]);
    expect(resolveLocaleArray(bilingualArr, false)).toEqual(["Item A", "Item B"]);

    const plainArr = ["Const 1", "Const 2"];
    expect(resolveLocaleArray(plainArr, true)).toEqual(["Const 1", "Const 2"]);

    expect(resolveLocaleArray(undefined, true)).toEqual([]);
  });
});


