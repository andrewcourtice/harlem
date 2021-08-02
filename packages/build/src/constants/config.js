/**
 * @type { import('esbuild').BuildOptions }
 */
module.exports = {
    bundle: true,
    sourcemap: true,
    minify: false,
    external: [
        'vue',
        '@vue',
        '@harlem',
    ],
    target: [
        'es2020',
    ],
    define: {
        //'process.env.NODE_ENV': '"production"'
    },
};