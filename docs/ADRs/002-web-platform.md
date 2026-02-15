# ADR 002: Web Platform Setup

**Status:** Accepted
**Date:** 2026-02-15

## Context

We want the app to run on web in addition to iOS and Android.
Vite vs Metro for web bundling was evaluated.

## Decision

**Use Expo's Metro-based web support** (not Vite).

### Reasoning

- Expo SDK 54 has first-class web support via Metro + react-native-web
- Single bundler (Metro) for all three platforms simplifies configuration
- Expo Router's file-based routing works identically across iOS, Android, and web
- Vite would require a separate build pipeline, duplicating config and creating divergence
- No production-ready Vite integration exists for React Native + Expo Router

### Packages Added

- `react-native-web` — React Native components compiled to web equivalents
- `react-dom` — React's web renderer
- `@expo/metro-runtime` — Metro runtime for web platform

## Consequences

- `pnpm run web` starts the app in a browser via Metro
- Same codebase, same bundler, same routing across all platforms
- Web-specific styling edge cases may need `Platform.select()` handling
