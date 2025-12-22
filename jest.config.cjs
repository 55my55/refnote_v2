const config = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.spec.(ts|tsx|js)'],
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.vue$': ['@vue/vue3-jest', {}],
    '^.+\\.(ts|js)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.vue'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.cjs.js',
    '^vue-router$': '<rootDir>/node_modules/vue-router/dist/vue-router.cjs',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
}

module.exports = config
