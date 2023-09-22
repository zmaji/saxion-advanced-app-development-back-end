module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/__tests__/mocks/'],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
};