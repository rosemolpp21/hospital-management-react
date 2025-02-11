import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/index.tsx",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text-summary","json", "text", "clover"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], 
  transformIgnorePatterns: ["node_modules/(?!axios)", "node_modules/(?!msw)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    "^axios$": "<rootDir>/src/__mocks__/axios.ts",
  },
};
 
export default config;


  