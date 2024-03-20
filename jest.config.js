module.exports = {
  globalSetup: '<rootDir>/test/globalSetup.ts',
  globalTeardown: '<rootDir>/test/globalTeardown.ts',
  setupFiles: ['<rootDir>/test/setupTests.ts'],
  testEnvironment: 'node',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleDirectories: ['node_modules', 'src'],
}
