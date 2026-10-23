# PROJECT CONTEXT & ARCHITECTURE DECISION RECORDS (ADR)

> **Repository:** SatohJiro Portfolio  
> **Framework:** Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + Vitest  
> **Standard:** The APEX Master Framework & Anti-Slop Design Intelligence  

---

## 1. UBIQUITOUS LANGUAGE & DOMAIN TERMS
- **Chapter:** A numbered homepage section (`01 About` … `06 Contact`) rendered with `ChapterHeader.tsx`; ids and copy live in `src/data/editorial-content.ts`.
- **Command Palette:** `⌘K` / `Ctrl+K` launcher (`CommandPalette.tsx` + `usePaletteCommands.ts`) for jumps and actions; filtering in `src/lib/os-commands.ts` (filename kept from the retired SatohOS phase).
- **ATS Resume Modal:** Semantic resume viewer modal (`ResumeModal.tsx`) with print, JSON export, and full-screen route link (`/resume`). Defaults to the site language.
- **Privacy Telemetry Drawer:** Zero-tracking, localized in-memory audit drawer (`PrivacyTelemetryDrawer.tsx`) logging user interaction events (`click`, `search`, `theme_toggle`).
- **Pixel Version RPG:** Alternate 8-bit retro gaming edition of the portfolio hosted at `pixel-portfolio-swart.vercel.app`, accessible via `PixelVersionFloatButton.tsx`.
- **Content honesty rules (tested):** Project cards only link to real repositories (never the bare GitHub profile); copy never implies employment at a client/vendor (e.g. Salesforce); the 2019–2023 cohort is never called "Class of 2019".

---

## 2. THE 3 DESIGN DIALS & ANTI-SLOP SYSTEM
- `DESIGN_VARIANCE: 4/10` (Disciplined, clean, senior-engineer portfolio).
- `MOTION_INTENSITY: 5/10` (Micro-animations, smooth hover states, respects `prefers-reduced-motion`).
- `VISUAL_DENSITY: 6/10` (Comfortable breathing room, compact technical precision).
- **The Lila Rule Palette:** Slate neutral base (`#090d16` in dark mode, `#f8fafc` in light mode) + single Electric Blue accent (`#2563eb` / `#3b82f6`). Prohibited: AI purple/cyan clashing gradients.
- **Hero Viewport Discipline:** `min-h-[100dvh]`, 2-line title max, description strictly under 20 words, 4-item stack.
- **Eyebrow Discipline:** Maximum 1 badge per 3 sections to eliminate visual noise.

---

## 3. ARCHITECTURE DECISION RECORDS (ADRs)

### ADR-001: Tailwind v4 Theme Font Binding
- **Decision:** Fonts `--font-geist-sans` and `--font-geist-mono` injected from Next.js fonts are bound in `@theme` in `globals.css` to `--font-sans` and `--font-mono`.
- **Rationale:** Ensures `font-sans` and `font-mono` utilities work natively without Tailwind v3 configuration files.

### ADR-002: Vitest Harness for Data & Logic Integrity
- **Decision:** Use Vitest 3 (`vitest@^3.0.0`) with `@vitejs/plugin-react` in `vitest.config.ts`.
- **Rationale:** Guarantees bi-directional multilingual sync (EN/VI), date consistency, and telemetry unit testing.

### ADR-003: Windows Execution Policy Safety
- **Decision:** Execute all npm/npx lifecycle scripts via `cmd.exe /c npm.cmd <command>`.
- **Rationale:** Bypasses PowerShell script execution restrictions on Windows developer environments.

### ADR-004: PWA Web App Manifest for Static Export
- **Decision:** Declare `src/app/manifest.ts` with `export const dynamic = "force-static"` and standard Android/Apple icon definitions.
- **Rationale:** Generates `/manifest.webmanifest` during `next build` compatible with `output: 'export'` on GitHub Pages.


### ADR-005: SatohOS Desktop Shell (Phase 1 UI refactor)
- **Decision:** Reframe the portfolio as a developer OS: `BootSequence` overlay, `MenuBar` (status/clock/lang/theme/⌘K), `HeroWindow` (rewritten hero in `DesktopWindow` chrome), `DesktopDock` (icon nav replacing desktop text navbar), and `CommandPalette` (⌘K fuzzy jump/actions). Legacy sections stay untouched below the desktop viewport; `Navbar` becomes mobile-only (`lg:hidden`).
- **Rationale:** Fixes the "one recipe ×7 sections" monotony while keeping i18n EN/VI parity, dark-first theming, static export, telemetry, and vitest coverage. Command filtering is pure (`src/lib/os-commands.ts`) and unit-tested; copy is centralized in `src/data/os-content.ts` with bilingual parity tests.
- **Dials for this phase:** `DESIGN_VARIANCE: 6/10`, `MOTION_INTENSITY: 6/10`, `VISUAL_DENSITY: 6/10`. Lila Rule kept: neutral wallpaper + single blue accent reserved for actions/focus.

### ADR-006: Editorial Layout Supersedes SatohOS Shell
- **Decision:** The SatohOS desktop shell (ADR-005) was replaced by the editorial / Linear-style layout (`src/components/editorial/*`). Only the command palette survived.
- **Rationale:** Recruiters scan content first; chrome like boot screens and docks delayed it.

### ADR-007: Build-time OG Image via Static Route Handler
- **Decision:** `src/app/og-image.png/route.tsx` returns an `ImageResponse` with `dynamic = "force-static"`, exported to `out/og-image.png`.
- **Rationale:** Keeps a stable `.png` URL (`siteConfig.ogImage`) with correct content type on GitHub Pages; the `opengraph-image` file convention emits a hashed URL instead.
