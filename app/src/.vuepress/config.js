/**
 * @type {import("vuepress").AppConfig}
 */
module.exports = {
    port: 3030,
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
                text: 'Plugins',
                link: '/plugins/'
            },
            {
                text: 'API Reference',
                link: '/api-docs/'
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
                        '/guide/FAQ.md',
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
                        '/plugins/reset.md',
                        '/plugins/snapshot.md',
                        '/plugins/server-side-rendering.md',
                        '/plugins/storage.md',
                        '/plugins/transaction.md',
                    ]
                }
            ]
        }
    }
};