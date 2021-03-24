module.exports = {
    bundle: true,
    sourcemap: true,
    minify: true,
    external: [
        'vue',
        '@vue',
        '@harlem'
    ],
    target: [
        'es2020'
    ],
    define: {
        'process.env.NODE_ENV': '"production"'
    },
};