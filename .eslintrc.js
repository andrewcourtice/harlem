const INDENT = 4;

module.exports = {
    root: true,
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        lib: [
            'DOM',
            'DOM.Iterable',
            'ESNext',
            'WebWorker',
            'WebWorker.ImportScripts',
        ],
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-essential',
    ],
    env: {
        'es2021': true,
        'browser': true,
        'node': true,
        'jest': true,
        'worker': true,
        'shared-node-browser': true,
        'vue/setup-compiler-macros': true,
    },
    rules: {

        // Disabled rules that conflict with TS rules
        // See @typescript-eslint/indent below
        // https://github.com/eslint/eslint/issues/13956
        'indent': 'off',

        // Base rules
        'eqeqeq': 'error',
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'no-alert': 'error',
        'no-multi-assign': 'error',
        'no-multi-spaces': 'error',
        'no-nested-ternary': 'error',
        'no-return-await': 'error', // https://jakearchibald.com/2017/await-vs-return-vs-return-await/
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-unneeded-ternary': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-whitespace-before-property': 'error',
        'object-property-newline': 'error',
        'prefer-exponentiation-operator': 'error',
        'space-infix-ops': 'error',

        'array-bracket-newline': ['error', 'consistent'],
        'brace-style': ['error', '1tbs'],
        'linebreak-style': ['error', 'unix'],
        'object-curly-spacing': ['error', 'always'],
        'semi': ['error', 'always'],

        'camelcase': ['warn', { // remove when API changes to camelcase
            'properties': 'never',
            'ignoreDestructuring': true,
        }],

        'id-length': ['error', {
            'min': 2,
            'exceptions': [
                '_',
                'i',
                'x',
                'y',
            ],
        }],

        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'never',
        }],

        'no-console': ['error', {
            'allow': [
                'warn',
                'error',
            ],
        }],

        'no-magic-numbers': ['warn', {
            'enforceConst': true,
            'ignoreArrayIndexes': true,
            'ignoreDefaultValues': true,
        }],

        'object-curly-newline': ['error', {
            'ObjectExpression': {
                'minProperties': 2,
                'multiline': true,
                'consistent': true,
            },
            'ImportDeclaration': 'always',
            'ExportDeclaration': {
                'minProperties': 2,
            },
        }],

        'prefer-const': ['error', {
            'destructuring': 'all',
        }],

        'quotes': ['error', 'single', {
            'avoidEscape': true,
        }],

        'sort-imports': ['error', {
            'ignoreCase': true,
            'ignoreDeclarationSort': true,
            'ignoreMemberSort': false,
            'allowSeparatedGroups': true,
            'memberSyntaxSortOrder': [
                'none',
                'all',
                'single',
                'multiple',
            ],
        }],

        // Typescript specific rules
        '@typescript-eslint/indent': ['error', INDENT],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/member-delimiter-style': 'error',

        // Vue specific rules
        'vue/multi-word-component-names': 'off',
        'vue/new-line-between-multi-line-property': 'error',
        'vue/no-multi-spaces': 'error',
        'vue/no-setup-props-destructure': 'warn',
        'vue/no-side-effects-in-computed-properties': 'warn',
        'vue/no-spaces-around-equal-signs-in-attribute': 'error',
        'vue/no-static-inline-styles': 'warn',
        'vue/no-template-target-blank': 'error',
        'vue/no-unused-refs': 'error',
        'vue/no-useless-mustaches': 'error',
        'vue/prefer-import-from-vue': 'error',
        'vue/require-explicit-emits': 'error',
        'vue/return-in-computed-property': 'warn',

        'vue/attribute-hyphenation': ['error', 'always'],
        'vue/component-definition-name-casing': ['error', 'kebab-case'],
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/html-quotes': ['error', 'double'],
        'vue/mustache-interpolation-spacing': ['error', 'always'],
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/prefer-true-attribute-shorthand': ['error', 'always'],
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/v-for-delimiter-style': ['error', 'in'],
        'vue/v-on-style': ['error', 'shorthand'],
        'vue/v-slot-style': ['error', 'shorthand'],
        //'vue/v-on-function-call': ['error', 'always'],

        'vue/component-tags-order': ['error', {
            'order': ['template', 'script', 'style'],
        }],

        'vue/component-api-style': ['error', [
            'script-setup',
            'composition',
        ]],

        'vue/block-lang': ['warn', {
            'script': {
                'lang': 'ts',
            },
            'style': {
                'lang': 'scss',
            },
        }],

        'vue/define-macros-order': ['error', {
            'order': [
                'defineProps',
                'defineEmits',
            ],
        }],

        'vue/attributes-order': ['error', {
            'order': [
                'LIST_RENDERING', // v-for
                'CONDITIONALS', // v-if, v-else-if, v-else, v-show, v-cloak
                'DEFINITION', // is, v-is
                'UNIQUE', // ref, key
                'TWO_WAY_BINDING', // v-model
                'GLOBAL', // id
                'OTHER_ATTR', // class, layout
                'CONTENT', // v-html
                'RENDER_MODIFIERS', // v-once, v-pre
                'OTHER_DIRECTIVES', // v-focus, v-visible
                'SLOT', // v-slot
                'EVENTS', // @click, v-on
            ],
            'alphabetical': false,
        }],

        'vue/v-on-event-hyphenation': ['error', 'always', {
            'autofix': false,
        }],

        'vue/first-attribute-linebreak': ['error', {
            'singleline': 'beside',
            'multiline': 'beside',
        }],

        'vue/max-attributes-per-line': ['error', {
            'singleline': {
                'max': 4,
            },
            'multiline': {
                'max': 1,
            },
        }],

        'vue/html-indent': ['error', INDENT, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': false,
            'ignores': [],
        }],

        'vue/multiline-html-element-content-newline': ['error', {
            'ignoreWhenEmpty': false,
            'allowEmptyLines': false,
        }],

    },
};