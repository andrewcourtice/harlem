import type {
    Options,
} from 'tsup';

export default {
    clean: true,
    dts: true,
    sourcemap: true,
    entryPoints: [
        './src/index.ts',
    ],
    outDir: './dist-new',
    globalName: 'harlemUtilities',
    target: 'es2020',
    format: [
        'cjs',
        'esm',
        'iife',
    ],
} as Options;