module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test', '<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
