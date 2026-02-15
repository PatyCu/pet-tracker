# Migrate E2E Testing from Maestro to Detox

## Goal

Replace the current Maestro E2E testing setup with Detox to align with React Native industry standards and enable gray-box testing capabilities.

## Context

- Relevant files: `e2e/`, `package.json`, `docs/ADRs/004-e2e-testing-tool.md`
- Current behavior: Using Maestro (YAML-based) for E2E testing
- Desired behavior: Using Detox (TypeScript-based) for E2E testing with gray-box capabilities and industry-standard patterns

## Constraints

- Don't break existing unit/integration tests (Jest + RTL)
- Maintain all existing app functionality
- All configuration must work with pnpm
- Follow Detox best practices (testID attributes, screen objects)
- Do NOT run simulator/emulator tests - only set up configuration
- Document any manual testing steps separately in the output prompt file you will create for this prompt

## Output Expected

- Maestro completely removed (config, dependencies, YAML files)
- Detox installed and configured for iOS and Android
- Example E2E test file(s) in `e2e/` directory as TypeScript (not executed, just created)
- Updated `package.json` scripts: `test:e2e:ios`, `test:e2e:android`, `build:e2e`
- Up compiling and running with no errors
- Updated ADR 004 with comprehensive reasoning:
  - Industry standard (Microsoft, Wix, Bloomberg)
  - Gray-box testing capabilities vs Maestro's black-box
  - Maturity and ecosystem (6+ years)
  - Portfolio/resume value
  - Brief mention why not Appium (overkill for single framework)
- Updated CLAUDE.md with Detox setup instructions and best practices
- EAS Build configuration for Detox development builds (config only)
- Clear manual testing instructions in README or CLAUDE.md
