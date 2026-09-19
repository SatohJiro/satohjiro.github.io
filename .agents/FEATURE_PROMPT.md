# FEATURE IMPLEMENTATION PROMPT

> Use this template to trigger feature development using the repository's multi-agent workflow.

---

## TASK INVOCATION

Implement the following feature using the repository's multi-agent engineering workflow.

### Requirement:
```markdown
<requirement>
[Describe the feature requirements, target components, and expected behavior here]
</requirement>
```

### Constraints:
```markdown
<constraints>
- Framework: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4
- Output Target: Static Export (output: "export" generating ./out)
- Design Standard: The APEX Framework & Anti-Slop Design Intelligence (DESIGN_VARIANCE: 4, MOTION_INTENSITY: 5, VISUAL_DENSITY: 6)
- Localization: Preserve bi-directional symmetry in src/data/portfolio-content.ts for both VI and EN
- Quality Bar: 100% passing tests via `cmd.exe /c npm.cmd test` and zero build errors via `cmd.exe /c npm.cmd run build`
</constraints>
```

---

## EXECUTION WORKFLOW

1. **Research (Researcher Agent):**
   - If the feature touches unfamiliar, cross-cutting, or architectural areas, invoke the **Researcher** to inspect existing flows and dependencies.
2. **Planning (Planner Agent):**
   - The **Planner** produces a vertical-slice implementation plan with file-level changes and acceptance criteria.
   - Wait for user or orchestrator plan approval before proceeding.
3. **Implementation (Coder Agent):**
   - The **Coder** implements the approved plan with surgical changes.
   - Reuses existing primitives from `src/components/glass/`.
   - Runs `cmd.exe /c npm.cmd test` and `cmd.exe /c npm.cmd run build` locally.
4. **Independent Quality Verification (Tester + Reviewer + UX/UI):**
   - **Tester:** Validates happy paths, edge cases, and multilingual parity; adds test cases if needed.
   - **Reviewer:** Conducts strict PR-style review covering correctness, architecture, security, and performance.
   - **UX/UI:** (If user-facing) Audits responsive layouts, states, accessibility, and design system compliance.
5. **Fix Loop & Convergence:**
   - Any `CRITICAL` or `HIGH` blocking findings are routed back to the **Coder** for remediation.
   - Re-test and re-review until all blocking issues are resolved.
6. **Final Verification & Report:**
   - Execute final verification of acceptance criteria and report the completed feature with file diffs.
