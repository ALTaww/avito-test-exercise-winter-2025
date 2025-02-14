const config = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^react-router-dom$": "<rootDir>/src/__mocks__/react-router-dom.ts",
    "^axios$": require.resolve("axios"),
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
