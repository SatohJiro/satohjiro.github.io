import { describe, it, expect } from "vitest";
import { filterOsCommands, type OsCommandDef } from "../lib/os-commands";

const fixture: OsCommandDef[] = [
  {
    id: "go-projects",
    label: { en: "Go to Projects", vi: "Tới mục Dự án" },
    keywords: ["work", "portfolio", "du an"],
  },
  {
    id: "go-terminal",
    label: { en: "Open Terminal", vi: "Mở Terminal" },
    keywords: ["console", "cli", "sandbox"],
  },
  {
    id: "toggle-theme",
    label: { en: "Toggle theme", vi: "Đổi giao diện" },
    keywords: ["dark", "light", "mode", "sang", "toi"],
  },
  {
    id: "copy-email",
    label: { en: "Copy email address", vi: "Sao chép địa chỉ email" },
    keywords: ["contact", "mail", "lien he"],
  },
];

describe("filterOsCommands", () => {
  it("returns all commands on empty query", () => {
    expect(filterOsCommands(fixture, "")).toHaveLength(4);
    expect(filterOsCommands(fixture, "   ")).toHaveLength(4);
  });

  it("matches case-insensitively against labels", () => {
    const res = filterOsCommands(fixture, "TERMINAL");
    expect(res.map((c) => c.id)).toEqual(["go-terminal"]);
  });

  it("matches labels in either language", () => {
    const res = filterOsCommands(fixture, "terminal");
    expect(res.map((c) => c.id)).toEqual(["go-terminal"]);
  });

  it("matches keywords", () => {
    const res = filterOsCommands(fixture, "portfolio");
    expect(res.map((c) => c.id)).toEqual(["go-projects"]);
  });

  it("ignores Vietnamese diacritics when matching", () => {
    const res = filterOsCommands(fixture, "kinh nghiem");
    expect(res).toHaveLength(0); // no fixture has it; sanity
    const res2 = filterOsCommands(fixture, "du an");
    expect(res2.map((c) => c.id)).toEqual(["go-projects"]);
    const res3 = filterOsCommands(fixture, "dự án");
    expect(res3.map((c) => c.id)).toEqual(["go-projects"]);
  });

  it("requires every query token to match (AND semantics)", () => {
    const res = filterOsCommands(fixture, "open terminal");
    expect(res.map((c) => c.id)).toEqual(["go-terminal"]);
    expect(filterOsCommands(fixture, "open email")).toHaveLength(0);
  });

  it("returns empty array when nothing matches", () => {
    expect(filterOsCommands(fixture, "xyzzy")).toHaveLength(0);
  });

  it("does not mutate the input array", () => {
    const copy = [...fixture];
    filterOsCommands(fixture, "terminal");
    expect(fixture).toEqual(copy);
  });
});
