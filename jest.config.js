module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverage: true, // Enables coverage collection
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Specify the files to include in coverage
    "!src/**/*.d.ts",
  ],
  coverageDirectory: "coverage", // Specify the output directory for coverage reports
  coverageReporters: ["html", "text", "text-summary"], // Specify the formats of the coverage reports
};
