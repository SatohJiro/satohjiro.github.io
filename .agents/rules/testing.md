# TESTING RULES

> **Repository:** SatohJiro Portfolio  
> **Framework:** Vitest 3 (`vitest run`)  
> **Environment:** Node (`vitest.config.ts`) with `@/` path alias support  
> **Principle:** Test independently. Enforce the Iron Law of TDD. Never modify production code merely to make tests pass.

---

## 1. TEST FRAMEWORK & HARNESS CONFIGURATION

The testing harness is powered by **Vitest 3**, configured in `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

---

## 2. TEST DIRECTORY & EXISTING SUITES

All automated tests reside in `src/__tests__/` and end with `.test.ts`:

| Test Suite | Purpose | Key Invariants Verified |
| :--- | :--- | :--- |
| `portfolio-content.test.ts` | Multilingual data integrity | EN & VI item count symmetry, non-empty fields, chronological date ordering, valid HTTP/HTTPS URLs, non-empty skill tags |
| `manifest.test.ts` | Static PWA Web App Manifest | Correct app name, start_url, standalone display mode, 192x192 and 512x512 icon definitions |
| `telemetry.test.ts` | In-memory analytics bus | Event tracking, timestamp injection, queue size bounding, memory clear |
| `utils.test.ts` | Utility functions | `cn()` Tailwind class merging, conditional falsy exclusion, conflict resolution |

---

## 3. REAL VERIFICATION COMMANDS

Agents must execute the real, verified repository test commands:

```bash
# Execute full Vitest suite in one-shot mode (Bypassing Windows PowerShell restrictions)
cmd.exe /c npm.cmd test

# Verify production static export build & typecheck
cmd.exe /c npm.cmd run build
```

> [!IMPORTANT]
> Do NOT use fictional test runners (e.g., `jest`, `mocha`, `karma`, `mvn test`). The test runner for this repository is Vitest 3 via `npm.cmd test`.

---

## 4. TDD PROTOCOL (THE IRON LAW OF TDD)

For any new feature logic or bug fix:
1. **Red:** Write a failing test in `src/__tests__/` asserting the new behavior or capturing the reproduction of the bug. Run `cmd.exe /c npm.cmd test` and verify it fails for the expected reason.
2. **Green:** Implement the minimal production code necessary to satisfy the assertion. Run `cmd.exe /c npm.cmd test` and confirm it turns green.
3. **Refactor:** Clean up the implementation while preserving green tests.
4. **Build Check:** Run `cmd.exe /c npm.cmd run build` to verify static compilation succeeds.

---

## 5. TEST QUALITY STANDARDS

1. **Multilingual Symmetry:**
   Any change to `portfolio-content.ts` (e.g., adding an experience item, project, or award) MUST update both the `vi` and `en` dictionaries. `portfolio-content.test.ts` will immediately fail if parity is broken.
2. **Deterministic Assertions:**
   Never write flaky tests depending on live network requests, system time without mocking, or race conditions.
3. **No Muting Tests:**
   Never skip (`test.skip`), disable, or weaken test assertions to pass a check.
