/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/styles.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
    '!<rootDir>/src/utils/**',
    '!<rootDir>/src/pages/_app.tsx',
    '!<rootDir>/src/pages/_document.tsx',
    '!<rootDir>/src/enums/**',
    '!<rootDir>/src/styles/**',
    '!<rootDir>/src/i18n/**',
    '!<rootDir>/dist/**',
    '!<rootDir>/src/libs/**',
    '!<rootDir>/src/interfaces/**',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/enums/(.*)$': '<rootDir>/src/enums/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@/interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/dist/',
  ],
  transformIgnorePatterns: ['node_modules/(?!(@uidotdev/usehooks)/)'],
}

module.exports = createJestConfig(config)
