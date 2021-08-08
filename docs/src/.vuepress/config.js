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
                link: '/guide/'
            },
            {
                text: 'Extensions',
                link: '/extensions/'
            },
            {
                text: 'Plugins',
                link: '/plugins/'
            },
            {
                text: 'API Reference',
                link: '/api-reference/'
            }
        ],
        sidebar: {
            '/guide/': [
                {
                    isGroup: true,
                    text: 'Guide',
                    children: [
                        '/guide/README.md',
                        '/guide/getting-started.md',
                        '/guide/core-concepts.md',
                        '/guide/devtools-integration.md',
                        '/guide/server-side-rendering.md',
                        '/guide/typescript-support.md',
                        '/guide/FAQ.md',
                    ]
                }
            ],
            '/extensions/': [
                {
                    isGroup: true,
                    text: 'Extensions',
                    children: [
                        '/extensions/README.md',
                        '/extensions/action.md',
                    ]
                }
            ],
            '/plugins/': [
                {
                    isGroup: true,
                    text: 'Plugins',
                    children: [
                        '/plugins/README.md',
                        '/plugins/devtools.md',
                        '/plugins/server-side-rendering.md',
                    ]
                }
            ],
            '/api-reference/': [
                {
                    isGroup: true,
                    text: 'API Reference',
                    children: [
                        '/api-reference/README.md',
                        '/api-reference/store.md',
                        '/api-reference/types.md',
                    ]
                }
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