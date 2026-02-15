/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.expo/", "/e2e/"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "!**/tests/**",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)",
  ],
};
