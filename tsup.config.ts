import type {
    Options,
} from 'tsup';

export default {
    clean: true,
    dts: true,
    sourcemap: true,
    legacyOutput: true,
    target: 'es2020',
    format: [
        'esm',
        'cjs',
        'iife',
    ],
    entryPoints: [
        './src/index.ts',
    ],
    outDir: './dist',
} as Options;