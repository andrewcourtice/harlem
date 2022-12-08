import path from 'path';
import fse from 'fs-extra';

import {
    build,
} from 'tsup';

import {
    replace,
} from 'esbuild-plugin-replace';

/**
 * @typedef Configuration
 * @property {string} name
 * @property {import('tsup').Options | (isProd: boolean) => import('tsup').Options} options
 */

/**
 * Shims used to replace global constants
 */
const SHIMS = {
    devEnv: 'process.env.NODE_ENV === "development"',
    prodDevtools: '(typeof __VUE_PROD_DEVTOOLS__ !== \'undefined\' && __VUE_PROD_DEVTOOLS__)',
};

/**
 * @type import('tsup').Options
 */
const baseOptions = {
    target: 'es2018',
    sourcemap: false,
    clean: false,
};

/**
 * @type Configuration[]
 */
const builds = [
    {
        name: 'commonjs',
        options: isProd => ({
            format: ['cjs'],
            minify: isProd,
            outExtension: () => ({
                js: isProd ? '.prod.cjs' : '.cjs',
            }),
            esbuildPlugins: [
                replace({
                    values: {
                        '__DEV__': isProd ? 'false' : SHIMS.devEnv,
                        '__VUE_PROD_DEVTOOLS__': isProd ? 'false' : SHIMS.prodDevtools,
                    },
                }),
            ],
        }),
    },
    {
        name: 'esm-bundler',
        options: {
            format: ['esm'],
            outExtension: () => ({
                js: '.bundler.mjs',
            }),
            esbuildPlugins: [
                replace({
                    values: {
                        '__DEV__': SHIMS.devEnv,
                        '__VUE_PROD_DEVTOOLS__': SHIMS.prodDevtools,
                    },
                }),
            ],
        },
    },
    {
        name: 'esm-browser',
        options: isProd => ({
            format: ['esm'],
            minify: isProd,
            outExtension: () => ({
                js: isProd ? '.browser.prod.mjs' : '.browser.mjs',
            }),
            esbuildPlugins: [
                replace({
                    values: {
                        '__DEV__': 'false',
                        '__VUE_PROD_DEVTOOLS__': 'false',
                    },
                }),
            ],
        }),
    },
    {
        name: 'iife',
        options: isProd => ({
            format: ['iife'],
            minify: isProd,
            outExtension: () => ({
                js: isProd ? '.iife.prod.js' : '.iife.js',
            }),
            esbuildPlugins: [
                replace({
                    values: {
                        '__DEV__': `${!isProd}`,
                        '__VUE_PROD_DEVTOOLS__': `${!isProd}`,
                    },
                }),
            ],
        }),
    },
    {
        name: 'types',
        options: {
            dts: {
                only: true,
            },
        },
    },
];

/**
 *
 * @param {string} cwd
 * @param {string} entry
 * @param {import('tsup').Options} options
 */
export default async function(cwd, entry, options) {
    const entryFile = path.resolve(cwd, entry);
    const outDir = path.resolve(cwd, './dist');

    await fse.emptyDir(outDir);

    for (const { options: buildOptions } of builds) {
        const resolvedOptionSets = typeof buildOptions === 'function'
            ? [buildOptions(false), buildOptions(true)]
            : [buildOptions];

        for (const resolvedOptions of resolvedOptionSets) {
            await build({
                ...baseOptions,
                ...resolvedOptions,
                ...options,
                outDir,
                entry: [
                    entryFile,
                ],
            });
        }
    }
}