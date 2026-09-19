# ARCHITECTURE RULES

> **Repository:** SatohJiro Portfolio  
> **Framework:** Next.js 16.3.1 (App Router) + React 19.2.8 + TypeScript 5 + Tailwind CSS v4  
> **Target:** Static Single Page Application Export (`output: "export"`) deployed to GitHub Pages

---

## 1. HIGH-LEVEL ARCHITECTURAL BLUEPRINT

The application is architected as a high-performance, statically generated Single Page Application (SPA) with client-side progressive enhancement.

```
                    ┌─────────────────────────────────┐
                    │      GitHub Actions CI/CD       │
                    │   (.github/workflows/deploy.yml) │
                    └────────────────┬────────────────┘
                                     │ npm run build (Turbopack)
                                     ▼
                    ┌─────────────────────────────────┐
                    │       Static Output (`out/`)     │
                    │   HTML, WebManifest, Assets     │
                    └────────────────┬────────────────┘
                                     │ Deployed to GitHub Pages
                                     ▼
                    ┌─────────────────────────────────┐
                    │     Client Browser (Next.js)    │
                    │  React 19 + Hydration + Hooks   │
                    └─────────────────────────────────┘
```

### Core Architecture Characteristics:
1. **Zero Server Runtime:** There are NO server-side API routes, database connections, or dynamic server runtimes (`getServerSideProps`, headers, cookies).
2. **Static Export Mandate:** Every route is prerendered at build time into `./out` via `output: "export"` in `next.config.ts`.
3. **PWA & Static Metadata:** `src/app/manifest.ts`, `sitemap.ts`, and `robots.ts` use `export const dynamic = "force-static"`.
4. **Client-Side Progressive Enhancement:** Dynamic client interactions (modals, drawers, interactive terminal) are loaded via `next/dynamic` with `{ ssr: false }` to minimize Initial Server HTML size and Total Blocking Time (TBT).

---

## 2. REPOSITORY DIRECTORY STRUCTURE & MODULE BOUNDARIES

```
src/
├── app/                  # Next.js App Router root
│   ├── layout.tsx        # Root layout, Google Font bindings, Theme & Language providers
│   ├── page.tsx          # Homepage orchestrating all portfolio sections
│   ├── globals.css       # Tailwind v4 theme bindings, CSS tokens, glassmorphism utilities
│   ├── manifest.ts       # Static PWA Web Manifest generator
│   ├── robots.ts         # Static robots.txt generator
│   ├── sitemap.ts        # Static sitemap.xml generator
│   └── resume/           # Full-page ATS resume route
│
├── components/           # Component library organized by domain
│   ├── glass/            # Reusable Design System primitives (GlassCard, GlassButton, etc.)
│   ├── layout/           # Structural chrome (Navbar, Footer, ThemeToggle, LanguageToggle)
│   ├── sections/         # Domain sections (Hero, About, Experience, Projects, Skills, Awards, Terminal, Contact)
│   ├── analytics/        # Privacy-first in-memory telemetry drawer (PrivacyTelemetryDrawer)
│   ├── resume/           # ATS resume modal viewer and download actions (ResumeModal)
│   ├── icons/            # Dedicated SVG brand and system icons
│   └── game/             # Retro easter-egg launcher and components
│
├── data/                 # Static content and bilingual data dictionaries
│   └── portfolio-content.ts # Single Source of Truth (SSOT) for EN and VI content
│
├── hooks/                # Custom React state and event hooks
│   ├── useLanguage.tsx   # React context & hook for English / Vietnamese localization
│   ├── useScrollSpy.ts   # Window scroll observer for active navigation highlighting
│   ├── useTelemetry.ts   # Hook interface for in-memory interaction tracking
│   └── useTilt.ts        # 3D interactive tilt micro-interaction hook
│
├── lib/                  # Core low-level libraries and utilities
│   ├── telemetry.ts      # Zero-cookie, localized in-memory telemetry event bus
│   └── utils.ts          # Classname merger (clsx + tailwind-merge)
│
├── types/                # Strict TypeScript domain interfaces
│   └── index.ts          # Central domain definitions (Experience, Project, Skill, Telemetry)
│
├── config/               # Application configuration constants
│   ├── site.ts           # Site navigation, metadata, social links
│   └── seo.ts            # JSON-LD Schema.org generators (Person, WebSite)
│
└── __tests__/            # Vitest automated test suites
    ├── portfolio-content.test.ts # Multilingual data parity and integrity tests
    ├── manifest.test.ts          # PWA manifest verification tests
    ├── telemetry.test.ts         # Telemetry event bus unit tests
    └── utils.test.ts             # cn() class utility tests
```

---

## 3. STRICT MODULE DEPENDENCY RULES

To prevent circular dependencies and coupling, agents must enforce this hierarchy:

```
[src/app/page.tsx] (Top-Level Page)
       │
       ▼
[src/components/sections/] & [src/components/layout/] (Domain Sections)
       │
       ├─────────────────────────┬────────────────────────┐
       ▼                         ▼                        ▼
[src/components/glass/]   [src/hooks/]            [src/data/]
(Design Primitives)       (State & Effects)       (Static Content)
       │                         │                        │
       └─────────────────────────┼────────────────────────┘
                                 ▼
                         [src/lib/ & src/types/]
                         (Foundation Utilities)
```

1. **Primitives Never Import Higher Layers:** Components in `src/components/glass/` must NEVER import from `src/components/sections/`, `src/hooks/`, or `src/app/`.
2. **Hooks Depend Only on Lib & Types:** Hooks in `src/hooks/` may import from `src/lib/` and `src/types/`, but never from UI components.
3. **Data is Pure:** `src/data/portfolio-content.ts` contains raw data structures and types; it must never import React, hooks, or browser-dependent globals.
4. **Code-Split Modals:** Non-critical heavy overlays (`ResumeModal`, `PrivacyTelemetryDrawer`) must be imported dynamically in `src/app/page.tsx` via `next/dynamic` with `{ ssr: false }`.

---

## 4. ENVIRONMENT & BUILD CONSIDERATIONS

1. **Windows Command Execution (ADR-003):**
   - On Windows, always invoke npm scripts using `cmd.exe /c npm.cmd <command>` to prevent PowerShell execution policy restrictions.
2. **Build Verification:**
   - Production builds must produce a clean `./out` directory without any compilation warnings or TypeScript type errors (`cmd.exe /c npm.cmd run build`).
