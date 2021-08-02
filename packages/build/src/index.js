const path = require('path');
const fs = require('fs');
const childproc = require('child_process');
const merge = require('lodash/merge');
const esbuild = require('esbuild');

const FORMATS = require('./constants/formats');
const EXTENSIONS = require('./constants/extensions');
const CONFIG = require('./constants/config');

/**
 * @param format { String } - the output format
 * @param cwd { String } - the current working directory
 * @param filename { String } - the output file name
 * @param options { import('esbuild').BuildOptions } - esbuild options
 */
function getConfig(format, cwd, fileName, options) {
    const input = path.resolve(cwd, './src/index.ts');
    const output = path.resolve(cwd, './dist');
    const extension = EXTENSIONS[format] || 'js';

    const entryPoints = [
        input,
    ];

    const configs = [
        {
            format,
            entryPoints,
            outfile: path.join(output, `/${fileName}.${extension}`),
            define: {
                __DEV__: false,
            },
        },
        {
            format,
            entryPoints,
            minify: true,
            outfile: path.join(output, `/${fileName}.min.${extension}`),
            define: {
                __DEV__: false,
            },
        },
    ];

    if (format !== 'iife') {
        configs.push({
            format,
            entryPoints,
            platform: 'node',
            outfile: path.join(output, `/${fileName}.bundler.${extension}`),
            inject: [
                path.resolve(__dirname, './injections/dev.js'),
            ],
        });
    }

    return configs.map(config => merge({}, CONFIG, config, options));
}

/**
 * @param cwd { String } - the current working directory
 * @param filename { String } - the output file name
 * @param options { import('esbuild').BuildOptions } - esbuild options
 */
async function build(cwd, filename, options) {
    const output = path.resolve(cwd, './dist');

    console.log('Build Started');

    try {
        // Delete the output directory
        fs.rmSync(output, {
            recursive: true,
            force: true,
        });

        const tasks = FORMATS.flatMap(format => {
            const configs = getConfig(format, cwd, filename, options);

            return configs.map(config => esbuild.build(config));
        });

        await Promise.all(tasks);
    } catch (error) {
        process.exit(1);
    }

    console.log('Build Complete');
    console.log('Type Generation Started');

    try {
        await new Promise((resolve, reject) => {
            childproc.exec(`tsc --emitDeclarationOnly --outDir ${output}`, {
                cwd,
            }, error => error ? reject(error) : resolve());
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    console.log('Type Generation Complete');
}

module.exports = build;