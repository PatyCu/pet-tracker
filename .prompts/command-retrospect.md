## Task

Analyze the current conversation session to identify issues, mistakes, and learnings that should be captured in the project's Ways of Working (WoW).

## Instructions

1. **Review the conversation** from start to finish, identifying:
   - Errors or mistakes that were made (by Claude or user)
   - Workflow issues that caused delays or rework
   - Miscommunications or unclear requirements
   - Git/version control problems
   - Verification failures (committing unverified code, missing checks)
   - Patterns of repeated mistakes

2. **Root cause analysis** for each issue:
   - What was the immediate cause?
   - What underlying process/workflow gap allowed it?
   - Was it a knowledge gap, process gap, or tool limitation?

3. **Extract actionable learnings**:
   - What specific process changes would prevent this?
   - What verification steps were missing?
   - What documentation updates are needed?

4. **Update Ways of Working**:
   - Update `CLAUDE.md` with new rules/guidelines if they apply project-wide
   - Update `.claude/claude.local.md` with session-specific learnings if local
   - Update relevant command files in `.prompts/` if the issue relates to a specific workflow

5. **Create retrospective output file**:
   - File: `.prompts/[SESSION_DATE]-OUT-retrospect.md`
   - Format: See Output Format below

## Output Format

The retrospective output file must follow this structure:

```markdown
# Retrospective — [Date]

**Session focus:** [Brief description of what was being worked on]

## Issues Identified

### Issue 1: [Short title]

**What happened:** [1-2 sentences describing the problem]

**Root cause:** [Why it happened - process gap, missing verification, etc.]

**Impact:** [How it affected the work - time wasted, rework needed, etc.]

**Prevention:** [Specific changes made to prevent recurrence]

**WoW updates:**
- Updated: [file path] — [what was added/changed]
- Updated: [file path] — [what was added/changed]

---

### Issue 2: [Short title]

[Same structure as above]

---

## Summary

**Total issues:** [N]
**WoW files updated:** [N]
**Key learnings:**
- [Bullet point]
- [Bullet point]

## Recommendations for Next Session

[Optional: Any specific things to watch out for or verify in future sessions]
```

## Rules

- Be honest and objective about mistakes - the goal is learning, not blame
- Focus on systemic issues, not one-off typos or minor mistakes
- Every issue MUST have a concrete prevention measure and WoW update
- If no WoW update is needed, explain why (e.g., "one-off user error, not systematic")
- Keep it concise - 2-5 major issues per retrospective is typical
- DO NOT include this retrospective work itself as an "issue"

## When to Use This Command

- At the end of a complex or error-prone session
- After completing a major task with notable issues
- When the user requests it explicitly
- Proactively if you notice repeated patterns of mistakes in a session

## Commit Strategy

After creating the retrospective:

1. Stage all WoW updates and the retrospective output file
2. Verify changes with `git diff --staged`
3. Commit with message: `Document retrospective and update WoW - [brief issue summary]`
4. Include Co-Authored-By tag
