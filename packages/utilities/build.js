const path = require('path');
const build = require('@harlem/build');

(async () => {
    const cwd = path.resolve('.');
    console.log(cwd);

    return build(cwd, {
        fileName: 'harlem-utilities',
        globalName: 'harlemUtilities'
    });
})();