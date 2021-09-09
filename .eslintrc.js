module.exports = {
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    env: {
        'es2021': true,
        'browser': true,
        'node': true,
        'jest': true,
        'worker': true,
        'shared-node-browser': true,
    },
    rules: {

        // Base rules
        'array-bracket-newline': ['error', 'consistent'],
        'brace-style': ['error', '1tbs'],
        'comma-dangle': ['error', 'always-multiline'],
        'indent': ['error', 4],
        'no-multi-spaces': 'error',
        'no-nested-ternary': 'error',
        'no-trailing-spaces': 'error',
        'no-unneeded-ternary': 'error',
        'no-var': 'error',
        'no-whitespace-before-property': 'error',
        'object-property-newline': 'error',
        'object-curly-newline': ['error', {
            'ObjectExpression': {
                'minProperties': 2,
                'multiline': true,
                'consistent': true,
            },
            'ImportDeclaration': 'always',
            'ExportDeclaration': 'always',
        }],
        'object-curly-spacing': ['error', 'always'],
        'prefer-const': ['error', {
            'destructuring': 'all',
        }],
        'prefer-exponentiation-operator': 'error',
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'space-infix-ops': 'error',


        // Typescript specific rules
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/ban-types': 'warn',
    },
};