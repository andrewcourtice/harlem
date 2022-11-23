import path from 'path';
import dotenv from 'dotenv';

import {
    defineConfig,
} from 'vitepress';

dotenv.config({
    path: path.resolve(__dirname, '../../../.vercel/.env.development.local'),
});

export default defineConfig({
    lang: 'en-US',
    title: 'Harlem',
    description: 'Simple, unopinionated, lightweight and extensible state management for Vue 3',
    lastUpdated: true,
    outDir: '../public',
    vite: {
        server: {
            port: 3030,
        },
    },
    head: [
        ['link', {
            rel: 'icon',
            href: '/assets/images/favicon.png',
        }],
    ],
    themeConfig: {
        logo: '/assets/images/logo-192.svg',
        algolia: {
            appId: process.env.DOCS_ALGOLIA_APPID!,
            apiKey: process.env.DOCS_ALGOLIA_KEY!,
            indexName: process.env.DOCS_ALGOLIA_INDEX!,
        },
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/andrewcourtice/harlem'
            }
        ],
        editLink: {
            repo: 'andrewcourtice/harlem',
            branch: 'main',
            dir: 'docs/src',
            text: 'Edit this page on Github'
        },
        nav: [
            {
                text: 'Guide',
                link: '/guide/',
                activeMatch: '^/guide/',
            },
            {
                text: 'Extensibility',
                activeMatch: '^/(extensions|plugins)/',
                items: [
                    {
                        text: 'Extensions',
                        link: '/extensions/',
                    },
                    {
                        text: 'Plugins',
                        link: '/plugins/',
                    },
                ]
            },
            {
                text: 'API Reference',
                link: '/api/',
                activeMatch: '^/api/',
            },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    items: [
                        {
                            text: 'About',
                            link: '/guide/',
                        },
                        {
                            text: 'Getting Started',
                            link: '/guide/introduction/getting-started',
                        },
                        {
                            text: 'Developer Experience',
                            link: '/guide/introduction/developer-experience',
                        },
                    ],
                },
                {
                    text: 'Core Concepts',
                    items: [
                        {
                            text: 'Stores',
                            link: '/guide/core-concepts/stores',
                        },
                        {
                            text: 'State',
                            link: '/guide/core-concepts/state',
                        },
                        {
                            text: 'Getters',
                            link: '/guide/core-concepts/getters',
                        },
                        {
                            text: 'Mutations',
                            link: '/guide/core-concepts/mutations',
                        },
                        {
                            text: 'Actions',
                            link: '/guide/core-concepts/actions',
                        },
                        {
                            text: 'Triggers',
                            link: '/guide/core-concepts/triggers',
                        },
                    ],
                },
                {
                    text: 'Advanced',
                    items: [
                        {
                            text: 'Plugins & Extensions',
                            link: '/guide/advanced/plugins-extensions',
                        },
                        {
                            text: 'Resetting Stores',
                            link: '/guide/advanced/resetting'
                        },
                        {
                            text: 'Taking Snapshots',
                            link: '/guide/advanced/snapshots'
                        },
                        {
                            text: 'Server-Side Rendering',
                            link: '/guide/advanced/ssr'
                        },
                        {
                            text: 'Multiple App Instances',
                            link: '/guide/advanced/multi-app'
                        }
                    ]
                },
                {
                    text: 'Support',
                    items: [
                        {
                            text: 'Tips',
                            link: '/guide/support/tips',
                        },
                        {
                            text: 'FAQ',
                            link: '/guide/support/FAQ',
                        },
                    ],
                },
            ],
            '/extensions/': [
                {
                    text: 'Introduction',
                    items: [
                        {
                            text: 'About',
                            link: '/extensions/',
                        }
                    ]
                },
                {
                    text: 'Official Extensions',
                    items: [
                        {
                            text: 'Action',
                            link: '/extensions/official/action',
                        },
                        {
                            text: 'Compose',
                            link: '/extensions/official/compose',
                        },
                        {
                            text: 'History',
                            link: '/extensions/official/history',
                        },
                        {
                            text: 'Lazy',
                            link: '/extensions/official/lazy',
                        },
                        {
                            text: 'Storage',
                            link: '/extensions/official/storage',
                        },
                        {
                            text: 'Trace',
                            link: '/extensions/official/trace',
                        },
                        {
                            text: 'Transaction',
                            link: '/extensions/official/transaction',
                        },
                    ],
                },
                {
                    text: 'Advanced',
                    items: [
                        {
                            text: 'Extension authoring',
                            link: '/extensions/advanced/authoring'
                        }
                    ]
                }
            ],
            '/plugins/': [
                {
                    text: 'Introduction',
                    items: [
                        {
                            text: 'About',
                            link: '/plugins/',
                        }
                    ]
                },
                {
                    text: 'Official Plugins',
                    items: [
                        {
                            text: 'Devtools',
                            link: '/plugins/official/devtools',
                        },
                        {
                            text: 'Server-Side Rendering',
                            link: '/plugins/official/server-side-rendering',
                        },
                    ],
                },
                {
                    text: 'Advanced',
                    items: [
                        {
                            text: 'Plugin authoring',
                            link: '/plugins/advanced/authoring'
                        }
                    ]
                }
            ]
        },
        footer: {
            message: 'MIT Licensed',
            copyright: 'Copyright © 2020-present Andrew Courtice',
        },
    },
});