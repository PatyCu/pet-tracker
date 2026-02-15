// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Exclude test files from the bundle — they import Node.js-only
// packages (e.g. @testing-library/react-native) that break Metro.
config.resolver.blockList = [/.*\.test\.[jt]sx?$/, /.*\/tests\/.*/];

module.exports = config;
