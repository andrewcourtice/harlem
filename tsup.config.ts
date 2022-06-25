import type {
    Options,
} from 'tsup';

export default {
    clean: true,
    dts: true,
    sourcemap: true,
    target: 'es2018',
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