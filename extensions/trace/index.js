if (process.env.NODE_ENV === 'production') {
    return require('./dist/index.cjs.prod.js');
} else {
    return require('./dist/index.cjs.js');
}