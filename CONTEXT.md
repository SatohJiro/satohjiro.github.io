# PROJECT CONTEXT & ARCHITECTURE DECISION RECORDS (ADR)

> **Repository:** SatohJiro Portfolio  
> **Framework:** Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + Vitest  
> **Standard:** The APEX Master Framework & Anti-Slop Design Intelligence  

---

## 1. UBIQUITOUS LANGUAGE & DOMAIN TERMS
- **Interactive Terminal:** Custom retro-modern developer console component (`InteractiveTerminal.tsx`) rendering command outputs (`whoami`, `skills`, `experience`, `projects`, `awards`, `contact`, `hire`). Emojis are strictly avoided in favor of clean tags (`[Honor]`, `[Award]`, `[Priority]`).
- **ATS Resume Modal:** Semantic resume viewer modal (`ResumeModal.tsx`) with instant copy, print, PDF download, and full-screen route link (`/resume`).
- **Privacy Telemetry Drawer:** Zero-tracking, localized in-memory audit drawer (`PrivacyTelemetryDrawer.tsx`) logging user interaction events (`click`, `search`, `theme_toggle`).
- **Pixel Version RPG:** Alternate 8-bit retro gaming edition of the portfolio hosted at `pixel-portfolio-swart.vercel.app`, accessible via `PixelVersionFloatButton.tsx`.
- **Glass Design Primitives:** Curated design tokens encapsulated in `GlassCard.tsx`, `GlassBadge.tsx`, `GlassButton.tsx`, and `GlassModal.tsx`.

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

