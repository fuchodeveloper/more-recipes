module.exports = {
  verbose: true,
  rootDir: '/',
  roots: ['<rootDir>'],
  setupFiles: [
    '<rootDir>/test/setupTest.js',
    '<rootDir>/test/__mocks__/mockLocalStorage.js'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/test',
    '<rootDir>/Index.jsx',
    '<rootDir>/rootReducer.js',
    '<rootDir>/assets',
    '<rootDir>/coverage',
    '<rootDir>/utils',
    '<rootDir>/validations',
    '<rootDir>/store',
    '<rootDir>/components/errors/',
    '<rootDir>/reducers/isFetching.js'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer']
};

