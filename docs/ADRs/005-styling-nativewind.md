# ADR 005 — NativeWind v4 for Cross-Platform Styling

**Status:** Accepted
**Date:** 2026-02-15

## Context

The project needed a styling solution that works consistently across iOS, Android, and web. Options included plain StyleSheet, styled-components, Tamagui, and NativeWind. We needed something with a low learning curve, strong community adoption, and first-class web compatibility through react-native-web.

## Decision

We chose NativeWind v4, which brings Tailwind CSS utility classes to React Native via the `className` prop. NativeWind compiles Tailwind utilities at build time into optimized StyleSheet objects on native and standard CSS on web, giving us a single authoring model for all platforms.

## Rationale

NativeWind is the industry standard for Tailwind-based styling in React Native. It integrates cleanly with Expo and Metro via a single `withNativeWind` wrapper, requires minimal configuration (babel preset + metro plugin), and produces zero runtime overhead on web since it outputs real CSS. The utility-first approach keeps styles co-located with markup, reducing context-switching and eliminating the need for separate style files.

## Trade-offs

The main trade-off is a build-time dependency: Tailwind CSS v3 runs during bundling to generate the CSS output, and the NativeWind babel/metro plugins add a small amount of build complexity. Developers unfamiliar with Tailwind's utility class naming will have a brief learning curve. However, these costs are outweighed by faster iteration speed, consistent cross-platform output, and excellent TypeScript support via the `nativewind/types` reference.
