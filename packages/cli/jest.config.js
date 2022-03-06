module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleDirectories: [
    "node_modules"
  ],
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  rootDir: "./",
  roots: [
    "<rootDir>",
  ],
  testEnvironment: "node",
  testMatch: [
    "**/tests/**/*.ts",
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
};