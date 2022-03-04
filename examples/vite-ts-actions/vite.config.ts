import vuePlugin from '@vitejs/plugin-vue';

import {
    defineConfig,
} from 'vite';

export default defineConfig({
    server: {
        port: 3000,
    },
    json: {
        stringify: true,
    },
    build: {
        commonjsOptions: {
            esmExternals: true,
        },
    },
    define: {
        '__VUE_OPTIONS_API__': false,
    },
    plugins: [
        vuePlugin(),
    ],
});