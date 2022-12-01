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
const configurations = [
    {
        name: 'commonjs',
        options: isProd => ({
            format: ['cjs'],
            minify: isProd,
            outExtension: () => ({
                js: isProd ? '.cjs.prod.js' : '.cjs.js',
            }),
            esbuildPlugins: [
                replace({
                    values: {
                        '__DEV__': isProd ? 'false' : 'process.env.NODE_ENV === "development"',
                        '__VUE_PROD_DEVTOOLS__': isProd ? 'false' : '(typeof __VUE_PROD_DEVTOOLS__ !== \'undefined\' && __VUE_PROD_DEVTOOLS__)',
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
                js: '.esm-bundler.js',
            }),
            esbuildPlugins: [
                replace({
                    values: {
                        '__DEV__': 'process.env.NODE_ENV === "development"',
                        '__VUE_PROD_DEVTOOLS__': '(typeof __VUE_PROD_DEVTOOLS__ !== \'undefined\' && __VUE_PROD_DEVTOOLS__)',
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
                js: isProd ? '.esm-browser.prod.js' : '.esm-browser.js',
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
        name: 'global',
        options: isProd => ({
            format: ['iife'],
            minify: isProd,
            outExtension: () => ({
                js: isProd ? '.global.prod.js' : '.global.js',
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

    for (const { options: configuration } of configurations) {
        const cfgOptions = typeof configuration === 'function'
            ? [configuration(false), configuration(true)]
            : [configuration];

        for (const configOptions of cfgOptions) {
            await build({
                ...baseOptions,
                ...configOptions,
                ...options,
                outDir,
                entry: [
                    entryFile,
                ],
            });
        }
    }
}