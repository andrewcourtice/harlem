module.exports = {
    presets: [
        ['@babel/env', {
            useBuiltIns: 'entry',
            corejs: 3
        }],
        '@babel/typescript'
    ],
    plugins: [
        ['const-enum', {
            transform: 'constObject'
        }],
        '@babel/transform-typescript'
    ]
};