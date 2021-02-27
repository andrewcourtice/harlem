/**
 * @type {import("vuepress").AppConfig}
 */
module.exports = {
    port: 3030,
    dest: './public',
    title: 'Harlem',
    description: 'Simple, unopinionated, lightweight and extensible state management for Vue 3',
    themeConfig: {
        logo: '/assets/images/logo-192.svg',
        repo: 'andrewcourtice/harlem',
        displayAllHeaders: true,
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
                        '/guide/getting-started.md'
                    ]
                }
            ],
            '/plugins/': [
                {
                    isGroup: true,
                    text: 'Plugins',
                    children: [
                        '/plugins/README.md',
                        '/plugins/devtools.md'
                    ]
                }
            ]
        }
    }
};