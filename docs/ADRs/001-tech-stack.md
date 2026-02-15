# ADR 001: Tech Stack Choices

**Status:** Accepted
**Date:** 2026-02-15

## Context

We need to establish the foundational tech stack for Pet Tracker, a React Native mobile app for tracking pet health symptoms. The stack must support both iOS and Android, enable TypeScript strict mode, and provide a solid foundation for incremental development.

## Decisions

### Expo (Managed Workflow) over React Native CLI

**Choice:** Expo SDK 54 with managed workflow

**Reasoning:**

- Significantly faster project setup and iteration
- Built-in OTA updates, push notifications, and device APIs
- Expo Go enables rapid testing without native builds
- EAS Build handles native compilation when needed
- New Architecture enabled by default in SDK 54
- No need for Xcode/Android Studio for initial development

### Expo Router over React Navigation

**Choice:** Expo Router v6 (file-based routing)

**Reasoning:**

- File-based routing reduces boilerplate and matches modern conventions
- Built on React Navigation under the hood (same performance)
- Deep linking support out of the box via URL scheme
- Type-safe routes with TypeScript
- Easier to reason about app structure — routes mirror file structure

### pnpm as Package Manager

**Choice:** pnpm v10

**Reasoning:**

- Faster installs via content-addressable storage
- Stricter dependency resolution prevents phantom dependencies
- Lower disk usage through hard linking
- Compatible with Expo ecosystem (with `node-linker: hoisted` for React Native compatibility)

### Vite Feasibility

**Decision:** Not using Vite

**Reasoning:**

- React Native uses Metro bundler, which is deeply integrated with the RN build pipeline
- Expo's Metro configuration handles TypeScript, JSX, and platform-specific resolution
- Vite targets web bundling and lacks React Native platform support (iOS/Android native modules)
- No production-ready Vite adapter exists for React Native as of 2026
- Metro is performant and well-suited for this use case

### TypeScript Strict Mode

**Choice:** Full strict mode with additional safety flags

**Configuration includes:** `strict: true`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`, `forceConsistentCasingInFileNames`

### Linting & Formatting

**Choice:** ESLint 8 + Prettier

**Reasoning:**

- ESLint with TypeScript, React, React Hooks, and React Native plugins
- Prettier for consistent formatting with eslint-config-prettier to avoid conflicts
- Standard configuration that's well-documented and widely supported

## Consequences

- Developers need pnpm installed (`npm install -g pnpm`)
- Metro bundler is used instead of Vite — documented here to avoid future revisiting
- Expo managed workflow may require ejecting if a native module without Expo support is needed (unlikely for this project scope)
