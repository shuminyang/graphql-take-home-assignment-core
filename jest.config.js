module.exports = {
  verbose: true,
  moduleFileExtensions: ["js", "json"],
  rootDir: "./",
  modulePaths: ["<rootDir>"],
  testRegex: ".*\\.spec\\.js$",
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
};
