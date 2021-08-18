/**
 * @type {import('vuepress').AppConfig}
 */
module.exports = {
    port: 3030,
    bundler: '@vuepress/vite',
    dest: './public',
    title: 'Harlem',
    description: 'Simple, unopinionated, lightweight and extensible state management for Vue 3',
    head: [
        ['link', {
            rel: 'icon',
            href: '/assets/images/favicon.png'
        }]
    ],
    themeConfig: {
        logo: '/assets/images/logo-192.svg',
        repo: 'andrewcourtice/harlem',
        navbar: [
            {
                text: 'Guide',
                link: '/guide/introduction/about',
                activeMatch: '^/guide/'
            },
            {
                text: 'Extensibility',
                link: '/extensibility/',
                activeMatch: '^/extensibility/'
            },
            {
                text: 'API Reference',
                link: '/api/global',
                activeMatch: '^/api/'
            }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    children: [
                        '/guide/introduction/about',
                        '/guide/introduction/getting-started',
                    ]
                },
                {
                    text: 'Core Concepts',
                    children: [
                        '/guide/core-concepts/stores',
                        '/guide/core-concepts/state',
                        '/guide/core-concepts/getters',
                        '/guide/core-concepts/mutations',
                        '/guide/core-concepts/actions',
                        '/guide/core-concepts/triggers',
                    ]
                },
                {
                    text: 'Support',
                    children: [
                        '/guide/support/tips',
                        '/guide/support/FAQ'
                    ]
                },
            ],
            '/extensibility/': [
                {
                    text: 'Extensions',
                    children: [
                        '/extensibility/extensions/introduction',
                        '/extensibility/extensions/action',
                        '/extensibility/extensions/history',
                        '/extensibility/extensions/lazy',
                        '/extensibility/extensions/reset',
                        '/extensibility/extensions/snapshot',
                        '/extensibility/extensions/storage',
                    ]
                },
                {
                    text: 'Plugins',
                    children: [
                        '/extensibility/plugins/introduction',
                        '/extensibility/plugins/devtools',
                        '/extensibility/plugins/server-side-rendering',
                    ]
                }
            ],
            '/api/': [
                '/api/global',
                '/api/store',
                '/api/extension',
                '/api/types',
            ]
        }
    },
    plugins: [
        ['@vuepress/plugin-docsearch', {
            apiKey: '08de2c25d5edc44bfcccacce8f8a9a78',
            indexName: 'harlemjs'
        }]
    ]
};