import {
    defineConfig,
} from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        watch: false,
        outputFile: 'test-results.xml',
        reporters: [
            'verbose',
            'junit',
        ],
        coverage: {
            enabled: true,
            reporter: [
                'text-summary',
            ],
        },
    },
});