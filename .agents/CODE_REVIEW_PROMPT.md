# CODE REVIEW PROMPT

> Use this template to conduct an independent, production-grade review of changes.

---

## REVIEW INVOCATION

Conduct a comprehensive code review of the targeted changes without modifying production code.

### Review Target:
```markdown
<review_target>
[Specify one of: working tree (`git diff`), staged changes (`git diff --staged`), branch comparison (`git diff origin/master...HEAD`), or specific files]
</review_target>
```

### Review Scope & Intent:
```markdown
<scope_and_intent>
[Describe what feature or bug fix this diff represents and any specific areas of concern]
</scope_and_intent>
```

---

## EXECUTION WORKFLOW

1. **Diff Inspection:**
   - Run `git diff` or inspect the specified file paths.
   - Map out all altered components, hooks, styles, types, and tests.
2. **Multi-Agent Review Panel:**
   - **Reviewer Agent:** Performs deep-dive review across Correctness, Architecture, Maintainability, Security, Performance, and Test Coverage.
   - **Tester Agent:** Checks test suite adequacy, missing edge-case coverage, and runs `cmd.exe /c npm.cmd test`.
   - **UX/UI Agent:** (If user-facing) Audits design system fidelity, The 3 Dials, responsive behavior, and accessibility.
3. **Severity Assessment:**
   - Every finding is tagged with: `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, or `SUGGESTION`.
   - Each finding includes: File & Location, Problem, Impact, Recommended Fix.
4. **Final Recommendation:**
   - Conclude with a clear verdict: `APPROVED`, `APPROVED_WITH_COMMENTS`, or `CHANGES_REQUIRED`.
