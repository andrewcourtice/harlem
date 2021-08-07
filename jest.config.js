module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    verbose: true,
    reporters: [
        'default',
        'jest-junit'
    ]
};