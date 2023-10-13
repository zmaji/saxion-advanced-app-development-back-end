module.exports = {
  preset: 'ts-jest',
  globalSetup: '<rootDir>/src/__tests__/config/globalSetup.ts',
  globalTeardown: '<rootDir>/src/__tests__/config/globalTeardown.ts',
  setupFilesAfterEnv: [
    '<rootDir>/src/__tests__/config/setupFile.ts',
  ],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/__tests__/mocks/', '/src/__tests__/config/', 'coverage'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  collectCoverage: process.env.npm_lifecycle_event === 'test:coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/__tests__/mocks',
    '/src/__tests__/config',
  ],
};
