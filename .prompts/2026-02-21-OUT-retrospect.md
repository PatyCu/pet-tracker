# Retrospective — 2026-02-21

**Session focus:** Addressing Copilot PR review comments on monorepo migration PR

## Issues Identified

### Issue 1: Lost Changes During Git Reset

**What happened:** Used `git reset` to undo commits for reorganization, then recreated commits without the actual file changes. This resulted in 16+ empty commits (messages only, no file content) and all the actual work (API changes, ADR fixes, CORS middleware) being lost from the codebase.

**Root cause:** When undoing git commits with reset, failed to track what work was in those commits before undoing them. Then recreated commits blindly without verifying file changes were present. **Key issue: undoing work without tracking it, then not noticing you undid a previously completed task.**

**Impact:** Massive git history mess. All PR fixes appeared committed but weren't in codebase. User frustrated ("you have made a monumental mess with git"). Significant time wasted on cleanup.

**Prevention:** Before undoing commits (reset/rebase), check what's in them with `git show` or `git diff`. After undoing, verify changes still present or reapply them. Don't recreate commits without verifying content with `git show HEAD --stat`.

**WoW updates:**
- Updated: `CLAUDE.md` — Added git reset/rebase safety workflow
- Updated: `.claude/claude.local.md` — Same safety workflow

---

### Issue 3: Over-Atomicity in Commits

**What happened:** Initially created separate commits for each file that was changed (one commit per ADR file), when the user wanted one commit per PR comment (grouping all files that address the same comment together).

**Root cause:** Misunderstood the "atomic commit" principle. Interpreted it as "one file per commit" rather than "one logical change per commit." The PR comment workflow wasn't explicit enough about grouping related file changes.

**Impact:** User had to correct the approach ("we are going too atomic with the commits") and request regrouping. Led to git reset and recommit, which then caused Issue #2.

**Prevention:** Updated workflow documentation with explicit examples showing that multiple files addressing the same PR comment should be in ONE commit together.

**WoW updates:**
- Updated: `CLAUDE.md` — Added explicit example: "Comment about 'ADR heading mismatches' affecting 4 files → 1 commit with all 4 files"
- Updated: `.claude/claude.local.md` — Same example and clarification
- Updated: `.prompts/command-address-comments-PR.md` — Added detailed examples in Commit Strategy section

---

### Issue 4: Verbose Commit Messages

**What happened:** First commit used a multi-line message with detailed explanation, when user wanted concise one-line summaries only.

**Root cause:** Default git best practices often recommend detailed commit messages with body paragraphs, but this project has a different preference for concise messages. This wasn't documented in WoW initially.

**Impact:** User had to correct: "the commit message should always be very concise, a one liner." Minor issue but indicated lack of clarity in commit message format.

**Prevention:** Documented explicit format pattern and good/bad examples in workflow.

**WoW updates:**
- Updated: `CLAUDE.md` — Added format pattern `<action> <what was fixed>` with examples
- Updated: `.claude/claude.local.md` — Same format and examples
- Updated: `.prompts/command-address-comments-PR.md` — Added examples of good vs bad commit messages

---

## Summary

**Total issues:** 4
**WoW files updated:** 3 (CLAUDE.md, .claude/claude.local.md, .prompts/command-address-comments-PR.md)
**New commands created:** 1 (.prompts/command-retrospect.md)

**Key learnings:**
- **Track work before undoing it** — Before git reset/rebase, check what's in commits you're about to undo
- **Verify commits contain changes** — After committing, check with `git show HEAD --stat` that file changes are present
- **Be mindful of what helps reviewers** — Commits should be logical units (one per PR comment, not per file)
- **Keep commit messages concise** — One-line format: `<action> <what was fixed>`

## Recommendations for Next Session

1. **When undoing commits (reset/rebase):**
   - Check what's in them first with `git show` or `git diff`
   - After undoing, verify changes are still in working directory
   - When recreating commits, verify they contain expected file changes

2. **General commit hygiene:**
   - Run lint/typecheck before committing
   - After committing, verify with `git show HEAD --stat`
   - One commit per logical change (group related files together)

3. **Use `/retrospect` command:**
   - At end of complex sessions with notable issues
   - To capture learnings and update WoW continuously
