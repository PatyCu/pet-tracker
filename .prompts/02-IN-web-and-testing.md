# Add Web Platform Support and Testing Infrastructure

## Goal

Configure the app to run on web (in addition to iOS/Android) using Vite for optimal web DX, and establish a comprehensive testing setup before building features.

## Context

- Working React Native + Expo hello world app
- Using pnpm, TypeScript strict mode
- Want web support and testing infrastructure before building features

## Requirements

### Web Support

- Set up React Native Web with Expo
- Configure Vite for web development and builds (or document if Metro-based web build is better with Expo)
- Ensure "Hello World" app runs on web with `pnpm web`
- Navigation should work across all three platforms (recommend Expo Router for unified routing)

### Testing Infrastructure

- Set up **Jest** for unit/integration tests (configured for React Native)
- Set up **React Testing Library** (@testing-library/react-native) for component tests
- Set up **E2E testing** with Maestro (recommended for React Native/Expo) or Detox - document choice in ADR
- Include example tests for the Hello World component demonstrating best practices
- Configure test scripts in package.json (`pnpm test`, `pnpm test:e2e`, `pnpm test:watch`, `pnpm test:coverage`)
- Add pre-commit hooks (husky + lint-staged) to run linting and tests automatically
- Configure test coverage reporting (Jest built-in)
- Document testing philosophy and patterns in CLAUDE.md

### Testing Conventions

- Use Jest with React Testing Library (@testing-library/react-native)
- Place test files in a `__tests__` directory in the same folder as the source file
- Name test files as `[filename].test.ts(x)`

### Coverage

- Test happy paths
- Test edge cases
- Test error states
- Focus on testing behavior and public APIs rather than implementation details

### Testing Guidelines to Implement

- Follow testing pyramid (more unit tests, fewer E2E)
- Include examples of: component rendering, user interactions, navigation flows
- Set up CI-friendly test configurations
- Ensure tests work in all environments (local, CI)

## Constraints

- Don't break existing iOS/Android functionality
- Maintain performance focus
- Keep simple, clean UI approach across platforms
- Tests should be easy to understand and maintain
- All testing decisions documented in ADRs
- All tooling must work with pnpm

## Output Expected

- Web platform working (Vite or Metro-based, documented in ADR)
- Complete testing setup with passing example tests
- ADRs for: web setup choices, testing framework selection, E2E tool choice
- Updated CLAUDE.md with testing best practices and patterns
- Pre-commit hooks configured and working
