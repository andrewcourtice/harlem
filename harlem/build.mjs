import fse from 'fs-extra';
import build from '../build.mjs';

async function main() {
    await fse.copyFile('../README.md', './README.md');
    return build(process.cwd(), './src/index.ts');
}

main();