import path from 'path';
import dotenv from 'dotenv';

import {
    defineConfig,
} from 'vitepress';

dotenv.config({
    path: path.resolve(__dirname, '../../../.env'),
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
            pattern: 'https://github.com/andrewcourtice/harlem/edit/main/docs/src/:path',
            text: 'Edit this page on Github'
        },
        nav: [
            {
                text: 'Guide',
                link: '/guide/introduction/about',
                activeMatch: '^/guide/',
            },
            {
                text: 'Extensibility',
                link: '/extensibility/',
                activeMatch: '^/extensibility/',
            },
            {
                text: 'API Reference',
                link: '/api/global',
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
                            link: '/guide/introduction/about',
                        },
                        {
                            text: 'Getting Started',
                            link: '/guide/introduction/getting-started',
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
            '/extensibility/': [
                {
                    text: 'Extensions',
                    items: [
                        {
                            text: 'Introduction',
                            link: '/extensibility/extensions/',
                        },
                        {
                            text: 'Action',
                            link: '/extensibility/extensions/action',
                        },
                        {
                            text: 'Compose',
                            link: '/extensibility/extensions/compose',
                        },
                        {
                            text: 'History',
                            link: '/extensibility/extensions/history',
                        },
                        {
                            text: 'Lazy',
                            link: '/extensibility/extensions/lazy',
                        },
                        {
                            text: 'Reset',
                            link: '/extensibility/extensions/reset',
                        },
                        {
                            text: 'Snapshot',
                            link: '/extensibility/extensions/snapshot',
                        },
                        {
                            text: 'Storage',
                            link: '/extensibility/extensions/storage',
                        },
                        {
                            text: 'Trace',
                            link: '/extensibility/extensions/trace',
                        },
                        {
                            text: 'Transaction',
                            link: '/extensibility/extensions/transaction',
                        },
                    ],
                },
                {
                    text: 'Plugins',
                    items: [
                        {
                            text: 'Introduction',
                            link: '/extensibility/plugins/',
                        },
                        {
                            text: 'Devtools',
                            link: '/extensibility/plugins/devtools',
                        },
                        {
                            text: 'Server-Side Rendering',
                            link: '/extensibility/plugins/server-side-rendering',
                        },
                    ],
                },
            ],
            '/api/': [
                {
                    text: 'API Reference',
                    items: [
                        {
                            text: 'Global',
                            link: '/api/global',
                        },
                        {
                            text: 'Store',
                            link: '/api/store',
                        },
                        {
                            text: 'Extension',
                            link: '/api/extension',
                        },
                        {
                            text: 'Types',
                            link: '/api/types',
                        },
                    ],
                },
            ],
        },
        footer: {
            message: 'MIT Licensed',
            copyright: 'Copyright © 2020-present Andrew Courtice',
        },
    },
});