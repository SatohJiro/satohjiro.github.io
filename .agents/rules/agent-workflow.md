# AGENT WORKFLOW & ORCHESTRATION RULES

> **Role:** Main Agent (Engineering Lead / Orchestrator)  
> **Mission:** Coordinate specialized agents through a disciplined, production-grade engineering lifecycle.  
> **Principle:** Inspect before modifying. Plan before code. Separate implementation from review. Never treat Coder as the final authority on its own work.

---

## 1. THE STANDARD MULTI-AGENT WORKFLOW

```
                     USER REQUIREMENT
                            │
                            ▼
                       RESEARCHER
                       (optional)
                            │
                            ▼
                        PLANNER
                            │
                            ▼
                       PLAN REVIEW
                            │
                            ▼
                         CODER
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
           TESTER        REVIEWER        UX/UI
                                      (if user-facing)
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                   FINDINGS AGGREGATION
                            │
                    Blocking issue?
                     /            \
                   Yes             No
                    │               │
                  CODER           VERIFY
                    │               │
            Tester + Reviewer      DONE
            + UX/UI if needed
```

---

## 2. MAIN AGENT / ORCHESTRATOR RESPONSIBILITIES

The **Main Agent** acts as the Engineering Lead:
1. **Task Classification:** Categorizes incoming tasks to select the minimal required set of agents.
2. **Context Management:** Passes only relevant files, Planner outputs, diffs, and test logs to downstream agents to prevent context pollution.
3. **Findings Aggregation:** Consolidates reports from Tester, Reviewer, and UX/UI. Filters out conflicting or subjective feedback.
4. **Fix Loop Termination:** Loops only on actionable `CRITICAL` or `HIGH` findings. Cuts off endless cycles on stylistic preferences or non-blocking suggestions.
5. **Acceptance Gatekeeper:** Confirms that all acceptance criteria are verified and local build/tests succeed before marking the task complete.

---

## 3. TASK CLASSIFICATION MATRIX

| Task Class | Examples | Execution Flow |
| :--- | :--- | :--- |
| **TRIVIAL** | Typo fix, single CSS token adjustment, simple variable rename | Coder → Quick Verification (`npm.cmd test`) |
| **SMALL** | Minor utility addition, single component prop extension | Coder → Tester |
| **NORMAL FEATURE** | New non-UI utility, analytics enhancement, telemetry event | Planner → Coder → Tester → Reviewer |
| **USER-FACING FEATURE** | New UI section, modal, navigation change, responsive update | Planner → Coder → [Tester + Reviewer + UX/UI] → Fix Loop → Verify |
| **COMPLEX** | Cross-module architectural change, state refactor, dynamic imports | Researcher → Planner → Coder → [Tester + Reviewer + UX/UI] → Fix Loop → Verify |
| **BUG FIX** | UI glitch, test failure, hydration mismatch, data inconsistency | Reproduce (Tester) → Researcher/Planner → Coder → Regression Test → Reviewer → Verify |
| **ARCHITECTURE / REFACTOR** | Upgrading Next.js/Tailwind, restructuring directories, ADR change | Researcher → Planner → Plan Approval → Isolated Coder → Comprehensive Test & Review → Verify |

---

## 4. PARALLEL WORK & CONCURRENCY CONTROL

Post-implementation review and verification can run in parallel:

```
                      CODER (Finishes)
                             │
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
      TESTER AGENT    REVIEWER AGENT     UX/UI AGENT
     (Runs Vitest)   (Audits Code PR)  (Audits Visuals)
            │                │                │
            └────────────────┼────────────────┘
                             ▼
                    MAIN AGENT (Aggregates)
```

### Safety Rules for Concurrency:
- **Zero Overlapping Coders:** Multiple write-enabled agents must NEVER edit the same file simultaneously.
- **File Ownership Isolation:** If parallel coding is required across independent features, explicitly isolate file paths (e.g., Coder A owns `src/components/sections/ProjectsSection.tsx`, Coder B owns `src/lib/telemetry.ts`).
- **Serialize Overlap:** If two changes touch `src/data/portfolio-content.ts` or `src/app/globals.css`, work must be serialized sequentially.

---

## 5. COMPLETION & EXIT CRITERIA

A task is considered complete ONLY when all following conditions are satisfied:
1. **0 Unresolved CRITICAL findings.**
2. **0 Unresolved HIGH findings.**
3. **Automated tests pass:** `cmd.exe /c npm.cmd test` exits with code 0 (11/11 tests pass).
4. **Static production build succeeds:** `cmd.exe /c npm.cmd run build` exits with code 0.
5. **Acceptance criteria verified:** Every item in the approved plan is demonstrated to be working.
6. **Git working tree is clean:** No stray, uncommitted, or corrupt temporary files left behind.
