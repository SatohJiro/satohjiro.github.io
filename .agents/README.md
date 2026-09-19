# SATOHJIRO PORTFOLIO - MULTI-AGENT AI ENGINEERING WORKFLOW

> **Architecture Standard:** The APEX Master Framework & Anti-Slop Design Intelligence  
> **Target Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS v4 + Vitest 3  
> **Deployment Target:** GitHub Pages via Static HTML/Asset Export (`output: "export"`)

---

## 1. PURPOSE & VISION

This directory establishes a production-grade, multi-agent AI engineering workflow specifically calibrated for this Next.js 16 portfolio repository. 

It eliminates common AI coding pitfalls:
- Prevents premature coding without architectural planning.
- Prevents self-approving coders that merge unverified or broken changes.
- Eliminates AI visual slop, generic purple/cyan neon gradients, and emoji clutter.
- Enforces strict quality gates with independent testing and code review.
- Protects existing user work, static export compatibility, and bilingual (EN/VI) data parity.

---

## 2. THE MULTI-AGENT ARCHITECTURE MAP

```
                    Main Agent
                        │
          ┌─────────────┼─────────────┐
          │             │             │
     Researcher      Planner       UX/UI
          │             │        pre-design
          └──────┬──────┘
                 ↓
               Coder
                 │
       ┌─────────┼─────────┐
       ↓         ↓         ↓
    Tester    Reviewer   UX/UI
       │         │         │
       └─────────┼─────────┘
                 ↓
           Findings
                 ↓
            Coder Fix
                 ↓
          Verification
                 ↓
               Done
```

---

## 3. SPECIALIZED AGENTS ROLES & PERMISSIONS

| Agent | File | Mode | Role & Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **Researcher** | `agents/researcher.md` | Read-Only | Traces execution flows, maps module dependencies, uncovers existing patterns, and identifies architectural risks. Never edits production code. |
| **Planner** | `agents/planner.md` | Read-Only | Decomposes requirements into vertical implementation slices, defines file-level changes, data/API impacts, and test acceptance criteria. |
| **Coder** | `agents/coder.md` | Write-Enabled | Implements the approved plan surgically. Reuses glass design primitives. Executes real build and test commands locally. |
| **Tester** | `agents/tester.md` | Test-Runner | Independently verifies requirements. Writes automated test suites in `src/__tests__/`. Asserts multilingual EN/VI parity and telemetry invariants. |
| **Reviewer** | `agents/reviewer.md` | Read-Only | Conducts strict PR-level code reviews across Correctness, Architecture, Maintainability, Security, Performance, and Test Coverage. |
| **UX/UI** | `agents/ux-ui.md` | Read-Only | Enforces visual excellence, accessibility (WCAG AA), responsive breakpoints, and compliance with the 3 Design Dials and the Lila Rule. |

---

## 4. TASK CLASSIFICATION & INVOCATION GUIDANCE

The **Main Agent** acts as the Engineering Lead, selecting the optimal flow to balance speed and quality:

1. **TRIVIAL (Typo, simple variable rename, small CSS token adjustment):**
   - Flow: `Coder → Quick Verification (npm.cmd test)`
2. **SMALL (Minor utility addition, single component prop tweak):**
   - Flow: `Coder → Tester`
3. **NORMAL FEATURE (Non-UI utility, analytics, data enhancement):**
   - Flow: `Planner → Coder → Tester → Reviewer`
4. **USER-FACING FEATURE (New section, modal, navigation change, visual polish):**
   - Flow: `Planner → Coder → [Tester + Reviewer + UX/UI] → Findings Aggregation → Fix Loop → Verify`
5. **COMPLEX (Cross-cutting architectural change, state refactor, dynamic imports):**
   - Flow: `Researcher → Planner → Coder → [Tester + Reviewer + UX/UI] → Fix Loop → Verify`
6. **BUG FIX (UI glitch, hydration error, data desynchronization):**
   - Flow: `Reproduce (Tester) → Root Cause (Researcher/Planner) → Minimal Fix (Coder) → Regression Test → Reviewer → Verify`
7. **ARCHITECTURE / LARGE REFACTOR:**
   - Flow: `Researcher → Planner → Plan Approval → Isolated Coder → Comprehensive Testing & Review → Verify`

---

## 5. PARALLEL CONCURRENCY & FILE OWNERSHIP

### Concurrency Rules:
- **Zero Write Collision:** Multiple write-enabled agents must NEVER edit the same file simultaneously.
- **Read-Only Independence:** After the Coder completes implementation, the **Tester**, **Reviewer**, and **UX/UI** agents execute in parallel.
- **Serialization Mandate:** If two features touch `src/data/portfolio-content.ts` or `src/app/globals.css`, work must be serialized sequentially.

### File Ownership Map:
- **UI Sections:** `src/components/sections/**`
- **Design Primitives:** `src/components/glass/**`
- **Layout & Chrome:** `src/components/layout/**`
- **Hooks & State:** `src/hooks/**`
- **Data & Translations:** `src/data/**`
- **Core Library & Telemetry:** `src/lib/**`
- **Domain Types:** `src/types/**`
- **Test Suites:** `src/__tests__/**`

---

## 6. VERIFIED REPOSITORY COMMANDS

All agents must use the actual, verified repository commands:

```bash
# 1. Run automated unit test suite (Vitest 3)
cmd.exe /c npm.cmd test

# 2. Run static production build & TypeScript type checking (Next.js 16 App Router + Turbopack)
cmd.exe /c npm.cmd run build

# 3. Inspect working tree status
git status
git diff --stat
```

> [!NOTE]
> All npm scripts are executed via `cmd.exe /c npm.cmd <command>` to bypass Windows PowerShell script execution policy limitations (ADR-003).

---

## 7. REPOSITORY-SPECIFIC DESIGN RULES (THE 3 DIALS & THE LILA RULE)

1. **The 3 Design Dials:**
   - `DESIGN_VARIANCE: 4/10` (Disciplined, clean, senior-engineer portfolio).
   - `MOTION_INTENSITY: 5/10` (Micro-animations, smooth hover states, respects `prefers-reduced-motion`).
   - `VISUAL_DENSITY: 6/10` (Compact technical elegance, zero wasted space).
2. **The Lila Rule Palette:**
   - Slate Neutral Base (`#090d16` in dark mode, `#f8fafc` in light mode).
   - Single Electric Blue Accent (`#2563eb` / `#3b82f6`).
   - Prohibited: Generic purple/cyan glowing neon gradients.
3. **Hero Viewport Discipline:**
   - Hero section must fit in `min-h-[100dvh]` (never `h-screen`).
   - Title maximum 2 lines, description under 20 words, maximum 4 elements in the hero stack.
4. **Eyebrow Discipline:**
   - Maximum 1 pill badge per 3 consecutive sections.
5. **No Emojis in Professional UI:**
   - Use technical tags like `[Honor]`, `[Award]`, `[Priority]` instead of raw emojis.

---

## 8. REUSABLE PROMPT TEMPLATES

- [FEATURE_PROMPT.md](file:///d:/desktop/VS_WorkSpace/portfolio/.agents/FEATURE_PROMPT.md): Standard template for end-to-end feature development.
- [BUGFIX_PROMPT.md](file:///d:/desktop/VS_WorkSpace/portfolio/.agents/BUGFIX_PROMPT.md): TDD-driven bug diagnosis and surgical resolution template.
- [CODE_REVIEW_PROMPT.md](file:///d:/desktop/VS_WorkSpace/portfolio/.agents/CODE_REVIEW_PROMPT.md): Production Pull Request review template.
