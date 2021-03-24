import vuePlugin from '@vitejs/plugin-vue';

import {
    defineConfig
} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 6565
    },
    plugins: [
        vuePlugin()
    ]
})