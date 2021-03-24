const path = require('path');
const fs = require('fs');
const childproc = require('child_process');
const esbuild = require('esbuild');

const FORMATS = require('./constants/formats');
const EXTENSIONS = require('./constants/extensions');
const CONFIG = require('./constants/config');

function getConfig(format, cwd, options, minify) {
    const input = path.resolve(cwd, './src/index.ts');
    const output = path.resolve(cwd, './dist');

    const {
        fileName,
        globalName
    } = options;

    const entryPoints = [
        input
    ];

    const extension = EXTENSIONS[format] || 'js';
    const outfile = path.join(output, `/${fileName}${minify ? '.min' : ''}.${extension}`);

    return {
        ...CONFIG,
        minify,
        format,
        entryPoints,
        globalName,
        outfile
    };
}

async function build(cwd, options) {
    const output = path.resolve(cwd, './dist');

    console.log('Build Started');
    
    try {
        // Delete the output directory
        fs.rmSync(output, {
            recursive: true,
            force: true
        });

        const tasks = FORMATS.flatMap(format => {
            const standardConfig = getConfig(format, cwd, options, false);
            const minifiedConfig = getConfig(format, cwd, options, true);
    
            return [
                esbuild.build(standardConfig),
                esbuild.build(minifiedConfig)
            ];
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
                cwd
            }, error => error ? reject(error) : resolve())
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    console.log('Type Generation Complete');
}

module.exports = build;