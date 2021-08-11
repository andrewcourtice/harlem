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
                link: '/guide/introduction/features.html'
            },
            {
                text: 'Extensibility',
                link: '/extensibility/'
            },
            {
                text: 'API Reference',
                link: '/api-reference/'
            }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    children: [
                        {
                            text: 'Features',
                            link: '/guide/introduction/features.html'
                        },
                        {
                            text: 'Getting Started',
                            link: '/guide/introduction/getting-started.html'
                        },
                    ]
                },
                {
                    text: 'Core Concepts',
                    children: [
                        {
                            text: 'Architecture',
                            link: '/guide/core-concepts/architecture.html'
                        },
                        {
                            text: 'State',
                            link: '/guide/core-concepts/state.html'
                        },
                        {
                            text: 'Getters',
                            link: '/guide/core-concepts/getters.html'
                        },
                        {
                            text: 'Mutations',
                            link: '/guide/core-concepts/mutations.html'
                        },
                        {
                            text: 'Actions',
                            link: '/guide/core-concepts/actions.html'
                        },
                        {
                            text: 'Triggers',
                            link: '/guide/core-concepts/triggers.html'
                        },
                    ]
                },
                {
                    text: 'Developer Experience',
                    children: [
                        {
                            text: 'Typescript Support',
                            link: '/guide/dx/typescript-support.html'
                        },
                        {
                            text: 'Devtools Integration',
                            link: '/guide/dx/devtools-integration.html'
                        },
                    ]
                },
                {
                    text: 'FAQ',
                    link: '/guide/FAQ.html'
                }
            ],
            '/extensibility/': [
                {
                    text: 'Extensions',
                    children: [
                        '/extensibility/extensions/introduction.html',
                        '/extensibility/extensions/action.html',
                        '/extensibility/extensions/history.html',
                        '/extensibility/extensions/lazy.html',
                        '/extensibility/extensions/reset.html',
                        '/extensibility/extensions/snapshot.html',
                        '/extensibility/extensions/storage.html',
                    ]
                },
                {
                    text: 'Plugins',
                    children: [
                        '/extensibility/plugins/introduction.html',
                        '/extensibility/plugins/devtools.html',
                        '/extensibility/plugins/server-side-rendering.html',
                    ]
                }
            ],
            '/api-reference/': [
                {
                    text: 'API Reference',
                    children: [
                        '/api-reference/README.html',
                        '/api-reference/store.html',
                        '/api-reference/types.html',
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