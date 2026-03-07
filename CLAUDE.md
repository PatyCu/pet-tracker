# Pet Tracker - Claude Code Guide

## Agent Instructions

- Before considering any task complete, verify the project builds and runs without errors and that all quality gates pass.
- Whenever instructions for installing or running the app change, update `README.md` to reflect those changes.

### Core Principles

- **Simplicity First:** Make every change as simple as possible. Impact minimal code.
- **No Laziness:** Find root causes. No temporary fixes. Senior developer standards.
- **Minimal impact:** Changes should only touch what's necessary. No side-effects. Avoid introducing bugs.

### Workflow Orchestration

#### 1. Plan Mode Default

- Write a plan first for ANY non-trivial task (+3 steps or architectural decisions), and wait for feedback or approval before starting to implement
- If something goes sideways, STOP and re-plan immediately - don't keep pushing unless I explicitly tell you to iterate until you fix
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

#### 2. Subagent strategy

- For complex multi-step tasks, use subagents for specialized tasks to keep main context window clean
- Be always mindful of cost, always balance token consumption and context bloating

#### 3. Self-improvement Loop

- **After every task is complete:** review all corrections or feedback given during the task and update "Agent Lessons" — without being asked. This is a mandatory step, not optional.
- Rules must be **generalized patterns**, not implementation-specific rules — ask "would this apply to a different file or context?" before writing. If no, abstract it up.
- Favor one-liners. Refactor for clarity after each addition.
- Review lessons at session start for relevant context.

#### 4. Verification before Done

- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness
- For any code change (`.ts`, `.tsx`, `.js`): run `pnpm lint && pnpm typecheck && pnpm test` as the minimum quality gate — skip only for pure docs/text/style changes with no logic touched. For changes that affect the build output, also run pnpm build and confirm it succeeds.
- For any code change: run `pnpm lint && pnpm typecheck && pnpm test` as the minimum quality gate.
- For new features or bug fixes, also perform a runtime verification: start the server, make a real request (curl, a test script, or Expo dev client), and confirm the actual behavior matches the expected outcome.
- Document the verification command or output as part of the task summary. Skip runtime verification only for pure refactors with full test coverage or for documentation changes.
- Only after the task is demonstrably done and verified, update any relevant documentation
- After documentation is updated, commit changes to local using the git-commit skill `.agents/skills/git-commit/SKILL.md`

#### 5. Keep it Simple, Keep it elegant

- Favor simplicity, avoid overengineering unless explicitly required
- Challenge your own work before presenting it
- For complex changes: challenge yourself to find a simpler, more elegant solution. Iterate until you find an elegant solution.
- For Mobile code, follow React Native and Expo best practices in `.agents/skills/vercel-react-native-skills/`.

#### 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for handholding
- If the bug surfaced a test gap, add a new test
- Point at logs, errors, failing tests - then resolve them

#### 7. PR Reviews

- When asked to address comments in a PR after a 3rd party's review (human on agent based), create a plan for yourself where each comment is a separate task
- Do not jump to the next comment / task until the current task can be considered done (verified, documentation updated, one commit per comment)
- Example: 4 ADR files addressing one comment → 1 commit with all 4

#### 8. Testing

- Test files live in `tests/` directories adjacent to source files
- Follow the **testing pyramid**: more unit tests, fewer integration, minimal E2E
- Test **behavior and public APIs**, not implementation details
- Use React Testing Library queries (getByText, getByRole) over testID when possible
- New API endpoints always require tests. Controller unit tests at minimum, integration tests if the endopoint has non-trivial logic.

### Task Management for complex, multi-step prompts

1. **Plan First:** Write plan to `.claude/prompts/to-do.md` with checkable items
2. **Verify Plan:** Check in before starting implementation
3. **Track Progress:** Mark items complete as you go
4. **Explain Changes:** High-level summary at each step
5. **Document Results:** Add review section to `.claude/prompts/to-do.md`
6. **Capture Lessons:** Update Agent Lessons at the end of `CLAUDE.md` after corrections

## Agent Lessons

Rule-based, lessons learned by the Agent in a self-improvement iteration loop.

- **Cross-platform fixes:** Before applying a fix, understand the original intent of the code — removing or changing styles/props to resolve a crash may regress other platforms. Always verify the fix holds across all targets (web, iOS, Android).
- **Stop on repeated failure:** If a command fails twice with the same root cause, stop and diagnose — don't iterate through variations of the same broken approach.
- **Fix broken config, don't work around it:** When something in the environment or toolchain doesn't work, fix the root cause. Never compensate with repeated workarounds at the call site — that hides the real problem and creates ongoing friction.
