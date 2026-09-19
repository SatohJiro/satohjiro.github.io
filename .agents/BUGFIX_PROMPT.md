# BUGFIX IMPLEMENTATION PROMPT

> Use this template to diagnose, reproduce, and resolve defects using the multi-agent workflow.

---

## BUG INVOCATION

Resolve the following defect using the repository's multi-agent engineering workflow.

### Bug Report:
```markdown
<bug_report>
[Describe the observed symptom, error message, or broken visual behavior here]
</bug_report>
```

### Environment & Context:
```markdown
<environment>
- OS: Windows
- Framework: Next.js 16 (App Router) + React 19 + Vitest 3
- Execution Protocol: `cmd.exe /c npm.cmd test` / `cmd.exe /c npm.cmd run build`
</environment>
```

### Reproduction Steps:
```markdown
<reproduction_steps>
1. [Step 1]
2. [Step 2]
3. Expected: [Expected correct behavior]
4. Actual: [Observed failure / exception / glitch]
</reproduction_steps>
```

---

## EXECUTION WORKFLOW

1. **Reproduction (Tester Agent):**
   - Whenever practical, write a failing unit test in `src/__tests__/` reproducing the issue (RED phase of TDD).
   - Document exact reproduction evidence.
2. **Root Cause Analysis (Researcher / Planner):**
   - Trace execution flow to isolate the root cause rather than patching superficial symptoms.
   - Design a minimal, surgical fix preserving existing architecture.
3. **Surgical Fix (Coder Agent):**
   - Apply the targeted fix to the affected files only.
   - Run `cmd.exe /c npm.cmd test` to confirm the regression test turns GREEN.
   - Verify static export build via `cmd.exe /c npm.cmd run build`.
4. **Independent Quality Gate (Tester + Reviewer + UX/UI):**
   - **Tester:** Validates fix and checks for adjacent regression risks.
   - **Reviewer:** Ensures no architectural smells, band-aid hacks, or performance regressions.
   - **UX/UI:** (If visual bug) Audits responsive viewports and design system compliance.
5. **Final Verification:**
   - Confirm bug is eliminated, all 4 test suites pass with 0 failures, and static build completes cleanly.
