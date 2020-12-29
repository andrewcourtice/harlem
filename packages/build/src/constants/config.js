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
        'esnext'
    ],
    define: {
        'process.env.NODE_ENV': '"production"'
    },
};