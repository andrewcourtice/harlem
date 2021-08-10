import vuePlugin from '@vitejs/plugin-vue';

import {
    defineConfig,
} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 6565,
    },
    json: {
        stringify: true,
    },
    build: {
        sourcemap: true,
        cssCodeSplit: true,
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
});