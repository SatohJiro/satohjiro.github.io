import { describe, it, expect } from "vitest";
import { telemetry } from "../lib/telemetry";

describe("privacy telemetry module", () => {
  it("safe execution in non-browser environment without throwing", () => {
    expect(() => {
      telemetry.track("page_view", "test_runner");
    }).not.toThrow();

    expect(telemetry.isOptedOut()).toBe(false);
    expect(telemetry.getEvents()).toEqual([]);
  });
});
