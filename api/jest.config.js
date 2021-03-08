module.exports = {
  "preset": "ts-jest",
  "testEnvironment": "node",
  // "transform": {
  //   "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
  // },
  // "transform": { "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  "transformIgnorePatterns": [
    "node_modules/(?!variables/.*)"
  ]
};