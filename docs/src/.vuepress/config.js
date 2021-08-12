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
                link: '/guide/introduction/about.html',
                activeMatch: '^/guide/'
            },
            {
                text: 'Extensibility',
                link: '/extensibility/',
                activeMatch: '^/extensibility/'
            },
            {
                text: 'API Reference',
                link: '/api-reference/global.html',
                activeMatch: '^/api-reference/'
            }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    children: [
                        '/guide/introduction/about.html',
                        '/guide/introduction/getting-started.html',
                    ]
                },
                {
                    text: 'Core Concepts',
                    children: [
                        '/guide/core-concepts/stores.html',
                        '/guide/core-concepts/state.html',
                        '/guide/core-concepts/getters.html',
                        '/guide/core-concepts/mutations.html',
                        '/guide/core-concepts/actions.html',
                        '/guide/core-concepts/triggers.html',
                    ]
                },
                {
                    text: 'Support',
                    children: [
                        '/guide/support/tips.html',
                        '/guide/support/FAQ.html'
                    ]
                },
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
                        '/api-reference/global.html',
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