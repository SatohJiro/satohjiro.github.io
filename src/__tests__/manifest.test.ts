import { describe, it, expect } from "vitest";
import manifest from "../app/manifest";

describe("PWA Web App Manifest", () => {
  it("generates valid PWA manifest configuration", () => {
    const data = manifest();
    expect(data.name).toContain("Nguyen Tran Anh");
    expect(data.short_name).toBe("SatohJiro");
    expect(data.start_url).toBe("/");
    expect(data.display).toBe("standalone");
    expect(data.background_color).toBe("#08090a");
    expect(data.theme_color).toBe("#08090a");
    expect(data.icons?.length).toBeGreaterThanOrEqual(2);
  });
});
