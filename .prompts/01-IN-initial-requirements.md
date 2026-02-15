# Initialize React Native + TypeScript Hello World App

## Goal

Create a minimal, production-ready React Native app with TypeScript that serves as a clean foundation for future development and effective AI agent collaboration.

## Context

- New project, no existing code
- Will be developed incrementally with Claude Code as a collaborator
- Portfolio project with emphasis on code quality and performance

## Tech Stack Requirements

- React Native with Expo (or provide reasoning if CLI is better for this use case)
- TypeScript (strict mode enabled)
- **pnpm** as package manager
- **Vite** for bundling/dev server (if compatible with React Native, otherwise document why not in ADR)
- Performance-optimized from the start (lazy loading, memoization best practices)

## Design Principles

- Simple, clean, minimal UI
- High usability and accessibility
- Well-structured folder architecture for scalability
- Include basic navigation setup (React Navigation or Expo Router)

## Constraints

- TypeScript strict mode must be enabled
- Include ESLint and Prettier with reasonable defaults
- Must run on both iOS and Android
- All major architecture decisions must be documented as ADRs in `docs/ADRs/` (use concise ADR format)

## Agent Collaboration Setup

Create the following structure for effective Claude Code collaboration:

- `CLAUDE.md` - Project overview, architecture, how to work with this codebase
- `.claude/` or similar folder for:
  - `claude.local.md` - Session-specific context (gitignored)
  - `.prompts/` - Reusable prompt templates for common tasks
  - Custom skills if applicable
- Document the purpose of each collaboration file in CLAUDE.md

## Output Expected

- Complete project structure following React Native best practices
- Working "Hello World" app that runs successfully with pnpm
- README.md with setup and run instructions (using pnpm commands)
- Basic .gitignore already in place (including claude.local.md, pnpm-lock.yaml handled correctly)
- TypeScript configured with strict settings
- Clean component structure ready for expansion
- Initial ADR documenting the tech stack choices (Expo vs CLI, navigation choice, pnpm, Vite feasibility, etc.)
- Complete agent collaboration documentation structure
- Favor writing output of the execution of this and any future prompt as an MD file under ./prompts
  - naming convention:
    - `XX-IN-name-of-prompt.md`: name of the input prompt. EX: `01-IN-initial-requirements.md`
    - `XX-OUT-name-of-prompt.md`: name of the output prompt. EX: `01-OUT-initial-requirements.md`
  - document this behavior in the most effective way to add it to our ways of working - local, not to be added to github
