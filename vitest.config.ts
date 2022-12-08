import {
    defineConfig,
} from 'vitest/config';

export default defineConfig({
    test: {
        cache: false,
        watch: false,
        environment: 'jsdom',
        outputFile: 'test-results.xml',
        reporters: [
            'verbose',
            'junit',
        ],
        coverage: {
            enabled: true,
            reportsDirectory: './.reports/coverage',
            reporter: [
                'text-summary',
            ],
        },
    },
});