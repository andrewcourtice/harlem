import vuePlugin from '@vitejs/plugin-vue';

import {
    defineConfig,
    UserConfig,
} from 'vite';

import {
    visualizer,
} from 'rollup-plugin-visualizer';

const BASE_CONFIG: UserConfig = {
    server: {
        port: 6565,
    },
    json: {
        stringify: true,
    },
    build: {
        sourcemap: 'hidden',
        commonjsOptions: {
            esmExternals: true,
        },
    },
    define: {
        '__VUE_OPTIONS_API__': false,
        '__VUE_PROD_DEVTOOLS__': true,
    },
    plugins: [
        vuePlugin(),
    ],
};

export default defineConfig(({ mode }) => {
    if (mode !== 'insights') {
        return BASE_CONFIG;
    }

    return {
        ...BASE_CONFIG,
        build: {
            rollupOptions: {
                plugins: [
                    visualizer({
                        filename: 'app.insights.html',
                        title: 'App Insights',
                        template: 'treemap',
                        open: true,
                        gzipSize: true,
                    }),
                ],
            },
        },
    };
});