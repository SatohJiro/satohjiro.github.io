# GIT WORKFLOW RULES

> **Repository:** SatohJiro Portfolio  
> **Target Branch:** `master` / `main`  
> **Principle:** Surgical changes, zero data loss, strict preservation of user work.

---

## 1. INVIOLABLE SAFETY DIRECTIVES

All agents must strictly obey these safety rules when interacting with Git:

1. **Inspect Before Action:** Always run `git status` before touching any file to verify existing uncommitted changes or working tree state.
2. **Never Discard User Changes:** Never run `git checkout -- .`, `git reset --hard`, `git clean -fd`, or `git restore .` without explicit user instruction.
3. **Never Force Push:** Never use `--force` or `--force-with-lease` under any circumstance.
4. **Never Rewrite History:** Never run `git rebase -i`, amend previous commits made by the user, or drop commits.
5. **No Unauthorized Commits:** Never run `git commit` unless the user explicitly commands a commit to be created.
6. **No Unrelated Modulations:** Do not touch or stage files outside the approved plan.
7. **No Deletion of Unknown Files:** Never delete untracked or unknown files found in the workspace.

---

## 2. SURGICAL CHANGE MANAGEMENT

When modifying files:
- Verify the diff after editing with `git diff --stat` and `git diff path/to/file`.
- Ensure changes are localized to the targeted lines only.
- Do not commit generated build artifacts (`out/`, `.next/`, `tsconfig.tsbuildinfo`). These are gitignored.

---

## 3. PARALLEL WORK & FILE OWNERSHIP

To enable parallel execution across multiple agents without merge conflicts or clobbering:

### Component Ownership Domains:
- **UI Sections:** `src/components/sections/**`
- **Design Primitives:** `src/components/glass/**`
- **Global Layout & Chrome:** `src/components/layout/**`
- **State & Hooks:** `src/hooks/**`
- **Data & Content:** `src/data/**`
- **Types:** `src/types/**`
- **Tests:** `src/__tests__/**`
- **Agent Rules & Prompts:** `.agents/**`

### Concurrency Rules:
1. **Never Allow Multiple Coders on the Same File:** Only ONE write-enabled Coder may edit a file at a time.
2. **Read-Only Concurrency:** The **Tester**, **Reviewer**, and **UX/UI** agents may run concurrently because they are read-only and observe changes without modifying production files.
3. **Serialize Overlapping Work:** If two tasks require changes to the same file (e.g., `src/data/portfolio-content.ts`), the Main Agent MUST serialize the tasks sequentially: Task A (Code → Test → Review) followed by Task B.
