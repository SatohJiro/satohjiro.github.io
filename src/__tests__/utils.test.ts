import { describe, it, expect } from "vitest";
import { cn, formatDate } from "../lib/utils";

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
});
